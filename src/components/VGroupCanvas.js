import { inject, onBeforeUpdate } from "../deps/vue.js";

import { transformCanvas, transformCanvasReset } from "../internals.js";

export const VGroupCanvas = {
  setup(props, { slots }) {
    return () => slots.default();
  },
};
