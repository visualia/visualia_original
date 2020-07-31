import {
  toNumber,
  isObject,
  isString,
  isArray,
  isNumber,
  isBoolean,
  isNull,
  padArrayRight
} from "../utils.js";

export const normalizeDefault = arr => {
  return padArrayRight(arr || [], 3, 0).map(value => toNumber(value));
};

export const normalizeScale = arr => {
  if (arr === null || arr.length === 0) {
    return [1, 1, 1];
  }
  if (arr.length == 1) {
    return [arr[0], arr[0], arr[0]];
  }
  return padArrayRight(arr || [], 3, 1).map(value => toNumber(value));
};

export const normalizeThreeRotation = arr => {
  if (arr === null) {
    return [[0, 0, 0]];
  }
  if (arr.length == 1) {
    return [0, 0, arr[0]];
  }
  if (arr.length == 2) {
    return [arr[0], arr[1], 0];
  }
  return [arr[0], arr[1], arr[2]];
};

export const coordsTextToArray = (text, normalizer) => {
  if (text.trim().length === 0) {
    return [normalizer(null)];
  }
  return text
    .split(",")
    .map(t =>
      t
        .trim()
        .replace(/\s+/g, " ")
        .split(" ")
        .map(value => toNumber(value))
    )
    .map(normalizer);
};

export const coordsNumberToArray = (number, normalizer) => {
  return [normalizer([number])];
};

export const coordsArrayToArray = (arr, normalizer) => {
  const containsArrays = arr.length && arr.filter(a => isArray(a)).length;
  const coords = arr.map(a => {
    if (isArray(a)) {
      return normalizer(a);
    }
    if (isString(a)) {
      if (a.split(/\s+/g).length > 1) {
        return coordsTextToArray(a, normalizer)[0];
      }
      return containsArrays ? normalizer([a]) : toNumber(a);
    }
    if (isNumber(a)) {
      return containsArrays ? normalizer([a]) : a;
    }
    if (isObject(a)) {
      return coordsObjectToArray(a, normalizer)[0];
    }
    if (isBoolean(a)) {
      return containsArrays ? normalizer([0]) : 0;
    }
    if (isNull(a)) {
      return containsArrays ? normalizer([0]) : 0;
    }
    return a;
  });
  if (isArray(coords[0])) {
    return coords;
  }
  return [normalizer(coords)];
};

export const coordsObjectToArray = (obj, normalizer = normalizeDefault) => {
  if (
    obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, obj.y, obj.z])];
  }
  if (
    obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    !obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, obj.y, 0])];
  }
  if (
    obj.hasOwnProperty("x") &&
    !obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, 0, obj.z])];
  }
  if (
    !obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, 0, obj.z])];
  }
  if (
    obj.hasOwnProperty("x") &&
    !obj.hasOwnProperty("y") &&
    !obj.hasOwnProperty("z")
  ) {
    return [normalizer([obj.x, 0, 0])];
  }
  if (
    !obj.hasOwnProperty("x") &&
    obj.hasOwnProperty("y") &&
    !obj.hasOwnProperty("z")
  ) {
    return [normalizer([0, obj.y, 0])];
  }
  if (
    !obj.hasOwnProperty("x") &&
    !obj.hasOwnProperty("y") &&
    obj.hasOwnProperty("z")
  ) {
    return [normalizer([0, 0, obj.z])];
  }
  return [normalizer([])];
};

export const parseCoords = (c, normalizer = normalizeDefault) => {
  if (isNull(c)) {
    return coordsTextToArray("", normalizer);
  }
  if (isString(c)) {
    return coordsTextToArray(c, normalizer);
  }
  if (isNumber(c)) {
    return coordsNumberToArray(c, normalizer);
  }
  if (isArray(c)) {
    return coordsArrayToArray(c, normalizer);
  }
  if (isObject(c)) {
    return coordsObjectToArray(c, normalizer);
  }
  return null;
};

// Empty tests

export const test_parseCoords_null = () => {
  return [parseCoords(null), [[0, 0, 0]]];
};

export const test_parseCoords_empty_string = () => {
  return [parseCoords(""), [[0, 0, 0]]];
};

export const test_parseCoords_empty_string_to_scale = () => {
  return [parseCoords("", normalizeScale), [[1, 1, 1]]];
};

export const test_parseCoords_empty_space = () => {
  return [[[0, 0, 0]], parseCoords("       ")];
};

export const test_parseCoords_empty_array = () => {
  return [parseCoords([]), [[0, 0, 0]]];
};

export const test_parseCoords_empty_array_array = () => {
  return [parseCoords([[]]), [[0, 0, 0]]];
};

export const test_parseCoords_empty_array_2_array = () => {
  return [
    parseCoords([[], []]),
    [
      [0, 0, 0],
      [0, 0, 0]
    ]
  ];
};

export const test_parseCoords_empty_array_number_0 = () => {
  return [parseCoords([0]), [[0, 0, 0]]];
};

export const test_parseCoords_empty_array_number_0_empty_array = () => {
  return [
    parseCoords([0, []]),
    [
      [0, 0, 0],
      [0, 0, 0]
    ]
  ];
};

export const test_parseCoords_array_number_0_0 = () => {
  return [parseCoords([0, 0]), [[0, 0, 0]]];
};

export const test_parseCoords_array_number_0_string_0 = () => {
  return [parseCoords([0, "0"]), [[0, 0, 0]]];
};

export const test_parseCoords_object_empty = () => {
  return [parseCoords({}), [[0, 0, 0]]];
};

export const test_parseCoords_array_object_empty = () => {
  return [parseCoords([{}]), [[0, 0, 0]]];
};

export const test_parseCoords_array_object_object_empty = () => {
  return [
    parseCoords([{}, {}]),
    [
      [0, 0, 0],
      [0, 0, 0]
    ]
  ];
};

export const test_parseCoords_everything_empty = () => {
  return [
    parseCoords(["0", 0, [], {}]),
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  ];
};

// Strings

export const test_parseCoords_string_empty = () => {
  return [parseCoords(" "), [[0, 0, 0]]];
};

export const test_parseCoords_string_empty_to_scale = () => {
  return [parseCoords(" ", normalizeScale), [[1, 1, 1]]];
};

export const test_parseCoords_string_0 = () => {
  return [parseCoords("0"), [[0, 0, 0]]];
};

export const test_parseCoords_string_0_to_scale = () => {
  return [parseCoords("0", normalizeScale), [[0, 0, 0]]];
};

export const test_parseCoords_string_1 = () => {
  return [parseCoords("1"), [[1, 0, 0]]];
};

export const test_parseCoords_string_1_1 = () => {
  return [parseCoords("1 1"), [[1, 1, 0]]];
};

export const test_parseCoords_string_1_1_a_spaced = () => {
  return [parseCoords("1  1        a"), [[1, 1, 0]]];
};

export const test_parseCoords_string_1_1_a_1_spaced = () => {
  return [parseCoords("1  1        a 1"), [[1, 1, 0]]];
};

export const test_parseCoords_string_1_and_1 = () => {
  return [
    parseCoords("1,1"),
    [
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};

export const test_parseCoords_string_1_and_1_in_array = () => {
  return [parseCoords(["1", "1"]), [[1, 1, 0]]];
};

export const test_parseCoords_string_1_1_and_1_1_in_array = () => {
  return [
    parseCoords(["1 1", "1 1"]),
    [
      [1, 1, 0],
      [1, 1, 0]
    ]
  ];
};

export const test_parseCoords_string_1_and_1_spaced = () => {
  return [
    parseCoords("1 ,   1"),
    [
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};

export const test_parseCoords_string_1_1_and_1_1 = () => {
  return [
    parseCoords("1 1, 1 1"),
    [
      [1, 1, 0],
      [1, 1, 0]
    ]
  ];
};

export const test_parseCoords_string_1_1_1 = () => {
  return [parseCoords("1 1 1"), [[1, 1, 1]]];
};

export const test_parseCoords_string_1_1_1_1 = () => {
  return [parseCoords("1 1 1 1"), [[1, 1, 1]]];
};

export const test_parseCoords_string_1_1_1_and_1_1_1 = () => {
  return [
    parseCoords("1 1 1, 1 1 1"),
    [
      [1, 1, 1],
      [1, 1, 1]
    ]
  ];
};

export const test_parseCoords_string_1_1_1_1_and_1_1_1_1 = () => {
  return [parseCoords("1 1 1 1, 1 1 1 1")[([1, 1, 1], [1, 1, 1])]];
};

// Test numbers

export const test_parseCoords_number_0 = () => {
  return [parseCoords(0), [[0, 0, 0]]];
};

export const test_parseCoords_number_1 = () => {
  return [parseCoords(1), [[1, 0, 0]]];
};

export const test_parseCoords_number_2 = () => {
  return [parseCoords(2), [[2, 0, 0]]];
};

export const test_parseCoords_number_1_to_scale = () => {
  return [parseCoords(1, normalizeScale), [[1, 1, 1]]];
};

export const test_parseCoords_number_2_to_scale = () => {
  return [parseCoords(2, normalizeScale), [[2, 2, 2]]];
};

export const test_parseCoords_number_01 = () => {
  return [parseCoords(0.1), [[0.1, 0, 0]]];
};

export const test_parseCoords_number_1_in_array = () => {
  return [parseCoords([1]), [[1, 0, 0]]];
};

export const test_parseCoords_number_1_in_array_array = () => {
  return [parseCoords([[1]]), [[1, 0, 0]]];
};

export const test_parseCoords_number_1_1_in_array = () => {
  return [parseCoords([1, 1]), [[1, 1, 0]]];
};

export const test_parseCoords_number_1_1_in_array_array = () => {
  return [parseCoords([[1, 1]]), [[1, 1, 0]]];
};

export const test_parseCoords_array_number_1_1_1_in_array = () => {
  return [parseCoords([1, 1, 1]), [[1, 1, 1]]];
};

export const test_parseCoords_number_1_1_1_in_array_array = () => {
  return [parseCoords([[1, 1, 1]]), [[1, 1, 1]]];
};

export const test_parseCoords_number_1_1_1_1_in_array_array = () => {
  return [parseCoords([[1, 1, 1, 1]]), [[1, 1, 1]]];
};

export const test_parseCoords_array_number_1_1_1 = () => {
  return [parseCoords([1, 1, 1]), [[1, 1, 1]]];
};

export const test_parseCoords_array_number_1_1_1_1 = () => {
  return [parseCoords([1, 1, 1, 1]), [[1, 1, 1]]];
};

// Test objects

export const test_parseCoords_object_0 = () => {
  return [parseCoords({ x: 0 }), [[0, 0, 0]]];
};

export const test_parseCoords_object_string_1 = () => {
  return [parseCoords({ x: "1" }), [[1, 0, 0]]];
};

export const test_parseCoords_object_number_1 = () => {
  return [parseCoords({ x: "1" }), [[1, 0, 0]]];
};

export const test_parseCoords_object_number_1_1 = () => {
  return [parseCoords({ x: 1, y: 1 }), [[1, 1, 0]]];
};

export const test_parseCoords_object_number_1_1_1 = () => {
  return [parseCoords({ x: 1, y: 1, z: 1 }), [[1, 1, 1]]];
};

export const test_parseCoords_object_number_1_1_1_gibberish = () => {
  return [parseCoords({ x: 1, y: 1, z: 1, a: 1 }), [[1, 1, 1]]];
};

export const test_parseCoords_object_number_01 = () => {
  return [parseCoords({ x: "0.1" }), [[0.1, 0, 0]]];
};

export const test_parseCoords_object_number_1_in_array = () => {
  return [parseCoords([{ x: 1 }]), [[1, 0, 0]]];
};

export const test_parseCoords_object_number_1_1_in_array = () => {
  return [
    parseCoords([{ x: 1 }, { x: 1 }]),
    [
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};

export const test_parseCoords_object_number_1_1_1_in_array = () => {
  return [
    parseCoords([{ x: 1 }, { x: 1 }, { x: 1 }]),
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};

export const test_parseCoords_object_number_1_1_1_1_in_array = () => {
  return [
    parseCoords([{ x: 1 }, { x: 1 }, { x: 1 }, { x: 1 }]),
    [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};

export const test_parseCoords_object_everything_in_array = () => {
  return [
    parseCoords([
      { x: 1, y: "1", z: false },
      { x: 1, y: 1, z: null, a: 1 }
    ]),
    [
      [1, 1, 0],
      [1, 1, 0]
    ]
  ];
};

export const test_parseCoords_array_number_1_1_1_in_array_array = () => {
  return [parseCoords([[1, 1, 1]]), [[1, 1, 1]]];
};

// Mixed coordinate values

export const test_parseCoords_array_array_number_string_1_1 = () => {
  return [parseCoords([[1, "1"]]), [[1, 1, 0]]];
};

export const test_parseCoords_array_1_sting_1 = () => {
  return [
    parseCoords([[1], "1"]),
    [
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};

export const test_parseCoords_array_1_number_1 = () => {
  return [
    parseCoords([[1], 1]),
    [
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};

export const test_parseCoords_array_1_object_1 = () => {
  return [
    parseCoords([[1], { x: 1 }]),
    [
      [1, 0, 0],
      [1, 0, 0]
    ]
  ];
};
