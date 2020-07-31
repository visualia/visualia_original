import { ref, watch, onErrorCaptured, Suspense } from "../../dist/deps/vue.js";

export default {
  components: { Suspense },
  setup(_, { slots, emit }) {
    const error = ref(null);
    watch(
      () => slots.default(),
      (s) => {
        error.value = null;
        // emit("error", []);
      }
    );
    onErrorCaptured((e) => {
      error.value = e;
      emit("error", e);
      return true;
    });

    return { error };
  },
  template: `
  <div v-if="error">Error: {{ error }}</div>
  <Suspense v-else>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
  `,
};
