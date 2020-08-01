import { ref } from "../../dist/deps/vue.js";

import { VApp } from "../../src/internals.js";
import { VSave } from "./VSave.js";
import { VMonaco } from "./VMonaco.js";

export const VEditor = {
  components: { VApp, VSave, VMonaco },
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
        @input:content="content => currentContent = content"
      />
    </div>
    <v-app
      style="overflow: auto; height: 100vh;"
      :content="currentContent"
      :menu="true"
    />
  </div>
  `,
  css: /* css */ `
    .hover-row * {
      color: white !important;
    }
    .hover-row code {
      font-family: var(--font-mono) !important;
      color: #569CD6 !important;
      background: none !important;
      padding: 0 !important;
    }
    .hover-row em {
      opacity: 0.25;
      font-style: normal;
    }
    .hover-row a {
      color: #9CDCFE !important;
      font-weight: normal !important;
    }
  `,
};
