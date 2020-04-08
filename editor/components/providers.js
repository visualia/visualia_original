import {
  components as rawComponents,
  kebabcase,
  publicComponents,
  publicComponentsWithChildren,
} from "../../dist/visualia.js";

import * as monaco from "https://visualia.github.io/editor/dist/editor.js";

const components = Object.entries({ ...rawComponents })
  .filter(([key]) =>
    [...publicComponents, ...publicComponentsWithChildren].includes(key)
  )
  .map(([key, value]) => {
    return {
      pascalName: key,
      kebabName: kebabcase(key),
      about: value.docs ? value.docs.trim().split(/\n/)[0] : "",
      ...value,
    };
  });

const formatType = (typename) => {
  if (!Array.isArray(typename)) {
    typename = [typename];
  }
  return typename
    .map((t) =>
      typeof t == "function" ? (t() instanceof Array ? "array" : typeof t()) : t
    )
    .map((t) => `_${t}_`)
    .join(", ");
};

const formatProps = ({ props }) =>
  Object.entries(props)
    .map(
      ([key, value]) => `\`${key}="${value.default}"\` ${
        value.type ? formatType(value.type) : ""
      }\n
${value.description || ""}
  `
    )
    .join("\n---\n");

const formatDocs = (component) =>
  `[Source](https://github.com/visualia/visualia/blob/master/src/components/${component.pascalName}.js)`;

const formatSuggestions = (c) => {
  let formattedSuggestions = [];
  if (c.props) {
    const suggestions = Object.entries(c.props).filter(
      ([key, value]) => value.suggest
    );
    if (suggestions.length) {
      return suggestions.map(([key, value], i) => {
        return `${key}="\$\{${i + 1}:${value.suggest}\}"`;
      });
    }
  }
  return formattedSuggestions;
};
const tagSuggestions = (range) => {
  return components.map((c) => {
    const suggestions = formatSuggestions(c);
    let text = "";
    if (publicComponentsWithChildren.includes(c.pascalName)) {
      text = `<${c.kebabName}>\n  ${suggestions.join(" ")}\n\n$0</${
        c.kebabName
      }>`;
    } else {
      text = `<${c.kebabName} ${suggestions.join(" ")}${
        suggestions.length ? " " : ""
      }/>\n\n$0`;
    }
    return {
      label: c.kebabName,
      kind: monaco.languages.CompletionItemKind.Function,
      insertTextRules:
        monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
      insertText: text,
      documentation: "",
      range,
    };
  });
};

export const provideComponentsCompletion = (model, position) => {
  const word = model.getWordUntilPosition(position);
  if (word.word == "v") {
    var range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };
    return {
      suggestions: tagSuggestions(range),
    };
  }
  return [];
};

export const provideComponentsHover = (model, position) => {
  const word = model.getWordAtPosition(position);
  if (word) {
    var range = {
      startLineNumber: position.lineNumber,
      endLineNumber: position.lineNumber,
      startColumn: word.startColumn,
      endColumn: word.endColumn,
    };

    //    if (word.word.startsWith("v-")) {
    if (word.word.startsWith("v-")) {
      const component = components.filter((c) => c.kebabName == word.word)[0];

      if (component) {
        return {
          range,
          contents: [
            {
              value: `\`<${component.kebabName}>\``,
            },
            {
              value: `${component.docs || ""}`,
            },
            {
              value: formatDocs(component),
            },
            {
              value: formatProps(component),
            },
          ],
        };
      }
    }
  }
  return {};
};
