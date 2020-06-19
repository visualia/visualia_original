import { h, inject, defineAsyncComponent, Suspense } from "../deps/vue.js";

import VLineSvg from "../internals/VLineSvg.js";
import VLineCanvas from "../internals/VLineCanvas.js";
import VLineThree from "../internals/VLineThree.js";
import VLinePdf from "../internals/VLinePdf.js";

// const VLineSvg = defineAsyncComponent(() => import("../internals/VLineSvg.js"));
// const VLineCanvas = defineAsyncComponent(() =>
//   import("../internals/VLineCanvas.js")
// );
// const VLineThree = defineAsyncComponent(() =>
//   import("../internals/VLineThree.js")
// );
// const VLinePdf = defineAsyncComponent(() => import("../internals/VLinePdf.js"));

import { lineProps, stylingProps, transformTwoProps } from "../internals.js";

export default (props, { slots }) => {
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
