import { h, inject } from "../deps/vue.js";

import { VSquareSvg } from "./VSquareSvg.js";
import { VSquareCanvas } from "./VSquareCanvas.js";
import { VSquareThree } from "./VSquareThree.js";

export const VSquare = {
  setup(props, { slots }) {
    const modes = {
      svg: VSquareSvg,
      canvas: VSquareCanvas,
      three: VSquareThree,
      webgl: VSquareThree
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  }
};
