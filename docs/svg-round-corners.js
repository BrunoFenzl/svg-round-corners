/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parsePath": function() { return /* binding */ parsePath; },
/* harmony export */   "roundCommands": function() { return /* binding */ roundCommands; },
/* harmony export */   "roundCorners": function() { return /* binding */ roundCorners; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


/**
 * Parses the given command string and generates an array of parsed commands.
 * This function normalises all relative commands into absolute commands and
 * transforms h, H, v, V to L commands
 * @param {string} str Raw string from 'd' Attribute
 * @returns {array} Array of normalised commands
 */

function parsePath(str) {
  var markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
  var digitRegEx = /-?[0-9]*\.?\d+/g;
  return _toConsumableArray(str.matchAll(markerRegEx)).map(function (match) {
    return {
      marker: match[0],
      index: match.index
    };
  }).reduceRight(function (acc, cur) {
    var chunk = str.substring(cur.index, acc.length ? acc[acc.length - 1].index : str.length);
    return acc.concat([{
      marker: cur.marker,
      index: cur.index,
      chunk: chunk.length > 0 ? chunk.substr(1, chunk.length - 1) : chunk
    }]);
  }, []).reverse().flatMap(function (cmd) {
    var values = cmd.chunk.match(digitRegEx);
    var vals = values ? values.map(parseFloat) : [];
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
  var subpaths = [];
  var newCmds = [];

  if (round) {
    cmds.forEach(function (el) {
      return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.roundValues)(el, round);
    }); // roundValues(cmds, round);
  }

  cmds // split sub paths
  .forEach(function (e, i, a) {
    if (e.marker === 'M') {
      subpaths.push([]);
    }

    subpaths[subpaths.length - 1].push(e);
  });
  subpaths.forEach(function (subPathCmds) {
    subPathCmds // We are only excluding lineTo commands that may be overlapping
    .map(_utils_js__WEBPACK_IMPORTED_MODULE_0__.markOverlapped);
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.reverseMarkOverlapped)(subPathCmds, subPathCmds.length - 1); // is this an open or closed path? don't add arcs to start/end.

    var closedPath = subPathCmds[subPathCmds.length - 1].marker == 'Z';
    subPathCmds.filter(function (el) {
      return !el.overlap;
    }).map(function (el, i, arr) {
      var largeArcFlag = 0;
      var prev = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getPreviousNoZ)(el, i, arr);
      var next = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getNextNoZ)(el, i, arr);
      var anglePrv = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAngle)(el.values, prev.values);
      var angleNxt = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAngle)(el.values, next.values);
      var angle = angleNxt - anglePrv; // radians

      var degrees = angle * (180 / Math.PI); // prevent arc crossing the next command

      var shortest = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.shortestSide)(el, prev, next);
      var maxRadius = Math.abs((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getTangentNoHyp)(angle / 2, shortest / 2));
      var radius = Math.min(r, maxRadius);
      var o = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOffset)(angle, radius);
      var offset = o.offset;
      var sweepFlag = o.sweepFlag;
      var openFirstOrLast = (i == 0 || i == arr.length - 1) && !closedPath;

      switch (el.marker) {
        case 'M': // moveTo x,y

        case 'L':
          // lineTo x,y
          var prevPoint = [el.values.x + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOppositeLength)(anglePrv, offset), el.values.y + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAdjacentLength)(anglePrv, offset)];
          var nextPoint = [el.values.x + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getOppositeLength)(angleNxt, offset), el.values.y + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getAdjacentLength)(angleNxt, offset)]; // there only need be a curve if and only if the next marker is a corner

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
  return roundCommands(_toConsumableArray(parsePath(str)), r, round);
}



/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bsplit": function() { return /* binding */ bsplit; },
/* harmony export */   "commandsToSvgPath": function() { return /* binding */ commandsToSvgPath; },
/* harmony export */   "convertToAbsolute": function() { return /* binding */ convertToAbsolute; },
/* harmony export */   "getAdjacentLength": function() { return /* binding */ getAdjacentLength; },
/* harmony export */   "getAngle": function() { return /* binding */ getAngle; },
/* harmony export */   "getDistance": function() { return /* binding */ getDistance; },
/* harmony export */   "getNextNoZ": function() { return /* binding */ getNextNoZ; },
/* harmony export */   "getOffset": function() { return /* binding */ getOffset; },
/* harmony export */   "getOppositeLength": function() { return /* binding */ getOppositeLength; },
/* harmony export */   "getPreviousNoZ": function() { return /* binding */ getPreviousNoZ; },
/* harmony export */   "getTangentLength": function() { return /* binding */ getTangentLength; },
/* harmony export */   "getTangentNoHyp": function() { return /* binding */ getTangentNoHyp; },
/* harmony export */   "markOverlapped": function() { return /* binding */ markOverlapped; },
/* harmony export */   "mod": function() { return /* binding */ mod; },
/* harmony export */   "newCommands": function() { return /* binding */ newCommands; },
/* harmony export */   "reverseMarkOverlapped": function() { return /* binding */ reverseMarkOverlapped; },
/* harmony export */   "roundValues": function() { return /* binding */ roundValues; },
/* harmony export */   "shortestSide": function() { return /* binding */ shortestSide; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/**
 * Round the values of each command to the given number of decimals.
 * This function modifies the object in place.
 * @param {array} cmds Sequence of commands
 * @param {number} round Number of decimal place to be rounded
 * @returns {array} Sequence of commands with their values rounded
 */
function roundValues(el, round) {
  Object.keys(el.values).forEach(function (key) {
    return el.values[key] = el.values[key] && parseFloat(el.values[key].toFixed(round));
  });
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
  var counter = i - 1;
  var previous = a[mod(counter, a.length)];

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
  var counter = i + 1;
  var next = a[mod(counter, a.length)];

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
  var prev = arr[index - 1] || {
    values: {
      x: 0,
      y: 0
    }
  }; // only need to test lowercase (relative) commands

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
    } // H/V uppercase need to be converted too. Convert to L and add missing value

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
    var rec = function rec(arr, i) {
      if (arr[i].marker === 'M') {
        return arr[i];
      } else {
        return rec(arr, i - 1);
      }
    };

    var mBefore = rec(arr, index);
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
  var cmds = [];

  switch (marker.toUpperCase()) {
    case 'M':
      // moveTo x,y
      for (var i = 0; i < values.length; i += 2) {
        var m = void 0;

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
      for (var _i = 0; _i < values.length; _i += 2) {
        cmds.push({
          marker: marker,
          values: {
            x: values[_i],
            y: values[_i + 1]
          }
        });
      }

      break;

    case 'H':
      // horizontalTo x
      for (var _i2 = 0; _i2 < values.length; _i2++) {
        cmds.push({
          marker: marker,
          values: {
            x: values[_i2],
            y: 0
          }
        });
      }

      break;

    case 'V':
      // verticalTo y
      for (var _i3 = 0; _i3 < values.length; _i3++) {
        cmds.push({
          marker: marker,
          values: {
            x: 0,
            y: values[_i3]
          }
        });
      }

      break;

    case 'C':
      // cubic beziér curve x1 y1, x2 y2, x y
      for (var _i4 = 0; _i4 < values.length; _i4 += 6) {
        cmds.push({
          marker: marker,
          values: {
            x1: values[_i4],
            y1: values[_i4 + 1],
            x2: values[_i4 + 2],
            y2: values[_i4 + 3],
            x: values[_i4 + 4],
            y: values[_i4 + 5]
          }
        });
      }

      break;

    case 'S':
      for (var _i5 = 0; _i5 < values.length; _i5 += 4) {
        cmds.push({
          marker: marker,
          values: {
            x2: values[_i5],
            y2: values[_i5 + 1],
            x: values[_i5 + 2],
            y: values[_i5 + 3]
          }
        });
      }

      break;

    case 'Q':
      for (var _i6 = 0; _i6 < values.length; _i6 += 4) {
        cmds.push({
          marker: marker,
          values: {
            x1: values[_i6],
            y1: values[_i6 + 1],
            x: values[_i6 + 2],
            y: values[_i6 + 3]
          }
        });
      }

      break;

    case 'T':
      for (var _i7 = 0; _i7 < values.length; _i7 += 2) {
        cmds.push({
          marker: marker,
          values: {
            x: values[_i7],
            y: values[_i7 + 1]
          }
        });
      }

      break;

    case 'A':
      for (var _i8 = 0; _i8 < values.length; _i8 += 7) {
        cmds.push({
          marker: marker,
          values: {
            radiusX: values[_i8],
            radiusY: values[_i8 + 1],
            rotation: values[_i8 + 2],
            largeArc: values[_i8 + 3],
            sweep: values[_i8 + 4],
            x: values[_i8 + 5],
            y: values[_i8 + 6]
          }
        });
      }

      break;

    case 'Z':
      cmds.push({
        marker: marker,
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
    var previous = array[index - 1]; // …and check if the x, y coordinates are equals.

    var overlap = ['x', 'y'].every(function (key) {
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
  var overlap = ['x', 'y'].every(function (key) {
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
  var nxtSide = getDistance(el.values, next.values);
  var prvSide = getDistance(previous.values, el.values);
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
  var xDiff = p1.x - p2.x;
  var yDiff = p1.y - p2.y;
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
  var a = opposite / Math.tan(angle);

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
  var offset;
  var sweepFlag = 0;
  var degrees = angle * (180 / Math.PI); // sharp angles

  if (degrees < 0 && degrees >= -180 || degrees > 180 && degrees < 360) {
    offset = getTangentLength(angle / 2, -r); // obtuse angles
  } else {
    offset = getTangentLength(angle / 2, r);
    sweepFlag = 1;

    if (offset === Infinity) {
      offset = r;
    }
  }

  return {
    offset: offset,
    sweepFlag: sweepFlag
  };
}
/**
 * Originally taken from: http://bl.ocks.org/balint42/8c9310605df9305c42b3
 * @brief De Casteljau's algorithm splitting n-th degree Bezier curve
 * @returns {array}
 */

function bsplit(points, t0) {
  var n = points.length - 1; // number of control points

  var b = []; // coefficients as in De Casteljau's algorithm

  var res1 = []; // first curve resulting control points

  var res2 = []; // second curve resulting control points

  var t1 = 1 - t0; // multiply point with scalar factor

  var pf = function pf(p, f) {
    var res = [];

    for (var i = 0; i < p.length; i++) {
      res.push(f * p[i]);
    }

    return res;
  }; // add points as vectors


  var pp = function pp(p1, p2) {
    var res = [];

    for (var i = 0; i < Math.min(p1.length, p2.length); i++) {
      res.push(p1[i] + p2[i]);
    }

    return res;
  }; // set original coefficients: b[i][0] = points[i]


  for (var i = 0; i <= n; i++) {
    points[i] = _typeof(points[i]) == 'object' ? points[i] : [points[i]];
    b.push([points[i]]);
  } // get all coefficients


  for (var j = 1; j <= n; j++) {
    for (var _i9 = 0; _i9 <= n - j; _i9++) {
      b[_i9].push(pp(pf(b[_i9][j - 1], t1), pf(b[_i9 + 1][j - 1], t0)));
    }
  } // set result: res1 & res2


  for (var _j = 0; _j <= n; _j++) {
    res1.push(b[0][_j]);
    res2.push(b[_j][n - _j]);
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
  var valuesOrder = ['radiusX', 'radiusY', 'rotation', 'largeArc', 'sweep', 'x1', 'y1', 'x2', 'y2', 'x', 'y'];
  return cmds.map(function (cmd) {
    // defaults for empty string, so Z will output no values
    var d = ''; // filter any command that's not Z

    if (cmd.marker !== 'Z') {
      // get all values from current command
      var cmdKeys = Object.keys(cmd.values); // filter the valuesOrder array for only the values that appear in the current command.
      // We do this because valuesOrder guarantees that the relevant values will be in the right order

      d = valuesOrder.filter(function (v) {
        return cmdKeys.indexOf(v) !== -1;
      }) // replace the key with it's value
      .map(function (key) {
        return cmd.values[key];
      }) // and stringify everything together with a comma inbetween values
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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./demo/main.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./lib/index.js");
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils */ "./lib/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var svgns = 'http://www.w3.org/2000/svg';

var SVGPreview = /*#__PURE__*/function () {
  function SVGPreview(stageSelector, pathSelector) {
    var _this = this;

    _classCallCheck(this, SVGPreview);

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
    this.rangeSlider = this.rangeSlider; // Set the svg stage to be the same size of the window

    this.stage.setAttribute('width', window.innerWidth);
    this.stage.setAttribute('height', window.innerHeight); // create clone path to show the difference between original
    // and path with rounded corners.

    this.clone = this.path.cloneNode();
    this.clone.classList.add('original');
    this.path.insertAdjacentElement('beforebegin', this.clone);
    this.rangeSlider = new RangeSlider('.controller', {});
    this.rangeSlider.addEventListener('update', function (evt) {
      _this.radius = evt.detail;

      _this.updatePath(evt.metaKey);
    }); // bind event listeners to this class context

    this.dotMouseDown = this.dotMouseDown.bind(this);
    this.stageMouseMove = this.stageMouseMove.bind(this);
    this.stageMouseUp = this.stageMouseUp.bind(this);
    this.stageClick = this.stageClick.bind(this);
    this.stage.addEventListener('click', this.stageClick);
  }

  _createClass(SVGPreview, [{
    key: "updatePath",
    value: function updatePath(closedPath) {
      // build the string
      var d = this.commands.reduce(function (acc, curr) {
        return acc += "".concat(curr.marker).concat(curr.values.x, ",").concat(curr.values.y);
      }, '') + (closedPath ? 'Z' : ''); // update the path's

      this.path.setAttribute('d', d);
      this.path.setAttribute('data-original-d', d);
      this.clone.setAttribute('d', d); // round the corners

      var rCorners = (0,_lib__WEBPACK_IMPORTED_MODULE_0__.roundCorners)(d, this.radius);
      this.path.setAttribute('d', rCorners.path);
    }
  }, {
    key: "dotMouseDown",
    value: function dotMouseDown(evt) {
      var dot = evt.target;
      this.activeDotIndex = this.dots.indexOf(dot);
      this.mouseDownOffset = {
        x: evt.clientX - this.stageOffset.left + this.dotRadius - dot.getAttributeNS(null, 'cx'),
        y: evt.clientY - this.stageOffset.top + this.dotRadius - dot.getAttributeNS(null, 'cy')
      };
      this.stage.addEventListener('mousemove', this.stageMouseMove);
      this.stage.addEventListener('mouseup', this.stageMouseUp);
    }
  }, {
    key: "stageMouseMove",
    value: function stageMouseMove(evt) {
      var dot = this.dots[this.activeDotIndex];
      var pathCmd = this.commands[this.activeDotIndex].values;
      pathCmd.x = evt.clientX - this.mouseDownOffset.x;
      pathCmd.y = evt.clientY - this.mouseDownOffset.y;
      this.updatePath(evt.metaKey);
      dot.setAttributeNS(null, 'cx', pathCmd.x);
      dot.setAttributeNS(null, 'cy', pathCmd.y);
    }
  }, {
    key: "stageMouseUp",
    value: function stageMouseUp(evt) {
      // Cleanup
      this.stage.removeEventListener('mousemove', this.stageMouseMove);
      this.stage.removeEventListener('mouseup', this.stageMouseUp);
    }
  }, {
    key: "newDot",
    value: function newDot(x, y) {
      var dot = document.createElementNS(svgns, 'circle');
      dot.setAttributeNS(null, 'cx', x);
      dot.setAttributeNS(null, 'cy', y);
      dot.setAttributeNS(null, 'r', this.dotRadius);
      this.stage.appendChild(dot);
      dot.addEventListener('mousedown', this.dotMouseDown.bind(this));
      return dot;
    }
  }, {
    key: "stageClick",
    value: function stageClick(evt) {
      // if dragging
      if (evt.shiftKey) return;
      var marker = this.commands.length ? 'L' : 'M';
      var x = evt.clientX - this.stageOffset.left;
      var y = evt.clientY - this.stageOffset.top;
      this.commands.push({
        marker: marker,
        values: {
          x: x,
          y: y
        }
      });
      this.dots.push(this.newDot(x, y));
      this.updatePath(evt.metaKey);
    }
  }]);

  return SVGPreview;
}(); // Component responsible for controlling the radius


var RangeSlider = /*#__PURE__*/function (_EventTarget) {
  _inherits(RangeSlider, _EventTarget);

  var _super = _createSuper(RangeSlider);

  function RangeSlider(containerSelector, options) {
    var _this2;

    _classCallCheck(this, RangeSlider);

    _this2 = _super.call(this);
    var defaults = {
      size: 250,
      minRadius: 0,
      maxRadius: 70,
      startRadius: 20,
      handleRadius: 5
    };
    _this2.options = _objectSpread(_objectSpread({}, defaults), options);
    _this2.mouseDownOffset = {
      x: 0,
      y: 0
    };
    var str = "\n      <svg\n        class=\"radius-control\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n        xmlns:xlink=\"http://www.w3.org/1999/xlink\"\n        width=\"".concat(_this2.options.size, "\"\n        height=\"").concat(_this2.options.size, "\"\n        viewPort=\"0 0 ").concat(_this2.options.size, " ").concat(_this2.options.size, "\"\n      >\n        <circle\n          cx=\"").concat(_this2.options.size / 2, "\"\n          cy=\"").concat(_this2.options.size / 2, "\"\n          r=\"").concat(_this2.options.startRadius, "\"\n          class=\"radius-control__circle\" />\n        <line\n          x1=\"").concat(_this2.options.size / 2, "\"\n          y1=\"").concat(_this2.options.size / 2, "\"\n          x2=\"").concat(_this2.options.size / 2 + _this2.options.startRadius, "\"\n          y2=\"").concat(_this2.options.size / 2, "\"\n          class=\"radius-control__line\"\n        />\n        <circle\n          cx=\"").concat(_this2.options.size / 2 + _this2.options.startRadius, "\"\n          cy=\"").concat(_this2.options.size / 2, "\"\n          r=\"").concat(_this2.options.handleRadius, "\"\n          class=\"radius-control__handle\" />\n      </svg>\n    ");
    var container = document.querySelector(containerSelector);
    var range = document.createRange(); // Make the parent of the first div in the document becomes the context node

    range.selectNode(container);
    var documentFragment = range.createContextualFragment(str);
    container.appendChild(documentFragment); // Get references to the parts we need

    _this2.stage = document.querySelector('.radius-control');
    _this2.circle = document.querySelector('.radius-control__circle');
    _this2.line = document.querySelector('.radius-control__line');
    _this2.handle = document.querySelector('.radius-control__handle');
    _this2.stageOffset = _this2.stage.getBoundingClientRect(); // Add event listeners and bind the callbacks to the class context

    _this2.docMouseMove = _this2.docMouseMove.bind(_assertThisInitialized(_this2));
    _this2.docMouseUp = _this2.docMouseUp.bind(_assertThisInitialized(_this2));
    _this2.handleMouseDown = _this2.handleMouseDown.bind(_assertThisInitialized(_this2));

    _this2.handle.addEventListener('mousedown', _this2.handleMouseDown);

    return _this2;
  }

  _createClass(RangeSlider, [{
    key: "handleMouseDown",
    value: function handleMouseDown(evt) {
      // the x/y distance from the pointer to the center of the handle
      this.mouseDownOffset = {
        x: evt.clientX - this.stageOffset.x + this.options.handleRadius - this.handle.getAttributeNS(null, 'cx'),
        y: evt.clientY - this.stageOffset.y + this.options.handleRadius - this.handle.getAttributeNS(null, 'cy')
      };
      document.addEventListener('mousemove', this.docMouseMove);
      document.addEventListener('mouseup', this.docMouseUp);
    }
  }, {
    key: "docMouseMove",
    value: function docMouseMove(evt) {
      var x = evt.clientX - this.stageOffset.x + this.options.handleRadius - this.mouseDownOffset.x;
      var y = evt.clientY - this.stageOffset.y + this.options.handleRadius - this.mouseDownOffset.y;
      var p1 = {
        x: x,
        y: y
      };
      var p2 = {
        x: this.options.size / 2,
        y: this.options.size / 2
      }; // get distance from center of stage

      var distance = Math.min((0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.getDistance)(p1, p2), this.options.maxRadius);
      var angle = (0,_lib_utils__WEBPACK_IMPORTED_MODULE_1__.getAngle)(p1, p2); // The handle should not pass the maximal radius defined in options

      var maxX = -Math.sin(angle) * distance + this.options.size / 2;
      var maxY = -Math.cos(angle) * distance + this.options.size / 2;
      this.handle.setAttributeNS(null, 'cx', maxX);
      this.handle.setAttributeNS(null, 'cy', maxY);
      this.circle.setAttribute('r', distance);
      this.line.setAttribute('x2', maxX);
      this.line.setAttribute('y2', maxY); // Dispatch custom Event

      var event = new CustomEvent('update', {
        detail: distance
      });
      this.dispatchEvent(event);
    }
  }, {
    key: "docMouseUp",
    value: function docMouseUp() {
      // Cleanup
      document.removeEventListener('mousemove', this.docMouseMove);
      document.removeEventListener('mouseup', this.docMouseUp);
    }
  }]);

  return RangeSlider;
}( /*#__PURE__*/_wrapNativeSuper(EventTarget));

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    new SVGPreview('svg', 'path');
  });
} else {
  new SVGPreview('svg', 'path');
}
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0Q7OztXQUVELHNCQUFhO01BQ1g7TUFDQWhFLFFBQVEsQ0FBQ3FDLG1CQUFULENBQTZCLFdBQTdCLEVBQTBDLEtBQUtxQixZQUEvQztNQUNBMUQsUUFBUSxDQUFDcUMsbUJBQVQsQ0FBNkIsU0FBN0IsRUFBd0MsS0FBS3NCLFVBQTdDO0lBQ0Q7Ozs7aUNBM0h1QlE7O0FBOEgxQixJQUFJbkUsUUFBUSxDQUFDb0UsVUFBVCxLQUF3QixTQUE1QixFQUF1QztFQUNyQ3BFLFFBQVEsQ0FBQ2UsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07SUFDbEQsSUFBSXZCLFVBQUosQ0FBZSxLQUFmLEVBQXNCLE1BQXRCO0VBQ0QsQ0FGRDtBQUdELENBSkQsTUFJTztFQUNMLElBQUlBLFVBQUosQ0FBZSxLQUFmLEVBQXNCLE1BQXRCO0FBQ0QsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3N2Zy1yb3VuZC1jb3JuZXJzLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovL3N2Zy1yb3VuZC1jb3JuZXJzLy4vbGliL3V0aWxzLmpzIiwid2VicGFjazovL3N2Zy1yb3VuZC1jb3JuZXJzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3N2Zy1yb3VuZC1jb3JuZXJzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zdmctcm91bmQtY29ybmVycy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3N2Zy1yb3VuZC1jb3JuZXJzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vc3ZnLXJvdW5kLWNvcm5lcnMvLi9kZW1vL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgZ2V0QW5nbGUsXG4gIGdldE9wcG9zaXRlTGVuZ3RoLFxuICBnZXRBZGphY2VudExlbmd0aCxcbiAgY29tbWFuZHNUb1N2Z1BhdGgsXG4gIG1hcmtPdmVybGFwcGVkLFxuICBzaG9ydGVzdFNpZGUsXG4gIHJvdW5kVmFsdWVzLFxuICBnZXRQcmV2aW91c05vWixcbiAgZ2V0TmV4dE5vWixcbiAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkLFxuICBic3BsaXQsXG4gIGdldERpc3RhbmNlLFxuICBnZXRPZmZzZXQsXG4gIGdldFRhbmdlbnROb0h5cCxcbiAgbmV3Q29tbWFuZHMsXG4gIGNvbnZlcnRUb0Fic29sdXRlXG59IGZyb20gJy4vdXRpbHMuanMnO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gY29tbWFuZCBzdHJpbmcgYW5kIGdlbmVyYXRlcyBhbiBhcnJheSBvZiBwYXJzZWQgY29tbWFuZHMuXG4gKiBUaGlzIGZ1bmN0aW9uIG5vcm1hbGlzZXMgYWxsIHJlbGF0aXZlIGNvbW1hbmRzIGludG8gYWJzb2x1dGUgY29tbWFuZHMgYW5kXG4gKiB0cmFuc2Zvcm1zIGgsIEgsIHYsIFYgdG8gTCBjb21tYW5kc1xuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBSYXcgc3RyaW5nIGZyb20gJ2QnIEF0dHJpYnV0ZVxuICogQHJldHVybnMge2FycmF5fSBBcnJheSBvZiBub3JtYWxpc2VkIGNvbW1hbmRzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUGF0aChzdHIpIHtcbiAgY29uc3QgbWFya2VyUmVnRXggPSAvW01tTGxTc1FxTGxIaFZ2Q2NTc1FxVHRBYVp6XS9nO1xuICBjb25zdCBkaWdpdFJlZ0V4ID0gLy0/WzAtOV0qXFwuP1xcZCsvZztcblxuICByZXR1cm4gWy4uLnN0ci5tYXRjaEFsbChtYXJrZXJSZWdFeCldXG4gICAgLm1hcChtYXRjaCA9PiB7XG4gICAgICByZXR1cm4geyBtYXJrZXI6IG1hdGNoWzBdLCBpbmRleDogbWF0Y2guaW5kZXggfTtcbiAgICB9KVxuICAgIC5yZWR1Y2VSaWdodCgoYWNjLCBjdXIpID0+IHtcbiAgICAgIGNvbnN0IGNodW5rID0gc3RyLnN1YnN0cmluZyhcbiAgICAgICAgY3VyLmluZGV4LFxuICAgICAgICBhY2MubGVuZ3RoID8gYWNjW2FjYy5sZW5ndGggLSAxXS5pbmRleCA6IHN0ci5sZW5ndGhcbiAgICAgICk7XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdChbXG4gICAgICAgIHtcbiAgICAgICAgICBtYXJrZXI6IGN1ci5tYXJrZXIsXG4gICAgICAgICAgaW5kZXg6IGN1ci5pbmRleCxcbiAgICAgICAgICBjaHVuazogY2h1bmsubGVuZ3RoID4gMCA/IGNodW5rLnN1YnN0cigxLCBjaHVuay5sZW5ndGggLSAxKSA6IGNodW5rXG4gICAgICAgIH1cbiAgICAgIF0pO1xuICAgIH0sIFtdKVxuICAgIC5yZXZlcnNlKClcbiAgICAuZmxhdE1hcChjbWQgPT4ge1xuICAgICAgY29uc3QgdmFsdWVzID0gY21kLmNodW5rLm1hdGNoKGRpZ2l0UmVnRXgpO1xuICAgICAgY29uc3QgdmFscyA9IHZhbHVlcyA/IHZhbHVlcy5tYXAocGFyc2VGbG9hdCkgOiBbXTtcbiAgICAgIHJldHVybiBuZXdDb21tYW5kcyhjbWQubWFya2VyLCB2YWxzKTtcbiAgICB9KVxuICAgIC5tYXAoY29udmVydFRvQWJzb2x1dGUpO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggYW4gYXJyYXkgb2Ygbm9ybWFsaXNlZCBjb21tYW5kcyBhbmQgaW5zZXJ0IGFyY3Mgd2hlcmUgYXBwbGljYWJsZS5cbiAqIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIGFycmF5IGluIHBsYWNlLlxuICogQHBhcmFtIHthcnJheX0gX2NtZHMgQXJyYXkgd2l0aCBjb21tYW5kcyB0byBiZSBtb2RpZmllZFxuICogQHBhcmFtIHtudW1iZXJ9IHIgRXhwZWN0ZWQgcmFkaXVzIG9mIHRoZSBhcmNzLlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kIE51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyB0byByb3VuZCB2YWx1ZXNcbiAqIEByZXR1cm5zIHthcnJheX0gU2VxdWVuY2Ugb2YgY29tbWFuZHMgY29udGFpbmluZyBhcmNzIGluIHBsYWNlIG9mIGNvcm5lcnNcbiAqL1xuZnVuY3Rpb24gcm91bmRDb21tYW5kcyhjbWRzLCByLCByb3VuZCkge1xuICBsZXQgc3VicGF0aHMgPSBbXTtcbiAgbGV0IG5ld0NtZHMgPSBbXTtcblxuICBpZiAocm91bmQpIHtcbiAgICBjbWRzLmZvckVhY2goZWwgPT4gcm91bmRWYWx1ZXMoZWwsIHJvdW5kKSk7XG4gICAgLy8gcm91bmRWYWx1ZXMoY21kcywgcm91bmQpO1xuICB9XG5cbiAgY21kc1xuICAgIC8vIHNwbGl0IHN1YiBwYXRoc1xuICAgIC5mb3JFYWNoKChlLCBpLCBhKSA9PiB7XG4gICAgICBpZiAoZS5tYXJrZXIgPT09ICdNJykge1xuICAgICAgICBzdWJwYXRocy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIHN1YnBhdGhzW3N1YnBhdGhzLmxlbmd0aCAtIDFdLnB1c2goZSk7XG4gICAgfSk7XG5cbiAgc3VicGF0aHMuZm9yRWFjaChzdWJQYXRoQ21kcyA9PiB7XG4gICAgc3ViUGF0aENtZHNcbiAgICAgIC8vIFdlIGFyZSBvbmx5IGV4Y2x1ZGluZyBsaW5lVG8gY29tbWFuZHMgdGhhdCBtYXkgYmUgb3ZlcmxhcHBpbmdcbiAgICAgIC5tYXAobWFya092ZXJsYXBwZWQpO1xuXG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKHN1YlBhdGhDbWRzLCBzdWJQYXRoQ21kcy5sZW5ndGggLSAxKTtcblxuICAgIC8vIGlzIHRoaXMgYW4gb3BlbiBvciBjbG9zZWQgcGF0aD8gZG9uJ3QgYWRkIGFyY3MgdG8gc3RhcnQvZW5kLlxuICAgIGNvbnN0IGNsb3NlZFBhdGggPSBzdWJQYXRoQ21kc1tzdWJQYXRoQ21kcy5sZW5ndGggLSAxXS5tYXJrZXIgPT0gJ1onO1xuICAgIHN1YlBhdGhDbWRzXG4gICAgICAuZmlsdGVyKGVsID0+ICFlbC5vdmVybGFwKVxuICAgICAgLm1hcCgoZWwsIGksIGFycikgPT4ge1xuICAgICAgICBjb25zdCBsYXJnZUFyY0ZsYWcgPSAwO1xuICAgICAgICBjb25zdCBwcmV2ID0gZ2V0UHJldmlvdXNOb1ooZWwsIGksIGFycik7XG4gICAgICAgIGNvbnN0IG5leHQgPSBnZXROZXh0Tm9aKGVsLCBpLCBhcnIpO1xuICAgICAgICBjb25zdCBhbmdsZVBydiA9IGdldEFuZ2xlKGVsLnZhbHVlcywgcHJldi52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZU54dCA9IGdldEFuZ2xlKGVsLnZhbHVlcywgbmV4dC52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGFuZ2xlTnh0IC0gYW5nbGVQcnY7IC8vIHJhZGlhbnNcbiAgICAgICAgY29uc3QgZGVncmVlcyA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xuICAgICAgICAvLyBwcmV2ZW50IGFyYyBjcm9zc2luZyB0aGUgbmV4dCBjb21tYW5kXG4gICAgICAgIGNvbnN0IHNob3J0ZXN0ID0gc2hvcnRlc3RTaWRlKGVsLCBwcmV2LCBuZXh0KTtcbiAgICAgICAgY29uc3QgbWF4UmFkaXVzID0gTWF0aC5hYnMoZ2V0VGFuZ2VudE5vSHlwKGFuZ2xlIC8gMiwgc2hvcnRlc3QgLyAyKSk7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHIsIG1heFJhZGl1cyk7XG5cbiAgICAgICAgY29uc3QgbyA9IGdldE9mZnNldChhbmdsZSwgcmFkaXVzKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gby5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IHN3ZWVwRmxhZyA9IG8uc3dlZXBGbGFnO1xuXG4gICAgICAgIGNvbnN0IG9wZW5GaXJzdE9yTGFzdCA9IChpID09IDAgfHwgaSA9PSBhcnIubGVuZ3RoIC0gMSkgJiYgIWNsb3NlZFBhdGg7XG4gICAgICAgIHN3aXRjaCAoZWwubWFya2VyKSB7XG4gICAgICAgICAgY2FzZSAnTSc6IC8vIG1vdmVUbyB4LHlcbiAgICAgICAgICBjYXNlICdMJzogLy8gbGluZVRvIHgseVxuICAgICAgICAgICAgY29uc3QgcHJldlBvaW50ID0gW1xuICAgICAgICAgICAgICBlbC52YWx1ZXMueCArIGdldE9wcG9zaXRlTGVuZ3RoKGFuZ2xlUHJ2LCBvZmZzZXQpLFxuICAgICAgICAgICAgICBlbC52YWx1ZXMueSArIGdldEFkamFjZW50TGVuZ3RoKGFuZ2xlUHJ2LCBvZmZzZXQpXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSBbXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy54ICsgZ2V0T3Bwb3NpdGVMZW5ndGgoYW5nbGVOeHQsIG9mZnNldCksXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy55ICsgZ2V0QWRqYWNlbnRMZW5ndGgoYW5nbGVOeHQsIG9mZnNldClcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIC8vIHRoZXJlIG9ubHkgbmVlZCBiZSBhIGN1cnZlIGlmIGFuZCBvbmx5IGlmIHRoZSBuZXh0IG1hcmtlciBpcyBhIGNvcm5lclxuICAgICAgICAgICAgaWYgKCFvcGVuRmlyc3RPckxhc3QpIHtcbiAgICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IGVsLm1hcmtlcixcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgIHg6IHBhcnNlRmxvYXQocHJldlBvaW50WzBdLnRvRml4ZWQoMykpLFxuICAgICAgICAgICAgICAgICAgeTogcGFyc2VGbG9hdChwcmV2UG9pbnRbMV0udG9GaXhlZCgzKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6IGVsLm1hcmtlcixcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IGVsLnZhbHVlc1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAhb3BlbkZpcnN0T3JMYXN0ICYmXG4gICAgICAgICAgICAgIChuZXh0Lm1hcmtlciA9PT0gJ0wnIHx8IG5leHQubWFya2VyID09PSAnTScpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6ICdBJyxcbiAgICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgIHJhZGl1c1g6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICAgIHJhZGl1c1k6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBkZWdyZWVzLFxuICAgICAgICAgICAgICAgICAgbGFyZ2VBcmM6IGxhcmdlQXJjRmxhZyxcbiAgICAgICAgICAgICAgICAgIHN3ZWVwOiBzd2VlcEZsYWcsXG4gICAgICAgICAgICAgICAgICB4OiBwYXJzZUZsb2F0KG5leHRQb2ludFswXS50b0ZpeGVkKDMpKSxcbiAgICAgICAgICAgICAgICAgIHk6IHBhcnNlRmxvYXQobmV4dFBvaW50WzFdLnRvRml4ZWQoMykpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIC8vIGNhc2UgJ0gnOiAvLyBob3Jpem9udGFsVG8geC4gVHJhbnNmb3JtZWQgdG8gTCBpbiB1dGlsc1xuICAgICAgICAgIC8vIGNhc2UgJ1YnOiAvLyB2ZXJ0aWNhbFRvIHkuIFRyYW5zZm9ybWVkIHRvIEwgaW4gdXRpbHNcbiAgICAgICAgICBjYXNlICdDJzogLy8gY3ViaWMgYmV6acOpcjogeDEgeTEsIHgyIHkyLCB4IHlcbiAgICAgICAgICBjYXNlICdTJzogLy8gc2hvcnQgYmV6acOpcjogeDIgeTIsIHggeVxuICAgICAgICAgIGNhc2UgJ1EnOiAvLyBxdWFkcmF0aWMgYmV6acOpcjogeDEgeTEsIHggeVxuICAgICAgICAgIGNhc2UgJ1QnOiAvLyBzaG9ydCBxdWFkcmF0aWMgYmV6acOpcjogeCB5XG4gICAgICAgICAgY2FzZSAnQSc6IC8vIGFyYzogcnggcnkgeC1heGlzLXJvdGF0aW9uIGxhcmdlLWFyYy1mbGFnIHN3ZWVwLWZsYWcgeCB5XG4gICAgICAgICAgY2FzZSAnWic6IC8vIGNsb3NlIHBhdGhcbiAgICAgICAgICAgIG5ld0NtZHMucHVzaCh7IG1hcmtlcjogZWwubWFya2VyLCB2YWx1ZXM6IGVsLnZhbHVlcyB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoOiBjb21tYW5kc1RvU3ZnUGF0aChuZXdDbWRzKSxcbiAgICBjb21tYW5kczogbmV3Q21kc1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgaXMgYSBzaG9ydGhhbmQgZm9yIHBhcnNlUGF0aCgpIGFuZCByb3VuZENvbW1hbmRzKCkuXG4gKiBZb3UgZ2V0IHRoZSBlbmQgcmVzdWx0IGluIG9uZSBmdW5jdGlvbiBjYWxsLlxuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBSYXcgc3RyaW5nIHdpdGggY29tbWFuZHMgZnJvbSB0aGUgcGF0aCBlbGVtZW50XG4gKiBAcGFyYW0ge251bWJlcn0gciBFeHBlY3RlZCByYWRpdXMgb2YgdGhlIGFyY3MuXG4gKiBAcGFyYW0ge251bWJlcn0gcm91bmQgTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzIHRvIHJvdW5kIHZhbHVlc1xuICogQHJldHVybnMge2FycmF5fSBOZXcgY29tbWFuZHMgc2VxdWVuY2Ugd2l0aCByb3VuZGVkIGNvcm5lcnNcbiAqL1xuZnVuY3Rpb24gcm91bmRDb3JuZXJzKHN0ciwgciwgcm91bmQpIHtcbiAgcmV0dXJuIHJvdW5kQ29tbWFuZHMoWy4uLnBhcnNlUGF0aChzdHIpXSwgciwgcm91bmQpO1xufVxuXG5leHBvcnQgeyBwYXJzZVBhdGgsIHJvdW5kQ29tbWFuZHMsIHJvdW5kQ29ybmVycyB9O1xuIiwiLyoqXG4gKiBSb3VuZCB0aGUgdmFsdWVzIG9mIGVhY2ggY29tbWFuZCB0byB0aGUgZ2l2ZW4gbnVtYmVyIG9mIGRlY2ltYWxzLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgb2JqZWN0IGluIHBsYWNlLlxuICogQHBhcmFtIHthcnJheX0gY21kcyBTZXF1ZW5jZSBvZiBjb21tYW5kc1xuICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlIHRvIGJlIHJvdW5kZWRcbiAqIEByZXR1cm5zIHthcnJheX0gU2VxdWVuY2Ugb2YgY29tbWFuZHMgd2l0aCB0aGVpciB2YWx1ZXMgcm91bmRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmRWYWx1ZXMoZWwsIHJvdW5kKSB7XG4gIE9iamVjdC5rZXlzKGVsLnZhbHVlcykuZm9yRWFjaChcbiAgICBrZXkgPT5cbiAgICAgIChlbC52YWx1ZXNba2V5XSA9XG4gICAgICAgIGVsLnZhbHVlc1trZXldICYmIHBhcnNlRmxvYXQoZWwudmFsdWVzW2tleV0udG9GaXhlZChyb3VuZCkpKVxuICApO1xuXG4gIHJldHVybiBlbDtcbn1cblxuLyoqXG4gKiBHZXQgcHJldmlvdXMgZWxlbWVudCBpbiBhcnJheSwgd3JhcHBpbmcgaWYgaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBhbmQgc2tpcHBpbmcgaWYgdGhlIGNvbW1hbmQgaXMgJ1onXG4gKiBAcGFyYW0ge2FueX0gZSBDb21tYW5kIG9iamVjdFxuICogQHBhcmFtIHtudW1iZXJ9IGkgQ3VycmVudCBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYSBBcnJheSBiZWluZyBpdGVyYXRlZFxuICogQHJldHVybnMge2FueX0gUHJldmlvdXMgZWxlbWVudCB0aGF0IGRvZXNuJ3QgaGF2ZSBhICdaJyBtYXJrZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZpb3VzTm9aKGUsIGksIGEpIHtcbiAgY29uc3QgY291bnRlciA9IGkgLSAxO1xuICBjb25zdCBwcmV2aW91cyA9IGFbbW9kKGNvdW50ZXIsIGEubGVuZ3RoKV07XG5cbiAgaWYgKHByZXZpb3VzLm1hcmtlciAhPT0gJ1onKSB7XG4gICAgcmV0dXJuIHByZXZpb3VzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRQcmV2aW91c05vWihlLCBjb3VudGVyLCBhKTtcbiAgfVxufVxuXG4vKipcbiAqIEdldCBuZXh0IGVsZW1lbnQgaW4gYXJyYXksIHdyYXBwaW5nIGlmIGluZGV4IGlzIG91dCBvZiBib3VuZHMgYW5kIHNraXBwaW5nIGlmIHRoZSBjb21tYW5kIGlzICdaJ1xuICogQHBhcmFtIHthbnl9IGUgQ29tbWFuZCBvYmplY3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIEN1cnJlbnQgaW5kZXhcbiAqIEBwYXJhbSB7YXJyYXl9IGEgQXJyYXkgYmVpbmcgaXRlcmF0ZWRcbiAqIEByZXR1cm5zIHthbnl9IE5leHQgZWxlbWVudCB0aGF0IGRvZXNuJ3QgaGF2ZSBhICdaJyBtYXJrZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE5leHROb1ooZSwgaSwgYSkge1xuICBjb25zdCBjb3VudGVyID0gaSArIDE7XG4gIGNvbnN0IG5leHQgPSBhW21vZChjb3VudGVyLCBhLmxlbmd0aCldO1xuXG4gIGlmIChuZXh0Lm1hcmtlciA9PT0gJ1onKSB7XG4gICAgcmV0dXJuIGdldE5leHROb1ooZSwgY291bnRlciwgYSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5leHQ7XG4gIH1cbn1cblxuLyoqXG4gKiBJdGVyYXRlIHRocm91Z2ggYW4gYXJyYXkgYW5kIGNvbnZlcnQgYWxsIGNvbW1hbmRzIHRvIGFic29sdXRlLlxuICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgdXNlZCBhcyBhcmd1bWVudCBpbiBhIG1hcCgpIGNhbGwuXG4gKiBAcGFyYW0ge2FueX0gZWwgQ3VycmVudCBlbGVtZW50IGluIHRoaXMgaXRlcmF0aW9uXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggQ3VycmVudCBpdGVyYXRpb24gaW5kZXhcbiAqIEBwYXJhbSB7YXJyYXl9IGFyciBBcnJheSBiZWluZyBpdGVyYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRvQWJzb2x1dGUoZWwsIGluZGV4LCBhcnIpIHtcbiAgLy8gZ2V0IHByZXZpb3VzIGl0ZW0gb3IgY3JlYXRlIG9uZSBlbXB0eSBpZiBpdCBkb2VzbnQgZXhpc3RcbiAgbGV0IHByZXYgPSBhcnJbaW5kZXggLSAxXSB8fCB7IHZhbHVlczogeyB4OiAwLCB5OiAwIH0gfTtcblxuICAvLyBvbmx5IG5lZWQgdG8gdGVzdCBsb3dlcmNhc2UgKHJlbGF0aXZlKSBjb21tYW5kc1xuICBpZiAoZWwubWFya2VyID09PSBlbC5tYXJrZXIudG9Mb3dlckNhc2UoKSkge1xuICAgIC8vIGNvbnZlcnQgYWxsIHRvIHVwcGVyY2FzZVxuICAgIGVsLm1hcmtlciA9IGVsLm1hcmtlci50b1VwcGVyQ2FzZSgpO1xuICAgIHN3aXRjaCAoZWwubWFya2VyKSB7XG4gICAgICBjYXNlICdNJzogLy8gbW92ZSB0byB4LHlcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdMJzogLy8gbGluZSB0byB4LHlcbiAgICAgIGNhc2UgJ0EnOlxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0gnOiAvLyBob3Jpem9udGFsVG8geFxuICAgICAgICBlbC5tYXJrZXIgPSAnTCc7XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ID0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdWJzogLy8gdmVydGljYWxUbyB5XG4gICAgICAgIGVsLm1hcmtlciA9ICdMJztcbiAgICAgICAgZWwudmFsdWVzLnggPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0MnOiAvLyBiZXppw6lyIGN1cnZlIHgxIHkxLCB4MiB5MiwgeCB5XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGVsLnZhbHVlcy54MSArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueTEgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngyICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MiArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1MnOlxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBlbC52YWx1ZXMueDIgKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkyICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUSc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGVsLnZhbHVlcy54MSArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueTEgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdUJzpcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdaJzpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIEgvViB1cHBlcmNhc2UgbmVlZCB0byBiZSBjb252ZXJ0ZWQgdG9vLiBDb252ZXJ0IHRvIEwgYW5kIGFkZCBtaXNzaW5nIHZhbHVlXG4gIH0gZWxzZSBpZiAoZWwubWFya2VyID09PSBlbC5tYXJrZXIudG9VcHBlckNhc2UoKSkge1xuICAgIHN3aXRjaCAoZWwubWFya2VyKSB7XG4gICAgICBjYXNlICdIJzogLy8gaG9yaXpvbnRhbFRvIHhcbiAgICAgICAgZWwubWFya2VyID0gJ0wnO1xuICAgICAgICBlbC52YWx1ZXMueSA9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVic6IC8vIHZlcnRpY2FsVG8geVxuICAgICAgICBlbC5tYXJrZXIgPSAnTCc7XG4gICAgICAgIGVsLnZhbHVlcy54ID0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLypcbiAgICAnWicgY29tbWFuZHMgZG9uJ3QgaGF2ZSBhbnkgY29vcmRpbmF0ZSBidXQgd2UgYXJlIGNsb25pbmcgdGhlXG4gICAgc3RhcnQgY29vcmRpbmF0ZXMgZGVmaW5lZCBieSB0aGlzIHN1YnBhdGggaW5pdGlhbCAnTScgc28gaXQnc1xuICAgIGVhc2llciB0byBkbyB0aGUgc3RpdGNoaW5nIGxhdGVyLlxuICAqL1xuICBpZiAoZWwubWFya2VyID09PSAnWicpIHtcbiAgICAvLyBmaW5kIHByZXZpb3VzICdNJyByZWN1cnNpdmVseVxuICAgIGZ1bmN0aW9uIHJlYyhhcnIsIGkpIHtcbiAgICAgIGlmIChhcnJbaV0ubWFya2VyID09PSAnTScpIHtcbiAgICAgICAgcmV0dXJuIGFycltpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZWMoYXJyLCBpIC0gMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBtQmVmb3JlID0gcmVjKGFyciwgaW5kZXgpO1xuICAgIGVsLnZhbHVlcy54ID0gbUJlZm9yZS52YWx1ZXMueDtcbiAgICBlbC52YWx1ZXMueSA9IG1CZWZvcmUudmFsdWVzLnk7XG4gIH1cblxuICByZXR1cm4gZWw7XG59XG5cbi8qKlxuICogVGFrZXMgb25lIG1hcmtlciBhbmQgYW4gYXJyYXkgb2YgbnVtYmVycyBhbmQgY3JlYXRlcyBvbmUgb3IgbW9yZSBjb21tYW5kIG9iamVjdHMgd2l0aCB0aGUgcmlnaHRcbiAqIHByb3BlcnRpZXMgYmFzZWQgb24gdGhlIGdpdmVuIG1hcmtlci4gU29tZSBtYXJrZXJzIGFsbG93IGZvciBtdWx0aXBsZSBjb29yZGluYXRlcyBmb3Igb25lIHNpbmdsZSBjb21tYW5kLlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyBjYXJlIG9mIHNwbGl0dGluZyBtdWx0aXBsZSBjb29yZGluYXRlcyBwZXIgY29tbWFuZCBhbmQgZ2VuZXJhdGluZyB0aGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZXIgTGV0dGVyIG9mIHRoZSBjb21tYW5kIGJlaW5nIGdlbmVyYXRlZFxuICogQHBhcmFtIHthcnJheX0gdmFsdWVzIEFycmF5IG9mIG51bWJlcnMgdG8gYmUgc3BsaXR0ZWQgYW5kIHBhcnNlZCBpbnRvIHRoZSByaWdodCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7YXJyYXl9IEFycmF5IG9mIGNvbW1hbmRzLiBNb3N0IG9mIHRoZSB0aW1lIHdpbGwgaGF2ZSBvbmx5IG9uZSBpdGVtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZXdDb21tYW5kcyhtYXJrZXIsIHZhbHVlcykge1xuICBjb25zdCBjbWRzID0gW107XG5cbiAgc3dpdGNoIChtYXJrZXIudG9VcHBlckNhc2UoKSkge1xuICAgIGNhc2UgJ00nOiAvLyBtb3ZlVG8geCx5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBsZXQgbTtcbiAgICAgICAgaWYgKG1hcmtlciA9PT0gbWFya2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICBtID0gaSA9PT0gMCA/ICdNJyA6ICdMJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gaSA9PT0gMCA/ICdtJyA6ICdsJztcbiAgICAgICAgfVxuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcjogbSxcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgMV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTCc6IC8vIGxpbmVUbyB4LHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAxXVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdIJzogLy8gaG9yaXpvbnRhbFRvIHhcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdWJzogLy8gdmVydGljYWxUbyB5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQyc6IC8vIGN1YmljIGJlemnDqXIgY3VydmUgeDEgeTEsIHgyIHkyLCB4IHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSA2KSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDE6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHkxOiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgICAgeDI6IHZhbHVlc1tpICsgMl0sXG4gICAgICAgICAgICB5MjogdmFsdWVzW2kgKyAzXSxcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpICsgNF0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDVdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1MnOlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4MjogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTI6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDJdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAzXVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdRJzpcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDE6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHkxOiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgM11cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnVCc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgMV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQSc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gNykge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHJhZGl1c1g6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHJhZGl1c1k6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICByb3RhdGlvbjogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIGxhcmdlQXJjOiB2YWx1ZXNbaSArIDNdLFxuICAgICAgICAgICAgc3dlZXA6IHZhbHVlc1tpICsgNF0sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDVdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyA2XVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdaJzpcbiAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgIG1hcmtlcixcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgLy8gdmFsdWVzIHdpbGwgYmUgb3ZlcnJpZGVuIGxhdGVyIGJ5IGNvbnZlcnRUb0Fic29sdXRlKClcbiAgICAgICAgICB4OiAwLFxuICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gY21kcztcbn1cblxuLyoqXG4gKiBUYWtlcyBhbiBpbmRleCBhbmQgYSBsZW5ndGggYW5kIHJldHVybnMgdGhlIGluZGV4IHdyYXBwZWQgaWYgb3V0IG9mIGJvdW5kcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4IEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gbSBMZW5ndGhcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEluZGV4IG9yIHdyYXBwZWQgaW5kZXggaWYgb3V0IGJvdW5kc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kKHgsIG0pIHtcbiAgcmV0dXJuICgoeCAlIG0pICsgbSkgJSBtO1xufVxuXG4vKipcbiAqIENvbXBhcmVzIHRoZSBnaXZlbiBlbGVtZW50IHdpdGggaXQncyBwcmVkZWNlc3NvciBhbmQgY2hlY2tzIGlmIHRoZWlyIGVuZCBwb3NpdGlvbiBpcyB0aGUgc2FtZS5cbiAqIElmIGl0IGlzLCBhZGQgYSBib29sZWFuICdvdmVybGFwJyBwcm9wZXJ0eSB0byB0aGUgZWxlbWVudC4gVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgYXJyYXkgZWxlbWVudHMgaW4gcGxhY2VcbiAqIEBwYXJhbSB7YW55fSBlbCBDb21tYW5kIG9iamVjdFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEN1cnJlbnQgaXRlcmF0aW9uIGluZGV4XG4gKiBAcGFyYW0ge2FycmF5fSBhcnJheSBBcnJheSBiZWluZyBpdGVyYXRlZFxuICogQHJldHVybnMge2FueX0gQ29tbWFuZCBvYmplY3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hcmtPdmVybGFwcGVkKGVsLCBpbmRleCwgYXJyYXkpIHtcbiAgLy8gU2tpcCB0aGUgZmlyc3QgbW92ZVRvIGNvbW1hbmQgYW5kIGFueSBvdGhlciB0aGF0J3Mgbm90IGEgbGluZVRvLlxuICBpZiAoaW5kZXggIT09IDAgJiYgZWwubWFya2VyID09PSAnTCcpIHtcbiAgICAvLyBJdCBzZWVtcyB3ZSBoYXZlIGEgbGluZVRvIGhlcmUuIEdldCB0aGUgaW1tZWRpYXRlIHByZXZpb3VzIGNvbW1hbmRcbiAgICBsZXQgcHJldmlvdXMgPSBhcnJheVtpbmRleCAtIDFdO1xuICAgIC8vIOKApmFuZCBjaGVjayBpZiB0aGUgeCwgeSBjb29yZGluYXRlcyBhcmUgZXF1YWxzLlxuICAgIGNvbnN0IG92ZXJsYXAgPSBbJ3gnLCAneSddLmV2ZXJ5KGtleSA9PiB7XG4gICAgICAvLyBJZiB4IEFORCB5IG92ZXJsYXAsIHRoaXMgY29tbWFuZCBzaG91bGQgYmUgc2tpcHBlZFxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5hYnMocHJldmlvdXMudmFsdWVzW2tleV0gLSBlbC52YWx1ZXNba2V5XSkpID09PSAwO1xuICAgIH0pO1xuXG4gICAgaWYgKG92ZXJsYXApIHtcbiAgICAgIGVsLm92ZXJsYXAgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbDtcbn1cblxuLyoqXG4gKiBTaW1pbGFyIHB1cnBvc2UgYXMgbWFya092ZXJsYXBwZWQoKS4gUmVjdXJzaXZlbHkgbWFya3MgdHJhaWxsaW5nIGNvbW1hbmRzIHRoYXQgaGF2ZSB0aGUgc2FtZSBlbmQgY29vcmRpbmF0ZSBhcyB0aGUgaW5pdGFsICdNJy5cbiAqIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIGFycmF5IGluIHBsYWNlLlxuICogQHBhcmFtIHthcnJheX0gY21kcyBDb21tYW5kcyBhcnJheVxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IE9wdGlvbmFsIHN0YXJ0IGluZGV4IGNvdW50aW5nIGJhY2t3YXJkcy4gVXN1YWxseSB0aGUgbGFzdCBpbmRleCBmcm9tIHRoZSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gcmV2ZXJzZU1hcmtPdmVybGFwcGVkKGNtZHMsIGNvdW50ZXIpIHtcbiAgY29uc3Qgb3ZlcmxhcCA9IFsneCcsICd5J10uZXZlcnkoa2V5ID0+IHtcbiAgICAvLyBJZiB4IEFORCB5IG92ZXJsYXAsIHRoaXMgY29tbWFuZCBzaG91bGQgYmUgc2tpcHBlZFxuICAgIHJldHVybiAoXG4gICAgICBNYXRoLnJvdW5kKE1hdGguYWJzKGNtZHNbY291bnRlcl0udmFsdWVzW2tleV0gLSBjbWRzWzBdLnZhbHVlc1trZXldKSkgPT09XG4gICAgICAwXG4gICAgKTtcbiAgfSk7XG5cbiAgaWYgKGNtZHNbY291bnRlcl0ubWFya2VyID09PSAnTCcgJiYgb3ZlcmxhcCkge1xuICAgIGNtZHNbY291bnRlcl0ub3ZlcmxhcCA9IHRydWU7XG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKGNtZHMsIGNvdW50ZXIgLSAxKTtcbiAgfVxuXG4gIGlmIChjbWRzW2NvdW50ZXJdLm1hcmtlciA9PT0gJ1onKSB7XG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKGNtZHMsIGNvdW50ZXIgLSAxKTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGN1cnJlbnQgY29tbWFuZCBhbmRcbiAqIGl0J3MgZGlyZWN0IG5laWdoYm91cnMgYW5kIHJldHVybnMgdGhlIG5lYXJlc3QgZGlzdGFuY2VcbiAqIEBwYXJhbSB7YW55fSBlbCBjdXJyZW50IGNvbW1hbmRcbiAqIEBwYXJhbSB7YW55fSBwcmV2aW91cyBwcmV2aW91cyBjb21tYW5kXG4gKiBAcGFyYW0ge2FueX0gbmV4dCBuZXh0IGNvbW1hbmRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBkaXN0YW5jZSB0byB0ZWggbmVhcmVzdCBjb21tYW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVzdFNpZGUoZWwsIHByZXZpb3VzLCBuZXh0KSB7XG4gIGNvbnN0IG54dFNpZGUgPSBnZXREaXN0YW5jZShlbC52YWx1ZXMsIG5leHQudmFsdWVzKTtcbiAgY29uc3QgcHJ2U2lkZSA9IGdldERpc3RhbmNlKHByZXZpb3VzLnZhbHVlcywgZWwudmFsdWVzKTtcbiAgcmV0dXJuIE1hdGgubWluKHBydlNpZGUsIG54dFNpZGUpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHthbnl9IHAxIE9iamVjdCB3aXRoIHggYW5kIHkgcHJvcGVydGllc1xuICogQHBhcmFtIHthbnl9IHAyIE9iamVjdCB3aXRoIHggYW5kIHkgcHJvcGVydGllc1xuICogQHJldHVybnMge251bWJlcn0gQW5nbGUgaW4gcmFkaWFuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyKSB7XG4gIHJldHVybiBNYXRoLmF0YW4yKHAyLnggLSBwMS54LCBwMi55IC0gcDEueSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge2FueX0gcDEgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge2FueX0gcDIgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBEaXN0YW5jZSBiZXR3ZWVuIHBvaW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyKSB7XG4gIGNvbnN0IHhEaWZmID0gcDEueCAtIHAyLng7XG4gIGNvbnN0IHlEaWZmID0gcDEueSAtIHAyLnk7XG5cbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4RGlmZiwgMikgKyBNYXRoLnBvdyh5RGlmZiwgMikpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGUgb3Bwb3NpdGUgc2lkZVxuICogb2YgYSBnaXZlbiBhbmdsZSB1c2luZyB0aGUgaHlwb3RoZW51c2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gaGlwIEh5cG90aGVudXNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIG9wcG9zaXRlIHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9wcG9zaXRlTGVuZ3RoKGFuZ2xlLCBoaXApIHtcbiAgcmV0dXJuIE1hdGguc2luKGFuZ2xlKSAqIGhpcDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhlIGFkamFjZW50IHNpZGVcbiAqIG9mIGEgZ2l2ZW4gYW5nbGUgdXNpbmcgdGhlIGh5cG90aGVudXNlXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgQW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGhpcCBIeXBvdGhlbnVzZVxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoIG9mIHRoZSBhZGphY2VudCBzaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZGphY2VudExlbmd0aChhbmdsZSwgaGlwKSB7XG4gIHJldHVybiBNYXRoLmNvcyhhbmdsZSkgKiBoaXA7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqYWNlbnQgc2lkZSBvZiB0aGUgZ2l2ZW5cbiAqIGFuZ2xlIHVzaW5nIHRoZSBhbmdsZSdzIG9wcG9zaXRlIHNpZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gb3Bwb3NpdGUgb3Bwb3NpdGUgc2lkZVxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoIG9mIHRoZSBhZGphY2VudCBzaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYW5nZW50TGVuZ3RoKGFuZ2xlLCBvcHBvc2l0ZSkge1xuICBjb25zdCBhID0gb3Bwb3NpdGUgLyBNYXRoLnRhbihhbmdsZSk7XG4gIGlmIChhID09PSBJbmZpbml0eSB8fCBhID09PSAtSW5maW5pdHkgfHwgaXNOYU4oYSkpIHtcbiAgICByZXR1cm4gb3Bwb3NpdGU7XG4gIH1cblxuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBvcHBvc2l0ZSBzaWRlIG9mIHRoZSBnaXZlblxuICogYW5nbGUgdXNpbmcgdGhlIGFuZ2xlJ3MgYWRqYWNlbnQgc2lkZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhZGphY2VudCBhZGphY2VudCBzaWRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIG9wcG9zaXRlIHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhbmdlbnROb0h5cChhbmdsZSwgYWRqYWNlbnQpIHtcbiAgcmV0dXJuIGFkamFjZW50ICogTWF0aC50YW4oYW5nbGUpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHNob3J0ZW4gdGhlXG4gKiBkaXN0YW5jZSBiZXR3ZWVuIGNvbW1hbmRzIGJhc2VkIG9uIHRoZSBnaXZlbiByYWRpdXMgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zIGJldHdlZW4gcG9pbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gciBSYWRpdXMgb2YgdGhlIGFyYyB0aGF0IHNob3VsZCBmaXQgaW5zaWRlIHRoZSB0cmlhbmdsZVxuICogQHJldHVybnMge2FueX0gT2JqZWN0IGNvbnRhaW5pbmcgb2Zmc2V0IGFuZCB0aGUgYXJjJ3Mgc3dlZXBGbGFnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPZmZzZXQoYW5nbGUsIHIpIHtcbiAgbGV0IG9mZnNldDtcbiAgbGV0IHN3ZWVwRmxhZyA9IDA7XG4gIGxldCBkZWdyZWVzID0gYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSk7XG5cbiAgLy8gc2hhcnAgYW5nbGVzXG4gIGlmICgoZGVncmVlcyA8IDAgJiYgZGVncmVlcyA+PSAtMTgwKSB8fCAoZGVncmVlcyA+IDE4MCAmJiBkZWdyZWVzIDwgMzYwKSkge1xuICAgIG9mZnNldCA9IGdldFRhbmdlbnRMZW5ndGgoYW5nbGUgLyAyLCAtcik7XG4gICAgLy8gb2J0dXNlIGFuZ2xlc1xuICB9IGVsc2Uge1xuICAgIG9mZnNldCA9IGdldFRhbmdlbnRMZW5ndGgoYW5nbGUgLyAyLCByKTtcbiAgICBzd2VlcEZsYWcgPSAxO1xuICAgIGlmIChvZmZzZXQgPT09IEluZmluaXR5KSB7XG4gICAgICBvZmZzZXQgPSByO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgb2Zmc2V0LFxuICAgIHN3ZWVwRmxhZ1xuICB9O1xufVxuXG4vKipcbiAqIE9yaWdpbmFsbHkgdGFrZW4gZnJvbTogaHR0cDovL2JsLm9ja3Mub3JnL2JhbGludDQyLzhjOTMxMDYwNWRmOTMwNWM0MmIzXG4gKiBAYnJpZWYgRGUgQ2FzdGVsamF1J3MgYWxnb3JpdGhtIHNwbGl0dGluZyBuLXRoIGRlZ3JlZSBCZXppZXIgY3VydmVcbiAqIEByZXR1cm5zIHthcnJheX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJzcGxpdChwb2ludHMsIHQwKSB7XG4gIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoIC0gMTsgLy8gbnVtYmVyIG9mIGNvbnRyb2wgcG9pbnRzXG4gIGNvbnN0IGIgPSBbXTsgLy8gY29lZmZpY2llbnRzIGFzIGluIERlIENhc3RlbGphdSdzIGFsZ29yaXRobVxuICBjb25zdCByZXMxID0gW107IC8vIGZpcnN0IGN1cnZlIHJlc3VsdGluZyBjb250cm9sIHBvaW50c1xuICBjb25zdCByZXMyID0gW107IC8vIHNlY29uZCBjdXJ2ZSByZXN1bHRpbmcgY29udHJvbCBwb2ludHNcbiAgY29uc3QgdDEgPSAxIC0gdDA7XG5cbiAgLy8gbXVsdGlwbHkgcG9pbnQgd2l0aCBzY2FsYXIgZmFjdG9yXG4gIGNvbnN0IHBmID0gZnVuY3Rpb24gKHAsIGYpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcy5wdXNoKGYgKiBwW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgLy8gYWRkIHBvaW50cyBhcyB2ZWN0b3JzXG4gIGNvbnN0IHBwID0gZnVuY3Rpb24gKHAxLCBwMikge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5taW4ocDEubGVuZ3RoLCBwMi5sZW5ndGgpOyBpKyspIHtcbiAgICAgIHJlcy5wdXNoKHAxW2ldICsgcDJbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuXG4gIC8vIHNldCBvcmlnaW5hbCBjb2VmZmljaWVudHM6IGJbaV1bMF0gPSBwb2ludHNbaV1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4gICAgcG9pbnRzW2ldID0gdHlwZW9mIHBvaW50c1tpXSA9PSAnb2JqZWN0JyA/IHBvaW50c1tpXSA6IFtwb2ludHNbaV1dO1xuICAgIGIucHVzaChbcG9pbnRzW2ldXSk7XG4gIH1cblxuICAvLyBnZXQgYWxsIGNvZWZmaWNpZW50c1xuICBmb3IgKGxldCBqID0gMTsgaiA8PSBuOyBqKyspIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBuIC0gajsgaSsrKSB7XG4gICAgICBiW2ldLnB1c2gocHAocGYoYltpXVtqIC0gMV0sIHQxKSwgcGYoYltpICsgMV1baiAtIDFdLCB0MCkpKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHJlc3VsdDogcmVzMSAmIHJlczJcbiAgZm9yIChsZXQgaiA9IDA7IGogPD0gbjsgaisrKSB7XG4gICAgcmVzMS5wdXNoKGJbMF1bal0pO1xuICAgIHJlczIucHVzaChiW2pdW24gLSBqXSk7XG4gIH1cblxuICByZXR1cm4gW3JlczEsIHJlczJdO1xufVxuXG4vKipcbiAqIENvbmNhdGVuYXRlcyBjb21tYW5kcyBpbiBhIHN0cmluZyBhbmQgZW5zdXJlcyB0aGF0IGVhY2hcbiAqIHZhbHVlIGZyb20gZWFjaCBjb21tYW5kIGlzIHByaW50ZWQgaW4gdGhlIHJpZ2h0IG9yZGVyXG4gKiBAcGFyYW0ge2FycmF5fSBjbWRzIEFycmF5IG9mIHN2ZyBjb21tYW5kc1xuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIGNvbnRhaW5pbmcgYWxsIGNvbW1hbmRzIGZvcm1hdGVkIHJlYWR5IGZvciB0aGUgJ2QnIEF0dHJpYnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWFuZHNUb1N2Z1BhdGgoY21kcykge1xuICAvLyB3aGVuIHdyaXRpbmcgdGhlIGNvbW1hbmRzIGJhY2ssIHRoZSByZWxldmFudCB2YWx1ZXMgc2hvdWxkIGJlIHdyaXR0ZW4gaW4gdGhpcyBvcmRlclxuICBjb25zdCB2YWx1ZXNPcmRlciA9IFtcbiAgICAncmFkaXVzWCcsXG4gICAgJ3JhZGl1c1knLFxuICAgICdyb3RhdGlvbicsXG4gICAgJ2xhcmdlQXJjJyxcbiAgICAnc3dlZXAnLFxuICAgICd4MScsXG4gICAgJ3kxJyxcbiAgICAneDInLFxuICAgICd5MicsXG4gICAgJ3gnLFxuICAgICd5J1xuICBdO1xuXG4gIHJldHVybiBjbWRzXG4gICAgLm1hcChjbWQgPT4ge1xuICAgICAgLy8gZGVmYXVsdHMgZm9yIGVtcHR5IHN0cmluZywgc28gWiB3aWxsIG91dHB1dCBubyB2YWx1ZXNcbiAgICAgIGxldCBkID0gJyc7XG4gICAgICAvLyBmaWx0ZXIgYW55IGNvbW1hbmQgdGhhdCdzIG5vdCBaXG4gICAgICBpZiAoY21kLm1hcmtlciAhPT0gJ1onKSB7XG4gICAgICAgIC8vIGdldCBhbGwgdmFsdWVzIGZyb20gY3VycmVudCBjb21tYW5kXG4gICAgICAgIGNvbnN0IGNtZEtleXMgPSBPYmplY3Qua2V5cyhjbWQudmFsdWVzKTtcbiAgICAgICAgLy8gZmlsdGVyIHRoZSB2YWx1ZXNPcmRlciBhcnJheSBmb3Igb25seSB0aGUgdmFsdWVzIHRoYXQgYXBwZWFyIGluIHRoZSBjdXJyZW50IGNvbW1hbmQuXG4gICAgICAgIC8vIFdlIGRvIHRoaXMgYmVjYXVzZSB2YWx1ZXNPcmRlciBndWFyYW50ZWVzIHRoYXQgdGhlIHJlbGV2YW50IHZhbHVlcyB3aWxsIGJlIGluIHRoZSByaWdodCBvcmRlclxuICAgICAgICBkID0gdmFsdWVzT3JkZXJcbiAgICAgICAgICAuZmlsdGVyKHYgPT4gY21kS2V5cy5pbmRleE9mKHYpICE9PSAtMSlcbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBrZXkgd2l0aCBpdCdzIHZhbHVlXG4gICAgICAgICAgLm1hcChrZXkgPT4gY21kLnZhbHVlc1trZXldKVxuICAgICAgICAgIC8vIGFuZCBzdHJpbmdpZnkgZXZlcnl0aGluZyB0b2dldGhlciB3aXRoIGEgY29tbWEgaW5iZXR3ZWVuIHZhbHVlc1xuICAgICAgICAgIC5qb2luKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYCR7Y21kLm1hcmtlcn0ke2R9YDtcbiAgICB9KVxuICAgIC5qb2luKCcnKVxuICAgIC50cmltKCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyByb3VuZENvcm5lcnMsIHBhcnNlUGF0aCB9IGZyb20gJy4uL2xpYic7XG5pbXBvcnQge1xuICBnZXREaXN0YW5jZSxcbiAgZ2V0QW5nbGUsXG4gIGdldEFkamFjZW50TGVuZ3RoLFxuICBnZXRPcHBvc2l0ZUxlbmd0aFxufSBmcm9tICcuLi9saWIvdXRpbHMnO1xuXG5jb25zdCBzdmducyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbmNsYXNzIFNWR1ByZXZpZXcge1xuICBjb25zdHJ1Y3RvcihzdGFnZVNlbGVjdG9yLCBwYXRoU2VsZWN0b3IpIHtcbiAgICB0aGlzLmNvbW1hbmRzID0gW107XG4gICAgdGhpcy5kb3RzID0gW107XG4gICAgdGhpcy5kb3RSYWRpdXMgPSA1O1xuICAgIHRoaXMubW91c2VEb3duT2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07XG4gICAgdGhpcy5hY3RpdmVEb3RJbmRleDtcbiAgICB0aGlzLnJhZGl1cyA9IDIwO1xuXG4gICAgdGhpcy5zdGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RhZ2VTZWxlY3Rvcik7XG4gICAgdGhpcy5zdGFnZU9mZnNldCA9IHRoaXMuc3RhZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5wYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXRoU2VsZWN0b3IpO1xuICAgIHRoaXMucmFuZ2VTbGlkZXIgPSB0aGlzLnJhbmdlU2xpZGVyO1xuXG4gICAgLy8gU2V0IHRoZSBzdmcgc3RhZ2UgdG8gYmUgdGhlIHNhbWUgc2l6ZSBvZiB0aGUgd2luZG93XG4gICAgdGhpcy5zdGFnZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpO1xuICAgIHRoaXMuc3RhZ2Uuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgLy8gY3JlYXRlIGNsb25lIHBhdGggdG8gc2hvdyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9yaWdpbmFsXG4gICAgLy8gYW5kIHBhdGggd2l0aCByb3VuZGVkIGNvcm5lcnMuXG4gICAgdGhpcy5jbG9uZSA9IHRoaXMucGF0aC5jbG9uZU5vZGUoKTtcbiAgICB0aGlzLmNsb25lLmNsYXNzTGlzdC5hZGQoJ29yaWdpbmFsJyk7XG4gICAgdGhpcy5wYXRoLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCB0aGlzLmNsb25lKTtcblxuICAgIHRoaXMucmFuZ2VTbGlkZXIgPSBuZXcgUmFuZ2VTbGlkZXIoJy5jb250cm9sbGVyJywge30pO1xuICAgIHRoaXMucmFuZ2VTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndXBkYXRlJywgZXZ0ID0+IHtcbiAgICAgIHRoaXMucmFkaXVzID0gZXZ0LmRldGFpbDtcbiAgICAgIHRoaXMudXBkYXRlUGF0aChldnQubWV0YUtleSk7XG4gICAgfSk7XG5cbiAgICAvLyBiaW5kIGV2ZW50IGxpc3RlbmVycyB0byB0aGlzIGNsYXNzIGNvbnRleHRcbiAgICB0aGlzLmRvdE1vdXNlRG93biA9IHRoaXMuZG90TW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFnZU1vdXNlTW92ZSA9IHRoaXMuc3RhZ2VNb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YWdlTW91c2VVcCA9IHRoaXMuc3RhZ2VNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFnZUNsaWNrID0gdGhpcy5zdGFnZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zdGFnZUNsaWNrKTtcbiAgfVxuXG4gIHVwZGF0ZVBhdGgoY2xvc2VkUGF0aCkge1xuICAgIC8vIGJ1aWxkIHRoZSBzdHJpbmdcbiAgICBjb25zdCBkID1cbiAgICAgIHRoaXMuY29tbWFuZHMucmVkdWNlKFxuICAgICAgICAoYWNjLCBjdXJyKSA9PlxuICAgICAgICAgIChhY2MgKz0gYCR7Y3Vyci5tYXJrZXJ9JHtjdXJyLnZhbHVlcy54fSwke2N1cnIudmFsdWVzLnl9YCksXG4gICAgICAgICcnXG4gICAgICApICsgKGNsb3NlZFBhdGggPyAnWicgOiAnJyk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHBhdGgnc1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBkKTtcbiAgICB0aGlzLnBhdGguc2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLWQnLCBkKTtcbiAgICB0aGlzLmNsb25lLnNldEF0dHJpYnV0ZSgnZCcsIGQpO1xuXG4gICAgLy8gcm91bmQgdGhlIGNvcm5lcnNcbiAgICBjb25zdCByQ29ybmVycyA9IHJvdW5kQ29ybmVycyhkLCB0aGlzLnJhZGl1cyk7XG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZSgnZCcsIHJDb3JuZXJzLnBhdGgpO1xuICB9XG5cbiAgZG90TW91c2VEb3duKGV2dCkge1xuICAgIGNvbnN0IGRvdCA9IGV2dC50YXJnZXQ7XG4gICAgdGhpcy5hY3RpdmVEb3RJbmRleCA9IHRoaXMuZG90cy5pbmRleE9mKGRvdCk7XG4gICAgdGhpcy5tb3VzZURvd25PZmZzZXQgPSB7XG4gICAgICB4OlxuICAgICAgICBldnQuY2xpZW50WCAtXG4gICAgICAgIHRoaXMuc3RhZ2VPZmZzZXQubGVmdCArXG4gICAgICAgIHRoaXMuZG90UmFkaXVzIC1cbiAgICAgICAgZG90LmdldEF0dHJpYnV0ZU5TKG51bGwsICdjeCcpLFxuICAgICAgeTpcbiAgICAgICAgZXZ0LmNsaWVudFkgLVxuICAgICAgICB0aGlzLnN0YWdlT2Zmc2V0LnRvcCArXG4gICAgICAgIHRoaXMuZG90UmFkaXVzIC1cbiAgICAgICAgZG90LmdldEF0dHJpYnV0ZU5TKG51bGwsICdjeScpXG4gICAgfTtcblxuICAgIHRoaXMuc3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5zdGFnZU1vdXNlTW92ZSk7XG4gICAgdGhpcy5zdGFnZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5zdGFnZU1vdXNlVXApO1xuICB9XG5cbiAgc3RhZ2VNb3VzZU1vdmUoZXZ0KSB7XG4gICAgY29uc3QgZG90ID0gdGhpcy5kb3RzW3RoaXMuYWN0aXZlRG90SW5kZXhdO1xuICAgIGNvbnN0IHBhdGhDbWQgPSB0aGlzLmNvbW1hbmRzW3RoaXMuYWN0aXZlRG90SW5kZXhdLnZhbHVlcztcbiAgICBwYXRoQ21kLnggPSBldnQuY2xpZW50WCAtIHRoaXMubW91c2VEb3duT2Zmc2V0Lng7XG4gICAgcGF0aENtZC55ID0gZXZ0LmNsaWVudFkgLSB0aGlzLm1vdXNlRG93bk9mZnNldC55O1xuXG4gICAgdGhpcy51cGRhdGVQYXRoKGV2dC5tZXRhS2V5KTtcblxuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3gnLCBwYXRoQ21kLngpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3knLCBwYXRoQ21kLnkpO1xuICB9XG5cbiAgc3RhZ2VNb3VzZVVwKGV2dCkge1xuICAgIC8vIENsZWFudXBcbiAgICB0aGlzLnN0YWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuc3RhZ2VNb3VzZU1vdmUpO1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuc3RhZ2VNb3VzZVVwKTtcbiAgfVxuXG4gIG5ld0RvdCh4LCB5KSB7XG4gICAgY29uc3QgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHN2Z25zLCAnY2lyY2xlJyk7XG4gICAgZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeCcsIHgpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3knLCB5KTtcbiAgICBkb3Quc2V0QXR0cmlidXRlTlMobnVsbCwgJ3InLCB0aGlzLmRvdFJhZGl1cyk7XG4gICAgdGhpcy5zdGFnZS5hcHBlbmRDaGlsZChkb3QpO1xuXG4gICAgZG90LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuZG90TW91c2VEb3duLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIGRvdDtcbiAgfVxuXG4gIHN0YWdlQ2xpY2soZXZ0KSB7XG4gICAgLy8gaWYgZHJhZ2dpbmdcbiAgICBpZiAoZXZ0LnNoaWZ0S2V5KSByZXR1cm47XG5cbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLmNvbW1hbmRzLmxlbmd0aCA/ICdMJyA6ICdNJztcbiAgICBjb25zdCB4ID0gZXZ0LmNsaWVudFggLSB0aGlzLnN0YWdlT2Zmc2V0LmxlZnQ7XG4gICAgY29uc3QgeSA9IGV2dC5jbGllbnRZIC0gdGhpcy5zdGFnZU9mZnNldC50b3A7XG4gICAgdGhpcy5jb21tYW5kcy5wdXNoKHsgbWFya2VyLCB2YWx1ZXM6IHsgeCwgeSB9IH0pO1xuICAgIHRoaXMuZG90cy5wdXNoKHRoaXMubmV3RG90KHgsIHkpKTtcbiAgICB0aGlzLnVwZGF0ZVBhdGgoZXZ0Lm1ldGFLZXkpO1xuICB9XG59XG5cbi8vIENvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY29udHJvbGxpbmcgdGhlIHJhZGl1c1xuY2xhc3MgUmFuZ2VTbGlkZXIgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lclNlbGVjdG9yLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHNpemU6IDI1MCxcbiAgICAgIG1pblJhZGl1czogMCxcbiAgICAgIG1heFJhZGl1czogNzAsXG4gICAgICBzdGFydFJhZGl1czogMjAsXG4gICAgICBoYW5kbGVSYWRpdXM6IDVcbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zID0geyAuLi5kZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xuICAgIHRoaXMubW91c2VEb3duT2Zmc2V0ID0geyB4OiAwLCB5OiAwIH07XG5cbiAgICBjb25zdCBzdHIgPSBgXG4gICAgICA8c3ZnXG4gICAgICAgIGNsYXNzPVwicmFkaXVzLWNvbnRyb2xcIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgeG1sbnM6eGxpbms9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCJcbiAgICAgICAgd2lkdGg9XCIke3RoaXMub3B0aW9ucy5zaXplfVwiXG4gICAgICAgIGhlaWdodD1cIiR7dGhpcy5vcHRpb25zLnNpemV9XCJcbiAgICAgICAgdmlld1BvcnQ9XCIwIDAgJHt0aGlzLm9wdGlvbnMuc2l6ZX0gJHt0aGlzLm9wdGlvbnMuc2l6ZX1cIlxuICAgICAgPlxuICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgY3g9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIGN5PVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICByPVwiJHt0aGlzLm9wdGlvbnMuc3RhcnRSYWRpdXN9XCJcbiAgICAgICAgICBjbGFzcz1cInJhZGl1cy1jb250cm9sX19jaXJjbGVcIiAvPlxuICAgICAgICA8bGluZVxuICAgICAgICAgIHgxPVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICB5MT1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyfVwiXG4gICAgICAgICAgeDI9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMiArIHRoaXMub3B0aW9ucy5zdGFydFJhZGl1c31cIlxuICAgICAgICAgIHkyPVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICBjbGFzcz1cInJhZGl1cy1jb250cm9sX19saW5lXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGNpcmNsZVxuICAgICAgICAgIGN4PVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDIgKyB0aGlzLm9wdGlvbnMuc3RhcnRSYWRpdXN9XCJcbiAgICAgICAgICBjeT1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyfVwiXG4gICAgICAgICAgcj1cIiR7dGhpcy5vcHRpb25zLmhhbmRsZVJhZGl1c31cIlxuICAgICAgICAgIGNsYXNzPVwicmFkaXVzLWNvbnRyb2xfX2hhbmRsZVwiIC8+XG4gICAgICA8L3N2Zz5cbiAgICBgO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXJTZWxlY3Rvcik7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIC8vIE1ha2UgdGhlIHBhcmVudCBvZiB0aGUgZmlyc3QgZGl2IGluIHRoZSBkb2N1bWVudCBiZWNvbWVzIHRoZSBjb250ZXh0IG5vZGVcbiAgICByYW5nZS5zZWxlY3ROb2RlKGNvbnRhaW5lcik7XG4gICAgdmFyIGRvY3VtZW50RnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoc3RyKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnRGcmFnbWVudCk7XG5cbiAgICAvLyBHZXQgcmVmZXJlbmNlcyB0byB0aGUgcGFydHMgd2UgbmVlZFxuICAgIHRoaXMuc3RhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFkaXVzLWNvbnRyb2wnKTtcbiAgICB0aGlzLmNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yYWRpdXMtY29udHJvbF9fY2lyY2xlJyk7XG4gICAgdGhpcy5saW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhZGl1cy1jb250cm9sX19saW5lJyk7XG4gICAgdGhpcy5oYW5kbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFkaXVzLWNvbnRyb2xfX2hhbmRsZScpO1xuXG4gICAgdGhpcy5zdGFnZU9mZnNldCA9IHRoaXMuc3RhZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGFuZCBiaW5kIHRoZSBjYWxsYmFja3MgdG8gdGhlIGNsYXNzIGNvbnRleHRcbiAgICB0aGlzLmRvY01vdXNlTW92ZSA9IHRoaXMuZG9jTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kb2NNb3VzZVVwID0gdGhpcy5kb2NNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5oYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24pO1xuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duKGV2dCkge1xuICAgIC8vIHRoZSB4L3kgZGlzdGFuY2UgZnJvbSB0aGUgcG9pbnRlciB0byB0aGUgY2VudGVyIG9mIHRoZSBoYW5kbGVcbiAgICB0aGlzLm1vdXNlRG93bk9mZnNldCA9IHtcbiAgICAgIHg6XG4gICAgICAgIGV2dC5jbGllbnRYIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC54ICtcbiAgICAgICAgdGhpcy5vcHRpb25zLmhhbmRsZVJhZGl1cyAtXG4gICAgICAgIHRoaXMuaGFuZGxlLmdldEF0dHJpYnV0ZU5TKG51bGwsICdjeCcpLFxuICAgICAgeTpcbiAgICAgICAgZXZ0LmNsaWVudFkgLVxuICAgICAgICB0aGlzLnN0YWdlT2Zmc2V0LnkgK1xuICAgICAgICB0aGlzLm9wdGlvbnMuaGFuZGxlUmFkaXVzIC1cbiAgICAgICAgdGhpcy5oYW5kbGUuZ2V0QXR0cmlidXRlTlMobnVsbCwgJ2N5JylcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5kb2NNb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmRvY01vdXNlVXApO1xuICB9XG5cbiAgZG9jTW91c2VNb3ZlKGV2dCkge1xuICAgIGNvbnN0IHggPVxuICAgICAgZXZ0LmNsaWVudFggLVxuICAgICAgdGhpcy5zdGFnZU9mZnNldC54ICtcbiAgICAgIHRoaXMub3B0aW9ucy5oYW5kbGVSYWRpdXMgLVxuICAgICAgdGhpcy5tb3VzZURvd25PZmZzZXQueDtcbiAgICBjb25zdCB5ID1cbiAgICAgIGV2dC5jbGllbnRZIC1cbiAgICAgIHRoaXMuc3RhZ2VPZmZzZXQueSArXG4gICAgICB0aGlzLm9wdGlvbnMuaGFuZGxlUmFkaXVzIC1cbiAgICAgIHRoaXMubW91c2VEb3duT2Zmc2V0Lnk7XG5cbiAgICBjb25zdCBwMSA9IHsgeCwgeSB9O1xuICAgIGNvbnN0IHAyID0geyB4OiB0aGlzLm9wdGlvbnMuc2l6ZSAvIDIsIHk6IHRoaXMub3B0aW9ucy5zaXplIC8gMiB9O1xuICAgIC8vIGdldCBkaXN0YW5jZSBmcm9tIGNlbnRlciBvZiBzdGFnZVxuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5taW4oZ2V0RGlzdGFuY2UocDEsIHAyKSwgdGhpcy5vcHRpb25zLm1heFJhZGl1cyk7XG5cbiAgICBjb25zdCBhbmdsZSA9IGdldEFuZ2xlKHAxLCBwMik7XG4gICAgLy8gVGhlIGhhbmRsZSBzaG91bGQgbm90IHBhc3MgdGhlIG1heGltYWwgcmFkaXVzIGRlZmluZWQgaW4gb3B0aW9uc1xuICAgIGNvbnN0IG1heFggPSAtTWF0aC5zaW4oYW5nbGUpICogZGlzdGFuY2UgKyB0aGlzLm9wdGlvbnMuc2l6ZSAvIDI7XG4gICAgY29uc3QgbWF4WSA9IC1NYXRoLmNvcyhhbmdsZSkgKiBkaXN0YW5jZSArIHRoaXMub3B0aW9ucy5zaXplIC8gMjtcblxuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeCcsIG1heFgpO1xuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdjeScsIG1heFkpO1xuXG4gICAgdGhpcy5jaXJjbGUuc2V0QXR0cmlidXRlKCdyJywgZGlzdGFuY2UpO1xuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgbWF4WCk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZSgneTInLCBtYXhZKTtcblxuICAgIC8vIERpc3BhdGNoIGN1c3RvbSBFdmVudFxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd1cGRhdGUnLCB7IGRldGFpbDogZGlzdGFuY2UgfSk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIGRvY01vdXNlVXAoKSB7XG4gICAgLy8gQ2xlYW51cFxuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuZG9jTW91c2VNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2NNb3VzZVVwKTtcbiAgfVxufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgbmV3IFNWR1ByZXZpZXcoJ3N2ZycsICdwYXRoJyk7XG4gIH0pO1xufSBlbHNlIHtcbiAgbmV3IFNWR1ByZXZpZXcoJ3N2ZycsICdwYXRoJyk7XG59XG4iXSwibmFtZXMiOlsiZ2V0QW5nbGUiLCJnZXRPcHBvc2l0ZUxlbmd0aCIsImdldEFkamFjZW50TGVuZ3RoIiwiY29tbWFuZHNUb1N2Z1BhdGgiLCJtYXJrT3ZlcmxhcHBlZCIsInNob3J0ZXN0U2lkZSIsInJvdW5kVmFsdWVzIiwiZ2V0UHJldmlvdXNOb1oiLCJnZXROZXh0Tm9aIiwicmV2ZXJzZU1hcmtPdmVybGFwcGVkIiwiYnNwbGl0IiwiZ2V0RGlzdGFuY2UiLCJnZXRPZmZzZXQiLCJnZXRUYW5nZW50Tm9IeXAiLCJuZXdDb21tYW5kcyIsImNvbnZlcnRUb0Fic29sdXRlIiwicGFyc2VQYXRoIiwic3RyIiwibWFya2VyUmVnRXgiLCJkaWdpdFJlZ0V4IiwibWF0Y2hBbGwiLCJtYXAiLCJtYXRjaCIsIm1hcmtlciIsImluZGV4IiwicmVkdWNlUmlnaHQiLCJhY2MiLCJjdXIiLCJjaHVuayIsInN1YnN0cmluZyIsImxlbmd0aCIsImNvbmNhdCIsInN1YnN0ciIsInJldmVyc2UiLCJmbGF0TWFwIiwiY21kIiwidmFsdWVzIiwidmFscyIsInBhcnNlRmxvYXQiLCJyb3VuZENvbW1hbmRzIiwiY21kcyIsInIiLCJyb3VuZCIsInN1YnBhdGhzIiwibmV3Q21kcyIsImZvckVhY2giLCJlbCIsImUiLCJpIiwiYSIsInB1c2giLCJzdWJQYXRoQ21kcyIsImNsb3NlZFBhdGgiLCJmaWx0ZXIiLCJvdmVybGFwIiwiYXJyIiwibGFyZ2VBcmNGbGFnIiwicHJldiIsIm5leHQiLCJhbmdsZVBydiIsImFuZ2xlTnh0IiwiYW5nbGUiLCJkZWdyZWVzIiwiTWF0aCIsIlBJIiwic2hvcnRlc3QiLCJtYXhSYWRpdXMiLCJhYnMiLCJyYWRpdXMiLCJtaW4iLCJvIiwib2Zmc2V0Iiwic3dlZXBGbGFnIiwib3BlbkZpcnN0T3JMYXN0IiwicHJldlBvaW50IiwieCIsInkiLCJuZXh0UG9pbnQiLCJ0b0ZpeGVkIiwicmFkaXVzWCIsInJhZGl1c1kiLCJyb3RhdGlvbiIsImxhcmdlQXJjIiwic3dlZXAiLCJwYXRoIiwiY29tbWFuZHMiLCJyb3VuZENvcm5lcnMiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiY291bnRlciIsInByZXZpb3VzIiwibW9kIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsIngxIiwieTEiLCJ4MiIsInkyIiwicmVjIiwibUJlZm9yZSIsIm0iLCJhcnJheSIsImV2ZXJ5Iiwibnh0U2lkZSIsInBydlNpZGUiLCJwMSIsInAyIiwiYXRhbjIiLCJ4RGlmZiIsInlEaWZmIiwic3FydCIsInBvdyIsImhpcCIsInNpbiIsImNvcyIsImdldFRhbmdlbnRMZW5ndGgiLCJvcHBvc2l0ZSIsInRhbiIsIkluZmluaXR5IiwiaXNOYU4iLCJhZGphY2VudCIsInBvaW50cyIsInQwIiwibiIsImIiLCJyZXMxIiwicmVzMiIsInQxIiwicGYiLCJwIiwiZiIsInJlcyIsInBwIiwiaiIsInZhbHVlc09yZGVyIiwiZCIsImNtZEtleXMiLCJ2IiwiaW5kZXhPZiIsImpvaW4iLCJ0cmltIiwic3ZnbnMiLCJTVkdQcmV2aWV3Iiwic3RhZ2VTZWxlY3RvciIsInBhdGhTZWxlY3RvciIsImRvdHMiLCJkb3RSYWRpdXMiLCJtb3VzZURvd25PZmZzZXQiLCJhY3RpdmVEb3RJbmRleCIsInN0YWdlIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic3RhZ2VPZmZzZXQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyYW5nZVNsaWRlciIsInNldEF0dHJpYnV0ZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImNsb25lIiwiY2xvbmVOb2RlIiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiUmFuZ2VTbGlkZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiZGV0YWlsIiwidXBkYXRlUGF0aCIsIm1ldGFLZXkiLCJkb3RNb3VzZURvd24iLCJiaW5kIiwic3RhZ2VNb3VzZU1vdmUiLCJzdGFnZU1vdXNlVXAiLCJzdGFnZUNsaWNrIiwicmVkdWNlIiwiY3VyciIsInJDb3JuZXJzIiwiZG90IiwidGFyZ2V0IiwiY2xpZW50WCIsImxlZnQiLCJnZXRBdHRyaWJ1dGVOUyIsImNsaWVudFkiLCJ0b3AiLCJwYXRoQ21kIiwic2V0QXR0cmlidXRlTlMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlRWxlbWVudE5TIiwiYXBwZW5kQ2hpbGQiLCJzaGlmdEtleSIsIm5ld0RvdCIsImNvbnRhaW5lclNlbGVjdG9yIiwib3B0aW9ucyIsImRlZmF1bHRzIiwic2l6ZSIsIm1pblJhZGl1cyIsInN0YXJ0UmFkaXVzIiwiaGFuZGxlUmFkaXVzIiwiY29udGFpbmVyIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJkb2N1bWVudEZyYWdtZW50IiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY2lyY2xlIiwibGluZSIsImhhbmRsZSIsImRvY01vdXNlTW92ZSIsImRvY01vdXNlVXAiLCJoYW5kbGVNb3VzZURvd24iLCJkaXN0YW5jZSIsIm1heFgiLCJtYXhZIiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudFRhcmdldCIsInJlYWR5U3RhdGUiXSwic291cmNlUm9vdCI6IiJ9