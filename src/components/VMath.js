import { ref, watch } from "../../dist/deps/vue.js";
import { renderToString } from "../../dist/deps/katex.js";

export default {
  setup(_, { slots }) {
    const math = ref("");
    if (slots.default) {
      watch(
        () => slots.default(),
        (nodes) => {
          const node = nodes[0].children;
          math.value = renderToString(String.raw`${node}`, {
            throwOnError: true,
          });
        },
        { immediate: true }
      );
    }
    return { math };
  },
  template: `<div style="margin-bottom: var(--base)" v-html="math" />`,
};
