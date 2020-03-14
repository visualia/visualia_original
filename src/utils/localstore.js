import { ref, computed } from "../deps/vue.js";

export const useLocalstore = (initialValue = null, key = null) => {
  const value = ref(initialValue);
  if (window.localStorage !== undefined) {
    if (key && !window.localStorage.getItem(key)) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
    const localValue = computed({
      get: () => {
        let storedValue = null;
        if (key && window.localStorage.getItem(key)) {
          storedValue = JSON.parse(window.localStorage.getItem(key));
          return storedValue !== value.value ? storedValue : value.value;
        }
        return value.value;
      },
      set: val => {
        value.value = val;
        if (key) {
          window.localStorage.setItem(key, JSON.stringify(val));
        }
      }
    });
    return localValue;
  }
  return value;
};
