import { inject } from "../deps/vue.js";
import { parseCoords } from "../internals.js";

export const VLinePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    if (sceneContext.pdf.value) {
    }
    return () => null;
  },
};
