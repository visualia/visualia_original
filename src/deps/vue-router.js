/*!
 * vue-router v4.0.0-alpha.1
 * (c) 2020 Eduardo San Martin Morote
 * @license MIT
 */
import {
  markNonReactive,
  warn,
  inject,
  defineComponent,
  computed,
  h,
  reactive,
  isRef,
  provide,
  ref,
  nextTick,
  getCurrentInstance
} from "./vue.js";

var NavigationType;
(function(NavigationType) {
  NavigationType["pop"] = "pop";
  NavigationType["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection) {
  NavigationDirection["back"] = "back";
  NavigationDirection["forward"] = "forward";
  NavigationDirection["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
// starting point for abstract history
const START_PATH = "";
const START = {
  fullPath: START_PATH
};
// Generic utils
/**
 * Transforms an URI into a normalized history location
 * @param parseQuery
 * @param location URI to normalize
 * @returns a normalized history location
 */
function parseURL(parseQuery, location) {
  let path = "",
    query = {},
    searchString = "",
    hash = "";
  // Could use URL and URLSearchParams but IE 11 doesn't support it
  const searchPos = location.indexOf("?");
  const hashPos = location.indexOf("#", searchPos > -1 ? searchPos : 0);
  if (searchPos > -1) {
    path = location.slice(0, searchPos);
    searchString = location.slice(
      searchPos + 1,
      hashPos > -1 ? hashPos : location.length
    );
    query = parseQuery(searchString);
  }
  if (hashPos > -1) {
    path = path || location.slice(0, hashPos);
    // keep the # character
    hash = location.slice(hashPos, location.length);
  }
  // no search and no query
  path = path || location;
  return {
    fullPath: location,
    path,
    query,
    hash
  };
}
/**
 * Stringify a URL object
 * @param stringifyQuery
 * @param location
 */
function stringifyURL(stringifyQuery, location) {
  let query = location.query ? stringifyQuery(location.query) : "";
  return location.path + (query && "?") + query + (location.hash || "");
}
/**
 * Strips off the base from the beginning of a location.pathname
 * @param pathname location.pathname
 * @param base base to strip off
 */
function stripBase(pathname, base) {
  return (
    (base && pathname.indexOf(base) === 0 && pathname.replace(base, "")) ||
    pathname
  );
}
function normalizeHistoryLocation(location) {
  return {
    // to avoid doing a typeof or in that is quite long
    fullPath: location.fullPath || location
  };
}

// import { RouteLocationNormalized } from '../types'
function computeScrollPosition(el) {
  return el
    ? {
        x: el.scrollLeft,
        y: el.scrollTop
      }
    : {
        x: window.pageXOffset,
        y: window.pageYOffset
      };
}
function getElementPosition(el, offset) {
  const docEl = document.documentElement;
  const docRect = docEl.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}
const hashStartsWithNumberRE = /^#\d/;
function scrollToPosition(position) {
  let normalizedPosition = null;
  if ("selector" in position) {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    const el = hashStartsWithNumberRE.test(position.selector)
      ? document.getElementById(position.selector.slice(1))
      : document.querySelector(position.selector);
    if (el) {
      const offset = position.offset || { x: 0, y: 0 };
      normalizedPosition = getElementPosition(el, offset);
    }
    // TODO: else dev warning?
  } else {
    normalizedPosition = {
      x: position.x,
      y: position.y
    };
  }
  if (normalizedPosition) {
    window.scrollTo(normalizedPosition.x, normalizedPosition.y);
  }
}

const cs = console;
/**
 * Creates a normalized history location from a window.location object
 * @param location
 */
function createCurrentLocation(base, location) {
  const { pathname, search, hash } = location;
  // allows hash based url
  if (base.indexOf("#") > -1) {
    // prepend the starting slash to hash so the url starts with /#
    return normalizeHistoryLocation(stripBase("/" + hash, base));
  }
  const path = stripBase(pathname, base);
  return normalizeHistoryLocation(path + search + hash);
}
function useHistoryListeners(base, historyState, location) {
  let listeners = [];
  let teardowns = [];
  // TODO: should it be a stack? a Dict. Check if the popstate listener
  // can trigger twice
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    cs.info("popstate fired", state);
    cs.info("currentState", historyState);
    const from = location.value;
    const fromState = historyState.value;
    const to = createCurrentLocation(base, window.location);
    location.value = to;
    historyState.value = state;
    if (pauseState && pauseState.fullPath === from.fullPath) {
      cs.info("❌ Ignored because paused for", pauseState.fullPath);
      // reset pauseState
      pauseState = null;
      return;
    }
    const deltaFromCurrent = fromState
      ? state.position - fromState.position
      : "";
    const distance = deltaFromCurrent || 0;
    console.log({ deltaFromCurrent });
    // Here we could also revert the navigation by calling history.go(-distance)
    // this listener will have to be adapted to not trigger again and to wait for the url
    // to be updated before triggering the listeners. Some kind of validation function would also
    // need to be passed to the listeners so the navigation can be accepted
    // call all listeners
    listeners.forEach(listener => {
      listener(location.value, from, {
        distance,
        type: NavigationType.pop,
        direction: distance
          ? distance > 0
            ? NavigationDirection.forward
            : NavigationDirection.back
          : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    cs.info(`⏸ for ${location.value.fullPath}`);
    pauseState = location.value;
  }
  function listen(callback) {
    // setup the listener and prepare teardown callbacks
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history } = window;
    if (!history.state) return;
    history.replaceState(
      {
        ...history.state,
        scroll: computeScrollPosition()
      },
      ""
    );
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  // setup the listeners and prepare teardown callbacks
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function useHistoryStateNavigation(base) {
  const { history } = window;
  /**
   * Creates a state object
   */
  function buildState(
    back,
    current,
    forward,
    replaced = false,
    computeScroll = false
  ) {
    return {
      back,
      current,
      forward,
      replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  // private variables
  let location = {
    value: createCurrentLocation(base, window.location)
  };
  let historyState = { value: history.state };
  // build current history entry as this is a fresh navigation
  if (!historyState.value) {
    changeLocation(
      location.value,
      {
        back: null,
        current: location.value,
        forward: null,
        // the length is off by one, we need to decrease it
        position: history.length - 1,
        replaced: true,
        scroll: computeScrollPosition()
      },
      true
    );
  }
  function changeLocation(to, state, replace) {
    const url = base + to.fullPath;
    try {
      // BROWSER QUIRK
      // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
      const newState = replace ? { ...historyState.value, ...state } : state;
      history[replace ? "replaceState" : "pushState"](newState, "", url);
      historyState.value = state;
    } catch (err) {
      cs.log("[vue-router]: Error with push/replace State", err);
      // Force the navigation, this also resets the call count
      window.location[replace ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const normalized = normalizeHistoryLocation(to);
    // cs.info('replace', location, normalized)
    const state = {
      ...buildState(
        historyState.value.back,
        // keep back and forward entries but override current position
        normalized,
        historyState.value.forward,
        true
      ),
      ...data
    };
    if (historyState) state.position = historyState.value.position;
    changeLocation(normalized, state, true);
    location.value = normalized;
  }
  function push(to, data) {
    const normalized = normalizeHistoryLocation(to);
    // Add to current entry the information of where we are going
    // as well as saving the current position
    // TODO: the scroll position computation should be customizable
    const currentState = {
      ...historyState.value,
      forward: normalized,
      scroll: computeScrollPosition()
    };
    changeLocation(normalized, currentState, true);
    const state = {
      ...buildState(location.value, normalized, null),
      position: currentState.position + 1,
      ...data
    };
    changeLocation(normalized, state, false);
    location.value = normalized;
  }
  return {
    location,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base = "") {
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(
    base,
    historyNavigation.state,
    historyNavigation.location
  );
  function back(triggerListeners = true) {
    go(-1, triggerListeners);
  }
  function forward(triggerListeners = true) {
    go(1, triggerListeners);
  }
  function go(distance, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(distance);
  }
  const routerHistory = {
    // it's overriden right after
    // @ts-ignore
    location: historyNavigation.location.value,
    base,
    back,
    forward,
    go,
    ...historyNavigation,
    ...historyListeners
  };
  Object.defineProperty(routerHistory, "location", {
    get: () => historyNavigation.location.value
  });
  return routerHistory;
}

/**
 * Creates a in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
 * It's up to the user to replace that location with the starter location.
 * @param base Base applied to all urls, defaults to '/'
 * @returns a history object that can be passed to the router constructor
 */
function createMemoryHistory(base = "") {
  let listeners = [];
  // TODO: make sure this is right as the first location is nowhere so maybe this should be empty instead
  let queue = [START];
  let position = 0;
  function setLocation(location) {
    position++;
    if (position === queue.length) {
      // we are at the end, we can simply append a new entry
      queue.push(location);
    } else {
      // we are in the middle, we remove everything from here in the queue
      queue.splice(position);
      queue.push(location);
    }
  }
  function triggerListeners(to, from, { direction, distance }) {
    const info = {
      direction,
      distance,
      type: NavigationType.pop
    };
    for (let callback of listeners) {
      callback(to, from, info);
    }
  }
  const routerHistory = {
    // rewritten by Object.defineProperty
    location: START,
    base,
    replace(to) {
      const toNormalized = normalizeHistoryLocation(to);
      // remove current entry and decrement position
      queue.splice(position--, 1);
      setLocation(toNormalized);
    },
    push(to, data) {
      setLocation(normalizeHistoryLocation(to));
    },
    listen(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
    },
    destroy() {
      listeners = [];
    },
    back(shouldTrigger = true) {
      this.go(-1, shouldTrigger);
    },
    forward(shouldTrigger = true) {
      this.go(1, shouldTrigger);
    },
    go(distance, shouldTrigger = true) {
      const from = this.location;
      const direction =
        // we are considering distance === 0 going forward, but in abstract mode
        // using 0 for the distance doesn't make sense like it does in html5 where
        // it reloads the page
        distance < 0 ? NavigationDirection.back : NavigationDirection.forward;
      position = Math.max(0, Math.min(position + distance, queue.length - 1));
      if (shouldTrigger) {
        triggerListeners(this.location, from, {
          direction,
          distance
        });
      }
    }
  };
  Object.defineProperty(routerHistory, "location", {
    get: () => queue[position]
  });
  return routerHistory;
}

function createWebHashHistory(base = "") {
  // Make sure this implementation is fine in terms of encoding, specially for IE11
  return createWebHistory("/#" + base);
}

function isRouteLocation(route) {
  return typeof route === "string" || (route && typeof route === "object");
}

const START_LOCATION_NORMALIZED = markNonReactive({
  path: "/",
  name: undefined,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: undefined
});
// make matched non enumerable for easy printing
Object.defineProperty(START_LOCATION_NORMALIZED, "matched", {
  enumerable: false
});

var _a, _b, _d, _e, _f;
// we could use symbols, but this is for IE9 only and there is
// not Symbol support anyway
const isRouterError = "__RouterError";
/**
 * Generic Error coming from the Router.
 */
class RouterError extends Error {
  /**
   * Creates a Router specific Error
   *
   * @param message Error Message
   */
  constructor(message) {
    super(message);
    // @ts-ignore for IE inheritance support
    this[_a] = true;
    // restore prototype chain
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
  }
  static is(error) {
    // only IE9 seems to break the inheritance chain
    // and set Error as the name
    if (error.name === "Error") {
      // @ts-ignore for IE inheritance support
      return error[isRouterError];
    } else {
      return error instanceof RouterError;
    }
  }
  get name() {
    return this.constructor.name;
  }
}
_a = isRouterError;
const isNoRouteMatchError = "__NoRouteMatchError";
class NoRouteMatchError extends RouterError {
  constructor(location, currentLocation) {
    super(
      "No match for\n" +
        JSON.stringify(location) +
        (currentLocation
          ? "\nwhile being at\n" + JSON.stringify(currentLocation)
          : "")
    );
    // @ts-ignore for IE inheritance support
    this[_b] = true;
  }
  static is(error) {
    // only IE9 seems to break the inheritance chain
    // and set Error as the name
    if (error.name === "Error") {
      // @ts-ignore for IE inheritance support
      return error[isNoRouteMatchError];
    } else {
      return error instanceof NoRouteMatchError;
    }
  }
}
_b = isNoRouteMatchError;
const isNavigationGuardRedirect = "__NavigationGuardRedirect";
/**
 * Error used when rejecting a navigation because of a redirection. Contains
 * information about where we where trying to go and where we are going instead
 */
class NavigationGuardRedirect extends RouterError {
  // TODO: refactor order of arguments
  // TODO: refactor into parent class NavigationError
  constructor(from, to) {
    super(
      `Redirected from "${from.fullPath}" to "${stringifyRoute(
        to
      )}" via a navigation guard`
    );
    // @ts-ignore for IE inheritance support
    this[_d] = true;
    this.from = from;
    this.to = to;
  }
  static is(error) {
    // only IE9 seems to break the inheritance chain
    // and set Error as the name
    if (error.name === "Error") {
      // @ts-ignore for IE inheritance support
      return error[isNavigationGuardRedirect];
    } else {
      return error instanceof NavigationGuardRedirect;
    }
  }
}
_d = isNoRouteMatchError;
const isNavigationAborted = "__NavigationAborted";
/**
 * Navigation aborted by next(false)
 */
class NavigationAborted extends RouterError {
  constructor(to, from) {
    super(
      `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard`
    );
    // @ts-ignore for IE inheritance support
    this[_e] = true;
    this.from = from;
    this.to = to;
  }
  static is(error) {
    // only IE9 seems to break the inheritance chain
    // and set Error as the name
    if (error.name === "Error") {
      // @ts-ignore for IE inheritance support
      return error[isNavigationAborted];
    } else {
      return error instanceof NavigationAborted;
    }
  }
}
_e = isNavigationAborted;
const isNavigationCancelled = "__NavigationCancelled";
/**
 * Navigation canceled by the user by pushing/replacing a new location
 * TODO: is the name good?
 */
// @ts-ignore RouterError is a constructor
class NavigationCancelled extends RouterError {
  constructor(to, from) {
    super(
      `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new \`push\` or \`replace\``
    );
    // @ts-ignore for IE inheritance support
    this[_f] = true;
    this.from = from;
    this.to = to;
  }
  static is(error) {
    // only IE9 seems to break the inheritance chain
    // and set Error as the name
    if (error.name === "Error") {
      // @ts-ignore for IE inheritance support
      return error[isNavigationCancelled];
    } else {
      return error instanceof NavigationCancelled;
    }
  }
}
_f = isNavigationCancelled;
const propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to) {
  if (typeof to === "string") return to;
  if ("path" in to) return to.path;
  const location = {};
  for (const key of propertiesToLog) {
    // @ts-ignore
    if (key in to) location[key] = to[key];
  }
  return JSON.stringify(location, null, 2);
}

// default pattern for a param: non greedy everything but /
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
// Special Regex characters that must be escaped in static tokens
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
/**
 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
 *
 * @param segments array of segments returned by tokenizePath
 * @param extraOptions optional options for the regexp
 * @returns a PathParser
 */
function tokensToParser(segments, extraOptions) {
  const options = {
    ...BASE_PATH_PARSER_OPTIONS,
    ...extraOptions
  };
  // the amount of scores is the same as the length of segments except for the root segment "/"
  let score = [];
  // the regexp as a string
  let pattern = options.start ? "^" : "";
  // extracted keys
  const keys = [];
  for (const segment of segments) {
    // the root segment needs special treatment
    const segmentScores = segment.length ? [] : [90 /* Root */];
    // allow trailing slash
    if (options.strict && !segment.length) pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      // resets the score if we are inside a sub segment /:a-other-:b
      let subSegmentScore =
        40 /* Segment */ +
        (options.sensitive ? 0.25 /* BonusCaseSensitive */ : 0);
      if (token.type === 0 /* Static */) {
        // prepend the slash if we are starting a new segment
        if (!tokenIndex) pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40 /* Static */;
      } else if (token.type === 1 /* Param */) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re = regexp ? regexp : BASE_PARAM_PATTERN;
        // the user provided a custom regexp /:id(\\d+)
        if (re !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10 /* BonusCustomRegExp */;
          // make sure the regexp is valid before using it
          try {
            new RegExp(`(${re})`);
          } catch (err) {
            throw new Error(
              `Invalid custom RegExp for param "${value}" (${re}): ` +
                err.message
            );
          }
        }
        // when we repeat we must take care of the repeating leading slash
        let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
        // prepend the slash if we are starting a new segment
        if (!tokenIndex)
          subPattern = optional ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional) subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20 /* Dynamic */;
        if (optional) subSegmentScore += -8 /* BonusOptional */;
        if (repeatable) subSegmentScore += -20 /* BonusRepeatable */;
        if (re === ".*") subSegmentScore += -50 /* BonusWildcard */;
      }
      segmentScores.push(subSegmentScore);
    }
    // an empty array like /home/ -> [[{home}], []]
    // if (!segment.length) pattern += '/'
    score.push(segmentScores);
  }
  // only apply the strict bonus to the last score
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001 /* BonusStrict */;
  }
  // TODO: dev only warn double trailing slash
  if (!options.strict) pattern += "/?";
  if (options.end) pattern += "$";
  // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_somethingelse
  else if (options.strict) pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    // for optional parameters to allow to be empty
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || path[path.length - 1] !== "/") path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0 /* Static */) {
          path += token.value;
        } else if (token.type === 1 /* Param */) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (Array.isArray(param) && !repeatable)
            throw new Error(
              `Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`
            );
          const text = Array.isArray(param) ? param.join("/") : param;
          if (!text) {
            // do not append a slash on the next iteration
            if (optional) avoidDuplicatedSlash = true;
            else throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path;
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
/**
 * Compares an array of numbers as used in PathParser.score and returns a
 * number. This function can be used to `sort` an array
 * @param a first array of numbers
 * @param b second array of numbers
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 * should be sorted first
 */
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    // only keep going if diff === 0
    if (diff) return diff;
    i++;
  }
  // if the last subsegment was Static, the shorter segments should be sorted first
  // otherwise sort the longest segment first
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 /* Static */ + 40 /* Segment */
      ? -1
      : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 /* Static */ + 40 /* Segment */
      ? 1
      : -1;
  }
  return 0;
}
/**
 * Compare function that can be used with `sort` to sort an array of PathParser
 * @param a first PathParser
 * @param b second PathParser
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 */
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    // do not return if both are equal
    if (comp) return comp;
    i++;
  }
  // if a and b share the same score entries but b has more, sort b first
  return bScore.length - aScore.length;
  // this is the ternary version
  // return aScore.length < bScore.length
  //   ? 1
  //   : aScore.length > bScore.length
  //   ? -1
  //   : 0
}

const ROOT_TOKEN = {
  type: 0 /* Static */,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === "/") return [[ROOT_TOKEN]];
  // remove the leading slash
  if (path[0] !== "/") throw new Error('A non-empty path must start with "/"');
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0; /* Static */
  let previousState = state;
  const tokens = [];
  // the segment will always be valid because we get into the initial state
  // with the leading /
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  // index on the path
  let i = 0;
  // char at index
  let char;
  // buffer of the value read
  let buffer = "";
  // custom regexp for a param
  let customRe = "";
  function consumeBuffer() {
    if (!buffer) return;
    if (state === 0 /* Static */) {
      segment.push({
        type: 0 /* Static */,
        value: buffer
      });
    } else if (
      state === 1 /* Param */ ||
      state === 2 /* ParamRegExp */ ||
      state === 3 /* ParamRegExpEnd */
    ) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(
          `A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`
        );
      segment.push({
        type: 1 /* Param */,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2 /* ParamRegExp */) {
      previousState = state;
      state = 4 /* EscapeNext */;
      continue;
    }
    switch (state) {
      case 0 /* Static */:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1 /* Param */;
          // } else if (char === '{') {
          // TODO: handle group (or drop it)
          // addCharToBuffer()
        } else {
          addCharToBuffer();
        }
        break;
      case 4 /* EscapeNext */:
        addCharToBuffer();
        state = previousState;
        break;
      case 1 /* Param */:
        if (char === "(") {
          state = 2 /* ParamRegExp */;
          customRe = "";
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0 /* Static */;
          // go back one character if we were not modifying
          if (char !== "*" && char !== "?" && char !== "+") i--;
        }
        break;
      case 2 /* ParamRegExp */:
        if (char === ")") {
          // handle the escaped )
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else state = 3 /* ParamRegExpEnd */;
        } else {
          customRe += char;
        }
        break;
      case 3 /* ParamRegExpEnd */:
        // same as finalizing a param
        consumeBuffer();
        state = 0 /* Static */;
        // go back one character if we were not modifying
        if (char !== "*" && char !== "?" && char !== "+") i--;
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2 /* ParamRegExp */)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}

function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = {
    ...parser,
    record,
    parent,
    children: []
  };
  if (parent) parent.children.push(matcher);
  return matcher;
}

function createRouterMatcher(routes, globalOptions) {
  // normalized ordered array of matchers
  const matchers = [];
  const matcherMap = new Map();
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  // TODO: add routes to children of parent
  function addRoute(record, parent) {
    const mainNormalizedRecord = normalizeRouteRecord(record);
    const options = { ...globalOptions, ...record.options };
    // generate an array of records to correctly handle aliases
    const normalizedRecords = [mainNormalizedRecord];
    // TODO: remember aliases in records to allow active in router-link
    if ("alias" in record) {
      const aliases =
        typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push({
          ...mainNormalizedRecord,
          path: alias
        });
      }
    }
    let matcher;
    for (const normalizedRecord of normalizedRecords) {
      let { path } = normalizedRecord;
      // Build up the path for nested routes if the child isn't an absolute
      // route. Only add the / delimiter if the child path isn't empty and if the
      // parent path doesn't have a trailing slash
      if (parent && path[0] !== "/") {
        let parentPath = parent.record.path;
        let connectingSlash =
          parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path =
          parent.record.path + (path && connectingSlash + path);
      }
      // create the object before hand so it can be passed to children
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if ("children" in record) {
        for (const childRecord of record.children)
          addRoute(childRecord, matcher);
      }
      insertMatcher(matcher);
    }
    return () => {
      // since other matchers are aliases, they should should be removed by any of the matchers
      removeRoute(matcher);
    };
  }
  function removeRoute(matcherRef) {
    // TODO: remove aliases (needs to keep them in the RouteRecordMatcher first)
    if (typeof matcherRef === "string") {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
      }
    } else {
      let index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    // console.log('i is', { i })
    while (
      i < matchers.length &&
      comparePathParserScore(matcher, matchers[i]) >= 0
    )
      i++;
    // console.log('END i is', { i })
    // while (i < matchers.length && matcher.score <= matchers[i].score) i++
    matchers.splice(i, 0, matcher);
    if (matcher.record.name) matcherMap.set(matcher.record.name, matcher);
  }
  /**
   * Resolves a location. Gives access to the route record that corresponds to the actual path as well as filling the corresponding params objects
   * @param location MatcherLocation to resolve to a url
   * @param currentLocation MatcherLocationNormalized of the current location
   */
  function resolve(location, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location && location.name) {
      matcher = matcherMap.get(location.name);
      if (!matcher) throw new NoRouteMatchError(location);
      name = matcher.record.name;
      // TODO: merge params with current location. Should this be done by name. I think there should be some kind of relationship between the records like children of a parent should keep parent props but not the rest
      // needs an RFC if breaking change
      params = location.params || currentLocation.params;
      // throws if cannot be stringified
      path = matcher.stringify(params);
    } else if ("path" in location) {
      matcher = matchers.find(m => m.re.test(location.path));
      // matcher should have a value after the loop
      // no need to resolve the path with the matcher as it was provided
      // this also allows the user to control the encoding
      path = location.path;
      if (matcher) {
        // TODO: dev warning of unused params if provided
        params = matcher.parse(location.path);
        name = matcher.record.name;
      }
      // location is a relative path
    } else {
      // match by name or path of current route
      matcher = currentLocation.name
        ? matcherMap.get(currentLocation.name)
        : matchers.find(m => m.re.test(currentLocation.path));
      if (!matcher) throw new NoRouteMatchError(location, currentLocation);
      name = matcher.record.name;
      params = location.params || currentLocation.params;
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      // reversed order so parents are at the beginning
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: matcher ? matcher.record.meta : {}
    };
  }
  // add initial routes
  routes.forEach(route => addRoute(route));
  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
}
/**
 * Normalizes a RouteRecord. Transforms the `redirect` option into a `beforeEnter`
 * @param record
 * @returns the normalized version
 */
function normalizeRouteRecord(record) {
  let components;
  let beforeEnter;
  if ("redirect" in record) {
    components = {};
    let { redirect } = record;
    beforeEnter = (to, from, next) => {
      next(typeof redirect === "function" ? redirect(to) : redirect);
    };
  } else {
    components =
      "components" in record
        ? record.components
        : { default: record.component };
    beforeEnter = record.beforeEnter;
  }
  return {
    path: record.path,
    components,
    // fallback to empty array for monomorphic objects
    children: record.children,
    name: record.name,
    beforeEnter,
    meta: record.meta || {},
    leaveGuards: []
  };
}

function guardToPromiseFn(guard, to, from) {
  return () =>
    new Promise((resolve, reject) => {
      const next = valid => {
        // TODO: handle callback
        if (valid === false) reject(new NavigationAborted(to, from));
        else if (isRouteLocation(valid)) {
          reject(new NavigationGuardRedirect(to, valid));
        } else resolve();
      };
      guard(to, from, next);
    });
}

async function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  await Promise.all(
    matched.map(async record => {
      // TODO: cache async routes per record
      for (const name in record.components) {
        const component = record.components[name];
        // TODO: handle Vue.extend views
        // if ('options' in component) throw new Error('TODO')
        const resolvedComponent = component;
        // TODO: handle async component
        // const resolvedComponent = await (typeof component === 'function'
        //   ? component()
        //   : component)
        const guard = resolvedComponent[guardType];
        if (guard) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
      }
    })
  );
  return guards;
}
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = Array.isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}

/**
 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
 */
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers,
    reset
  };
}

/**
 * Encoding Rules
 * ␣ = Space
 * Path: ␣ " < > # ? { }
 * Query: ␣ " < > # & =
 * Hash: ␣ " < > `
 *
 * On top of that the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2) defines some extra characters to be encoded. Most browsers do not encode them in encodeURI https://github.com/whatwg/url/issues/369 so it may be safer to also encode !'()*. Leaving unencoded only ASCII alphanum plus -._~
 * This extra safety should be applied to query by patching the string returned by encodeURIComponent
 * encodeURI also encodes [\]^
 * \ should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a \ into a / if directly typed in
 * ` should also be encoded everywhere because some browsers like FF encode it when directly written while others don't
 * Safari and IE don't encode "<>{}` in hash
 */
// const EXTRA_RESERVED_RE = /[!'()*]/g
// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
const HASH_RE = /#/g; // %23
const AMPERSAND_RE = /&/g; // %26
const SLASH_RE = /\//g; // %2F
const EQUAL_RE = /=/g; // %3D
const IM_RE = /\?/g; // %3F
const ENC_BRACKET_OPEN_RE = /%5B/g; // [
const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
const ENC_CARET_RE = /%5E/g; // ^
const ENC_BACKTICK_RE = /%60/g; // `
const ENC_CURLY_OPEN_RE = /%7B/g; // {
const ENC_PIPE_RE = /%7C/g; // |
const ENC_CURLY_CLOSE_RE = /%7D/g; // }
function commonEncode(text) {
  return encodeURI("" + text)
    .replace(ENC_PIPE_RE, "|")
    .replace(ENC_BRACKET_OPEN_RE, "[")
    .replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeQueryProperty(text) {
  return commonEncode(text)
    .replace(HASH_RE, "%23")
    .replace(AMPERSAND_RE, "%26")
    .replace(EQUAL_RE, "%3D")
    .replace(ENC_BACKTICK_RE, "`")
    .replace(ENC_CURLY_OPEN_RE, "{")
    .replace(ENC_CURLY_CLOSE_RE, "}")
    .replace(ENC_CARET_RE, "^");
}
function encodePath(text) {
  return commonEncode(text)
    .replace(HASH_RE, "%23")
    .replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
}
function decode(text) {
  try {
    return decodeURIComponent(text);
  } catch (err) {
    warn(`Error decoding "${text}". Using original value`);
  }
  return text;
}

/**
 * Transform a queryString into a query object. Accept both, a version with the leading `?` and without
 * Should work as URLSearchParams
 * @param search
 * @returns a query object
 */
function parseQuery(search) {
  const query = {};
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === "" || search === "?") return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    let [key, rawValue] = searchParams[i].split("=");
    key = decode(key);
    // avoid decoding null
    let value = rawValue == null ? null : decode(rawValue);
    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key];
      if (!Array.isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
/**
 * Stringify an object query. Works like URLSearchParams. Doesn't prepend a `?`
 * @param query
 */
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    if (search.length) search += "&";
    const value = query[key];
    key = encodeQueryProperty(key);
    if (value == null) {
      // only null adds the value
      if (value !== undefined) search += key;
      continue;
    }
    // keep null values
    let values = Array.isArray(value)
      ? value.map(v => v && encodeQueryProperty(v))
      : [value && encodeQueryProperty(value)];
    for (let i = 0; i < values.length; i++) {
      // only append & with i > 0
      search += (i ? "&" : "") + key;
      if (values[i] != null) search += "=" + values[i];
    }
  }
  return search;
}
/**
 * Transforms a RawQuery intoe a NormalizedQuery by casting numbers into
 * strings, removing keys with an undefined value and replacing undefined with
 * null in arrays
 * @param query
 */
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (let key in query) {
    let value = query[key];
    if (value !== undefined) {
      normalizedQuery[key] = Array.isArray(value)
        ? value.map(v => (v == null ? null : "" + v))
        : value == null
        ? value
        : "" + value;
    }
  }
  return normalizedQuery;
}

const routerKey = "router";
const routeKey = "route";
function useRouter() {
  return inject(routerKey);
}
function useRoute() {
  return inject(routeKey);
}

// TODO: what should be accepted as arguments?
function useLink(props) {
  const router = inject(routerKey);
  const route = computed(() =>
    router.resolve(isRef(props.to) ? props.to.value : props.to)
  );
  const href = computed(() => router.createHref(route.value));
  const isActive = computed(
    () => router.currentRoute.value.path.indexOf(route.value.path) === 0
  );
  // TODO: handle replace prop
  function navigate(e = {}) {
    // TODO: handle navigate with empty parameters for scoped slot and composition api
    if (guardEvent(e)) router.push(route.value);
  }
  return {
    route,
    href,
    isActive,
    navigate
  };
}
const Link = defineComponent({
  name: "RouterLink",
  props: {
    to: {
      type: [String, Object],
      required: true
    }
  },
  setup(props, { slots, attrs }) {
    const { route, isActive, href, navigate } = useLink(props);
    const elClass = computed(() => ({
      "router-link-active": isActive.value
    }));
    // TODO: exact active classes
    // TODO: handle replace prop
    return () => {
      return h(
        "a",
        {
          class: elClass.value,
          onClick: navigate,
          href: href.value,
          ...attrs
        },
        slots.default(reactive({ route, href, isActive }))
      );
    };
  }
});
function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  // don't redirect when preventDefault called
  if (e.defaultPrevented) return;
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) return;
  // don't redirect if `target="_blank"`
  // @ts-ignore getAttribute does exist
  if (e.currentTarget && e.currentTarget.getAttribute) {
    // @ts-ignore getAttribute exists
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) e.preventDefault();
  return true;
}

// TODO: make it work with no symbols too for IE
const matchedRouteKey = Symbol();
const View = defineComponent({
  name: "RouterView",
  props: {
    name: {
      type: String,
      default: "default"
    }
  },
  setup(props, { attrs }) {
    const route = inject(routeKey);
    const depth = inject("routerViewDepth", 0);
    provide("routerViewDepth", depth + 1);
    const matchedRoute = computed(() => route.value.matched[depth]);
    const ViewComponent = computed(
      () => matchedRoute.value && matchedRoute.value.components[props.name]
    );
    provide(matchedRouteKey, matchedRoute);
    return () => {
      return ViewComponent.value ? h(ViewComponent.value, { ...attrs }) : null;
    };
  }
});

const isClient = typeof window !== "undefined";
function createRouter({ history, routes, scrollBehavior }) {
  const matcher = createRouterMatcher(routes, {});
  const beforeGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = ref(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isClient && "scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  function createHref(to) {
    return history.base + to.fullPath;
  }
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (typeof parentOrRoute === "string") {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    let recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else {
      // TODO: adapt if we allow Symbol as a name
      warn(`Cannot remove non-existant route "${name}"`);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
  }
  function resolve(location, currentLocation) {
    // const objectLocation = routerLocationAsObject(location)
    currentLocation = currentLocation || currentRoute.value;
    if (typeof location === "string") {
      let locationNormalized = parseURL(parseQuery, location);
      let matchedRoute = matcher.resolve(
        { path: locationNormalized.path },
        currentLocation
      );
      return {
        ...locationNormalized,
        ...matchedRoute,
        params: decodeParams(matchedRoute.params),
        redirectedFrom: undefined
      };
    }
    const hasParams = "params" in location;
    // relative or named location, path is ignored
    // for same reason TS thinks location.params can be undefined
    let matchedRoute = matcher.resolve(
      hasParams
        ? // we know we have the params attribute
          { ...location, params: encodeParams(location.params) }
        : location,
      currentLocation
    );
    // put back the unencoded params as given by the user (avoid the cost of decoding them)
    matchedRoute.params = hasParams
      ? // we know we have the params attribute
        location.params
      : decodeParams(matchedRoute.params);
    return {
      fullPath: stringifyURL(stringifyQuery, {
        ...location,
        path: matchedRoute.path
      }),
      hash: location.hash || "",
      query: normalizeQuery(location.query || {}),
      ...matchedRoute,
      redirectedFrom: undefined
    };
  }
  function push(to) {
    return pushWithRedirect(to, undefined);
  }
  async function pushWithRedirect(to, redirectedFrom) {
    const toLocation = (pendingLocation = resolve(to));
    const from = currentRoute.value;
    // @ts-ignore: no need to check the string as force do not exist on a string
    const force = to.force;
    // TODO: should we throw an error as the navigation was aborted
    // TODO: needs a proper check because order in query could be different
    if (!force && isSameLocation(from, toLocation)) return from;
    toLocation.redirectedFrom = redirectedFrom;
    // trigger all guards, throw if navigation is rejected
    try {
      await navigate(toLocation, from);
    } catch (error) {
      if (NavigationGuardRedirect.is(error)) {
        // push was called while waiting in guards
        if (pendingLocation !== toLocation) {
          triggerError(new NavigationCancelled(toLocation, from));
        }
        // preserve the original redirectedFrom if any
        return pushWithRedirect(error.to, redirectedFrom || toLocation);
      } else {
        // TODO: write tests
        if (pendingLocation !== toLocation) {
          triggerError(new NavigationCancelled(toLocation, from));
        }
      }
      triggerError(error);
    }
    finalizeNavigation(toLocation, from, true, to.replace === true);
    return currentRoute.value;
  }
  function replace(to) {
    const location = typeof to === "string" ? { path: to } : to;
    return push({ ...location, replace: true });
  }
  async function navigate(to, from) {
    let guards;
    // all components here have been resolved once because we are leaving
    // TODO: refactor both together
    guards = await extractComponentsGuards(
      from.matched.filter(record => to.matched.indexOf(record) < 0).reverse(),
      "beforeRouteLeave",
      to,
      from
    );
    const [leavingRecords] = extractChangingRecords(to, from);
    for (const record of leavingRecords) {
      for (const guard of record.leaveGuards) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
    }
    // run the queue of per route beforeRouteLeave guards
    await runGuardQueue(guards);
    // check global guards beforeEach
    guards = [];
    for (const guard of beforeGuards.list()) {
      guards.push(guardToPromiseFn(guard, to, from));
    }
    // console.log('Guarding against', guards.length, 'guards')
    await runGuardQueue(guards);
    // check in components beforeRouteUpdate
    guards = await extractComponentsGuards(
      to.matched.filter(record => from.matched.indexOf(record) > -1),
      "beforeRouteUpdate",
      to,
      from
    );
    // run the queue of per route beforeEnter guards
    await runGuardQueue(guards);
    // check the route beforeEnter
    guards = [];
    for (const record of to.matched) {
      // do not trigger beforeEnter on reused views
      if (record.beforeEnter && from.matched.indexOf(record) < 0) {
        if (Array.isArray(record.beforeEnter)) {
          for (const beforeEnter of record.beforeEnter)
            guards.push(guardToPromiseFn(beforeEnter, to, from));
        } else {
          guards.push(guardToPromiseFn(record.beforeEnter, to, from));
        }
      }
    }
    // run the queue of per route beforeEnter guards
    await runGuardQueue(guards);
    // check in-component beforeRouteEnter
    // TODO: is it okay to resolve all matched component or should we do it in order
    guards = await extractComponentsGuards(
      to.matched.filter(record => from.matched.indexOf(record) < 0),
      "beforeRouteEnter",
      to,
      from
    );
    // run the queue of per route beforeEnter guards
    await runGuardQueue(guards);
  }
  /**
   * - Cleans up any navigation guards
   * - Changes the url if necessary
   * - Calls the scrollBehavior
   */
  function finalizeNavigation(toLocation, from, isPush, replace) {
    // a more recent navigation took place
    if (pendingLocation !== toLocation) {
      return triggerError(new NavigationCancelled(toLocation, from), isPush);
    }
    // remove registered guards from removed matched records
    const [leavingRecords] = extractChangingRecords(toLocation, from);
    for (const record of leavingRecords) {
      record.leaveGuards = [];
    }
    // only consider as push if it's not the first navigation
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    // change URL only if the user did a push/replace and if it's not the initial navigation because
    // it's just reflecting the url
    if (isPush) {
      if (replace || isFirstNavigation) history.replace(toLocation);
      else history.push(toLocation);
    }
    // accept current navigation
    currentRoute.value = markNonReactive(toLocation);
    // TODO: this doesn't work on first load. Moving it to RouterView could allow automatically handling transitions too maybe
    // TODO: refactor with a state getter
    const state = isPush || !isClient ? {} : window.history.state;
    handleScroll(toLocation, from, state && state.scroll).catch(err =>
      triggerError(err, false)
    );
    // navigation is confirmed, call afterGuards
    for (const guard of afterGuards.list()) guard(toLocation, from);
    markAsReady();
  }
  // attach listener to history to trigger navigations
  history.listen(async (to, _from, info) => {
    const toLocation = resolve(to.fullPath);
    // console.log({ to, matchedRoute })
    pendingLocation = toLocation;
    const from = currentRoute.value;
    try {
      await navigate(toLocation, from);
      finalizeNavigation(toLocation, from, false);
    } catch (error) {
      if (NavigationGuardRedirect.is(error)) {
        // TODO: refactor the duplication of new NavigationCancelled by
        // checking instanceof NavigationError (it's another TODO)
        // a more recent navigation took place
        if (pendingLocation !== toLocation) {
          return triggerError(new NavigationCancelled(toLocation, from), false);
        }
        triggerError(error, false);
        // the error is already handled by router.push
        // we just want to avoid logging the error
        pushWithRedirect(error.to, toLocation).catch(() => {});
      } else if (NavigationAborted.is(error)) {
        console.log("Cancelled, going to", -info.distance);
        // TODO: test on different browsers ensure consistent behavior
        history.go(-info.distance, false);
      } else {
        triggerError(error, false);
      }
    }
  });
  // Initialization and Errors
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  /**
   * Trigger errorHandlers added via onError and throws the error as well
   * @param error error to throw
   * @param shouldThrow defaults to true. Pass false to not throw the error
   */
  function triggerError(error, shouldThrow = true) {
    markAsReady(error);
    errorHandlers.list().forEach(handler => handler(error));
    if (shouldThrow) throw error;
  }
  /**
   * Returns a Promise that resolves or reject when the router has finished its
   * initial navigation. This will be automatic on client but requires an
   * explicit `router.push` call on the server. This behavior can change
   * depending on the history implementation used e.g. the defaults history
   * implementation (client only) triggers this automatically but the memory one
   * (should be used on server) doesn't
   */
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve, reject) => {
      readyHandlers.add([resolve, reject]);
    });
  }
  /**
   * Mark the router as ready, resolving the promised returned by isReady(). Can
   * only be called once, otherwise does nothing.
   * @param err optional error
   */
  function markAsReady(err) {
    if (ready) return;
    ready = true;
    readyHandlers
      .list()
      .forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
    readyHandlers.reset();
  }
  // Scroll behavior
  async function handleScroll(to, from, scrollPosition) {
    if (!scrollBehavior) return;
    await nextTick();
    const position = await scrollBehavior(to, from, scrollPosition || null);
    console.log("scrolling to", position);
    scrollToPosition(position);
  }
  const router = {
    currentRoute,
    addRoute,
    removeRoute,
    getRoutes,
    push,
    replace,
    resolve,
    beforeEach: beforeGuards.add,
    afterEach: afterGuards.add,
    createHref,
    onError: errorHandlers.add,
    isReady,
    history,
    install(app) {
      applyRouterPlugin(app, this);
    }
  };
  return router;
}
function applyRouterPlugin(app, router) {
  // TODO: remove as any
  app.component("RouterLink", Link);
  app.component("RouterView", View);
  let started = false;
  // TODO: can we use something that isn't a mixin?
  // TODO: this initial navigation is only necessary on client, on server it doesn't make sense
  // because it will create an extra unecessary navigation and could lead to problems
  if (isClient)
    app.mixin({
      beforeCreate() {
        if (!started) {
          router.push(router.history.location.fullPath).catch(err => {
            console.error("Unhandled error", err);
          });
          started = true;
        }
      }
    });
  // TODO: merge strats?
  app.provide("router", router);
  app.provide("route", router.currentRoute);
}
async function runGuardQueue(guards) {
  for (const guard of guards) {
    await guard();
  }
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  // TODO: could be optimized with one single for loop
  for (const record of from.matched) {
    if (to.matched.indexOf(record) < 0) leavingRecords.push(record);
    else updatingRecords.push(record);
  }
  for (const record of to.matched) {
    if (from.matched.indexOf(record) < 0) enteringRecords.push(record);
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function isSameLocation(a, b) {
  return (
    a.name === b.name &&
    a.path === b.path &&
    a.hash === b.hash &&
    isSameLocationQuery(a.query, b.query)
  );
}
function isSameLocationQuery(a, b) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  let i = 0;
  let key;
  while (i < aKeys.length) {
    key = aKeys[i];
    if (key !== bKeys[i]) return false;
    if (!isSameLocationQueryValue(a[key], b[key])) return false;
    i++;
  }
  return true;
}
function isSameLocationQueryValue(a, b) {
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) return a.every((value, i) => value === b[i]);
  return a === b;
}

function onBeforeRouteLeave(leaveGuard) {
  const instance = getCurrentInstance();
  if (!instance) {
    warn("onRouteLeave must be called at the top of a setup function");
    return;
  }
  // TODO: fix wrong type
  const matched = inject(matchedRouteKey, {}).value;
  if (!matched) {
    warn("onRouteLeave must be called at the top of a setup function");
    return;
  }
  // @ts-ignore
  matched.leaveGuards.push(leaveGuard.bind(instance.proxy));
}

export {
  Link,
  START_LOCATION_NORMALIZED as START_LOCATION,
  View,
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
  onBeforeRouteLeave,
  useRoute,
  useRouter
};
