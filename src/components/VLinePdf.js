import { inject } from "../deps/vue.js";
import { parseCoords } from "../internals.js";

import { line } from "../deps/d3-shape.js";

export const VLinePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    if (sceneContext.pdf.value) {
      const page = sceneContext.pdf.value.getPages()[0];
      const parsedPoints = parseCoords(props.points);
      const path = line()(parsedPoints);
      page.drawSvgPath(path, {
        x,
        y: page.getHeight() - y,
        borderColor: { type: "RGB", red: 0, green: 0, blue: 0 },
        borderWidth: 2,
      });
      sceneContext.update();
    }
    return () => null;
  },
};
