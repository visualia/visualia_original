import { h, inject } from "../deps/vue.js";

import { VRectSvg } from "./VRectSvg.js";
import { VRectCanvas } from "./VRectCanvas.js";
import { VRectThree } from "./VRectThree.js";
import { VRectPdf } from "./VRectPdf.js";

import { stylingProps, transformTwoProps } from "../internals.js";

export const VRect = {
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
    width: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle width",
    },
    height: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle height",
    },
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props, { slots }) {
    const modes = {
      svg: VRectSvg,
      canvas: VRectCanvas,
      three: VRectThree,
      webgl: VRectThree,
      pdf: VRectPdf,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  },
};
