import vue from "@vitejs/plugin-vue";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  alias: {
    vue: "vue/dist/vue.esm-bundler.js",
  },
  optimizeDeps: {
    include: ["vue/dist/vue.esm-bundler.js", "marked/lib/marked.esm.js"],
  },
  plugins: [vue()],
};

//dist/vue.esm-browser.prod.js
