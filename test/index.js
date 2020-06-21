import * as components from "../src/components.js";
import * as utils from "../src/utils.js";
import * as internals from "../src/internals.js";

const tests = Object.entries({
  ...components,
  ...utils,
  ...internals,
}).filter(([key]) => key.startsWith("test_"));

const exitCode = utils.test(tests);

if (typeof process === "object") {
  process.exit(exitCode);
}
