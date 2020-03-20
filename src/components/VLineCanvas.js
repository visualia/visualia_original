import { inject, watch } from "../deps/vue.js";
import { line } from "../deps/d3-shape.js";

import {
  stylingProps,
  stylingCanvas,
  transformTwoProps,
  transformCanvas,
  transformCanvasReset,
  parseCoords
} from "../internals.js";

export const VLineCanvas = {
  props: {
    points: {
      default: "0 0, 10 10",
      type: [String, Array, Object],
      docs: "Array of points that the line will follow"
    },
    ...transformTwoProps,
    ...stylingProps
  },
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext.ctx.value);
        stylingCanvas(props, sceneContext.ctx.value);
        const parsedPoints = parseCoords(props.points);
        const path = line().context(sceneContext.ctx.value);
        sceneContext.ctx.value.beginPath();
        path(parsedPoints);
        sceneContext.ctx.value.stroke();
        transformCanvasReset(sceneContext.ctx.value);
      }
    });
    return () => null;
  }
};
