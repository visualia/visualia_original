import { inject } from "../../dist/deps/vue.js";
import {
  stylingProps,
  transformTwoProps,
  parseCoords,
  stylingPdf,
  combineTransforms,
  textProps,
} from "../internals.js";
import { toNumber } from "../utils.js";

export default {
  props: {
    fill: { ...stylingProps.fill, default: "black" },
    stroke: { ...stylingProps.stroke, default: "none" },
    strokeWidth: { ...stylingProps.strokeWidth, default: 0 },
    ...transformTwoProps,
    ...textProps,
  },
  async setup(props, { slots }) {
    const sceneContext = inject("sceneContext");

    const [posX, posY] = parseCoords(props.position)[0];
    const styles = stylingPdf(props);

    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      const { position } = combineTransforms(sceneContext.transform, props);

      const { StandardFonts } = await import("../../dist/deps/pdf-lib.js");
      const helveticaFont = await sceneContext.pdf.value.embedFont(
        StandardFonts.Helvetica
      );
      const text = slots.default()[0].children;
      //      console.log(props.x, posX, position[0]);
      page.drawText(text, {
        ...styles,
        // x: props.x + posX + position[0]
        x: posX + position[0],
        // y: page.getHeight() - props.y - props.height - posY - position[1],
        y: page.getHeight() - posY - position[1],
        font: helveticaFont,
        size: props.fontSize,
      });
      sceneContext.update();
    }
    return () => null;
  },
};
