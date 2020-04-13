import { messages } from "../utils.js";
import marked from "../deps/marked.js";

export const VMessages = {
  setup() {
    return { messages };
  },
  template: `<div v-if="messages.length" style="padding: var(--base); background: var(--yellow);">
    <div v-for="message in messages.slice(-5)" v-html="message" />
  </div>`,
};
