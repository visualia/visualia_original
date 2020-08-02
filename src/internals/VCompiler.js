import { computed, h, onErrorCaptured, inject } from "../../dist/deps/vue.js";
import * as utils from "../utils.js";
import { compileMarkdown } from "../internals.js";

export default {
  props: {
    content: {
      default: "",
      type: String,
    },
  },
  setup(props) {
    onErrorCaptured(utils.onCompilerError);
    const customUtils = inject("customUtils");
    const compiledContent = computed(() => ({
      setup() {
        return { ...utils, ...customUtils };
      },
      render: compileMarkdown(props.content).code,
    }));

    return () => (compiledContent.value ? h(compiledContent.value) : null);
  },
};
