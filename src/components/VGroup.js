import {
  h,
  inject,
  provide,
  defineAsyncComponent,
  Suspense,
} from "../deps/vue.js";

import VGroupSvg from "../internals/VGroupSvg.js";
import VGroupCanvas from "../internals/VGroupCanvas.js";
import VGroupThree from "../internals/VGroupThree.js";
import VGroupPdf from "../internals/VGroupPdf.js";

// const VGroupSvg = defineAsyncComponent(() =>
//   import("../internals/VGroupSvg.js")
// );
// const VGroupCanvas = defineAsyncComponent(() =>
//   import("../internals/VGroupCanvas.js")
// );
// const VGroupThree = defineAsyncComponent(() =>
//   import("../internals/VGroupThree.js")
// );
// const VGroupPdf = defineAsyncComponent(() =>
//   import("../internals/VGroupPdf.js")
// );

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
    // return () =>
    //   modes[sceneContext.mode.value]
    //     ? h(
    //         Suspense,
    //         null,
    //         h(modes[sceneContext.mode.value], { ...props }, slots)
    //       )
    //     : null;
    return () =>
      modes[sceneContext.mode.value]
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : null;
  },
};
