import { inject } from "../deps/vue.js";
import { parseCoords, stylingPdf } from "../internals.js";

export const VSquarePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const position = parseCoords(props.position)[0];
    if (sceneContext.pdf.value) {
      const { pdfStyle } = stylingPdf(props, sceneContext.pdf.value);
      stylingPdf(props, sceneContext.pdf.value);
      sceneContext.pdf.value.rect(
        position[0] - props.r,
        position[1] - props.r,
        position[0] + props.r * 2,
        position[1] + props.r * 2,
        pdfStyle
      );
      sceneContext.update();
    }
    return () => null;
  },
};
