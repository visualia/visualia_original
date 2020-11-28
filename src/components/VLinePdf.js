import { inject } from "../../dist/deps/vue.js";
import {
  lineProps,
  stylingProps,
  transformTwoProps,
  parseCoords,
  stylingPdf,
  combineTransforms,
  getThreeTransform,
} from "../internals.js";

import { line } from "../../dist/deps/d3-shape.js";

export default {
  props: {
    ...lineProps,
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");
    const styles = stylingPdf(props);
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      const { position, rotation, scale } = combineTransforms(
        sceneContext.transform,
        getThreeTransform(props)
      );
      let parsedPoints = parseCoords(props.points);
      if (props.closed) {
        parsedPoints = [...parsedPoints, parsedPoints[0]];
      }
      const path = line()(parsedPoints);
      page.drawSvgPath(path, {
        ...styles,
        x: position[0],
        y: page.getHeight() - position[1],
        rotate: { type: "degrees", angle: 360 - rotation[2] },
        scale: scale[0],
      });
      sceneContext.update();
    }
    return () => null;
  },
};
