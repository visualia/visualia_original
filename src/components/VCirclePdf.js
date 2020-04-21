import { inject } from "../deps/vue.js";
import { toNumber } from "../utils.js";
import { parseCoords } from "../internals.js";

export const VCirclePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    const [x, y] = parseCoords(props.position)[0];
    return () => null;
  },
};
