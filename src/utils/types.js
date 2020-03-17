export const isObject = input =>
  typeof input === "object" &&
  !isArray(input) &&
  Object.prototype.toString.call(input) !== "[object Date]";

export const isBoolean = input => typeof input === typeof true;

export const isNull = input => input === null && typeof input === "object";

export const isArray = input => Array.isArray(input);

export const isNumber = input => typeof input === "number";

export const isString = input => typeof input === "string";

export const isFunction = input => typeof input === "function";

export const test_isObject_object = () => [isObject({ x: 1 }), true];

export const test_isObject_array = () => [isObject([1]), false];

export const test_isObject_date = () => [isObject(new Date()), false];

export const typename = type => {
  if (isArray(type)) {
    return "array";
  }
  if (isObject(type)) {
    return "object";
  }
  if (isString(type)) {
    return "string";
  }
  if (isNumber(type)) {
    return "number";
  }
  if (isBoolean(type)) {
    return "boolean";
  }
  if (isFunction(type)) {
    return "function";
  }
  return typeof type;
};

export const toNumber = (value, def = 0) => {
  const float = parseFloat(value);
  if (isNaN(float)) {
    return def;
  }
  return float;
};

export const test_toNumber_numeric_string = () => {
  return [toNumber("0"), 0];
};

export const test_toNumber_nonnumeric_string = () => {
  return [toNumber("a"), 0];
};

export const test_toNumber_empty_string = () => {
  return [toNumber(""), 0];
};

export const test_toNumber_zero = () => {
  return [toNumber(0), 0];
};

export const test_toNumber_integer = () => {
  return [toNumber(1), 1];
};

export const test_toNumber_float = () => {
  return [toNumber(0.1), 0.1];
};

export const test_toNumber_gibberish = () => {
  return [toNumber("*"), 0];
};
