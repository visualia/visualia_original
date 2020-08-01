import { watch, ref, onMounted } from "../../dist/deps/vue.js";
import { receive } from "../../src/utils.js";
import { compile } from "../../src/internals.js";

import * as monaco from "../../dist/deps/monaco/monaco.js";

import {
  provideComponentsCompletion,
  provideComponentsHover,
} from "./providers.js";

import { formatVisualia } from "./format.js";

window.MonacoEnvironment = {
  getWorkerUrl: function (workerId, label) {
    return "../../dist/deps/monaco/editor.worker.js";
  },
};

function formatError(err) {
  const loc = err.loc;
  return {
    severity: monaco.MarkerSeverity.Error,
    startLineNumber: loc.start.line,
    startColumn: loc.start.column,
    endLineNumber: loc.end.line,
    endColumn: loc.end.column,
    message: err.message,
    code: String(err.code),
  };
}

export const VMonaco = {
  props: { content: { default: "" } },
  setup(props, { emit }) {
    const el = ref(null);

    monaco.languages.register({ id: "visualia" });
    // https://github.com/microsoft/monaco-languages/blob/master/src/markdown/markdown.ts
    monaco.languages
      .getLanguages()
      .filter(({ id }) => id == "markdown")[0]
      .loader()
      .then(({ language, conf }) => {
        // https://github.com/microsoft/monaco-languages/blob/master/src/html/html.ts#L17
        conf.wordPattern = /(-?\d*\.\d\w*)|([^\`\~\!\@\$\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\s]+)/g;
        monaco.languages.setLanguageConfiguration("visualia", conf);

        language.tokenizer.html = [
          [/<([\w-]+)\/>/, "tag"],
          [
            /<([\w-]+)/,
            {
              cases: {
                "@empty": { token: "tag", next: "@tag.$1" },
                "@default": { token: "tag", next: "@tag.$1" },
              },
            },
          ],
          [/<\/([\w-]+)\s*>/, { token: "tag" }],
          [/<!--/, "comment", "@comment"],
        ];
        monaco.languages.setMonarchTokensProvider("visualia", language);
      });

    onMounted(() => {
      // Setting up autcomplete and hover providers

      monaco.languages.registerCompletionItemProvider("visualia", {
        provideCompletionItems: provideComponentsCompletion,
      });
      monaco.languages.registerHoverProvider("visualia", {
        provideHover: provideComponentsHover,
      });
      monaco.languages.registerDocumentFormattingEditProvider("visualia", {
        provideDocumentFormattingEdits(model) {
          const text = formatVisualia(model.getValue());
          return [
            {
              range: model.getFullModelRange(),
              text,
            },
          ];
        },
      });
      // Setting up editor

      const editor = monaco.editor.create(el.value, {
        language: "visualia",
        theme: "vs-dark",
        fontSize: "15px",
        wordWrap: "wordWrapColumn",
        wordWrapColumn: 70,
        lineNumbers: "off",
        minimap: {
          enabled: false,
        },
      });
      const model = editor.getModel();
      model.updateOptions({ tabSize: 2 });

      // When editor content changes
      // we emit input event so the component
      // works with v-model

      editor.onDidChangeModelContent((e) => {
        const { errors } = compile(editor.getValue());
        monaco.editor.setModelMarkers(
          editor.getModel(),
          `visualia`,
          errors.filter((e) => e.loc).map(formatError)
        );
        if (errors.length === 0) {
          emit("input:content", editor.getValue());
        }
      });

      // We only change editor content
      // when value prop is really different
      // from what we emitted for v-model
      // otherwise we get the recursive loop

      watch(
        () => props.content,
        (content) => {
          if (content !== editor.getValue()) {
            model.pushEditOperations(
              [],
              [
                {
                  range: model.getFullModelRange(),
                  text: content,
                },
              ]
            );
          }
        },
        { immediate: true }
      );

      receive("format", () =>
        editor.getAction("editor.action.formatDocument").run()
      );
    });

    return { el };
  },
  template: `
    <div ref="el" style="height: 100vh" />
  `,
};
