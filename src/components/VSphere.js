import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VSphereThree } from "./VSphereThree.js";

import { stylingProps, transformThreeProps } from "../internals.js";

export const VSphere = {
  props: {
    r: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Sphere radius",
    },
    segments: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Number of segments. Minimum value is 3",
    },
    ...stylingProps,
    ...transformThreeProps,
  },
  setup(props, { slots }) {
    const modes = {
      svg: VCircleSvg,
      canvas: VCircleCanvas,
      three: VSphereThree,
      webgl: VSphereThree,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  },
};
