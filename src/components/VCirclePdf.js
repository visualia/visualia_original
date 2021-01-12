import { inject } from "../../src/deps/vue.js";
import { toNumber } from "../utils.js";
import {
  stylingProps,
  transformTwoProps,
  stylingPdf,
  combineTransforms,
  getThreeTransform,
} from "../internals.js";

export default {
  props: {
    r: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Square radius (half of the width)",
    },
    ...stylingProps,
    ...transformTwoProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");
    const styles = stylingPdf(props);
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      const { position } = combineTransforms(
        sceneContext.transform,
        getThreeTransform(props)
      );
      page.drawCircle({
        ...styles,
        x: position[0],
        y: page.getHeight() - position[1],
        size: toNumber(props.r),
      });
      sceneContext.update();
    }
    return () => null;
  },
};
