import { prettier, html, markdown } from "../../src/deps/prettier.js";

const formatHtml = (str) =>
  prettier.format(str, {
    printWidth: 30,
    parser: "html",
    plugins: [html],
  });

const formatMarkdown = (str) =>
  prettier.format(str, {
    printWidth: 70,
    parser: "markdown",
    plugins: [markdown],
  });

export const formatVisualia = (str) => {
  let formattedStr = formatMarkdown(str);
  const matches = formattedStr.matchAll(/<v-[^>]*\/>/g);
  for (const match of matches) {
    formattedStr = formattedStr.replace(match[0], formatHtml(match[0]));
  }
  return formattedStr;
};
