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
<v-scene v-for="m in ['svg','canvas','three','webgl','pdf']" :mode="m">
  <v-group position="100 15">
    <v-point />
    <v-circle />
  </v-group>
  <v-point position="20 25" />
  <v-line points="10 10, 30 40" position="100 100" width="50" height="50" />
  <v-polygon points="10 10, 30 40" position="50 50" width="50" height="50" />
  <v-rect r="50" position="100 100" width="50" height="50" />
  <v-hexagon r="50" position="100 100" width="50" height="50" />
  <v-square r="50" position="100 100" width="50" height="50" />
  <v-circle r="50" position="100 100" width="50" height="50" />
  <v-sphere r="10" position="150 150" width="50" height="50" />
</v-scene>
`;
visualia({
  content,
  components: { PfiveExample, ObservableExample },
});
