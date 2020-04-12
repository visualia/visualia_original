import { messages } from "../internals.js";

export const VMessages = {
  setup() {
    return { messages };
  },
  template: `<div style="padding: var(--base); background: var(--yellow);">
    <div v-for="message in messages" v-html="message" />
  </div>`,
};
