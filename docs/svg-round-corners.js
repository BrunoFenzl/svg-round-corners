/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/main.js":
/*!**********************!*\
  !*** ./demo/main.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib */ "./lib/index.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


var xmlns = "http://www.w3.org/2000/svg";
var rangeSlider = document.getElementById('radius-range');

var svgs = _toConsumableArray(document.querySelectorAll('path'));

svgs.forEach(function (svg) {
  var parent = svg.closest('svg');
  var clone = svg.cloneNode(); // clone.setAttributeNS(null, 'style', 'stroke: red; stroke-opacity:0');

  clone.setAttributeNS(null, 'style', 'stroke: red');
  svg.insertAdjacentElement('beforebegin', clone);
  svg.setAttribute('data-original-d', svg.getAttribute('d'));
  var rCorners = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["roundCorners"])(svg.getAttribute('data-original-d'), rangeSlider.value);
  svg.setAttribute('d', rCorners.path);
  rCorners.commands.forEach(function (el, i) {
    var circle = document.createElementNS(xmlns, "circle");
    circle.setAttributeNS(null, 'cx', el.values.x || 0);
    circle.setAttributeNS(null, 'cy', el.values.y || 0); // circle.setAttributeNS(null, 'r', el.radius);

    parent.appendChild(circle); // const txt = document.createElementNS(xmlns, "text");
    // txt.setAttributeNS(null, 'x', el.values.x || 0);
    // txt.setAttributeNS(null, 'y', el.values.y || 0);
    // txt.appendChild(document.createTextNode(`${i} ${el.marker} ${el.degrees}`));
    // parent.appendChild(txt);

    if (el.degrees) {}
  });
});
rangeSlider.addEventListener('input', function () {
  svgs.forEach(function (svg) {
    var rCorners = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["roundCorners"])(svg.getAttribute('data-original-d'), rangeSlider.value);
    svg.setAttribute('d', rCorners.path);
  });
});

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: parsePath, roundCommands, roundCorners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return parsePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundCommands", function() { return roundCommands; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundCorners", function() { return roundCorners; });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./lib/utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }


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
    return Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["newCommands"])(cmd.marker, vals);
  }).map(_utils_js__WEBPACK_IMPORTED_MODULE_0__["convertToAbsolute"]);
}
/**
 * Iterates through an array of normalised commands and insert arcs where applicable.
 * This function modifies the array in place.
 * @param {array} cmds Array with commands to be modified
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {array} Sequence of commands containing arcs in place or corners
 */


function roundCommands(cmds, r, round) {
  var subpaths = [];
  var newCmds = [];

  if (round) {
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["roundValues"])(cmds, round);
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
    .map(_utils_js__WEBPACK_IMPORTED_MODULE_0__["markOverlapped"]);
    Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["reverseMarkOverlapped"])(subPathCmds, subPathCmds.length - 1);
    subPathCmds.filter(function (el) {
      return !el.overlap;
    }).map(function (el, i, arr) {
      var largeArcFlag = 0;
      var prev = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getPreviousNoZ"])(el, i, arr);
      var next = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getNextNoZ"])(el, i, arr);
      var anglePrv = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getAngle"])(el.values, prev.values);
      var angleNxt = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getAngle"])(el.values, next.values);
      var angle = angleNxt - anglePrv; // radians

      var degrees = angle * (180 / Math.PI); // prevent arc crossing the next command

      var shortest = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["shortestSide"])(el, prev, next);
      var maxRadius = Math.abs(Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getTangentNoHyp"])(angle / 2, shortest / 2));
      var radius = Math.min(r, maxRadius);
      var o = Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getOffset"])(angle, radius);
      var offset = o.offset;
      var sweepFlag = o.sweepFlag;

      switch (el.marker) {
        case 'M': // moveTo x,y

        case 'L':
          // lineTo x,y
          var prevPoint = [el.values.x + Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getOppositeLength"])(anglePrv, offset), el.values.y + Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getAdjacentLength"])(anglePrv, offset)];
          var nextPoint = [el.values.x + Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getOppositeLength"])(angleNxt, offset), el.values.y + Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["getAdjacentLength"])(angleNxt, offset)]; // there only need be a curve if and only if the next marker is a corner

          newCmds.push({
            marker: el.marker,
            values: {
              x: parseFloat(prevPoint[0].toFixed(3)),
              y: parseFloat(prevPoint[1].toFixed(3))
            }
          });

          if (next.marker === 'L' || next.marker === 'M') {
            newCmds.push({
              marker: 'A',
              degrees: degrees.toFixed(3),
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
          /*
          else if (next.marker === 'C') {
            const totalDistance = getDistance(
              { x:el.values.x, y: el.values.y },
              { x:next.values.x, y: next.values.y }
            );
             const p = offset / totalDistance;
            const splitted = bsplit(
              [
                [el.values.x, el.values.y],
                [next.values.x1, next.values.y1],
                [next.values.x2, next.values.y2],
                [next.values.x, next.values.y]
              ],
              p
            )[1];
             next.values = {
              x1: splitted[1][0],
              y1: splitted[1][1],
              x2: splitted[2][0],
              y2: splitted[2][1],
              x: splitted[3][0],
              y: splitted[3][1]
            }
             newCmds.push({
              marker: 'A',
              degrees: degrees.toFixed(3),
              values: {
                radiusX: r,
                radiusY: r,
                rotation: degrees,
                largeArc: largeArcFlag,
                sweep: sweepFlag,
                x: splitted[0][0],
                y: splitted[0][1],
              },
            });
           } 
          else {
            newCmds.push({ marker: el.marker, values: el.values });
          }
          */


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
    path: Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["commandsToSvgPath"])(newCmds),
    commands: newCmds
  };
}
/**
 * This is a shorthand for parsePath() and roundCommands().
 * You get the end result in one function call.
 * @param {string} str Raw string with commands from the path element
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {string} New commands sequence with rounded corners 
 */


function roundCorners(str, r, round) {
  return roundCommands(_toConsumableArray(parsePath(str)), r, round);
}



/***/ }),

/***/ "./lib/utils.js":
/*!**********************!*\
  !*** ./lib/utils.js ***!
  \**********************/
/*! exports provided: roundValues, getPreviousNoZ, getNextNoZ, convertToAbsolute, newCommands, mod, markOverlapped, reverseMarkOverlapped, shortestSide, getAngle, getDistance, getOppositeLength, getAdjacentLength, getTangentLength, getTangentNoHyp, getOffset, bsplit, commandsToSvgPath */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundValues", function() { return roundValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPreviousNoZ", function() { return getPreviousNoZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextNoZ", function() { return getNextNoZ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertToAbsolute", function() { return convertToAbsolute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "newCommands", function() { return newCommands; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mod", function() { return mod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markOverlapped", function() { return markOverlapped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reverseMarkOverlapped", function() { return reverseMarkOverlapped; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shortestSide", function() { return shortestSide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAngle", function() { return getAngle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistance", function() { return getDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOppositeLength", function() { return getOppositeLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAdjacentLength", function() { return getAdjacentLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTangentLength", function() { return getTangentLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTangentNoHyp", function() { return getTangentNoHyp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffset", function() { return getOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bsplit", function() { return bsplit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "commandsToSvgPath", function() { return commandsToSvgPath; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Round the values of each command to the given number of decimals.
 * This function modifies the array in place.
 * @param {array} cmds Sequence of commands
 * @param {number} round Number of decimal place to be rounded
 * @returns {array} Sequence of commands with their values rounded
 */
function roundValues(cmds, round) {
  cmds.forEach(function (el) {
    return Object.keys(el.values).forEach(function (key) {
      return el.values[key] = el.values[key] && parseFloat(el.values[key].toFixed(round));
    });
  });
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
    } // convert to L and add missing value

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
    easier to do the stitching latter.
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
 * Similar purpose as markOverlapped(). Recursively marks trailling commands that have the same end position as the inital 'M'.
 * This function modifies the array in place.
 * @param {array} cmds Commands array
 * @param {number} index Optional start index counting backwards. Ssually the last index from teh array
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
  return opposite / Math.tan(angle) || 0;
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
 * @param {number} angle Angle between points
 * @param {number} r Radius of the arc that should fit inside the triangle
 * @returns {any} Object containing offset and the arc's sweepFlag
 */

function getOffset(angle, r) {
  var offset;
  var sweepFlag = 0;
  var degrees = angle * (180 / Math.PI); // sharp angles

  if (degrees < 0 && degrees > -90 || degrees > 180 && degrees <= 270 || degrees <= -90 && degrees > -180) {
    offset = getTangentLength(angle / 2, -r);
    sweepFlag = 0;

    if (offset === -Infinity || offset == 0) {
      offset = -r;
    } // obtuse angles

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
    points[i] = _typeof(points[i]) == "object" ? points[i] : [points[i]];
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
;
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

    return "\n".concat(cmd.marker, " ").concat(d);
  }).join(' ').trim();
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby9tYWluLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbHMuanMiXSwibmFtZXMiOlsieG1sbnMiLCJyYW5nZVNsaWRlciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdmdzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzdmciLCJwYXJlbnQiLCJjbG9zZXN0IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJzZXRBdHRyaWJ1dGVOUyIsImluc2VydEFkamFjZW50RWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInJDb3JuZXJzIiwicm91bmRDb3JuZXJzIiwidmFsdWUiLCJwYXRoIiwiY29tbWFuZHMiLCJlbCIsImkiLCJjaXJjbGUiLCJjcmVhdGVFbGVtZW50TlMiLCJ2YWx1ZXMiLCJ4IiwieSIsImFwcGVuZENoaWxkIiwiZGVncmVlcyIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJzZVBhdGgiLCJzdHIiLCJtYXJrZXJSZWdFeCIsImRpZ2l0UmVnRXgiLCJtYXRjaEFsbCIsIm1hcCIsIm1hdGNoIiwibWFya2VyIiwiaW5kZXgiLCJyZWR1Y2VSaWdodCIsImFjYyIsImN1ciIsImNodW5rIiwic3Vic3RyaW5nIiwibGVuZ3RoIiwiY29uY2F0Iiwic3Vic3RyIiwicmV2ZXJzZSIsImZsYXRNYXAiLCJjbWQiLCJ2YWxzIiwicGFyc2VGbG9hdCIsIm5ld0NvbW1hbmRzIiwiY29udmVydFRvQWJzb2x1dGUiLCJyb3VuZENvbW1hbmRzIiwiY21kcyIsInIiLCJyb3VuZCIsInN1YnBhdGhzIiwibmV3Q21kcyIsInJvdW5kVmFsdWVzIiwiZSIsImEiLCJwdXNoIiwic3ViUGF0aENtZHMiLCJtYXJrT3ZlcmxhcHBlZCIsInJldmVyc2VNYXJrT3ZlcmxhcHBlZCIsImZpbHRlciIsIm92ZXJsYXAiLCJhcnIiLCJsYXJnZUFyY0ZsYWciLCJwcmV2IiwiZ2V0UHJldmlvdXNOb1oiLCJuZXh0IiwiZ2V0TmV4dE5vWiIsImFuZ2xlUHJ2IiwiZ2V0QW5nbGUiLCJhbmdsZU54dCIsImFuZ2xlIiwiTWF0aCIsIlBJIiwic2hvcnRlc3QiLCJzaG9ydGVzdFNpZGUiLCJtYXhSYWRpdXMiLCJhYnMiLCJnZXRUYW5nZW50Tm9IeXAiLCJyYWRpdXMiLCJtaW4iLCJvIiwiZ2V0T2Zmc2V0Iiwib2Zmc2V0Iiwic3dlZXBGbGFnIiwicHJldlBvaW50IiwiZ2V0T3Bwb3NpdGVMZW5ndGgiLCJnZXRBZGphY2VudExlbmd0aCIsIm5leHRQb2ludCIsInRvRml4ZWQiLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uIiwibGFyZ2VBcmMiLCJzd2VlcCIsImNvbW1hbmRzVG9TdmdQYXRoIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsImNvdW50ZXIiLCJwcmV2aW91cyIsIm1vZCIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInJlYyIsIm1CZWZvcmUiLCJtIiwiYXJyYXkiLCJldmVyeSIsIm54dFNpZGUiLCJnZXREaXN0YW5jZSIsInBydlNpZGUiLCJwMSIsInAyIiwiYXRhbjIiLCJ4RGlmZiIsInlEaWZmIiwic3FydCIsInBvdyIsImhpcCIsInNpbiIsImNvcyIsImdldFRhbmdlbnRMZW5ndGgiLCJvcHBvc2l0ZSIsInRhbiIsImFkamFjZW50IiwiSW5maW5pdHkiLCJic3BsaXQiLCJwb2ludHMiLCJ0MCIsIm4iLCJiIiwicmVzMSIsInJlczIiLCJ0MSIsInBmIiwicCIsImYiLCJyZXMiLCJwcCIsImoiLCJ2YWx1ZXNPcmRlciIsImQiLCJjbWRLZXlzIiwidiIsImluZGV4T2YiLCJqb2luIiwidHJpbSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVB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RCxHQWpCSSxFQWtCSkksSUFsQkksQ0FrQkMsR0FsQkQsRUFtQkpDLElBbkJJLEVBQVA7QUFvQkQsQyIsImZpbGUiOiJzdmctcm91bmQtY29ybmVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGVtby9tYWluLmpzXCIpO1xuIiwiaW1wb3J0IHsgcm91bmRDb3JuZXJzIH0gZnJvbSAnLi4vbGliJztcblxuY29uc3QgeG1sbnMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG5cbmNvbnN0IHJhbmdlU2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhZGl1cy1yYW5nZScpO1xuXG5jb25zdCBzdmdzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3BhdGgnKV07XG5cbnN2Z3MuZm9yRWFjaChzdmcgPT4ge1xuICBjb25zdCBwYXJlbnQgPSBzdmcuY2xvc2VzdCgnc3ZnJyk7XG4gIGNvbnN0IGNsb25lID0gc3ZnLmNsb25lTm9kZSgpO1xuICAvLyBjbG9uZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnc3R5bGUnLCAnc3Ryb2tlOiByZWQ7IHN0cm9rZS1vcGFjaXR5OjAnKTtcbiAgY2xvbmUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3N0eWxlJywgJ3N0cm9rZTogcmVkJyk7XG4gIHN2Zy5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgY2xvbmUpO1xuICBcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC1kJywgc3ZnLmdldEF0dHJpYnV0ZSgnZCcpKTtcbiAgY29uc3QgckNvcm5lcnMgPSByb3VuZENvcm5lcnMoc3ZnLmdldEF0dHJpYnV0ZSgnZGF0YS1vcmlnaW5hbC1kJyksIHJhbmdlU2xpZGVyLnZhbHVlKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSgnZCcsIHJDb3JuZXJzLnBhdGgpO1xuICBcbiAgckNvcm5lcnMuY29tbWFuZHMuZm9yRWFjaCgoZWwsIGkpID0+IHtcbiAgICBjb25zdCBjaXJjbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoeG1sbnMsIFwiY2lyY2xlXCIpO1xuICAgIGNpcmNsZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCAnY3gnLCBlbC52YWx1ZXMueCB8fCAwKTtcbiAgICBjaXJjbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgJ2N5JywgZWwudmFsdWVzLnkgfHwgMCk7XG4gICAgLy8gY2lyY2xlLnNldEF0dHJpYnV0ZU5TKG51bGwsICdyJywgZWwucmFkaXVzKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2lyY2xlKTtcbiAgICAvLyBjb25zdCB0eHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoeG1sbnMsIFwidGV4dFwiKTtcbiAgICAvLyB0eHQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3gnLCBlbC52YWx1ZXMueCB8fCAwKTtcbiAgICAvLyB0eHQuc2V0QXR0cmlidXRlTlMobnVsbCwgJ3knLCBlbC52YWx1ZXMueSB8fCAwKTtcbiAgICAvLyB0eHQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYCR7aX0gJHtlbC5tYXJrZXJ9ICR7ZWwuZGVncmVlc31gKSk7XG4gICAgLy8gcGFyZW50LmFwcGVuZENoaWxkKHR4dCk7XG4gICAgaWYgKGVsLmRlZ3JlZXMpIHtcbiAgICB9XG4gIH0pO1xufSlcblxucmFuZ2VTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XG4gIHN2Z3MuZm9yRWFjaChzdmcgPT4ge1xuICAgIGNvbnN0IHJDb3JuZXJzID0gcm91bmRDb3JuZXJzKHN2Zy5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3JpZ2luYWwtZCcpLCByYW5nZVNsaWRlci52YWx1ZSk7XG4gICAgc3ZnLnNldEF0dHJpYnV0ZSgnZCcsIHJDb3JuZXJzLnBhdGgpO1xuICAgIH1cbiAgKVxufSk7XG4iLCJpbXBvcnQgeyBnZXRBbmdsZSwgZ2V0T3Bwb3NpdGVMZW5ndGgsIGdldEFkamFjZW50TGVuZ3RoLCBjb21tYW5kc1RvU3ZnUGF0aCwgbWFya092ZXJsYXBwZWQsIHNob3J0ZXN0U2lkZSwgcm91bmRWYWx1ZXMsIGdldFByZXZpb3VzTm9aLCBnZXROZXh0Tm9aLCByZXZlcnNlTWFya092ZXJsYXBwZWQsIGJzcGxpdCwgZ2V0RGlzdGFuY2UsIGdldE9mZnNldCwgZ2V0VGFuZ2VudE5vSHlwLCBuZXdDb21tYW5kcywgY29udmVydFRvQWJzb2x1dGUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gY29tbWFuZCBzdHJpbmcgYW5kIGdlbmVyYXRlcyBhbiBhcnJheSBvZiBwYXJzZWQgY29tbWFuZHMuXG4gKiBUaGlzIGZ1bmN0aW9uIG5vcm1hbGlzZXMgYWxsIHJlbGF0aXZlIGNvbW1hbmRzIGludG8gYWJzb2x1dGUgY29tbWFuZHMgYW5kXG4gKiB0cmFuc2Zvcm1zIGgsIEgsIHYsIFYgdG8gTCBjb21tYW5kc1xuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBSYXcgc3RyaW5nIGZyb20gJ2QnIEF0dHJpYnV0ZVxuICogQHJldHVybnMge2FycmF5fSBBcnJheSBvZiBub3JtYWxpc2VkIGNvbW1hbmRzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUGF0aChzdHIpIHtcbiAgY29uc3QgbWFya2VyUmVnRXggPSAvW01tTGxTc1FxTGxIaFZ2Q2NTc1FxVHRBYVp6XS9nO1xuICBjb25zdCBkaWdpdFJlZ0V4ID0gLy0/WzAtOV0qXFwuP1xcZCsvZztcbiAgXG4gIHJldHVybiBbLi4uc3RyLm1hdGNoQWxsKG1hcmtlclJlZ0V4KV1cbiAgICAubWFwKChtYXRjaCkgPT4ge1xuICAgICAgcmV0dXJuIHsgbWFya2VyOiBtYXRjaFswXSwgaW5kZXg6IG1hdGNoLmluZGV4IH07XG4gICAgfSlcbiAgICAucmVkdWNlUmlnaHQoKGFjYywgY3VyKSA9PiB7XG4gICAgICBjb25zdCBjaHVuayA9IHN0ci5zdWJzdHJpbmcoXG4gICAgICAgIGN1ci5pbmRleCxcbiAgICAgICAgYWNjLmxlbmd0aCA/IGFjY1thY2MubGVuZ3RoIC0gMV0uaW5kZXggOiBzdHIubGVuZ3RoXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW1xuICAgICAgICB7XG4gICAgICAgICAgbWFya2VyOiBjdXIubWFya2VyLFxuICAgICAgICAgIGluZGV4OiBjdXIuaW5kZXgsXG4gICAgICAgICAgY2h1bms6IGNodW5rLmxlbmd0aCA+IDAgPyBjaHVuay5zdWJzdHIoMSwgY2h1bmsubGVuZ3RoIC0gMSkgOiBjaHVua1xuICAgICAgICB9XG4gICAgICBdKTtcbiAgICB9LCBbXSlcbiAgICAucmV2ZXJzZSgpXG4gICAgLmZsYXRNYXAoKGNtZCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVzID0gY21kLmNodW5rLm1hdGNoKGRpZ2l0UmVnRXgpO1xuICAgICAgY29uc3QgdmFscyA9IHZhbHVlcyA/IHZhbHVlcy5tYXAocGFyc2VGbG9hdCkgOiBbXTtcbiAgICAgIHJldHVybiBuZXdDb21tYW5kcyhjbWQubWFya2VyLCB2YWxzKTtcbiAgICB9KVxuICAgIC5tYXAoY29udmVydFRvQWJzb2x1dGUpO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggYW4gYXJyYXkgb2Ygbm9ybWFsaXNlZCBjb21tYW5kcyBhbmQgaW5zZXJ0IGFyY3Mgd2hlcmUgYXBwbGljYWJsZS5cbiAqIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIGFycmF5IGluIHBsYWNlLlxuICogQHBhcmFtIHthcnJheX0gY21kcyBBcnJheSB3aXRoIGNvbW1hbmRzIHRvIGJlIG1vZGlmaWVkXG4gKiBAcGFyYW0ge251bWJlcn0gciBFeHBlY3RlZCByYWRpdXMgb2YgdGhlIGFyY3MuXG4gKiBAcGFyYW0ge251bWJlcn0gcm91bmQgTnVtYmVyIG9mIGRlY2ltYWwgZGlnaXRzIHRvIHJvdW5kIHZhbHVlc1xuICogQHJldHVybnMge2FycmF5fSBTZXF1ZW5jZSBvZiBjb21tYW5kcyBjb250YWluaW5nIGFyY3MgaW4gcGxhY2Ugb3IgY29ybmVyc1xuICovXG5mdW5jdGlvbiByb3VuZENvbW1hbmRzKGNtZHMsIHIsIHJvdW5kKSB7XG4gIGxldCBzdWJwYXRocyA9IFtdO1xuICBsZXQgbmV3Q21kcyA9IFtdO1xuXG4gIGlmIChyb3VuZCkge1xuICAgIHJvdW5kVmFsdWVzKGNtZHMsIHJvdW5kKTtcbiAgfVxuXG4gIGNtZHNcbiAgICAvLyBzcGxpdCBzdWIgcGF0aHNcbiAgICAuZm9yRWFjaCgoZSwgaSwgYSkgPT4ge1xuICAgICAgaWYgKGUubWFya2VyID09PSAnTScpIHtcbiAgICAgICAgc3VicGF0aHMucHVzaChbXSk7XG4gICAgICB9XG4gICAgICBzdWJwYXRoc1tzdWJwYXRocy5sZW5ndGggLSAxXS5wdXNoKGUpO1xuICAgIH0pO1xuXG4gIHN1YnBhdGhzLmZvckVhY2goKHN1YlBhdGhDbWRzKSA9PiB7XG4gICAgc3ViUGF0aENtZHNcbiAgICAgIC8vIFdlIGFyZSBvbmx5IGV4Y2x1ZGluZyBsaW5lVG8gY29tbWFuZHMgdGhhdCBtYXkgYmUgb3ZlcmxhcHBpbmdcbiAgICAgIC5tYXAobWFya092ZXJsYXBwZWQpO1xuXG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKHN1YlBhdGhDbWRzLCBzdWJQYXRoQ21kcy5sZW5ndGggLSAxKTtcbiAgICBcbiAgICBzdWJQYXRoQ21kc1xuICAgICAgLmZpbHRlcigoZWwpID0+ICFlbC5vdmVybGFwKVxuICAgICAgLm1hcCgoZWwsIGksIGFycikgPT4ge1xuICAgICAgICBjb25zdCBsYXJnZUFyY0ZsYWcgPSAwO1xuICAgICAgICBjb25zdCBwcmV2ID0gZ2V0UHJldmlvdXNOb1ooZWwsIGksIGFycik7XG4gICAgICAgIGNvbnN0IG5leHQgPSBnZXROZXh0Tm9aKGVsLCBpLCBhcnIpO1xuICAgICAgICBjb25zdCBhbmdsZVBydiA9IGdldEFuZ2xlKGVsLnZhbHVlcywgcHJldi52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZU54dCA9IGdldEFuZ2xlKGVsLnZhbHVlcywgbmV4dC52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGFuZ2xlTnh0IC0gYW5nbGVQcnY7IC8vIHJhZGlhbnNcbiAgICAgICAgY29uc3QgZGVncmVlcyA9IGFuZ2xlICogKDE4MC9NYXRoLlBJKTtcbiAgICAgICAgLy8gcHJldmVudCBhcmMgY3Jvc3NpbmcgdGhlIG5leHQgY29tbWFuZFxuICAgICAgICBjb25zdCBzaG9ydGVzdCA9IHNob3J0ZXN0U2lkZShlbCwgcHJldiwgbmV4dCk7XG4gICAgICAgIGNvbnN0IG1heFJhZGl1cyA9IE1hdGguYWJzKGdldFRhbmdlbnROb0h5cChhbmdsZSAvIDIsIHNob3J0ZXN0IC8gMikpO1xuICAgICAgICBjb25zdCByYWRpdXMgPSBNYXRoLm1pbihyLCBtYXhSYWRpdXMpO1xuXG4gICAgICAgIGNvbnN0IG8gPSBnZXRPZmZzZXQoYW5nbGUsIHJhZGl1cyk7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IG8ub2Zmc2V0O1xuICAgICAgICBjb25zdCBzd2VlcEZsYWcgPSBvLnN3ZWVwRmxhZztcbiAgICAgICAgXG4gICAgICAgIHN3aXRjaCAoZWwubWFya2VyKSB7XG4gICAgICAgICAgY2FzZSAnTSc6IC8vIG1vdmVUbyB4LHlcbiAgICAgICAgICBjYXNlICdMJzogLy8gbGluZVRvIHgseVxuICAgICAgICAgICAgY29uc3QgcHJldlBvaW50ID0gW1xuICAgICAgICAgICAgICBlbC52YWx1ZXMueCArIGdldE9wcG9zaXRlTGVuZ3RoKGFuZ2xlUHJ2LCBvZmZzZXQpLFxuICAgICAgICAgICAgICBlbC52YWx1ZXMueSArIGdldEFkamFjZW50TGVuZ3RoKGFuZ2xlUHJ2LCBvZmZzZXQpXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSBbXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy54ICsgZ2V0T3Bwb3NpdGVMZW5ndGgoYW5nbGVOeHQsIG9mZnNldCksXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy55ICsgZ2V0QWRqYWNlbnRMZW5ndGgoYW5nbGVOeHQsIG9mZnNldClcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIC8vIHRoZXJlIG9ubHkgbmVlZCBiZSBhIGN1cnZlIGlmIGFuZCBvbmx5IGlmIHRoZSBuZXh0IG1hcmtlciBpcyBhIGNvcm5lclxuICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHtcbiAgICAgICAgICAgICAgbWFya2VyOiBlbC5tYXJrZXIsXG4gICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgIHg6IHBhcnNlRmxvYXQocHJldlBvaW50WzBdLnRvRml4ZWQoMykpLFxuICAgICAgICAgICAgICAgIHk6IHBhcnNlRmxvYXQocHJldlBvaW50WzFdLnRvRml4ZWQoMykpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG5leHQubWFya2VyID09PSAnTCcgfHwgbmV4dC5tYXJrZXIgPT09ICdNJykgeyAgXG4gICAgICAgICAgICAgIG5ld0NtZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbWFya2VyOiAnQScsXG4gICAgICAgICAgICAgICAgZGVncmVlczogZGVncmVlcy50b0ZpeGVkKDMpLFxuICAgICAgICAgICAgICAgIHJhZGl1czogcmFkaXVzLFxuICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgcmFkaXVzWDogcmFkaXVzLFxuICAgICAgICAgICAgICAgICAgcmFkaXVzWTogcmFkaXVzLFxuICAgICAgICAgICAgICAgICAgcm90YXRpb246IGRlZ3JlZXMsXG4gICAgICAgICAgICAgICAgICBsYXJnZUFyYzogbGFyZ2VBcmNGbGFnLFxuICAgICAgICAgICAgICAgICAgc3dlZXA6IHN3ZWVwRmxhZyxcbiAgICAgICAgICAgICAgICAgIHg6IHBhcnNlRmxvYXQobmV4dFBvaW50WzBdLnRvRml4ZWQoMykpLFxuICAgICAgICAgICAgICAgICAgeTogcGFyc2VGbG9hdChuZXh0UG9pbnRbMV0udG9GaXhlZCgzKSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIGVsc2UgaWYgKG5leHQubWFya2VyID09PSAnQycpIHtcbiAgICAgICAgICAgICAgY29uc3QgdG90YWxEaXN0YW5jZSA9IGdldERpc3RhbmNlKFxuICAgICAgICAgICAgICAgIHsgeDplbC52YWx1ZXMueCwgeTogZWwudmFsdWVzLnkgfSxcbiAgICAgICAgICAgICAgICB7IHg6bmV4dC52YWx1ZXMueCwgeTogbmV4dC52YWx1ZXMueSB9XG4gICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgY29uc3QgcCA9IG9mZnNldCAvIHRvdGFsRGlzdGFuY2U7XG4gICAgICAgICAgICAgIGNvbnN0IHNwbGl0dGVkID0gYnNwbGl0KFxuICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgIFtlbC52YWx1ZXMueCwgZWwudmFsdWVzLnldLFxuICAgICAgICAgICAgICAgICAgW25leHQudmFsdWVzLngxLCBuZXh0LnZhbHVlcy55MV0sXG4gICAgICAgICAgICAgICAgICBbbmV4dC52YWx1ZXMueDIsIG5leHQudmFsdWVzLnkyXSxcbiAgICAgICAgICAgICAgICAgIFtuZXh0LnZhbHVlcy54LCBuZXh0LnZhbHVlcy55XVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcFxuICAgICAgICAgICAgICApWzFdO1xuXG4gICAgICAgICAgICAgIG5leHQudmFsdWVzID0ge1xuICAgICAgICAgICAgICAgIHgxOiBzcGxpdHRlZFsxXVswXSxcbiAgICAgICAgICAgICAgICB5MTogc3BsaXR0ZWRbMV1bMV0sXG4gICAgICAgICAgICAgICAgeDI6IHNwbGl0dGVkWzJdWzBdLFxuICAgICAgICAgICAgICAgIHkyOiBzcGxpdHRlZFsyXVsxXSxcbiAgICAgICAgICAgICAgICB4OiBzcGxpdHRlZFszXVswXSxcbiAgICAgICAgICAgICAgICB5OiBzcGxpdHRlZFszXVsxXVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6ICdBJyxcbiAgICAgICAgICAgICAgICBkZWdyZWVzOiBkZWdyZWVzLnRvRml4ZWQoMyksXG4gICAgICAgICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgICByYWRpdXNYOiByLFxuICAgICAgICAgICAgICAgICAgcmFkaXVzWTogcixcbiAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBkZWdyZWVzLFxuICAgICAgICAgICAgICAgICAgbGFyZ2VBcmM6IGxhcmdlQXJjRmxhZyxcbiAgICAgICAgICAgICAgICAgIHN3ZWVwOiBzd2VlcEZsYWcsXG4gICAgICAgICAgICAgICAgICB4OiBzcGxpdHRlZFswXVswXSxcbiAgICAgICAgICAgICAgICAgIHk6IHNwbGl0dGVkWzBdWzFdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIG5ld0NtZHMucHVzaCh7IG1hcmtlcjogZWwubWFya2VyLCB2YWx1ZXM6IGVsLnZhbHVlcyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICovXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvLyBjYXNlICdIJzogLy8gaG9yaXpvbnRhbFRvIHguIFRyYW5zZm9ybWVkIHRvIEwgaW4gdXRpbHNcbiAgICAgICAgICAvLyBjYXNlICdWJzogLy8gdmVydGljYWxUbyB5LiBUcmFuc2Zvcm1lZCB0byBMIGluIHV0aWxzXG4gICAgICAgICAgY2FzZSAnQyc6IC8vIGN1YmljIGJlemnDqXI6IHgxIHkxLCB4MiB5MiwgeCB5XG4gICAgICAgICAgY2FzZSAnUyc6IC8vIHNob3J0IGJlemnDqXI6IHgyIHkyLCB4IHlcbiAgICAgICAgICBjYXNlICdRJzogLy8gcXVhZHJhdGljIGJlemnDqXI6IHgxIHkxLCB4IHlcbiAgICAgICAgICBjYXNlICdUJzogLy8gc2hvcnQgcXVhZHJhdGljIGJlemnDqXI6IHggeVxuICAgICAgICAgIGNhc2UgJ0EnOiAvLyBhcmM6IHJ4IHJ5IHgtYXhpcy1yb3RhdGlvbiBsYXJnZS1hcmMtZmxhZyBzd2VlcC1mbGFnIHggeVxuICAgICAgICAgIGNhc2UgJ1onOiAvLyBjbG9zZSBwYXRoXG4gICAgICAgICAgICBuZXdDbWRzLnB1c2goeyBtYXJrZXI6IGVsLm1hcmtlciwgdmFsdWVzOiBlbC52YWx1ZXMgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSlcblxuICAgIHJldHVybiB7XG4gICAgICBwYXRoOiBjb21tYW5kc1RvU3ZnUGF0aChuZXdDbWRzKSxcbiAgICAgIGNvbW1hbmRzOiBuZXdDbWRzXG4gICAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGEgc2hvcnRoYW5kIGZvciBwYXJzZVBhdGgoKSBhbmQgcm91bmRDb21tYW5kcygpLlxuICogWW91IGdldCB0aGUgZW5kIHJlc3VsdCBpbiBvbmUgZnVuY3Rpb24gY2FsbC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgUmF3IHN0cmluZyB3aXRoIGNvbW1hbmRzIGZyb20gdGhlIHBhdGggZWxlbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IHIgRXhwZWN0ZWQgcmFkaXVzIG9mIHRoZSBhcmNzLlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kIE51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyB0byByb3VuZCB2YWx1ZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IE5ldyBjb21tYW5kcyBzZXF1ZW5jZSB3aXRoIHJvdW5kZWQgY29ybmVycyBcbiAqL1xuZnVuY3Rpb24gcm91bmRDb3JuZXJzKHN0ciwgciwgcm91bmQpIHtcbiAgcmV0dXJuIHJvdW5kQ29tbWFuZHMoWy4uLnBhcnNlUGF0aChzdHIpXSwgciwgcm91bmQpO1xufVxuXG5leHBvcnQge1xuICBwYXJzZVBhdGgsXG4gIHJvdW5kQ29tbWFuZHMsXG4gIHJvdW5kQ29ybmVycyxcbn0iLCIvKipcbiAqIFJvdW5kIHRoZSB2YWx1ZXMgb2YgZWFjaCBjb21tYW5kIHRvIHRoZSBnaXZlbiBudW1iZXIgb2YgZGVjaW1hbHMuXG4gKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBhcnJheSBpbiBwbGFjZS5cbiAqIEBwYXJhbSB7YXJyYXl9IGNtZHMgU2VxdWVuY2Ugb2YgY29tbWFuZHNcbiAqIEBwYXJhbSB7bnVtYmVyfSByb3VuZCBOdW1iZXIgb2YgZGVjaW1hbCBwbGFjZSB0byBiZSByb3VuZGVkXG4gKiBAcmV0dXJucyB7YXJyYXl9IFNlcXVlbmNlIG9mIGNvbW1hbmRzIHdpdGggdGhlaXIgdmFsdWVzIHJvdW5kZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kVmFsdWVzKGNtZHMsIHJvdW5kKSB7XG4gIGNtZHMuZm9yRWFjaChlbCA9PiBcbiAgICBPYmplY3Qua2V5cyhlbC52YWx1ZXMpLmZvckVhY2goa2V5ID0+IFxuICAgICAgZWwudmFsdWVzW2tleV0gPSBlbC52YWx1ZXNba2V5XSAmJiBwYXJzZUZsb2F0KGVsLnZhbHVlc1trZXldLnRvRml4ZWQocm91bmQpKVxuICAgIClcbiAgKVxufVxuXG4vKipcbiAqIEdldCBwcmV2aW91cyBlbGVtZW50IGluIGFycmF5LCB3cmFwcGluZyBpZiBpbmRleCBpcyBvdXQgb2YgYm91bmRzIGFuZCBza2lwcGluZyBpZiB0aGUgY29tbWFuZCBpcyAnWidcbiAqIEBwYXJhbSB7YW55fSBlIENvbW1hbmQgb2JqZWN0IFxuICogQHBhcmFtIHtudW1iZXJ9IGkgQ3VycmVudCBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYSBBcnJheSBiZWluZyBpdGVyYXRlZFxuICogQHJldHVybnMge2FueX0gUHJldmlvdXMgZWxlbWVudCB0aGF0IGRvZXNuJ3QgaGF2ZSBhICdaJyBtYXJrZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByZXZpb3VzTm9aKGUsIGksIGEpIHtcbiAgY29uc3QgY291bnRlciA9IGkgLSAxO1xuICBjb25zdCBwcmV2aW91cyA9IGFbbW9kKGNvdW50ZXIsIGEubGVuZ3RoKV07XG5cbiAgaWYgKHByZXZpb3VzLm1hcmtlciAhPT0gJ1onKSB7XG4gICAgcmV0dXJuIHByZXZpb3VzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBnZXRQcmV2aW91c05vWihlLCBjb3VudGVyLCBhKTtcbiAgfVxufVxuXG4vKipcbiAqIEdldCBuZXh0IGVsZW1lbnQgaW4gYXJyYXksIHdyYXBwaW5nIGlmIGluZGV4IGlzIG91dCBvZiBib3VuZHMgYW5kIHNraXBwaW5nIGlmIHRoZSBjb21tYW5kIGlzICdaJ1xuICogQHBhcmFtIHthbnl9IGUgQ29tbWFuZCBvYmplY3QgXG4gKiBAcGFyYW0ge251bWJlcn0gaSBDdXJyZW50IGluZGV4XG4gKiBAcGFyYW0ge2FycmF5fSBhIEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKiBAcmV0dXJucyB7YW55fSBOZXh0IGVsZW1lbnQgdGhhdCBkb2Vzbid0IGhhdmUgYSAnWicgbWFya2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROZXh0Tm9aKGUsIGksIGEpIHtcbiAgY29uc3QgY291bnRlciA9IGkgKyAxO1xuICBjb25zdCBuZXh0ID0gYVttb2QoY291bnRlciwgYS5sZW5ndGgpXTtcblxuICBpZiAobmV4dC5tYXJrZXIgPT09ICdaJykge1xuICAgIHJldHVybiBnZXROZXh0Tm9aKGUsIGNvdW50ZXIsIGEpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXh0O1xuICB9XG59XG5cbi8qKlxuICogSXRlcmF0ZSB0aHJvdWdoIGFuIGFycmF5IGFuZCBjb252ZXJ0IGFsbCBjb21tYW5kcyB0byBhYnNvbHV0ZS5cbiAqIFRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIHVzZWQgYXMgYXJndW1lbnQgaW4gYSBtYXAoKSBjYWxsLlxuICogQHBhcmFtIHthbnl9IGVsIEN1cnJlbnQgZWxlbWVudCBpbiB0aGlzIGl0ZXJhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEN1cnJlbnQgaXRlcmF0aW9uIGluZGV4XG4gKiBAcGFyYW0ge2FycmF5fSBhcnIgQXJyYXkgYmVpbmcgaXRlcmF0ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRUb0Fic29sdXRlKGVsLCBpbmRleCwgYXJyKSB7XG4gIC8vIGdldCBwcmV2aW91cyBpdGVtIG9yIGNyZWF0ZSBvbmUgZW1wdHkgaWYgaXQgZG9lc250IGV4aXN0XG4gIGxldCBwcmV2ID0gYXJyW2luZGV4IC0gMV0gfHwgeyB2YWx1ZXM6IHsgeDogMCwgeTogMCB9IH07XG5cbiAgLy8gb25seSBuZWVkIHRvIHRlc3QgbG93ZXJjYXNlIChyZWxhdGl2ZSkgY29tbWFuZHNcbiAgaWYgKGVsLm1hcmtlciA9PT0gZWwubWFya2VyLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAvLyBjb252ZXJ0IGFsbCB0byB1cHBlcmNhc2VcbiAgICBlbC5tYXJrZXIgPSBlbC5tYXJrZXIudG9VcHBlckNhc2UoKTtcbiAgICBzd2l0Y2ggKGVsLm1hcmtlcikge1xuICAgICAgY2FzZSAnTSc6IC8vIG1vdmUgdG8geCx5XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnTCc6IC8vIGxpbmUgdG8geCx5XG4gICAgICBjYXNlICdBJzpcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdIJzogLy8gaG9yaXpvbnRhbFRvIHhcbiAgICAgICAgZWwubWFya2VyID0gJ0wnO1xuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSA9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVic6IC8vIHZlcnRpY2FsVG8geVxuICAgICAgICBlbC5tYXJrZXIgPSAnTCc7XG4gICAgICAgIGVsLnZhbHVlcy54ID0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdDJzogLy8gYmV6acOpciBjdXJ2ZSB4MSB5MSwgeDIgeTIsIHggeVxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBlbC52YWx1ZXMueDEgKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkxICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGVsLnZhbHVlcy54MiArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueTIgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdTJzpcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngyICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MiArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1EnOlxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBlbC52YWx1ZXMueDEgKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkxICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVCc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnWic6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgLy8gY29udmVydCB0byBMIGFuZCBhZGQgbWlzc2luZyB2YWx1ZVxuICB9IGVsc2UgaWYgKGVsLm1hcmtlciA9PT0gZWwubWFya2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICBzd2l0Y2ggKGVsLm1hcmtlcikge1xuICAgICAgY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4XG4gICAgICAgIGVsLm1hcmtlciA9ICdMJztcbiAgICAgICAgZWwudmFsdWVzLnkgPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1YnOiAvLyB2ZXJ0aWNhbFRvIHlcbiAgICAgICAgZWwubWFya2VyID0gJ0wnO1xuICAgICAgICBlbC52YWx1ZXMueCA9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qIFxuICAgICdaJyBjb21tYW5kcyBkb24ndCBoYXZlIGFueSBjb29yZGluYXRlIGJ1dCB3ZSBhcmUgY2xvbmluZyB0aGVcbiAgICBzdGFydCBjb29yZGluYXRlcyBkZWZpbmVkIGJ5IHRoaXMgc3VicGF0aCBpbml0aWFsICdNJyBzbyBpdCdzXG4gICAgZWFzaWVyIHRvIGRvIHRoZSBzdGl0Y2hpbmcgbGF0dGVyLlxuICAqL1xuICBpZiAoZWwubWFya2VyID09PSAnWicpIHtcbiAgICAvLyBmaW5kIHByZXZpb3VzICdNJyByZWN1cnNpdmVseVxuICAgIGZ1bmN0aW9uIHJlYyhhcnIsIGkpIHtcbiAgICAgIGlmIChhcnJbaV0ubWFya2VyID09PSAnTScpIHtcbiAgICAgICAgcmV0dXJuIGFycltpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZWMoYXJyLCBpIC0gMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBtQmVmb3JlID0gcmVjKGFyciwgaW5kZXgpO1xuICAgIGVsLnZhbHVlcy54ID0gbUJlZm9yZS52YWx1ZXMueDtcbiAgICBlbC52YWx1ZXMueSA9IG1CZWZvcmUudmFsdWVzLnk7XG4gIH1cblxuICByZXR1cm4gZWw7XG59XG5cbi8qKlxuICogVGFrZXMgb25lIG1hcmtlciBhbmQgYW4gYXJyYXkgb2YgbnVtYmVycyBhbmQgY3JlYXRlcyBvbmUgb3IgbW9yZSBjb21tYW5kIG9iamVjdHMgd2l0aCB0aGUgcmlnaHRcbiAqIHByb3BlcnRpZXMgYmFzZWQgb24gdGhlIGdpdmVuIG1hcmtlci4gU29tZSBtYXJrZXJzIGFsbG93IGZvciBtdWx0aXBsZSBjb29yZGluYXRlcyBmb3Igb25lIHNpbmdsZSBjb21tYW5kLlxuICogVGhpcyBmdW5jdGlvbiB0YWtlcyBjYXJlIG9mIHNwbGl0dGluZyBtdWx0aXBsZSBjb29yZGluYXRlcyBwZXIgY29tbWFuZCBhbmQgZ2VuZXJhdGluZyB0aGUgXG4gKiBAcGFyYW0ge3N0cmluZ30gbWFya2VyIExldHRlciBvZiB0aGUgY29tbWFuZCBiZWluZyBnZW5lcmF0ZWRcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlcyBBcnJheSBvZiBudW1iZXJzIHRvIGJlIHNwbGl0dGVkIGFuZCBwYXJzZWQgaW50byB0aGUgcmlnaHQgcHJvcGVydGllc1xuICogQHJldHVybnMge2FycmF5fSBBcnJheSBvZiBjb21tYW5kcy4gTW9zdCBvZiB0aGUgdGltZSB3aWxsIGhhdmUgb25seSBvbmUgaXRlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV3Q29tbWFuZHMobWFya2VyLCB2YWx1ZXMpIHtcbiAgY29uc3QgY21kcyA9IFtdO1xuXG4gIHN3aXRjaCAobWFya2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICBjYXNlICdNJzogLy8gbW92ZVRvIHgseVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGxldCBtO1xuICAgICAgICBpZiAobWFya2VyID09PSBtYXJrZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgIG0gPSBpID09PSAwID8gJ00nIDogJ0wnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSBpID09PSAwID8gJ20nIDogJ2wnO1xuICAgICAgICB9XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyOiBtLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnTCc6IC8vIGxpbmVUbyB4LHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSs9Mikge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0gnOiAvLyBob3Jpem9udGFsVG8geFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5OiAwLFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdWJzogLy8gdmVydGljYWxUbyB5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0MnOiAvLyBjdWJpYyBiZXppw6lyIGN1cnZlIHgxIHkxLCB4MiB5MiwgeCB5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrPTYpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4MTogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTE6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICB4MjogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIHkyOiB2YWx1ZXNbaSArIDNdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyA0XSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgNV0sXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1MnOlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKz00KSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDI6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHkyOiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgM10sXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1EnOlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKz00KSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDE6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHkxOiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgM10sXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1QnOlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQSc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrPTcpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICByYWRpdXNYOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICByYWRpdXNZOiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgICAgcm90YXRpb246IHZhbHVlc1tpICsgMl0sXG4gICAgICAgICAgICBsYXJnZUFyYzogdmFsdWVzW2kgKyAzXSxcbiAgICAgICAgICAgIHN3ZWVwOiB2YWx1ZXNbaSArIDRdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyA1XSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgNl0sXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1onOlxuICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgbWFya2VyLFxuICAgICAgICB2YWx1ZXM6IHsgLy8gdmFsdWVzIHdpbGwgYmUgb3ZlcnJpZGVuIGxhdGVyIGJ5IGNvbnZlcnRUb0Fic29sdXRlKClcbiAgICAgICAgICB4OiAwLFxuICAgICAgICAgIHk6IDAsXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGNtZHM7XG59XG5cbi8qKlxuICogVGFrZXMgYW4gaW5kZXggYW5kIGEgbGVuZ3RoIGFuZCByZXR1cm5zIHRoZSBpbmRleCB3cmFwcGVkIGlmIG91dCBvZiBib3VuZHMuXG4gKiBAcGFyYW0ge251bWJlcn0geCBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IG0gTGVuZ3RoXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBJbmRleCBvciB3cmFwcGVkIGluZGV4IGlmIG91dCBib3VuZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZCh4LCBtKSB7XG4gIHJldHVybiAoeCAlIG0gKyBtKSAlIG07XG59XG5cbi8qKlxuICogQ29tcGFyZXMgdGhlIGdpdmVuIGVsZW1lbnQgd2l0aCBpdCdzIHByZWRlY2Vzc29yIGFuZCBjaGVja3MgaWYgdGhlaXIgZW5kIHBvc2l0aW9uIGlzIHRoZSBzYW1lLlxuICogSWYgaXQgaXMsIGFkZCBhIGJvb2xlYW4gJ292ZXJsYXAnIHByb3BlcnR5IHRvIHRoZSBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBhcnJheSBlbGVtZW50cyBpbiBwbGFjZVxuICogQHBhcmFtIHthbnl9IGVsIENvbW1hbmQgb2JqZWN0XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggQ3VycmVudCBpdGVyYXRpb24gaW5kZXhcbiAqIEBwYXJhbSB7YXJyYXl9IGFycmF5IEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKiBAcmV0dXJucyB7YW55fSBDb21tYW5kIG9iamVjdFxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFya092ZXJsYXBwZWQoZWwsIGluZGV4LCBhcnJheSkge1xuICAvLyBTa2lwIHRoZSBmaXJzdCBtb3ZlVG8gY29tbWFuZCBhbmQgYW55IG90aGVyIHRoYXQncyBub3QgYSBsaW5lVG8uXG4gIGlmIChpbmRleCAhPT0gMCAmJiBlbC5tYXJrZXIgPT09ICdMJykge1xuICAgIC8vIEl0IHNlZW1zIHdlIGhhdmUgYSBsaW5lVG8gaGVyZS4gR2V0IHRoZSBpbW1lZGlhdGUgcHJldmlvdXMgY29tbWFuZFxuICAgIGxldCBwcmV2aW91cyA9IGFycmF5W2luZGV4IC0gMV07XG4gICAgLy8g4oCmYW5kIGNoZWNrIGlmIHRoZSB4LCB5IGNvb3JkaW5hdGVzIGFyZSBlcXVhbHMuXG4gICAgY29uc3Qgb3ZlcmxhcCA9IFsneCcsICd5J10uZXZlcnkoKGtleSkgPT4ge1xuICAgICAgLy8gSWYgeCBBTkQgeSBvdmVybGFwLCB0aGlzIGNvbW1hbmQgc2hvdWxkIGJlIHNraXBwZWRcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGguYWJzKHByZXZpb3VzLnZhbHVlc1trZXldIC0gZWwudmFsdWVzW2tleV0pKSA9PT0gMDtcbiAgICB9KTtcblxuICAgIGlmIChvdmVybGFwKSB7XG4gICAgICBlbC5vdmVybGFwID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBlbDtcbn1cblxuLyoqXG4gKiBTaW1pbGFyIHB1cnBvc2UgYXMgbWFya092ZXJsYXBwZWQoKS4gUmVjdXJzaXZlbHkgbWFya3MgdHJhaWxsaW5nIGNvbW1hbmRzIHRoYXQgaGF2ZSB0aGUgc2FtZSBlbmQgcG9zaXRpb24gYXMgdGhlIGluaXRhbCAnTScuXG4gKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBhcnJheSBpbiBwbGFjZS5cbiAqIEBwYXJhbSB7YXJyYXl9IGNtZHMgQ29tbWFuZHMgYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBPcHRpb25hbCBzdGFydCBpbmRleCBjb3VudGluZyBiYWNrd2FyZHMuIFNzdWFsbHkgdGhlIGxhc3QgaW5kZXggZnJvbSB0ZWggYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VNYXJrT3ZlcmxhcHBlZChjbWRzLCBjb3VudGVyKSB7IFxuICBjb25zdCBvdmVybGFwID0gWyd4JywgJ3knXS5ldmVyeSgoa2V5KSA9PiB7XG4gICAgLy8gSWYgeCBBTkQgeSBvdmVybGFwLCB0aGlzIGNvbW1hbmQgc2hvdWxkIGJlIHNraXBwZWRcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLmFicyhjbWRzW2NvdW50ZXJdLnZhbHVlc1trZXldIC0gY21kc1swXS52YWx1ZXNba2V5XSkpID09PSAwO1xuICB9KTtcblxuICBpZiAoY21kc1tjb3VudGVyXS5tYXJrZXIgPT09ICdMJyAmJiBvdmVybGFwKSB7XG4gICAgY21kc1tjb3VudGVyXS5vdmVybGFwID0gdHJ1ZTtcbiAgICByZXZlcnNlTWFya092ZXJsYXBwZWQoY21kcywgY291bnRlciAtIDEpXG4gIH1cbiAgXG4gIGlmIChjbWRzW2NvdW50ZXJdLm1hcmtlciA9PT0gJ1onKSB7XG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKGNtZHMsIGNvdW50ZXIgLSAxKVxuICB9XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY3VycmVudCBjb21tYW5kIGFuZFxuICogaXQncyBkaXJlY3QgbmVpZ2hib3VycyBhbmQgcmV0dXJucyB0aGUgbmVhcmVzdCBkaXN0YW5jZVxuICogQHBhcmFtIHthbnl9IGVsIGN1cnJlbnQgY29tbWFuZFxuICogQHBhcmFtIHthbnl9IHByZXZpb3VzIHByZXZpb3VzIGNvbW1hbmRcbiAqIEBwYXJhbSB7YW55fSBuZXh0IG5leHQgY29tbWFuZFxuICogQHJldHVybnMge251bWJlcn0gdGhlIGRpc3RhbmNlIHRvIHRlaCBuZWFyZXN0IGNvbW1hbmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3J0ZXN0U2lkZShlbCwgcHJldmlvdXMsIG5leHQpIHtcbiAgY29uc3Qgbnh0U2lkZSA9IGdldERpc3RhbmNlKGVsLnZhbHVlcywgbmV4dC52YWx1ZXMpO1xuICBjb25zdCBwcnZTaWRlID0gZ2V0RGlzdGFuY2UocHJldmlvdXMudmFsdWVzLCBlbC52YWx1ZXMpO1xuICByZXR1cm4gTWF0aC5taW4ocHJ2U2lkZSwgbnh0U2lkZSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYW5nbGUgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge2FueX0gcDEgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge2FueX0gcDIgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBBbmdsZSBpbiByYWRpYW5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBbmdsZShwMSwgcDIpIHtcbiAgcmV0dXJuIE1hdGguYXRhbjIocDIueCAtIHAxLngsIHAyLnkgLSBwMS55KTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7YW55fSBwMSBPYmplY3Qgd2l0aCB4IGFuZCB5IHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7YW55fSBwMiBPYmplY3Qgd2l0aCB4IGFuZCB5IHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IERpc3RhbmNlIGJldHdlZW4gcG9pbnRzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXN0YW5jZShwMSwgcDIpIHtcbiAgY29uc3QgeERpZmYgPSBwMS54IC0gcDIueDtcbiAgY29uc3QgeURpZmYgPSBwMS55IC0gcDIueTtcblxuICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHhEaWZmLCAyKSArIE1hdGgucG93KHlEaWZmLCAyKSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSBvcHBvc2l0ZSBzaWRlXG4gKiBvZiBhIGdpdmVuIGFuZ2xlIHVzaW5nIHRoZSBoeXBvdGhlbnVzZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaXAgSHlwb3RoZW51c2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aCBvZiB0aGUgb3Bwb3NpdGUgc2lkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3Bwb3NpdGVMZW5ndGgoYW5nbGUsIGhpcCkge1xuICByZXR1cm4gTWF0aC5zaW4oYW5nbGUpICogaGlwO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGUgYWRqYWNlbnQgc2lkZVxuICogb2YgYSBnaXZlbiBhbmdsZSB1c2luZyB0aGUgaHlwb3RoZW51c2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gaGlwIEh5cG90aGVudXNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIGFkamFjZW50IHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFkamFjZW50TGVuZ3RoKGFuZ2xlLCBoaXApIHtcbiAgcmV0dXJuIE1hdGguY29zKGFuZ2xlKSAqIGhpcDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhZGphY2VudCBzaWRlIG9mIHRoZSBnaXZlblxuICogYW5nbGUgdXNpbmcgdGhlIGFuZ2xlJ3Mgb3Bwb3NpdGUgc2lkZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHBvc2l0ZSBvcHBvc2l0ZSBzaWRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIGFkamFjZW50IHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhbmdlbnRMZW5ndGgoYW5nbGUsIG9wcG9zaXRlKSB7XG4gIHJldHVybiBvcHBvc2l0ZSAvIE1hdGgudGFuKGFuZ2xlKSB8fCAwO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIG9wcG9zaXRlIHNpZGUgb2YgdGhlIGdpdmVuXG4gKiBhbmdsZSB1c2luZyB0aGUgYW5nbGUncyBhZGphY2VudCBzaWRlXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgQW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGFkamFjZW50IGFkamFjZW50IHNpZGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aCBvZiB0aGUgb3Bwb3NpdGUgc2lkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFuZ2VudE5vSHlwKGFuZ2xlLCBhZGphY2VudCkge1xuICByZXR1cm4gYWRqYWNlbnQgKiBNYXRoLnRhbihhbmdsZSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gc2hvcnRlbiB0aGVcbiAqIGRpc3RhbmNlIGJldHdlZW4gY29tbWFuZHMgYmFzZWQgb24gdGhlIGdpdmVuIHJhZGl1cyB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGJldHdlZW4gcG9pbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gciBSYWRpdXMgb2YgdGhlIGFyYyB0aGF0IHNob3VsZCBmaXQgaW5zaWRlIHRoZSB0cmlhbmdsZVxuICogQHJldHVybnMge2FueX0gT2JqZWN0IGNvbnRhaW5pbmcgb2Zmc2V0IGFuZCB0aGUgYXJjJ3Mgc3dlZXBGbGFnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPZmZzZXQoYW5nbGUsIHIpIHtcbiAgbGV0IG9mZnNldDtcbiAgbGV0IHN3ZWVwRmxhZyA9IDA7XG4gIGxldCBkZWdyZWVzID0gYW5nbGUgKiAoMTgwL01hdGguUEkpO1xuXG4gIC8vIHNoYXJwIGFuZ2xlc1xuICBpZiAoXG4gICAgKGRlZ3JlZXMgPCAwICYmIGRlZ3JlZXMgPiAtOTApIHx8XG4gICAgKGRlZ3JlZXMgPiAxODAgJiYgZGVncmVlcyA8PSAyNzApIHx8XG4gICAgKGRlZ3JlZXMgPD0gLTkwICYmIGRlZ3JlZXMgPiAtMTgwKVxuICApIHtcbiAgICBvZmZzZXQgPSBnZXRUYW5nZW50TGVuZ3RoKGFuZ2xlLzIsIC1yKTtcbiAgICBzd2VlcEZsYWcgPSAwO1xuICAgIGlmIChvZmZzZXQgPT09IC1JbmZpbml0eSB8fCBvZmZzZXQgPT0gMCkge1xuICAgICAgb2Zmc2V0ID0gLXI7XG4gICAgfVxuICAvLyBvYnR1c2UgYW5nbGVzXG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0ID0gZ2V0VGFuZ2VudExlbmd0aChhbmdsZS8yLCByICk7XG4gICAgc3dlZXBGbGFnID0gMTtcbiAgICBpZiAob2Zmc2V0ID09PSBJbmZpbml0eSkge1xuICAgICAgb2Zmc2V0ID0gcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9mZnNldCxcbiAgICBzd2VlcEZsYWcsXG4gIH1cbn1cblxuLyoqXG4gKiBPcmlnaW5hbGx5IHRha2VuIGZyb206IGh0dHA6Ly9ibC5vY2tzLm9yZy9iYWxpbnQ0Mi84YzkzMTA2MDVkZjkzMDVjNDJiM1xuICogQGJyaWVmIERlIENhc3RlbGphdSdzIGFsZ29yaXRobSBzcGxpdHRpbmcgbi10aCBkZWdyZWUgQmV6aWVyIGN1cnZlXG4gKiBAcmV0dXJucyB7YXJyYXl9IFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnNwbGl0KHBvaW50cywgdDApIHtcbiAgY29uc3QgbiA9IHBvaW50cy5sZW5ndGggLSAxOyAvLyBudW1iZXIgb2YgY29udHJvbCBwb2ludHNcbiAgY29uc3QgYiA9IFtdO1x0XHQgICBcdCAgIC8vIGNvZWZmaWNpZW50cyBhcyBpbiBEZSBDYXN0ZWxqYXUncyBhbGdvcml0aG1cbiAgY29uc3QgcmVzMSA9IFtdO1x0XHQgICAvLyBmaXJzdCBjdXJ2ZSByZXN1bHRpbmcgY29udHJvbCBwb2ludHNcbiAgY29uc3QgcmVzMiA9IFtdO1x0XHQgICAvLyBzZWNvbmQgY3VydmUgcmVzdWx0aW5nIGNvbnRyb2wgcG9pbnRzXG4gIGNvbnN0IHQxID0gMSAtIHQwO1xuICBcbiAgLy8gbXVsdGlwbHkgcG9pbnQgd2l0aCBzY2FsYXIgZmFjdG9yXG4gIGNvbnN0IHBmID0gZnVuY3Rpb24ocCwgZikge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXMucHVzaChmICogcFtpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIC8vIGFkZCBwb2ludHMgYXMgdmVjdG9yc1xuICBjb25zdCBwcCA9IGZ1bmN0aW9uKHAxLCBwMikge1xuICAgIGNvbnN0IHJlcyA9IFtdO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbihwMS5sZW5ndGgsIHAyLmxlbmd0aCk7IGkrKykge1xuICAgICAgcmVzLnB1c2gocDFbaV0gKyBwMltpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG4gIFxuICAvLyBzZXQgb3JpZ2luYWwgY29lZmZpY2llbnRzOiBiW2ldWzBdID0gcG9pbnRzW2ldXG4gIGZvcihsZXQgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG4gICAgcG9pbnRzW2ldID0gKHR5cGVvZiBwb2ludHNbaV0gPT0gXCJvYmplY3RcIikgPyBwb2ludHNbaV0gOiBbcG9pbnRzW2ldXTtcbiAgICBiLnB1c2goWyBwb2ludHNbaV0gXSk7XG4gIH1cblxuICAvLyBnZXQgYWxsIGNvZWZmaWNpZW50c1xuICBmb3IobGV0IGogPSAxOyBqIDw9IG47IGorKykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPD0gKG4taik7IGkrKykge1xuICAgICAgYltpXS5wdXNoKCBcbiAgICAgICAgcHAoXG4gICAgICAgICAgcGYoYltpXVtqLTFdLCB0MSksXG4gICAgICAgICAgcGYoYltpKzFdW2otMV0sIHQwKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvLyBzZXQgcmVzdWx0OiByZXMxICYgcmVzMlxuICBmb3IobGV0IGogPSAwOyBqIDw9IG47IGorKykge1xuICAgIHJlczEucHVzaChiWzBdW2pdKTtcbiAgICByZXMyLnB1c2goYltqXVtuLWpdKTtcbiAgfVxuICBcbiAgcmV0dXJuIFtyZXMxLCByZXMyXTtcbn07XG5cbi8qKlxuICogQ29uY2F0ZW5hdGVzIGNvbW1hbmRzIGluIGEgc3RyaW5nIGFuZCBlbnN1cmVzIHRoYXQgZWFjaFxuICogdmFsdWUgZnJvbSBlYWNoIGNvbW1hbmQgaXMgcHJpbnRlZCBpbiB0aGUgcmlnaHQgb3JkZXJcbiAqIEBwYXJhbSB7YXJyYXl9IGNtZHMgQXJyYXkgb2Ygc3ZnIGNvbW1hbmRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgY29udGFpbmluZyBhbGwgY29tbWFuZHMgZm9ybWF0ZWQgcmVhZHkgZm9yIHRoZSAnZCcgQXR0cmlidXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tYW5kc1RvU3ZnUGF0aChjbWRzKSB7XG4gIC8vIHdoZW4gd3JpdGluZyB0aGUgY29tbWFuZHMgYmFjaywgdGhlIHJlbGV2YW50IHZhbHVlcyBzaG91bGQgYmUgd3JpdHRlbiBpbiB0aGlzIG9yZGVyXG4gIGNvbnN0IHZhbHVlc09yZGVyID0gW1xuICAgICdyYWRpdXNYJyxcbiAgICAncmFkaXVzWScsXG4gICAgJ3JvdGF0aW9uJyxcbiAgICAnbGFyZ2VBcmMnLFxuICAgICdzd2VlcCcsXG4gICAgJ3gxJyxcbiAgICAneTEnLFxuICAgICd4MicsXG4gICAgJ3kyJyxcbiAgICAneCcsXG4gICAgJ3knLFxuICBdO1xuXG4gIHJldHVybiBjbWRzXG4gICAgLm1hcCgoY21kKSA9PiB7XG4gICAgICAvLyBkZWZhdWx0cyBmb3IgZW1wdHkgc3RyaW5nLCBzbyBaIHdpbGwgb3V0cHV0IG5vIHZhbHVlc1xuICAgICAgbGV0IGQgPSAnJztcbiAgICAgIC8vIGZpbHRlciBhbnkgY29tbWFuZCB0aGF0J3Mgbm90IFpcbiAgICAgIGlmIChjbWQubWFya2VyICE9PSAnWicpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB2YWx1ZXMgZnJvbSBjdXJyZW50IGNvbW1hbmRcbiAgICAgICAgY29uc3QgY21kS2V5cyA9IE9iamVjdC5rZXlzKGNtZC52YWx1ZXMpO1xuICAgICAgICAvLyBmaWx0ZXIgdGhlIHZhbHVlc09yZGVyIGFycmF5IGZvciBvbmx5IHRoZSB2YWx1ZXMgdGhhdCBhcHBlYXIgaW4gdGhlIGN1cnJlbnQgY29tbWFuZC5cbiAgICAgICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHZhbHVlc09yZGVyIGd1YXJhbnRlZXMgdGhhdCB0aGUgcmVsZXZhbnQgdmFsdWVzIHdpbGwgYmUgaW4gdGhlIHJpZ2h0IG9yZGVyXG4gICAgICAgIGQgPSB2YWx1ZXNPcmRlci5maWx0ZXIodiA9PiBjbWRLZXlzLmluZGV4T2YodikgIT09IC0xKVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGtleSB3aXRoIGl0J3MgdmFsdWVcbiAgICAgICAgICAubWFwKGtleSA9PiBjbWQudmFsdWVzW2tleV0pXG4gICAgICAgICAgLy8gYW5kIHN0cmluZ2lmeSBldmVyeXRoaW5nIHRvZ2V0aGVyIHdpdGggYSBjb21tYSBpbmJldHdlZW4gdmFsdWVzXG4gICAgICAgICAgLmpvaW4oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgXFxuJHtjbWQubWFya2VyfSAke2R9YDtcbiAgICB9KVxuICAgIC5qb2luKCcgJylcbiAgICAudHJpbSgpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==