import { h, inject, defineAsyncComponent } from "../deps/vue.js";

const VLineSvg = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VLineSvg.js"),
});
const VLineCanvas = defineAsyncComponent({
  suspensible: false,
  loader: () => "./VLineCanvas.js",
});
const VLineThree = defineAsyncComponent({
  suspensible: false,
  loader: () => "./VLineThree.js",
});
const VLinePdf = defineAsyncComponent({
  suspensible: false,
  loader: () => "./VLinePdf.js",
});

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
