import {
  prettier,
  html,
  markdown,
} from "https://visualia.github.io/prettier/dist/prettier.js";

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

export const formatVisualia = (str) => {
  let formattedStr = formatMarkdown(str);
  const matches = formattedStr.matchAll(/<v-[^>]*\/>/g);
  for (const match of matches) {
    formattedStr = formattedStr.replace(match[0], formatHtml(match[0]));
  }
  return formattedStr;
};

const p = `##  Hello


Our <f-math>documentation</f-math> helpful guides to get started.
Also, there          *is* a full editable reference to our 📦 131 components, covering everything from 2D/3D graphics, user interaction, comprehensive layouts, beautiful math and more.



<v-slider 
  alpha="100" :beta="100" @theta="100000" />`;

console.log(formatVisualia(p));
