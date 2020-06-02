import { defineAsyncComponent } from "./src/deps/vue.js";
import { visualia } from "./dist/visualia.js";

// import PfiveExample from "./docs/PfiveExample.js";
// import ObservableExample from "./docs/ObservableExample.js";

const PfiveExample = defineAsyncComponent(() =>
  import("./docs/PfiveExample.js")
);

const ObservableExample = defineAsyncComponent(() =>
  import("./docs/ObservableExample.js")
);

const files = [
  "./README.md",
  "./docs/components.md",
  "./docs/utils.md",
  "./docs/integration.md",
  "./docs/internals.md",
  "./RELEASES.md",
  "./docs/backstory.md",
  "./docs/faq.md",
];

const content = `
<v-scene mode="svg">
  <v-line points="10 10, 30 40" position="100 100" width="50" height="50" />
</v-scene>
`;
visualia({
  files,
  components: { PfiveExample, ObservableExample },
});
