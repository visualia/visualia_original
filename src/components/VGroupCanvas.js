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
        transformCanvas(props, sceneContext.ctx.value);
        sceneContext.ctx.value.save();
        transformCanvasReset(sceneContext.ctx.value);
        sceneContext.ctx.value.clearRect(
          0,
          0,
          sceneContext.width.value,
          sceneContext.height.value
        );
        sceneContext.ctx.value.restore();
      }
    });
    return () => slots.default();
  }
};
