import { h, inject, provide, defineAsyncComponent } from "../deps/vue.js";

const VGroupSvg = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VGroupSvg.js"),
});
const VGroupCanvas = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VGroupCanvas.js"),
});
const VGroupThree = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VGroupThree.js"),
});
const VGroupPdf = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./VGroupPdf.js"),
});

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
