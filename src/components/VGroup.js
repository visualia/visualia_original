import { h, inject } from "../deps/vue.js";

import { VGroupSvg } from "./VGroupSvg.js";
import { VGroupCanvas } from "./VGroupCanvas.js";
import { VGroupThree } from "./VGroupThree.js";
import { VGroupPdf } from "./VGroupPdf.js";

import { transformThreeProps, parseCoords } from "../internals.js";

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
    const positions = parseCoords(props.position);
    return () =>
      modes[sceneContext.mode.value]
        ? positions.map((position) =>
            h(modes[sceneContext.mode.value], { ...props, position }, slots)
          )
        : null;
  },
};
