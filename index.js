import { visualia } from "./dist/visualia.js";
import { defineAsyncComponent } from "./dist/deps/vue.js";

const PfiveExample = defineAsyncComponent(() =>
  import("./experiments/docs/PfiveExample.js")
);

visualia({
  file: "./README.md",
  components: { PfiveExample },
});
