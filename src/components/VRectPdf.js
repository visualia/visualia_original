import { inject } from "../../dist/deps/vue.js";
import {
  stylingProps,
  sizeProps,
  transformThreeProps,
  stylingPdf,
  combineTransforms,
} from "../internals.js";
import { toNumber } from "../utils.js";

export default {
  props: {
    x: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner x coordinate",
    },
    y: {
      default: 0,
      suggest: "0",
      type: [String, Number],
      docs: "Rectangle top left corner y coordinate",
    },
    ...sizeProps,
    ...stylingProps,
    ...transformThreeProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const styles = stylingPdf(props);

    if (sceneContext.pdf.value) {
      // Get the first and the only page of the PDF
      const page = sceneContext.pdf.value.getPages()[0];
      const { position, rotation } = combineTransforms(
        sceneContext.transform,
        props
      );
      // https://github.com/Hopding/pdf-lib/issues/572
      page.drawRectangle({
        ...styles,
        x: props.x + position[0],
        y: page.getHeight() - props.y - props.height - position[1],
        width: toNumber(props.width),
        height: toNumber(props.height),
        rotate: { type: "degrees", angle: 360 - rotation[2] },
      });
      sceneContext.update();
    }

    return () => null;
  },
};
