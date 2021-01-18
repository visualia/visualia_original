import { visualia } from "./src/visualia.js";
import { defineAsyncComponent } from "./src/deps/vue.js";
import { VProps, VUtils } from "./src/internals.js";

import "./README.md";

// const P5Example = defineAsyncComponent(() => import("./docs/P5Example.js"));
// const ObservableExample = defineAsyncComponent(() =>
//   import("./docs/ObservableExample.js")
// );

visualia({
  file: "./README.md",
  components: { VProps, VUtils },
});
