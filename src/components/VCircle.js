import {
  h,
  inject,
  defineAsyncComponent,
  Suspense,
} from "../../dist/deps/vue.js";

import VCircleSvg from "../internals/VCircleSvg.js";
import VCircleCanvas from "../internals/VCircleCanvas.js";
import VCircleThree from "../internals/VCircleThree.js";
import VCirclePdf from "../internals/VCirclePdf.js";

// const VCircleSvg = defineAsyncComponent(() =>
//   import("../internals/VCircleSvg.js")
// );
// const VCircleCanvas = defineAsyncComponent(() =>
//   import("../internals/VCircleCanvas.js")
// );
// const VCircleThree = defineAsyncComponent(() =>
//   import("../internals/VCircleThree.js")
// );
// const VCirclePdf = defineAsyncComponent(() =>
//   import("../internals/VCirclePdf.js")
// );

import { stylingProps, transformTwoProps } from "../internals.js";

export default {
  r: {
    default: 10,
    suggest: "10",
    type: [String, Number],
    docs: "Square radius (half of the width)",
  },
  setup(props, { slots }) {
    const modes = {
      svg: VCircleSvg,
      canvas: VCircleCanvas,
      three: VCircleThree,
      webgl: VCircleThree,
      pdf: VCirclePdf,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], props, slots)
        : null;
  },
};
