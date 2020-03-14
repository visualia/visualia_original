import { ref } from "../deps/vue.js";

export const useFetch = src => {
  const content = ref("");
  if (src) {
    fetch(src)
      .then(res => res.text())
      .then(res => {
        content.value = res;
      });
  }
  return { content };
};
