export const lineProps = {
  points: {
    default: "0 0, 10 10",
    suggest: "0 0, 10 10",
    type: [String, Array, Object],
    docs: "Array of points that the line will follow",
  },
  closed: {
    default: false,
    type: [Boolean, String],
    docs: "Is it a closed line?",
  },
};
