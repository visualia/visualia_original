import { inject, ref, onMounted } from "../deps/vue.js";

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

    sceneContext.pdf = pdf;

    onMounted(() => {
      sceneContext.pdf.value = new jsPDF({
        width: width.value,
        height: height.value,
      });
      src.value = sceneContext.pdf.value.output("datauristring");
    });

    return { el, src, width, height };
  },
  template: `
  <iframe
    ref="el"
    width="width"
    height="height"
    :src="src"
    frame-border="0"
    scrolling="no"
  />
  `,
};
