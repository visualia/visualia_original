import { computed, h, compile, onErrorCaptured, inject } from "../deps/vue.js";
import marked from "../deps/marked.js";
import * as utils from "../utils.js";
import { formatHash } from "../internals.js";

const renderer = new marked.Renderer();

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
  const router = inject("router");
  const anchor = formatHash([
    router.value[0],
    raw.toLowerCase().replace(/[^\w]+/g, "-"),
  ]);
  return level > 1
    ? `<h${level} id="${anchor}" style="margin-left: -0.8em;"><a style="opacity: 0.2" href="#${anchor}">#</a> ${text}</h${level}>\n`
    : `<h${level} id="${anchor}">${text}</h${level}>\n`;
};

const processContent = (content) =>
  content.replace(/<!---\s+/g, "").replace(/\s+--->/g, "");

const compileContent = (content) => {
  let c = () => null;
  do {
    try {
      c = compile(marked(processContent(content), { renderer, breaks: true }), {
        onError: utils.onCompilerError,
      });
      return c;
    } catch (error) {
      utils.onCompilerError(error);
      break;
    }
  } while (true);
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
