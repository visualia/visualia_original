import { inject, watch } from "../deps/vue.js";
import { parseCoords } from "../internals.js";

const styleString = (stroke, fill) => {
  if (stroke && !fill) {
    return "S";
  }
  if (!stroke && fill) {
    return "F";
  }
  if (stroke && fill) {
    return "DF";
  }
  return "";
};

export const VLinePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    watch(() => {
      if (sceneContext.pdf.value) {
        const absPoints = parseCoords(props.points);
        const relPoints = absPoints
          .map(([x, y], i) => {
            if (i > 0) {
              return [x - absPoints[i - 1][0], y - absPoints[i - 1][1]];
            }
          })
          .filter((c) => c);

        sceneContext.pdf.value.lines(
          relPoints,
          absPoints[0][0],
          absPoints[0][1],
          [1, 1]
        );
        sceneContext.update();
      }
    });
    return () => null;
  },
};
