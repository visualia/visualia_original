import { h, inject } from "../deps/vue.js";

import { VLineSvg } from "./VLineSvg.js";
import { VLineCanvas } from "./VLineCanvas.js";
import { VLineThree } from "./VLineThree.js";
import { VLinePdf } from "./VLinePdf.js";

import { lineProps, stylingProps, transformTwoProps } from "../internals.js";

export const VLine = (props, { slots }) => {
  const modes = {
    svg: VLineSvg,
    canvas: VLineCanvas,
    three: VLineThree,
    webgl: VLineThree,
    pdf: VLinePdf,
  };
  const sceneContext = inject("sceneContext");
  return h(modes[sceneContext.mode.value], props, slots);
};
