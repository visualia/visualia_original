import { provide, inject, ref, createApp, Suspense } from "./src/deps/vue.js";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Co2 = {
  async setup() {
    const y = ref("Yo");
    provide("test", y);

    const { prettier, html } = await import(
      "http://visualia.github.io/prettier/dist/prettier.js"
    );

    await delay(1000);

    y.value = prettier.format("<h1>Hello world </h1>", {
      parser: "html",
      plugins: [html],
    });
  },
  template: `<slot />`,
};

const Co = {
  async setup() {
    const y = inject("test");
    const value = y;
    return { value };
  },
  template: `<div>{{ value }}</div>`,
};

const App = {
  components: { Suspense, Co, Co2 },
  setup() {
    const show = ref(false);
    return { show };
  },
  template: `
    <suspense>
      <template #default>
        <button @click="show = !show">toggle</button><div>{{ show }}</div>
        <co2 v-if="show"><co /></co2>
      </template>
      <template #fallback>
        <div>Loading</div>
      </template>
    </suspense>
  `,
};

createApp(App).mount("#app");
