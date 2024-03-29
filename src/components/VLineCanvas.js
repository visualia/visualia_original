import { inject, watch } from "../../dist/deps/vue.js";
import { line } from "../../dist/deps/d3-shape.js";

import {
  lineProps,
  stylingProps,
  transformTwoProps,
  stylingCanvas,
  transformCanvas,
  transformCanvasReset,
  parseCoords,
} from "../internals.js";

export default {
  props: {
    ...lineProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(
      () => {
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
      },
      { immediate: true }
    );
    return () => null;
  },
};
