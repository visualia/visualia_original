import { h, inject, Suspense, defineAsyncComponent } from "../deps/vue.js";

import VRectSvg from "../internals/VRectSvg.js";
import VRectCanvas from "../internals/VRectCanvas.js";
import VRectThree from "../internals/VRectThree.js";
import VRectPdf from "../internals/VRectPdf.js";

// const VRectSvg = defineAsyncComponent(() => import("../internals/VRectSvg.js"));
// const VRectCanvas = defineAsyncComponent(() =>
//   import("../internals/VRectCanvas.js")
// );
// const VRectThree = defineAsyncComponent(() =>
//   import("../internals/VRectThree.js")
// );
// const VRectPdf = defineAsyncComponent(() => import("../internals/VRectPdf.js"));

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
    ? h(Suspense, null, h(modes[sceneContext.mode.value], props, slots))
    : null;
};
