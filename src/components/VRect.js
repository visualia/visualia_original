import { h, inject } from "../deps/vue.js";

import { VRectSvg } from "./VRectSvg.js";
import { VRectCanvas } from "./VRectCanvas.js";
import { VRectThree } from "./VRectThree.js";
import { VRectPdf } from "./VRectPdf.js";

import { stylingProps, transformTwoProps } from "../internals.js";

export const VRect = (props, { slots }) => {
  const modes = {
    svg: VRectSvg,
    canvas: VRectCanvas,
    three: VRectThree,
    webgl: VRectThree,
    pdf: VRectPdf,
  };
  const sceneContext = inject("sceneContext");
  return modes[sceneContext.mode.value]
    ? h(modes[sceneContext.mode.value], props, slots)
    : null;
};
