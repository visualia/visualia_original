import { ref } from "../deps/vue.js";

const state = ref({});

export const set = (key, value) => (state.value[key] = value);

export const get = (key = null) => (key ? state.value[key] : state.value);
