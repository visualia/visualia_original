import { inject } from "../deps/vue.js";
import {
  lineProps,
  stylingProps,
  transformTwoProps,
  parseCoords,
  stylingPdf,
  combineTransforms,
} from "../internals.js";

import { line } from "../deps/d3-shape.js";

export default {
  props: {
    ...lineProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    const styles = stylingPdf(props);
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      const { position } = combineTransforms(sceneContext.transform, props);
      let parsedPoints = parseCoords(props.points);
      if (props.closed) {
        parsedPoints = [...parsedPoints, parsedPoints[0]];
      }
      const path = line()(parsedPoints);
      page.drawSvgPath(path, {
        ...styles,
        x: x + position[0],
        y: page.getHeight() - y - position[1],
      });
      sceneContext.update();
    }
    return () => null;
  },
};
