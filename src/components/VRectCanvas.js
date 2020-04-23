import { inject, watch } from "../deps/vue.js";

import {
  stylingCanvas,
  transformCanvas,
  transformCanvasReset,
} from "../internals.js";

export const VRectCanvas = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext.ctx.value);
        stylingCanvas(props, sceneContext.ctx.value);
        if (props.fill !== "none") {
          sceneContext.ctx.value.fillRect(0, 0, props.width, props.height);
        }
        if (props.stroke !== "none") {
          sceneContext.ctx.value.strokeRect(0, 0, props.width, props.height);
        }
        transformCanvasReset(sceneContext.ctx.value);
      }
    });
    return () => null;
  },
};
