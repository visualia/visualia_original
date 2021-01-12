import { h, inject, provide } from "../../src/deps/vue.js";

import VScene from "./VScene.js";
import VGroupSvg from "./VGroupSvg.js";
import VGroupCanvas from "./VGroupCanvas.js";
import VGroupThree from "./VGroupThree.js";
import VGroupPdf from "./VGroupPdf.js";

import {
  transformThreeProps,
  getThreeTransform,
  combineTransforms,
} from "../internals.js";

export default {
  docs: `Creates a group`,
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
    if (sceneContext) {
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
    }

    return () =>
      sceneContext
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : h(VScene, h(modes.svg, props, slots));
  },
};
