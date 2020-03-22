import { ref, watch } from "../deps/vue.js";

import { useLocalstore } from "../utils.js";

const VSave = {
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
    if (storedContent.value && storedContent.value !== props.currentContent) {
      emit("load", storedContent.value);
    }
    const onSave = () => {
      storedContent.value = props.currentContent;
    };
    return { onSave };
  },
  template: `
    <button @click="onSave">Save</button>
  `
};

export const VLive = {
  components: { VSave },
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
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));">
    <div>
      <v-save 
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
