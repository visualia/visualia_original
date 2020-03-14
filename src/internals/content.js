export const cleanColumns = content => {
  const pattern = /(\|[0-9\s]+\r?\n)/g;
  return content.replace(pattern, "");
};

const parseMeta = row => {
  const meta = row
    .replace(/\|/g, "")
    .split(": ")
    .map(s => s.trim());
  return meta;
};

export const parsePage = page => {
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
    const cols = match.map(m => {
      return m
        .trim()
        .replace(/\|/g, "")
        .split(/\s+/)
        .filter(m => m && !m.match(/\s+/));
    });
    const colCount = cols[0].length;
    const areas = cols
      .map(m => `'${m.map(m => `a${m}`).join(" ")}'`)
      .join("\n");
    const content = page.split(/\r?\n-\r?\n/).map(c => c.replace(pattern, ""));

    return Object.assign({ rowCount, colCount, areas, content }, ...meta);
  } else {
    const content = page.split(/\r?\n-\r?\n/);
    return Object.assign(
      {
        rowCount: 1,
        colCount: content.length,
        areas: `'${content.map((_, i) => `a${i + 1}`).join(" ")}'`,
        content: content
      },
      ...meta
    );
  }
};

export const parseContent = document => {
  return document.split(/\r?\n---\r?\n/).map(parsePage);
};

export const slideGridStyle = slide => {
  return {
    gridTemplateColumns: slide.cols
      ? slide.cols
      : "repeat(" + slide.colCount + ", 1fr)",
    gridTemplateRows: slide.rows
      ? slide.rows
      : slide.rowCount > 1
      ? "repeat(" + (slide.rowCount - 1) + ", auto) 1fr"
      : "1fr",
    gridTemplateAreas: slide.areas,
    gridGap: slide.gap ? slide.gap : "var(--base3)"
  };
};
