import { VContent } from "../../src/components.js";
import { watch, ref } from "../../src/deps/vue.js";

import { VSave } from "./VSave.js";
import { VMonaco } from "./VMonaco.js";

export const VEditor = {
  components: { VContent, VSave, VMonaco },
  props: {
    content: {
      default: "",
      type: String,
    },
    saveid: {
      default: "editor",
      type: String,
    },
  },
  setup(props) {
    const currentContent = ref(props.content);

    const onLoad = (content) => {
      currentContent.value = content;
    };
    return { currentContent, onLoad };
  },
  template: `
  <div style="display: grid; grid-template-columns: 1fr 1fr; height: 100vh;">
    <div style="display: flex; flex-direction: column;">
      <v-save
        style="--darkpaleblue: #1e1e1e;"
        :saveid="saveid"
        :content="content"
        :current-content="currentContent"
        @load="onLoad"
      />
      <div style="background: #1e1e1e; height: 20px" />
      <v-monaco
        style="flex: 1;"
        :content="currentContent"
        @input:content="content => { currentContent = content }"
      />
    </div>
    <v-content
      style="overflow: auto; height: 100vh;"
      :content="currentContent"
      @input:content="content => currentContent = content"
    />
  </div>
  `,
};
