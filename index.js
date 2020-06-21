import { visualia } from "./dist/visualia.js";

const files = [
  "./README.md",
  "./docs/components.md",
  "./docs/utils.md",
  "./docs/internals.md",
  "./docs/backstory.md",
  "./docs/faq.md",
];

visualia({
  files,
});
