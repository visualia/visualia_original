import { h, inject, defineAsyncComponent } from "../deps/vue.js";

import VLineSvg from "./VLineSvg.js";
import VLineCanvas from "./VLineCanvas.js";
import VLineThree from "./VLineThree.js";
import VLinePdf from "./VLinePdf.js";

// const VLineSvg = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VLineSvg.js"),
// });
// const VLineCanvas = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VLineCanvas.js"),
// });
// const VLineThree = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VLineThree.js"),
// });
// const VLinePdf = defineAsyncComponent({
//   suspensible: false,
//   loader: () => import("./VLinePdf.js"),
// });

import { lineProps, stylingProps, transformTwoProps } from "../internals.js";

export const VLine = {
  setup(props, { slots }) {
    const modes = {
      svg: VLineSvg,
      canvas: VLineCanvas,
      three: VLineThree,
      webgl: VLineThree,
      pdf: VLinePdf,
    };
    const sceneContext = inject("sceneContext");
    return () => h(modes[sceneContext.mode.value], props, slots);
  },
};
