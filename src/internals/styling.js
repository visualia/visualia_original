import { computed, inject } from "../deps/vue.js";

import {
  MeshPhongMaterial,
  DoubleSide,
  LineBasicMaterial
} from "../deps/three.js";

import { toNumber } from "../utils.js";

export const stylingProps = {
  stroke: { default: "black", type: [String] },
  strokeWidth: { default: 2, type: [String, Number] },
  fill: { default: "none", type: [String, Number] },
  opacity: { default: 1, type: [String, Number] }
};

export const useSvgStyling = props => {
  const sceneContext = inject("sceneContext");
  return computed(() => {
    const fill = props.fill;
    const stroke = props.stroke;
    const strokeWidth =
      toNumber(props.strokeWidth, 1) * sceneContext.unit.value;
    return { fill, stroke, strokeWidth };
  });
};

// Canvas

export const stylingCanvas = (props, scene) => {
  scene.fillStyle = props.fill;
  scene.strokeStyle = props.stroke;
  scene.lineWidth = props.strokeWidth;
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
