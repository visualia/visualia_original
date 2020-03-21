import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VSphereThree } from "./VSphereThree.js";

export const VSphere = {
  setup(props, { slots }) {
    const types = {
      svg: VCircleSvg,
      canvas: VCircleCanvas,
      three: VSphereThree,
      webgl: VSphereThree
    };
    const sceneContext = inject("sceneContext");
    return () =>
      types[sceneContext.type.value]
        ? h(types[sceneContext.type.value], { ...props }, slots)
        : null;
  }
};
