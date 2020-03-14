import { ref, inject, computed } from "../deps/vue.js";

import { sizeProps, useSize } from "../internals/size.js";

export const VSceneSvg = {
  props: { ...sizeProps },
  setup(props) {
    const el = ref(null);
    const { width, height, viewBox } = useSize(props);
    const unit = computed(() => 1);

    const sceneContext = inject("sceneContext");
    sceneContext.unit = unit;

    return { el, width, height, viewBox };
  },
  template: `<div ref="el">
    <svg
      :width="width"
      :height="width"
      :view-box.camel="viewBox"
    >
      <slot />
    </svg>
  </div>
  `
};
