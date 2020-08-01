import { computed, h, onErrorCaptured, inject } from "../../dist/deps/vue.js";
import { Renderer } from "../../dist/deps/marked.js";
import * as utils from "../utils.js";
import { compile } from "../internals.js";

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
  content
    .replace(/<!---\s+/g, "")
    .replace(/\s+--->/g, "")
    .replace(/(@)(.*)(=)/g, "v-on:$2$3");

export default {
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
      render: compile(processContent(props.content), "runtime", {
        renderer,
      }).code,
    }));

    return () => (compiledContent.value ? h(compiledContent.value) : null);
  },
};
