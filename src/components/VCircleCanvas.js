import { inject, watch } from "../deps/vue.js";

import {
  stylingProps,
  stylingCanvas,
  transformTwoProps,
  transformCanvas,
  transformCanvasReset,
} from "../internals.js";

export const VCircleCanvas = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext);
        stylingCanvas(props, sceneContext.ctx.value);
        sceneContext.ctx.value.beginPath();
        sceneContext.ctx.value.arc(0, 0, props.r, 0, 2 * Math.PI);
        if (props.fill !== "none") {
          sceneContext.ctx.value.fill();
        }
        if (props.stroke !== "none") {
          sceneContext.ctx.value.stroke();
        }
        transformCanvasReset(sceneContext.ctx.value);
      }
    });
    return () => null;
  },
};
