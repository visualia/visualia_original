import { inject, watch } from "../../src/deps/vue.js";

import {
  stylingProps,
  sizeProps,
  transformThreeProps,
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
    ...transformThreeProps,
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
