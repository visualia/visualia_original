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
    type: {
      default: "svg",
      type: String
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
