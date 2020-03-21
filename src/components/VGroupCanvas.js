import { inject, onBeforeUpdate, watch, ref } from "../deps/vue.js";

import {
  transformTwoProps,
  transformCanvas,
  transformCanvasReset
} from "../internals.js";

export const VGroupCanvas = {
  props: {
    ...transformTwoProps
  },
  setup(props, { slots }) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.ctx.value) {
        transformCanvas(props, sceneContext.ctx.value);
      }
    });
    // watch(
    //   () => slots.default(),
    //   slots => {
    //     const node = nodes[0].children;
    //     math.value = katex.renderToString(String.raw`${node}`, {
    //       throwOnError: false
    //     });
    //   }
    // );
    // onBeforeUpdate(() => {
    //   watch(() => {
    //     if (sceneContext.ctx.value) {
    //       //console.log(sceneContext.ctx.value.getTransform());
    //       transformCanvas(props, sceneContext.ctx.value);
    //     }
    //   });
    // });
    // console.log(sceneContext.ctx.value);
    // if (sceneContext.ctx.value) {
    //   console.log(sceneContext.ctx.value);
    //   transformCanvas(props, sceneContext.ctx.value);
    // }
    // onBeforeUpdate(() => {
    //   transformCanvasReset(sceneContext.ctx.value);
    //   transformCanvas(props, sceneContext.ctx.value);
    // });
    // watch(() => {
    //   if (sceneContext.ctx.value) {
    //     transformCanvas(props, sceneContext.ctx.value);
    //   }
    // });
    //console.log(slots.default());
    return () => slots.default();
  }
};
