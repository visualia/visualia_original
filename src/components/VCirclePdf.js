import { inject } from "../deps/vue.js";
import { toNumber } from "../utils.js";
import { stylingPdf, parseCoords } from "../internals.js";

export const VCirclePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    if (sceneContext.pdf.value) {
      const { pdfStyle } = stylingPdf(props, sceneContext.pdf.value);
      sceneContext.pdf.value.circle(x, y, toNumber(props.r), pdfStyle);
      sceneContext.update();
    }
    return () => null;
  },
};
