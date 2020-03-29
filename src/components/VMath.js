import { ref, watch } from "../deps/vue.js";
import { katex } from "../deps/katex.js";

export const VMath = {
  setup(_, { slots }) {
    const math = ref("");
    watch(
      () => slots.default(),
      nodes => {
        const node = nodes[0].children;
        math.value = katex.renderToString(String.raw`${node}`, {
          throwOnError: true
        });
      }
    );
    return { math };
  },
  template: `<div style="margin-bottom: var(--base)" v-html="math" />`
};
