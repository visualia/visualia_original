import { circlexy } from "../utils.js";

export const circlerange = (count = 6, radius = 10) =>
  Array.from({ length: count }).map((_, i) =>
    circlexy((360 / count) * i, radius)
  );
