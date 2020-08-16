import {
  h,
  inject,
  Suspense,
  defineAsyncComponent,
} from "../../dist/deps/vue.js";

import VScene from "./VScene.js";
import VRectSvg from "./VRectSvg.js";
import VRectCanvas from "./VRectCanvas.js";
import VRectThree from "./VRectThree.js";
import VRectPdf from "./VRectPdf.js";

import {
  stylingProps,
  rectSizeProps,
  transformTwoProps,
} from "../internals.js";

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
    ...rectSizeProps,
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
      sceneContext
        ? h(modes[sceneContext.mode.value], props, slots)
        : h(VScene, h(modes.svg, props, slots));
  },
};
