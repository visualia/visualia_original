import { computed } from "../../dist/deps/vue.js";

import { useLocalstore } from "../utils.js";

export default {
  props: {
    content: {
      default: "",
      type: String,
    },
    currentContent: {
      default: "",
      type: String,
    },
    saveid: {
      required: true,
      type: String,
    },
  },
  setup(props, { emit }) {
    const storedContent = useLocalstore(null, props.saveid);
    const isSaved = computed(
      () =>
        storedContent.value &&
        storedContent.value !== props.content &&
        storedContent.value === props.currentContent
    );
    const isResetable = computed(
      () => storedContent.value && storedContent.value !== props.content
    );
    if (storedContent.value && storedContent.value !== props.currentContent) {
      emit("load", storedContent.value);
    }
    const onSave = () => {
      storedContent.value = props.currentContent;
    };
    const onReset = () => {
      storedContent.value = props.content;
      emit("load", storedContent.value);
    };
    return { isSaved, isResetable, onSave, onReset };
  },
  template: `
  <div style="
    padding: calc(var(--base) * 1.25);
    padding-bottom: 0;
    background: var(--darkpaleblue);
    display: flex;
    justify-content: space-between;
  ">
    <button
      v-if="isResetable"
      class="v-content-store-button"
      @click="onReset"
    >↩</button>
    <div v-if="!isSaved" />
    <button
      class="v-content-store-button"
      @click="onSave"
    >{{isSaved ? 'Saved' : 'Save'}}</button>
  </div>
  `,
  css: /*css*/ `
    .v-content-store-button {
      outline: none;
      border: none;
      background: none;
      color: white;
      font-family: var(--sans-serif);
      font-size: 12px;
      opacity: 0.5;
      padding: 0;
    }
  `,
};
