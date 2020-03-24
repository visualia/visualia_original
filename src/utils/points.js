import { circlepoint } from "../utils.js";

export const circle = (count = 6, radius = 10) =>
  Array.from({ length: count }).map((_, i) =>
    circlepoint((360 / count) * i, radius)
  );
