import { h, inject, defineAsyncComponent, Suspense } from "../deps/vue.js";

import VCircleSvg from "./VCircleSvg.js";
import VCircleCanvas from "./VCircleCanvas.js";
import VCircleThree from "./VCircleThree.js";
import VCirclePdf from "./VCirclePdf.js";

// const VCircleSvg = defineAsyncComponent(() => import("./VCircleSvg.js"));
// const VCircleCanvas = defineAsyncComponent(() => import("./VCircleCanvas.js"));
// const VCircleThree = defineAsyncComponent(() => import("./VCircleThree.js"));
// const VCirclePdf = defineAsyncComponent(() => import("./VCirclePdf.js"));

import { stylingProps, transformTwoProps } from "../internals.js";

export const VCircle = (props, { slots }) => {
  const modes = {
    svg: VCircleSvg,
    canvas: VCircleCanvas,
    three: VCircleThree,
    webgl: VCircleThree,
    pdf: VCirclePdf,
  };
  const sceneContext = inject("sceneContext");
  return modes[sceneContext.mode.value]
    ? h(Suspense, null, h(modes[sceneContext.mode.value], props, slots))
    : null;
};
