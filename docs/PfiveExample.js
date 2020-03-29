import { get } from "../dist/visualia.js";
import { ref, onMounted } from "../src/deps/vue.js";
import { p5 } from "https://visualia.github.io/p5/p5.js";

// p5 sketch

// Note that you need to wrap into the sketch function
// and prefix all commands with s, otherwise it is regular p5 API

// Note that we use get() function to use Visualia live variables

const sketch = s => {
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

// We are creating a wrapper component <pfive-example />

export const PfiveExample = {
  setup() {
    const el = ref(null);
    onMounted(() => {
      new p5(sketch, el.value);
    });
    return { el };
  },
  template: `
    <div ref="el" />
  `
};
