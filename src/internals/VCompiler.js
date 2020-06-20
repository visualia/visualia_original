import { computed, h, compile, onErrorCaptured, inject } from "../deps/vue.js";
import { parse, Renderer } from "../deps/marked.js";
import * as utils from "../utils.js";

const renderer = new Renderer();

renderer.code = (code, info) => {
  const i = info.split(/\s+/);
  const saveid = i[1] ? `v-live-${i[1]}` : "";
  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  if (i[0] === "live") {
    return `<p><v-live saveid="${saveid}" content="${escapedCode}" /></p>`;
  }
  return `<pre v-pre>${escapedCode}</pre>`;
};

renderer.heading = function (text, level, raw) {
  return `<v-heading text="${text}" level="${level}" raw="${raw}" />`;
};

const processContent = (content) =>
  content.replace(/<!---\s+/g, "").replace(/\s+--->/g, "");

const compileContent = (content) => {
  let c = () => null;
  while (true) {
    try {
      c = compile(parse(processContent(content), { renderer, breaks: true }), {
        onError: utils.onCompilerError,
      });
      return c;
    } catch (error) {
      utils.onCompilerError(error);
      break;
    }
  }
};

export const VCompiler = {
  props: {
    content: {
      default: "",
      type: String,
      docs: "Content to be compiled into VueJS template",
    },
  },
  setup(props) {
    onErrorCaptured(utils.onCompilerError);
    const customUtils = inject("customUtils");
    const compiledContent = computed(() => ({
      setup() {
        return { ...utils, ...customUtils };
      },
      render: compileContent(props.content),
    }));

    return () => (compiledContent.value ? h(compiledContent.value) : null);
  },
};
