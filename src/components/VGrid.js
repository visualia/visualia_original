import { ref, watch } from "../../dist/deps/vue.js";

// TODO: Add cols and rows props
// TODO: Consider to add the areas prop

export default {
  setup(_, { slots }) {
    const colCount = ref(1);

    // We are watching the changes on the component
    // children and adjust colCount value accordingly
    watch(
      () => slots.default && slots.default(),
      (changedSlots) => {
        if (changedSlots) {
          if (changedSlots.length > 1) {
            colCount.value = changedSlots.length;
          } else if (changedSlots[0].children) {
            colCount.value = changedSlots[0].children.length;
          }
        }
      },
      { immediate: true }
    );
    return { colCount };
  },
  template: `
    <div
    style="
      display: grid;
      grid-gap: var(--base2);
    "
    :style="{
      gridTemplateColumns: 'repeat(' + colCount + ', 1fr)',
    }"
  >
    <slot />
  </div>
  `,
};
