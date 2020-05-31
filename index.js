import { visualia } from "./dist/visualia.js";

import { PfiveExample } from "./docs/PfiveExample.js";
import { ObservableExample } from "./docs/ObservableExample.js";

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
<v-scene>
  <v-rect position="100 100" width="50" height="50" />
</v-scene>
`;
visualia({
  content,
  components: { PfiveExample, ObservableExample },
});
