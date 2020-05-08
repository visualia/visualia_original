import { inject } from "../deps/vue.js";
import { toNumber } from "../utils.js";
import { parseCoords, stylingPdf, combineTransforms } from "../internals.js";

export const VCirclePdf = {
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
