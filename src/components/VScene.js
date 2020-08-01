import {
  computed,
  h,
  provide,
  defineAsyncComponent,
} from "../../dist/deps/vue.js";

import VSceneSvg from "./VSceneSvg.js";
import VSceneCanvas from "./VSceneCanvas.js";
import VSceneThree from "./VSceneThree.js";
import VScenePdf from "./VScenePdf.js";

import {
  transformThreeProps,
  getThreeTransform,
  sizeProps,
} from "../internals.js";

export const VSceneThreeSvg = (props, context) =>
  h(VSceneThree, { ...props, renderer: "svg" }, context.slots);

export const VSceneThreeWebgl = (props, context) =>
  h(VSceneThree, { ...props, renderer: "webgl" }, context.slots);

const modes = ["svg", "canvas", "three", "webgl", "pdf"];

export default {
  docs: `Creates a graphics scene`,
  props: {
    mode: {
      default: "svg",
      suggest: modes,
      type: String,
      docs:
        "Rendering mode, can be either " +
        modes.map((m) => `\`${m}\``).join(", "),
    },
    isometric: {
      default: false,
      type: [Boolean, String],
      docs:
        "Use ortographic projection? Only applies to `three` and `webgl` render modes",
    },
    ...sizeProps,
    ...transformThreeProps,
  },
  setup(props, context) {
    const modes = {
      svg: VSceneSvg,
      canvas: VSceneCanvas,
      three: VSceneThreeSvg,
      webgl: VSceneThreeWebgl,
      pdf: VScenePdf,
    };
    const mode = computed(() => props.mode);
    const { position, rotation, scale } = getThreeTransform(props);
    provide("sceneContext", { mode, transform: { position, rotation, scale } });

    return () => h(modes[mode.value], { ...props }, context.slots);
  },
};
