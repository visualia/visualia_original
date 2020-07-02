import { get, set, toNumber } from "../utils.js";
import { dynamicProps } from "../internals/dynamic.js";

export default {
  props: {
    ...dynamicProps,
    value: {
      default: 0,
      type: [String, Number],
      docs: "Initial slider value",
    },
  },
  setup(props, { emit }) {
    const currentStep = props.step ? props.step : props.smooth ? 0.0000001 : 1;
    const setValue = (value) => {
      emit("value", value);
      if (props.set) {
        set(props.set, value);
      }
    };
    setValue(props.value);
    const onInput = (e) => {
      const currentValue = toNumber(e.target.value);
      setValue(currentValue);
    };
    return { currentStep, onInput };
  },
  template: `<input
    type="range"
    :value="value"
    @input="onInput"
    :min="from"
    :max="to"
    :step="currentStep"
  />`,
};
