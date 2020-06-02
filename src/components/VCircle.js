import { h, inject, defineAsyncComponent, Suspense } from "../deps/vue.js";

import VCircleSvg from "../internals/VCircleSvg.js";
import VCircleCanvas from "../internals/VCircleCanvas.js";
import VCircleThree from "../internals/VCircleThree.js";
import VCirclePdf from "../internals/VCirclePdf.js";

// const VCircleSvg = defineAsyncComponent(() => import("../internals/VCircleSvg.js"));
// const VCircleCanvas = defineAsyncComponent(() => import("../internals/VCircleCanvas.js"));
// const VCircleThree = defineAsyncComponent(() => import("../internals/VCircleThree.js"));
// const VCirclePdf = defineAsyncComponent(() => import("../internals/VCirclePdf.js"));

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
