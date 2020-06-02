import { h, inject, provide } from "../deps/vue.js";

import { VGroupSvg } from "../internals/VGroupSvg.js";
import { VGroupCanvas } from "../internals/VGroupCanvas.js";
import { VGroupThree } from "../internals/VGroupThree.js";
import { VGroupPdf } from "../internals/VGroupPdf.js";

import {
  transformThreeProps,
  getThreeTransform,
  combineTransforms,
} from "../internals.js";

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

    const parentTransform = sceneContext.transform;
    const childTransform = getThreeTransform(props);
    const { position, rotation, scale } = combineTransforms(
      parentTransform,
      childTransform
    );

    provide("sceneContext", {
      ...sceneContext,
      transform: { position, rotation, scale },
    });
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  },
};
