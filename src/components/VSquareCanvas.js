import { inject, watch } from "../deps/vue.js";

import {
  stylingProps,
  stylingCanvas,
  transformTwoProps,
  transformCanvas,
  transformCanvasReset
} from "../internals.js";

export const VSquareCanvas = {
  props: {
    r: { default: 1 },
    ...stylingProps,
    ...transformTwoProps
  },
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext.ctx.value);
        stylingCanvas(props, sceneContext.ctx.value);
        if (props.fill !== "none") {
          sceneContext.ctx.value.fillRect(
            -props.r,
            -props.r,
            props.r * 2,
            props.r * 2
          );
        }
        if (props.stroke !== "none") {
          sceneContext.ctx.value.strokeRect(
            -props.r,
            -props.r,
            props.r * 2,
            props.r * 2
          );
        }
        transformCanvasReset(sceneContext.ctx.value);
      }
    });
    return () => null;
  }
};
