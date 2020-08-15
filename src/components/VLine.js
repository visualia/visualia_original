import {
  h,
  inject,
  defineAsyncComponent,
  Suspense,
} from "../../dist/deps/vue.js";

import VScene from "./VScene.js";
import VLineSvg from "./VLineSvg.js";
import VLineCanvas from "./VLineCanvas.js";
import VLineThree from "./VLineThree.js";
import VLinePdf from "./VLinePdf.js";

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
    return () =>
      sceneContext
        ? h(modes[sceneContext.mode.value], props, slots)
        : h(VScene, h(modes.svg, props, slots));
  },
};
