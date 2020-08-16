import { inject, watch } from "../../dist/deps/vue.js";

import {
  stylingProps,
  transformTwoProps,
  textProps,
  useSvgStyling,
  useSvgTransform,
  parseCoords,
  transformCanvas,
  transformCanvasReset,
  stylingCanvas,
} from "../internals.js";

export default {
  props: {
    fill: { ...stylingProps.fill, default: "black" },
    stroke: { ...stylingProps.stroke, default: "none" },
    strokeWidth: { ...stylingProps.strokeWidth, default: 0 },
    ...transformTwoProps,
    ...textProps,
  },
  setup(props, { slots }) {
    const sceneContext = inject("sceneContext");

    watch(
      () => {
        if (sceneContext.ctx.value) {
          transformCanvas(props, sceneContext);
          stylingCanvas(props, sceneContext.ctx.value);
          const [x, y] = parseCoords(props.position)[0];
          sceneContext.ctx.value.textBaseline = "alphabetic";
          sceneContext.ctx.value.font = `${props.fontSize} ${props.fontFamily}`;
          // if (props.stroke !== "none") {
          // if (props.fill !== "none") {
          sceneContext.ctx.value.fillText(slots.default()[0].children, x, y);
          transformCanvasReset(sceneContext.ctx.value);
        }
      },
      { immediate: true }
    );
    return () => null;
  },
};
