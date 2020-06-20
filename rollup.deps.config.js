import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

const deps = [
  "anime",
  "d3-color",
  "d3-shape",
  "katex",
  "marked",
  "pdf-lib",
  "prettier",
  "three",
  "vue",
];

export default [
  ...deps.map((dep) => ({
    input: `./deps/${dep}.js`,
    output: {
      file: `./src/deps/${dep}.js`,
      format: "es",
    },
    plugins: [resolve(), commonjs(), json(), terser()],
  })),
];
