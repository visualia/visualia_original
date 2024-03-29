import {
  inject,
  ref,
  onMounted,
  onBeforeUpdate,
  onUpdated,
} from "../../dist/deps/vue.js";

import { sizeProps, useSize } from "../internals/size.js";

export default {
  props: { ...sizeProps },
  setup(props) {
    const el = ref(null);
    const ctx = ref(null);

    const { width, height } = useSize(props);

    const sceneContext = inject("sceneContext");
    sceneContext.width = width;
    sceneContext.height = height;
    sceneContext.ctx = ctx;
    sceneContext.update = () => {
      sceneContext.ctx.value.save();
      sceneContext.ctx.value.resetTransform();
      sceneContext.ctx.value.clearRect(0, 0, width.value, height.value);
      sceneContext.ctx.value.restore();
    };
    onMounted(() => {
      const canvas = el.value;
      canvas.width = width.value;
      canvas.height = height.value;
      sceneContext.ctx.value = canvas.getContext("2d");
    });
    onBeforeUpdate(() => {
      sceneContext.update();
    });
    return { el };
  },
  template: `
  <canvas ref="el">
    <slot />
  </canvas>
  `,
};
