import { ref, watch } from "../deps/vue.js";

export const VLive = {
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
    return { currentContent };
  },
  template: `
  <div
    style="display: grid; grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));">
    <v-editor
      :content="currentContent"
      @input:content="content => currentContent = content"
    />
    <v-content style="overflow: auto" :content="currentContent" />
  </div>
  `
};
