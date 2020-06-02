import { h, inject, defineAsyncComponent } from "../deps/vue.js";

import VCircleSvg from "./VCircleSvg.js";
import VCircleCanvas from "./VCircleCanvas.js";
import VCircleThree from "./VCircleThree.js";
import VCirclePdf from "./VCirclePdf.js";

// const VCircleSvg = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VCircleSvg.js"),
// });
// const VCircleCanvas = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VCircleCanvas.js"),
// });
// const VCircleThree = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VCircleThree.js"),
// });
// const VCirclePdf = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VCirclePdf.js"),
// });

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
    ? h(modes[sceneContext.mode.value], props, slots)
    : null;
};
