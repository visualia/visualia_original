import { h, inject } from "../../dist/deps/vue.js";

import { stylingProps, transformTwoProps, textProps } from "../internals.js";

import VScene from "./VScene.js";
import VTextSvg from "./VTextSvg.js";

export default {
  docs: `Outputs texts`,
  props: {
    fill: { ...stylingProps.fill, default: "black" },
    stroke: { ...stylingProps.stroke, default: "none" },
    strokeWidth: { ...stylingProps.strokeWidth, default: 0 },
    ...transformTwoProps,
    ...textProps,
  },
  setup(props, { slots }) {
    const modes = {
      svg: VTextSvg,
      canvas: null,
      three: null,
      webgl: null,
      pdf: null,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      sceneContext
        ? h(modes[sceneContext.mode.value], props, slots)
        : h(VScene, h(modes.svg, props, slots));
  },
};
