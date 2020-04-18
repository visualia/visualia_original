import { inject, watch } from "../deps/vue.js";
import { stylingPdf } from "../internals.js";

export const VSquarePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.pdf.value) {
        stylingPdf(props, sceneContext.pdf.value);
        sceneContext.pdf.value.rect(
          -props.r,
          -props.r,
          props.r * 2,
          props.r * 2
        );
        sceneContext.update();
      }
    });
    return () => null;
  },
};
