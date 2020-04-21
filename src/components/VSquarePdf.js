import { inject, watch } from "../deps/vue.js";
import { parseCoords, stylingPdf } from "../internals.js";

export const VSquarePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    // watch(
    //   () => sceneContext.pdf,
    //   () => {
    if (sceneContext.pdf.value) {
      console.log(sceneContext.pdf.value.drawRectangle);
      // const { pdfStyle } = stylingPdf(props, sceneContext.pdf.value);
      // stylingPdf(props, sceneContext.pdf.value);
      sceneContext.pdf.value.drawRectangle({
        x: 10,
        y: 10,
        width: 10,
        height: 10,
      });
    }
    //   }
    // );
    return () => null;
  },
};
