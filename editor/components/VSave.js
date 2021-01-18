import { computed } from "../../src/deps/vue.js";
import { useLocalstore, send } from "../../src/utils.js";

export const VSave = {
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
    const onFormat = () => send("format");

    return { isSaved, isResetable, onSave, onReset, onFormat };
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
    <div>
      <button
        class="v-content-store-button"
        style="margin-right: var(--base2);"
        @click="onFormat"
      >
        Format
      </button>
      <button
        class="v-content-store-button"
        @click="onSave"
      >{{isSaved ? 'Saved' : 'Save'}}
      </button>
    </div>
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
