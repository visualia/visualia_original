import { visualia, isObject, toObject } from "../dist/visualia.js";
import * as internals from "../src/internals.js";
const c = toObject(
  Object.entries(internals).filter(([key, value]) => isObject(value))
);
console.log(c);
