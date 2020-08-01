import { set, toNumber } from "../utils.js";
import { dynamicProps } from "../internals/dynamic.js";

export default {
  docs: `Creates a slider`,
  props: {
    ...dynamicProps,
    value: {
      default: 0,
      type: [String, Number],
      docs: "Initial slider value",
    },
  },
  setup(props, { emit }) {
    const currentStep = props.step ? props.step : props.smooth ? 0.000001 : 1;

    const setValue = (value) => {
      emit("value", value);
      if (props.set) {
        set(props.set, value);
      }
    };
    // TODO: Early update conflicts with VSceneCanvas, fix it
    // setValue(props.value);
    const onInput = (e) => {
      const currentValue = toNumber(e.target.value);
      setValue(currentValue);
    };
    return { onInput, currentStep };
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
