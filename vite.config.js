import vue from "@vitejs/plugin-vue";
import copy from "rollup-plugin-copy";
import path from "path";

/**
 * @type {import('vite').UserConfig}
 */
export default ({ command }) => {
  return {
    plugins: [
      vue(),
      copy({ targets: [{ src: "./README.md", dest: "./dist" }] }),
    ],
    build: {
      lib: {
        entry: "./src/visualia.js",
        formats: ["es"],
      },
      rollupOptions: {
        input: {
          main: "./index.html",
          editor: "./editor/index.html",
        },
      },
    },
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
    optimizeDeps: {
      include: [
        "vue/dist/vue.esm-bundler.js",
        "prettier/esm/standalone.mjs",
        "prettier/esm/parser-html.mjs",
        "prettier/esm/parser-markdown.mjs",
        "monaco-editor/esm/vs/editor/editor.worker.js",
      ],
    },
    assetsInclude: ["md"],
  };
};
