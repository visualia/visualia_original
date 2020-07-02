export const dynamicProps = {
  set: {
    default: "",
    suggest: "x",
    type: String,
    docs: "Global variable name to set",
  },
  from: {
    default: 0,
    suggest: "0",
    type: [String, Number],
    docs: "Starting value",
  },
  to: {
    default: 360,
    suggest: "360",
    type: [String, Number],
    docs: "Ending value",
  },
  step: {
    default: "",
    type: [String, Number],
    docs: "Step value",
  },
  smooth: {
    default: false,
    type: [Boolean, String],
    docs: "Set a smooth step value (floating point)",
  },
};
