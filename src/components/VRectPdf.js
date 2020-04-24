import { inject } from "../deps/vue.js";
import { parseCoords, stylingPdf } from "../internals.js";
import { toNumber } from "../utils.js";

export const VRectPdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");

    const [posX, posY] = parseCoords(props.position)[0];
    const styles = stylingPdf(props);

    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      page.drawRectangle({
        ...styles,
        x: props.x + posX,
        y: page.getHeight() - (props.y + posY),
        width: toNumber(props.width),
        height: toNumber(props.height),
      });
      sceneContext.update();
    }
    return () => null;
  },
};
