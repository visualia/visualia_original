export const dynamicProps = {
  set: {
    default: "",
    autofill: "a",
    type: String,
    docs: "Global variable name to set",
  },
  from: {
    default: 0,
    autofill: "0",
    type: [String, Number],
    docs: "Starting value",
  },
  to: {
    default: 360,
    autofill: "360",
    type: [String, Number],
    docs: "Ending value",
  },
  integer: {
    default: false,
    type: [Boolean, String],
    docs: "Output an interger value (instead floating point)?",
  },
};
