import { inject, onBeforeUpdate } from "../deps/vue.js";

import {
  transformThreeProps,
  transformCanvas,
  transformCanvasReset,
} from "../internals.js";

export const VGroupCanvas = {
  props: {
    ...transformThreeProps,
  },
  setup(props, { slots }) {
    return () => slots.default();
  },
};
