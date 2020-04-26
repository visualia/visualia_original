import { inject } from "../deps/vue.js";
import { toNumber } from "../utils.js";
import { parseCoords, stylingPdf } from "../internals.js";

export const VCirclePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    const styles = stylingPdf(props);
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      page.drawCircle({
        ...styles,
        x: x,
        y: page.getHeight() - y,
        size: toNumber(props.r),
      });
      sceneContext.update();
    }
    return () => null;
  },
};
