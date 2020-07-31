import {
  h,
  inject,
  defineAsyncComponent,
  Suspense,
} from "../../dist/deps/vue.js";

import VLineSvg from "../internals/VLineSvg.js";
import VLineCanvas from "../internals/VLineCanvas.js";
import VLineThree from "../internals/VLineThree.js";
import VLinePdf from "../internals/VLinePdf.js";

import { lineProps, stylingProps, transformTwoProps } from "../internals.js";

export default {
  docs: `Creates a line`,
  props: {
    ...lineProps,
    ...stylingProps,
    ...transformTwoProps,
  },
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
