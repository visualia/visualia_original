import { ref } from "../deps/vue.js";

export const messages = ref([]);

export const message = (message) => {
  messages.value.push(message);
};

export const clearMessages = () => {
  messages.value = [];
};
