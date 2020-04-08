import { h, inject } from "../deps/vue.js";

import { VSquareSvg } from "./VSquareSvg.js";
import { VSquareCanvas } from "./VSquareCanvas.js";
import { VSquareThree } from "./VSquareThree.js";

import { stylingProps, transformThreeProps } from "../internals.js";

export const VSquare = {
  props: {
    r: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Square radius (half of the width)",
    },
    ...stylingProps,
    ...transformThreeProps,
  },
  setup(props, { slots }) {
    const modes = {
      svg: VSquareSvg,
      canvas: VSquareCanvas,
      three: VSquareThree,
      webgl: VSquareThree,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  },
};
