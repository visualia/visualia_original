import { h } from "../../dist/deps/vue.js";
import * as utils from "../utils.js";
import { VCompiler } from "../internals.js";

export default {
  setup() {
    const content = Object.entries(utils)
      .filter(([key, value]) => key.startsWith("docs"))
      .map(([key, value]) => `### ${key.split("_")[1]}()\n\n${value}`)
      .join("\n\n");

    return () => h(VCompiler, { content });
  },
};
