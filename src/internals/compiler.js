import {
  compileTemplate,
  compile as compileRuntime,
} from "../../dist/deps/vue.js";
import { parse } from "../../dist/deps/marked.js";

export const compile = (source, compilerType = "template") => {
  const compiler =
    compilerType === "template" ? compileTemplate : compileRuntime;
  const errors = [];
  let code = null;
  const markdown = parse(source, { breaks: true });
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
