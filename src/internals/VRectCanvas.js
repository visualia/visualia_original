import { inject, watch } from "../../dist/deps/vue.js";

import {
  stylingProps,
  sizeProps,
  transformTwoProps,
  stylingCanvas,
  transformCanvas,
  transformCanvasReset,
} from "../internals.js";

export default {
  props: {
    x: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner x coordinate",
    },
    y: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner y coordinate",
    },
    ...sizeProps,
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
          if (props.fill !== "none") {
            sceneContext.ctx.value.fillRect(
              props.x,
              props.y,
              props.width,
              props.height
            );
          }
          if (props.stroke !== "none") {
            sceneContext.ctx.value.strokeRect(
              props.x,
              props.y,
              props.width,
              props.height
            );
          }
          transformCanvasReset(sceneContext.ctx.value);
        }
      },
      { immediate: true }
    );
    return () => null;
  },
};
