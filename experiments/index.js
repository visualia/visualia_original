import { visualia } from "../dist/visualia.js";
import { VTextarea, VCompiler } from "../src/internals.js";
import {
  compile as compileVnode,
  ref,
  computed,
  watch,
  h,
  onErrorCaptured,
  nextTick,
  Suspense,
} from "../dist/deps/vue.js";

//from "../dist/deps/vue.js";
import { parse } from "../dist/deps/marked.js";
import { compile as compileDom } from "https://unpkg.com/@vue/compiler-dom@3.0.0-beta.14/dist/compiler-dom.esm-browser.js";

function formatError(err) {
  const loc = err.loc;
  return {
    //severity: monaco.MarkerSeverity.Error,
    startLineNumber: loc.start.line,
    startColumn: loc.start.column,
    endLineNumber: loc.end.line,
    endColumn: loc.end.column,
    message: `Vue template compilation error: ${err.message}`,
    code: String(err.code),
  };
}

const SuspenseWithError = {
  setup(_, { slots, emit }) {
    const error = ref(null);
    watch(
      () => slots.default(),
      (s) => {
        error.value = null;
        // emit("error", []);
      }
    );
    onErrorCaptured((e) => {
      error.value = e;
      emit("error", e);
      return true;
    });

    return { error };
  },
  template: `
  <div>{{ error }}</div>
  <slot v-if="error" name="error"><div /></slot>
  <Suspense v-else>
    <template #default>
      <slot name="default"></slot>
    </template>
    <template #fallback>
      <slot name="fallback"></slot>
    </template>
  </Suspense>
  `,
};

function compileCode(compiler, source) {
  const errors = [];
  let code = null;
  try {
    const compiledCode = compiler(source, {
      onError: (err) => {
        errors.push(err);
      },
    });
    code = compiledCode;
  } catch (e) {
    errors.push(e);
  }
  return { code, errors };
}

const VRender = {
  props: ["render"],
  setup(props) {
    const a = computed(() => props.render);
    try {
      return () => h(a.value);
    } catch (e) {
      console.log(e);
    }
  },
};

const VLife = {
  components: { VTextarea, VRender, VCompiler, Suspense, SuspenseWithError },
  setup() {
    const content = ref(`# Hello

<div>a</div>`);
    const contentCode = ref("");
    const contentErrors1 = ref([]);
    const contentErrors2 = ref([]);
    const contentErrors3 = ref([]);
    const contentTemplate = ref(null);

    const e = ref(false);
    const prevContent = ref(null);

    const contentErrors = computed(() => [
      ...contentErrors1.value,
      ...contentErrors2.value,
    ]);

    watch(
      () => content.value,
      () => {
        contentErrors3.value = [];
        const source = parse(content.value, { breaks: true });
        const { code: codeDom, errors: errorsDom } = compileCode(
          compileDom,
          source
        );
        contentCode.value = codeDom.code;
        contentErrors1.value = errorsDom.map(formatError);
        const { code: codeVnode, errors: errorsVnode } = compileCode(
          compileVnode,
          source
        );
        contentErrors2.value = errorsVnode;
        if (!contentErrors.value.length && !contentErrors2.value.length) {
          contentTemplate.value = codeVnode;
        }
      },
      { immediate: true }
    );
    const onError = (e) => {
      contentErrors3.value = [e];
    };

    return {
      content,
      contentCode,
      contentErrors,
      contentErrors1,
      contentErrors2,
      contentErrors3,
      contentTemplate,
      prevContent,
      onError,
    };
  },
  template: `
    <div style="height: 50vh; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 50vh auto auto;">
    <v-textarea
        :content="content"
        @input:content="c => content = c"
      />
    <div>
    <SuspenseWithError @error="onError">
      <template #default>
        <div :style="{ opacity: contentErrors.length ? 0.5 : 1}"
          style="transition: opacity 0.2s linear;">
        <v-render
          :render="contentTemplate"
        />
        </div>
      </template>
      <template #fallback>
        <span>Loading...</span>
      </template>
    </SuspenseWithError>
    </div>
    <!-- <pre style="background: #ddd; color: black;">{{ contentCode }}</pre> -->
    <pre style="background: #fdd; color: black;">{{ contentErrors }}</pre>
    <pre style="background: #ffd; color: black;">{{ contentErrors1 }}</pre>
    <pre style="background: #fdf; color: black;">{{ contentErrors2 }}</pre>
    <pre style="background: #fdf; color: black;">{{ contentErrors3 }}</pre>
    <pre style="background: #eee; color: black;">{{ contentTemplate }}</pre>
    <div>
   
    </div>
   
    </div>
  `,
};

visualia({ components: { VTextarea, VLife }, template: "<v-life />" });
