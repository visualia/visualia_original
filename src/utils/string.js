export const shorten = (str, length = 50, suffix = "...") =>
  `${str.slice(0, length)}${str.length - 1 > length ? suffix : ""}`;

export const kebabcase = string =>
  string.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
