import { visualia } from "./dist/visualia.js";

import { PfiveExample } from "./docs/PfiveExample.js";
import { ObservableExample } from "./docs/ObservableExample.js";

import { routes } from "./docs/routes.js";

visualia({
  routes,
  components: { PfiveExample, ObservableExample },
});
