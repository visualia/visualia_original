import { messages } from "../utils.js";
import { computed } from "../deps/vue.js";
import marked from "../deps/marked.js";

export const VMessages = {
  setup() {
    const currentMessages = computed(() =>
      messages.value.map((message) => {
        return marked(String(message));
      })
    );
    return { currentMessages };
  },
  template: `
  <div
    v-if="currentMessages.length"
    style="padding: var(--base); background: var(--yellow);"
  >
    <div v-for="message in currentMessages.slice(-5)" v-html="message" />
  </div>`,
};
