import { h, inject } from "../deps/vue.js";

import { VSphereThree } from "../internals/VSphereThree.js";

export default (props, { slots }) => {
  const modes = {
    svg: () => null,
    canvas: () => null,
    three: VSphereThree,
    webgl: VSphereThree,
  };
  const sceneContext = inject("sceneContext");
  return modes[sceneContext.mode.value]
    ? h(modes[sceneContext.mode.value], { ...props }, slots)
    : null;
};
