import { computed, inject } from "../deps/vue.js";

import {
  MeshPhongMaterial,
  DoubleSide,
  LineBasicMaterial
} from "../deps/three.js";

import { toNumber } from "../utils.js";

export const stylingProps = {
  stroke: { default: "black", type: [String], docs: "Stroke color" },
  strokeWidth: {
    default: 2,
    type: [String, Number],
    docs: 'Stroke width in pixels. Set to "none" for no stroke'
  },
  fill: {
    default: "none",
    type: [String, Number],
    docs: 'Fill color. Set to "none" for no fill'
  },
  opacity: {
    default: 1,
    type: [String, Number],
    docs: "Object opacity, a floating point number from `0` to `1`"
  }
};

export const useSvgStyling = props => {
  const sceneContext = inject("sceneContext");
  return computed(() => {
    const fill = props.fill;
    const stroke = props.stroke;
    const strokeWidth =
      toNumber(props.strokeWidth, 1) * sceneContext.unit.value;
    const opacity = props.opacity;
    return { fill, stroke, strokeWidth, opacity };
  });
};

// Canvas

export const stylingCanvas = (props, scene) => {
  scene.fillStyle = props.fill;
  scene.strokeStyle = props.stroke;
  scene.lineWidth = props.strokeWidth;
  scene.globalAlpha = props.opacity;
};

// Three

export const useThreeFill = props =>
  computed(
    () =>
      new MeshPhongMaterial({
        color: props.fill,
        opacity: props.opacity,
        side: DoubleSide
      })
  );

export const useThreeStroke = props =>
  computed(
    () =>
      new LineBasicMaterial({
        color: props.stroke,
        linewidth: props.strokeWidth,
        linecap: "round",
        linejoin: "round",
        opacity: props.opacity,
        side: DoubleSide
      })
  );
