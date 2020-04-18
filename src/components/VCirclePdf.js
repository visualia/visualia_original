import { inject } from "../deps/vue.js";
import { stylingPdf, parseCoords } from "../internals.js";

export const VCirclePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const position = parseCoords(props.position)[0];
    if (sceneContext.pdf.value) {
      const { pdfStyle } = stylingPdf(props, sceneContext.pdf.value);
      sceneContext.pdf.value.circle(
        position[0],
        position[1],
        props.r,
        pdfStyle
      );
      sceneContext.update();
    }
    return () => null;
  },
};
