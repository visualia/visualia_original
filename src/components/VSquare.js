import { h, inject } from "../deps/vue.js";

import { VSquareSvg } from "./VSquareSvg.js";
import { VSquareCanvas } from "./VSquareCanvas.js";
import { VSquareThree } from "./VSquareThree.js";

export const VSquare = {
  setup(props, { slots }) {
    const types = {
      svg: VSquareSvg,
      canvas: VSquareCanvas,
      three: VSquareThree,
      webgl: VSquareThree
    };
    const sceneContext = inject("sceneContext");
    return () => h(types[sceneContext.type.value], { ...props }, slots);
  }
};
