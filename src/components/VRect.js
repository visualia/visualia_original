import { h, inject, defineAsyncComponent } from "../deps/vue.js";

const VRectSvg = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VRectSvg.js"),
});
const VRectCanvas = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VRectCanvas.js"),
});
const VRectThree = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VRectThree.js"),
});
const VRectPdf = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VRectPdf.js"),
});

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
