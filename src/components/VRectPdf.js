import { inject } from "../deps/vue.js";
import { parseCoords, stylingPdf } from "../internals.js";

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
        width: width,
        height: height,
      });
      sceneContext.update();
    }
    return () => null;
  },
};
