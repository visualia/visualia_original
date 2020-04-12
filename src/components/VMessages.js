import { messages } from "../utils.js";

export const VMessages = {
  setup() {
    return { messages };
  },
  template: `<div style="padding: var(--base); background: var(--yellow);">
    <div v-for="message in messages.slice(-3)" v-html="message" />
  </div>`,
};
