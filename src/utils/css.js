export const getCssVariable = (value, el = document.body) =>
  getComputedStyle(el).getPropertyValue(value);

export const setCssVariable = (key, value, el = document.body.style) =>
  el.setProperty(key, value);

export const injectCss = css => {
  const el = document.createElement("style");
  el.innerHTML = css;
  document.querySelector("head").appendChild(el);
};

export const componentCss = components => {
  const css = Object.entries(components)
    .filter(([_, { css }]) => css)
    .map(([key, { css }]) => css)
    .join(" ")
    .replace("\r?\n", " ")
    .replace(/\s+/g, " ");
  injectCss(css);
};
