import { computed, h, compile, onErrorCaptured, inject } from "../deps/vue.js";
import marked from "../deps/marked.js";
import { utils, onCompilerError } from "../../visualia.js";

const renderer = new marked.Renderer();

renderer.code = (code, info) => {
  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  if (info === "live") {
    return `<p><v-live content="${escapedCode}" /></p>`;
  }
  return `<pre v-pre>${escapedCode}</pre>`;
};

const processContent = content =>
  content.replace(/<!---\s+/g, "").replace(/\s+--->/g, "");

const compileContent = content => {
  let c = () => null;
  try {
    c = compile(marked(processContent(content), { renderer, breaks: true }), {
      onError: onCompilerError
    });
  } catch (error) {
    onCompilerError(error);
  }
  return c;
};

export const VCompiler = {
  props: {
    content: {
      default: "",
      type: String,
      docs: "Content to be compiled into VueJS template"
    }
  },
  setup(props) {
    onErrorCaptured(onCompilerError);
    const customUtils = inject("customUtils");
    const compiledContent = computed(() => ({
      setup() {
        return { ...utils, ...customUtils };
      },
      render: compileContent(props.content)
    }));

    return () => (compiledContent.value ? h(compiledContent.value) : null);
  }
};
