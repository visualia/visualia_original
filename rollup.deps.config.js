import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-porter";
import copy from "rollup-plugin-copy";

const deps = [
  "anime",
  "chroma",
  "d3-color",
  "d3-scale",
  "d3-shape",
  "katex",
  "marked",
  "pdf-lib",
  "prettier",
  "resize-observer-polyfill",
  "three",
  "vue",
];

export default [
  ...deps.map((dep) => ({
    input: `./src/deps/${dep}.js`,
    output: {
      file: `./src/deps/${dep}.js`,
      format: "es",
    },
    plugins: [
      resolve(),
      commonjs(),
      json(),
      css({ dest: "./src/deps/katex.css", raw: false }),
      copy({
        targets: [
          { src: "node_modules/katex/dist/fonts/*", dest: "dist/deps/fonts" },
        ],
      }),
      terser(),
    ],
  })),
  {
    input: "./src/deps/monaco.js",
    output: {
      dir: "./src/deps/monaco",
      format: "es",
      chunkFileNames: "[name].js",
    },
    plugins: [
      css({ dest: "./src/deps/monaco/monaco.css", raw: false }),
      copy({
        targets: [
          {
            src:
              "node_modules/monaco-editor/esm/vs/base/browser/ui/codiconLabel/codicon/codicon.ttf",
            dest: "dist/deps/monaco",
          },
        ],
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: "node_modules/monaco-editor/esm/vs/editor/editor.worker.js",
    output: {
      file: "./src/deps/monaco/editor.worker.js",
      format: "umd",
      name: "editor",
    },
    plugins: [resolve(), commonjs(), terser()],
  },
];
