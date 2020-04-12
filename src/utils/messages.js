import { ref } from "../deps/vue.js";

export const messages = ref([]);

messages.value = [1, 2, 3];

export const message = (message) => {
  messages.value.push(message);
};
