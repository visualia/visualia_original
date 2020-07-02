import { ref } from "../../dist/deps/vue.js";
import { isNumber } from "../utils.js";

const state = ref({});

export const set = (key, value) => {
  state.value[key] = value;
};

export const get = (key = null, def = 0) => {
  if (key && state.value[key]) {
    return state.value[key];
  } else {
    return def;
  }
};

export const toggle = (key) => {
  if (!state.value.hasOwnProperty(key)) {
    state.value[key] = 1;
  } else {
    if (!isNumber(state.value[key])) {
      state.value[key] = !!state.value[key] ? 1 : 0;
    } else if ([0, 1].includes(state.value[key])) {
      state.value[key] = state.value[key] = 1 - state.value[key];
    } else {
      state.value[key] = state.value[key] > 0 ? 0 : 1;
    }
  }
};
