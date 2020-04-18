import {
  inject,
  ref,
  onMounted,
  onBeforeUpdate,
  onActivated,
} from "../deps/vue.js";

import { jsPDF } from "https://visualia.github.io/jspdf/dist/jspdf.js";

import { sizeProps, useSize } from "../internals/size.js";

export const VScenePdf = {
  props: { ...sizeProps },
  setup(props) {
    const el = ref(null);
    const pdf = ref(null);
    const src = ref(null);

    const { width, height } = useSize(props);

    const sceneContext = inject("sceneContext");

    pdf.value = new jsPDF({
      width: width.value,
      height: height.value,
    });

    sceneContext.pdf = pdf;

    onMounted(() => {
      src.value = sceneContext.pdf.value.output("datauristring");
    });

    sceneContext.update = () => {
      src.value = sceneContext.pdf.value.output("datauristring");
    };

    return { el, src, width, height };
  },
  template: `
  <slot />
  <iframe
    ref="el"
    :height="height"
    :width="width"
    :src="src"
    frameborder="0"
    scrolling="no"
  >
  </iframe>
  `,
};
