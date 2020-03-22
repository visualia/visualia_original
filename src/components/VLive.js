import { ref, watch, computed } from "../deps/vue.js";

import { useLocalstore } from "../utils.js";

export const VContentStore = {
  props: {
    content: {
      default: "",
      type: String
    },
    currentContent: {
      default: "",
      type: String
    }
  },
  setup(props, { emit }) {
    const storedContent = useLocalstore(null, "a");
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
  css: `
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
  `
};

export const VLive = {
  components: { VContentStore },
  props: {
    content: {
      default: "",
      type: String
    }
  },
  setup(props) {
    const currentContent = ref(props.content);
    watch(
      () => props.content,
      content => (currentContent.value = content)
    );
    const onLoad = content => (currentContent.value = content);
    return { currentContent, onLoad };
  },
  template: `
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
      height: 300px;
    "
  >
    <div style="height: 100%;">
      <v-content-store 
        :content="content"
        :current-content="currentContent"
        @load="onLoad"
      />
      <v-editor
        :content="currentContent"
        @input:content="content => currentContent = content"
      />
    </div>
    <v-content style="overflow: auto" :content="currentContent" />
  </div>
  `
};
