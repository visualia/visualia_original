export default {
  setup(props, { slots }) {
    return () => slots.default();
  },
};
