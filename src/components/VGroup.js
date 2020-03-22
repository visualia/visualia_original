import { h, inject } from "../deps/vue.js";

import { VGroupSvg } from "./VGroupSvg.js";
import { VGroupCanvas } from "./VGroupCanvas.js";
import { VGroupThree } from "./VGroupThree.js";

export const VGroup = {
  setup(props, { slots }) {
    const types = {
      svg: VGroupSvg,
      canvas: VGroupCanvas,
      three: VGroupThree,
      webgl: VGroupThree
    };
    const sceneContext = inject("sceneContext");
    return () => h(types[sceneContext.type.value], { ...props }, slots);
  }
};
