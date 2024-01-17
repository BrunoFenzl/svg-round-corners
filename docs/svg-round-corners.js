/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parsePath: () => (/* binding */ parsePath),
/* harmony export */   roundCommands: () => (/* binding */ roundCommands),
/* harmony export */   roundCorners: () => (/* binding */ roundCorners)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");


/**
 * Parses the given command string and generates an array of parsed commands.
 * This function normalises all relative commands into absolute commands and
 * transforms h, H, v, V to L commands
 * @param {string} str Raw string from 'd' Attribute
 * @returns {array} Array of normalised commands
 */
function parsePath(str) {
  const markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
  const digitRegEx = /-?[0-9]*\.?\d+/g;
  return [...str.matchAll(markerRegEx)].map(match => {
    return {
      marker: match[0],
      index: match.index
    };
  }).reduceRight((acc, cur) => {
    const chunk = str.substring(cur.index, acc.length ? acc[acc.length - 1].index : str.length);
    return acc.concat([{
      marker: cur.marker,
      index: cur.index,
      chunk: chunk.length > 0 ? chunk.substr(1, chunk.length - 1) : chunk
    }]);
  }, []).reverse().flatMap(cmd => {
    const values = cmd.chunk.match(digitRegEx);
    const vals = values ? values.map(parseFloat) : [];
    return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.newCommands)(cmd.marker, vals);
  }).map(_utils_js__WEBPACK_IMPORTED_MODULE_0__.convertToAbsolute);
}

/**
 * Iterates through an array of normalised commands and insert arcs where applicable.
 * This function modifies the array in place.
 * @param {array} _cmds Array with commands to be modified
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {array} Sequence of commands containing arcs in place of corners
 */
function roundCommands(cmds, r, round) {
  let subpaths = [];
  let newCmds = [];
  if (round) {
    cmds.forEach(el => (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.roundValues)(el, round));
    // roundValues(cmds, round);
  }
  cmds
  // split sub paths
  .forEach(e => {
    if (e.marker === 'M') {
      subpaths.push([]);
    }
    subpaths[subpaths.length - 1].push(e);
  });
  subpaths.forEach(subPathCmds => {
    subPathCmds
    // We are only excluding lineTo commands that may be overlapping
    .map(_utils_js__WEBPACK_IMPORTED_MODULE_0__.markOverlapped);
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.reverseMarkOverlapped)(subPathCmds, subPathCmds.length - 1);

    // is this an open or closed path? don't add arcs to start/end.
    const closedPath = subPathCmds[subPathCmds.length - 1].marker == 'Z';
    subPathCmds.filter(el => !el.overlap).map((el, i, arr) => {
      const largeArcFlag = 0;
      const prev = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getPreviousNoZ)(el, i, arr);
      const next = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getNextNoZ)(el, i, arr);
      const anglePrv = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAngle)(el.values, prev.values);
      const angleNxt = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAngle)(el.values, next.values);
      const angle = angleNxt - anglePrv; // radians
      const degrees = angle * (180 / Math.PI);
      // prevent arc crossing the next command
      const shortest = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.shortestSide)(el, prev, next);
      const maxRadius = Math.abs((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getTangentNoHyp)(angle / 2, shortest / 2));
      const radius = Math.min(r, maxRadius);
      const o = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOffset)(angle, radius);
      const offset = o.offset;
      const sweepFlag = o.sweepFlag;
      const openFirstOrLast = (i == 0 || i == arr.length - 1) && !closedPath;
      switch (el.marker) {
        case 'M': // moveTo x,y
        case 'L':
          // lineTo x,y
          /* eslint-disable no-case-declarations */
          const prevPoint = [el.values.x + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOppositeLength)(anglePrv, offset), el.values.y + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAdjacentLength)(anglePrv, offset)];

          /* eslint-disable no-case-declarations */
          const nextPoint = [el.values.x + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOppositeLength)(angleNxt, offset), el.values.y + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAdjacentLength)(angleNxt, offset)];

          // there only need be a curve if and only if the next marker is a corner
          if (!openFirstOrLast) {
            newCmds.push({
              marker: el.marker,
              values: {
                x: parseFloat(prevPoint[0].toFixed(3)),
                y: parseFloat(prevPoint[1].toFixed(3))
              }
            });
          } else {
            newCmds.push({
              marker: el.marker,
              values: el.values
            });
          }
          if (!openFirstOrLast && (next.marker === 'L' || next.marker === 'M')) {
            newCmds.push({
              marker: 'A',
              radius: radius,
              values: {
                radiusX: radius,
                radiusY: radius,
                rotation: degrees,
                largeArc: largeArcFlag,
                sweep: sweepFlag,
                x: parseFloat(nextPoint[0].toFixed(3)),
                y: parseFloat(nextPoint[1].toFixed(3))
              }
            });
          }
          break;
        // case 'H': // horizontalTo x. Transformed to L in utils
        // case 'V': // verticalTo y. Transformed to L in utils
        case 'C': // cubic beziér: x1 y1, x2 y2, x y
        case 'S': // short beziér: x2 y2, x y
        case 'Q': // quadratic beziér: x1 y1, x y
        case 'T': // short quadratic beziér: x y
        case 'A': // arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
        case 'Z':
          // close path
          newCmds.push({
            marker: el.marker,
            values: el.values
          });
          break;
      }
    });
  });
  return {
    path: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.commandsToSvgPath)(newCmds),
    commands: newCmds
  };
}

/**
 * This is a shorthand for parsePath() and roundCommands().
 * You get the end result in one function call.
 * @param {string} str Raw string with commands from the path element
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {array} New commands sequence with rounded corners
 */
function roundCorners(str, r, round) {
  return roundCommands([...parsePath(str)], r, round);
}


/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bsplit: () => (/* binding */ bsplit),
/* harmony export */   commandsToSvgPath: () => (/* binding */ commandsToSvgPath),
/* harmony export */   convertToAbsolute: () => (/* binding */ convertToAbsolute),
/* harmony export */   getAdjacentLength: () => (/* binding */ getAdjacentLength),
/* harmony export */   getAngle: () => (/* binding */ getAngle),
/* harmony export */   getDistance: () => (/* binding */ getDistance),
/* harmony export */   getNextNoZ: () => (/* binding */ getNextNoZ),
/* harmony export */   getOffset: () => (/* binding */ getOffset),
/* harmony export */   getOppositeLength: () => (/* binding */ getOppositeLength),
/* harmony export */   getPreviousNoZ: () => (/* binding */ getPreviousNoZ),
/* harmony export */   getTangentLength: () => (/* binding */ getTangentLength),
/* harmony export */   getTangentNoHyp: () => (/* binding */ getTangentNoHyp),
/* harmony export */   markOverlapped: () => (/* binding */ markOverlapped),
/* harmony export */   mod: () => (/* binding */ mod),
/* harmony export */   newCommands: () => (/* binding */ newCommands),
/* harmony export */   reverseMarkOverlapped: () => (/* binding */ reverseMarkOverlapped),
/* harmony export */   roundValues: () => (/* binding */ roundValues),
/* harmony export */   shortestSide: () => (/* binding */ shortestSide)
/* harmony export */ });
/**
 * Round the values of each command to the given number of decimals.
 * This function modifies the object in place.
 * @param {array} cmds Sequence of commands
 * @param {number} round Number of decimal place to be rounded
 * @returns {array} Sequence of commands with their values rounded
 */
function roundValues(el, round) {
  Object.keys(el.values).forEach(key => el.values[key] = el.values[key] && parseFloat(el.values[key].toFixed(round)));
  return el;
}

/**
 * Get previous element in array, wrapping if index is out of bounds and skipping if the command is 'Z'
 * @param {any} e Command object
 * @param {number} i Current index
 * @param {array} a Array being iterated
 * @returns {any} Previous element that doesn't have a 'Z' marker
 */
function getPreviousNoZ(e, i, a) {
  const counter = i - 1;
  const previous = a[mod(counter, a.length)];
  if (previous.marker !== 'Z') {
    return previous;
  } else {
    return getPreviousNoZ(e, counter, a);
  }
}

/**
 * Get next element in array, wrapping if index is out of bounds and skipping if the command is 'Z'
 * @param {any} e Command object
 * @param {number} i Current index
 * @param {array} a Array being iterated
 * @returns {any} Next element that doesn't have a 'Z' marker
 */
function getNextNoZ(e, i, a) {
  const counter = i + 1;
  const next = a[mod(counter, a.length)];
  if (next.marker === 'Z') {
    return getNextNoZ(e, counter, a);
  } else {
    return next;
  }
}

/**
 * Iterate through an array and convert all commands to absolute.
 * This function should be used as argument in a map() call.
 * @param {any} el Current element in this iteration
 * @param {number} index Current iteration index
 * @param {array} arr Array being iterated
 */
function convertToAbsolute(el, index, arr) {
  // get previous item or create one empty if it doesnt exist
  let prev = arr[index - 1] || {
    values: {
      x: 0,
      y: 0
    }
  };

  // only need to test lowercase (relative) commands
  if (el.marker === el.marker.toLowerCase()) {
    // convert all to uppercase
    el.marker = el.marker.toUpperCase();
    switch (el.marker) {
      case 'M':
        // move to x,y
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'L': // line to x,y
      case 'A':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'H':
        // horizontalTo x
        el.marker = 'L';
        el.values.x += prev.values.x;
        el.values.y = prev.values.y;
        break;
      case 'V':
        // verticalTo y
        el.marker = 'L';
        el.values.x = prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'C':
        // beziér curve x1 y1, x2 y2, x y
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        el.values.x1 += prev.values.x;
        el.values.y1 += prev.values.y;
        el.values.x2 += prev.values.x;
        el.values.y2 += prev.values.y;
        break;
      case 'S':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        el.values.x2 += prev.values.x;
        el.values.y2 += prev.values.y;
        break;
      case 'Q':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        el.values.x1 += prev.values.x;
        el.values.y1 += prev.values.y;
        break;
      case 'T':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'Z':
        break;
    }
    // H/V uppercase need to be converted too. Convert to L and add missing value
  } else if (el.marker === el.marker.toUpperCase()) {
    switch (el.marker) {
      case 'H':
        // horizontalTo x
        el.marker = 'L';
        el.values.y = prev.values.y;
        break;
      case 'V':
        // verticalTo y
        el.marker = 'L';
        el.values.x = prev.values.x;
        break;
    }
  }

  /*
    'Z' commands don't have any coordinate but we are cloning the
    start coordinates defined by this subpath initial 'M' so it's
    easier to do the stitching later.
  */
  if (el.marker === 'Z') {
    // find previous 'M' recursively
    function rec(arr, i) {
      if (arr[i].marker === 'M') {
        return arr[i];
      } else {
        return rec(arr, i - 1);
      }
    }
    let mBefore = rec(arr, index);
    el.values.x = mBefore.values.x;
    el.values.y = mBefore.values.y;
  }
  return el;
}

/**
 * Takes one marker and an array of numbers and creates one or more command objects with the right
 * properties based on the given marker. Some markers allow for multiple coordinates for one single command.
 * This function takes care of splitting multiple coordinates per command and generating the
 * @param {string} marker Letter of the command being generated
 * @param {array} values Array of numbers to be splitted and parsed into the right properties
 * @returns {array} Array of commands. Most of the time will have only one item
 */
function newCommands(marker, values) {
  const cmds = [];
  switch (marker.toUpperCase()) {
    case 'M':
      // moveTo x,y
      for (let i = 0; i < values.length; i += 2) {
        let m;
        if (marker === marker.toUpperCase()) {
          m = i === 0 ? 'M' : 'L';
        } else {
          m = i === 0 ? 'm' : 'l';
        }
        cmds.push({
          marker: m,
          values: {
            x: values[i],
            y: values[i + 1]
          }
        });
      }
      break;
    case 'L':
      // lineTo x,y
      for (let i = 0; i < values.length; i += 2) {
        cmds.push({
          marker,
          values: {
            x: values[i],
            y: values[i + 1]
          }
        });
      }
      break;
    case 'H':
      // horizontalTo x
      for (let i = 0; i < values.length; i++) {
        cmds.push({
          marker,
          values: {
            x: values[i],
            y: 0
          }
        });
      }
      break;
    case 'V':
      // verticalTo y
      for (let i = 0; i < values.length; i++) {
        cmds.push({
          marker,
          values: {
            x: 0,
            y: values[i]
          }
        });
      }
      break;
    case 'C':
      // cubic beziér curve x1 y1, x2 y2, x y
      for (let i = 0; i < values.length; i += 6) {
        cmds.push({
          marker,
          values: {
            x1: values[i],
            y1: values[i + 1],
            x2: values[i + 2],
            y2: values[i + 3],
            x: values[i + 4],
            y: values[i + 5]
          }
        });
      }
      break;
    case 'S':
      for (let i = 0; i < values.length; i += 4) {
        cmds.push({
          marker,
          values: {
            x2: values[i],
            y2: values[i + 1],
            x: values[i + 2],
            y: values[i + 3]
          }
        });
      }
      break;
    case 'Q':
      for (let i = 0; i < values.length; i += 4) {
        cmds.push({
          marker,
          values: {
            x1: values[i],
            y1: values[i + 1],
            x: values[i + 2],
            y: values[i + 3]
          }
        });
      }
      break;
    case 'T':
      for (let i = 0; i < values.length; i += 2) {
        cmds.push({
          marker,
          values: {
            x: values[i],
            y: values[i + 1]
          }
        });
      }
      break;
    case 'A':
      for (let i = 0; i < values.length; i += 7) {
        cmds.push({
          marker,
          values: {
            radiusX: values[i],
            radiusY: values[i + 1],
            rotation: values[i + 2],
            largeArc: values[i + 3],
            sweep: values[i + 4],
            x: values[i + 5],
            y: values[i + 6]
          }
        });
      }
      break;
    case 'Z':
      cmds.push({
        marker,
        values: {
          // values will be overriden later by convertToAbsolute()
          x: 0,
          y: 0
        }
      });
      break;
  }
  return cmds;
}

/**
 * Takes an index and a length and returns the index wrapped if out of bounds.
 * @param {number} x Index
 * @param {number} m Length
 * @returns {number} Index or wrapped index if out bounds
 */
function mod(x, m) {
  return (x % m + m) % m;
}

/**
 * Compares the given element with it's predecessor and checks if their end position is the same.
 * If it is, add a boolean 'overlap' property to the element. This function modifies the array elements in place
 * @param {any} el Command object
 * @param {number} index Current iteration index
 * @param {array} array Array being iterated
 * @returns {any} Command object
 */
function markOverlapped(el, index, array) {
  // Skip the first moveTo command and any other that's not a lineTo.
  if (index !== 0 && el.marker === 'L') {
    // It seems we have a lineTo here. Get the immediate previous command
    let previous = array[index - 1];
    // …and check if the x, y coordinates are equals.
    const overlap = ['x', 'y'].every(key => {
      // If x AND y overlap, this command should be skipped
      return Math.round(Math.abs(previous.values[key] - el.values[key])) === 0;
    });
    if (overlap) {
      el.overlap = true;
    }
  }
  return el;
}

/**
 * Similar purpose as markOverlapped(). Recursively marks trailling commands that have the same end coordinate as the inital 'M'.
 * This function modifies the array in place.
 * @param {array} cmds Commands array
 * @param {number} index Optional start index counting backwards. Usually the last index from the array
 */
function reverseMarkOverlapped(cmds, counter) {
  const overlap = ['x', 'y'].every(key => {
    // If x AND y overlap, this command should be skipped
    return Math.round(Math.abs(cmds[counter].values[key] - cmds[0].values[key])) === 0;
  });
  if (cmds[counter].marker === 'L' && overlap) {
    cmds[counter].overlap = true;
    reverseMarkOverlapped(cmds, counter - 1);
  }
  if (cmds[counter].marker === 'Z') {
    reverseMarkOverlapped(cmds, counter - 1);
  }
}

/**
 * Calculates the distance between the current command and
 * it's direct neighbours and returns the nearest distance
 * @param {any} el current command
 * @param {any} previous previous command
 * @param {any} next next command
 * @returns {number} the distance to teh nearest command
 */
function shortestSide(el, previous, next) {
  const nxtSide = getDistance(el.values, next.values);
  const prvSide = getDistance(previous.values, el.values);
  return Math.min(prvSide, nxtSide);
}

/**
 * Calculates the angle between two points
 * @param {any} p1 Object with x and y properties
 * @param {any} p2 Object with x and y properties
 * @returns {number} Angle in radians
 */
function getAngle(p1, p2) {
  return Math.atan2(p2.x - p1.x, p2.y - p1.y);
}

/**
 * Calculates the distance between two points
 * @param {any} p1 Object with x and y properties
 * @param {any} p2 Object with x and y properties
 * @returns {number} Distance between points
 */
function getDistance(p1, p2) {
  const xDiff = p1.x - p2.x;
  const yDiff = p1.y - p2.y;
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

/**
 * Calculates the length of the opposite side
 * of a given angle using the hypothenuse
 * @param {number} angle Angle in radians
 * @param {number} hip Hypothenuse
 * @returns {number} Length of the opposite side
 */
function getOppositeLength(angle, hip) {
  return Math.sin(angle) * hip;
}

/**
 * Calculates the length of the adjacent side
 * of a given angle using the hypothenuse
 * @param {number} angle Angle in radians
 * @param {number} hip Hypothenuse
 * @returns {number} Length of the adjacent side
 */
function getAdjacentLength(angle, hip) {
  return Math.cos(angle) * hip;
}

/**
 * Calculates the adjacent side of the given
 * angle using the angle's opposite side
 * @param {number} angle Angle in radians
 * @param {number} opposite opposite side
 * @returns {number} Length of the adjacent side
 */
function getTangentLength(angle, opposite) {
  const a = opposite / Math.tan(angle);
  if (a === Infinity || a === -Infinity || isNaN(a)) {
    return opposite;
  }
  return a;
}

/**
 * Calculates the opposite side of the given
 * angle using the angle's adjacent side
 * @param {number} angle Angle in radians
 * @param {number} adjacent adjacent side
 * @returns {number} Length of the opposite side
 */
function getTangentNoHyp(angle, adjacent) {
  return adjacent * Math.tan(angle);
}

/**
 * Calculates the length that should be used to shorten the
 * distance between commands based on the given radius value
 * @param {number} angle Angle in radians between points
 * @param {number} r Radius of the arc that should fit inside the triangle
 * @returns {any} Object containing offset and the arc's sweepFlag
 */
function getOffset(angle, r) {
  let offset;
  let sweepFlag = 0;
  let degrees = angle * (180 / Math.PI);

  // sharp angles
  if (degrees < 0 && degrees >= -180 || degrees > 180 && degrees < 360) {
    offset = getTangentLength(angle / 2, -r);
    // obtuse angles
  } else {
    offset = getTangentLength(angle / 2, r);
    sweepFlag = 1;
    if (offset === Infinity) {
      offset = r;
    }
  }
  return {
    offset,
    sweepFlag
  };
}

/**
 * Originally taken from: http://bl.ocks.org/balint42/8c9310605df9305c42b3
 * @brief De Casteljau's algorithm splitting n-th degree Bezier curve
 * @returns {array}
 */
function bsplit(points, t0) {
  const n = points.length - 1; // number of control points
  const b = []; // coefficients as in De Casteljau's algorithm
  const res1 = []; // first curve resulting control points
  const res2 = []; // second curve resulting control points
  const t1 = 1 - t0;

  // multiply point with scalar factor
  const pf = function (p, f) {
    const res = [];
    for (let i = 0; i < p.length; i++) {
      res.push(f * p[i]);
    }
    return res;
  };
  // add points as vectors
  const pp = function (p1, p2) {
    const res = [];
    for (let i = 0; i < Math.min(p1.length, p2.length); i++) {
      res.push(p1[i] + p2[i]);
    }
    return res;
  };

  // set original coefficients: b[i][0] = points[i]
  for (let i = 0; i <= n; i++) {
    points[i] = typeof points[i] == 'object' ? points[i] : [points[i]];
    b.push([points[i]]);
  }

  // get all coefficients
  for (let j = 1; j <= n; j++) {
    for (let i = 0; i <= n - j; i++) {
      b[i].push(pp(pf(b[i][j - 1], t1), pf(b[i + 1][j - 1], t0)));
    }
  }
  // set result: res1 & res2
  for (let j = 0; j <= n; j++) {
    res1.push(b[0][j]);
    res2.push(b[j][n - j]);
  }
  return [res1, res2];
}

/**
 * Concatenates commands in a string and ensures that each
 * value from each command is printed in the right order
 * @param {array} cmds Array of svg commands
 * @returns {string} String containing all commands formated ready for the 'd' Attribute
 */
function commandsToSvgPath(cmds) {
  // when writing the commands back, the relevant values should be written in this order
  const valuesOrder = ['radiusX', 'radiusY', 'rotation', 'largeArc', 'sweep', 'x1', 'y1', 'x2', 'y2', 'x', 'y'];
  return cmds.map(cmd => {
    // defaults for empty string, so Z will output no values
    let d = '';
    // filter any command that's not Z
    if (cmd.marker !== 'Z') {
      // get all values from current command
      const cmdKeys = Object.keys(cmd.values);
      // filter the valuesOrder array for only the values that appear in the current command.
      // We do this because valuesOrder guarantees that the relevant values will be in the right order
      d = valuesOrder.filter(v => cmdKeys.indexOf(v) !== -1)
      // replace the key with it's value
      .map(key => cmd.values[key])
      // and stringify everything together with a comma inbetween values
      .join();
    }
    return "".concat(cmd.marker).concat(d);
  }).join('').trim();
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./demo-src/main.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./lib/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils */ "./lib/utils.js");


const svgns = 'http://www.w3.org/2000/svg';
class SVGPreview {
  constructor(stageSelector, pathSelector) {
    this.commands = [];
    this.dots = [];
    this.dotRadius = 5;
    this.mouseDownOffset = {
      x: 0,
      y: 0
    };
    this.activeDotIndex;
    this.radius = 20;
    this.stage = document.querySelector(stageSelector);
    this.stageOffset = this.stage.getBoundingClientRect();
    this.path = document.querySelector(pathSelector);
    // this.rangeSlider = this.rangeSlider;

    // Set the svg stage to be the same size of the window
    this.stage.setAttribute('width', window.innerWidth);
    this.stage.setAttribute('height', window.innerHeight);

    // create clone path to show the difference between original
    // and path with rounded corners.
    this.clone = this.path.cloneNode();
    this.clone.classList.add('original');
    this.path.insertAdjacentElement('beforebegin', this.clone);
    this.rangeSlider = new RangeSlider('.controller', {});
    this.rangeSlider.addEventListener('update', evt => {
      this.radius = evt.detail;
      this.updatePath(evt.metaKey);
    });

    // bind event listeners to this class context
    this.dotMouseDown = this.dotMouseDown.bind(this);
    this.stageMouseMove = this.stageMouseMove.bind(this);
    this.stageMouseUp = this.stageMouseUp.bind(this);
    this.stageClick = this.stageClick.bind(this);
    this.stage.addEventListener('click', this.stageClick);
  }
  updatePath(closedPath) {
    // build the string
    const d = this.commands.reduce((acc, curr) => acc += "".concat(curr.marker).concat(curr.values.x, ",").concat(curr.values.y), '') + (closedPath ? 'Z' : '');

    // update the path's
    this.path.setAttribute('d', d);
    this.path.setAttribute('data-original-d', d);
    this.clone.setAttribute('d', d);

    // round the corners
    const rCorners = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.roundCorners)(d, this.radius);
    this.path.setAttribute('d', rCorners.path);
  }
  dotMouseDown(evt) {
    const dot = evt.target;
    this.activeDotIndex = this.dots.indexOf(dot);
    this.mouseDownOffset = {
      x: evt.clientX - this.stageOffset.left + this.dotRadius - dot.getAttributeNS(null, 'cx'),
      y: evt.clientY - this.stageOffset.top + this.dotRadius - dot.getAttributeNS(null, 'cy')
    };
    this.stage.addEventListener('mousemove', this.stageMouseMove);
    this.stage.addEventListener('mouseup', this.stageMouseUp);
  }
  stageMouseMove(evt) {
    const dot = this.dots[this.activeDotIndex];
    const pathCmd = this.commands[this.activeDotIndex].values;
    pathCmd.x = evt.clientX - this.mouseDownOffset.x;
    pathCmd.y = evt.clientY - this.mouseDownOffset.y;
    this.updatePath(evt.metaKey);
    dot.setAttributeNS(null, 'cx', pathCmd.x);
    dot.setAttributeNS(null, 'cy', pathCmd.y);
  }
  stageMouseUp() {
    // Cleanup
    this.stage.removeEventListener('mousemove', this.stageMouseMove);
    this.stage.removeEventListener('mouseup', this.stageMouseUp);
  }
  newDot(x, y) {
    const dot = document.createElementNS(svgns, 'circle');
    dot.setAttributeNS(null, 'cx', x);
    dot.setAttributeNS(null, 'cy', y);
    dot.setAttributeNS(null, 'r', this.dotRadius);
    this.stage.appendChild(dot);
    dot.addEventListener('mousedown', this.dotMouseDown.bind(this));
    return dot;
  }
  stageClick(evt) {
    // if dragging
    if (evt.shiftKey) return;
    const marker = this.commands.length ? 'L' : 'M';
    const x = evt.clientX - this.stageOffset.left;
    const y = evt.clientY - this.stageOffset.top;
    this.commands.push({
      marker,
      values: {
        x,
        y
      }
    });
    this.dots.push(this.newDot(x, y));
    this.updatePath(evt.metaKey);
  }
}

// Component responsible for controlling the radius
class RangeSlider extends EventTarget {
  constructor(containerSelector, options) {
    super();
    const defaults = {
      size: 250,
      minRadius: 0,
      maxRadius: 70,
      startRadius: 20,
      handleRadius: 5
    };
    this.options = {
      ...defaults,
      ...options
    };
    this.mouseDownOffset = {
      x: 0,
      y: 0
    };
    const str = "\n      <svg\n        class=\"radius-control\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        width=\"".concat(this.options.size, "\"\n        height=\"").concat(this.options.size, "\"\n        viewPort=\"0 0 ").concat(this.options.size, " ").concat(this.options.size, "\"\n      >\n        <circle\n          cx=\"").concat(this.options.size / 2, "\"\n          cy=\"").concat(this.options.size / 2, "\"\n          r=\"").concat(this.options.startRadius, "\"\n          class=\"radius-control__circle\" />\n        <line\n          x1=\"").concat(this.options.size / 2, "\"\n          y1=\"").concat(this.options.size / 2, "\"\n          x2=\"").concat(this.options.size / 2 + this.options.startRadius, "\"\n          y2=\"").concat(this.options.size / 2, "\"\n          class=\"radius-control__line\"\n        />\n        <circle\n          cx=\"").concat(this.options.size / 2 + this.options.startRadius, "\"\n          cy=\"").concat(this.options.size / 2, "\"\n          r=\"").concat(this.options.handleRadius, "\"\n          class=\"radius-control__handle\" />\n      </svg>\n    ");
    const container = document.querySelector(containerSelector);
    const range = document.createRange();
    // Make the parent of the first div in the document becomes the context node
    range.selectNode(container);
    var documentFragment = range.createContextualFragment(str);
    container.appendChild(documentFragment);

    // Get references to the parts we need
    this.stage = document.querySelector('.radius-control');
    this.circle = document.querySelector('.radius-control__circle');
    this.line = document.querySelector('.radius-control__line');
    this.handle = document.querySelector('.radius-control__handle');
    this.stageOffset = this.stage.getBoundingClientRect();

    // Add event listeners and bind the callbacks to the class context
    this.docMouseMove = this.docMouseMove.bind(this);
    this.docMouseUp = this.docMouseUp.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handle.addEventListener('mousedown', this.handleMouseDown);
  }
  handleMouseDown(evt) {
    // the x/y distance from the pointer to the center of the handle
    this.mouseDownOffset = {
      x: evt.clientX - this.stageOffset.x + this.options.handleRadius - this.handle.getAttributeNS(null, 'cx'),
      y: evt.clientY - this.stageOffset.y + this.options.handleRadius - this.handle.getAttributeNS(null, 'cy')
    };
    document.addEventListener('mousemove', this.docMouseMove);
    document.addEventListener('mouseup', this.docMouseUp);
  }
  docMouseMove(evt) {
    const x = evt.clientX - this.stageOffset.x + this.options.handleRadius - this.mouseDownOffset.x;
    const y = evt.clientY - this.stageOffset.y + this.options.handleRadius - this.mouseDownOffset.y;
    const p1 = {
      x,
      y
    };
    const p2 = {
      x: this.options.size / 2,
      y: this.options.size / 2
    };
    // get distance from center of stage
    const distance = Math.min((0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.getDistance)(p1, p2), this.options.maxRadius);
    const angle = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.getAngle)(p1, p2);
    // The handle should not pass the maximal radius defined in options
    const maxX = -Math.sin(angle) * distance + this.options.size / 2;
    const maxY = -Math.cos(angle) * distance + this.options.size / 2;
    this.handle.setAttributeNS(null, 'cx', maxX);
    this.handle.setAttributeNS(null, 'cy', maxY);
    this.circle.setAttribute('r', distance);
    this.line.setAttribute('x2', maxX);
    this.line.setAttribute('y2', maxY);

    // Dispatch custom Event
    const event = new CustomEvent('update', {
      detail: distance
    });
    this.dispatchEvent(event);
  }
  docMouseUp() {
    // Cleanup
    document.removeEventListener('mousemove', this.docMouseMove);
    document.removeEventListener('mouseup', this.docMouseUp);
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new SVGPreview('svg', 'path');
  });
} else {
  new SVGPreview('svg', 'path');
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLXJvdW5kLWNvcm5lcnMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU2MsU0FBU0EsQ0FBQ0MsR0FBRyxFQUFFO0VBQ3RCLE1BQU1DLFdBQVcsR0FBRywrQkFBK0I7RUFDbkQsTUFBTUMsVUFBVSxHQUFHLGlCQUFpQjtFQUVwQyxPQUFPLENBQUMsR0FBR0YsR0FBRyxDQUFDRyxRQUFRLENBQUNGLFdBQVcsQ0FBQyxDQUFDLENBQ2xDRyxHQUFHLENBQUNDLEtBQUssSUFBSTtJQUNaLE9BQU87TUFBRUMsTUFBTSxFQUFFRCxLQUFLLENBQUMsQ0FBQyxDQUFDO01BQUVFLEtBQUssRUFBRUYsS0FBSyxDQUFDRTtJQUFNLENBQUM7RUFDakQsQ0FBQyxDQUFDLENBQ0RDLFdBQVcsQ0FBQyxDQUFDQyxHQUFHLEVBQUVDLEdBQUcsS0FBSztJQUN6QixNQUFNQyxLQUFLLEdBQUdYLEdBQUcsQ0FBQ1ksU0FBUyxDQUN6QkYsR0FBRyxDQUFDSCxLQUFLLEVBQ1RFLEdBQUcsQ0FBQ0ksTUFBTSxHQUFHSixHQUFHLENBQUNBLEdBQUcsQ0FBQ0ksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDTixLQUFLLEdBQUdQLEdBQUcsQ0FBQ2EsTUFDL0MsQ0FBQztJQUNELE9BQU9KLEdBQUcsQ0FBQ0ssTUFBTSxDQUFDLENBQ2hCO01BQ0VSLE1BQU0sRUFBRUksR0FBRyxDQUFDSixNQUFNO01BQ2xCQyxLQUFLLEVBQUVHLEdBQUcsQ0FBQ0gsS0FBSztNQUNoQkksS0FBSyxFQUFFQSxLQUFLLENBQUNFLE1BQU0sR0FBRyxDQUFDLEdBQUdGLEtBQUssQ0FBQ0ksTUFBTSxDQUFDLENBQUMsRUFBRUosS0FBSyxDQUFDRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUdGO0lBQ2hFLENBQUMsQ0FDRixDQUFDO0VBQ0osQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUNMSyxPQUFPLENBQUMsQ0FBQyxDQUNUQyxPQUFPLENBQUNDLEdBQUcsSUFBSTtJQUNkLE1BQU1DLE1BQU0sR0FBR0QsR0FBRyxDQUFDUCxLQUFLLENBQUNOLEtBQUssQ0FBQ0gsVUFBVSxDQUFDO0lBQzFDLE1BQU1rQixJQUFJLEdBQUdELE1BQU0sR0FBR0EsTUFBTSxDQUFDZixHQUFHLENBQUNpQixVQUFVLENBQUMsR0FBRyxFQUFFO0lBQ2pELE9BQU94QixzREFBVyxDQUFDcUIsR0FBRyxDQUFDWixNQUFNLEVBQUVjLElBQUksQ0FBQztFQUN0QyxDQUFDLENBQUMsQ0FDRGhCLEdBQUcsQ0FBQ04sd0RBQWlCLENBQUM7QUFDM0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVN3QixhQUFhQSxDQUFDQyxJQUFJLEVBQUVDLENBQUMsRUFBRUMsS0FBSyxFQUFFO0VBQ3JDLElBQUlDLFFBQVEsR0FBRyxFQUFFO0VBQ2pCLElBQUlDLE9BQU8sR0FBRyxFQUFFO0VBRWhCLElBQUlGLEtBQUssRUFBRTtJQUNURixJQUFJLENBQUNLLE9BQU8sQ0FBQ0MsRUFBRSxJQUFJdEMsc0RBQVcsQ0FBQ3NDLEVBQUUsRUFBRUosS0FBSyxDQUFDLENBQUM7SUFDMUM7RUFDRjtFQUVBRjtFQUNFO0VBQUEsQ0FDQ0ssT0FBTyxDQUFDRSxDQUFDLElBQUk7SUFDWixJQUFJQSxDQUFDLENBQUN4QixNQUFNLEtBQUssR0FBRyxFQUFFO01BQ3BCb0IsUUFBUSxDQUFDSyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25CO0lBQ0FMLFFBQVEsQ0FBQ0EsUUFBUSxDQUFDYixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUNrQixJQUFJLENBQUNELENBQUMsQ0FBQztFQUN2QyxDQUFDLENBQUM7RUFFSkosUUFBUSxDQUFDRSxPQUFPLENBQUNJLFdBQVcsSUFBSTtJQUM5QkE7SUFDRTtJQUFBLENBQ0M1QixHQUFHLENBQUNmLHFEQUFjLENBQUM7SUFFdEJLLGdFQUFxQixDQUFDc0MsV0FBVyxFQUFFQSxXQUFXLENBQUNuQixNQUFNLEdBQUcsQ0FBQyxDQUFDOztJQUUxRDtJQUNBLE1BQU1vQixVQUFVLEdBQUdELFdBQVcsQ0FBQ0EsV0FBVyxDQUFDbkIsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDUCxNQUFNLElBQUksR0FBRztJQUNwRTBCLFdBQVcsQ0FDUkUsTUFBTSxDQUFDTCxFQUFFLElBQUksQ0FBQ0EsRUFBRSxDQUFDTSxPQUFPLENBQUMsQ0FDekIvQixHQUFHLENBQUMsQ0FBQ3lCLEVBQUUsRUFBRU8sQ0FBQyxFQUFFQyxHQUFHLEtBQUs7TUFDbkIsTUFBTUMsWUFBWSxHQUFHLENBQUM7TUFDdEIsTUFBTUMsSUFBSSxHQUFHL0MseURBQWMsQ0FBQ3FDLEVBQUUsRUFBRU8sQ0FBQyxFQUFFQyxHQUFHLENBQUM7TUFDdkMsTUFBTUcsSUFBSSxHQUFHL0MscURBQVUsQ0FBQ29DLEVBQUUsRUFBRU8sQ0FBQyxFQUFFQyxHQUFHLENBQUM7TUFDbkMsTUFBTUksUUFBUSxHQUFHeEQsbURBQVEsQ0FBQzRDLEVBQUUsQ0FBQ1YsTUFBTSxFQUFFb0IsSUFBSSxDQUFDcEIsTUFBTSxDQUFDO01BQ2pELE1BQU11QixRQUFRLEdBQUd6RCxtREFBUSxDQUFDNEMsRUFBRSxDQUFDVixNQUFNLEVBQUVxQixJQUFJLENBQUNyQixNQUFNLENBQUM7TUFDakQsTUFBTXdCLEtBQUssR0FBR0QsUUFBUSxHQUFHRCxRQUFRLENBQUMsQ0FBQztNQUNuQyxNQUFNRyxPQUFPLEdBQUdELEtBQUssSUFBSSxHQUFHLEdBQUdFLElBQUksQ0FBQ0MsRUFBRSxDQUFDO01BQ3ZDO01BQ0EsTUFBTUMsUUFBUSxHQUFHekQsdURBQVksQ0FBQ3VDLEVBQUUsRUFBRVUsSUFBSSxFQUFFQyxJQUFJLENBQUM7TUFDN0MsTUFBTVEsU0FBUyxHQUFHSCxJQUFJLENBQUNJLEdBQUcsQ0FBQ3JELDBEQUFlLENBQUMrQyxLQUFLLEdBQUcsQ0FBQyxFQUFFSSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDcEUsTUFBTUcsTUFBTSxHQUFHTCxJQUFJLENBQUNNLEdBQUcsQ0FBQzNCLENBQUMsRUFBRXdCLFNBQVMsQ0FBQztNQUVyQyxNQUFNSSxDQUFDLEdBQUd6RCxvREFBUyxDQUFDZ0QsS0FBSyxFQUFFTyxNQUFNLENBQUM7TUFDbEMsTUFBTUcsTUFBTSxHQUFHRCxDQUFDLENBQUNDLE1BQU07TUFDdkIsTUFBTUMsU0FBUyxHQUFHRixDQUFDLENBQUNFLFNBQVM7TUFFN0IsTUFBTUMsZUFBZSxHQUFHLENBQUNuQixDQUFDLElBQUksQ0FBQyxJQUFJQSxDQUFDLElBQUlDLEdBQUcsQ0FBQ3hCLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQ29CLFVBQVU7TUFDdEUsUUFBUUosRUFBRSxDQUFDdkIsTUFBTTtRQUNmLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDVixLQUFLLEdBQUc7VUFBRTtVQUNSO1VBQ0EsTUFBTWtELFNBQVMsR0FBRyxDQUNoQjNCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDc0MsQ0FBQyxHQUFHdkUsNERBQWlCLENBQUN1RCxRQUFRLEVBQUVZLE1BQU0sQ0FBQyxFQUNqRHhCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDdUMsQ0FBQyxHQUFHdkUsNERBQWlCLENBQUNzRCxRQUFRLEVBQUVZLE1BQU0sQ0FBQyxDQUNsRDs7VUFFRDtVQUNBLE1BQU1NLFNBQVMsR0FBRyxDQUNoQjlCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDc0MsQ0FBQyxHQUFHdkUsNERBQWlCLENBQUN3RCxRQUFRLEVBQUVXLE1BQU0sQ0FBQyxFQUNqRHhCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDdUMsQ0FBQyxHQUFHdkUsNERBQWlCLENBQUN1RCxRQUFRLEVBQUVXLE1BQU0sQ0FBQyxDQUNsRDs7VUFFRDtVQUNBLElBQUksQ0FBQ0UsZUFBZSxFQUFFO1lBQ3BCNUIsT0FBTyxDQUFDSSxJQUFJLENBQUM7Y0FDWHpCLE1BQU0sRUFBRXVCLEVBQUUsQ0FBQ3ZCLE1BQU07Y0FDakJhLE1BQU0sRUFBRTtnQkFDTnNDLENBQUMsRUFBRXBDLFVBQVUsQ0FBQ21DLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0Q0YsQ0FBQyxFQUFFckMsVUFBVSxDQUFDbUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxPQUFPLENBQUMsQ0FBQyxDQUFDO2NBQ3ZDO1lBQ0YsQ0FBQyxDQUFDO1VBQ0osQ0FBQyxNQUFNO1lBQ0xqQyxPQUFPLENBQUNJLElBQUksQ0FBQztjQUNYekIsTUFBTSxFQUFFdUIsRUFBRSxDQUFDdkIsTUFBTTtjQUNqQmEsTUFBTSxFQUFFVSxFQUFFLENBQUNWO1lBQ2IsQ0FBQyxDQUFDO1VBQ0o7VUFFQSxJQUNFLENBQUNvQyxlQUFlLEtBQ2ZmLElBQUksQ0FBQ2xDLE1BQU0sS0FBSyxHQUFHLElBQUlrQyxJQUFJLENBQUNsQyxNQUFNLEtBQUssR0FBRyxDQUFDLEVBQzVDO1lBQ0FxQixPQUFPLENBQUNJLElBQUksQ0FBQztjQUNYekIsTUFBTSxFQUFFLEdBQUc7Y0FDWDRDLE1BQU0sRUFBRUEsTUFBTTtjQUNkL0IsTUFBTSxFQUFFO2dCQUNOMEMsT0FBTyxFQUFFWCxNQUFNO2dCQUNmWSxPQUFPLEVBQUVaLE1BQU07Z0JBQ2ZhLFFBQVEsRUFBRW5CLE9BQU87Z0JBQ2pCb0IsUUFBUSxFQUFFMUIsWUFBWTtnQkFDdEIyQixLQUFLLEVBQUVYLFNBQVM7Z0JBQ2hCRyxDQUFDLEVBQUVwQyxVQUFVLENBQUNzQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdENGLENBQUMsRUFBRXJDLFVBQVUsQ0FBQ3NDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLENBQUMsQ0FBQztjQUN2QztZQUNGLENBQUMsQ0FBQztVQUNKO1VBQ0E7UUFDRjtRQUNBO1FBQ0EsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNWLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDVixLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNWLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDVixLQUFLLEdBQUc7VUFBRTtVQUNSakMsT0FBTyxDQUFDSSxJQUFJLENBQUM7WUFBRXpCLE1BQU0sRUFBRXVCLEVBQUUsQ0FBQ3ZCLE1BQU07WUFBRWEsTUFBTSxFQUFFVSxFQUFFLENBQUNWO1VBQU8sQ0FBQyxDQUFDO1VBQ3REO01BQ0o7SUFDRixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRixPQUFPO0lBQ0wrQyxJQUFJLEVBQUU5RSw0REFBaUIsQ0FBQ3VDLE9BQU8sQ0FBQztJQUNoQ3dDLFFBQVEsRUFBRXhDO0VBQ1osQ0FBQztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTeUMsWUFBWUEsQ0FBQ3BFLEdBQUcsRUFBRXdCLENBQUMsRUFBRUMsS0FBSyxFQUFFO0VBQ25DLE9BQU9ILGFBQWEsQ0FBQyxDQUFDLEdBQUd2QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxDQUFDLEVBQUV3QixDQUFDLEVBQUVDLEtBQUssQ0FBQztBQUNyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTbEMsV0FBV0EsQ0FBQ3NDLEVBQUUsRUFBRUosS0FBSyxFQUFFO0VBQ3JDNEMsTUFBTSxDQUFDQyxJQUFJLENBQUN6QyxFQUFFLENBQUNWLE1BQU0sQ0FBQyxDQUFDUyxPQUFPLENBQzVCMkMsR0FBRyxJQUNBMUMsRUFBRSxDQUFDVixNQUFNLENBQUNvRCxHQUFHLENBQUMsR0FDYjFDLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDb0QsR0FBRyxDQUFDLElBQUlsRCxVQUFVLENBQUNRLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDb0QsR0FBRyxDQUFDLENBQUNYLE9BQU8sQ0FBQ25DLEtBQUssQ0FBQyxDQUNoRSxDQUFDO0VBRUQsT0FBT0ksRUFBRTtBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU3JDLGNBQWNBLENBQUNzQyxDQUFDLEVBQUVNLENBQUMsRUFBRW9DLENBQUMsRUFBRTtFQUN0QyxNQUFNQyxPQUFPLEdBQUdyQyxDQUFDLEdBQUcsQ0FBQztFQUNyQixNQUFNc0MsUUFBUSxHQUFHRixDQUFDLENBQUNHLEdBQUcsQ0FBQ0YsT0FBTyxFQUFFRCxDQUFDLENBQUMzRCxNQUFNLENBQUMsQ0FBQztFQUUxQyxJQUFJNkQsUUFBUSxDQUFDcEUsTUFBTSxLQUFLLEdBQUcsRUFBRTtJQUMzQixPQUFPb0UsUUFBUTtFQUNqQixDQUFDLE1BQU07SUFDTCxPQUFPbEYsY0FBYyxDQUFDc0MsQ0FBQyxFQUFFMkMsT0FBTyxFQUFFRCxDQUFDLENBQUM7RUFDdEM7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVMvRSxVQUFVQSxDQUFDcUMsQ0FBQyxFQUFFTSxDQUFDLEVBQUVvQyxDQUFDLEVBQUU7RUFDbEMsTUFBTUMsT0FBTyxHQUFHckMsQ0FBQyxHQUFHLENBQUM7RUFDckIsTUFBTUksSUFBSSxHQUFHZ0MsQ0FBQyxDQUFDRyxHQUFHLENBQUNGLE9BQU8sRUFBRUQsQ0FBQyxDQUFDM0QsTUFBTSxDQUFDLENBQUM7RUFFdEMsSUFBSTJCLElBQUksQ0FBQ2xDLE1BQU0sS0FBSyxHQUFHLEVBQUU7SUFDdkIsT0FBT2IsVUFBVSxDQUFDcUMsQ0FBQyxFQUFFMkMsT0FBTyxFQUFFRCxDQUFDLENBQUM7RUFDbEMsQ0FBQyxNQUFNO0lBQ0wsT0FBT2hDLElBQUk7RUFDYjtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBUzFDLGlCQUFpQkEsQ0FBQytCLEVBQUUsRUFBRXRCLEtBQUssRUFBRThCLEdBQUcsRUFBRTtFQUNoRDtFQUNBLElBQUlFLElBQUksR0FBR0YsR0FBRyxDQUFDOUIsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJO0lBQUVZLE1BQU0sRUFBRTtNQUFFc0MsQ0FBQyxFQUFFLENBQUM7TUFBRUMsQ0FBQyxFQUFFO0lBQUU7RUFBRSxDQUFDOztFQUV2RDtFQUNBLElBQUk3QixFQUFFLENBQUN2QixNQUFNLEtBQUt1QixFQUFFLENBQUN2QixNQUFNLENBQUNzRSxXQUFXLENBQUMsQ0FBQyxFQUFFO0lBQ3pDO0lBQ0EvQyxFQUFFLENBQUN2QixNQUFNLEdBQUd1QixFQUFFLENBQUN2QixNQUFNLENBQUN1RSxXQUFXLENBQUMsQ0FBQztJQUNuQyxRQUFRaEQsRUFBRSxDQUFDdkIsTUFBTTtNQUNmLEtBQUssR0FBRztRQUFFO1FBQ1J1QixFQUFFLENBQUNWLE1BQU0sQ0FBQ3NDLENBQUMsSUFBSWxCLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3NDLENBQUM7UUFDNUI1QixFQUFFLENBQUNWLE1BQU0sQ0FBQ3VDLENBQUMsSUFBSW5CLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3VDLENBQUM7UUFDNUI7TUFDRixLQUFLLEdBQUcsQ0FBQyxDQUFDO01BQ1YsS0FBSyxHQUFHO1FBQ043QixFQUFFLENBQUNWLE1BQU0sQ0FBQ3NDLENBQUMsSUFBSWxCLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3NDLENBQUM7UUFDNUI1QixFQUFFLENBQUNWLE1BQU0sQ0FBQ3VDLENBQUMsSUFBSW5CLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3VDLENBQUM7UUFDNUI7TUFDRixLQUFLLEdBQUc7UUFBRTtRQUNSN0IsRUFBRSxDQUFDdkIsTUFBTSxHQUFHLEdBQUc7UUFDZnVCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDc0MsQ0FBQyxJQUFJbEIsSUFBSSxDQUFDcEIsTUFBTSxDQUFDc0MsQ0FBQztRQUM1QjVCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDdUMsQ0FBQyxHQUFHbkIsSUFBSSxDQUFDcEIsTUFBTSxDQUFDdUMsQ0FBQztRQUMzQjtNQUNGLEtBQUssR0FBRztRQUFFO1FBQ1I3QixFQUFFLENBQUN2QixNQUFNLEdBQUcsR0FBRztRQUNmdUIsRUFBRSxDQUFDVixNQUFNLENBQUNzQyxDQUFDLEdBQUdsQixJQUFJLENBQUNwQixNQUFNLENBQUNzQyxDQUFDO1FBQzNCNUIsRUFBRSxDQUFDVixNQUFNLENBQUN1QyxDQUFDLElBQUluQixJQUFJLENBQUNwQixNQUFNLENBQUN1QyxDQUFDO1FBQzVCO01BQ0YsS0FBSyxHQUFHO1FBQUU7UUFDUjdCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDc0MsQ0FBQyxJQUFJbEIsSUFBSSxDQUFDcEIsTUFBTSxDQUFDc0MsQ0FBQztRQUM1QjVCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDdUMsQ0FBQyxJQUFJbkIsSUFBSSxDQUFDcEIsTUFBTSxDQUFDdUMsQ0FBQztRQUM1QjdCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDMkQsRUFBRSxJQUFJdkMsSUFBSSxDQUFDcEIsTUFBTSxDQUFDc0MsQ0FBQztRQUM3QjVCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDNEQsRUFBRSxJQUFJeEMsSUFBSSxDQUFDcEIsTUFBTSxDQUFDdUMsQ0FBQztRQUM3QjdCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDNkQsRUFBRSxJQUFJekMsSUFBSSxDQUFDcEIsTUFBTSxDQUFDc0MsQ0FBQztRQUM3QjVCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDOEQsRUFBRSxJQUFJMUMsSUFBSSxDQUFDcEIsTUFBTSxDQUFDdUMsQ0FBQztRQUM3QjtNQUNGLEtBQUssR0FBRztRQUNON0IsRUFBRSxDQUFDVixNQUFNLENBQUNzQyxDQUFDLElBQUlsQixJQUFJLENBQUNwQixNQUFNLENBQUNzQyxDQUFDO1FBQzVCNUIsRUFBRSxDQUFDVixNQUFNLENBQUN1QyxDQUFDLElBQUluQixJQUFJLENBQUNwQixNQUFNLENBQUN1QyxDQUFDO1FBQzVCN0IsRUFBRSxDQUFDVixNQUFNLENBQUM2RCxFQUFFLElBQUl6QyxJQUFJLENBQUNwQixNQUFNLENBQUNzQyxDQUFDO1FBQzdCNUIsRUFBRSxDQUFDVixNQUFNLENBQUM4RCxFQUFFLElBQUkxQyxJQUFJLENBQUNwQixNQUFNLENBQUN1QyxDQUFDO1FBQzdCO01BQ0YsS0FBSyxHQUFHO1FBQ043QixFQUFFLENBQUNWLE1BQU0sQ0FBQ3NDLENBQUMsSUFBSWxCLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3NDLENBQUM7UUFDNUI1QixFQUFFLENBQUNWLE1BQU0sQ0FBQ3VDLENBQUMsSUFBSW5CLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3VDLENBQUM7UUFDNUI3QixFQUFFLENBQUNWLE1BQU0sQ0FBQzJELEVBQUUsSUFBSXZDLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3NDLENBQUM7UUFDN0I1QixFQUFFLENBQUNWLE1BQU0sQ0FBQzRELEVBQUUsSUFBSXhDLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3VDLENBQUM7UUFDN0I7TUFDRixLQUFLLEdBQUc7UUFDTjdCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDc0MsQ0FBQyxJQUFJbEIsSUFBSSxDQUFDcEIsTUFBTSxDQUFDc0MsQ0FBQztRQUM1QjVCLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDdUMsQ0FBQyxJQUFJbkIsSUFBSSxDQUFDcEIsTUFBTSxDQUFDdUMsQ0FBQztRQUM1QjtNQUNGLEtBQUssR0FBRztRQUNOO0lBQ0o7SUFDQTtFQUNGLENBQUMsTUFBTSxJQUFJN0IsRUFBRSxDQUFDdkIsTUFBTSxLQUFLdUIsRUFBRSxDQUFDdkIsTUFBTSxDQUFDdUUsV0FBVyxDQUFDLENBQUMsRUFBRTtJQUNoRCxRQUFRaEQsRUFBRSxDQUFDdkIsTUFBTTtNQUNmLEtBQUssR0FBRztRQUFFO1FBQ1J1QixFQUFFLENBQUN2QixNQUFNLEdBQUcsR0FBRztRQUNmdUIsRUFBRSxDQUFDVixNQUFNLENBQUN1QyxDQUFDLEdBQUduQixJQUFJLENBQUNwQixNQUFNLENBQUN1QyxDQUFDO1FBQzNCO01BQ0YsS0FBSyxHQUFHO1FBQUU7UUFDUjdCLEVBQUUsQ0FBQ3ZCLE1BQU0sR0FBRyxHQUFHO1FBQ2Z1QixFQUFFLENBQUNWLE1BQU0sQ0FBQ3NDLENBQUMsR0FBR2xCLElBQUksQ0FBQ3BCLE1BQU0sQ0FBQ3NDLENBQUM7UUFDM0I7SUFDSjtFQUNGOztFQUVBO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7RUFDRSxJQUFJNUIsRUFBRSxDQUFDdkIsTUFBTSxLQUFLLEdBQUcsRUFBRTtJQUNyQjtJQUNBLFNBQVM0RSxHQUFHQSxDQUFDN0MsR0FBRyxFQUFFRCxDQUFDLEVBQUU7TUFDbkIsSUFBSUMsR0FBRyxDQUFDRCxDQUFDLENBQUMsQ0FBQzlCLE1BQU0sS0FBSyxHQUFHLEVBQUU7UUFDekIsT0FBTytCLEdBQUcsQ0FBQ0QsQ0FBQyxDQUFDO01BQ2YsQ0FBQyxNQUFNO1FBQ0wsT0FBTzhDLEdBQUcsQ0FBQzdDLEdBQUcsRUFBRUQsQ0FBQyxHQUFHLENBQUMsQ0FBQztNQUN4QjtJQUNGO0lBQ0EsSUFBSStDLE9BQU8sR0FBR0QsR0FBRyxDQUFDN0MsR0FBRyxFQUFFOUIsS0FBSyxDQUFDO0lBQzdCc0IsRUFBRSxDQUFDVixNQUFNLENBQUNzQyxDQUFDLEdBQUcwQixPQUFPLENBQUNoRSxNQUFNLENBQUNzQyxDQUFDO0lBQzlCNUIsRUFBRSxDQUFDVixNQUFNLENBQUN1QyxDQUFDLEdBQUd5QixPQUFPLENBQUNoRSxNQUFNLENBQUN1QyxDQUFDO0VBQ2hDO0VBRUEsT0FBTzdCLEVBQUU7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU2hDLFdBQVdBLENBQUNTLE1BQU0sRUFBRWEsTUFBTSxFQUFFO0VBQzFDLE1BQU1JLElBQUksR0FBRyxFQUFFO0VBRWYsUUFBUWpCLE1BQU0sQ0FBQ3VFLFdBQVcsQ0FBQyxDQUFDO0lBQzFCLEtBQUssR0FBRztNQUFFO01BQ1IsS0FBSyxJQUFJekMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHakIsTUFBTSxDQUFDTixNQUFNLEVBQUV1QixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pDLElBQUlnRCxDQUFDO1FBQ0wsSUFBSTlFLE1BQU0sS0FBS0EsTUFBTSxDQUFDdUUsV0FBVyxDQUFDLENBQUMsRUFBRTtVQUNuQ08sQ0FBQyxHQUFHaEQsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRztRQUN6QixDQUFDLE1BQU07VUFDTGdELENBQUMsR0FBR2hELENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUc7UUFDekI7UUFDQWIsSUFBSSxDQUFDUSxJQUFJLENBQUM7VUFDUnpCLE1BQU0sRUFBRThFLENBQUM7VUFDVGpFLE1BQU0sRUFBRTtZQUNOc0MsQ0FBQyxFQUFFdEMsTUFBTSxDQUFDaUIsQ0FBQyxDQUFDO1lBQ1pzQixDQUFDLEVBQUV2QyxNQUFNLENBQUNpQixDQUFDLEdBQUcsQ0FBQztVQUNqQjtRQUNGLENBQUMsQ0FBQztNQUNKO01BQ0E7SUFDRixLQUFLLEdBQUc7TUFBRTtNQUNSLEtBQUssSUFBSUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHakIsTUFBTSxDQUFDTixNQUFNLEVBQUV1QixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pDYixJQUFJLENBQUNRLElBQUksQ0FBQztVQUNSekIsTUFBTTtVQUNOYSxNQUFNLEVBQUU7WUFDTnNDLENBQUMsRUFBRXRDLE1BQU0sQ0FBQ2lCLENBQUMsQ0FBQztZQUNac0IsQ0FBQyxFQUFFdkMsTUFBTSxDQUFDaUIsQ0FBQyxHQUFHLENBQUM7VUFDakI7UUFDRixDQUFDLENBQUM7TUFDSjtNQUNBO0lBQ0YsS0FBSyxHQUFHO01BQUU7TUFDUixLQUFLLElBQUlBLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2pCLE1BQU0sQ0FBQ04sTUFBTSxFQUFFdUIsQ0FBQyxFQUFFLEVBQUU7UUFDdENiLElBQUksQ0FBQ1EsSUFBSSxDQUFDO1VBQ1J6QixNQUFNO1VBQ05hLE1BQU0sRUFBRTtZQUNOc0MsQ0FBQyxFQUFFdEMsTUFBTSxDQUFDaUIsQ0FBQyxDQUFDO1lBQ1pzQixDQUFDLEVBQUU7VUFDTDtRQUNGLENBQUMsQ0FBQztNQUNKO01BQ0E7SUFDRixLQUFLLEdBQUc7TUFBRTtNQUNSLEtBQUssSUFBSXRCLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2pCLE1BQU0sQ0FBQ04sTUFBTSxFQUFFdUIsQ0FBQyxFQUFFLEVBQUU7UUFDdENiLElBQUksQ0FBQ1EsSUFBSSxDQUFDO1VBQ1J6QixNQUFNO1VBQ05hLE1BQU0sRUFBRTtZQUNOc0MsQ0FBQyxFQUFFLENBQUM7WUFDSkMsQ0FBQyxFQUFFdkMsTUFBTSxDQUFDaUIsQ0FBQztVQUNiO1FBQ0YsQ0FBQyxDQUFDO01BQ0o7TUFDQTtJQUNGLEtBQUssR0FBRztNQUFFO01BQ1IsS0FBSyxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdqQixNQUFNLENBQUNOLE1BQU0sRUFBRXVCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekNiLElBQUksQ0FBQ1EsSUFBSSxDQUFDO1VBQ1J6QixNQUFNO1VBQ05hLE1BQU0sRUFBRTtZQUNOMkQsRUFBRSxFQUFFM0QsTUFBTSxDQUFDaUIsQ0FBQyxDQUFDO1lBQ2IyQyxFQUFFLEVBQUU1RCxNQUFNLENBQUNpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCNEMsRUFBRSxFQUFFN0QsTUFBTSxDQUFDaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQjZDLEVBQUUsRUFBRTlELE1BQU0sQ0FBQ2lCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakJxQixDQUFDLEVBQUV0QyxNQUFNLENBQUNpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCc0IsQ0FBQyxFQUFFdkMsTUFBTSxDQUFDaUIsQ0FBQyxHQUFHLENBQUM7VUFDakI7UUFDRixDQUFDLENBQUM7TUFDSjtNQUNBO0lBQ0YsS0FBSyxHQUFHO01BQ04sS0FBSyxJQUFJQSxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdqQixNQUFNLENBQUNOLE1BQU0sRUFBRXVCLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDekNiLElBQUksQ0FBQ1EsSUFBSSxDQUFDO1VBQ1J6QixNQUFNO1VBQ05hLE1BQU0sRUFBRTtZQUNONkQsRUFBRSxFQUFFN0QsTUFBTSxDQUFDaUIsQ0FBQyxDQUFDO1lBQ2I2QyxFQUFFLEVBQUU5RCxNQUFNLENBQUNpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCcUIsQ0FBQyxFQUFFdEMsTUFBTSxDQUFDaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNoQnNCLENBQUMsRUFBRXZDLE1BQU0sQ0FBQ2lCLENBQUMsR0FBRyxDQUFDO1VBQ2pCO1FBQ0YsQ0FBQyxDQUFDO01BQ0o7TUFDQTtJQUNGLEtBQUssR0FBRztNQUNOLEtBQUssSUFBSUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHakIsTUFBTSxDQUFDTixNQUFNLEVBQUV1QixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pDYixJQUFJLENBQUNRLElBQUksQ0FBQztVQUNSekIsTUFBTTtVQUNOYSxNQUFNLEVBQUU7WUFDTjJELEVBQUUsRUFBRTNELE1BQU0sQ0FBQ2lCLENBQUMsQ0FBQztZQUNiMkMsRUFBRSxFQUFFNUQsTUFBTSxDQUFDaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQnFCLENBQUMsRUFBRXRDLE1BQU0sQ0FBQ2lCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEJzQixDQUFDLEVBQUV2QyxNQUFNLENBQUNpQixDQUFDLEdBQUcsQ0FBQztVQUNqQjtRQUNGLENBQUMsQ0FBQztNQUNKO01BQ0E7SUFDRixLQUFLLEdBQUc7TUFDTixLQUFLLElBQUlBLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR2pCLE1BQU0sQ0FBQ04sTUFBTSxFQUFFdUIsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN6Q2IsSUFBSSxDQUFDUSxJQUFJLENBQUM7VUFDUnpCLE1BQU07VUFDTmEsTUFBTSxFQUFFO1lBQ05zQyxDQUFDLEVBQUV0QyxNQUFNLENBQUNpQixDQUFDLENBQUM7WUFDWnNCLENBQUMsRUFBRXZDLE1BQU0sQ0FBQ2lCLENBQUMsR0FBRyxDQUFDO1VBQ2pCO1FBQ0YsQ0FBQyxDQUFDO01BQ0o7TUFDQTtJQUNGLEtBQUssR0FBRztNQUNOLEtBQUssSUFBSUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHakIsTUFBTSxDQUFDTixNQUFNLEVBQUV1QixDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3pDYixJQUFJLENBQUNRLElBQUksQ0FBQztVQUNSekIsTUFBTTtVQUNOYSxNQUFNLEVBQUU7WUFDTjBDLE9BQU8sRUFBRTFDLE1BQU0sQ0FBQ2lCLENBQUMsQ0FBQztZQUNsQjBCLE9BQU8sRUFBRTNDLE1BQU0sQ0FBQ2lCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIyQixRQUFRLEVBQUU1QyxNQUFNLENBQUNpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCNEIsUUFBUSxFQUFFN0MsTUFBTSxDQUFDaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QjZCLEtBQUssRUFBRTlDLE1BQU0sQ0FBQ2lCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEJxQixDQUFDLEVBQUV0QyxNQUFNLENBQUNpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCc0IsQ0FBQyxFQUFFdkMsTUFBTSxDQUFDaUIsQ0FBQyxHQUFHLENBQUM7VUFDakI7UUFDRixDQUFDLENBQUM7TUFDSjtNQUNBO0lBQ0YsS0FBSyxHQUFHO01BQ05iLElBQUksQ0FBQ1EsSUFBSSxDQUFDO1FBQ1J6QixNQUFNO1FBQ05hLE1BQU0sRUFBRTtVQUNOO1VBQ0FzQyxDQUFDLEVBQUUsQ0FBQztVQUNKQyxDQUFDLEVBQUU7UUFDTDtNQUNGLENBQUMsQ0FBQztNQUNGO0VBQ0o7RUFDQSxPQUFPbkMsSUFBSTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNvRCxHQUFHQSxDQUFDbEIsQ0FBQyxFQUFFMkIsQ0FBQyxFQUFFO0VBQ3hCLE9BQU8sQ0FBRTNCLENBQUMsR0FBRzJCLENBQUMsR0FBSUEsQ0FBQyxJQUFJQSxDQUFDO0FBQzFCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTL0YsY0FBY0EsQ0FBQ3dDLEVBQUUsRUFBRXRCLEtBQUssRUFBRThFLEtBQUssRUFBRTtFQUMvQztFQUNBLElBQUk5RSxLQUFLLEtBQUssQ0FBQyxJQUFJc0IsRUFBRSxDQUFDdkIsTUFBTSxLQUFLLEdBQUcsRUFBRTtJQUNwQztJQUNBLElBQUlvRSxRQUFRLEdBQUdXLEtBQUssQ0FBQzlFLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDL0I7SUFDQSxNQUFNNEIsT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDbUQsS0FBSyxDQUFDZixHQUFHLElBQUk7TUFDdEM7TUFDQSxPQUFPMUIsSUFBSSxDQUFDcEIsS0FBSyxDQUFDb0IsSUFBSSxDQUFDSSxHQUFHLENBQUN5QixRQUFRLENBQUN2RCxNQUFNLENBQUNvRCxHQUFHLENBQUMsR0FBRzFDLEVBQUUsQ0FBQ1YsTUFBTSxDQUFDb0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDMUUsQ0FBQyxDQUFDO0lBRUYsSUFBSXBDLE9BQU8sRUFBRTtNQUNYTixFQUFFLENBQUNNLE9BQU8sR0FBRyxJQUFJO0lBQ25CO0VBQ0Y7RUFFQSxPQUFPTixFQUFFO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU25DLHFCQUFxQkEsQ0FBQzZCLElBQUksRUFBRWtELE9BQU8sRUFBRTtFQUNuRCxNQUFNdEMsT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDbUQsS0FBSyxDQUFDZixHQUFHLElBQUk7SUFDdEM7SUFDQSxPQUNFMUIsSUFBSSxDQUFDcEIsS0FBSyxDQUFDb0IsSUFBSSxDQUFDSSxHQUFHLENBQUMxQixJQUFJLENBQUNrRCxPQUFPLENBQUMsQ0FBQ3RELE1BQU0sQ0FBQ29ELEdBQUcsQ0FBQyxHQUFHaEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDSixNQUFNLENBQUNvRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQ3JFLENBQUM7RUFFTCxDQUFDLENBQUM7RUFFRixJQUFJaEQsSUFBSSxDQUFDa0QsT0FBTyxDQUFDLENBQUNuRSxNQUFNLEtBQUssR0FBRyxJQUFJNkIsT0FBTyxFQUFFO0lBQzNDWixJQUFJLENBQUNrRCxPQUFPLENBQUMsQ0FBQ3RDLE9BQU8sR0FBRyxJQUFJO0lBQzVCekMscUJBQXFCLENBQUM2QixJQUFJLEVBQUVrRCxPQUFPLEdBQUcsQ0FBQyxDQUFDO0VBQzFDO0VBRUEsSUFBSWxELElBQUksQ0FBQ2tELE9BQU8sQ0FBQyxDQUFDbkUsTUFBTSxLQUFLLEdBQUcsRUFBRTtJQUNoQ1oscUJBQXFCLENBQUM2QixJQUFJLEVBQUVrRCxPQUFPLEdBQUcsQ0FBQyxDQUFDO0VBQzFDO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNuRixZQUFZQSxDQUFDdUMsRUFBRSxFQUFFNkMsUUFBUSxFQUFFbEMsSUFBSSxFQUFFO0VBQy9DLE1BQU0rQyxPQUFPLEdBQUdDLFdBQVcsQ0FBQzNELEVBQUUsQ0FBQ1YsTUFBTSxFQUFFcUIsSUFBSSxDQUFDckIsTUFBTSxDQUFDO0VBQ25ELE1BQU1zRSxPQUFPLEdBQUdELFdBQVcsQ0FBQ2QsUUFBUSxDQUFDdkQsTUFBTSxFQUFFVSxFQUFFLENBQUNWLE1BQU0sQ0FBQztFQUN2RCxPQUFPMEIsSUFBSSxDQUFDTSxHQUFHLENBQUNzQyxPQUFPLEVBQUVGLE9BQU8sQ0FBQztBQUNuQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTdEcsUUFBUUEsQ0FBQ3lHLEVBQUUsRUFBRUMsRUFBRSxFQUFFO0VBQy9CLE9BQU85QyxJQUFJLENBQUMrQyxLQUFLLENBQUNELEVBQUUsQ0FBQ2xDLENBQUMsR0FBR2lDLEVBQUUsQ0FBQ2pDLENBQUMsRUFBRWtDLEVBQUUsQ0FBQ2pDLENBQUMsR0FBR2dDLEVBQUUsQ0FBQ2hDLENBQUMsQ0FBQztBQUM3Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTOEIsV0FBV0EsQ0FBQ0UsRUFBRSxFQUFFQyxFQUFFLEVBQUU7RUFDbEMsTUFBTUUsS0FBSyxHQUFHSCxFQUFFLENBQUNqQyxDQUFDLEdBQUdrQyxFQUFFLENBQUNsQyxDQUFDO0VBQ3pCLE1BQU1xQyxLQUFLLEdBQUdKLEVBQUUsQ0FBQ2hDLENBQUMsR0FBR2lDLEVBQUUsQ0FBQ2pDLENBQUM7RUFFekIsT0FBT2IsSUFBSSxDQUFDa0QsSUFBSSxDQUFDbEQsSUFBSSxDQUFDbUQsR0FBRyxDQUFDSCxLQUFLLEVBQUUsQ0FBQyxDQUFDLEdBQUdoRCxJQUFJLENBQUNtRCxHQUFHLENBQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVM1RyxpQkFBaUJBLENBQUN5RCxLQUFLLEVBQUVzRCxHQUFHLEVBQUU7RUFDNUMsT0FBT3BELElBQUksQ0FBQ3FELEdBQUcsQ0FBQ3ZELEtBQUssQ0FBQyxHQUFHc0QsR0FBRztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVM5RyxpQkFBaUJBLENBQUN3RCxLQUFLLEVBQUVzRCxHQUFHLEVBQUU7RUFDNUMsT0FBT3BELElBQUksQ0FBQ3NELEdBQUcsQ0FBQ3hELEtBQUssQ0FBQyxHQUFHc0QsR0FBRztBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVNHLGdCQUFnQkEsQ0FBQ3pELEtBQUssRUFBRTBELFFBQVEsRUFBRTtFQUNoRCxNQUFNN0IsQ0FBQyxHQUFHNkIsUUFBUSxHQUFHeEQsSUFBSSxDQUFDeUQsR0FBRyxDQUFDM0QsS0FBSyxDQUFDO0VBQ3BDLElBQUk2QixDQUFDLEtBQUsrQixRQUFRLElBQUkvQixDQUFDLEtBQUssQ0FBQytCLFFBQVEsSUFBSUMsS0FBSyxDQUFDaEMsQ0FBQyxDQUFDLEVBQUU7SUFDakQsT0FBTzZCLFFBQVE7RUFDakI7RUFFQSxPQUFPN0IsQ0FBQztBQUNWOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBUzVFLGVBQWVBLENBQUMrQyxLQUFLLEVBQUU4RCxRQUFRLEVBQUU7RUFDL0MsT0FBT0EsUUFBUSxHQUFHNUQsSUFBSSxDQUFDeUQsR0FBRyxDQUFDM0QsS0FBSyxDQUFDO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU2hELFNBQVNBLENBQUNnRCxLQUFLLEVBQUVuQixDQUFDLEVBQUU7RUFDbEMsSUFBSTZCLE1BQU07RUFDVixJQUFJQyxTQUFTLEdBQUcsQ0FBQztFQUNqQixJQUFJVixPQUFPLEdBQUdELEtBQUssSUFBSSxHQUFHLEdBQUdFLElBQUksQ0FBQ0MsRUFBRSxDQUFDOztFQUVyQztFQUNBLElBQUtGLE9BQU8sR0FBRyxDQUFDLElBQUlBLE9BQU8sSUFBSSxDQUFDLEdBQUcsSUFBTUEsT0FBTyxHQUFHLEdBQUcsSUFBSUEsT0FBTyxHQUFHLEdBQUksRUFBRTtJQUN4RVMsTUFBTSxHQUFHK0MsZ0JBQWdCLENBQUN6RCxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUNuQixDQUFDLENBQUM7SUFDeEM7RUFDRixDQUFDLE1BQU07SUFDTDZCLE1BQU0sR0FBRytDLGdCQUFnQixDQUFDekQsS0FBSyxHQUFHLENBQUMsRUFBRW5CLENBQUMsQ0FBQztJQUN2QzhCLFNBQVMsR0FBRyxDQUFDO0lBQ2IsSUFBSUQsTUFBTSxLQUFLa0QsUUFBUSxFQUFFO01BQ3ZCbEQsTUFBTSxHQUFHN0IsQ0FBQztJQUNaO0VBQ0Y7RUFFQSxPQUFPO0lBQ0w2QixNQUFNO0lBQ05DO0VBQ0YsQ0FBQztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTb0QsTUFBTUEsQ0FBQ0MsTUFBTSxFQUFFQyxFQUFFLEVBQUU7RUFDakMsTUFBTUMsQ0FBQyxHQUFHRixNQUFNLENBQUM5RixNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFDN0IsTUFBTWlHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztFQUNkLE1BQU1DLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztFQUNqQixNQUFNQyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDakIsTUFBTUMsRUFBRSxHQUFHLENBQUMsR0FBR0wsRUFBRTs7RUFFakI7RUFDQSxNQUFNTSxFQUFFLEdBQUcsU0FBQUEsQ0FBVUMsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7SUFDekIsTUFBTUMsR0FBRyxHQUFHLEVBQUU7SUFDZCxLQUFLLElBQUlqRixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUcrRSxDQUFDLENBQUN0RyxNQUFNLEVBQUV1QixDQUFDLEVBQUUsRUFBRTtNQUNqQ2lGLEdBQUcsQ0FBQ3RGLElBQUksQ0FBQ3FGLENBQUMsR0FBR0QsQ0FBQyxDQUFDL0UsQ0FBQyxDQUFDLENBQUM7SUFDcEI7SUFDQSxPQUFPaUYsR0FBRztFQUNaLENBQUM7RUFDRDtFQUNBLE1BQU1DLEVBQUUsR0FBRyxTQUFBQSxDQUFVNUIsRUFBRSxFQUFFQyxFQUFFLEVBQUU7SUFDM0IsTUFBTTBCLEdBQUcsR0FBRyxFQUFFO0lBQ2QsS0FBSyxJQUFJakYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHUyxJQUFJLENBQUNNLEdBQUcsQ0FBQ3VDLEVBQUUsQ0FBQzdFLE1BQU0sRUFBRThFLEVBQUUsQ0FBQzlFLE1BQU0sQ0FBQyxFQUFFdUIsQ0FBQyxFQUFFLEVBQUU7TUFDdkRpRixHQUFHLENBQUN0RixJQUFJLENBQUMyRCxFQUFFLENBQUN0RCxDQUFDLENBQUMsR0FBR3VELEVBQUUsQ0FBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBQ3pCO0lBQ0EsT0FBT2lGLEdBQUc7RUFDWixDQUFDOztFQUVEO0VBQ0EsS0FBSyxJQUFJakYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxJQUFJeUUsQ0FBQyxFQUFFekUsQ0FBQyxFQUFFLEVBQUU7SUFDM0J1RSxNQUFNLENBQUN2RSxDQUFDLENBQUMsR0FBRyxPQUFPdUUsTUFBTSxDQUFDdkUsQ0FBQyxDQUFDLElBQUksUUFBUSxHQUFHdUUsTUFBTSxDQUFDdkUsQ0FBQyxDQUFDLEdBQUcsQ0FBQ3VFLE1BQU0sQ0FBQ3ZFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFMEUsQ0FBQyxDQUFDL0UsSUFBSSxDQUFDLENBQUM0RSxNQUFNLENBQUN2RSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JCOztFQUVBO0VBQ0EsS0FBSyxJQUFJbUYsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxJQUFJVixDQUFDLEVBQUVVLENBQUMsRUFBRSxFQUFFO0lBQzNCLEtBQUssSUFBSW5GLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSXlFLENBQUMsR0FBR1UsQ0FBQyxFQUFFbkYsQ0FBQyxFQUFFLEVBQUU7TUFDL0IwRSxDQUFDLENBQUMxRSxDQUFDLENBQUMsQ0FBQ0wsSUFBSSxDQUFDdUYsRUFBRSxDQUFDSixFQUFFLENBQUNKLENBQUMsQ0FBQzFFLENBQUMsQ0FBQyxDQUFDbUYsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFTixFQUFFLENBQUMsRUFBRUMsRUFBRSxDQUFDSixDQUFDLENBQUMxRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUNtRixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUVYLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0Q7RUFDRjtFQUNBO0VBQ0EsS0FBSyxJQUFJVyxDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUlWLENBQUMsRUFBRVUsQ0FBQyxFQUFFLEVBQUU7SUFDM0JSLElBQUksQ0FBQ2hGLElBQUksQ0FBQytFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ1MsQ0FBQyxDQUFDLENBQUM7SUFDbEJQLElBQUksQ0FBQ2pGLElBQUksQ0FBQytFLENBQUMsQ0FBQ1MsQ0FBQyxDQUFDLENBQUNWLENBQUMsR0FBR1UsQ0FBQyxDQUFDLENBQUM7RUFDeEI7RUFFQSxPQUFPLENBQUNSLElBQUksRUFBRUMsSUFBSSxDQUFDO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLFNBQVM1SCxpQkFBaUJBLENBQUNtQyxJQUFJLEVBQUU7RUFDdEM7RUFDQSxNQUFNaUcsV0FBVyxHQUFHLENBQ2xCLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixPQUFPLEVBQ1AsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLEdBQUcsRUFDSCxHQUFHLENBQ0o7RUFFRCxPQUFPakcsSUFBSSxDQUNSbkIsR0FBRyxDQUFDYyxHQUFHLElBQUk7SUFDVjtJQUNBLElBQUl1RyxDQUFDLEdBQUcsRUFBRTtJQUNWO0lBQ0EsSUFBSXZHLEdBQUcsQ0FBQ1osTUFBTSxLQUFLLEdBQUcsRUFBRTtNQUN0QjtNQUNBLE1BQU1vSCxPQUFPLEdBQUdyRCxNQUFNLENBQUNDLElBQUksQ0FBQ3BELEdBQUcsQ0FBQ0MsTUFBTSxDQUFDO01BQ3ZDO01BQ0E7TUFDQXNHLENBQUMsR0FBR0QsV0FBVyxDQUNadEYsTUFBTSxDQUFDeUYsQ0FBQyxJQUFJRCxPQUFPLENBQUNFLE9BQU8sQ0FBQ0QsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQ3RDO01BQUEsQ0FDQ3ZILEdBQUcsQ0FBQ21FLEdBQUcsSUFBSXJELEdBQUcsQ0FBQ0MsTUFBTSxDQUFDb0QsR0FBRyxDQUFDO01BQzNCO01BQUEsQ0FDQ3NELElBQUksQ0FBQyxDQUFDO0lBQ1g7SUFDQSxVQUFBL0csTUFBQSxDQUFVSSxHQUFHLENBQUNaLE1BQU0sRUFBQVEsTUFBQSxDQUFHMkcsQ0FBQztFQUMxQixDQUFDLENBQUMsQ0FDREksSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUNSQyxJQUFJLENBQUMsQ0FBQztBQUNYOzs7Ozs7VUN0akJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ2U7QUFFckQsTUFBTUMsS0FBSyxHQUFHLDRCQUE0QjtBQUUxQyxNQUFNQyxVQUFVLENBQUM7RUFDZkMsV0FBV0EsQ0FBQ0MsYUFBYSxFQUFFQyxZQUFZLEVBQUU7SUFDdkMsSUFBSSxDQUFDaEUsUUFBUSxHQUFHLEVBQUU7SUFDbEIsSUFBSSxDQUFDaUUsSUFBSSxHQUFHLEVBQUU7SUFDZCxJQUFJLENBQUNDLFNBQVMsR0FBRyxDQUFDO0lBQ2xCLElBQUksQ0FBQ0MsZUFBZSxHQUFHO01BQUU3RSxDQUFDLEVBQUUsQ0FBQztNQUFFQyxDQUFDLEVBQUU7SUFBRSxDQUFDO0lBQ3JDLElBQUksQ0FBQzZFLGNBQWM7SUFDbkIsSUFBSSxDQUFDckYsTUFBTSxHQUFHLEVBQUU7SUFFaEIsSUFBSSxDQUFDc0YsS0FBSyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQ1IsYUFBYSxDQUFDO0lBQ2xELElBQUksQ0FBQ1MsV0FBVyxHQUFHLElBQUksQ0FBQ0gsS0FBSyxDQUFDSSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3JELElBQUksQ0FBQzFFLElBQUksR0FBR3VFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDUCxZQUFZLENBQUM7SUFDaEQ7O0lBRUE7SUFDQSxJQUFJLENBQUNLLEtBQUssQ0FBQ0ssWUFBWSxDQUFDLE9BQU8sRUFBRUMsTUFBTSxDQUFDQyxVQUFVLENBQUM7SUFDbkQsSUFBSSxDQUFDUCxLQUFLLENBQUNLLFlBQVksQ0FBQyxRQUFRLEVBQUVDLE1BQU0sQ0FBQ0UsV0FBVyxDQUFDOztJQUVyRDtJQUNBO0lBQ0EsSUFBSSxDQUFDQyxLQUFLLEdBQUcsSUFBSSxDQUFDL0UsSUFBSSxDQUFDZ0YsU0FBUyxDQUFDLENBQUM7SUFDbEMsSUFBSSxDQUFDRCxLQUFLLENBQUNFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUNwQyxJQUFJLENBQUNsRixJQUFJLENBQUNtRixxQkFBcUIsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDSixLQUFLLENBQUM7SUFFMUQsSUFBSSxDQUFDSyxXQUFXLEdBQUcsSUFBSUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxJQUFJLENBQUNELFdBQVcsQ0FBQ0UsZ0JBQWdCLENBQUMsUUFBUSxFQUFFQyxHQUFHLElBQUk7TUFDakQsSUFBSSxDQUFDdkcsTUFBTSxHQUFHdUcsR0FBRyxDQUFDQyxNQUFNO01BQ3hCLElBQUksQ0FBQ0MsVUFBVSxDQUFDRixHQUFHLENBQUNHLE9BQU8sQ0FBQztJQUM5QixDQUFDLENBQUM7O0lBRUY7SUFDQSxJQUFJLENBQUNDLFlBQVksR0FBRyxJQUFJLENBQUNBLFlBQVksQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoRCxJQUFJLENBQUNDLGNBQWMsR0FBRyxJQUFJLENBQUNBLGNBQWMsQ0FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNwRCxJQUFJLENBQUNFLFlBQVksR0FBRyxJQUFJLENBQUNBLFlBQVksQ0FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNoRCxJQUFJLENBQUNHLFVBQVUsR0FBRyxJQUFJLENBQUNBLFVBQVUsQ0FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQztJQUU1QyxJQUFJLENBQUN0QixLQUFLLENBQUNnQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDUyxVQUFVLENBQUM7RUFDdkQ7RUFFQU4sVUFBVUEsQ0FBQzFILFVBQVUsRUFBRTtJQUNyQjtJQUNBLE1BQU13RixDQUFDLEdBQ0wsSUFBSSxDQUFDdEQsUUFBUSxDQUFDK0YsTUFBTSxDQUNsQixDQUFDekosR0FBRyxFQUFFMEosSUFBSSxLQUNQMUosR0FBRyxPQUFBSyxNQUFBLENBQU9xSixJQUFJLENBQUM3SixNQUFNLEVBQUFRLE1BQUEsQ0FBR3FKLElBQUksQ0FBQ2hKLE1BQU0sQ0FBQ3NDLENBQUMsT0FBQTNDLE1BQUEsQ0FBSXFKLElBQUksQ0FBQ2hKLE1BQU0sQ0FBQ3VDLENBQUMsQ0FBRyxFQUM1RCxFQUNGLENBQUMsSUFBSXpCLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDOztJQUU3QjtJQUNBLElBQUksQ0FBQ2lDLElBQUksQ0FBQzJFLFlBQVksQ0FBQyxHQUFHLEVBQUVwQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDdkQsSUFBSSxDQUFDMkUsWUFBWSxDQUFDLGlCQUFpQixFQUFFcEIsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQ3dCLEtBQUssQ0FBQ0osWUFBWSxDQUFDLEdBQUcsRUFBRXBCLENBQUMsQ0FBQzs7SUFFL0I7SUFDQSxNQUFNMkMsUUFBUSxHQUFHaEcsa0RBQVksQ0FBQ3FELENBQUMsRUFBRSxJQUFJLENBQUN2RSxNQUFNLENBQUM7SUFDN0MsSUFBSSxDQUFDZ0IsSUFBSSxDQUFDMkUsWUFBWSxDQUFDLEdBQUcsRUFBRXVCLFFBQVEsQ0FBQ2xHLElBQUksQ0FBQztFQUM1QztFQUVBMkYsWUFBWUEsQ0FBQ0osR0FBRyxFQUFFO0lBQ2hCLE1BQU1ZLEdBQUcsR0FBR1osR0FBRyxDQUFDYSxNQUFNO0lBQ3RCLElBQUksQ0FBQy9CLGNBQWMsR0FBRyxJQUFJLENBQUNILElBQUksQ0FBQ1IsT0FBTyxDQUFDeUMsR0FBRyxDQUFDO0lBQzVDLElBQUksQ0FBQy9CLGVBQWUsR0FBRztNQUNyQjdFLENBQUMsRUFDQ2dHLEdBQUcsQ0FBQ2MsT0FBTyxHQUNYLElBQUksQ0FBQzVCLFdBQVcsQ0FBQzZCLElBQUksR0FDckIsSUFBSSxDQUFDbkMsU0FBUyxHQUNkZ0MsR0FBRyxDQUFDSSxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztNQUNoQy9HLENBQUMsRUFDQytGLEdBQUcsQ0FBQ2lCLE9BQU8sR0FDWCxJQUFJLENBQUMvQixXQUFXLENBQUNnQyxHQUFHLEdBQ3BCLElBQUksQ0FBQ3RDLFNBQVMsR0FDZGdDLEdBQUcsQ0FBQ0ksY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJO0lBQ2pDLENBQUM7SUFFRCxJQUFJLENBQUNqQyxLQUFLLENBQUNnQixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDTyxjQUFjLENBQUM7SUFDN0QsSUFBSSxDQUFDdkIsS0FBSyxDQUFDZ0IsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQ1EsWUFBWSxDQUFDO0VBQzNEO0VBRUFELGNBQWNBLENBQUNOLEdBQUcsRUFBRTtJQUNsQixNQUFNWSxHQUFHLEdBQUcsSUFBSSxDQUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQ0csY0FBYyxDQUFDO0lBQzFDLE1BQU1xQyxPQUFPLEdBQUcsSUFBSSxDQUFDekcsUUFBUSxDQUFDLElBQUksQ0FBQ29FLGNBQWMsQ0FBQyxDQUFDcEgsTUFBTTtJQUN6RHlKLE9BQU8sQ0FBQ25ILENBQUMsR0FBR2dHLEdBQUcsQ0FBQ2MsT0FBTyxHQUFHLElBQUksQ0FBQ2pDLGVBQWUsQ0FBQzdFLENBQUM7SUFDaERtSCxPQUFPLENBQUNsSCxDQUFDLEdBQUcrRixHQUFHLENBQUNpQixPQUFPLEdBQUcsSUFBSSxDQUFDcEMsZUFBZSxDQUFDNUUsQ0FBQztJQUVoRCxJQUFJLENBQUNpRyxVQUFVLENBQUNGLEdBQUcsQ0FBQ0csT0FBTyxDQUFDO0lBRTVCUyxHQUFHLENBQUNRLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFRCxPQUFPLENBQUNuSCxDQUFDLENBQUM7SUFDekM0RyxHQUFHLENBQUNRLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFRCxPQUFPLENBQUNsSCxDQUFDLENBQUM7RUFDM0M7RUFFQXNHLFlBQVlBLENBQUEsRUFBRztJQUNiO0lBQ0EsSUFBSSxDQUFDeEIsS0FBSyxDQUFDc0MsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQ2YsY0FBYyxDQUFDO0lBQ2hFLElBQUksQ0FBQ3ZCLEtBQUssQ0FBQ3NDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUNkLFlBQVksQ0FBQztFQUM5RDtFQUVBZSxNQUFNQSxDQUFDdEgsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7SUFDWCxNQUFNMkcsR0FBRyxHQUFHNUIsUUFBUSxDQUFDdUMsZUFBZSxDQUFDakQsS0FBSyxFQUFFLFFBQVEsQ0FBQztJQUNyRHNDLEdBQUcsQ0FBQ1EsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUVwSCxDQUFDLENBQUM7SUFDakM0RyxHQUFHLENBQUNRLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFbkgsQ0FBQyxDQUFDO0lBQ2pDMkcsR0FBRyxDQUFDUSxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUN4QyxTQUFTLENBQUM7SUFDN0MsSUFBSSxDQUFDRyxLQUFLLENBQUN5QyxXQUFXLENBQUNaLEdBQUcsQ0FBQztJQUUzQkEsR0FBRyxDQUFDYixnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDSyxZQUFZLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUUvRCxPQUFPTyxHQUFHO0VBQ1o7RUFFQUosVUFBVUEsQ0FBQ1IsR0FBRyxFQUFFO0lBQ2Q7SUFDQSxJQUFJQSxHQUFHLENBQUN5QixRQUFRLEVBQUU7SUFFbEIsTUFBTTVLLE1BQU0sR0FBRyxJQUFJLENBQUM2RCxRQUFRLENBQUN0RCxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUc7SUFDL0MsTUFBTTRDLENBQUMsR0FBR2dHLEdBQUcsQ0FBQ2MsT0FBTyxHQUFHLElBQUksQ0FBQzVCLFdBQVcsQ0FBQzZCLElBQUk7SUFDN0MsTUFBTTlHLENBQUMsR0FBRytGLEdBQUcsQ0FBQ2lCLE9BQU8sR0FBRyxJQUFJLENBQUMvQixXQUFXLENBQUNnQyxHQUFHO0lBQzVDLElBQUksQ0FBQ3hHLFFBQVEsQ0FBQ3BDLElBQUksQ0FBQztNQUFFekIsTUFBTTtNQUFFYSxNQUFNLEVBQUU7UUFBRXNDLENBQUM7UUFBRUM7TUFBRTtJQUFFLENBQUMsQ0FBQztJQUNoRCxJQUFJLENBQUMwRSxJQUFJLENBQUNyRyxJQUFJLENBQUMsSUFBSSxDQUFDZ0osTUFBTSxDQUFDdEgsQ0FBQyxFQUFFQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUNpRyxVQUFVLENBQUNGLEdBQUcsQ0FBQ0csT0FBTyxDQUFDO0VBQzlCO0FBQ0Y7O0FBRUE7QUFDQSxNQUFNTCxXQUFXLFNBQVM0QixXQUFXLENBQUM7RUFDcENsRCxXQUFXQSxDQUFDbUQsaUJBQWlCLEVBQUVDLE9BQU8sRUFBRTtJQUN0QyxLQUFLLENBQUMsQ0FBQztJQUNQLE1BQU1DLFFBQVEsR0FBRztNQUNmQyxJQUFJLEVBQUUsR0FBRztNQUNUQyxTQUFTLEVBQUUsQ0FBQztNQUNaeEksU0FBUyxFQUFFLEVBQUU7TUFDYnlJLFdBQVcsRUFBRSxFQUFFO01BQ2ZDLFlBQVksRUFBRTtJQUNoQixDQUFDO0lBRUQsSUFBSSxDQUFDTCxPQUFPLEdBQUc7TUFBRSxHQUFHQyxRQUFRO01BQUUsR0FBR0Q7SUFBUSxDQUFDO0lBQzFDLElBQUksQ0FBQy9DLGVBQWUsR0FBRztNQUFFN0UsQ0FBQyxFQUFFLENBQUM7TUFBRUMsQ0FBQyxFQUFFO0lBQUUsQ0FBQztJQUVyQyxNQUFNMUQsR0FBRywwS0FBQWMsTUFBQSxDQUtJLElBQUksQ0FBQ3VLLE9BQU8sQ0FBQ0UsSUFBSSwyQkFBQXpLLE1BQUEsQ0FDaEIsSUFBSSxDQUFDdUssT0FBTyxDQUFDRSxJQUFJLGlDQUFBekssTUFBQSxDQUNYLElBQUksQ0FBQ3VLLE9BQU8sQ0FBQ0UsSUFBSSxPQUFBekssTUFBQSxDQUFJLElBQUksQ0FBQ3VLLE9BQU8sQ0FBQ0UsSUFBSSxtREFBQXpLLE1BQUEsQ0FHOUMsSUFBSSxDQUFDdUssT0FBTyxDQUFDRSxJQUFJLEdBQUcsQ0FBQyx5QkFBQXpLLE1BQUEsQ0FDckIsSUFBSSxDQUFDdUssT0FBTyxDQUFDRSxJQUFJLEdBQUcsQ0FBQyx3QkFBQXpLLE1BQUEsQ0FDdEIsSUFBSSxDQUFDdUssT0FBTyxDQUFDSSxXQUFXLHVGQUFBM0ssTUFBQSxDQUd2QixJQUFJLENBQUN1SyxPQUFPLENBQUNFLElBQUksR0FBRyxDQUFDLHlCQUFBekssTUFBQSxDQUNyQixJQUFJLENBQUN1SyxPQUFPLENBQUNFLElBQUksR0FBRyxDQUFDLHlCQUFBekssTUFBQSxDQUNyQixJQUFJLENBQUN1SyxPQUFPLENBQUNFLElBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDRixPQUFPLENBQUNJLFdBQVcseUJBQUEzSyxNQUFBLENBQ2hELElBQUksQ0FBQ3VLLE9BQU8sQ0FBQ0UsSUFBSSxHQUFHLENBQUMsZ0dBQUF6SyxNQUFBLENBSXJCLElBQUksQ0FBQ3VLLE9BQU8sQ0FBQ0UsSUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUNGLE9BQU8sQ0FBQ0ksV0FBVyx5QkFBQTNLLE1BQUEsQ0FDaEQsSUFBSSxDQUFDdUssT0FBTyxDQUFDRSxJQUFJLEdBQUcsQ0FBQyx3QkFBQXpLLE1BQUEsQ0FDdEIsSUFBSSxDQUFDdUssT0FBTyxDQUFDSyxZQUFZLDBFQUduQztJQUVELE1BQU1DLFNBQVMsR0FBR2xELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDMEMsaUJBQWlCLENBQUM7SUFDM0QsTUFBTVEsS0FBSyxHQUFHbkQsUUFBUSxDQUFDb0QsV0FBVyxDQUFDLENBQUM7SUFDcEM7SUFDQUQsS0FBSyxDQUFDRSxVQUFVLENBQUNILFNBQVMsQ0FBQztJQUMzQixJQUFJSSxnQkFBZ0IsR0FBR0gsS0FBSyxDQUFDSSx3QkFBd0IsQ0FBQ2hNLEdBQUcsQ0FBQztJQUMxRDJMLFNBQVMsQ0FBQ1YsV0FBVyxDQUFDYyxnQkFBZ0IsQ0FBQzs7SUFFdkM7SUFDQSxJQUFJLENBQUN2RCxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0lBQ3RELElBQUksQ0FBQ3VELE1BQU0sR0FBR3hELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0lBQy9ELElBQUksQ0FBQ3dELElBQUksR0FBR3pELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0lBQzNELElBQUksQ0FBQ3lELE1BQU0sR0FBRzFELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0lBRS9ELElBQUksQ0FBQ0MsV0FBVyxHQUFHLElBQUksQ0FBQ0gsS0FBSyxDQUFDSSxxQkFBcUIsQ0FBQyxDQUFDOztJQUVyRDtJQUNBLElBQUksQ0FBQ3dELFlBQVksR0FBRyxJQUFJLENBQUNBLFlBQVksQ0FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDaEQsSUFBSSxDQUFDdUMsVUFBVSxHQUFHLElBQUksQ0FBQ0EsVUFBVSxDQUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUM1QyxJQUFJLENBQUN3QyxlQUFlLEdBQUcsSUFBSSxDQUFDQSxlQUFlLENBQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBRXRELElBQUksQ0FBQ3FDLE1BQU0sQ0FBQzNDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM4QyxlQUFlLENBQUM7RUFDakU7RUFFQUEsZUFBZUEsQ0FBQzdDLEdBQUcsRUFBRTtJQUNuQjtJQUNBLElBQUksQ0FBQ25CLGVBQWUsR0FBRztNQUNyQjdFLENBQUMsRUFDQ2dHLEdBQUcsQ0FBQ2MsT0FBTyxHQUNYLElBQUksQ0FBQzVCLFdBQVcsQ0FBQ2xGLENBQUMsR0FDbEIsSUFBSSxDQUFDNEgsT0FBTyxDQUFDSyxZQUFZLEdBQ3pCLElBQUksQ0FBQ1MsTUFBTSxDQUFDMUIsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7TUFDeEMvRyxDQUFDLEVBQ0MrRixHQUFHLENBQUNpQixPQUFPLEdBQ1gsSUFBSSxDQUFDL0IsV0FBVyxDQUFDakYsQ0FBQyxHQUNsQixJQUFJLENBQUMySCxPQUFPLENBQUNLLFlBQVksR0FDekIsSUFBSSxDQUFDUyxNQUFNLENBQUMxQixjQUFjLENBQUMsSUFBSSxFQUFFLElBQUk7SUFDekMsQ0FBQztJQUVEaEMsUUFBUSxDQUFDZSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDNEMsWUFBWSxDQUFDO0lBQ3pEM0QsUUFBUSxDQUFDZSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDNkMsVUFBVSxDQUFDO0VBQ3ZEO0VBRUFELFlBQVlBLENBQUMzQyxHQUFHLEVBQUU7SUFDaEIsTUFBTWhHLENBQUMsR0FDTGdHLEdBQUcsQ0FBQ2MsT0FBTyxHQUNYLElBQUksQ0FBQzVCLFdBQVcsQ0FBQ2xGLENBQUMsR0FDbEIsSUFBSSxDQUFDNEgsT0FBTyxDQUFDSyxZQUFZLEdBQ3pCLElBQUksQ0FBQ3BELGVBQWUsQ0FBQzdFLENBQUM7SUFDeEIsTUFBTUMsQ0FBQyxHQUNMK0YsR0FBRyxDQUFDaUIsT0FBTyxHQUNYLElBQUksQ0FBQy9CLFdBQVcsQ0FBQ2pGLENBQUMsR0FDbEIsSUFBSSxDQUFDMkgsT0FBTyxDQUFDSyxZQUFZLEdBQ3pCLElBQUksQ0FBQ3BELGVBQWUsQ0FBQzVFLENBQUM7SUFFeEIsTUFBTWdDLEVBQUUsR0FBRztNQUFFakMsQ0FBQztNQUFFQztJQUFFLENBQUM7SUFDbkIsTUFBTWlDLEVBQUUsR0FBRztNQUFFbEMsQ0FBQyxFQUFFLElBQUksQ0FBQzRILE9BQU8sQ0FBQ0UsSUFBSSxHQUFHLENBQUM7TUFBRTdILENBQUMsRUFBRSxJQUFJLENBQUMySCxPQUFPLENBQUNFLElBQUksR0FBRztJQUFFLENBQUM7SUFDakU7SUFDQSxNQUFNZ0IsUUFBUSxHQUFHMUosSUFBSSxDQUFDTSxHQUFHLENBQUNxQyx1REFBVyxDQUFDRSxFQUFFLEVBQUVDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQzBGLE9BQU8sQ0FBQ3JJLFNBQVMsQ0FBQztJQUV0RSxNQUFNTCxLQUFLLEdBQUcxRCxvREFBUSxDQUFDeUcsRUFBRSxFQUFFQyxFQUFFLENBQUM7SUFDOUI7SUFDQSxNQUFNNkcsSUFBSSxHQUFHLENBQUMzSixJQUFJLENBQUNxRCxHQUFHLENBQUN2RCxLQUFLLENBQUMsR0FBRzRKLFFBQVEsR0FBRyxJQUFJLENBQUNsQixPQUFPLENBQUNFLElBQUksR0FBRyxDQUFDO0lBQ2hFLE1BQU1rQixJQUFJLEdBQUcsQ0FBQzVKLElBQUksQ0FBQ3NELEdBQUcsQ0FBQ3hELEtBQUssQ0FBQyxHQUFHNEosUUFBUSxHQUFHLElBQUksQ0FBQ2xCLE9BQU8sQ0FBQ0UsSUFBSSxHQUFHLENBQUM7SUFFaEUsSUFBSSxDQUFDWSxNQUFNLENBQUN0QixjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTJCLElBQUksQ0FBQztJQUM1QyxJQUFJLENBQUNMLE1BQU0sQ0FBQ3RCLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFNEIsSUFBSSxDQUFDO0lBRTVDLElBQUksQ0FBQ1IsTUFBTSxDQUFDcEQsWUFBWSxDQUFDLEdBQUcsRUFBRTBELFFBQVEsQ0FBQztJQUN2QyxJQUFJLENBQUNMLElBQUksQ0FBQ3JELFlBQVksQ0FBQyxJQUFJLEVBQUUyRCxJQUFJLENBQUM7SUFDbEMsSUFBSSxDQUFDTixJQUFJLENBQUNyRCxZQUFZLENBQUMsSUFBSSxFQUFFNEQsSUFBSSxDQUFDOztJQUVsQztJQUNBLE1BQU1DLEtBQUssR0FBRyxJQUFJQyxXQUFXLENBQUMsUUFBUSxFQUFFO01BQUVqRCxNQUFNLEVBQUU2QztJQUFTLENBQUMsQ0FBQztJQUM3RCxJQUFJLENBQUNLLGFBQWEsQ0FBQ0YsS0FBSyxDQUFDO0VBQzNCO0VBRUFMLFVBQVVBLENBQUEsRUFBRztJQUNYO0lBQ0E1RCxRQUFRLENBQUNxQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDc0IsWUFBWSxDQUFDO0lBQzVEM0QsUUFBUSxDQUFDcUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQ3VCLFVBQVUsQ0FBQztFQUMxRDtBQUNGO0FBRUEsSUFBSTVELFFBQVEsQ0FBQ29FLFVBQVUsS0FBSyxTQUFTLEVBQUU7RUFDckNwRSxRQUFRLENBQUNlLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLE1BQU07SUFDbEQsSUFBSXhCLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0VBQy9CLENBQUMsQ0FBQztBQUNKLENBQUMsTUFBTTtFQUNMLElBQUlBLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0FBQy9CLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdmctcm91bmQtY29ybmVycy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9zdmctcm91bmQtY29ybmVycy8uL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9zdmctcm91bmQtY29ybmVycy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zdmctcm91bmQtY29ybmVycy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vc3ZnLXJvdW5kLWNvcm5lcnMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zdmctcm91bmQtY29ybmVycy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3N2Zy1yb3VuZC1jb3JuZXJzLy4vZGVtby1zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBnZXRBbmdsZSxcbiAgZ2V0T3Bwb3NpdGVMZW5ndGgsXG4gIGdldEFkamFjZW50TGVuZ3RoLFxuICBjb21tYW5kc1RvU3ZnUGF0aCxcbiAgbWFya092ZXJsYXBwZWQsXG4gIHNob3J0ZXN0U2lkZSxcbiAgcm91bmRWYWx1ZXMsXG4gIGdldFByZXZpb3VzTm9aLFxuICBnZXROZXh0Tm9aLFxuICByZXZlcnNlTWFya092ZXJsYXBwZWQsXG4gIGdldE9mZnNldCxcbiAgZ2V0VGFuZ2VudE5vSHlwLFxuICBuZXdDb21tYW5kcyxcbiAgY29udmVydFRvQWJzb2x1dGVcbn0gZnJvbSAnLi91dGlscy5qcyc7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBnaXZlbiBjb21tYW5kIHN0cmluZyBhbmQgZ2VuZXJhdGVzIGFuIGFycmF5IG9mIHBhcnNlZCBjb21tYW5kcy5cbiAqIFRoaXMgZnVuY3Rpb24gbm9ybWFsaXNlcyBhbGwgcmVsYXRpdmUgY29tbWFuZHMgaW50byBhYnNvbHV0ZSBjb21tYW5kcyBhbmRcbiAqIHRyYW5zZm9ybXMgaCwgSCwgdiwgViB0byBMIGNvbW1hbmRzXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFJhdyBzdHJpbmcgZnJvbSAnZCcgQXR0cmlidXRlXG4gKiBAcmV0dXJucyB7YXJyYXl9IEFycmF5IG9mIG5vcm1hbGlzZWQgY29tbWFuZHNcbiAqL1xuZnVuY3Rpb24gcGFyc2VQYXRoKHN0cikge1xuICBjb25zdCBtYXJrZXJSZWdFeCA9IC9bTW1MbFNzUXFMbEhoVnZDY1NzUXFUdEFhWnpdL2c7XG4gIGNvbnN0IGRpZ2l0UmVnRXggPSAvLT9bMC05XSpcXC4/XFxkKy9nO1xuXG4gIHJldHVybiBbLi4uc3RyLm1hdGNoQWxsKG1hcmtlclJlZ0V4KV1cbiAgICAubWFwKG1hdGNoID0+IHtcbiAgICAgIHJldHVybiB7IG1hcmtlcjogbWF0Y2hbMF0sIGluZGV4OiBtYXRjaC5pbmRleCB9O1xuICAgIH0pXG4gICAgLnJlZHVjZVJpZ2h0KChhY2MsIGN1cikgPT4ge1xuICAgICAgY29uc3QgY2h1bmsgPSBzdHIuc3Vic3RyaW5nKFxuICAgICAgICBjdXIuaW5kZXgsXG4gICAgICAgIGFjYy5sZW5ndGggPyBhY2NbYWNjLmxlbmd0aCAtIDFdLmluZGV4IDogc3RyLmxlbmd0aFxuICAgICAgKTtcbiAgICAgIHJldHVybiBhY2MuY29uY2F0KFtcbiAgICAgICAge1xuICAgICAgICAgIG1hcmtlcjogY3VyLm1hcmtlcixcbiAgICAgICAgICBpbmRleDogY3VyLmluZGV4LFxuICAgICAgICAgIGNodW5rOiBjaHVuay5sZW5ndGggPiAwID8gY2h1bmsuc3Vic3RyKDEsIGNodW5rLmxlbmd0aCAtIDEpIDogY2h1bmtcbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgfSwgW10pXG4gICAgLnJldmVyc2UoKVxuICAgIC5mbGF0TWFwKGNtZCA9PiB7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBjbWQuY2h1bmsubWF0Y2goZGlnaXRSZWdFeCk7XG4gICAgICBjb25zdCB2YWxzID0gdmFsdWVzID8gdmFsdWVzLm1hcChwYXJzZUZsb2F0KSA6IFtdO1xuICAgICAgcmV0dXJuIG5ld0NvbW1hbmRzKGNtZC5tYXJrZXIsIHZhbHMpO1xuICAgIH0pXG4gICAgLm1hcChjb252ZXJ0VG9BYnNvbHV0ZSk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgdGhyb3VnaCBhbiBhcnJheSBvZiBub3JtYWxpc2VkIGNvbW1hbmRzIGFuZCBpbnNlcnQgYXJjcyB3aGVyZSBhcHBsaWNhYmxlLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgYXJyYXkgaW4gcGxhY2UuXG4gKiBAcGFyYW0ge2FycmF5fSBfY21kcyBBcnJheSB3aXRoIGNvbW1hbmRzIHRvIGJlIG1vZGlmaWVkXG4gKiBAcGFyYW0ge251bWJlcn0gciBFeHBlY3RlZCByYWRpdXMgb2YgdGhlIGFyY3MuXG4gKiBAcGFyYW0ge251bWJlcn0gcm91bmQgTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzIHRvIHJvdW5kIHZhbHVlc1xuICogQHJldHVybnMge2FycmF5fSBTZXF1ZW5jZSBvZiBjb21tYW5kcyBjb250YWluaW5nIGFyY3MgaW4gcGxhY2Ugb2YgY29ybmVyc1xuICovXG5mdW5jdGlvbiByb3VuZENvbW1hbmRzKGNtZHMsIHIsIHJvdW5kKSB7XG4gIGxldCBzdWJwYXRocyA9IFtdO1xuICBsZXQgbmV3Q21kcyA9IFtdO1xuXG4gIGlmIChyb3VuZCkge1xuICAgIGNtZHMuZm9yRWFjaChlbCA9PiByb3VuZFZhbHVlcyhlbCwgcm91bmQpKTtcbiAgICAvLyByb3VuZFZhbHVlcyhjbWRzLCByb3VuZCk7XG4gIH1cblxuICBjbWRzXG4gICAgLy8gc3BsaXQgc3ViIHBhdGhzXG4gICAgLmZvckVhY2goZSA9PiB7XG4gICAgICBpZiAoZS5tYXJrZXIgPT09ICdNJykge1xuICAgICAgICBzdWJwYXRocy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIHN1YnBhdGhzW3N1YnBhdGhzLmxlbmd0aCAtIDFdLnB1c2goZSk7XG4gICAgfSk7XG5cbiAgc3VicGF0aHMuZm9yRWFjaChzdWJQYXRoQ21kcyA9PiB7XG4gICAgc3ViUGF0aENtZHNcbiAgICAgIC8vIFdlIGFyZSBvbmx5IGV4Y2x1ZGluZyBsaW5lVG8gY29tbWFuZHMgdGhhdCBtYXkgYmUgb3ZlcmxhcHBpbmdcbiAgICAgIC5tYXAobWFya092ZXJsYXBwZWQpO1xuXG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKHN1YlBhdGhDbWRzLCBzdWJQYXRoQ21kcy5sZW5ndGggLSAxKTtcblxuICAgIC8vIGlzIHRoaXMgYW4gb3BlbiBvciBjbG9zZWQgcGF0aD8gZG9uJ3QgYWRkIGFyY3MgdG8gc3RhcnQvZW5kLlxuICAgIGNvbnN0IGNsb3NlZFBhdGggPSBzdWJQYXRoQ21kc1tzdWJQYXRoQ21kcy5sZW5ndGggLSAxXS5tYXJrZXIgPT0gJ1onO1xuICAgIHN1YlBhdGhDbWRzXG4gICAgICAuZmlsdGVyKGVsID0+ICFlbC5vdmVybGFwKVxuICAgICAgLm1hcCgoZWwsIGksIGFycikgPT4ge1xuICAgICAgICBjb25zdCBsYXJnZUFyY0ZsYWcgPSAwO1xuICAgICAgICBjb25zdCBwcmV2ID0gZ2V0UHJldmlvdXNOb1ooZWwsIGksIGFycik7XG4gICAgICAgIGNvbnN0IG5leHQgPSBnZXROZXh0Tm9aKGVsLCBpLCBhcnIpO1xuICAgICAgICBjb25zdCBhbmdsZVBydiA9IGdldEFuZ2xlKGVsLnZhbHVlcywgcHJldi52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZU54dCA9IGdldEFuZ2xlKGVsLnZhbHVlcywgbmV4dC52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGFuZ2xlTnh0IC0gYW5nbGVQcnY7IC8vIHJhZGlhbnNcbiAgICAgICAgY29uc3QgZGVncmVlcyA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xuICAgICAgICAvLyBwcmV2ZW50IGFyYyBjcm9zc2luZyB0aGUgbmV4dCBjb21tYW5kXG4gICAgICAgIGNvbnN0IHNob3J0ZXN0ID0gc2hvcnRlc3RTaWRlKGVsLCBwcmV2LCBuZXh0KTtcbiAgICAgICAgY29uc3QgbWF4UmFkaXVzID0gTWF0aC5hYnMoZ2V0VGFuZ2VudE5vSHlwKGFuZ2xlIC8gMiwgc2hvcnRlc3QgLyAyKSk7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHIsIG1heFJhZGl1cyk7XG5cbiAgICAgICAgY29uc3QgbyA9IGdldE9mZnNldChhbmdsZSwgcmFkaXVzKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gby5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IHN3ZWVwRmxhZyA9IG8uc3dlZXBGbGFnO1xuXG4gICAgICAgIGNvbnN0IG9wZW5GaXJzdE9yTGFzdCA9IChpID09IDAgfHwgaSA9PSBhcnIubGVuZ3RoIC0gMSkgJiYgIWNsb3NlZFBhdGg7XG4gICAgICAgIHN3aXRjaCAoZWwubWFya2VyKSB7XG4gICAgICAgICAgY2FzZSAnTSc6IC8vIG1vdmVUbyB4LHlcbiAgICAgICAgICBjYXNlICdMJzogLy8gbGluZVRvIHgseVxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY2FzZS1kZWNsYXJhdGlvbnMgKi9cbiAgICAgICAgICAgIGNvbnN0IHByZXZQb2ludCA9IFtcbiAgICAgICAgICAgICAgZWwudmFsdWVzLnggKyBnZXRPcHBvc2l0ZUxlbmd0aChhbmdsZVBydiwgb2Zmc2V0KSxcbiAgICAgICAgICAgICAgZWwudmFsdWVzLnkgKyBnZXRBZGphY2VudExlbmd0aChhbmdsZVBydiwgb2Zmc2V0KVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY2FzZS1kZWNsYXJhdGlvbnMgKi9cbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IFtcbiAgICAgICAgICAgICAgZWwudmFsdWVzLnggKyBnZXRPcHBvc2l0ZUxlbmd0aChhbmdsZU54dCwgb2Zmc2V0KSxcbiAgICAgICAgICAgICAgZWwudmFsdWVzLnkgKyBnZXRBZGphY2VudExlbmd0aChhbmdsZU54dCwgb2Zmc2V0KVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgLy8gdGhlcmUgb25seSBuZWVkIGJlIGEgY3VydmUgaWYgYW5kIG9ubHkgaWYgdGhlIG5leHQgbWFya2VyIGlzIGEgY29ybmVyXG4gICAgICAgICAgICBpZiAoIW9wZW5GaXJzdE9yTGFzdCkge1xuICAgICAgICAgICAgICBuZXdDbWRzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1hcmtlcjogZWwubWFya2VyLFxuICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgeDogcGFyc2VGbG9hdChwcmV2UG9pbnRbMF0udG9GaXhlZCgzKSksXG4gICAgICAgICAgICAgICAgICB5OiBwYXJzZUZsb2F0KHByZXZQb2ludFsxXS50b0ZpeGVkKDMpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBuZXdDbWRzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1hcmtlcjogZWwubWFya2VyLFxuICAgICAgICAgICAgICAgIHZhbHVlczogZWwudmFsdWVzXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICFvcGVuRmlyc3RPckxhc3QgJiZcbiAgICAgICAgICAgICAgKG5leHQubWFya2VyID09PSAnTCcgfHwgbmV4dC5tYXJrZXIgPT09ICdNJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBuZXdDbWRzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1hcmtlcjogJ0EnLFxuICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgcmFkaXVzWDogcmFkaXVzLFxuICAgICAgICAgICAgICAgICAgcmFkaXVzWTogcmFkaXVzLFxuICAgICAgICAgICAgICAgICAgcm90YXRpb246IGRlZ3JlZXMsXG4gICAgICAgICAgICAgICAgICBsYXJnZUFyYzogbGFyZ2VBcmNGbGFnLFxuICAgICAgICAgICAgICAgICAgc3dlZXA6IHN3ZWVwRmxhZyxcbiAgICAgICAgICAgICAgICAgIHg6IHBhcnNlRmxvYXQobmV4dFBvaW50WzBdLnRvRml4ZWQoMykpLFxuICAgICAgICAgICAgICAgICAgeTogcGFyc2VGbG9hdChuZXh0UG9pbnRbMV0udG9GaXhlZCgzKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy8gY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4LiBUcmFuc2Zvcm1lZCB0byBMIGluIHV0aWxzXG4gICAgICAgICAgLy8gY2FzZSAnVic6IC8vIHZlcnRpY2FsVG8geS4gVHJhbnNmb3JtZWQgdG8gTCBpbiB1dGlsc1xuICAgICAgICAgIGNhc2UgJ0MnOiAvLyBjdWJpYyBiZXppw6lyOiB4MSB5MSwgeDIgeTIsIHggeVxuICAgICAgICAgIGNhc2UgJ1MnOiAvLyBzaG9ydCBiZXppw6lyOiB4MiB5MiwgeCB5XG4gICAgICAgICAgY2FzZSAnUSc6IC8vIHF1YWRyYXRpYyBiZXppw6lyOiB4MSB5MSwgeCB5XG4gICAgICAgICAgY2FzZSAnVCc6IC8vIHNob3J0IHF1YWRyYXRpYyBiZXppw6lyOiB4IHlcbiAgICAgICAgICBjYXNlICdBJzogLy8gYXJjOiByeCByeSB4LWF4aXMtcm90YXRpb24gbGFyZ2UtYXJjLWZsYWcgc3dlZXAtZmxhZyB4IHlcbiAgICAgICAgICBjYXNlICdaJzogLy8gY2xvc2UgcGF0aFxuICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHsgbWFya2VyOiBlbC5tYXJrZXIsIHZhbHVlczogZWwudmFsdWVzIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHBhdGg6IGNvbW1hbmRzVG9TdmdQYXRoKG5ld0NtZHMpLFxuICAgIGNvbW1hbmRzOiBuZXdDbWRzXG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBpcyBhIHNob3J0aGFuZCBmb3IgcGFyc2VQYXRoKCkgYW5kIHJvdW5kQ29tbWFuZHMoKS5cbiAqIFlvdSBnZXQgdGhlIGVuZCByZXN1bHQgaW4gb25lIGZ1bmN0aW9uIGNhbGwuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFJhdyBzdHJpbmcgd2l0aCBjb21tYW5kcyBmcm9tIHRoZSBwYXRoIGVsZW1lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSByIEV4cGVjdGVkIHJhZGl1cyBvZiB0aGUgYXJjcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3VuZCBOdW1iZXIgb2YgZGVjaW1hbCBkaWdpdHMgdG8gcm91bmQgdmFsdWVzXG4gKiBAcmV0dXJucyB7YXJyYXl9IE5ldyBjb21tYW5kcyBzZXF1ZW5jZSB3aXRoIHJvdW5kZWQgY29ybmVyc1xuICovXG5mdW5jdGlvbiByb3VuZENvcm5lcnMoc3RyLCByLCByb3VuZCkge1xuICByZXR1cm4gcm91bmRDb21tYW5kcyhbLi4ucGFyc2VQYXRoKHN0cildLCByLCByb3VuZCk7XG59XG5cbmV4cG9ydCB7IHBhcnNlUGF0aCwgcm91bmRDb21tYW5kcywgcm91bmRDb3JuZXJzIH07XG4iLCIvKipcbiAqIFJvdW5kIHRoZSB2YWx1ZXMgb2YgZWFjaCBjb21tYW5kIHRvIHRoZSBnaXZlbiBudW1iZXIgb2YgZGVjaW1hbHMuXG4gKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBvYmplY3QgaW4gcGxhY2UuXG4gKiBAcGFyYW0ge2FycmF5fSBjbWRzIFNlcXVlbmNlIG9mIGNvbW1hbmRzXG4gKiBAcGFyYW0ge251bWJlcn0gcm91bmQgTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2UgdG8gYmUgcm91bmRlZFxuICogQHJldHVybnMge2FycmF5fSBTZXF1ZW5jZSBvZiBjb21tYW5kcyB3aXRoIHRoZWlyIHZhbHVlcyByb3VuZGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZFZhbHVlcyhlbCwgcm91bmQpIHtcbiAgT2JqZWN0LmtleXMoZWwudmFsdWVzKS5mb3JFYWNoKFxuICAgIGtleSA9PlxuICAgICAgKGVsLnZhbHVlc1trZXldID1cbiAgICAgICAgZWwudmFsdWVzW2tleV0gJiYgcGFyc2VGbG9hdChlbC52YWx1ZXNba2V5XS50b0ZpeGVkKHJvdW5kKSkpXG4gICk7XG5cbiAgcmV0dXJuIGVsO1xufVxuXG4vKipcbiAqIEdldCBwcmV2aW91cyBlbGVtZW50IGluIGFycmF5LCB3cmFwcGluZyBpZiBpbmRleCBpcyBvdXQgb2YgYm91bmRzIGFuZCBza2lwcGluZyBpZiB0aGUgY29tbWFuZCBpcyAnWidcbiAqIEBwYXJhbSB7YW55fSBlIENvbW1hbmQgb2JqZWN0XG4gKiBAcGFyYW0ge251bWJlcn0gaSBDdXJyZW50IGluZGV4XG4gKiBAcGFyYW0ge2FycmF5fSBhIEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKiBAcmV0dXJucyB7YW55fSBQcmV2aW91cyBlbGVtZW50IHRoYXQgZG9lc24ndCBoYXZlIGEgJ1onIG1hcmtlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldmlvdXNOb1ooZSwgaSwgYSkge1xuICBjb25zdCBjb3VudGVyID0gaSAtIDE7XG4gIGNvbnN0IHByZXZpb3VzID0gYVttb2QoY291bnRlciwgYS5sZW5ndGgpXTtcblxuICBpZiAocHJldmlvdXMubWFya2VyICE9PSAnWicpIHtcbiAgICByZXR1cm4gcHJldmlvdXM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldFByZXZpb3VzTm9aKGUsIGNvdW50ZXIsIGEpO1xuICB9XG59XG5cbi8qKlxuICogR2V0IG5leHQgZWxlbWVudCBpbiBhcnJheSwgd3JhcHBpbmcgaWYgaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBhbmQgc2tpcHBpbmcgaWYgdGhlIGNvbW1hbmQgaXMgJ1onXG4gKiBAcGFyYW0ge2FueX0gZSBDb21tYW5kIG9iamVjdFxuICogQHBhcmFtIHtudW1iZXJ9IGkgQ3VycmVudCBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYSBBcnJheSBiZWluZyBpdGVyYXRlZFxuICogQHJldHVybnMge2FueX0gTmV4dCBlbGVtZW50IHRoYXQgZG9lc24ndCBoYXZlIGEgJ1onIG1hcmtlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dE5vWihlLCBpLCBhKSB7XG4gIGNvbnN0IGNvdW50ZXIgPSBpICsgMTtcbiAgY29uc3QgbmV4dCA9IGFbbW9kKGNvdW50ZXIsIGEubGVuZ3RoKV07XG5cbiAgaWYgKG5leHQubWFya2VyID09PSAnWicpIHtcbiAgICByZXR1cm4gZ2V0TmV4dE5vWihlLCBjb3VudGVyLCBhKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxufVxuXG4vKipcbiAqIEl0ZXJhdGUgdGhyb3VnaCBhbiBhcnJheSBhbmQgY29udmVydCBhbGwgY29tbWFuZHMgdG8gYWJzb2x1dGUuXG4gKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB1c2VkIGFzIGFyZ3VtZW50IGluIGEgbWFwKCkgY2FsbC5cbiAqIEBwYXJhbSB7YW55fSBlbCBDdXJyZW50IGVsZW1lbnQgaW4gdGhpcyBpdGVyYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBDdXJyZW50IGl0ZXJhdGlvbiBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYXJyIEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9BYnNvbHV0ZShlbCwgaW5kZXgsIGFycikge1xuICAvLyBnZXQgcHJldmlvdXMgaXRlbSBvciBjcmVhdGUgb25lIGVtcHR5IGlmIGl0IGRvZXNudCBleGlzdFxuICBsZXQgcHJldiA9IGFycltpbmRleCAtIDFdIHx8IHsgdmFsdWVzOiB7IHg6IDAsIHk6IDAgfSB9O1xuXG4gIC8vIG9ubHkgbmVlZCB0byB0ZXN0IGxvd2VyY2FzZSAocmVsYXRpdmUpIGNvbW1hbmRzXG4gIGlmIChlbC5tYXJrZXIgPT09IGVsLm1hcmtlci50b0xvd2VyQ2FzZSgpKSB7XG4gICAgLy8gY29udmVydCBhbGwgdG8gdXBwZXJjYXNlXG4gICAgZWwubWFya2VyID0gZWwubWFya2VyLnRvVXBwZXJDYXNlKCk7XG4gICAgc3dpdGNoIChlbC5tYXJrZXIpIHtcbiAgICAgIGNhc2UgJ00nOiAvLyBtb3ZlIHRvIHgseVxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0wnOiAvLyBsaW5lIHRvIHgseVxuICAgICAgY2FzZSAnQSc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4XG4gICAgICAgIGVsLm1hcmtlciA9ICdMJztcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1YnOiAvLyB2ZXJ0aWNhbFRvIHlcbiAgICAgICAgZWwubWFya2VyID0gJ0wnO1xuICAgICAgICBlbC52YWx1ZXMueCA9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQyc6IC8vIGJlemnDqXIgY3VydmUgeDEgeTEsIHgyIHkyLCB4IHlcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngxICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBlbC52YWx1ZXMueDIgKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkyICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGVsLnZhbHVlcy54MiArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueTIgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdRJzpcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngxICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1QnOlxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1onOlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gSC9WIHVwcGVyY2FzZSBuZWVkIHRvIGJlIGNvbnZlcnRlZCB0b28uIENvbnZlcnQgdG8gTCBhbmQgYWRkIG1pc3NpbmcgdmFsdWVcbiAgfSBlbHNlIGlmIChlbC5tYXJrZXIgPT09IGVsLm1hcmtlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgc3dpdGNoIChlbC5tYXJrZXIpIHtcbiAgICAgIGNhc2UgJ0gnOiAvLyBob3Jpem9udGFsVG8geFxuICAgICAgICBlbC5tYXJrZXIgPSAnTCc7XG4gICAgICAgIGVsLnZhbHVlcy55ID0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdWJzogLy8gdmVydGljYWxUbyB5XG4gICAgICAgIGVsLm1hcmtlciA9ICdMJztcbiAgICAgICAgZWwudmFsdWVzLnggPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKlxuICAgICdaJyBjb21tYW5kcyBkb24ndCBoYXZlIGFueSBjb29yZGluYXRlIGJ1dCB3ZSBhcmUgY2xvbmluZyB0aGVcbiAgICBzdGFydCBjb29yZGluYXRlcyBkZWZpbmVkIGJ5IHRoaXMgc3VicGF0aCBpbml0aWFsICdNJyBzbyBpdCdzXG4gICAgZWFzaWVyIHRvIGRvIHRoZSBzdGl0Y2hpbmcgbGF0ZXIuXG4gICovXG4gIGlmIChlbC5tYXJrZXIgPT09ICdaJykge1xuICAgIC8vIGZpbmQgcHJldmlvdXMgJ00nIHJlY3Vyc2l2ZWx5XG4gICAgZnVuY3Rpb24gcmVjKGFyciwgaSkge1xuICAgICAgaWYgKGFycltpXS5tYXJrZXIgPT09ICdNJykge1xuICAgICAgICByZXR1cm4gYXJyW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlYyhhcnIsIGkgLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IG1CZWZvcmUgPSByZWMoYXJyLCBpbmRleCk7XG4gICAgZWwudmFsdWVzLnggPSBtQmVmb3JlLnZhbHVlcy54O1xuICAgIGVsLnZhbHVlcy55ID0gbUJlZm9yZS52YWx1ZXMueTtcbiAgfVxuXG4gIHJldHVybiBlbDtcbn1cblxuLyoqXG4gKiBUYWtlcyBvbmUgbWFya2VyIGFuZCBhbiBhcnJheSBvZiBudW1iZXJzIGFuZCBjcmVhdGVzIG9uZSBvciBtb3JlIGNvbW1hbmQgb2JqZWN0cyB3aXRoIHRoZSByaWdodFxuICogcHJvcGVydGllcyBiYXNlZCBvbiB0aGUgZ2l2ZW4gbWFya2VyLiBTb21lIG1hcmtlcnMgYWxsb3cgZm9yIG11bHRpcGxlIGNvb3JkaW5hdGVzIGZvciBvbmUgc2luZ2xlIGNvbW1hbmQuXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGNhcmUgb2Ygc3BsaXR0aW5nIG11bHRpcGxlIGNvb3JkaW5hdGVzIHBlciBjb21tYW5kIGFuZCBnZW5lcmF0aW5nIHRoZVxuICogQHBhcmFtIHtzdHJpbmd9IG1hcmtlciBMZXR0ZXIgb2YgdGhlIGNvbW1hbmQgYmVpbmcgZ2VuZXJhdGVkXG4gKiBAcGFyYW0ge2FycmF5fSB2YWx1ZXMgQXJyYXkgb2YgbnVtYmVycyB0byBiZSBzcGxpdHRlZCBhbmQgcGFyc2VkIGludG8gdGhlIHJpZ2h0IHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHthcnJheX0gQXJyYXkgb2YgY29tbWFuZHMuIE1vc3Qgb2YgdGhlIHRpbWUgd2lsbCBoYXZlIG9ubHkgb25lIGl0ZW1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG5ld0NvbW1hbmRzKG1hcmtlciwgdmFsdWVzKSB7XG4gIGNvbnN0IGNtZHMgPSBbXTtcblxuICBzd2l0Y2ggKG1hcmtlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgY2FzZSAnTSc6IC8vIG1vdmVUbyB4LHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGxldCBtO1xuICAgICAgICBpZiAobWFya2VyID09PSBtYXJrZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgIG0gPSBpID09PSAwID8gJ00nIDogJ0wnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSBpID09PSAwID8gJ20nIDogJ2wnO1xuICAgICAgICB9XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyOiBtLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAxXVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdMJzogLy8gbGluZVRvIHgseVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDFdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0gnOiAvLyBob3Jpem9udGFsVG8geFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1YnOiAvLyB2ZXJ0aWNhbFRvIHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpXVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdDJzogLy8gY3ViaWMgYmV6acOpciBjdXJ2ZSB4MSB5MSwgeDIgeTIsIHggeVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDYpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4MTogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTE6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICB4MjogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIHkyOiB2YWx1ZXNbaSArIDNdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyA0XSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgNV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUyc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHgyOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5MjogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpICsgMl0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDNdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1EnOlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4MTogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTE6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDJdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAzXVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdUJzpcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAxXVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdBJzpcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSA3KSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgcmFkaXVzWDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgcmFkaXVzWTogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICAgIHJvdGF0aW9uOiB2YWx1ZXNbaSArIDJdLFxuICAgICAgICAgICAgbGFyZ2VBcmM6IHZhbHVlc1tpICsgM10sXG4gICAgICAgICAgICBzd2VlcDogdmFsdWVzW2kgKyA0XSxcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpICsgNV0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDZdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1onOlxuICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgbWFya2VyLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAvLyB2YWx1ZXMgd2lsbCBiZSBvdmVycmlkZW4gbGF0ZXIgYnkgY29udmVydFRvQWJzb2x1dGUoKVxuICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgeTogMFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBjbWRzO1xufVxuXG4vKipcbiAqIFRha2VzIGFuIGluZGV4IGFuZCBhIGxlbmd0aCBhbmQgcmV0dXJucyB0aGUgaW5kZXggd3JhcHBlZCBpZiBvdXQgb2YgYm91bmRzLlxuICogQHBhcmFtIHtudW1iZXJ9IHggSW5kZXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBtIExlbmd0aFxuICogQHJldHVybnMge251bWJlcn0gSW5kZXggb3Igd3JhcHBlZCBpbmRleCBpZiBvdXQgYm91bmRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtb2QoeCwgbSkge1xuICByZXR1cm4gKCh4ICUgbSkgKyBtKSAlIG07XG59XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIGdpdmVuIGVsZW1lbnQgd2l0aCBpdCdzIHByZWRlY2Vzc29yIGFuZCBjaGVja3MgaWYgdGhlaXIgZW5kIHBvc2l0aW9uIGlzIHRoZSBzYW1lLlxuICogSWYgaXQgaXMsIGFkZCBhIGJvb2xlYW4gJ292ZXJsYXAnIHByb3BlcnR5IHRvIHRoZSBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBhcnJheSBlbGVtZW50cyBpbiBwbGFjZVxuICogQHBhcmFtIHthbnl9IGVsIENvbW1hbmQgb2JqZWN0XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggQ3VycmVudCBpdGVyYXRpb24gaW5kZXhcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKiBAcmV0dXJucyB7YW55fSBDb21tYW5kIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFya092ZXJsYXBwZWQoZWwsIGluZGV4LCBhcnJheSkge1xuICAvLyBTa2lwIHRoZSBmaXJzdCBtb3ZlVG8gY29tbWFuZCBhbmQgYW55IG90aGVyIHRoYXQncyBub3QgYSBsaW5lVG8uXG4gIGlmIChpbmRleCAhPT0gMCAmJiBlbC5tYXJrZXIgPT09ICdMJykge1xuICAgIC8vIEl0IHNlZW1zIHdlIGhhdmUgYSBsaW5lVG8gaGVyZS4gR2V0IHRoZSBpbW1lZGlhdGUgcHJldmlvdXMgY29tbWFuZFxuICAgIGxldCBwcmV2aW91cyA9IGFycmF5W2luZGV4IC0gMV07XG4gICAgLy8g4oCmYW5kIGNoZWNrIGlmIHRoZSB4LCB5IGNvb3JkaW5hdGVzIGFyZSBlcXVhbHMuXG4gICAgY29uc3Qgb3ZlcmxhcCA9IFsneCcsICd5J10uZXZlcnkoa2V5ID0+IHtcbiAgICAgIC8vIElmIHggQU5EIHkgb3ZlcmxhcCwgdGhpcyBjb21tYW5kIHNob3VsZCBiZSBza2lwcGVkXG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLmFicyhwcmV2aW91cy52YWx1ZXNba2V5XSAtIGVsLnZhbHVlc1trZXldKSkgPT09IDA7XG4gICAgfSk7XG5cbiAgICBpZiAob3ZlcmxhcCkge1xuICAgICAgZWwub3ZlcmxhcCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsO1xufVxuXG4vKipcbiAqIFNpbWlsYXIgcHVycG9zZSBhcyBtYXJrT3ZlcmxhcHBlZCgpLiBSZWN1cnNpdmVseSBtYXJrcyB0cmFpbGxpbmcgY29tbWFuZHMgdGhhdCBoYXZlIHRoZSBzYW1lIGVuZCBjb29yZGluYXRlIGFzIHRoZSBpbml0YWwgJ00nLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgYXJyYXkgaW4gcGxhY2UuXG4gKiBAcGFyYW0ge2FycmF5fSBjbWRzIENvbW1hbmRzIGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggT3B0aW9uYWwgc3RhcnQgaW5kZXggY291bnRpbmcgYmFja3dhcmRzLiBVc3VhbGx5IHRoZSBsYXN0IGluZGV4IGZyb20gdGhlIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlTWFya092ZXJsYXBwZWQoY21kcywgY291bnRlcikge1xuICBjb25zdCBvdmVybGFwID0gWyd4JywgJ3knXS5ldmVyeShrZXkgPT4ge1xuICAgIC8vIElmIHggQU5EIHkgb3ZlcmxhcCwgdGhpcyBjb21tYW5kIHNob3VsZCBiZSBza2lwcGVkXG4gICAgcmV0dXJuIChcbiAgICAgIE1hdGgucm91bmQoTWF0aC5hYnMoY21kc1tjb3VudGVyXS52YWx1ZXNba2V5XSAtIGNtZHNbMF0udmFsdWVzW2tleV0pKSA9PT1cbiAgICAgIDBcbiAgICApO1xuICB9KTtcblxuICBpZiAoY21kc1tjb3VudGVyXS5tYXJrZXIgPT09ICdMJyAmJiBvdmVybGFwKSB7XG4gICAgY21kc1tjb3VudGVyXS5vdmVybGFwID0gdHJ1ZTtcbiAgICByZXZlcnNlTWFya092ZXJsYXBwZWQoY21kcywgY291bnRlciAtIDEpO1xuICB9XG5cbiAgaWYgKGNtZHNbY291bnRlcl0ubWFya2VyID09PSAnWicpIHtcbiAgICByZXZlcnNlTWFya092ZXJsYXBwZWQoY21kcywgY291bnRlciAtIDEpO1xuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY3VycmVudCBjb21tYW5kIGFuZFxuICogaXQncyBkaXJlY3QgbmVpZ2hib3VycyBhbmQgcmV0dXJucyB0aGUgbmVhcmVzdCBkaXN0YW5jZVxuICogQHBhcmFtIHthbnl9IGVsIGN1cnJlbnQgY29tbWFuZFxuICogQHBhcmFtIHthbnl9IHByZXZpb3VzIHByZXZpb3VzIGNvbW1hbmRcbiAqIEBwYXJhbSB7YW55fSBuZXh0IG5leHQgY29tbWFuZFxuICogQHJldHVybnMge251bWJlcn0gdGhlIGRpc3RhbmNlIHRvIHRlaCBuZWFyZXN0IGNvbW1hbmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZXN0U2lkZShlbCwgcHJldmlvdXMsIG5leHQpIHtcbiAgY29uc3Qgbnh0U2lkZSA9IGdldERpc3RhbmNlKGVsLnZhbHVlcywgbmV4dC52YWx1ZXMpO1xuICBjb25zdCBwcnZTaWRlID0gZ2V0RGlzdGFuY2UocHJldmlvdXMudmFsdWVzLCBlbC52YWx1ZXMpO1xuICByZXR1cm4gTWF0aC5taW4ocHJ2U2lkZSwgbnh0U2lkZSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYW5nbGUgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge2FueX0gcDEgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge2FueX0gcDIgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBBbmdsZSBpbiByYWRpYW5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgcmV0dXJuIE1hdGguYXRhbjIocDIueCAtIHAxLngsIHAyLnkgLSBwMS55KTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7YW55fSBwMSBPYmplY3Qgd2l0aCB4IGFuZCB5IHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7YW55fSBwMiBPYmplY3Qgd2l0aCB4IGFuZCB5IHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gcG9pbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIpIHtcbiAgY29uc3QgeERpZmYgPSBwMS54IC0gcDIueDtcbiAgY29uc3QgeURpZmYgPSBwMS55IC0gcDIueTtcblxuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHhEaWZmLCAyKSArIE1hdGgucG93KHlEaWZmLCAyKSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSBvcHBvc2l0ZSBzaWRlXG4gKiBvZiBhIGdpdmVuIGFuZ2xlIHVzaW5nIHRoZSBoeXBvdGhlbnVzZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaXAgSHlwb3RoZW51c2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aCBvZiB0aGUgb3Bwb3NpdGUgc2lkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVMZW5ndGgoYW5nbGUsIGhpcCkge1xuICByZXR1cm4gTWF0aC5zaW4oYW5nbGUpICogaGlwO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGUgYWRqYWNlbnQgc2lkZVxuICogb2YgYSBnaXZlbiBhbmdsZSB1c2luZyB0aGUgaHlwb3RoZW51c2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gaGlwIEh5cG90aGVudXNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIGFkamFjZW50IHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFkamFjZW50TGVuZ3RoKGFuZ2xlLCBoaXApIHtcbiAgcmV0dXJuIE1hdGguY29zKGFuZ2xlKSAqIGhpcDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGphY2VudCBzaWRlIG9mIHRoZSBnaXZlblxuICogYW5nbGUgdXNpbmcgdGhlIGFuZ2xlJ3Mgb3Bwb3NpdGUgc2lkZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHBvc2l0ZSBvcHBvc2l0ZSBzaWRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIGFkamFjZW50IHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhbmdlbnRMZW5ndGgoYW5nbGUsIG9wcG9zaXRlKSB7XG4gIGNvbnN0IGEgPSBvcHBvc2l0ZSAvIE1hdGgudGFuKGFuZ2xlKTtcbiAgaWYgKGEgPT09IEluZmluaXR5IHx8IGEgPT09IC1JbmZpbml0eSB8fCBpc05hTihhKSkge1xuICAgIHJldHVybiBvcHBvc2l0ZTtcbiAgfVxuXG4gIHJldHVybiBhO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG9wcG9zaXRlIHNpZGUgb2YgdGhlIGdpdmVuXG4gKiBhbmdsZSB1c2luZyB0aGUgYW5nbGUncyBhZGphY2VudCBzaWRlXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgQW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFkamFjZW50IGFkamFjZW50IHNpZGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aCBvZiB0aGUgb3Bwb3NpdGUgc2lkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFuZ2VudE5vSHlwKGFuZ2xlLCBhZGphY2VudCkge1xuICByZXR1cm4gYWRqYWNlbnQgKiBNYXRoLnRhbihhbmdsZSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gc2hvcnRlbiB0aGVcbiAqIGRpc3RhbmNlIGJldHdlZW4gY29tbWFuZHMgYmFzZWQgb24gdGhlIGdpdmVuIHJhZGl1cyB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnMgYmV0d2VlbiBwb2ludHNcbiAqIEBwYXJhbSB7bnVtYmVyfSByIFJhZGl1cyBvZiB0aGUgYXJjIHRoYXQgc2hvdWxkIGZpdCBpbnNpZGUgdGhlIHRyaWFuZ2xlXG4gKiBAcmV0dXJucyB7YW55fSBPYmplY3QgY29udGFpbmluZyBvZmZzZXQgYW5kIHRoZSBhcmMncyBzd2VlcEZsYWdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9mZnNldChhbmdsZSwgcikge1xuICBsZXQgb2Zmc2V0O1xuICBsZXQgc3dlZXBGbGFnID0gMDtcbiAgbGV0IGRlZ3JlZXMgPSBhbmdsZSAqICgxODAgLyBNYXRoLlBJKTtcblxuICAvLyBzaGFycCBhbmdsZXNcbiAgaWYgKChkZWdyZWVzIDwgMCAmJiBkZWdyZWVzID49IC0xODApIHx8IChkZWdyZWVzID4gMTgwICYmIGRlZ3JlZXMgPCAzNjApKSB7XG4gICAgb2Zmc2V0ID0gZ2V0VGFuZ2VudExlbmd0aChhbmdsZSAvIDIsIC1yKTtcbiAgICAvLyBvYnR1c2UgYW5nbGVzXG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0ID0gZ2V0VGFuZ2VudExlbmd0aChhbmdsZSAvIDIsIHIpO1xuICAgIHN3ZWVwRmxhZyA9IDE7XG4gICAgaWYgKG9mZnNldCA9PT0gSW5maW5pdHkpIHtcbiAgICAgIG9mZnNldCA9IHI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvZmZzZXQsXG4gICAgc3dlZXBGbGFnXG4gIH07XG59XG5cbi8qKlxuICogT3JpZ2luYWxseSB0YWtlbiBmcm9tOiBodHRwOi8vYmwub2Nrcy5vcmcvYmFsaW50NDIvOGM5MzEwNjA1ZGY5MzA1YzQyYjNcbiAqIEBicmllZiBEZSBDYXN0ZWxqYXUncyBhbGdvcml0aG0gc3BsaXR0aW5nIG4tdGggZGVncmVlIEJlemllciBjdXJ2ZVxuICogQHJldHVybnMge2FycmF5fVxuICovXG5leHBvcnQgZnVuY3Rpb24gYnNwbGl0KHBvaW50cywgdDApIHtcbiAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGggLSAxOyAvLyBudW1iZXIgb2YgY29udHJvbCBwb2ludHNcbiAgY29uc3QgYiA9IFtdOyAvLyBjb2VmZmljaWVudHMgYXMgaW4gRGUgQ2FzdGVsamF1J3MgYWxnb3JpdGhtXG4gIGNvbnN0IHJlczEgPSBbXTsgLy8gZmlyc3QgY3VydmUgcmVzdWx0aW5nIGNvbnRyb2wgcG9pbnRzXG4gIGNvbnN0IHJlczIgPSBbXTsgLy8gc2Vjb25kIGN1cnZlIHJlc3VsdGluZyBjb250cm9sIHBvaW50c1xuICBjb25zdCB0MSA9IDEgLSB0MDtcblxuICAvLyBtdWx0aXBseSBwb2ludCB3aXRoIHNjYWxhciBmYWN0b3JcbiAgY29uc3QgcGYgPSBmdW5jdGlvbiAocCwgZikge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2goZiAqIHBbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICAvLyBhZGQgcG9pbnRzIGFzIHZlY3RvcnNcbiAgY29uc3QgcHAgPSBmdW5jdGlvbiAocDEsIHAyKSB7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbihwMS5sZW5ndGgsIHAyLmxlbmd0aCk7IGkrKykge1xuICAgICAgcmVzLnB1c2gocDFbaV0gKyBwMltpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgLy8gc2V0IG9yaWdpbmFsIGNvZWZmaWNpZW50czogYltpXVswXSA9IHBvaW50c1tpXVxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBuOyBpKyspIHtcbiAgICBwb2ludHNbaV0gPSB0eXBlb2YgcG9pbnRzW2ldID09ICdvYmplY3QnID8gcG9pbnRzW2ldIDogW3BvaW50c1tpXV07XG4gICAgYi5wdXNoKFtwb2ludHNbaV1dKTtcbiAgfVxuXG4gIC8vIGdldCBhbGwgY29lZmZpY2llbnRzXG4gIGZvciAobGV0IGogPSAxOyBqIDw9IG47IGorKykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG4gLSBqOyBpKyspIHtcbiAgICAgIGJbaV0ucHVzaChwcChwZihiW2ldW2ogLSAxXSwgdDEpLCBwZihiW2kgKyAxXVtqIC0gMV0sIHQwKSkpO1xuICAgIH1cbiAgfVxuICAvLyBzZXQgcmVzdWx0OiByZXMxICYgcmVzMlxuICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICByZXMxLnB1c2goYlswXVtqXSk7XG4gICAgcmVzMi5wdXNoKGJbal1bbiAtIGpdKTtcbiAgfVxuXG4gIHJldHVybiBbcmVzMSwgcmVzMl07XG59XG5cbi8qKlxuICogQ29uY2F0ZW5hdGVzIGNvbW1hbmRzIGluIGEgc3RyaW5nIGFuZCBlbnN1cmVzIHRoYXQgZWFjaFxuICogdmFsdWUgZnJvbSBlYWNoIGNvbW1hbmQgaXMgcHJpbnRlZCBpbiB0aGUgcmlnaHQgb3JkZXJcbiAqIEBwYXJhbSB7YXJyYXl9IGNtZHMgQXJyYXkgb2Ygc3ZnIGNvbW1hbmRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgY29udGFpbmluZyBhbGwgY29tbWFuZHMgZm9ybWF0ZWQgcmVhZHkgZm9yIHRoZSAnZCcgQXR0cmlidXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tYW5kc1RvU3ZnUGF0aChjbWRzKSB7XG4gIC8vIHdoZW4gd3JpdGluZyB0aGUgY29tbWFuZHMgYmFjaywgdGhlIHJlbGV2YW50IHZhbHVlcyBzaG91bGQgYmUgd3JpdHRlbiBpbiB0aGlzIG9yZGVyXG4gIGNvbnN0IHZhbHVlc09yZGVyID0gW1xuICAgICdyYWRpdXNYJyxcbiAgICAncmFkaXVzWScsXG4gICAgJ3JvdGF0aW9uJyxcbiAgICAnbGFyZ2VBcmMnLFxuICAgICdzd2VlcCcsXG4gICAgJ3gxJyxcbiAgICAneTEnLFxuICAgICd4MicsXG4gICAgJ3kyJyxcbiAgICAneCcsXG4gICAgJ3knXG4gIF07XG5cbiAgcmV0dXJuIGNtZHNcbiAgICAubWFwKGNtZCA9PiB7XG4gICAgICAvLyBkZWZhdWx0cyBmb3IgZW1wdHkgc3RyaW5nLCBzbyBaIHdpbGwgb3V0cHV0IG5vIHZhbHVlc1xuICAgICAgbGV0IGQgPSAnJztcbiAgICAgIC8vIGZpbHRlciBhbnkgY29tbWFuZCB0aGF0J3Mgbm90IFpcbiAgICAgIGlmIChjbWQubWFya2VyICE9PSAnWicpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB2YWx1ZXMgZnJvbSBjdXJyZW50IGNvbW1hbmRcbiAgICAgICAgY29uc3QgY21kS2V5cyA9IE9iamVjdC5rZXlzKGNtZC52YWx1ZXMpO1xuICAgICAgICAvLyBmaWx0ZXIgdGhlIHZhbHVlc09yZGVyIGFycmF5IGZvciBvbmx5IHRoZSB2YWx1ZXMgdGhhdCBhcHBlYXIgaW4gdGhlIGN1cnJlbnQgY29tbWFuZC5cbiAgICAgICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHZhbHVlc09yZGVyIGd1YXJhbnRlZXMgdGhhdCB0aGUgcmVsZXZhbnQgdmFsdWVzIHdpbGwgYmUgaW4gdGhlIHJpZ2h0IG9yZGVyXG4gICAgICAgIGQgPSB2YWx1ZXNPcmRlclxuICAgICAgICAgIC5maWx0ZXIodiA9PiBjbWRLZXlzLmluZGV4T2YodikgIT09IC0xKVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGtleSB3aXRoIGl0J3MgdmFsdWVcbiAgICAgICAgICAubWFwKGtleSA9PiBjbWQudmFsdWVzW2tleV0pXG4gICAgICAgICAgLy8gYW5kIHN0cmluZ2lmeSBldmVyeXRoaW5nIHRvZ2V0aGVyIHdpdGggYSBjb21tYSBpbmJldHdlZW4gdmFsdWVzXG4gICAgICAgICAgLmpvaW4oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgJHtjbWQubWFya2VyfSR7ZH1gO1xuICAgIH0pXG4gICAgLmpvaW4oJycpXG4gICAgLnRyaW0oKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgcm91bmRDb3JuZXJzIH0gZnJvbSAnLi4vbGliJztcbmltcG9ydCB7IGdldEFuZ2xlLCBnZXREaXN0YW5jZSB9IGZyb20gJy4uL2xpYi91dGlscyc7XG5cbmNvbnN0IHN2Z25zID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuY2xhc3MgU1ZHUHJldmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlU2VsZWN0b3IsIHBhdGhTZWxlY3Rvcikge1xuICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLmRvdFJhZGl1cyA9IDU7XG4gICAgdGhpcy5tb3VzZURvd25PZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLmFjdGl2ZURvdEluZGV4O1xuICAgIHRoaXMucmFkaXVzID0gMjA7XG5cbiAgICB0aGlzLnN0YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGFnZVNlbGVjdG9yKTtcbiAgICB0aGlzLnN0YWdlT2Zmc2V0ID0gdGhpcy5zdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhdGhTZWxlY3Rvcik7XG4gICAgLy8gdGhpcy5yYW5nZVNsaWRlciA9IHRoaXMucmFuZ2VTbGlkZXI7XG5cbiAgICAvLyBTZXQgdGhlIHN2ZyBzdGFnZSB0byBiZSB0aGUgc2FtZSBzaXplIG9mIHRoZSB3aW5kb3dcbiAgICB0aGlzLnN0YWdlLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aCk7XG4gICAgdGhpcy5zdGFnZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAvLyBjcmVhdGUgY2xvbmUgcGF0aCB0byBzaG93IHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gb3JpZ2luYWxcbiAgICAvLyBhbmQgcGF0aCB3aXRoIHJvdW5kZWQgY29ybmVycy5cbiAgICB0aGlzLmNsb25lID0gdGhpcy5wYXRoLmNsb25lTm9kZSgpO1xuICAgIHRoaXMuY2xvbmUuY2xhc3NMaXN0LmFkZCgnb3JpZ2luYWwnKTtcbiAgICB0aGlzLnBhdGguaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIHRoaXMuY2xvbmUpO1xuXG4gICAgdGhpcy5yYW5nZVNsaWRlciA9IG5ldyBSYW5nZVNsaWRlcignLmNvbnRyb2xsZXInLCB7fSk7XG4gICAgdGhpcy5yYW5nZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd1cGRhdGUnLCBldnQgPT4ge1xuICAgICAgdGhpcy5yYWRpdXMgPSBldnQuZGV0YWlsO1xuICAgICAgdGhpcy51cGRhdGVQYXRoKGV2dC5tZXRhS2V5KTtcbiAgICB9KTtcblxuICAgIC8vIGJpbmQgZXZlbnQgbGlzdGVuZXJzIHRvIHRoaXMgY2xhc3MgY29udGV4dFxuICAgIHRoaXMuZG90TW91c2VEb3duID0gdGhpcy5kb3RNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YWdlTW91c2VNb3ZlID0gdGhpcy5zdGFnZU1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuc3RhZ2VNb3VzZVVwID0gdGhpcy5zdGFnZU1vdXNlVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YWdlQ2xpY2sgPSB0aGlzLnN0YWdlQ2xpY2suYmluZCh0aGlzKTtcblxuICAgIHRoaXMuc3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnN0YWdlQ2xpY2spO1xuICB9XG5cbiAgdXBkYXRlUGF0aChjbG9zZWRQYXRoKSB7XG4gICAgLy8gYnVpbGQgdGhlIHN0cmluZ1xuICAgIGNvbnN0IGQgPVxuICAgICAgdGhpcy5jb21tYW5kcy5yZWR1Y2UoXG4gICAgICAgIChhY2MsIGN1cnIpID0+XG4gICAgICAgICAgKGFjYyArPSBgJHtjdXJyLm1hcmtlcn0ke2N1cnIudmFsdWVzLnh9LCR7Y3Vyci52YWx1ZXMueX1gKSxcbiAgICAgICAgJydcbiAgICAgICkgKyAoY2xvc2VkUGF0aCA/ICdaJyA6ICcnKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgcGF0aCdzXG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZSgnZCcsIGQpO1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtZCcsIGQpO1xuICAgIHRoaXMuY2xvbmUuc2V0QXR0cmlidXRlKCdkJywgZCk7XG5cbiAgICAvLyByb3VuZCB0aGUgY29ybmVyc1xuICAgIGNvbnN0IHJDb3JuZXJzID0gcm91bmRDb3JuZXJzKGQsIHRoaXMucmFkaXVzKTtcbiAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlKCdkJywgckNvcm5lcnMucGF0aCk7XG4gIH1cblxuICBkb3RNb3VzZURvd24oZXZ0KSB7XG4gICAgY29uc3QgZG90ID0gZXZ0LnRhcmdldDtcbiAgICB0aGlzLmFjdGl2ZURvdEluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoZG90KTtcbiAgICB0aGlzLm1vdXNlRG93bk9mZnNldCA9IHtcbiAgICAgIHg6XG4gICAgICAgIGV2dC5jbGllbnRYIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC5sZWZ0ICtcbiAgICAgICAgdGhpcy5kb3RSYWRpdXMgLVxuICAgICAgICBkb3QuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ2N4JyksXG4gICAgICB5OlxuICAgICAgICBldnQuY2xpZW50WSAtXG4gICAgICAgIHRoaXMuc3RhZ2VPZmZzZXQudG9wICtcbiAgICAgICAgdGhpcy5kb3RSYWRpdXMgLVxuICAgICAgICBkb3QuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ2N5JylcbiAgICB9O1xuXG4gICAgdGhpcy5zdGFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnN0YWdlTW91c2VNb3ZlKTtcbiAgICB0aGlzLnN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnN0YWdlTW91c2VVcCk7XG4gIH1cblxuICBzdGFnZU1vdXNlTW92ZShldnQpIHtcbiAgICBjb25zdCBkb3QgPSB0aGlzLmRvdHNbdGhpcy5hY3RpdmVEb3RJbmRleF07XG4gICAgY29uc3QgcGF0aENtZCA9IHRoaXMuY29tbWFuZHNbdGhpcy5hY3RpdmVEb3RJbmRleF0udmFsdWVzO1xuICAgIHBhdGhDbWQueCA9IGV2dC5jbGllbnRYIC0gdGhpcy5tb3VzZURvd25PZmZzZXQueDtcbiAgICBwYXRoQ21kLnkgPSBldnQuY2xpZW50WSAtIHRoaXMubW91c2VEb3duT2Zmc2V0Lnk7XG5cbiAgICB0aGlzLnVwZGF0ZVBhdGgoZXZ0Lm1ldGFLZXkpO1xuXG4gICAgZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeCcsIHBhdGhDbWQueCk7XG4gICAgZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeScsIHBhdGhDbWQueSk7XG4gIH1cblxuICBzdGFnZU1vdXNlVXAoKSB7XG4gICAgLy8gQ2xlYW51cFxuICAgIHRoaXMuc3RhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5zdGFnZU1vdXNlTW92ZSk7XG4gICAgdGhpcy5zdGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5zdGFnZU1vdXNlVXApO1xuICB9XG5cbiAgbmV3RG90KHgsIHkpIHtcbiAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnbnMsICdjaXJjbGUnKTtcbiAgICBkb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ2N4JywgeCk7XG4gICAgZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeScsIHkpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAncicsIHRoaXMuZG90UmFkaXVzKTtcbiAgICB0aGlzLnN0YWdlLmFwcGVuZENoaWxkKGRvdCk7XG5cbiAgICBkb3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5kb3RNb3VzZURvd24uYmluZCh0aGlzKSk7XG5cbiAgICByZXR1cm4gZG90O1xuICB9XG5cbiAgc3RhZ2VDbGljayhldnQpIHtcbiAgICAvLyBpZiBkcmFnZ2luZ1xuICAgIGlmIChldnQuc2hpZnRLZXkpIHJldHVybjtcblxuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMuY29tbWFuZHMubGVuZ3RoID8gJ0wnIDogJ00nO1xuICAgIGNvbnN0IHggPSBldnQuY2xpZW50WCAtIHRoaXMuc3RhZ2VPZmZzZXQubGVmdDtcbiAgICBjb25zdCB5ID0gZXZ0LmNsaWVudFkgLSB0aGlzLnN0YWdlT2Zmc2V0LnRvcDtcbiAgICB0aGlzLmNvbW1hbmRzLnB1c2goeyBtYXJrZXIsIHZhbHVlczogeyB4LCB5IH0gfSk7XG4gICAgdGhpcy5kb3RzLnB1c2godGhpcy5uZXdEb3QoeCwgeSkpO1xuICAgIHRoaXMudXBkYXRlUGF0aChldnQubWV0YUtleSk7XG4gIH1cbn1cblxuLy8gQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjb250cm9sbGluZyB0aGUgcmFkaXVzXG5jbGFzcyBSYW5nZVNsaWRlciBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgc2l6ZTogMjUwLFxuICAgICAgbWluUmFkaXVzOiAwLFxuICAgICAgbWF4UmFkaXVzOiA3MCxcbiAgICAgIHN0YXJ0UmFkaXVzOiAyMCxcbiAgICAgIGhhbmRsZVJhZGl1czogNVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLmRlZmF1bHRzLCAuLi5vcHRpb25zIH07XG4gICAgdGhpcy5tb3VzZURvd25PZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcblxuICAgIGNvbnN0IHN0ciA9IGBcbiAgICAgIDxzdmdcbiAgICAgICAgY2xhc3M9XCJyYWRpdXMtY29udHJvbFwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgICB3aWR0aD1cIiR7dGhpcy5vcHRpb25zLnNpemV9XCJcbiAgICAgICAgaGVpZ2h0PVwiJHt0aGlzLm9wdGlvbnMuc2l6ZX1cIlxuICAgICAgICB2aWV3UG9ydD1cIjAgMCAke3RoaXMub3B0aW9ucy5zaXplfSAke3RoaXMub3B0aW9ucy5zaXplfVwiXG4gICAgICA+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjeD1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyfVwiXG4gICAgICAgICAgY3k9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIHI9XCIke3RoaXMub3B0aW9ucy5zdGFydFJhZGl1c31cIlxuICAgICAgICAgIGNsYXNzPVwicmFkaXVzLWNvbnRyb2xfX2NpcmNsZVwiIC8+XG4gICAgICAgIDxsaW5lXG4gICAgICAgICAgeDE9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIHkxPVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICB4Mj1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyICsgdGhpcy5vcHRpb25zLnN0YXJ0UmFkaXVzfVwiXG4gICAgICAgICAgeTI9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIGNsYXNzPVwicmFkaXVzLWNvbnRyb2xfX2xpbmVcIlxuICAgICAgICAvPlxuICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgY3g9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMiArIHRoaXMub3B0aW9ucy5zdGFydFJhZGl1c31cIlxuICAgICAgICAgIGN5PVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICByPVwiJHt0aGlzLm9wdGlvbnMuaGFuZGxlUmFkaXVzfVwiXG4gICAgICAgICAgY2xhc3M9XCJyYWRpdXMtY29udHJvbF9faGFuZGxlXCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgIGA7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgLy8gTWFrZSB0aGUgcGFyZW50IG9mIHRoZSBmaXJzdCBkaXYgaW4gdGhlIGRvY3VtZW50IGJlY29tZXMgdGhlIGNvbnRleHQgbm9kZVxuICAgIHJhbmdlLnNlbGVjdE5vZGUoY29udGFpbmVyKTtcbiAgICB2YXIgZG9jdW1lbnRGcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudEZyYWdtZW50KTtcblxuICAgIC8vIEdldCByZWZlcmVuY2VzIHRvIHRoZSBwYXJ0cyB3ZSBuZWVkXG4gICAgdGhpcy5zdGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYWRpdXMtY29udHJvbCcpO1xuICAgIHRoaXMuY2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhZGl1cy1jb250cm9sX19jaXJjbGUnKTtcbiAgICB0aGlzLmxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFkaXVzLWNvbnRyb2xfX2xpbmUnKTtcbiAgICB0aGlzLmhhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYWRpdXMtY29udHJvbF9faGFuZGxlJyk7XG5cbiAgICB0aGlzLnN0YWdlT2Zmc2V0ID0gdGhpcy5zdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgYW5kIGJpbmQgdGhlIGNhbGxiYWNrcyB0byB0aGUgY2xhc3MgY29udGV4dFxuICAgIHRoaXMuZG9jTW91c2VNb3ZlID0gdGhpcy5kb2NNb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLmRvY01vdXNlVXAgPSB0aGlzLmRvY01vdXNlVXAuYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZU1vdXNlRG93biA9IHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmhhbmRsZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bik7XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oZXZ0KSB7XG4gICAgLy8gdGhlIHgveSBkaXN0YW5jZSBmcm9tIHRoZSBwb2ludGVyIHRvIHRoZSBjZW50ZXIgb2YgdGhlIGhhbmRsZVxuICAgIHRoaXMubW91c2VEb3duT2Zmc2V0ID0ge1xuICAgICAgeDpcbiAgICAgICAgZXZ0LmNsaWVudFggLVxuICAgICAgICB0aGlzLnN0YWdlT2Zmc2V0LnggK1xuICAgICAgICB0aGlzLm9wdGlvbnMuaGFuZGxlUmFkaXVzIC1cbiAgICAgICAgdGhpcy5oYW5kbGUuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ2N4JyksXG4gICAgICB5OlxuICAgICAgICBldnQuY2xpZW50WSAtXG4gICAgICAgIHRoaXMuc3RhZ2VPZmZzZXQueSArXG4gICAgICAgIHRoaXMub3B0aW9ucy5oYW5kbGVSYWRpdXMgLVxuICAgICAgICB0aGlzLmhhbmRsZS5nZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3knKVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY01vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jTW91c2VVcCk7XG4gIH1cblxuICBkb2NNb3VzZU1vdmUoZXZ0KSB7XG4gICAgY29uc3QgeCA9XG4gICAgICBldnQuY2xpZW50WCAtXG4gICAgICB0aGlzLnN0YWdlT2Zmc2V0LnggK1xuICAgICAgdGhpcy5vcHRpb25zLmhhbmRsZVJhZGl1cyAtXG4gICAgICB0aGlzLm1vdXNlRG93bk9mZnNldC54O1xuICAgIGNvbnN0IHkgPVxuICAgICAgZXZ0LmNsaWVudFkgLVxuICAgICAgdGhpcy5zdGFnZU9mZnNldC55ICtcbiAgICAgIHRoaXMub3B0aW9ucy5oYW5kbGVSYWRpdXMgLVxuICAgICAgdGhpcy5tb3VzZURvd25PZmZzZXQueTtcblxuICAgIGNvbnN0IHAxID0geyB4LCB5IH07XG4gICAgY29uc3QgcDIgPSB7IHg6IHRoaXMub3B0aW9ucy5zaXplIC8gMiwgeTogdGhpcy5vcHRpb25zLnNpemUgLyAyIH07XG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gY2VudGVyIG9mIHN0YWdlXG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1pbihnZXREaXN0YW5jZShwMSwgcDIpLCB0aGlzLm9wdGlvbnMubWF4UmFkaXVzKTtcblxuICAgIGNvbnN0IGFuZ2xlID0gZ2V0QW5nbGUocDEsIHAyKTtcbiAgICAvLyBUaGUgaGFuZGxlIHNob3VsZCBub3QgcGFzcyB0aGUgbWF4aW1hbCByYWRpdXMgZGVmaW5lZCBpbiBvcHRpb25zXG4gICAgY29uc3QgbWF4WCA9IC1NYXRoLnNpbihhbmdsZSkgKiBkaXN0YW5jZSArIHRoaXMub3B0aW9ucy5zaXplIC8gMjtcbiAgICBjb25zdCBtYXhZID0gLU1hdGguY29zKGFuZ2xlKSAqIGRpc3RhbmNlICsgdGhpcy5vcHRpb25zLnNpemUgLyAyO1xuXG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2N4JywgbWF4WCk7XG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2N5JywgbWF4WSk7XG5cbiAgICB0aGlzLmNpcmNsZS5zZXRBdHRyaWJ1dGUoJ3InLCBkaXN0YW5jZSk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgneDInLCBtYXhYKTtcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKCd5MicsIG1heFkpO1xuXG4gICAgLy8gRGlzcGF0Y2ggY3VzdG9tIEV2ZW50XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZScsIHsgZGV0YWlsOiBkaXN0YW5jZSB9KTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgZG9jTW91c2VVcCgpIHtcbiAgICAvLyBDbGVhbnVwXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2NNb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY01vdXNlVXApO1xuICB9XG59XG5cbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBuZXcgU1ZHUHJldmlldygnc3ZnJywgJ3BhdGgnKTtcbiAgfSk7XG59IGVsc2Uge1xuICBuZXcgU1ZHUHJldmlldygnc3ZnJywgJ3BhdGgnKTtcbn1cbiJdLCJuYW1lcyI6WyJnZXRBbmdsZSIsImdldE9wcG9zaXRlTGVuZ3RoIiwiZ2V0QWRqYWNlbnRMZW5ndGgiLCJjb21tYW5kc1RvU3ZnUGF0aCIsIm1hcmtPdmVybGFwcGVkIiwic2hvcnRlc3RTaWRlIiwicm91bmRWYWx1ZXMiLCJnZXRQcmV2aW91c05vWiIsImdldE5leHROb1oiLCJyZXZlcnNlTWFya092ZXJsYXBwZWQiLCJnZXRPZmZzZXQiLCJnZXRUYW5nZW50Tm9IeXAiLCJuZXdDb21tYW5kcyIsImNvbnZlcnRUb0Fic29sdXRlIiwicGFyc2VQYXRoIiwic3RyIiwibWFya2VyUmVnRXgiLCJkaWdpdFJlZ0V4IiwibWF0Y2hBbGwiLCJtYXAiLCJtYXRjaCIsIm1hcmtlciIsImluZGV4IiwicmVkdWNlUmlnaHQiLCJhY2MiLCJjdXIiLCJjaHVuayIsInN1YnN0cmluZyIsImxlbmd0aCIsImNvbmNhdCIsInN1YnN0ciIsInJldmVyc2UiLCJmbGF0TWFwIiwiY21kIiwidmFsdWVzIiwidmFscyIsInBhcnNlRmxvYXQiLCJyb3VuZENvbW1hbmRzIiwiY21kcyIsInIiLCJyb3VuZCIsInN1YnBhdGhzIiwibmV3Q21kcyIsImZvckVhY2giLCJlbCIsImUiLCJwdXNoIiwic3ViUGF0aENtZHMiLCJjbG9zZWRQYXRoIiwiZmlsdGVyIiwib3ZlcmxhcCIsImkiLCJhcnIiLCJsYXJnZUFyY0ZsYWciLCJwcmV2IiwibmV4dCIsImFuZ2xlUHJ2IiwiYW5nbGVOeHQiLCJhbmdsZSIsImRlZ3JlZXMiLCJNYXRoIiwiUEkiLCJzaG9ydGVzdCIsIm1heFJhZGl1cyIsImFicyIsInJhZGl1cyIsIm1pbiIsIm8iLCJvZmZzZXQiLCJzd2VlcEZsYWciLCJvcGVuRmlyc3RPckxhc3QiLCJwcmV2UG9pbnQiLCJ4IiwieSIsIm5leHRQb2ludCIsInRvRml4ZWQiLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uIiwibGFyZ2VBcmMiLCJzd2VlcCIsInBhdGgiLCJjb21tYW5kcyIsInJvdW5kQ29ybmVycyIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJhIiwiY291bnRlciIsInByZXZpb3VzIiwibW9kIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsIngxIiwieTEiLCJ4MiIsInkyIiwicmVjIiwibUJlZm9yZSIsIm0iLCJhcnJheSIsImV2ZXJ5Iiwibnh0U2lkZSIsImdldERpc3RhbmNlIiwicHJ2U2lkZSIsInAxIiwicDIiLCJhdGFuMiIsInhEaWZmIiwieURpZmYiLCJzcXJ0IiwicG93IiwiaGlwIiwic2luIiwiY29zIiwiZ2V0VGFuZ2VudExlbmd0aCIsIm9wcG9zaXRlIiwidGFuIiwiSW5maW5pdHkiLCJpc05hTiIsImFkamFjZW50IiwiYnNwbGl0IiwicG9pbnRzIiwidDAiLCJuIiwiYiIsInJlczEiLCJyZXMyIiwidDEiLCJwZiIsInAiLCJmIiwicmVzIiwicHAiLCJqIiwidmFsdWVzT3JkZXIiLCJkIiwiY21kS2V5cyIsInYiLCJpbmRleE9mIiwiam9pbiIsInRyaW0iLCJzdmducyIsIlNWR1ByZXZpZXciLCJjb25zdHJ1Y3RvciIsInN0YWdlU2VsZWN0b3IiLCJwYXRoU2VsZWN0b3IiLCJkb3RzIiwiZG90UmFkaXVzIiwibW91c2VEb3duT2Zmc2V0IiwiYWN0aXZlRG90SW5kZXgiLCJzdGFnZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YWdlT2Zmc2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2V0QXR0cmlidXRlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJyYW5nZVNsaWRlciIsIlJhbmdlU2xpZGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2dCIsImRldGFpbCIsInVwZGF0ZVBhdGgiLCJtZXRhS2V5IiwiZG90TW91c2VEb3duIiwiYmluZCIsInN0YWdlTW91c2VNb3ZlIiwic3RhZ2VNb3VzZVVwIiwic3RhZ2VDbGljayIsInJlZHVjZSIsImN1cnIiLCJyQ29ybmVycyIsImRvdCIsInRhcmdldCIsImNsaWVudFgiLCJsZWZ0IiwiZ2V0QXR0cmlidXRlTlMiLCJjbGllbnRZIiwidG9wIiwicGF0aENtZCIsInNldEF0dHJpYnV0ZU5TIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIm5ld0RvdCIsImNyZWF0ZUVsZW1lbnROUyIsImFwcGVuZENoaWxkIiwic2hpZnRLZXkiLCJFdmVudFRhcmdldCIsImNvbnRhaW5lclNlbGVjdG9yIiwib3B0aW9ucyIsImRlZmF1bHRzIiwic2l6ZSIsIm1pblJhZGl1cyIsInN0YXJ0UmFkaXVzIiwiaGFuZGxlUmFkaXVzIiwiY29udGFpbmVyIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2lyY2xlIiwibGluZSIsImhhbmRsZSIsImRvY01vdXNlTW92ZSIsImRvY01vdXNlVXAiLCJoYW5kbGVNb3VzZURvd24iLCJkaXN0YW5jZSIsIm1heFgiLCJtYXhZIiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJyZWFkeVN0YXRlIl0sInNvdXJjZVJvb3QiOiIifQ==