import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VCircleThree } from "./VCircleThree.js";

export const VCircle = {
  setup(props, { slots }) {
    const types = {
      svg: VCircleSvg,
      canvas: VCircleCanvas,
      three: VCircleThree,
      webgl: VCircleThree
    };
    const sceneContext = inject("sceneContext");
    return () =>
      types[sceneContext.type.value]
        ? h(types[sceneContext.type.value], { ...props }, slots)
        : null;
  }
};
