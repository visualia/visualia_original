import { h, inject, defineAsyncComponent, Suspense } from "../deps/vue.js";

import VLineSvg from "./VLineSvg.js";
import VLineCanvas from "./VLineCanvas.js";
import VLineThree from "./VLineThree.js";
import VLinePdf from "./VLinePdf.js";

// const VLineSvg = defineAsyncComponent(() => import("./VLineSvg.js"));
// const VLineCanvas = defineAsyncComponent(() => import("./VLineCanvas.js"));
// const VLineThree = defineAsyncComponent(() => import("./VLineThree.js"));
// const VLinePdf = defineAsyncComponent(() => import("./VLinePdf.js"));

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
  return h(Suspense, null, h(modes[sceneContext.mode.value], props, slots));
};
