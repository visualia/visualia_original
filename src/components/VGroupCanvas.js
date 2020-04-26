import { inject, onBeforeUpdate, watch } from "../deps/vue.js";

import { transformCanvas, transformCanvasReset } from "../internals.js";

export const VGroupCanvas = {
  setup(props, { slots }) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext.ctx.value);
      }
    });
    onBeforeUpdate(() => {
      if (sceneContext.ctx.value) {
        sceneContext.clear();
        transformCanvas(props, sceneContext.ctx.value);
        transformCanvasReset(sceneContext.ctx.value);
      }
    });
    return () => slots.default();
  },
};
