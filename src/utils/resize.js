import { ref, onMounted } from "../../dist/deps/vue.js";

export const useResize = () => {
  const el = ref(null);
  const width = ref(null);
  const height = ref(null);
  onMounted(() => {
    const observer = new ResizeObserver(async (entries) => {
      width.value = entries[0].contentRect.width;
      height.value = entries[0].contentRect.height;
    });
    observer.observe(el.value);
  });
  return { el, width, height };
};
