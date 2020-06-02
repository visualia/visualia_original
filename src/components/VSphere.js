import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VSphereThree } from "./VSphereThree.js";

export const VSphere = (props, { slots }) => {
  const modes = {
    svg: VCircleSvg,
    canvas: VCircleCanvas,
    three: VSphereThree,
    webgl: VSphereThree,
  };
  const sceneContext = inject("sceneContext");
  return modes[sceneContext.mode.value]
    ? h(modes[sceneContext.mode.value], { ...props }, slots)
    : null;
};
