import { inject } from "../deps/vue.js";
import { parseCoords, stylingPdf } from "../internals.js";

const styleString = (stroke, fill) => {
  if (stroke && !fill) {
    return "S";
  }
  if (!stroke && fill) {
    return "F";
  }
  if (stroke && fill) {
    return "DF";
  }
  return "S";
};

export const VLinePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    if (sceneContext.pdf.value) {
      const absPoints = parseCoords(props.points);
      const relPoints = absPoints
        .map(([x, y], i) => {
          if (i > 0) {
            return [x - absPoints[i - 1][0], y - absPoints[i - 1][1]];
          }
        })
        .filter((c) => c);

      const { pdfStyle } = stylingPdf(props, sceneContext.pdf.value);

      sceneContext.pdf.value.lines(
        relPoints,
        absPoints[0][0],
        absPoints[0][1],
        [1, 1],
        pdfStyle
      );
      sceneContext.update();
    }
    return () => null;
  },
};
