import { inject } from "../../dist/deps/vue.js";
import {
  stylingProps,
  sizeProps,
  transformThreeProps,
  stylingPdf,
  combineTransforms,
} from "../internals.js";
import { toNumber, deg2rad } from "../utils.js";

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
      const width = toNumber(props.width);
      const height = toNumber(props.height);
      const centerX = props.x + position[0] + width / 2;
      const centerY =
        page.getHeight() - props.y - props.height - position[1] + height / 2;
      const alpha = deg2rad(rotation[2]);
      const x =
        centerX -
        (width / 2) * Math.cos(alpha) -
        (height / 2) * Math.sin(alpha);
      const y =
        centerY -
        (height / 2) * Math.cos(alpha) +
        (width / 2) * Math.sin(alpha);

      page.drawRectangle({
        x,
        y,
        width,
        height,
        rotate: { type: "degrees", angle: 360 - rotation[2] },
        ...styles,
      });
      sceneContext.update();
    }

    return () => null;
  },
};
