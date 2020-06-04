import { inject } from "../deps/vue.js";
import {
  stylingProps,
  sizeProps,
  transformTwoProps,
  parseCoords,
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
    ...transformTwoProps,
  },
  setup(props) {
    const sceneContext = inject("sceneContext");

    const [posX, posY] = parseCoords(props.position)[0];
    const styles = stylingPdf(props);

    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      const { position } = combineTransforms(sceneContext.transform, props);
      page.drawRectangle({
        ...styles,
        x: props.x + posX + position[0],
        y: page.getHeight() - props.y - props.height - posY - position[1],
        width: toNumber(props.width),
        height: toNumber(props.height),
      });
      sceneContext.update();
    }
    return () => null;
  },
};
