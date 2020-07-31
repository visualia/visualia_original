import { inject } from "../../dist/deps/vue.js";
import { toNumber } from "../utils.js";
import {
  circleProps,
  stylingProps,
  transformTwoProps,
  parseCoords,
  stylingPdf,
  combineTransforms,
} from "../internals.js";

export default {
  props: {
    ...circleProps,
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
      page.drawCircle({
        ...styles,
        x: x + position[0],
        y: page.getHeight() - y - position[1],
        size: toNumber(props.r),
      });
      sceneContext.update();
    }
    return () => null;
  },
};
