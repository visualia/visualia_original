export const deg2rad = (deg) => (deg * Math.PI) / 180;

export const docs_deg2rad = `

\`deg2rad(angle)\`

Converts angle in degrees to radians.

~~~live

{{ deg2rad(180) }}

~~~
`;

export const rad2deg = (rad) => (rad * 180) / Math.PI;

export const docs_rad2deg = `

\`rad2deg(rad)\`

Converts angle in radians to degrees.

~~~live

{{ rad2deg(Math.PI) }}

~~~
`;

export const circlexy = (angle = 0, radius = 10) => {
  return [
    Math.cos((angle - 90) * (Math.PI / 180)) * radius,
    Math.sin((angle - 90) * (Math.PI / 180)) * radius,
  ];
};

export const docs_circlexy = `

\`circlexy(angle = 0, radius = 10)\`

Converts polar coordinates \`angle, radius\` to cartesian coordinates \`x, y\`

~~~live

{{ circlexy(0, 10) }}

~~~
`;

export const pi = () => Math.PI;

export const docs_pi = `

\`pi()\`

Returns a <v-math>\\pi</v-math> value

~~~live

{{ pi() }}

~~~
`;
