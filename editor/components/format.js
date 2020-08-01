import { prettier, html, markdown } from "../../dist/deps/prettier.js";

const formatHtml = (str) =>
  prettier.format(str, {
    printWidth: 70,
    parser: "html",
    plugins: [html],
  });

const formatMarkdown = (str) =>
  prettier.format(str, {
    printWidth: 70,
    parser: "markdown",
    plugins: [markdown],
  });

export const formatVisualia = (str) => formatHtml(formatMarkdown(str));
