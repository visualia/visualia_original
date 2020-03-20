import { h, inject } from "../deps/vue.js";

import { VLineSvg } from "./VLineSvg.js";
import { VLineCanvas } from "./VLineCanvas.js";
import { VLineThree } from "./VLineThree.js";

export const VLine = {
  setup(props, { slots }) {
    const types = {
      svg: VLineSvg,
      canvas: VLineCanvas,
      three: VLineThree,
      webgl: VLineThree
    };
    const sceneContext = inject("sceneContext");
    return () => h(types[sceneContext.type.value], { ...props }, slots);
  }
};
