export const fit = (value, start1, stop1, start2 = -2, stop2 = 2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

export const random = (from = 0, to = 1, integer = false) => {
  const r = from + Math.random() * (to - from);
  return integer ? Math.floor(r, 2) : r;
};

export const snap = (value, step = 1) => {
  return value % step < step / 2
    ? value - (value % step)
    : value + step - (value % step);
};
