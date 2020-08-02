import { h } from "../../dist/deps/vue.js";
import { VCompiler } from "../internals.js";

import * as array from "../utils/array.js";
import * as string from "../utils/string.js";
import * as math from "../utils/math.js";
import * as trig from "../utils/trig.js";

const utils = { array, string, math, trig };

export default {
  props: {
    type: {
      type: String,
    },
  },
  setup(props) {
    const content = Object.entries(utils[props.type])
      .filter(([key, value]) => key.startsWith("docs"))
      .map(([key, value]) => `#### ${key.split("_")[1]}()\n\n${value}`)
      .join("\n\n");

    return () => h(VCompiler, { content });
  },
};
