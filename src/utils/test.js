import { shorten } from "../utils.js";

// From https://github.com/denoland/deno/blob/master/std/testing/asserts.ts

const isKeyedCollection = x => [Symbol.iterator, "size"].every(k => k in x);

export const equal = (c, d) => {
  const seen = new Map();
  return (function compare(a, b) {
    if (
      a &&
      b &&
      ((a instanceof RegExp && b instanceof RegExp) ||
        (a instanceof Date && b instanceof Date))
    ) {
      return String(a) === String(b);
    }
    if (Object.is(a, b)) {
      return true;
    }
    if (a && typeof a === "object" && b && typeof b === "object") {
      if (seen.get(a) === b) {
        return true;
      }
      if (Object.keys(a || {}).length !== Object.keys(b || {}).length) {
        return false;
      }
      if (isKeyedCollection(a) && isKeyedCollection(b)) {
        if (a.size !== b.size) {
          return false;
        }
        let unmatchedEntries = a.size;
        for (const [aKey, aValue] of a.entries()) {
          for (const [bKey, bValue] of b.entries()) {
            if (
              (aKey === aValue && bKey === bValue && compare(aKey, bKey)) ||
              (compare(aKey, bKey) && compare(aValue, bValue))
            ) {
              unmatchedEntries--;
            }
          }
        }
        return unmatchedEntries === 0;
      }
      const merged = Object.assign(Object.assign({}, a), b);
      for (const key in merged) {
        if (!compare(a && a[key], b && b[key])) {
          return false;
        }
      }
      seen.set(a, b);
      return true;
    }
    return false;
  })(c, d);
};

export const test = tests => {
  const reset = "\x1b[0m";
  const red = "\x1b[31m";
  const redbg = "\x1b[41m";
  const green = "\x1b[32m";
  const greenbg = "\x1b[42m";
  const dim = "\x1b[2m";

  console.log(`\n  ${dim}Running Visualia tests${reset}\n`);

  const filteredKey = typeof process !== "undefined" ? process.argv[2] : null;

  let passed = 0;
  let failed = 0;

  tests.forEach(([name, test]) => {
    const [actual, expected] = test();
    if (equal(actual, expected)) {
      passed++;
      console.log(`  ${shorten(name).padEnd(53)}\t${green}OK${reset}`);
    } else {
      failed++;
      console.log(`  ${shorten(name).padEnd(53)}\t${red}Failed${reset}${dim}
 
${String(test)
  .split("\r?\n")
  .map(row => `    ${row}`)
  .join("\n")}

    Actual: ${reset}${red}${JSON.stringify(actual)}${reset}${dim}

    Expected: ${JSON.stringify(expected)}
${reset}`);
    }
  });

  if (passed || failed) {
    console.log(`

  ${greenbg} Tests passed: ${passed} ${reset} ${
      failed ? `${redbg} Tests failed: ${failed} ${reset}` : ""
    }

`);

    return failed > 0 ? 1 : 0;
  } else {
    console.log(`
  No tests found

`);
    return 0;
  }
};
