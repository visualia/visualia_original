import { get } from "../../dist/visualia.js";
import { ref, onMounted } from "../../dist/deps/vue.js";
import p5 from "https://cdn.skypack.dev/pin/p5@v1.1.9-QZRc7UPZWx2v3Qaby8jl/min/p5.js";

const sketch = (s) => {
  s.setup = () => {
    s.createCanvas(200, 200);
  };
  s.draw = () => {
    s.background(255);
    s.stroke(0);
    s.strokeWeight(2);
    s.circle(100, 100, get("a") || 10);
  };
};

export default {
  setup() {
    const el = ref(null);
    onMounted(() => {
      new p5(sketch, el.value);
    });
    return { el };
  },
  template: `
    <div ref="el" />
  `,
};
