import {
  computed,
  h,
  provide,
  defineAsyncComponent,
} from "../../src/deps/vue.js";

import VSceneSvg from "./VSceneSvg.js";
import VSceneCanvas from "./VSceneCanvas.js";
import VSceneThree from "./VSceneThree.js";
import VScenePdf from "./VScenePdf.js";

import {
  transformThreeProps,
  getThreeTransform,
  sizeProps,
} from "../internals.js";

export const VSceneThreeSvg = (props, { slots }) =>
  h(VSceneThree, { ...props, renderer: "svg" }, slots);

export const VSceneThreeWebgl = (props, { slots }) =>
  h(VSceneThree, { ...props, renderer: "webgl" }, slots);

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
    position: {
      ...transformThreeProps.position,
      suggest: "",
    },
    rotation: {
      ...transformThreeProps.rotation,
      suggest: "",
    },
    scale: {
      ...transformThreeProps.scale,
      suggest: "",
    },
  },
  setup(props, { slots }) {
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

    return () => h(modes[mode.value], props, slots);
  },
};
