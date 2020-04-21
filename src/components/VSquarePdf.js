import { inject } from "../deps/vue.js";
import { parseCoords } from "../internals.js";

export const VSquarePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      page.drawRectangle({
        x: x - props.r,
        y: page.getHeight() - y - props.r,
        width: props.r * 2,
        height: props.r * 2,
      });
      sceneContext.update();
    }
    ``;
    return () => null;
  },
};
