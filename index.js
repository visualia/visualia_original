import { defineAsyncComponent } from "./src/deps/vue.js";
import { visualia } from "./dist/visualia.js";

// import PfiveExample from "./docs/PfiveExample.js";
// import ObservableExample from "./docs/ObservableExample.js";

const PfiveExample = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./docs/PfiveExample.js"),
});

const ObservableExample = defineAsyncComponent({
  suspensible: false,
  loader: () => import("./docs/ObservableExample.js"),
});

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
<template v-for="m in ['three']">
<p>v-line {{ m }}</p>
<v-scene :mode="m">
  <v-circle r="50" points="10 10, 30 40" position="100 100" width="50" height="50" />
</v-scene>
</template>
<!--template v-for="m in ['svg','canvas','three','webgl','pdf']">
<p>v-line {{ m }}</p>
<v-scene :mode="m">
  <v-line r="50" points="10 10, 30 40" position="100 100" width="50" height="50" />
</v-scene>
</template-->
`;
visualia({
  content,
  components: { PfiveExample, ObservableExample },
});
