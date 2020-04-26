import { h, inject, provide } from "../deps/vue.js";

import { VGroupSvg } from "./VGroupSvg.js";
import { VGroupCanvas } from "./VGroupCanvas.js";
import { VGroupThree } from "./VGroupThree.js";
import { VGroupPdf } from "./VGroupPdf.js";

import { transformThreeProps, getThreeTransform } from "../internals.js";

export const VGroup = {
  props: {
    ...transformThreeProps,
  },
  setup(props, { slots }) {
    const modes = {
      svg: VGroupSvg,
      canvas: VGroupCanvas,
      three: VGroupThree,
      webgl: VGroupThree,
      pdf: VGroupPdf,
    };
    const sceneContext = inject("sceneContext");
    const { position, rotation, scale } = getThreeTransform(props);
    provide("sceneContext", {
      ...sceneContext,
      position,
      rotation,
      scale,
    });
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  },
};
