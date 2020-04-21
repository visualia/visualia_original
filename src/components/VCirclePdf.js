import { inject } from "../deps/vue.js";
import { toNumber } from "../utils.js";
import { parseCoords } from "../internals.js";

export const VCirclePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      page.drawCircle({
        x: x,
        y: page.getHeight() - y,
        size: toNumber(props.r),
      });
      sceneContext.update();
    }
    return () => null;
  },
};
