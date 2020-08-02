import {
  compileTemplate,
  compile as compileRuntime,
} from "../../dist/deps/vue.js";

import { Renderer, parse } from "../../dist/deps/marked.js";

export const compileSource = (source) => {
  const errors = [];
  let code = null;
  try {
    const compiledCode = compileTemplate(source, {
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

const renderer = new Renderer();

renderer.code = (code, info) => {
  const i = info.split(/\s+/);
  const saveid = i[1] ? `v-live-${i[1]}` : "";
  const escapedCode = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  if (i[0] === "live") {
    return `<p><v-live saveid="${saveid}" content="${escapedCode}" /></p>`;
  }
  return `<pre v-pre>${escapedCode}</pre>`;
};

renderer.heading = function (text, level, raw) {
  return `<v-heading text="${text}" level="${level}" raw="${raw}" />`;
};

// Polyfill for String.matchAll()

const matchAll = (pattern, haystack) => {
  const regex = new RegExp(pattern, "g");
  const matches = [];

  const result = haystack.match(regex);

  for (let index in result) {
    var item = result[index];
    matches[index] = item.match(new RegExp(pattern));
  }
  return matches;
};

const processContent = (content) => {
  let processedContent = content;
  const matches = matchAll(/(<([^>]+)>)/, content);
  for (const match of matches) {
    processedContent = processedContent.replace(
      match[0],
      match[0].replace(/\r?\n/g, " ").replace(/\s+/g, " ")
    );
  }
  return processedContent
    .replace(/<!---\s+/g, "")
    .replace(/\s+--->/g, "")
    .replace(/(@)(.*)(=)/g, "v-on:$2$3");
};

export const compileMarkdown = (source) => {
  const errors = [];
  let code = null;
  const markdown = parse(processContent(source), { breaks: true, renderer });
  try {
    const compiledCode = compileRuntime(markdown, {
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
