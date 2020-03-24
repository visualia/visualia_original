import { h, inject } from "../deps/vue.js";

import { VGroupSvg } from "./VGroupSvg.js";
import { VGroupCanvas } from "./VGroupCanvas.js";
import { VGroupThree } from "./VGroupThree.js";

import { parseCoords } from "../internals.js";

export const VGroup = {
  setup(props, { slots }) {
    const types = {
      svg: VGroupSvg,
      canvas: VGroupCanvas,
      three: VGroupThree,
      webgl: VGroupThree
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
