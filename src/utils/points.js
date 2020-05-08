import { circlexy, array } from "../utils.js";

export const circlepoints = (count = 6, radius = 10) =>
  array(count).map((_, i) => [...circlexy((360 / count) * i, radius), 0]);

export const gridpoints = (count = 20, step = 10) => {
  let arr = [];
  for (let y = 0; y < count; y++) {
    for (let x = 0; x < count; x++) {
      arr.push([x * step, y * step, 0]);
    }
  }
  return arr;
};
