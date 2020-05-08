import { inject, watch } from "../deps/vue.js";
import { line } from "../deps/d3-shape.js";

import {
  stylingCanvas,
  transformCanvas,
  transformCanvasReset,
  parseCoords,
} from "../internals.js";

export const VLineCanvas = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext);
        stylingCanvas(props, sceneContext.ctx.value);
        let parsedPoints = parseCoords(props.points);
        if (props.closed) {
          parsedPoints = [...parsedPoints, parsedPoints[0]];
        }
        const path = line().context(sceneContext.ctx.value);
        sceneContext.ctx.value.beginPath();
        path(parsedPoints);
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
