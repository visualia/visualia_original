export const fit = (value, start1, stop1, start2 = -2, stop2 = 2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const random = (from = 0, to = 1, integer = false) => {
  const r = from + Math.random() * (to - from);
  return integer ? Math.floor(r, 2) : r;
};
