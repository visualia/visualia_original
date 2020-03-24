import { h, inject } from "../deps/vue.js";

import { VSquareSvg } from "./VSquareSvg.js";
import { VSquareCanvas } from "./VSquareCanvas.js";
import { VSquareThree } from "./VSquareThree.js";

import { parseCoords } from "../internals.js";

export const VSquare = {
  setup(props, { slots }) {
    const types = {
      svg: VSquareSvg,
      canvas: VSquareCanvas,
      three: VSquareThree,
      webgl: VSquareThree
    };
    const sceneContext = inject("sceneContext");
    const positions = parseCoords(props.position);
    return () =>
      types[sceneContext.type.value]
        ? positions.map(position =>
            h(types[sceneContext.type.value], { ...props, position }, slots)
          )
        : null;
  }
};
