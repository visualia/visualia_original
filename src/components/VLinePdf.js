import { inject } from "../deps/vue.js";
import { parseCoords, stylingPdf } from "../internals.js";

import { line } from "../deps/d3-shape.js";

export const VLinePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    const styles = stylingPdf(props);
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      let parsedPoints = parseCoords(props.points);
      if (props.closed) {
        parsedPoints = [...parsedPoints, parsedPoints[0]];
      }
      const path = line()(parsedPoints);
      page.drawSvgPath(path, {
        ...styles,
        x,
        y: page.getHeight() - y,
      });
      sceneContext.update();
    }
    return () => null;
  },
};
