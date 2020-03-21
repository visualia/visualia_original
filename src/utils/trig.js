export const deg2rad = deg => (deg * Math.PI) / 180;

export const circlepoint = (angle = 0, radius = 10) => {
  return [
    Math.cos((angle - 90) * (Math.PI / 180)) * radius,
    Math.sin((angle - 90) * (Math.PI / 180)) * radius
  ];
};
