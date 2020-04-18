import { inject, watch } from "../deps/vue.js";

export const VCirclePdf = {
  setup(props) {
    const sceneContext = inject("sceneContext");
    // watch(() => {
    if (sceneContext.pdf.value) {
      sceneContext.pdf.value.circle(0, 0, props.r * 10);
      const a = [
        [0, 100],
        [100, 200],
        [0, 0],
      ];
      const b = a
        .map(([x, y], i) => {
          if (i > 0) {
            return [x - a[i - 1][0], y - a[i - 1][1]];
          }
        })
        .filter((c) => c);
      // console.log(a);
      console.log(b);
      //sceneContext.pdf.value.lines(a, 0, 0);
      sceneContext.pdf.value.lines(b, a[0][0], a[0][1]);

      //sceneContext.update();
    }
    // });
    return () => null;
  },
};
