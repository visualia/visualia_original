import { h, inject } from "../../src/deps/vue.js";

import VScene from "./VScene.js";
import { VSphereThree } from "./VSphereThree.js";

import { stylingProps, transformThreeProps } from "../internals.js";

export default {
  docs: `Creates a sphere. Only works in 3D modes`,
  props: {
    r: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Sphere radius",
    },
    segments: {
      default: 10,
      suggest: "10",
      type: [String, Number],
      docs: "Number of segments. Minimum value is 3",
    },
    ...stylingProps,
    ...transformThreeProps,
  },
  setup(props, { slots }) {
    const modes = {
      svg: () => null,
      canvas: () => null,
      three: VSphereThree,
      webgl: VSphereThree,
    };
    const sceneContext = inject("sceneContext");
    return () =>
      sceneContext
        ? h(modes[sceneContext.mode.value], { ...props }, slots)
        : h(VScene, { mode: "three" }, h(modes.three, props, slots));
  },
};
