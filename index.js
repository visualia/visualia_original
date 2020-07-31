import { visualia } from "./dist/visualia.js";
import { defineAsyncComponent } from "./dist/deps/vue.js";

const P5Example = defineAsyncComponent(() =>
  import("./experiments/docs/P5Example.js")
);

visualia({
  file: "./README.md",
  components: { P5Example },
});
