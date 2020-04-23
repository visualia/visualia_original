import { computed, inject } from "../deps/vue.js";

import {
  MeshPhongMaterial,
  DoubleSide,
  LineBasicMaterial,
} from "../deps/three.js";

import { color } from "../deps/d3-color.js";

import { toNumber, fit } from "../utils.js";

export const stylingProps = {
  stroke: {
    default: "black",
    suggest: ["black", "red", "green", "blue", "none"],
    type: [String, Number, Array, Object],
    docs: "Stroke color",
  },
  strokeWidth: {
    default: 2,
    suggest: "2",
    type: [String, Number],
    docs: 'Stroke width in pixels. Set to "none" for no stroke',
  },
  fill: {
    default: "none",
    suggest: ["none", "black", "red", "green", "blue"],
    type: [String, Number, Array, Object],
    docs: 'Fill color. Set to "none" for no fill',
  },
  opacity: {
    default: 1,
    suggest: ["1", "0.75", "0.5", "0.25", "0"],
    type: [String, Number],
    docs:
      "Object opacity, `1` means no transparency, `0` means fully transparent",
  },
};

export const useSvgStyling = (props) => {
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

export const useThreeFill = (props) =>
  computed(
    () =>
      new MeshPhongMaterial({
        color: props.fill,
        opacity: props.opacity,
        side: DoubleSide,
      })
  );

export const useThreeStroke = (props) =>
  computed(
    () =>
      new LineBasicMaterial({
        color: props.stroke,
        linewidth: props.strokeWidth,
        linecap: "round",
        linejoin: "round",
        opacity: props.opacity,
        side: DoubleSide,
      })
  );

// PDF

const pdfColor = (c) => {
  const { r, g, b } = color(c);
  return {
    red: fit(r, 0, 255, 0, 1),
    green: fit(g, 0, 255, 0, 1),
    blue: fit(b, 0, 255, 0, 1),
    type: "RGB",
  };
};

export const stylingPdf = (props) => {
  let color = null;
  let strokeColor = null;

  if (props.fill !== "none") {
    color = pdfColor(props.fill);
  }
  if (props.stroke !== "none") {
    borderColor = pdfColor(props.stroke);
  }
  // TODO: add correct width
  let borderWidth = props.strokeWidth;
  return { color, borderColor, borderWidth };
};
