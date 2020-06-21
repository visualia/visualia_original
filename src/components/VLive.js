import { ref, watch } from "../../dist/deps/vue.js";
import { VSave, VTextarea, VContent } from "../internals.js";

export default {
  components: { VSave, VTextarea, VContent },
  props: {
    content: {
      default: "",
      type: String,
    },
    saveid: {
      default: null,
      type: String,
    },
  },
  setup(props) {
    const currentContent = ref(props.content);
    watch(
      () => props.content,
      (content) => (currentContent.value = content),
      { immediate: true }
    );
    const onLoad = (content) => (currentContent.value = content);
    return { currentContent, onLoad };
  },
  template: `
  <div class="v-live">
    <div style="display: flex; flex-direction: column;">
      <v-save
        v-if="saveid"
        :saveid="saveid"
        :content="content"
        :current-content="currentContent"
        @load="onLoad"
      />
      <v-textarea
        style="flex: 1;"
        :content="currentContent"
        @input:content="content => currentContent = content"
      />
    </div>
    <v-content
      style="overflow: auto; height: 350px;"
      :content="currentContent"
    />
  </div>
  `,
  css: `
    .v-live {
      grid-template-columns: 1fr 1fr;
      display: grid;
      box-shadow: 0 0 20px hsla(200, 19%, 28%, 0.1);
    }
    @media (max-width: 600px) {
      .v-live {
        grid-template-columns: 1fr;
        grid-template-rows: 80vw 80vw;
      }
    }
  `,
};
