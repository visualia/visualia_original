import { inject, onBeforeUpdate, watch, ref } from "../deps/vue.js";

import {
  transformTwoProps,
  transformCanvas,
  transformCanvasReset
} from "../internals.js";

export const VGroupCanvas = {
  props: {
    ...transformTwoProps
  },
  setup(props, { slots }) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext.ctx.value);
      }
    });
    onBeforeUpdate(() => {
      if (sceneContext.ctx.value) {
        sceneContext.ctx.value.update();
      }
    });
    return () => slots.default();
  }
};
