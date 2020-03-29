import { h, inject } from "../deps/vue.js";

import { VSquareSvg } from "./VSquareSvg.js";
import { VSquareCanvas } from "./VSquareCanvas.js";
import { VSquareThree } from "./VSquareThree.js";

import { parseCoords } from "../internals.js";

export const VSquare = {
  setup(props, { slots }) {
    const modes = {
      svg: VSquareSvg,
      canvas: VSquareCanvas,
      three: VSquareThree,
      webgl: VSquareThree
    };
    const sceneContext = inject("sceneContext");
    const positions = parseCoords(props.position);
    return () =>
      modes[sceneContext.mode.value]
        ? positions.map(position =>
            h(modes[sceneContext.mode.value], { ...props, position }, slots)
          )
        : null;
  }
};
