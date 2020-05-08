import { visualia } from "./dist/visualia.js";

import { PfiveExample } from "./docs/PfiveExample.js";
import { ObservableExample } from "./docs/ObservableExample.js";

visualia({
  file: "./README.md",
  components: { PfiveExample, ObservableExample },
});
