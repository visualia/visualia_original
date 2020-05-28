import { visualia } from "./dist/visualia.js";

import { PfiveExample } from "./docs/PfiveExample.js";
import { ObservableExample } from "./docs/ObservableExample.js";

import { routes } from "./docs/routes.js";

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
visualia({
  file: files[0],
  components: { PfiveExample, ObservableExample },
});
