import { inject } from "../../dist/deps/vue.js";
import { parse, Renderer } from "../../dist/deps/marked.js";
import { slug } from "../utils.js";
import { formatHash } from "../internals.js";

const generateMenu = (content) => {
  const router = inject("router");
  const renderer = new Renderer();
  let menu = [];
  renderer.heading = function (text, level, raw) {
    const anchor = slug(raw);
    menu.push({
      anchor: anchor,
      level: level,
      text: text,
    });
  };
  parse(content, { renderer });
  return menu;
};

export const cleanColumns = (content) => {
  const pattern = /(\|[0-9\s]+\r?\n)/g;
  return content.replace(pattern, "");
};

const parseMeta = (row) => {
  const meta = row
    .replace(/\|/g, "")
    .split(": ")
    .map((s) => s.trim());
  return meta;
};

export const parsePage = (page) => {
  let meta = [];
  const metaPattern = /(\|\s(.*?):\s+(.*)\r?\n)/g;
  const metaMatch = page.match(metaPattern);
  if (metaMatch && metaMatch.length) {
    meta = metaMatch.map(parseMeta);
    page = page.replace(metaPattern, "");
  }
  const pattern = /(\|[0-9\s]+\r?\n)/g;
  const match = page.match(pattern);
  if (match) {
    const rowCount = match.length;
    const cols = match.map((m) => {
      return m
        .trim()
        .replace(/\|/g, "")
        .split(/\s+/)
        .filter((m) => m && !m.match(/\s+/));
    });
    const colCount = cols[0].length;
    const areas = cols
      .map((m) => `'${m.map((m) => `a${m}`).join(" ")}'`)
      .join("\n");
    const content = page
      .split(/\r?\n-\r?\n/)
      .map((c) => c.replace(pattern, ""));
    const menu = generateMenu(page);

    return {
      rowCount,
      colCount,
      areas,
      content,
      menu,
      ...Object.fromEntries(meta),
    };
  } else {
    const content = page.split(/\r?\n-\r?\n/);
    const menu = generateMenu(page);
    return {
      rowCount: 1,
      colCount: content.length,
      areas: `'${content.map((_, i) => `a${i + 1}`).join(" ")}'`,
      content,
      menu,
      ...Object.fromEntries(meta),
    };
  }
};

export const parseContent = (document) => {
  return document.split(/\r?\n---\r?\n/).map(parsePage);
};

export const contentGridStyle = (section) => {
  return {
    gridTemplateColumns: section.cols
      ? section.cols
      : "repeat(" + section.colCount + ", 1fr)",
    gridTemplateRows: section.rows
      ? section.rows
      : section.rowCount > 1
      ? "repeat(" + (section.rowCount - 1) + ", auto) 1fr"
      : "1fr",
    gridTemplateAreas: section.areas,
    gridGap: section.gap ? section.gap : "var(--base3)",
  };
};
