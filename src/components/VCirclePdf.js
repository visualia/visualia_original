import { inject, watch } from "../deps/vue.js";

export const VCirclePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.pdf.value) {
        sceneContext.beforeDraw();
        sceneContext.pdf.value.circle(0, 0, props.r);
        sceneContext.afterDraw();
      }
    });
    return () => null;
  },
};
