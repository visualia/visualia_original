import {
  compileTemplate,
  compile as compileRuntime,
} from "../../dist/deps/vue.js";
import { parse } from "../../dist/deps/marked.js";

export const compile = (
  source,
  compilerType = "template",
  compilerOptions = {}
) => {
  const compiler =
    compilerType === "template" ? compileTemplate : compileRuntime;
  const options = { breaks: true, ...compilerOptions };
  const errors = [];
  let code = null;
  const markdown =
    compilerType === "template" ? source : parse(source, options);
  try {
    const compiledCode = compiler(markdown, {
      onError: (err) => {
        errors.push(err);
      },
    });
    code = compiledCode;
  } catch (e) {
    errors.push(e);
  }
  return { code, errors };
};
