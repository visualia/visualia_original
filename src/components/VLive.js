import { ref, watch, computed } from "../../src/deps/vue.js";
import { VSave, VTextarea, VContent, parseContent } from "../internals.js";

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

    const parsedContent = computed(() => parseContent(currentContent.value));

    return { currentContent, parsedContent, onLoad };
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
      <div style="overflow: auto; min-height: 350px;">
        <template v-for="(content,i) in parsedContent">
          <v-content :key="i" :content="content" style="overflow: hidden" />
        </template>
      </div>
  </div>
  `,
  css: /*css*/ `
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
