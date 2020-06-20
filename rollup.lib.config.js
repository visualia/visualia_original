import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: `./dist/visualia.js`,
    output: {
      file: `./dist/visualia.min.js`,
      format: "es",
    },
    inlineDynamicImports: true,
    plugins: [resolve(), commonjs(), terser()],
  },
];
