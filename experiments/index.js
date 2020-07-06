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

// const SuspenseWithError = {
//   setup() {
//     const error = ref(null);

//     onErrorCaptured((e) => {
//       error.value = e;

//       return true;
//     });

//     return { error };
//   },
//   template: `
//   <slot v-if="error" name="error"></slot>
//   <Suspense v-else>
//     <template #default>
//       <slot name="default"></slot>
//     </template>
//     <template #fallback>
//       <slot name="fallback"></slot>
//     </template>
//   </Suspense>
//   `,
// };

// const compileVnodes = (content) => {
//   let c = () => null;
//   while (true) {
//     try {
//       c = compile(parse(content, { breaks: true }), {
//         onError: (e) => console.log(e),
//       });
//       return c;
//     } catch (e) {
//       console.log(e);
//       break;
//     }
//   }
// };

//window.onerror((e) => console.log(e));

window.addEventListener("error", (e) => console.log(e));

// const compileVnodes = (content) => {
//   let c = () => null;
//   while (true) {
//     try {
//       c = compile(parse(content, { breaks: true }), {
//         onError: (e) => console.log(e),
//       });
//       return c;
//     } catch (e) {
//       console.log(e);
//       break;
//     }
//   }
// };

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

/*

const VRender = {
  components: { Suspense },
  props: ["render"],
  setup(props) {
    const oldRendered = ref(null);
    const rendered = ref(null);
    const r = computed(() => props.render);
    watch(
      () => r.value,
      (a, b) => {
        oldRendered.value = b;
        //rendered.value = a;
        rendered.value = b;
        // nextTick().then(() => {
        //   rendered.value = b;
        // });
        //console.log(a, b);
        // try {
        //   //const a = r.value();
        //   const a = h(r.value);
        //   rendered.value = r.value;
        //   nextTick(() => console.log(e.value));
        // } catch (error) {
        //   console.log(error);
        // } finally {
        //   //console.log("error");
        // }
        // nextTick().then(() => {
        //   if (e.value && b) {
        //     console.log("back");
        //     rendered.value = b;
        //   }
        // });
      },
      { immediate: true }
    );
    onErrorCaptured((e) => {
      console.log(e);
      //nextTick(() => (rendered.value = oldRendered.value));
    });

    return () => (rendered.value ? h(rendered.value) : null);
  },
};

*/

// const VRender = {
//   props: ["render"],
//   setup(props) {
//     const render = ref(null);
//     // const oldRender = ref(props.render);
//     // const newRender = ref(null);
//     // const r = computed(() => props.render);
//     // onErrorCaptured((e) => {
//     //   console.log(e);
//     //   nextTick().then(() => console.log("a"));
//     // });
//     watch(
//       () => props.render,
//       () => {
//         // console.log(a.value);
//         // console.log(b && b.value);
//         newRender.value = props.render;
//       }
//       //{ immediate: true }
//     );
//     return () => (newRender.value ? h(newRender.value) : null);
//   },
// };

// const VRender = {
//   props: ["render"],
//   setup(props) {
//     onErrorCaptured((e) => {
//       console.log(e);
//     });
//     const rendered = ref(null);
//     watch(
//       () => props.render,
//       () => {
//         rendered.value = props.render;
//       },
//       { immediate: true }
//     );
//     return () => (rendered.value ? h(rendered.value) : null);
//   },
// };

// const VRender = {
//   props: ["render"],
//   setup(props) {
//     const a = ref(null);
//     watch(
//       () => props.render,
//       () => {
//         try {
//           a.value = { render: props.render };
//         } catch (e) {
//           console.log("mjak");
//           a.value = { render: () => null };
//         } finally {
//           console.log("fak");
//         }
//       }
//     );
//     return () => a.value;
//     //return () => (compiledContent.value ? h(compiledContent.value) : null);
//   },
// };

/*
const VRender = {
  props: ["render"],
  setup(props) {
    onErrorCaptured((e) => {
      console.log(e);
    });
    const compiledContent = computed(() => {
      {
        return {
          render: props.render,
        };
      }
    });
    return () => (compiledContent.value ? h(compiledContent.value) : null);
    // try {
    //   const compiledContent = computed(() => {
    //     try {
    //       return {
    //         render: props.render,
    //       };
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   });
    //   return () => (compiledContent.value ? h(compiledContent.value) : null);
    // } catch (e) {
    //   console.log(e);
    // }
  },
};
*/
// const VRender = {
//   props: ["render"],
//   setup(props) {
//     const error = ref(false);
//     // onErrorCaptured((e) => {
//     //   console.log(e);
//     //   error.value = true;
//     // });
//     const rendered = ref(null);
//     watch(
//       () => props.render,
//       () => {
//         if (!error.value) {
//           rendered.value = props.render;
//         }
//         while (true) {
//           try {
//             // const a = h(props.render);
//             // console.log(a);
//             rendered.value = props.render;
//             break;
//           } catch (e) {
//             console.log(e);
//             break;
//           }
//         }
//       },
//       { immediate: true }
//     );
//     return () => (rendered.value && !error.value ? h(rendered.value) : null);
//   },
// };

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

// const VRender2 = {
//   props: ["render"],
//   setup(props) {
//     const compiledContent = computed(() => ({
//       render: props.render,
//     }));
//     return () => (compiledContent.value ? h(compiledContent.value) : null);
//   },
// };

// function compileCode2(source) {
//   const errors = [];
//   let code = null;
//   try {
//     const compiledCode = compile(source, {
//       onError: (err) => {
//         errors.push(err);
//       },
//     });
//     code = compiledCode;
//   } catch (e) {
//     console.log(e);
//   }
//   return { code, errors };
// }

/*
const VRender = {
  props: ["content"],
  setup(props) {
    onErrorCaptured((e) => console.log(e));
    const compiledContent = ref(null);
    // const compiledContent = computed(() => ({
    //   render: compileVnodes(props.content),
    // }));
    watch(
      () => props.content,
      () => {
        try {
          return () =>
            compiledContent.value ? h(compiledContent.value) : null;
        } catch (e) {
          //  return () => (compiledContent.value ? h(compiledContent.value) : null);
        } finally {
          console.log("f");
          //      return () => null;
        }
      }
    );

    //return () => (compiledContent.value ? h(compiledContent.value) : null);
  },
};
*/

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
        contentErrors1.value = errorsDom;
        const { code: codeVnode, errors: errorsVnode } = compileCode(
          compileVnode,
          source
        );
        contentErrors2.value = errorsVnode;
        if (!contentErrors.value.length && !contentErrors2.value.length) {
          contentTemplate.value = codeVnode;
          //contentTemplate.value = codeDom;
        }
      },
      { immediate: true }
    );
    const onError = (e) => {
      console.log(e);
      contentErrors3.value = [e];
    };
    // watch(
    //   () => content.value,
    //   () => {
    //     const { code, errors } = compileCode(
    //       parse(content.value, { breaks: true }),
    //       compileVnode
    //     );
    //     contentErrors2.value = errors;
    //     if (!contentErrors.value.length && !contentErrors2.value.length) {
    //       contentTemplate.value = code;
    //     }
    //   },
    //   { immediate: true }
    // );

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
    <!-- <div :style="{ opacity: contentErrors.length || contentErrors2.length ? 0.5 : 1}" style="transition: opacity 1s linear; color: black;">
      <suspense>
        <v-render :render="contentTemplate" />
      </suspense>
    </div> -->
    <!-- <v-compiler :content="content" /> -->
    </div>
  `,
};

visualia({ components: { VTextarea, VLife }, template: "<v-life />" });

/*

## Hello!

What the f is going on her?
<div @click="">hello</div>

*/
