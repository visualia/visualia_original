import { ref } from "../deps/vue.js";

import { unique } from "../utils.js";

export const messages = ref([]);

export const message = (message) => {
  messages.value.push(String(message).split("\n")[0]);
  messages.value = unique(messages.value.reverse()).reverse();
  console.log(messages.value);
};

export const clearMessages = () => {
  messages.value = [];
};
