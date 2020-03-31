import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VCircleThree } from "./VCircleThree.js";

export const VCircle = {
  setup(props, { slots }) {
    const modes = {
      svg: VCircleSvg,
      canvas: VCircleCanvas,
      three: VCircleThree,
      webgl: VCircleThree
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  }
};
