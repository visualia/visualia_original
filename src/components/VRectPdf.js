import { inject } from "../deps/vue.js";
import { parseCoords, stylingPdf } from "../internals.js";

export const VSquarePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    const styles = stylingPdf(props);
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      page.drawRectangle({
        ...styles,
        x: x,
        y: page.getHeight() - y,
        width: props.width,
        height: props.height,
      });
      sceneContext.update();
    }
    return () => null;
  },
};
