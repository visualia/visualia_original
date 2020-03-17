import { computed, h, provide } from "../deps/vue.js";

import { VSceneSvg } from "./VSceneSvg.js";
import { VSceneCanvas } from "./VSceneCanvas.js";
import { VSceneThree } from "./VSceneThree.js";

import { sizeProps } from "../internals/size.js";

export const VSceneThreeSvg = (props, context) =>
  h(VSceneThree, { ...props, renderer: "svg" }, context.slots);

export const VSceneThreeWebgl = (props, context) =>
  h(VSceneThree, { ...props, renderer: "webgl" }, context.slots);

export const VScene = {
  props: {
    // sizeProps are here just for props documentation,
    // the component passes through all passed props anyway
    ...sizeProps,
    type: {
      default: "svg",
      type: String,
      docs:
        "Rendering type, could be either `svg`, `canvas`, `three` or `webgl`"
    }
  },
  setup(props, context) {
    const types = {
      svg: VSceneSvg,
      canvas: VSceneCanvas,
      three: VSceneThreeSvg,
      webgl: VSceneThreeWebgl
    };
    const type = computed(() => props.type);
    provide("sceneContext", { type });

    return () => h(types[type.value], { ...props }, context.slots);
  }
};
