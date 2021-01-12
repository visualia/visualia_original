import { ref, watch } from "../../src/deps/vue.js";
import { renderToString } from "../../src/deps/katex.js";
import "katex/dist/katex.css";

export default {
  docs: `Creates a math equation in [LaTeX format](https://en.wikibooks.org/wiki/LaTeX/Mathematics)`,
  props: {},
  setup(_, { slots }) {
    const math = ref("");
    if (slots.default) {
      watch(
        () => slots.default(),
        (nodes) => {
          const node = nodes[0].children;
          math.value = renderToString(String.raw`${node}`, {
            throwOnError: false,
          });
        },
        { immediate: true }
      );
    }
    return { math };
  },
  template: `<span style="margin-bottom: var(--base)" v-html="math" />`,
};
