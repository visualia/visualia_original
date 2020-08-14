import { h, inject } from "../../dist/deps/vue.js";

import VScene from "./VScene.js";
import VCircleSvg from "./VCircleSvg.js";
import VCircleCanvas from "./VCircleCanvas.js";
import VCircleThree from "./VCircleThree.js";
import VCirclePdf from "./VCirclePdf.js";

import { stylingProps, transformTwoProps } from "../internals.js";

export default {
  docs: `Creates a circle`,
  props: {
    r: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Square radius (half of the width)",
    },
    ...stylingProps,
    ...transformTwoProps,
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
      sceneContext
        ? h(modes[sceneContext.mode.value], props, slots)
        : h(VScene, h(modes.svg, props, slots));
  },
};
