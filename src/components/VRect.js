import {
  h,
  inject,
  Suspense,
  defineAsyncComponent,
} from "../../dist/deps/vue.js";

import VRectSvg from "../internals/VRectSvg.js";
import VRectCanvas from "../internals/VRectCanvas.js";
import VRectThree from "../internals/VRectThree.js";
import VRectPdf from "../internals/VRectPdf.js";

import { stylingProps, sizeProps, transformTwoProps } from "../internals.js";

export default {
  docs: `Creates a rectangle`,
  props: {
    x: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner x coordinate",
    },
    y: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner y coordinate",
    },
    ...sizeProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props, { slots }) {
    const modes = {
      svg: VRectSvg,
      canvas: VRectCanvas,
      three: VRectThree,
      webgl: VRectThree,
      pdf: VRectPdf,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], props, slots)
        : null;
  },
};
