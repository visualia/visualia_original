import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VCircleThree } from "./VCircleThree.js";
import { parseCoords } from "../internals.js";

export const VCircle = {
  setup(props, { slots }) {
    const modes = {
      svg: VCircleSvg,
      canvas: VCircleCanvas,
      three: VCircleThree,
      webgl: VCircleThree
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
