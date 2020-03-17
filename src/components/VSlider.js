import { set as storeSet, toNumber } from "../../visualia.js";
import { dynamicProps } from "../internals/dynamic.js";

export const VSlider = {
  props: {
    ...dynamicProps,
    value: {
      default: 0,
      type: [String, Number],
      docs: "Initial slider value"
    },
    step: {
      default: "",
      type: [String, Number],
      docs: "Slider step value"
    }
  },
  setup(props, { emit }) {
    const onInput = e => {
      const currentValue = toNumber(e.target.value);
      emit("value", currentValue);
      if (props.set) {
        storeSet(props.set, currentValue);
      }
    };
    return { onInput };
  },
  template: `<input
    type="range"
    :value="value"
    @input="onInput"
    :min="from"
    :max="to"
    :step="integer ? 1 : step ? step : 0.0001"
  />`
};
