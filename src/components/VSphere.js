import { h, inject } from "../deps/vue.js";

import { VCircleSvg } from "./VCircleSvg.js";
import { VCircleCanvas } from "./VCircleCanvas.js";
import { VSphereThree } from "./VSphereThree.js";

import { stylingProps, transformThreeProps } from "../internals.js";
import { message } from "../utils.js";

export const VSphere = {
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
      three: VSphereThree,
      webgl: VSphereThree,
    };
    const sceneContext = inject("sceneContext");
    if (sceneContext) {
      if (modes[sceneContext.mode.value]) {
        return () => h(modes[sceneContext.mode.value], { ...props }, slots);
      } else {
        message(
          '`v-sphere` can only displayed on `mode="three" and `mode="webgl"`'
        );
        return () => null;
      }
    }
    message("`v-sphere` needs to placed inside `v-scene`");
  },
};
