import { h, inject } from "../../dist/deps/vue.js";

import { stylingProps, transformTwoProps, textProps } from "../internals.js";
import VTextSvg from "./VTextSvg.js";
import VTextCanvas from "./VTextCanvas.js";

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
      canvas: VTextCanvas,
      three: null,
      webgl: null,
      pdf: null,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], props, slots)
        : null;
  },
};
