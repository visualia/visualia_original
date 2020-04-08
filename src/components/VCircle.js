import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VCircleThree } from "./VCircleThree.js";

import {
  stylingProps,
  transformTwoProps,
  transformThreeProps,
} from "../internals.js";

export const VCircle = {
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
      svg: VCircleSvg,
      canvas: VCircleCanvas,
      three: VCircleThree,
      webgl: VCircleThree,
    };
    const sceneContext = inject("sceneContext");
    const transformProps = ["three", "webgl"].includes(sceneContext.mode.value)
      ? transformThreeProps
      : transformTwoProps;
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  },
};
