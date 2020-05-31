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
const content = `
# Hello world

Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.

## Hi

Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.


Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.

Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.


---

# Help

Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
Observable is a Javascript-based interactive notebook for "exploring data and thinking with code". As Observable is built around the latest Javascript features, including ESM modules, the integration with Visualia is quite straightforward.
`;
visualia({
  content,
  components: { PfiveExample, ObservableExample },
});
