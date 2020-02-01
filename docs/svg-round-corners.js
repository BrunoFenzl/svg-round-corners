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
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/utils */ "./lib/utils.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var svgns = "http://www.w3.org/2000/svg";

var SVGPreview =
/*#__PURE__*/
function () {
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

    this.stage.setAttribute("width", window.innerWidth);
    this.stage.setAttribute("height", window.innerHeight); // create clone path to show the difference between original
    // and path with rounded corners.

    this.clone = this.path.cloneNode();
    this.clone.classList.add("original");
    this.path.insertAdjacentElement("beforebegin", this.clone);
    this.rangeSlider = new RangeSlider(".controller", {});
    this.rangeSlider.addEventListener("update", function (evt) {
      _this.radius = evt.detail;

      _this.updatePath();
    }); // bind event listeners to this class context

    this.dotMouseDown = this.dotMouseDown.bind(this);
    this.stageMouseMove = this.stageMouseMove.bind(this);
    this.stageMouseUp = this.stageMouseUp.bind(this);
    this.stageClick = this.stageClick.bind(this);
    this.stage.addEventListener("click", this.stageClick);
  }

  _createClass(SVGPreview, [{
    key: "updatePath",
    value: function updatePath() {
      // build the string
      var d = this.commands.reduce(function (acc, curr) {
        return acc += "".concat(curr.marker).concat(curr.values.x, ",").concat(curr.values.y);
      }, "") + "Z"; // update the path's

      this.path.setAttribute("d", d);
      this.path.setAttribute("data-original-d", d);
      this.clone.setAttribute("d", d); // round the corners

      var rCorners = Object(_lib__WEBPACK_IMPORTED_MODULE_0__["roundCorners"])(d, this.radius);
      this.path.setAttribute("d", rCorners.path);
    }
  }, {
    key: "dotMouseDown",
    value: function dotMouseDown(evt) {
      var dot = evt.target;
      this.activeDotIndex = this.dots.indexOf(dot);
      this.mouseDownOffset = {
        x: evt.clientX - this.stageOffset.left + this.dotRadius - dot.getAttributeNS(null, "cx"),
        y: evt.clientY - this.stageOffset.top + this.dotRadius - dot.getAttributeNS(null, "cy")
      };
      this.stage.addEventListener("mousemove", this.stageMouseMove);
      this.stage.addEventListener("mouseup", this.stageMouseUp);
    }
  }, {
    key: "stageMouseMove",
    value: function stageMouseMove(evt) {
      var dot = this.dots[this.activeDotIndex];
      var pathCmd = this.commands[this.activeDotIndex].values;
      pathCmd.x = evt.clientX - this.mouseDownOffset.x;
      pathCmd.y = evt.clientY - this.mouseDownOffset.y;
      this.updatePath();
      dot.setAttributeNS(null, "cx", pathCmd.x);
      dot.setAttributeNS(null, "cy", pathCmd.y);
    }
  }, {
    key: "stageMouseUp",
    value: function stageMouseUp(evt) {
      // Cleanup
      this.stage.removeEventListener("mousemove", this.stageMouseMove);
      this.stage.removeEventListener("mouseup", this.stageMouseUp);
    }
  }, {
    key: "newDot",
    value: function newDot(x, y) {
      var dot = document.createElementNS(svgns, "circle");
      dot.setAttributeNS(null, "cx", x);
      dot.setAttributeNS(null, "cy", y);
      dot.setAttributeNS(null, "r", this.dotRadius);
      this.stage.appendChild(dot);
      dot.addEventListener("mousedown", this.dotMouseDown.bind(this));
      return dot;
    }
  }, {
    key: "stageClick",
    value: function stageClick(evt) {
      // if dragging
      if (evt.shiftKey) return;
      var marker = this.commands.length ? "L" : "M";
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
      this.updatePath();
    }
  }]);

  return SVGPreview;
}();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    new SVGPreview("svg", "path");
  });
} else {
  new SVGPreview("svg", "path");
} // Component responsible for controlling the radius


var RangeSlider =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(RangeSlider, _EventTarget);

  function RangeSlider(containerSelector, options) {
    var _this2;

    _classCallCheck(this, RangeSlider);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(RangeSlider).call(this));
    var defaults = {
      size: 250,
      minRadius: 0,
      maxRadius: 70,
      startRadius: 20,
      handleRadius: 5
    };
    _this2.options = _objectSpread({}, defaults, {}, options);
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

    _this2.stage = document.querySelector(".radius-control");
    _this2.circle = document.querySelector(".radius-control__circle");
    _this2.line = document.querySelector(".radius-control__line");
    _this2.handle = document.querySelector(".radius-control__handle");
    _this2.stageOffset = _this2.stage.getBoundingClientRect(); // Add event listeners and bind the callbacks to the class context

    _this2.docMouseMove = _this2.docMouseMove.bind(_assertThisInitialized(_this2));
    _this2.docMouseUp = _this2.docMouseUp.bind(_assertThisInitialized(_this2));
    _this2.handleMouseDown = _this2.handleMouseDown.bind(_assertThisInitialized(_this2));

    _this2.handle.addEventListener("mousedown", _this2.handleMouseDown);

    return _this2;
  }

  _createClass(RangeSlider, [{
    key: "handleMouseDown",
    value: function handleMouseDown(evt) {
      // the x/y distance from the pointer to the center of the handle
      this.mouseDownOffset = {
        x: evt.clientX - this.stageOffset.x + this.options.handleRadius - this.handle.getAttributeNS(null, "cx"),
        y: evt.clientY - this.stageOffset.y + this.options.handleRadius - this.handle.getAttributeNS(null, "cy")
      };
      document.addEventListener("mousemove", this.docMouseMove);
      document.addEventListener("mouseup", this.docMouseUp);
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

      var distance = Math.min(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__["getDistance"])(p1, p2), this.options.maxRadius);
      var angle = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_1__["getAngle"])(p1, p2); // The handle should not pass the maximal radius defined in options

      var maxX = -Math.sin(angle) * distance + this.options.size / 2;
      var maxY = -Math.cos(angle) * distance + this.options.size / 2;
      this.handle.setAttributeNS(null, "cx", maxX);
      this.handle.setAttributeNS(null, "cy", maxY);
      this.circle.setAttribute("r", distance);
      this.line.setAttribute("x2", maxX);
      this.line.setAttribute("y2", maxY); // Dispatch custom Event

      var event = new CustomEvent("update", {
        detail: distance
      });
      this.dispatchEvent(event);
    }
  }, {
    key: "docMouseUp",
    value: function docMouseUp() {
      // Cleanup
      document.removeEventListener("mousemove", this.docMouseMove);
      document.removeEventListener("mouseup", this.docMouseUp);
    }
  }]);

  return RangeSlider;
}(_wrapNativeSuper(EventTarget));

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
 * @param {array} _cmds Array with commands to be modified
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {array} Sequence of commands containing arcs in place or corners
 */


function roundCommands(cmds, r, round) {
  var subpaths = [];
  var newCmds = [];

  if (round) {
    cmds.forEach(function (el) {
      return Object(_utils_js__WEBPACK_IMPORTED_MODULE_0__["roundValues"])(el, round);
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

  if (a === Infinity || a === -Infinity) {
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

  if (degrees < 0 && degrees > -90 || degrees > 180 && degrees <= 270 || degrees <= -90 && degrees > -180) {
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

    return "".concat(cmd.marker).concat(d);
  }).join('').trim();
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby9tYWluLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbHMuanMiXSwibmFtZXMiOlsic3ZnbnMiLCJTVkdQcmV2aWV3Iiwic3RhZ2VTZWxlY3RvciIsInBhdGhTZWxlY3RvciIsImNvbW1hbmRzIiwiZG90cyIsImRvdFJhZGl1cyIsIm1vdXNlRG93bk9mZnNldCIsIngiLCJ5IiwiYWN0aXZlRG90SW5kZXgiLCJyYWRpdXMiLCJzdGFnZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YWdlT2Zmc2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGF0aCIsInJhbmdlU2xpZGVyIiwic2V0QXR0cmlidXRlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJSYW5nZVNsaWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJkZXRhaWwiLCJ1cGRhdGVQYXRoIiwiZG90TW91c2VEb3duIiwiYmluZCIsInN0YWdlTW91c2VNb3ZlIiwic3RhZ2VNb3VzZVVwIiwic3RhZ2VDbGljayIsImQiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwibWFya2VyIiwidmFsdWVzIiwickNvcm5lcnMiLCJyb3VuZENvcm5lcnMiLCJkb3QiLCJ0YXJnZXQiLCJpbmRleE9mIiwiY2xpZW50WCIsImxlZnQiLCJnZXRBdHRyaWJ1dGVOUyIsImNsaWVudFkiLCJ0b3AiLCJwYXRoQ21kIiwic2V0QXR0cmlidXRlTlMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlRWxlbWVudE5TIiwiYXBwZW5kQ2hpbGQiLCJzaGlmdEtleSIsImxlbmd0aCIsInB1c2giLCJuZXdEb3QiLCJyZWFkeVN0YXRlIiwiY29udGFpbmVyU2VsZWN0b3IiLCJvcHRpb25zIiwiZGVmYXVsdHMiLCJzaXplIiwibWluUmFkaXVzIiwibWF4UmFkaXVzIiwic3RhcnRSYWRpdXMiLCJoYW5kbGVSYWRpdXMiLCJzdHIiLCJjb250YWluZXIiLCJyYW5nZSIsImNyZWF0ZVJhbmdlIiwic2VsZWN0Tm9kZSIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJjaXJjbGUiLCJsaW5lIiwiaGFuZGxlIiwiZG9jTW91c2VNb3ZlIiwiZG9jTW91c2VVcCIsImhhbmRsZU1vdXNlRG93biIsInAxIiwicDIiLCJkaXN0YW5jZSIsIk1hdGgiLCJtaW4iLCJnZXREaXN0YW5jZSIsImFuZ2xlIiwiZ2V0QW5nbGUiLCJtYXhYIiwic2luIiwibWF4WSIsImNvcyIsImV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnRUYXJnZXQiLCJwYXJzZVBhdGgiLCJtYXJrZXJSZWdFeCIsImRpZ2l0UmVnRXgiLCJtYXRjaEFsbCIsIm1hcCIsIm1hdGNoIiwiaW5kZXgiLCJyZWR1Y2VSaWdodCIsImN1ciIsImNodW5rIiwic3Vic3RyaW5nIiwiY29uY2F0Iiwic3Vic3RyIiwicmV2ZXJzZSIsImZsYXRNYXAiLCJjbWQiLCJ2YWxzIiwicGFyc2VGbG9hdCIsIm5ld0NvbW1hbmRzIiwiY29udmVydFRvQWJzb2x1dGUiLCJyb3VuZENvbW1hbmRzIiwiY21kcyIsInIiLCJyb3VuZCIsInN1YnBhdGhzIiwibmV3Q21kcyIsImZvckVhY2giLCJlbCIsInJvdW5kVmFsdWVzIiwiZSIsImkiLCJhIiwic3ViUGF0aENtZHMiLCJtYXJrT3ZlcmxhcHBlZCIsInJldmVyc2VNYXJrT3ZlcmxhcHBlZCIsImZpbHRlciIsIm92ZXJsYXAiLCJhcnIiLCJsYXJnZUFyY0ZsYWciLCJwcmV2IiwiZ2V0UHJldmlvdXNOb1oiLCJuZXh0IiwiZ2V0TmV4dE5vWiIsImFuZ2xlUHJ2IiwiYW5nbGVOeHQiLCJkZWdyZWVzIiwiUEkiLCJzaG9ydGVzdCIsInNob3J0ZXN0U2lkZSIsImFicyIsImdldFRhbmdlbnROb0h5cCIsIm8iLCJnZXRPZmZzZXQiLCJvZmZzZXQiLCJzd2VlcEZsYWciLCJwcmV2UG9pbnQiLCJnZXRPcHBvc2l0ZUxlbmd0aCIsImdldEFkamFjZW50TGVuZ3RoIiwibmV4dFBvaW50IiwidG9GaXhlZCIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb24iLCJsYXJnZUFyYyIsInN3ZWVwIiwiY29tbWFuZHNUb1N2Z1BhdGgiLCJPYmplY3QiLCJrZXlzIiwia2V5IiwiY291bnRlciIsInByZXZpb3VzIiwibW9kIiwidG9Mb3dlckNhc2UiLCJ0b1VwcGVyQ2FzZSIsIngxIiwieTEiLCJ4MiIsInkyIiwicmVjIiwibUJlZm9yZSIsIm0iLCJhcnJheSIsImV2ZXJ5Iiwibnh0U2lkZSIsInBydlNpZGUiLCJhdGFuMiIsInhEaWZmIiwieURpZmYiLCJzcXJ0IiwicG93IiwiaGlwIiwiZ2V0VGFuZ2VudExlbmd0aCIsIm9wcG9zaXRlIiwidGFuIiwiSW5maW5pdHkiLCJhZGphY2VudCIsImJzcGxpdCIsInBvaW50cyIsInQwIiwibiIsImIiLCJyZXMxIiwicmVzMiIsInQxIiwicGYiLCJwIiwiZiIsInJlcyIsInBwIiwiaiIsInZhbHVlc09yZGVyIiwiY21kS2V5cyIsInYiLCJqb2luIiwidHJpbSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFPQSxJQUFNQSxLQUFLLEdBQUcsNEJBQWQ7O0lBRU1DLFU7OztBQUNKLHNCQUFZQyxhQUFaLEVBQTJCQyxZQUEzQixFQUF5QztBQUFBOztBQUFBOztBQUN2QyxTQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZLEVBQVo7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QjtBQUFFQyxPQUFDLEVBQUUsQ0FBTDtBQUFRQyxPQUFDLEVBQUU7QUFBWCxLQUF2QjtBQUNBLFNBQUtDLGNBQUw7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUVBLFNBQUtDLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCWixhQUF2QixDQUFiO0FBQ0EsU0FBS2EsV0FBTCxHQUFtQixLQUFLSCxLQUFMLENBQVdJLHFCQUFYLEVBQW5CO0FBQ0EsU0FBS0MsSUFBTCxHQUFZSixRQUFRLENBQUNDLGFBQVQsQ0FBdUJYLFlBQXZCLENBQVo7QUFDQSxTQUFLZSxXQUFMLEdBQW1CLEtBQUtBLFdBQXhCLENBWHVDLENBYXZDOztBQUNBLFNBQUtOLEtBQUwsQ0FBV08sWUFBWCxDQUF3QixPQUF4QixFQUFpQ0MsTUFBTSxDQUFDQyxVQUF4QztBQUNBLFNBQUtULEtBQUwsQ0FBV08sWUFBWCxDQUF3QixRQUF4QixFQUFrQ0MsTUFBTSxDQUFDRSxXQUF6QyxFQWZ1QyxDQWlCdkM7QUFDQTs7QUFDQSxTQUFLQyxLQUFMLEdBQWEsS0FBS04sSUFBTCxDQUFVTyxTQUFWLEVBQWI7QUFDQSxTQUFLRCxLQUFMLENBQVdFLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCLFVBQXpCO0FBQ0EsU0FBS1QsSUFBTCxDQUFVVSxxQkFBVixDQUFnQyxhQUFoQyxFQUErQyxLQUFLSixLQUFwRDtBQUVBLFNBQUtMLFdBQUwsR0FBbUIsSUFBSVUsV0FBSixDQUFnQixhQUFoQixFQUErQixFQUEvQixDQUFuQjtBQUNBLFNBQUtWLFdBQUwsQ0FBaUJXLGdCQUFqQixDQUFrQyxRQUFsQyxFQUE0QyxVQUFBQyxHQUFHLEVBQUk7QUFDakQsV0FBSSxDQUFDbkIsTUFBTCxHQUFjbUIsR0FBRyxDQUFDQyxNQUFsQjs7QUFDQSxXQUFJLENBQUNDLFVBQUw7QUFDRCxLQUhELEVBeEJ1QyxDQTZCdkM7O0FBQ0EsU0FBS0MsWUFBTCxHQUFvQixLQUFLQSxZQUFMLENBQWtCQyxJQUFsQixDQUF1QixJQUF2QixDQUFwQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsS0FBS0EsY0FBTCxDQUFvQkQsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdEI7QUFDQSxTQUFLRSxZQUFMLEdBQW9CLEtBQUtBLFlBQUwsQ0FBa0JGLElBQWxCLENBQXVCLElBQXZCLENBQXBCO0FBQ0EsU0FBS0csVUFBTCxHQUFrQixLQUFLQSxVQUFMLENBQWdCSCxJQUFoQixDQUFxQixJQUFyQixDQUFsQjtBQUVBLFNBQUt0QixLQUFMLENBQVdpQixnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxLQUFLUSxVQUExQztBQUNEOzs7O2lDQUVZO0FBQ1g7QUFDQSxVQUFNQyxDQUFDLEdBQ0wsS0FBS2xDLFFBQUwsQ0FBY21DLE1BQWQsQ0FDRSxVQUFDQyxHQUFELEVBQU1DLElBQU47QUFBQSxlQUNHRCxHQUFHLGNBQU9DLElBQUksQ0FBQ0MsTUFBWixTQUFxQkQsSUFBSSxDQUFDRSxNQUFMLENBQVluQyxDQUFqQyxjQUFzQ2lDLElBQUksQ0FBQ0UsTUFBTCxDQUFZbEMsQ0FBbEQsQ0FETjtBQUFBLE9BREYsRUFHRSxFQUhGLElBSUksR0FMTixDQUZXLENBU1g7O0FBQ0EsV0FBS1EsSUFBTCxDQUFVRSxZQUFWLENBQXVCLEdBQXZCLEVBQTRCbUIsQ0FBNUI7QUFDQSxXQUFLckIsSUFBTCxDQUFVRSxZQUFWLENBQXVCLGlCQUF2QixFQUEwQ21CLENBQTFDO0FBQ0EsV0FBS2YsS0FBTCxDQUFXSixZQUFYLENBQXdCLEdBQXhCLEVBQTZCbUIsQ0FBN0IsRUFaVyxDQWNYOztBQUNBLFVBQU1NLFFBQVEsR0FBR0MseURBQVksQ0FBQ1AsQ0FBRCxFQUFJLEtBQUszQixNQUFULENBQTdCO0FBQ0EsV0FBS00sSUFBTCxDQUFVRSxZQUFWLENBQXVCLEdBQXZCLEVBQTRCeUIsUUFBUSxDQUFDM0IsSUFBckM7QUFDRDs7O2lDQUVZYSxHLEVBQUs7QUFDaEIsVUFBTWdCLEdBQUcsR0FBR2hCLEdBQUcsQ0FBQ2lCLE1BQWhCO0FBQ0EsV0FBS3JDLGNBQUwsR0FBc0IsS0FBS0wsSUFBTCxDQUFVMkMsT0FBVixDQUFrQkYsR0FBbEIsQ0FBdEI7QUFDQSxXQUFLdkMsZUFBTCxHQUF1QjtBQUNyQkMsU0FBQyxFQUNDc0IsR0FBRyxDQUFDbUIsT0FBSixHQUNBLEtBQUtsQyxXQUFMLENBQWlCbUMsSUFEakIsR0FFQSxLQUFLNUMsU0FGTCxHQUdBd0MsR0FBRyxDQUFDSyxjQUFKLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLENBTG1CO0FBTXJCMUMsU0FBQyxFQUNDcUIsR0FBRyxDQUFDc0IsT0FBSixHQUNBLEtBQUtyQyxXQUFMLENBQWlCc0MsR0FEakIsR0FFQSxLQUFLL0MsU0FGTCxHQUdBd0MsR0FBRyxDQUFDSyxjQUFKLENBQW1CLElBQW5CLEVBQXlCLElBQXpCO0FBVm1CLE9BQXZCO0FBYUEsV0FBS3ZDLEtBQUwsQ0FBV2lCLGdCQUFYLENBQTRCLFdBQTVCLEVBQXlDLEtBQUtNLGNBQTlDO0FBQ0EsV0FBS3ZCLEtBQUwsQ0FBV2lCLGdCQUFYLENBQTRCLFNBQTVCLEVBQXVDLEtBQUtPLFlBQTVDO0FBQ0Q7OzttQ0FFY04sRyxFQUFLO0FBQ2xCLFVBQU1nQixHQUFHLEdBQUcsS0FBS3pDLElBQUwsQ0FBVSxLQUFLSyxjQUFmLENBQVo7QUFDQSxVQUFNNEMsT0FBTyxHQUFHLEtBQUtsRCxRQUFMLENBQWMsS0FBS00sY0FBbkIsRUFBbUNpQyxNQUFuRDtBQUNBVyxhQUFPLENBQUM5QyxDQUFSLEdBQVlzQixHQUFHLENBQUNtQixPQUFKLEdBQWMsS0FBSzFDLGVBQUwsQ0FBcUJDLENBQS9DO0FBQ0E4QyxhQUFPLENBQUM3QyxDQUFSLEdBQVlxQixHQUFHLENBQUNzQixPQUFKLEdBQWMsS0FBSzdDLGVBQUwsQ0FBcUJFLENBQS9DO0FBQ0EsV0FBS3VCLFVBQUw7QUFFQWMsU0FBRyxDQUFDUyxjQUFKLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCRCxPQUFPLENBQUM5QyxDQUF2QztBQUNBc0MsU0FBRyxDQUFDUyxjQUFKLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCRCxPQUFPLENBQUM3QyxDQUF2QztBQUNEOzs7aUNBRVlxQixHLEVBQUs7QUFDaEI7QUFDQSxXQUFLbEIsS0FBTCxDQUFXNEMsbUJBQVgsQ0FBK0IsV0FBL0IsRUFBNEMsS0FBS3JCLGNBQWpEO0FBQ0EsV0FBS3ZCLEtBQUwsQ0FBVzRDLG1CQUFYLENBQStCLFNBQS9CLEVBQTBDLEtBQUtwQixZQUEvQztBQUNEOzs7MkJBRU01QixDLEVBQUdDLEMsRUFBRztBQUNYLFVBQU1xQyxHQUFHLEdBQUdqQyxRQUFRLENBQUM0QyxlQUFULENBQXlCekQsS0FBekIsRUFBZ0MsUUFBaEMsQ0FBWjtBQUNBOEMsU0FBRyxDQUFDUyxjQUFKLENBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCL0MsQ0FBL0I7QUFDQXNDLFNBQUcsQ0FBQ1MsY0FBSixDQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQjlDLENBQS9CO0FBQ0FxQyxTQUFHLENBQUNTLGNBQUosQ0FBbUIsSUFBbkIsRUFBeUIsR0FBekIsRUFBOEIsS0FBS2pELFNBQW5DO0FBQ0EsV0FBS00sS0FBTCxDQUFXOEMsV0FBWCxDQUF1QlosR0FBdkI7QUFFQUEsU0FBRyxDQUFDakIsZ0JBQUosQ0FBcUIsV0FBckIsRUFBa0MsS0FBS0ksWUFBTCxDQUFrQkMsSUFBbEIsQ0FBdUIsSUFBdkIsQ0FBbEM7QUFFQSxhQUFPWSxHQUFQO0FBQ0Q7OzsrQkFFVWhCLEcsRUFBSztBQUNkO0FBQ0EsVUFBSUEsR0FBRyxDQUFDNkIsUUFBUixFQUFrQjtBQUVsQixVQUFNakIsTUFBTSxHQUFHLEtBQUt0QyxRQUFMLENBQWN3RCxNQUFkLEdBQXVCLEdBQXZCLEdBQTZCLEdBQTVDO0FBQ0EsVUFBTXBELENBQUMsR0FBR3NCLEdBQUcsQ0FBQ21CLE9BQUosR0FBYyxLQUFLbEMsV0FBTCxDQUFpQm1DLElBQXpDO0FBQ0EsVUFBTXpDLENBQUMsR0FBR3FCLEdBQUcsQ0FBQ3NCLE9BQUosR0FBYyxLQUFLckMsV0FBTCxDQUFpQnNDLEdBQXpDO0FBQ0EsV0FBS2pELFFBQUwsQ0FBY3lELElBQWQsQ0FBbUI7QUFBRW5CLGNBQU0sRUFBTkEsTUFBRjtBQUFVQyxjQUFNLEVBQUU7QUFBRW5DLFdBQUMsRUFBREEsQ0FBRjtBQUFLQyxXQUFDLEVBQURBO0FBQUw7QUFBbEIsT0FBbkI7QUFDQSxXQUFLSixJQUFMLENBQVV3RCxJQUFWLENBQWUsS0FBS0MsTUFBTCxDQUFZdEQsQ0FBWixFQUFlQyxDQUFmLENBQWY7QUFDQSxXQUFLdUIsVUFBTDtBQUNEOzs7Ozs7QUFHSCxJQUFJbkIsUUFBUSxDQUFDa0QsVUFBVCxLQUF3QixTQUE1QixFQUF1QztBQUNyQ2xELFVBQVEsQ0FBQ2dCLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xELFFBQUk1QixVQUFKLENBQWUsS0FBZixFQUFzQixNQUF0QjtBQUNELEdBRkQ7QUFHRCxDQUpELE1BSU87QUFDTCxNQUFJQSxVQUFKLENBQWUsS0FBZixFQUFzQixNQUF0QjtBQUNELEMsQ0FFRDs7O0lBQ00yQixXOzs7OztBQUNKLHVCQUFZb0MsaUJBQVosRUFBK0JDLE9BQS9CLEVBQXdDO0FBQUE7O0FBQUE7O0FBQ3RDO0FBQ0EsUUFBTUMsUUFBUSxHQUFHO0FBQ2ZDLFVBQUksRUFBRSxHQURTO0FBRWZDLGVBQVMsRUFBRSxDQUZJO0FBR2ZDLGVBQVMsRUFBRSxFQUhJO0FBSWZDLGlCQUFXLEVBQUUsRUFKRTtBQUtmQyxrQkFBWSxFQUFFO0FBTEMsS0FBakI7QUFRQSxXQUFLTixPQUFMLHFCQUFvQkMsUUFBcEIsTUFBaUNELE9BQWpDO0FBQ0EsV0FBSzFELGVBQUwsR0FBdUI7QUFBRUMsT0FBQyxFQUFFLENBQUw7QUFBUUMsT0FBQyxFQUFFO0FBQVgsS0FBdkI7QUFFQSxRQUFNK0QsR0FBRyxpTEFLSSxPQUFLUCxPQUFMLENBQWFFLElBTGpCLGtDQU1LLE9BQUtGLE9BQUwsQ0FBYUUsSUFObEIsd0NBT1csT0FBS0YsT0FBTCxDQUFhRSxJQVB4QixjQU9nQyxPQUFLRixPQUFMLENBQWFFLElBUDdDLDBEQVVHLE9BQUtGLE9BQUwsQ0FBYUUsSUFBYixHQUFvQixDQVZ2QixnQ0FXRyxPQUFLRixPQUFMLENBQWFFLElBQWIsR0FBb0IsQ0FYdkIsK0JBWUUsT0FBS0YsT0FBTCxDQUFhSyxXQVpmLDhGQWVHLE9BQUtMLE9BQUwsQ0FBYUUsSUFBYixHQUFvQixDQWZ2QixnQ0FnQkcsT0FBS0YsT0FBTCxDQUFhRSxJQUFiLEdBQW9CLENBaEJ2QixnQ0FpQkcsT0FBS0YsT0FBTCxDQUFhRSxJQUFiLEdBQW9CLENBQXBCLEdBQXdCLE9BQUtGLE9BQUwsQ0FBYUssV0FqQnhDLGdDQWtCRyxPQUFLTCxPQUFMLENBQWFFLElBQWIsR0FBb0IsQ0FsQnZCLHVHQXNCRyxPQUFLRixPQUFMLENBQWFFLElBQWIsR0FBb0IsQ0FBcEIsR0FBd0IsT0FBS0YsT0FBTCxDQUFhSyxXQXRCeEMsZ0NBdUJHLE9BQUtMLE9BQUwsQ0FBYUUsSUFBYixHQUFvQixDQXZCdkIsK0JBd0JFLE9BQUtGLE9BQUwsQ0FBYU0sWUF4QmYsMEVBQVQ7QUE2QkEsUUFBTUUsU0FBUyxHQUFHNUQsUUFBUSxDQUFDQyxhQUFULENBQXVCa0QsaUJBQXZCLENBQWxCO0FBQ0EsUUFBTVUsS0FBSyxHQUFHN0QsUUFBUSxDQUFDOEQsV0FBVCxFQUFkLENBM0NzQyxDQTRDdEM7O0FBQ0FELFNBQUssQ0FBQ0UsVUFBTixDQUFpQkgsU0FBakI7QUFDQSxRQUFJSSxnQkFBZ0IsR0FBR0gsS0FBSyxDQUFDSSx3QkFBTixDQUErQk4sR0FBL0IsQ0FBdkI7QUFDQUMsYUFBUyxDQUFDZixXQUFWLENBQXNCbUIsZ0JBQXRCLEVBL0NzQyxDQWlEdEM7O0FBQ0EsV0FBS2pFLEtBQUwsR0FBYUMsUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUFiO0FBQ0EsV0FBS2lFLE1BQUwsR0FBY2xFLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1Qix5QkFBdkIsQ0FBZDtBQUNBLFdBQUtrRSxJQUFMLEdBQVluRSxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsdUJBQXZCLENBQVo7QUFDQSxXQUFLbUUsTUFBTCxHQUFjcEUsUUFBUSxDQUFDQyxhQUFULENBQXVCLHlCQUF2QixDQUFkO0FBRUEsV0FBS0MsV0FBTCxHQUFtQixPQUFLSCxLQUFMLENBQVdJLHFCQUFYLEVBQW5CLENBdkRzQyxDQXlEdEM7O0FBQ0EsV0FBS2tFLFlBQUwsR0FBb0IsT0FBS0EsWUFBTCxDQUFrQmhELElBQWxCLGdDQUFwQjtBQUNBLFdBQUtpRCxVQUFMLEdBQWtCLE9BQUtBLFVBQUwsQ0FBZ0JqRCxJQUFoQixnQ0FBbEI7QUFDQSxXQUFLa0QsZUFBTCxHQUF1QixPQUFLQSxlQUFMLENBQXFCbEQsSUFBckIsZ0NBQXZCOztBQUVBLFdBQUsrQyxNQUFMLENBQVlwRCxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxPQUFLdUQsZUFBL0M7O0FBOURzQztBQStEdkM7Ozs7b0NBRWV0RCxHLEVBQUs7QUFDbkI7QUFDQSxXQUFLdkIsZUFBTCxHQUF1QjtBQUNyQkMsU0FBQyxFQUNDc0IsR0FBRyxDQUFDbUIsT0FBSixHQUNBLEtBQUtsQyxXQUFMLENBQWlCUCxDQURqQixHQUVBLEtBQUt5RCxPQUFMLENBQWFNLFlBRmIsR0FHQSxLQUFLVSxNQUFMLENBQVk5QixjQUFaLENBQTJCLElBQTNCLEVBQWlDLElBQWpDLENBTG1CO0FBTXJCMUMsU0FBQyxFQUNDcUIsR0FBRyxDQUFDc0IsT0FBSixHQUNBLEtBQUtyQyxXQUFMLENBQWlCTixDQURqQixHQUVBLEtBQUt3RCxPQUFMLENBQWFNLFlBRmIsR0FHQSxLQUFLVSxNQUFMLENBQVk5QixjQUFaLENBQTJCLElBQTNCLEVBQWlDLElBQWpDO0FBVm1CLE9BQXZCO0FBYUF0QyxjQUFRLENBQUNnQixnQkFBVCxDQUEwQixXQUExQixFQUF1QyxLQUFLcUQsWUFBNUM7QUFDQXJFLGNBQVEsQ0FBQ2dCLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLEtBQUtzRCxVQUExQztBQUNEOzs7aUNBRVlyRCxHLEVBQUs7QUFDaEIsVUFBTXRCLENBQUMsR0FDTHNCLEdBQUcsQ0FBQ21CLE9BQUosR0FDQSxLQUFLbEMsV0FBTCxDQUFpQlAsQ0FEakIsR0FFQSxLQUFLeUQsT0FBTCxDQUFhTSxZQUZiLEdBR0EsS0FBS2hFLGVBQUwsQ0FBcUJDLENBSnZCO0FBS0EsVUFBTUMsQ0FBQyxHQUNMcUIsR0FBRyxDQUFDc0IsT0FBSixHQUNBLEtBQUtyQyxXQUFMLENBQWlCTixDQURqQixHQUVBLEtBQUt3RCxPQUFMLENBQWFNLFlBRmIsR0FHQSxLQUFLaEUsZUFBTCxDQUFxQkUsQ0FKdkI7QUFNQSxVQUFNNEUsRUFBRSxHQUFHO0FBQUU3RSxTQUFDLEVBQURBLENBQUY7QUFBS0MsU0FBQyxFQUFEQTtBQUFMLE9BQVg7QUFDQSxVQUFNNkUsRUFBRSxHQUFHO0FBQUU5RSxTQUFDLEVBQUUsS0FBS3lELE9BQUwsQ0FBYUUsSUFBYixHQUFvQixDQUF6QjtBQUE0QjFELFNBQUMsRUFBRSxLQUFLd0QsT0FBTCxDQUFhRSxJQUFiLEdBQW9CO0FBQW5ELE9BQVgsQ0FiZ0IsQ0FjaEI7O0FBQ0EsVUFBTW9CLFFBQVEsR0FBR0MsSUFBSSxDQUFDQyxHQUFMLENBQVNDLDhEQUFXLENBQUNMLEVBQUQsRUFBS0MsRUFBTCxDQUFwQixFQUE4QixLQUFLckIsT0FBTCxDQUFhSSxTQUEzQyxDQUFqQjtBQUVBLFVBQU1zQixLQUFLLEdBQUdDLDJEQUFRLENBQUNQLEVBQUQsRUFBS0MsRUFBTCxDQUF0QixDQWpCZ0IsQ0FrQmhCOztBQUNBLFVBQU1PLElBQUksR0FBRyxDQUFDTCxJQUFJLENBQUNNLEdBQUwsQ0FBU0gsS0FBVCxDQUFELEdBQW1CSixRQUFuQixHQUE4QixLQUFLdEIsT0FBTCxDQUFhRSxJQUFiLEdBQW9CLENBQS9EO0FBQ0EsVUFBTTRCLElBQUksR0FBRyxDQUFDUCxJQUFJLENBQUNRLEdBQUwsQ0FBU0wsS0FBVCxDQUFELEdBQW1CSixRQUFuQixHQUE4QixLQUFLdEIsT0FBTCxDQUFhRSxJQUFiLEdBQW9CLENBQS9EO0FBRUEsV0FBS2MsTUFBTCxDQUFZMUIsY0FBWixDQUEyQixJQUEzQixFQUFpQyxJQUFqQyxFQUF1Q3NDLElBQXZDO0FBQ0EsV0FBS1osTUFBTCxDQUFZMUIsY0FBWixDQUEyQixJQUEzQixFQUFpQyxJQUFqQyxFQUF1Q3dDLElBQXZDO0FBRUEsV0FBS2hCLE1BQUwsQ0FBWTVELFlBQVosQ0FBeUIsR0FBekIsRUFBOEJvRSxRQUE5QjtBQUNBLFdBQUtQLElBQUwsQ0FBVTdELFlBQVYsQ0FBdUIsSUFBdkIsRUFBNkIwRSxJQUE3QjtBQUNBLFdBQUtiLElBQUwsQ0FBVTdELFlBQVYsQ0FBdUIsSUFBdkIsRUFBNkI0RSxJQUE3QixFQTNCZ0IsQ0E2QmhCOztBQUNBLFVBQU1FLEtBQUssR0FBRyxJQUFJQyxXQUFKLENBQWdCLFFBQWhCLEVBQTBCO0FBQUVuRSxjQUFNLEVBQUV3RDtBQUFWLE9BQTFCLENBQWQ7QUFDQSxXQUFLWSxhQUFMLENBQW1CRixLQUFuQjtBQUNEOzs7aUNBRVk7QUFDWDtBQUNBcEYsY0FBUSxDQUFDMkMsbUJBQVQsQ0FBNkIsV0FBN0IsRUFBMEMsS0FBSzBCLFlBQS9DO0FBQ0FyRSxjQUFRLENBQUMyQyxtQkFBVCxDQUE2QixTQUE3QixFQUF3QyxLQUFLMkIsVUFBN0M7QUFDRDs7OzttQkEzSHVCaUIsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNJMUI7QUFFQTs7Ozs7Ozs7QUFPQSxTQUFTQyxTQUFULENBQW1CN0IsR0FBbkIsRUFBd0I7QUFDdEIsTUFBTThCLFdBQVcsR0FBRywrQkFBcEI7QUFDQSxNQUFNQyxVQUFVLEdBQUcsaUJBQW5CO0FBRUEsU0FBTyxtQkFBSS9CLEdBQUcsQ0FBQ2dDLFFBQUosQ0FBYUYsV0FBYixDQUFKLEVBQ0pHLEdBREksQ0FDQSxVQUFDQyxLQUFELEVBQVc7QUFDZCxXQUFPO0FBQUVoRSxZQUFNLEVBQUVnRSxLQUFLLENBQUMsQ0FBRCxDQUFmO0FBQW9CQyxXQUFLLEVBQUVELEtBQUssQ0FBQ0M7QUFBakMsS0FBUDtBQUNELEdBSEksRUFJSkMsV0FKSSxDQUlRLFVBQUNwRSxHQUFELEVBQU1xRSxHQUFOLEVBQWM7QUFDekIsUUFBTUMsS0FBSyxHQUFHdEMsR0FBRyxDQUFDdUMsU0FBSixDQUNaRixHQUFHLENBQUNGLEtBRFEsRUFFWm5FLEdBQUcsQ0FBQ29CLE1BQUosR0FBYXBCLEdBQUcsQ0FBQ0EsR0FBRyxDQUFDb0IsTUFBSixHQUFhLENBQWQsQ0FBSCxDQUFvQitDLEtBQWpDLEdBQXlDbkMsR0FBRyxDQUFDWixNQUZqQyxDQUFkO0FBSUEsV0FBT3BCLEdBQUcsQ0FBQ3dFLE1BQUosQ0FBVyxDQUNoQjtBQUNFdEUsWUFBTSxFQUFFbUUsR0FBRyxDQUFDbkUsTUFEZDtBQUVFaUUsV0FBSyxFQUFFRSxHQUFHLENBQUNGLEtBRmI7QUFHRUcsV0FBSyxFQUFFQSxLQUFLLENBQUNsRCxNQUFOLEdBQWUsQ0FBZixHQUFtQmtELEtBQUssQ0FBQ0csTUFBTixDQUFhLENBQWIsRUFBZ0JILEtBQUssQ0FBQ2xELE1BQU4sR0FBZSxDQUEvQixDQUFuQixHQUF1RGtEO0FBSGhFLEtBRGdCLENBQVgsQ0FBUDtBQU9ELEdBaEJJLEVBZ0JGLEVBaEJFLEVBaUJKSSxPQWpCSSxHQWtCSkMsT0FsQkksQ0FrQkksVUFBQ0MsR0FBRCxFQUFTO0FBQ2hCLFFBQU16RSxNQUFNLEdBQUd5RSxHQUFHLENBQUNOLEtBQUosQ0FBVUosS0FBVixDQUFnQkgsVUFBaEIsQ0FBZjtBQUNBLFFBQU1jLElBQUksR0FBRzFFLE1BQU0sR0FBR0EsTUFBTSxDQUFDOEQsR0FBUCxDQUFXYSxVQUFYLENBQUgsR0FBNEIsRUFBL0M7QUFDQSxXQUFPQyw2REFBVyxDQUFDSCxHQUFHLENBQUMxRSxNQUFMLEVBQWEyRSxJQUFiLENBQWxCO0FBQ0QsR0F0QkksRUF1QkpaLEdBdkJJLENBdUJBZSwyREF2QkEsQ0FBUDtBQXdCRDtBQUVEOzs7Ozs7Ozs7O0FBUUEsU0FBU0MsYUFBVCxDQUF1QkMsSUFBdkIsRUFBNkJDLENBQTdCLEVBQWdDQyxLQUFoQyxFQUF1QztBQUNyQyxNQUFJQyxRQUFRLEdBQUcsRUFBZjtBQUNBLE1BQUlDLE9BQU8sR0FBRyxFQUFkOztBQUVBLE1BQUlGLEtBQUosRUFBVztBQUNURixRQUFJLENBQUNLLE9BQUwsQ0FBYSxVQUFBQyxFQUFFO0FBQUEsYUFBSUMsNkRBQVcsQ0FBQ0QsRUFBRCxFQUFLSixLQUFMLENBQWY7QUFBQSxLQUFmLEVBRFMsQ0FFVDtBQUNEOztBQUVERixNQUFJLENBQ0Y7QUFERSxHQUVESyxPQUZILENBRVcsVUFBQ0csQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBYTtBQUNwQixRQUFJRixDQUFDLENBQUN4RixNQUFGLEtBQWEsR0FBakIsRUFBc0I7QUFDcEJtRixjQUFRLENBQUNoRSxJQUFULENBQWMsRUFBZDtBQUNEOztBQUNEZ0UsWUFBUSxDQUFDQSxRQUFRLENBQUNqRSxNQUFULEdBQWtCLENBQW5CLENBQVIsQ0FBOEJDLElBQTlCLENBQW1DcUUsQ0FBbkM7QUFDRCxHQVBIO0FBU0FMLFVBQVEsQ0FBQ0UsT0FBVCxDQUFpQixVQUFDTSxXQUFELEVBQWlCO0FBQ2hDQSxlQUFXLENBQ1Q7QUFEUyxLQUVSNUIsR0FGSCxDQUVPNkIsd0RBRlA7QUFJQUMsMkVBQXFCLENBQUNGLFdBQUQsRUFBY0EsV0FBVyxDQUFDekUsTUFBWixHQUFxQixDQUFuQyxDQUFyQjtBQUVBeUUsZUFBVyxDQUNSRyxNQURILENBQ1UsVUFBQ1IsRUFBRDtBQUFBLGFBQVEsQ0FBQ0EsRUFBRSxDQUFDUyxPQUFaO0FBQUEsS0FEVixFQUVHaEMsR0FGSCxDQUVPLFVBQUN1QixFQUFELEVBQUtHLENBQUwsRUFBUU8sR0FBUixFQUFnQjtBQUNuQixVQUFNQyxZQUFZLEdBQUcsQ0FBckI7QUFDQSxVQUFNQyxJQUFJLEdBQUdDLGdFQUFjLENBQUNiLEVBQUQsRUFBS0csQ0FBTCxFQUFRTyxHQUFSLENBQTNCO0FBQ0EsVUFBTUksSUFBSSxHQUFHQyw0REFBVSxDQUFDZixFQUFELEVBQUtHLENBQUwsRUFBUU8sR0FBUixDQUF2QjtBQUNBLFVBQU1NLFFBQVEsR0FBR3BELDBEQUFRLENBQUNvQyxFQUFFLENBQUNyRixNQUFKLEVBQVlpRyxJQUFJLENBQUNqRyxNQUFqQixDQUF6QjtBQUNBLFVBQU1zRyxRQUFRLEdBQUdyRCwwREFBUSxDQUFDb0MsRUFBRSxDQUFDckYsTUFBSixFQUFZbUcsSUFBSSxDQUFDbkcsTUFBakIsQ0FBekI7QUFDQSxVQUFNZ0QsS0FBSyxHQUFHc0QsUUFBUSxHQUFHRCxRQUF6QixDQU5tQixDQU1nQjs7QUFDbkMsVUFBTUUsT0FBTyxHQUFHdkQsS0FBSyxJQUFJLE1BQUlILElBQUksQ0FBQzJELEVBQWIsQ0FBckIsQ0FQbUIsQ0FRbkI7O0FBQ0EsVUFBTUMsUUFBUSxHQUFHQyw4REFBWSxDQUFDckIsRUFBRCxFQUFLWSxJQUFMLEVBQVdFLElBQVgsQ0FBN0I7QUFDQSxVQUFNekUsU0FBUyxHQUFHbUIsSUFBSSxDQUFDOEQsR0FBTCxDQUFTQyxpRUFBZSxDQUFDNUQsS0FBSyxHQUFHLENBQVQsRUFBWXlELFFBQVEsR0FBRyxDQUF2QixDQUF4QixDQUFsQjtBQUNBLFVBQU16SSxNQUFNLEdBQUc2RSxJQUFJLENBQUNDLEdBQUwsQ0FBU2tDLENBQVQsRUFBWXRELFNBQVosQ0FBZjtBQUVBLFVBQU1tRixDQUFDLEdBQUdDLDJEQUFTLENBQUM5RCxLQUFELEVBQVFoRixNQUFSLENBQW5CO0FBQ0EsVUFBTStJLE1BQU0sR0FBR0YsQ0FBQyxDQUFDRSxNQUFqQjtBQUNBLFVBQU1DLFNBQVMsR0FBR0gsQ0FBQyxDQUFDRyxTQUFwQjs7QUFFQSxjQUFRM0IsRUFBRSxDQUFDdEYsTUFBWDtBQUNFLGFBQUssR0FBTCxDQURGLENBQ1k7O0FBQ1YsYUFBSyxHQUFMO0FBQVU7QUFDUixjQUFNa0gsU0FBUyxHQUFHLENBQ2hCNUIsRUFBRSxDQUFDckYsTUFBSCxDQUFVbkMsQ0FBVixHQUFjcUosbUVBQWlCLENBQUNiLFFBQUQsRUFBV1UsTUFBWCxDQURmLEVBRWhCMUIsRUFBRSxDQUFDckYsTUFBSCxDQUFVbEMsQ0FBVixHQUFjcUosbUVBQWlCLENBQUNkLFFBQUQsRUFBV1UsTUFBWCxDQUZmLENBQWxCO0FBS0EsY0FBTUssU0FBUyxHQUFHLENBQ2hCL0IsRUFBRSxDQUFDckYsTUFBSCxDQUFVbkMsQ0FBVixHQUFjcUosbUVBQWlCLENBQUNaLFFBQUQsRUFBV1MsTUFBWCxDQURmLEVBRWhCMUIsRUFBRSxDQUFDckYsTUFBSCxDQUFVbEMsQ0FBVixHQUFjcUosbUVBQWlCLENBQUNiLFFBQUQsRUFBV1MsTUFBWCxDQUZmLENBQWxCLENBTkYsQ0FXRTs7QUFDQTVCLGlCQUFPLENBQUNqRSxJQUFSLENBQWE7QUFDWG5CLGtCQUFNLEVBQUVzRixFQUFFLENBQUN0RixNQURBO0FBRVhDLGtCQUFNLEVBQUU7QUFDTm5DLGVBQUMsRUFBRThHLFVBQVUsQ0FBQ3NDLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYUksT0FBYixDQUFxQixDQUFyQixDQUFELENBRFA7QUFFTnZKLGVBQUMsRUFBRTZHLFVBQVUsQ0FBQ3NDLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYUksT0FBYixDQUFxQixDQUFyQixDQUFEO0FBRlA7QUFGRyxXQUFiOztBQVFBLGNBQUlsQixJQUFJLENBQUNwRyxNQUFMLEtBQWdCLEdBQWhCLElBQXVCb0csSUFBSSxDQUFDcEcsTUFBTCxLQUFnQixHQUEzQyxFQUFnRDtBQUM5Q29GLG1CQUFPLENBQUNqRSxJQUFSLENBQWE7QUFDWG5CLG9CQUFNLEVBQUUsR0FERztBQUVYL0Isb0JBQU0sRUFBRUEsTUFGRztBQUdYZ0Msb0JBQU0sRUFBRTtBQUNOc0gsdUJBQU8sRUFBRXRKLE1BREg7QUFFTnVKLHVCQUFPLEVBQUV2SixNQUZIO0FBR053Six3QkFBUSxFQUFFakIsT0FISjtBQUlOa0Isd0JBQVEsRUFBRXpCLFlBSko7QUFLTjBCLHFCQUFLLEVBQUVWLFNBTEQ7QUFNTm5KLGlCQUFDLEVBQUU4RyxVQUFVLENBQUN5QyxTQUFTLENBQUMsQ0FBRCxDQUFULENBQWFDLE9BQWIsQ0FBcUIsQ0FBckIsQ0FBRCxDQU5QO0FBT052SixpQkFBQyxFQUFFNkcsVUFBVSxDQUFDeUMsU0FBUyxDQUFDLENBQUQsQ0FBVCxDQUFhQyxPQUFiLENBQXFCLENBQXJCLENBQUQ7QUFQUDtBQUhHLGFBQWI7QUFhRDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThDQTtBQUNGO0FBQ0E7O0FBQ0EsYUFBSyxHQUFMLENBdEZGLENBc0ZZOztBQUNWLGFBQUssR0FBTCxDQXZGRixDQXVGWTs7QUFDVixhQUFLLEdBQUwsQ0F4RkYsQ0F3Rlk7O0FBQ1YsYUFBSyxHQUFMLENBekZGLENBeUZZOztBQUNWLGFBQUssR0FBTCxDQTFGRixDQTBGWTs7QUFDVixhQUFLLEdBQUw7QUFBVTtBQUNSbEMsaUJBQU8sQ0FBQ2pFLElBQVIsQ0FBYTtBQUFFbkIsa0JBQU0sRUFBRXNGLEVBQUUsQ0FBQ3RGLE1BQWI7QUFBcUJDLGtCQUFNLEVBQUVxRixFQUFFLENBQUNyRjtBQUFoQyxXQUFiO0FBQ0E7QUE3Rko7QUErRkQsS0FsSEg7QUFtSEMsR0ExSEg7QUE0SEUsU0FBTztBQUNMMUIsUUFBSSxFQUFFcUosbUVBQWlCLENBQUN4QyxPQUFELENBRGxCO0FBRUwxSCxZQUFRLEVBQUUwSDtBQUZMLEdBQVA7QUFJSDtBQUVEOzs7Ozs7Ozs7O0FBUUEsU0FBU2pGLFlBQVQsQ0FBc0IyQixHQUF0QixFQUEyQm1ELENBQTNCLEVBQThCQyxLQUE5QixFQUFxQztBQUNuQyxTQUFPSCxhQUFhLG9CQUFLcEIsU0FBUyxDQUFDN0IsR0FBRCxDQUFkLEdBQXNCbUQsQ0FBdEIsRUFBeUJDLEtBQXpCLENBQXBCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN01EOzs7Ozs7O0FBT08sU0FBU0ssV0FBVCxDQUFxQkQsRUFBckIsRUFBeUJKLEtBQXpCLEVBQWdDO0FBQ3JDMkMsUUFBTSxDQUFDQyxJQUFQLENBQVl4QyxFQUFFLENBQUNyRixNQUFmLEVBQXVCb0YsT0FBdkIsQ0FBK0IsVUFBQTBDLEdBQUc7QUFBQSxXQUNoQ3pDLEVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVThILEdBQVYsSUFBaUJ6QyxFQUFFLENBQUNyRixNQUFILENBQVU4SCxHQUFWLEtBQWtCbkQsVUFBVSxDQUFDVSxFQUFFLENBQUNyRixNQUFILENBQVU4SCxHQUFWLEVBQWVULE9BQWYsQ0FBdUJwQyxLQUF2QixDQUFELENBRGI7QUFBQSxHQUFsQztBQUlBLFNBQU9JLEVBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU9PLFNBQVNhLGNBQVQsQ0FBd0JYLENBQXhCLEVBQTJCQyxDQUEzQixFQUE4QkMsQ0FBOUIsRUFBaUM7QUFDdEMsTUFBTXNDLE9BQU8sR0FBR3ZDLENBQUMsR0FBRyxDQUFwQjtBQUNBLE1BQU13QyxRQUFRLEdBQUd2QyxDQUFDLENBQUN3QyxHQUFHLENBQUNGLE9BQUQsRUFBVXRDLENBQUMsQ0FBQ3hFLE1BQVosQ0FBSixDQUFsQjs7QUFFQSxNQUFJK0csUUFBUSxDQUFDakksTUFBVCxLQUFvQixHQUF4QixFQUE2QjtBQUMzQixXQUFPaUksUUFBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU85QixjQUFjLENBQUNYLENBQUQsRUFBSXdDLE9BQUosRUFBYXRDLENBQWIsQ0FBckI7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7O0FBT08sU0FBU1csVUFBVCxDQUFvQmIsQ0FBcEIsRUFBdUJDLENBQXZCLEVBQTBCQyxDQUExQixFQUE2QjtBQUNsQyxNQUFNc0MsT0FBTyxHQUFHdkMsQ0FBQyxHQUFHLENBQXBCO0FBQ0EsTUFBTVcsSUFBSSxHQUFHVixDQUFDLENBQUN3QyxHQUFHLENBQUNGLE9BQUQsRUFBVXRDLENBQUMsQ0FBQ3hFLE1BQVosQ0FBSixDQUFkOztBQUVBLE1BQUlrRixJQUFJLENBQUNwRyxNQUFMLEtBQWdCLEdBQXBCLEVBQXlCO0FBQ3ZCLFdBQU9xRyxVQUFVLENBQUNiLENBQUQsRUFBSXdDLE9BQUosRUFBYXRDLENBQWIsQ0FBakI7QUFDRCxHQUZELE1BRU87QUFDTCxXQUFPVSxJQUFQO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7OztBQU9PLFNBQVN0QixpQkFBVCxDQUEyQlEsRUFBM0IsRUFBK0JyQixLQUEvQixFQUFzQytCLEdBQXRDLEVBQTJDO0FBQ2hEO0FBQ0EsTUFBSUUsSUFBSSxHQUFHRixHQUFHLENBQUMvQixLQUFLLEdBQUcsQ0FBVCxDQUFILElBQWtCO0FBQUVoRSxVQUFNLEVBQUU7QUFBRW5DLE9BQUMsRUFBRSxDQUFMO0FBQVFDLE9BQUMsRUFBRTtBQUFYO0FBQVYsR0FBN0IsQ0FGZ0QsQ0FJaEQ7O0FBQ0EsTUFBSXVILEVBQUUsQ0FBQ3RGLE1BQUgsS0FBY3NGLEVBQUUsQ0FBQ3RGLE1BQUgsQ0FBVW1JLFdBQVYsRUFBbEIsRUFBMkM7QUFDekM7QUFDQTdDLE1BQUUsQ0FBQ3RGLE1BQUgsR0FBWXNGLEVBQUUsQ0FBQ3RGLE1BQUgsQ0FBVW9JLFdBQVYsRUFBWjs7QUFDQSxZQUFROUMsRUFBRSxDQUFDdEYsTUFBWDtBQUNFLFdBQUssR0FBTDtBQUFVO0FBQ1JzRixVQUFFLENBQUNyRixNQUFILENBQVVuQyxDQUFWLElBQWVvSSxJQUFJLENBQUNqRyxNQUFMLENBQVluQyxDQUEzQjtBQUNBd0gsVUFBRSxDQUFDckYsTUFBSCxDQUFVbEMsQ0FBVixJQUFlbUksSUFBSSxDQUFDakcsTUFBTCxDQUFZbEMsQ0FBM0I7QUFDQTs7QUFDRixXQUFLLEdBQUwsQ0FMRixDQUtZOztBQUNWLFdBQUssR0FBTDtBQUNFdUgsVUFBRSxDQUFDckYsTUFBSCxDQUFVbkMsQ0FBVixJQUFlb0ksSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBM0I7QUFDQXdILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVWxDLENBQVYsSUFBZW1JLElBQUksQ0FBQ2pHLE1BQUwsQ0FBWWxDLENBQTNCO0FBQ0E7O0FBQ0YsV0FBSyxHQUFMO0FBQVU7QUFDUnVILFVBQUUsQ0FBQ3RGLE1BQUgsR0FBWSxHQUFaO0FBQ0FzRixVQUFFLENBQUNyRixNQUFILENBQVVuQyxDQUFWLElBQWVvSSxJQUFJLENBQUNqRyxNQUFMLENBQVluQyxDQUEzQjtBQUNBd0gsVUFBRSxDQUFDckYsTUFBSCxDQUFVbEMsQ0FBVixHQUFjbUksSUFBSSxDQUFDakcsTUFBTCxDQUFZbEMsQ0FBMUI7QUFDQTs7QUFDRixXQUFLLEdBQUw7QUFBVTtBQUNSdUgsVUFBRSxDQUFDdEYsTUFBSCxHQUFZLEdBQVo7QUFDQXNGLFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVW5DLENBQVYsR0FBY29JLElBQUksQ0FBQ2pHLE1BQUwsQ0FBWW5DLENBQTFCO0FBQ0F3SCxVQUFFLENBQUNyRixNQUFILENBQVVsQyxDQUFWLElBQWVtSSxJQUFJLENBQUNqRyxNQUFMLENBQVlsQyxDQUEzQjtBQUNBOztBQUNGLFdBQUssR0FBTDtBQUFVO0FBQ1J1SCxVQUFFLENBQUNyRixNQUFILENBQVVuQyxDQUFWLElBQWVvSSxJQUFJLENBQUNqRyxNQUFMLENBQVluQyxDQUEzQjtBQUNBd0gsVUFBRSxDQUFDckYsTUFBSCxDQUFVbEMsQ0FBVixJQUFlbUksSUFBSSxDQUFDakcsTUFBTCxDQUFZbEMsQ0FBM0I7QUFDQXVILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVW9JLEVBQVYsSUFBZ0JuQyxJQUFJLENBQUNqRyxNQUFMLENBQVluQyxDQUE1QjtBQUNBd0gsVUFBRSxDQUFDckYsTUFBSCxDQUFVcUksRUFBVixJQUFnQnBDLElBQUksQ0FBQ2pHLE1BQUwsQ0FBWWxDLENBQTVCO0FBQ0F1SCxVQUFFLENBQUNyRixNQUFILENBQVVzSSxFQUFWLElBQWdCckMsSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBNUI7QUFDQXdILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVXVJLEVBQVYsSUFBZ0J0QyxJQUFJLENBQUNqRyxNQUFMLENBQVlsQyxDQUE1QjtBQUNBOztBQUNGLFdBQUssR0FBTDtBQUNFdUgsVUFBRSxDQUFDckYsTUFBSCxDQUFVbkMsQ0FBVixJQUFlb0ksSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBM0I7QUFDQXdILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVWxDLENBQVYsSUFBZW1JLElBQUksQ0FBQ2pHLE1BQUwsQ0FBWWxDLENBQTNCO0FBQ0F1SCxVQUFFLENBQUNyRixNQUFILENBQVVzSSxFQUFWLElBQWdCckMsSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBNUI7QUFDQXdILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVXVJLEVBQVYsSUFBZ0J0QyxJQUFJLENBQUNqRyxNQUFMLENBQVlsQyxDQUE1QjtBQUNBOztBQUNGLFdBQUssR0FBTDtBQUNFdUgsVUFBRSxDQUFDckYsTUFBSCxDQUFVbkMsQ0FBVixJQUFlb0ksSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBM0I7QUFDQXdILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVWxDLENBQVYsSUFBZW1JLElBQUksQ0FBQ2pHLE1BQUwsQ0FBWWxDLENBQTNCO0FBQ0F1SCxVQUFFLENBQUNyRixNQUFILENBQVVvSSxFQUFWLElBQWdCbkMsSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBNUI7QUFDQXdILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVXFJLEVBQVYsSUFBZ0JwQyxJQUFJLENBQUNqRyxNQUFMLENBQVlsQyxDQUE1QjtBQUNBOztBQUNGLFdBQUssR0FBTDtBQUNFdUgsVUFBRSxDQUFDckYsTUFBSCxDQUFVbkMsQ0FBVixJQUFlb0ksSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBM0I7QUFDQXdILFVBQUUsQ0FBQ3JGLE1BQUgsQ0FBVWxDLENBQVYsSUFBZW1JLElBQUksQ0FBQ2pHLE1BQUwsQ0FBWWxDLENBQTNCO0FBQ0E7O0FBQ0YsV0FBSyxHQUFMO0FBQ0U7QUE3Q0osS0FIeUMsQ0FrRDNDOztBQUNDLEdBbkRELE1BbURPLElBQUl1SCxFQUFFLENBQUN0RixNQUFILEtBQWNzRixFQUFFLENBQUN0RixNQUFILENBQVVvSSxXQUFWLEVBQWxCLEVBQTJDO0FBQ2hELFlBQVE5QyxFQUFFLENBQUN0RixNQUFYO0FBQ0UsV0FBSyxHQUFMO0FBQVU7QUFDUnNGLFVBQUUsQ0FBQ3RGLE1BQUgsR0FBWSxHQUFaO0FBQ0FzRixVQUFFLENBQUNyRixNQUFILENBQVVsQyxDQUFWLEdBQWNtSSxJQUFJLENBQUNqRyxNQUFMLENBQVlsQyxDQUExQjtBQUNBOztBQUNGLFdBQUssR0FBTDtBQUFVO0FBQ1J1SCxVQUFFLENBQUN0RixNQUFILEdBQVksR0FBWjtBQUNBc0YsVUFBRSxDQUFDckYsTUFBSCxDQUFVbkMsQ0FBVixHQUFjb0ksSUFBSSxDQUFDakcsTUFBTCxDQUFZbkMsQ0FBMUI7QUFDQTtBQVJKO0FBVUQ7QUFFRDs7Ozs7OztBQUtBLE1BQUl3SCxFQUFFLENBQUN0RixNQUFILEtBQWMsR0FBbEIsRUFBdUI7QUFDckI7QUFEcUIsUUFFWnlJLEdBRlksR0FFckIsU0FBU0EsR0FBVCxDQUFhekMsR0FBYixFQUFrQlAsQ0FBbEIsRUFBcUI7QUFDbkIsVUFBSU8sR0FBRyxDQUFDUCxDQUFELENBQUgsQ0FBT3pGLE1BQVAsS0FBa0IsR0FBdEIsRUFBMkI7QUFDekIsZUFBT2dHLEdBQUcsQ0FBQ1AsQ0FBRCxDQUFWO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBT2dELEdBQUcsQ0FBQ3pDLEdBQUQsRUFBTVAsQ0FBQyxHQUFHLENBQVYsQ0FBVjtBQUNEO0FBQ0YsS0FSb0I7O0FBU3JCLFFBQUlpRCxPQUFPLEdBQUdELEdBQUcsQ0FBQ3pDLEdBQUQsRUFBTS9CLEtBQU4sQ0FBakI7QUFDQXFCLE1BQUUsQ0FBQ3JGLE1BQUgsQ0FBVW5DLENBQVYsR0FBYzRLLE9BQU8sQ0FBQ3pJLE1BQVIsQ0FBZW5DLENBQTdCO0FBQ0F3SCxNQUFFLENBQUNyRixNQUFILENBQVVsQyxDQUFWLEdBQWMySyxPQUFPLENBQUN6SSxNQUFSLENBQWVsQyxDQUE3QjtBQUNEOztBQUVELFNBQU91SCxFQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7O0FBUU8sU0FBU1QsV0FBVCxDQUFxQjdFLE1BQXJCLEVBQTZCQyxNQUE3QixFQUFxQztBQUMxQyxNQUFNK0UsSUFBSSxHQUFHLEVBQWI7O0FBRUEsVUFBUWhGLE1BQU0sQ0FBQ29JLFdBQVAsRUFBUjtBQUNFLFNBQUssR0FBTDtBQUFVO0FBQ1IsV0FBSyxJQUFJM0MsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3hGLE1BQU0sQ0FBQ2lCLE1BQTNCLEVBQW1DdUUsQ0FBQyxJQUFFLENBQXRDLEVBQXlDO0FBQ3ZDLFlBQUlrRCxDQUFDLFNBQUw7O0FBQ0EsWUFBSTNJLE1BQU0sS0FBS0EsTUFBTSxDQUFDb0ksV0FBUCxFQUFmLEVBQXFDO0FBQ25DTyxXQUFDLEdBQUdsRCxDQUFDLEtBQUssQ0FBTixHQUFVLEdBQVYsR0FBZ0IsR0FBcEI7QUFDRCxTQUZELE1BRU87QUFDTGtELFdBQUMsR0FBR2xELENBQUMsS0FBSyxDQUFOLEdBQVUsR0FBVixHQUFnQixHQUFwQjtBQUNEOztBQUNEVCxZQUFJLENBQUM3RCxJQUFMLENBQVU7QUFDUm5CLGdCQUFNLEVBQUUySSxDQURBO0FBRVIxSSxnQkFBTSxFQUFFO0FBQ05uQyxhQUFDLEVBQUVtQyxNQUFNLENBQUN3RixDQUFELENBREg7QUFFTjFILGFBQUMsRUFBRWtDLE1BQU0sQ0FBQ3dGLENBQUMsR0FBRyxDQUFMO0FBRkg7QUFGQSxTQUFWO0FBT0Q7O0FBQ0Q7O0FBQ0YsU0FBSyxHQUFMO0FBQVU7QUFDUixXQUFLLElBQUlBLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUd4RixNQUFNLENBQUNpQixNQUEzQixFQUFtQ3VFLEVBQUMsSUFBRSxDQUF0QyxFQUF5QztBQUN2Q1QsWUFBSSxDQUFDN0QsSUFBTCxDQUFVO0FBQ1JuQixnQkFBTSxFQUFOQSxNQURRO0FBRVJDLGdCQUFNLEVBQUU7QUFDTm5DLGFBQUMsRUFBRW1DLE1BQU0sQ0FBQ3dGLEVBQUQsQ0FESDtBQUVOMUgsYUFBQyxFQUFFa0MsTUFBTSxDQUFDd0YsRUFBQyxHQUFHLENBQUw7QUFGSDtBQUZBLFNBQVY7QUFPRDs7QUFDRDs7QUFDRixTQUFLLEdBQUw7QUFBVTtBQUNSLFdBQUssSUFBSUEsR0FBQyxHQUFHLENBQWIsRUFBZ0JBLEdBQUMsR0FBR3hGLE1BQU0sQ0FBQ2lCLE1BQTNCLEVBQW1DdUUsR0FBQyxFQUFwQyxFQUF3QztBQUN0Q1QsWUFBSSxDQUFDN0QsSUFBTCxDQUFVO0FBQ1JuQixnQkFBTSxFQUFOQSxNQURRO0FBRVJDLGdCQUFNLEVBQUU7QUFDTm5DLGFBQUMsRUFBRW1DLE1BQU0sQ0FBQ3dGLEdBQUQsQ0FESDtBQUVOMUgsYUFBQyxFQUFFO0FBRkc7QUFGQSxTQUFWO0FBT0Q7O0FBQ0Q7O0FBQ0YsU0FBSyxHQUFMO0FBQVU7QUFDUixXQUFLLElBQUkwSCxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHeEYsTUFBTSxDQUFDaUIsTUFBM0IsRUFBbUN1RSxHQUFDLEVBQXBDLEVBQXdDO0FBQ3RDVCxZQUFJLENBQUM3RCxJQUFMLENBQVU7QUFDUm5CLGdCQUFNLEVBQU5BLE1BRFE7QUFFUkMsZ0JBQU0sRUFBRTtBQUNObkMsYUFBQyxFQUFFLENBREc7QUFFTkMsYUFBQyxFQUFFa0MsTUFBTSxDQUFDd0YsR0FBRDtBQUZIO0FBRkEsU0FBVjtBQU9EOztBQUNEOztBQUNGLFNBQUssR0FBTDtBQUFVO0FBQ1IsV0FBSyxJQUFJQSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHeEYsTUFBTSxDQUFDaUIsTUFBM0IsRUFBbUN1RSxHQUFDLElBQUUsQ0FBdEMsRUFBeUM7QUFDdkNULFlBQUksQ0FBQzdELElBQUwsQ0FBVTtBQUNSbkIsZ0JBQU0sRUFBTkEsTUFEUTtBQUVSQyxnQkFBTSxFQUFFO0FBQ05vSSxjQUFFLEVBQUVwSSxNQUFNLENBQUN3RixHQUFELENBREo7QUFFTjZDLGNBQUUsRUFBRXJJLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBRko7QUFHTjhDLGNBQUUsRUFBRXRJLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBSEo7QUFJTitDLGNBQUUsRUFBRXZJLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBSko7QUFLTjNILGFBQUMsRUFBRW1DLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBTEg7QUFNTjFILGFBQUMsRUFBRWtDLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMO0FBTkg7QUFGQSxTQUFWO0FBV0Q7O0FBQ0Q7O0FBQ0YsU0FBSyxHQUFMO0FBQ0UsV0FBSyxJQUFJQSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHeEYsTUFBTSxDQUFDaUIsTUFBM0IsRUFBbUN1RSxHQUFDLElBQUUsQ0FBdEMsRUFBeUM7QUFDdkNULFlBQUksQ0FBQzdELElBQUwsQ0FBVTtBQUNSbkIsZ0JBQU0sRUFBTkEsTUFEUTtBQUVSQyxnQkFBTSxFQUFFO0FBQ05zSSxjQUFFLEVBQUV0SSxNQUFNLENBQUN3RixHQUFELENBREo7QUFFTitDLGNBQUUsRUFBRXZJLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBRko7QUFHTjNILGFBQUMsRUFBRW1DLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBSEg7QUFJTjFILGFBQUMsRUFBRWtDLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMO0FBSkg7QUFGQSxTQUFWO0FBU0Q7O0FBQ0Q7O0FBQ0YsU0FBSyxHQUFMO0FBQ0UsV0FBSyxJQUFJQSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHeEYsTUFBTSxDQUFDaUIsTUFBM0IsRUFBbUN1RSxHQUFDLElBQUUsQ0FBdEMsRUFBeUM7QUFDdkNULFlBQUksQ0FBQzdELElBQUwsQ0FBVTtBQUNSbkIsZ0JBQU0sRUFBTkEsTUFEUTtBQUVSQyxnQkFBTSxFQUFFO0FBQ05vSSxjQUFFLEVBQUVwSSxNQUFNLENBQUN3RixHQUFELENBREo7QUFFTjZDLGNBQUUsRUFBRXJJLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBRko7QUFHTjNILGFBQUMsRUFBRW1DLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBSEg7QUFJTjFILGFBQUMsRUFBRWtDLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMO0FBSkg7QUFGQSxTQUFWO0FBU0Q7O0FBQ0Q7O0FBQ0YsU0FBSyxHQUFMO0FBQ0UsV0FBSyxJQUFJQSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHeEYsTUFBTSxDQUFDaUIsTUFBM0IsRUFBbUN1RSxHQUFDLElBQUUsQ0FBdEMsRUFBeUM7QUFDdkNULFlBQUksQ0FBQzdELElBQUwsQ0FBVTtBQUNSbkIsZ0JBQU0sRUFBTkEsTUFEUTtBQUVSQyxnQkFBTSxFQUFFO0FBQ05uQyxhQUFDLEVBQUVtQyxNQUFNLENBQUN3RixHQUFELENBREg7QUFFTjFILGFBQUMsRUFBRWtDLE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMO0FBRkg7QUFGQSxTQUFWO0FBT0Q7O0FBQ0Q7O0FBQ0YsU0FBSyxHQUFMO0FBQ0UsV0FBSyxJQUFJQSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHeEYsTUFBTSxDQUFDaUIsTUFBM0IsRUFBbUN1RSxHQUFDLElBQUUsQ0FBdEMsRUFBeUM7QUFDdkNULFlBQUksQ0FBQzdELElBQUwsQ0FBVTtBQUNSbkIsZ0JBQU0sRUFBTkEsTUFEUTtBQUVSQyxnQkFBTSxFQUFFO0FBQ05zSCxtQkFBTyxFQUFFdEgsTUFBTSxDQUFDd0YsR0FBRCxDQURUO0FBRU4rQixtQkFBTyxFQUFFdkgsTUFBTSxDQUFDd0YsR0FBQyxHQUFHLENBQUwsQ0FGVDtBQUdOZ0Msb0JBQVEsRUFBRXhILE1BQU0sQ0FBQ3dGLEdBQUMsR0FBRyxDQUFMLENBSFY7QUFJTmlDLG9CQUFRLEVBQUV6SCxNQUFNLENBQUN3RixHQUFDLEdBQUcsQ0FBTCxDQUpWO0FBS05rQyxpQkFBSyxFQUFFMUgsTUFBTSxDQUFDd0YsR0FBQyxHQUFHLENBQUwsQ0FMUDtBQU1OM0gsYUFBQyxFQUFFbUMsTUFBTSxDQUFDd0YsR0FBQyxHQUFHLENBQUwsQ0FOSDtBQU9OMUgsYUFBQyxFQUFFa0MsTUFBTSxDQUFDd0YsR0FBQyxHQUFHLENBQUw7QUFQSDtBQUZBLFNBQVY7QUFZRDs7QUFDRDs7QUFDRixTQUFLLEdBQUw7QUFDRVQsVUFBSSxDQUFDN0QsSUFBTCxDQUFVO0FBQ1JuQixjQUFNLEVBQU5BLE1BRFE7QUFFUkMsY0FBTSxFQUFFO0FBQUU7QUFDUm5DLFdBQUMsRUFBRSxDQURHO0FBRU5DLFdBQUMsRUFBRTtBQUZHO0FBRkEsT0FBVjtBQU9BO0FBL0hKOztBQWlJQSxTQUFPaUgsSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7QUFNTyxTQUFTa0QsR0FBVCxDQUFhcEssQ0FBYixFQUFnQjZLLENBQWhCLEVBQW1CO0FBQ3hCLFNBQU8sQ0FBQzdLLENBQUMsR0FBRzZLLENBQUosR0FBUUEsQ0FBVCxJQUFjQSxDQUFyQjtBQUNEO0FBRUQ7Ozs7Ozs7OztBQVFPLFNBQVMvQyxjQUFULENBQXdCTixFQUF4QixFQUE0QnJCLEtBQTVCLEVBQW1DMkUsS0FBbkMsRUFBMEM7QUFDL0M7QUFDQSxNQUFJM0UsS0FBSyxLQUFLLENBQVYsSUFBZXFCLEVBQUUsQ0FBQ3RGLE1BQUgsS0FBYyxHQUFqQyxFQUFzQztBQUNwQztBQUNBLFFBQUlpSSxRQUFRLEdBQUdXLEtBQUssQ0FBQzNFLEtBQUssR0FBRyxDQUFULENBQXBCLENBRm9DLENBR3BDOztBQUNBLFFBQU04QixPQUFPLEdBQUcsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXOEMsS0FBWCxDQUFpQixVQUFDZCxHQUFELEVBQVM7QUFDeEM7QUFDQSxhQUFPakYsSUFBSSxDQUFDb0MsS0FBTCxDQUFXcEMsSUFBSSxDQUFDOEQsR0FBTCxDQUFTcUIsUUFBUSxDQUFDaEksTUFBVCxDQUFnQjhILEdBQWhCLElBQXVCekMsRUFBRSxDQUFDckYsTUFBSCxDQUFVOEgsR0FBVixDQUFoQyxDQUFYLE1BQWdFLENBQXZFO0FBQ0QsS0FIZSxDQUFoQjs7QUFLQSxRQUFJaEMsT0FBSixFQUFhO0FBQ1hULFFBQUUsQ0FBQ1MsT0FBSCxHQUFhLElBQWI7QUFDRDtBQUNGOztBQUVELFNBQU9ULEVBQVA7QUFDRDtBQUVEOzs7Ozs7O0FBTU8sU0FBU08scUJBQVQsQ0FBK0JiLElBQS9CLEVBQXFDZ0QsT0FBckMsRUFBOEM7QUFDbkQsTUFBTWpDLE9BQU8sR0FBRyxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVc4QyxLQUFYLENBQWlCLFVBQUNkLEdBQUQsRUFBUztBQUN4QztBQUNBLFdBQU9qRixJQUFJLENBQUNvQyxLQUFMLENBQVdwQyxJQUFJLENBQUM4RCxHQUFMLENBQVM1QixJQUFJLENBQUNnRCxPQUFELENBQUosQ0FBYy9ILE1BQWQsQ0FBcUI4SCxHQUFyQixJQUE0Qi9DLElBQUksQ0FBQyxDQUFELENBQUosQ0FBUS9FLE1BQVIsQ0FBZThILEdBQWYsQ0FBckMsQ0FBWCxNQUEwRSxDQUFqRjtBQUNELEdBSGUsQ0FBaEI7O0FBS0EsTUFBSS9DLElBQUksQ0FBQ2dELE9BQUQsQ0FBSixDQUFjaEksTUFBZCxLQUF5QixHQUF6QixJQUFnQytGLE9BQXBDLEVBQTZDO0FBQzNDZixRQUFJLENBQUNnRCxPQUFELENBQUosQ0FBY2pDLE9BQWQsR0FBd0IsSUFBeEI7QUFDQUYseUJBQXFCLENBQUNiLElBQUQsRUFBT2dELE9BQU8sR0FBRyxDQUFqQixDQUFyQjtBQUNEOztBQUVELE1BQUloRCxJQUFJLENBQUNnRCxPQUFELENBQUosQ0FBY2hJLE1BQWQsS0FBeUIsR0FBN0IsRUFBa0M7QUFDaEM2Rix5QkFBcUIsQ0FBQ2IsSUFBRCxFQUFPZ0QsT0FBTyxHQUFHLENBQWpCLENBQXJCO0FBQ0Q7QUFDRjtBQUVEOzs7Ozs7Ozs7QUFRTyxTQUFTckIsWUFBVCxDQUFzQnJCLEVBQXRCLEVBQTBCMkMsUUFBMUIsRUFBb0M3QixJQUFwQyxFQUEwQztBQUMvQyxNQUFNMEMsT0FBTyxHQUFHOUYsV0FBVyxDQUFDc0MsRUFBRSxDQUFDckYsTUFBSixFQUFZbUcsSUFBSSxDQUFDbkcsTUFBakIsQ0FBM0I7QUFDQSxNQUFNOEksT0FBTyxHQUFHL0YsV0FBVyxDQUFDaUYsUUFBUSxDQUFDaEksTUFBVixFQUFrQnFGLEVBQUUsQ0FBQ3JGLE1BQXJCLENBQTNCO0FBQ0EsU0FBTzZDLElBQUksQ0FBQ0MsR0FBTCxDQUFTZ0csT0FBVCxFQUFrQkQsT0FBbEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7QUFNTyxTQUFTNUYsUUFBVCxDQUFrQlAsRUFBbEIsRUFBc0JDLEVBQXRCLEVBQTBCO0FBQy9CLFNBQU9FLElBQUksQ0FBQ2tHLEtBQUwsQ0FBV3BHLEVBQUUsQ0FBQzlFLENBQUgsR0FBTzZFLEVBQUUsQ0FBQzdFLENBQXJCLEVBQXdCOEUsRUFBRSxDQUFDN0UsQ0FBSCxHQUFPNEUsRUFBRSxDQUFDNUUsQ0FBbEMsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7QUFNTyxTQUFTaUYsV0FBVCxDQUFxQkwsRUFBckIsRUFBeUJDLEVBQXpCLEVBQTZCO0FBQ2xDLE1BQU1xRyxLQUFLLEdBQUd0RyxFQUFFLENBQUM3RSxDQUFILEdBQU84RSxFQUFFLENBQUM5RSxDQUF4QjtBQUNBLE1BQU1vTCxLQUFLLEdBQUd2RyxFQUFFLENBQUM1RSxDQUFILEdBQU82RSxFQUFFLENBQUM3RSxDQUF4QjtBQUVBLFNBQU8rRSxJQUFJLENBQUNxRyxJQUFMLENBQVVyRyxJQUFJLENBQUNzRyxHQUFMLENBQVNILEtBQVQsRUFBZ0IsQ0FBaEIsSUFBcUJuRyxJQUFJLENBQUNzRyxHQUFMLENBQVNGLEtBQVQsRUFBZ0IsQ0FBaEIsQ0FBL0IsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBT08sU0FBUy9CLGlCQUFULENBQTJCbEUsS0FBM0IsRUFBa0NvRyxHQUFsQyxFQUF1QztBQUM1QyxTQUFPdkcsSUFBSSxDQUFDTSxHQUFMLENBQVNILEtBQVQsSUFBa0JvRyxHQUF6QjtBQUNEO0FBRUQ7Ozs7Ozs7O0FBT08sU0FBU2pDLGlCQUFULENBQTJCbkUsS0FBM0IsRUFBa0NvRyxHQUFsQyxFQUF1QztBQUM1QyxTQUFPdkcsSUFBSSxDQUFDUSxHQUFMLENBQVNMLEtBQVQsSUFBa0JvRyxHQUF6QjtBQUNEO0FBRUQ7Ozs7Ozs7O0FBT08sU0FBU0MsZ0JBQVQsQ0FBMEJyRyxLQUExQixFQUFpQ3NHLFFBQWpDLEVBQTJDO0FBQ2hELE1BQU03RCxDQUFDLEdBQUc2RCxRQUFRLEdBQUd6RyxJQUFJLENBQUMwRyxHQUFMLENBQVN2RyxLQUFULENBQXJCOztBQUNBLE1BQUl5QyxDQUFDLEtBQUsrRCxRQUFOLElBQWtCL0QsQ0FBQyxLQUFLLENBQUMrRCxRQUE3QixFQUF1QztBQUNyQyxXQUFPRixRQUFQO0FBQ0Q7O0FBRUQsU0FBTzdELENBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU9PLFNBQVNtQixlQUFULENBQXlCNUQsS0FBekIsRUFBZ0N5RyxRQUFoQyxFQUEwQztBQUMvQyxTQUFPQSxRQUFRLEdBQUc1RyxJQUFJLENBQUMwRyxHQUFMLENBQVN2RyxLQUFULENBQWxCO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFPTyxTQUFTOEQsU0FBVCxDQUFtQjlELEtBQW5CLEVBQTBCZ0MsQ0FBMUIsRUFBNkI7QUFDbEMsTUFBSStCLE1BQUo7QUFDQSxNQUFJQyxTQUFTLEdBQUcsQ0FBaEI7QUFDQSxNQUFJVCxPQUFPLEdBQUd2RCxLQUFLLElBQUksTUFBSUgsSUFBSSxDQUFDMkQsRUFBYixDQUFuQixDQUhrQyxDQUtsQzs7QUFDQSxNQUNHRCxPQUFPLEdBQUcsQ0FBVixJQUFlQSxPQUFPLEdBQUcsQ0FBQyxFQUEzQixJQUNDQSxPQUFPLEdBQUcsR0FBVixJQUFpQkEsT0FBTyxJQUFJLEdBRDdCLElBRUNBLE9BQU8sSUFBSSxDQUFDLEVBQVosSUFBa0JBLE9BQU8sR0FBRyxDQUFDLEdBSGhDLEVBSUU7QUFDQVEsVUFBTSxHQUFHc0MsZ0JBQWdCLENBQUNyRyxLQUFLLEdBQUMsQ0FBUCxFQUFVLENBQUNnQyxDQUFYLENBQXpCLENBREEsQ0FFRjtBQUNDLEdBUEQsTUFPTztBQUNMK0IsVUFBTSxHQUFHc0MsZ0JBQWdCLENBQUNyRyxLQUFLLEdBQUMsQ0FBUCxFQUFVZ0MsQ0FBVixDQUF6QjtBQUNBZ0MsYUFBUyxHQUFHLENBQVo7O0FBQ0EsUUFBSUQsTUFBTSxLQUFLeUMsUUFBZixFQUF5QjtBQUN2QnpDLFlBQU0sR0FBRy9CLENBQVQ7QUFDRDtBQUNGOztBQUVELFNBQU87QUFDTCtCLFVBQU0sRUFBTkEsTUFESztBQUVMQyxhQUFTLEVBQVRBO0FBRkssR0FBUDtBQUlEO0FBRUQ7Ozs7OztBQUtPLFNBQVMwQyxNQUFULENBQWdCQyxNQUFoQixFQUF3QkMsRUFBeEIsRUFBNEI7QUFDakMsTUFBTUMsQ0FBQyxHQUFHRixNQUFNLENBQUMxSSxNQUFQLEdBQWdCLENBQTFCLENBRGlDLENBQ0o7O0FBQzdCLE1BQU02SSxDQUFDLEdBQUcsRUFBVixDQUZpQyxDQUVYOztBQUN0QixNQUFNQyxJQUFJLEdBQUcsRUFBYixDQUhpQyxDQUdaOztBQUNyQixNQUFNQyxJQUFJLEdBQUcsRUFBYixDQUppQyxDQUlaOztBQUNyQixNQUFNQyxFQUFFLEdBQUcsSUFBSUwsRUFBZixDQUxpQyxDQU9qQzs7QUFDQSxNQUFNTSxFQUFFLEdBQUcsU0FBTEEsRUFBSyxDQUFTQyxDQUFULEVBQVlDLENBQVosRUFBZTtBQUN4QixRQUFNQyxHQUFHLEdBQUcsRUFBWjs7QUFDQSxTQUFJLElBQUk3RSxDQUFDLEdBQUcsQ0FBWixFQUFlQSxDQUFDLEdBQUcyRSxDQUFDLENBQUNsSixNQUFyQixFQUE2QnVFLENBQUMsRUFBOUIsRUFBa0M7QUFDaEM2RSxTQUFHLENBQUNuSixJQUFKLENBQVNrSixDQUFDLEdBQUdELENBQUMsQ0FBQzNFLENBQUQsQ0FBZDtBQUNEOztBQUNELFdBQU82RSxHQUFQO0FBQ0QsR0FORCxDQVJpQyxDQWVqQzs7O0FBQ0EsTUFBTUMsRUFBRSxHQUFHLFNBQUxBLEVBQUssQ0FBUzVILEVBQVQsRUFBYUMsRUFBYixFQUFpQjtBQUMxQixRQUFNMEgsR0FBRyxHQUFHLEVBQVo7O0FBQ0EsU0FBSSxJQUFJN0UsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHM0MsSUFBSSxDQUFDQyxHQUFMLENBQVNKLEVBQUUsQ0FBQ3pCLE1BQVosRUFBb0IwQixFQUFFLENBQUMxQixNQUF2QixDQUFuQixFQUFtRHVFLENBQUMsRUFBcEQsRUFBd0Q7QUFDdEQ2RSxTQUFHLENBQUNuSixJQUFKLENBQVN3QixFQUFFLENBQUM4QyxDQUFELENBQUYsR0FBUTdDLEVBQUUsQ0FBQzZDLENBQUQsQ0FBbkI7QUFDRDs7QUFDRCxXQUFPNkUsR0FBUDtBQUNELEdBTkQsQ0FoQmlDLENBd0JqQzs7O0FBQ0EsT0FBSSxJQUFJN0UsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxJQUFJcUUsQ0FBcEIsRUFBdUJyRSxDQUFDLEVBQXhCLEVBQTRCO0FBQzFCbUUsVUFBTSxDQUFDbkUsQ0FBRCxDQUFOLEdBQWEsUUFBT21FLE1BQU0sQ0FBQ25FLENBQUQsQ0FBYixLQUFvQixRQUFyQixHQUFpQ21FLE1BQU0sQ0FBQ25FLENBQUQsQ0FBdkMsR0FBNkMsQ0FBQ21FLE1BQU0sQ0FBQ25FLENBQUQsQ0FBUCxDQUF6RDtBQUNBc0UsS0FBQyxDQUFDNUksSUFBRixDQUFPLENBQUV5SSxNQUFNLENBQUNuRSxDQUFELENBQVIsQ0FBUDtBQUNELEdBNUJnQyxDQThCakM7OztBQUNBLE9BQUksSUFBSStFLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsSUFBSVYsQ0FBcEIsRUFBdUJVLENBQUMsRUFBeEIsRUFBNEI7QUFDMUIsU0FBSSxJQUFJL0UsR0FBQyxHQUFHLENBQVosRUFBZUEsR0FBQyxJQUFLcUUsQ0FBQyxHQUFDVSxDQUF2QixFQUEyQi9FLEdBQUMsRUFBNUIsRUFBZ0M7QUFDOUJzRSxPQUFDLENBQUN0RSxHQUFELENBQUQsQ0FBS3RFLElBQUwsQ0FDRW9KLEVBQUUsQ0FDQUosRUFBRSxDQUFDSixDQUFDLENBQUN0RSxHQUFELENBQUQsQ0FBSytFLENBQUMsR0FBQyxDQUFQLENBQUQsRUFBWU4sRUFBWixDQURGLEVBRUFDLEVBQUUsQ0FBQ0osQ0FBQyxDQUFDdEUsR0FBQyxHQUFDLENBQUgsQ0FBRCxDQUFPK0UsQ0FBQyxHQUFDLENBQVQsQ0FBRCxFQUFjWCxFQUFkLENBRkYsQ0FESjtBQU1EO0FBQ0YsR0F4Q2dDLENBeUNqQzs7O0FBQ0EsT0FBSSxJQUFJVyxFQUFDLEdBQUcsQ0FBWixFQUFlQSxFQUFDLElBQUlWLENBQXBCLEVBQXVCVSxFQUFDLEVBQXhCLEVBQTRCO0FBQzFCUixRQUFJLENBQUM3SSxJQUFMLENBQVU0SSxDQUFDLENBQUMsQ0FBRCxDQUFELENBQUtTLEVBQUwsQ0FBVjtBQUNBUCxRQUFJLENBQUM5SSxJQUFMLENBQVU0SSxDQUFDLENBQUNTLEVBQUQsQ0FBRCxDQUFLVixDQUFDLEdBQUNVLEVBQVAsQ0FBVjtBQUNEOztBQUVELFNBQU8sQ0FBQ1IsSUFBRCxFQUFPQyxJQUFQLENBQVA7QUFDRDtBQUFBO0FBRUQ7Ozs7Ozs7QUFNTyxTQUFTckMsaUJBQVQsQ0FBMkI1QyxJQUEzQixFQUFpQztBQUN0QztBQUNBLE1BQU15RixXQUFXLEdBQUcsQ0FDbEIsU0FEa0IsRUFFbEIsU0FGa0IsRUFHbEIsVUFIa0IsRUFJbEIsVUFKa0IsRUFLbEIsT0FMa0IsRUFNbEIsSUFOa0IsRUFPbEIsSUFQa0IsRUFRbEIsSUFSa0IsRUFTbEIsSUFUa0IsRUFVbEIsR0FWa0IsRUFXbEIsR0FYa0IsQ0FBcEI7QUFjQSxTQUFPekYsSUFBSSxDQUNSakIsR0FESSxDQUNBLFVBQUNXLEdBQUQsRUFBUztBQUNaO0FBQ0EsUUFBSTlFLENBQUMsR0FBRyxFQUFSLENBRlksQ0FHWjs7QUFDQSxRQUFJOEUsR0FBRyxDQUFDMUUsTUFBSixLQUFlLEdBQW5CLEVBQXdCO0FBQ3RCO0FBQ0EsVUFBTTBLLE9BQU8sR0FBRzdDLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZcEQsR0FBRyxDQUFDekUsTUFBaEIsQ0FBaEIsQ0FGc0IsQ0FHdEI7QUFDQTs7QUFDQUwsT0FBQyxHQUFHNkssV0FBVyxDQUFDM0UsTUFBWixDQUFtQixVQUFBNkUsQ0FBQztBQUFBLGVBQUlELE9BQU8sQ0FBQ3BLLE9BQVIsQ0FBZ0JxSyxDQUFoQixNQUF1QixDQUFDLENBQTVCO0FBQUEsT0FBcEIsRUFDRjtBQURFLE9BRUQ1RyxHQUZDLENBRUcsVUFBQWdFLEdBQUc7QUFBQSxlQUFJckQsR0FBRyxDQUFDekUsTUFBSixDQUFXOEgsR0FBWCxDQUFKO0FBQUEsT0FGTixFQUdGO0FBSEUsT0FJRDZDLElBSkMsRUFBSjtBQUtEOztBQUNELHFCQUFVbEcsR0FBRyxDQUFDMUUsTUFBZCxTQUF1QkosQ0FBdkI7QUFDRCxHQWpCSSxFQWtCSmdMLElBbEJJLENBa0JDLEVBbEJELEVBbUJKQyxJQW5CSSxFQUFQO0FBb0JELEMiLCJmaWxlIjoic3ZnLXJvdW5kLWNvcm5lcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2RlbW8vbWFpbi5qc1wiKTtcbiIsImltcG9ydCB7IHJvdW5kQ29ybmVycywgcGFyc2VQYXRoIH0gZnJvbSBcIi4uL2xpYlwiO1xuaW1wb3J0IHtcbiAgZ2V0RGlzdGFuY2UsXG4gIGdldEFuZ2xlLFxuICBnZXRBZGphY2VudExlbmd0aCxcbiAgZ2V0T3Bwb3NpdGVMZW5ndGhcbn0gZnJvbSBcIi4uL2xpYi91dGlsc1wiO1xuXG5jb25zdCBzdmducyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcblxuY2xhc3MgU1ZHUHJldmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlU2VsZWN0b3IsIHBhdGhTZWxlY3Rvcikge1xuICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLmRvdFJhZGl1cyA9IDU7XG4gICAgdGhpcy5tb3VzZURvd25PZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLmFjdGl2ZURvdEluZGV4O1xuICAgIHRoaXMucmFkaXVzID0gMjA7XG5cbiAgICB0aGlzLnN0YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGFnZVNlbGVjdG9yKTtcbiAgICB0aGlzLnN0YWdlT2Zmc2V0ID0gdGhpcy5zdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhdGhTZWxlY3Rvcik7XG4gICAgdGhpcy5yYW5nZVNsaWRlciA9IHRoaXMucmFuZ2VTbGlkZXI7XG5cbiAgICAvLyBTZXQgdGhlIHN2ZyBzdGFnZSB0byBiZSB0aGUgc2FtZSBzaXplIG9mIHRoZSB3aW5kb3dcbiAgICB0aGlzLnN0YWdlLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgICB0aGlzLnN0YWdlLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgLy8gY3JlYXRlIGNsb25lIHBhdGggdG8gc2hvdyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9yaWdpbmFsXG4gICAgLy8gYW5kIHBhdGggd2l0aCByb3VuZGVkIGNvcm5lcnMuXG4gICAgdGhpcy5jbG9uZSA9IHRoaXMucGF0aC5jbG9uZU5vZGUoKTtcbiAgICB0aGlzLmNsb25lLmNsYXNzTGlzdC5hZGQoXCJvcmlnaW5hbFwiKTtcbiAgICB0aGlzLnBhdGguaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgdGhpcy5jbG9uZSk7XG5cbiAgICB0aGlzLnJhbmdlU2xpZGVyID0gbmV3IFJhbmdlU2xpZGVyKFwiLmNvbnRyb2xsZXJcIiwge30pO1xuICAgIHRoaXMucmFuZ2VTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcInVwZGF0ZVwiLCBldnQgPT4ge1xuICAgICAgdGhpcy5yYWRpdXMgPSBldnQuZGV0YWlsO1xuICAgICAgdGhpcy51cGRhdGVQYXRoKCk7XG4gICAgfSk7XG5cbiAgICAvLyBiaW5kIGV2ZW50IGxpc3RlbmVycyB0byB0aGlzIGNsYXNzIGNvbnRleHRcbiAgICB0aGlzLmRvdE1vdXNlRG93biA9IHRoaXMuZG90TW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFnZU1vdXNlTW92ZSA9IHRoaXMuc3RhZ2VNb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YWdlTW91c2VVcCA9IHRoaXMuc3RhZ2VNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFnZUNsaWNrID0gdGhpcy5zdGFnZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0YWdlQ2xpY2spO1xuICB9XG5cbiAgdXBkYXRlUGF0aCgpIHtcbiAgICAvLyBidWlsZCB0aGUgc3RyaW5nXG4gICAgY29uc3QgZCA9XG4gICAgICB0aGlzLmNvbW1hbmRzLnJlZHVjZShcbiAgICAgICAgKGFjYywgY3VycikgPT5cbiAgICAgICAgICAoYWNjICs9IGAke2N1cnIubWFya2VyfSR7Y3Vyci52YWx1ZXMueH0sJHtjdXJyLnZhbHVlcy55fWApLFxuICAgICAgICBcIlwiXG4gICAgICApICsgXCJaXCI7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHBhdGgnc1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW9yaWdpbmFsLWRcIiwgZCk7XG4gICAgdGhpcy5jbG9uZS5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuXG4gICAgLy8gcm91bmQgdGhlIGNvcm5lcnNcbiAgICBjb25zdCByQ29ybmVycyA9IHJvdW5kQ29ybmVycyhkLCB0aGlzLnJhZGl1cyk7XG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgckNvcm5lcnMucGF0aCk7XG4gIH1cblxuICBkb3RNb3VzZURvd24oZXZ0KSB7XG4gICAgY29uc3QgZG90ID0gZXZ0LnRhcmdldDtcbiAgICB0aGlzLmFjdGl2ZURvdEluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoZG90KTtcbiAgICB0aGlzLm1vdXNlRG93bk9mZnNldCA9IHtcbiAgICAgIHg6XG4gICAgICAgIGV2dC5jbGllbnRYIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC5sZWZ0ICtcbiAgICAgICAgdGhpcy5kb3RSYWRpdXMgLVxuICAgICAgICBkb3QuZ2V0QXR0cmlidXRlTlMobnVsbCwgXCJjeFwiKSxcbiAgICAgIHk6XG4gICAgICAgIGV2dC5jbGllbnRZIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC50b3AgK1xuICAgICAgICB0aGlzLmRvdFJhZGl1cyAtXG4gICAgICAgIGRvdC5nZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN5XCIpXG4gICAgfTtcblxuICAgIHRoaXMuc3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLnN0YWdlTW91c2VNb3ZlKTtcbiAgICB0aGlzLnN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuc3RhZ2VNb3VzZVVwKTtcbiAgfVxuXG4gIHN0YWdlTW91c2VNb3ZlKGV2dCkge1xuICAgIGNvbnN0IGRvdCA9IHRoaXMuZG90c1t0aGlzLmFjdGl2ZURvdEluZGV4XTtcbiAgICBjb25zdCBwYXRoQ21kID0gdGhpcy5jb21tYW5kc1t0aGlzLmFjdGl2ZURvdEluZGV4XS52YWx1ZXM7XG4gICAgcGF0aENtZC54ID0gZXZ0LmNsaWVudFggLSB0aGlzLm1vdXNlRG93bk9mZnNldC54O1xuICAgIHBhdGhDbWQueSA9IGV2dC5jbGllbnRZIC0gdGhpcy5tb3VzZURvd25PZmZzZXQueTtcbiAgICB0aGlzLnVwZGF0ZVBhdGgoKTtcblxuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN4XCIsIHBhdGhDbWQueCk7XG4gICAgZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiY3lcIiwgcGF0aENtZC55KTtcbiAgfVxuXG4gIHN0YWdlTW91c2VVcChldnQpIHtcbiAgICAvLyBDbGVhbnVwXG4gICAgdGhpcy5zdGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuc3RhZ2VNb3VzZU1vdmUpO1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5zdGFnZU1vdXNlVXApO1xuICB9XG5cbiAgbmV3RG90KHgsIHkpIHtcbiAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnbnMsIFwiY2lyY2xlXCIpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN4XCIsIHgpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN5XCIsIHkpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInJcIiwgdGhpcy5kb3RSYWRpdXMpO1xuICAgIHRoaXMuc3RhZ2UuYXBwZW5kQ2hpbGQoZG90KTtcblxuICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuZG90TW91c2VEb3duLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIGRvdDtcbiAgfVxuXG4gIHN0YWdlQ2xpY2soZXZ0KSB7XG4gICAgLy8gaWYgZHJhZ2dpbmdcbiAgICBpZiAoZXZ0LnNoaWZ0S2V5KSByZXR1cm47XG5cbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLmNvbW1hbmRzLmxlbmd0aCA/IFwiTFwiIDogXCJNXCI7XG4gICAgY29uc3QgeCA9IGV2dC5jbGllbnRYIC0gdGhpcy5zdGFnZU9mZnNldC5sZWZ0O1xuICAgIGNvbnN0IHkgPSBldnQuY2xpZW50WSAtIHRoaXMuc3RhZ2VPZmZzZXQudG9wO1xuICAgIHRoaXMuY29tbWFuZHMucHVzaCh7IG1hcmtlciwgdmFsdWVzOiB7IHgsIHkgfSB9KTtcbiAgICB0aGlzLmRvdHMucHVzaCh0aGlzLm5ld0RvdCh4LCB5KSk7XG4gICAgdGhpcy51cGRhdGVQYXRoKCk7XG4gIH1cbn1cblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwibG9hZGluZ1wiKSB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgICBuZXcgU1ZHUHJldmlldyhcInN2Z1wiLCBcInBhdGhcIik7XG4gIH0pO1xufSBlbHNlIHtcbiAgbmV3IFNWR1ByZXZpZXcoXCJzdmdcIiwgXCJwYXRoXCIpO1xufVxuXG4vLyBDb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNvbnRyb2xsaW5nIHRoZSByYWRpdXNcbmNsYXNzIFJhbmdlU2xpZGVyIGV4dGVuZHMgRXZlbnRUYXJnZXQge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXJTZWxlY3Rvciwgb3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICBzaXplOiAyNTAsXG4gICAgICBtaW5SYWRpdXM6IDAsXG4gICAgICBtYXhSYWRpdXM6IDcwLFxuICAgICAgc3RhcnRSYWRpdXM6IDIwLFxuICAgICAgaGFuZGxlUmFkaXVzOiA1XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9ucyA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcbiAgICB0aGlzLm1vdXNlRG93bk9mZnNldCA9IHsgeDogMCwgeTogMCB9O1xuXG4gICAgY29uc3Qgc3RyID0gYFxuICAgICAgPHN2Z1xuICAgICAgICBjbGFzcz1cInJhZGl1cy1jb250cm9sXCJcbiAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiXG4gICAgICAgIHdpZHRoPVwiJHt0aGlzLm9wdGlvbnMuc2l6ZX1cIlxuICAgICAgICBoZWlnaHQ9XCIke3RoaXMub3B0aW9ucy5zaXplfVwiXG4gICAgICAgIHZpZXdQb3J0PVwiMCAwICR7dGhpcy5vcHRpb25zLnNpemV9ICR7dGhpcy5vcHRpb25zLnNpemV9XCJcbiAgICAgID5cbiAgICAgICAgPGNpcmNsZVxuICAgICAgICAgIGN4PVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICBjeT1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyfVwiXG4gICAgICAgICAgcj1cIiR7dGhpcy5vcHRpb25zLnN0YXJ0UmFkaXVzfVwiXG4gICAgICAgICAgY2xhc3M9XCJyYWRpdXMtY29udHJvbF9fY2lyY2xlXCIgLz5cbiAgICAgICAgPGxpbmVcbiAgICAgICAgICB4MT1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyfVwiXG4gICAgICAgICAgeTE9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIHgyPVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDIgKyB0aGlzLm9wdGlvbnMuc3RhcnRSYWRpdXN9XCJcbiAgICAgICAgICB5Mj1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyfVwiXG4gICAgICAgICAgY2xhc3M9XCJyYWRpdXMtY29udHJvbF9fbGluZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjeD1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyICsgdGhpcy5vcHRpb25zLnN0YXJ0UmFkaXVzfVwiXG4gICAgICAgICAgY3k9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIHI9XCIke3RoaXMub3B0aW9ucy5oYW5kbGVSYWRpdXN9XCJcbiAgICAgICAgICBjbGFzcz1cInJhZGl1cy1jb250cm9sX19oYW5kbGVcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgYDtcblxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyU2VsZWN0b3IpO1xuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAvLyBNYWtlIHRoZSBwYXJlbnQgb2YgdGhlIGZpcnN0IGRpdiBpbiB0aGUgZG9jdW1lbnQgYmVjb21lcyB0aGUgY29udGV4dCBub2RlXG4gICAgcmFuZ2Uuc2VsZWN0Tm9kZShjb250YWluZXIpO1xuICAgIHZhciBkb2N1bWVudEZyYWdtZW50ID0gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHN0cik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50RnJhZ21lbnQpO1xuXG4gICAgLy8gR2V0IHJlZmVyZW5jZXMgdG8gdGhlIHBhcnRzIHdlIG5lZWRcbiAgICB0aGlzLnN0YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYWRpdXMtY29udHJvbFwiKTtcbiAgICB0aGlzLmNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFkaXVzLWNvbnRyb2xfX2NpcmNsZVwiKTtcbiAgICB0aGlzLmxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhZGl1cy1jb250cm9sX19saW5lXCIpO1xuICAgIHRoaXMuaGFuZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYWRpdXMtY29udHJvbF9faGFuZGxlXCIpO1xuXG4gICAgdGhpcy5zdGFnZU9mZnNldCA9IHRoaXMuc3RhZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIGFuZCBiaW5kIHRoZSBjYWxsYmFja3MgdG8gdGhlIGNsYXNzIGNvbnRleHRcbiAgICB0aGlzLmRvY01vdXNlTW92ZSA9IHRoaXMuZG9jTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5kb2NNb3VzZVVwID0gdGhpcy5kb2NNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5oYW5kbGVNb3VzZURvd24gPSB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5oYW5kbGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLmhhbmRsZU1vdXNlRG93bik7XG4gIH1cblxuICBoYW5kbGVNb3VzZURvd24oZXZ0KSB7XG4gICAgLy8gdGhlIHgveSBkaXN0YW5jZSBmcm9tIHRoZSBwb2ludGVyIHRvIHRoZSBjZW50ZXIgb2YgdGhlIGhhbmRsZVxuICAgIHRoaXMubW91c2VEb3duT2Zmc2V0ID0ge1xuICAgICAgeDpcbiAgICAgICAgZXZ0LmNsaWVudFggLVxuICAgICAgICB0aGlzLnN0YWdlT2Zmc2V0LnggK1xuICAgICAgICB0aGlzLm9wdGlvbnMuaGFuZGxlUmFkaXVzIC1cbiAgICAgICAgdGhpcy5oYW5kbGUuZ2V0QXR0cmlidXRlTlMobnVsbCwgXCJjeFwiKSxcbiAgICAgIHk6XG4gICAgICAgIGV2dC5jbGllbnRZIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC55ICtcbiAgICAgICAgdGhpcy5vcHRpb25zLmhhbmRsZVJhZGl1cyAtXG4gICAgICAgIHRoaXMuaGFuZGxlLmdldEF0dHJpYnV0ZU5TKG51bGwsIFwiY3lcIilcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLmRvY01vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5kb2NNb3VzZVVwKTtcbiAgfVxuXG4gIGRvY01vdXNlTW92ZShldnQpIHtcbiAgICBjb25zdCB4ID1cbiAgICAgIGV2dC5jbGllbnRYIC1cbiAgICAgIHRoaXMuc3RhZ2VPZmZzZXQueCArXG4gICAgICB0aGlzLm9wdGlvbnMuaGFuZGxlUmFkaXVzIC1cbiAgICAgIHRoaXMubW91c2VEb3duT2Zmc2V0Lng7XG4gICAgY29uc3QgeSA9XG4gICAgICBldnQuY2xpZW50WSAtXG4gICAgICB0aGlzLnN0YWdlT2Zmc2V0LnkgK1xuICAgICAgdGhpcy5vcHRpb25zLmhhbmRsZVJhZGl1cyAtXG4gICAgICB0aGlzLm1vdXNlRG93bk9mZnNldC55O1xuXG4gICAgY29uc3QgcDEgPSB7IHgsIHkgfTtcbiAgICBjb25zdCBwMiA9IHsgeDogdGhpcy5vcHRpb25zLnNpemUgLyAyLCB5OiB0aGlzLm9wdGlvbnMuc2l6ZSAvIDIgfTtcbiAgICAvLyBnZXQgZGlzdGFuY2UgZnJvbSBjZW50ZXIgb2Ygc3RhZ2VcbiAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGgubWluKGdldERpc3RhbmNlKHAxLCBwMiksIHRoaXMub3B0aW9ucy5tYXhSYWRpdXMpO1xuXG4gICAgY29uc3QgYW5nbGUgPSBnZXRBbmdsZShwMSwgcDIpO1xuICAgIC8vIFRoZSBoYW5kbGUgc2hvdWxkIG5vdCBwYXNzIHRoZSBtYXhpbWFsIHJhZGl1cyBkZWZpbmVkIGluIG9wdGlvbnNcbiAgICBjb25zdCBtYXhYID0gLU1hdGguc2luKGFuZ2xlKSAqIGRpc3RhbmNlICsgdGhpcy5vcHRpb25zLnNpemUgLyAyO1xuICAgIGNvbnN0IG1heFkgPSAtTWF0aC5jb3MoYW5nbGUpICogZGlzdGFuY2UgKyB0aGlzLm9wdGlvbnMuc2l6ZSAvIDI7XG5cbiAgICB0aGlzLmhhbmRsZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN4XCIsIG1heFgpO1xuICAgIHRoaXMuaGFuZGxlLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiY3lcIiwgbWF4WSk7XG5cbiAgICB0aGlzLmNpcmNsZS5zZXRBdHRyaWJ1dGUoXCJyXCIsIGRpc3RhbmNlKTtcbiAgICB0aGlzLmxpbmUuc2V0QXR0cmlidXRlKFwieDJcIiwgbWF4WCk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZShcInkyXCIsIG1heFkpO1xuXG4gICAgLy8gRGlzcGF0Y2ggY3VzdG9tIEV2ZW50XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXCJ1cGRhdGVcIiwgeyBkZXRhaWw6IGRpc3RhbmNlIH0pO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICBkb2NNb3VzZVVwKCkge1xuICAgIC8vIENsZWFudXBcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuZG9jTW91c2VNb3ZlKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLmRvY01vdXNlVXApO1xuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRBbmdsZSwgZ2V0T3Bwb3NpdGVMZW5ndGgsIGdldEFkamFjZW50TGVuZ3RoLCBjb21tYW5kc1RvU3ZnUGF0aCwgbWFya092ZXJsYXBwZWQsIHNob3J0ZXN0U2lkZSwgcm91bmRWYWx1ZXMsIGdldFByZXZpb3VzTm9aLCBnZXROZXh0Tm9aLCByZXZlcnNlTWFya092ZXJsYXBwZWQsIGJzcGxpdCwgZ2V0RGlzdGFuY2UsIGdldE9mZnNldCwgZ2V0VGFuZ2VudE5vSHlwLCBuZXdDb21tYW5kcywgY29udmVydFRvQWJzb2x1dGUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gY29tbWFuZCBzdHJpbmcgYW5kIGdlbmVyYXRlcyBhbiBhcnJheSBvZiBwYXJzZWQgY29tbWFuZHMuXG4gKiBUaGlzIGZ1bmN0aW9uIG5vcm1hbGlzZXMgYWxsIHJlbGF0aXZlIGNvbW1hbmRzIGludG8gYWJzb2x1dGUgY29tbWFuZHMgYW5kXG4gKiB0cmFuc2Zvcm1zIGgsIEgsIHYsIFYgdG8gTCBjb21tYW5kc1xuICogQHBhcmFtIHtzdHJpbmd9IHN0ciBSYXcgc3RyaW5nIGZyb20gJ2QnIEF0dHJpYnV0ZVxuICogQHJldHVybnMge2FycmF5fSBBcnJheSBvZiBub3JtYWxpc2VkIGNvbW1hbmRzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlUGF0aChzdHIpIHtcbiAgY29uc3QgbWFya2VyUmVnRXggPSAvW01tTGxTc1FxTGxIaFZ2Q2NTc1FxVHRBYVp6XS9nO1xuICBjb25zdCBkaWdpdFJlZ0V4ID0gLy0/WzAtOV0qXFwuP1xcZCsvZztcbiAgXG4gIHJldHVybiBbLi4uc3RyLm1hdGNoQWxsKG1hcmtlclJlZ0V4KV1cbiAgICAubWFwKChtYXRjaCkgPT4ge1xuICAgICAgcmV0dXJuIHsgbWFya2VyOiBtYXRjaFswXSwgaW5kZXg6IG1hdGNoLmluZGV4IH07XG4gICAgfSlcbiAgICAucmVkdWNlUmlnaHQoKGFjYywgY3VyKSA9PiB7XG4gICAgICBjb25zdCBjaHVuayA9IHN0ci5zdWJzdHJpbmcoXG4gICAgICAgIGN1ci5pbmRleCxcbiAgICAgICAgYWNjLmxlbmd0aCA/IGFjY1thY2MubGVuZ3RoIC0gMV0uaW5kZXggOiBzdHIubGVuZ3RoXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW1xuICAgICAgICB7XG4gICAgICAgICAgbWFya2VyOiBjdXIubWFya2VyLFxuICAgICAgICAgIGluZGV4OiBjdXIuaW5kZXgsXG4gICAgICAgICAgY2h1bms6IGNodW5rLmxlbmd0aCA+IDAgPyBjaHVuay5zdWJzdHIoMSwgY2h1bmsubGVuZ3RoIC0gMSkgOiBjaHVua1xuICAgICAgICB9XG4gICAgICBdKTtcbiAgICB9LCBbXSlcbiAgICAucmV2ZXJzZSgpXG4gICAgLmZsYXRNYXAoKGNtZCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVzID0gY21kLmNodW5rLm1hdGNoKGRpZ2l0UmVnRXgpO1xuICAgICAgY29uc3QgdmFscyA9IHZhbHVlcyA/IHZhbHVlcy5tYXAocGFyc2VGbG9hdCkgOiBbXTtcbiAgICAgIHJldHVybiBuZXdDb21tYW5kcyhjbWQubWFya2VyLCB2YWxzKTtcbiAgICB9KVxuICAgIC5tYXAoY29udmVydFRvQWJzb2x1dGUpO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggYW4gYXJyYXkgb2Ygbm9ybWFsaXNlZCBjb21tYW5kcyBhbmQgaW5zZXJ0IGFyY3Mgd2hlcmUgYXBwbGljYWJsZS5cbiAqIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIGFycmF5IGluIHBsYWNlLlxuICogQHBhcmFtIHthcnJheX0gX2NtZHMgQXJyYXkgd2l0aCBjb21tYW5kcyB0byBiZSBtb2RpZmllZFxuICogQHBhcmFtIHtudW1iZXJ9IHIgRXhwZWN0ZWQgcmFkaXVzIG9mIHRoZSBhcmNzLlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kIE51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyB0byByb3VuZCB2YWx1ZXNcbiAqIEByZXR1cm5zIHthcnJheX0gU2VxdWVuY2Ugb2YgY29tbWFuZHMgY29udGFpbmluZyBhcmNzIGluIHBsYWNlIG9yIGNvcm5lcnNcbiAqL1xuZnVuY3Rpb24gcm91bmRDb21tYW5kcyhjbWRzLCByLCByb3VuZCkge1xuICBsZXQgc3VicGF0aHMgPSBbXTtcbiAgbGV0IG5ld0NtZHMgPSBbXTtcblxuICBpZiAocm91bmQpIHtcbiAgICBjbWRzLmZvckVhY2goZWwgPT4gcm91bmRWYWx1ZXMoZWwsIHJvdW5kKSk7XG4gICAgLy8gcm91bmRWYWx1ZXMoY21kcywgcm91bmQpO1xuICB9XG5cbiAgY21kc1xuICAgIC8vIHNwbGl0IHN1YiBwYXRoc1xuICAgIC5mb3JFYWNoKChlLCBpLCBhKSA9PiB7XG4gICAgICBpZiAoZS5tYXJrZXIgPT09ICdNJykge1xuICAgICAgICBzdWJwYXRocy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIHN1YnBhdGhzW3N1YnBhdGhzLmxlbmd0aCAtIDFdLnB1c2goZSk7XG4gICAgfSk7XG5cbiAgc3VicGF0aHMuZm9yRWFjaCgoc3ViUGF0aENtZHMpID0+IHtcbiAgICBzdWJQYXRoQ21kc1xuICAgICAgLy8gV2UgYXJlIG9ubHkgZXhjbHVkaW5nIGxpbmVUbyBjb21tYW5kcyB0aGF0IG1heSBiZSBvdmVybGFwcGluZ1xuICAgICAgLm1hcChtYXJrT3ZlcmxhcHBlZCk7XG5cbiAgICByZXZlcnNlTWFya092ZXJsYXBwZWQoc3ViUGF0aENtZHMsIHN1YlBhdGhDbWRzLmxlbmd0aCAtIDEpO1xuICAgIFxuICAgIHN1YlBhdGhDbWRzXG4gICAgICAuZmlsdGVyKChlbCkgPT4gIWVsLm92ZXJsYXApXG4gICAgICAubWFwKChlbCwgaSwgYXJyKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhcmdlQXJjRmxhZyA9IDA7XG4gICAgICAgIGNvbnN0IHByZXYgPSBnZXRQcmV2aW91c05vWihlbCwgaSwgYXJyKTtcbiAgICAgICAgY29uc3QgbmV4dCA9IGdldE5leHROb1ooZWwsIGksIGFycik7XG4gICAgICAgIGNvbnN0IGFuZ2xlUHJ2ID0gZ2V0QW5nbGUoZWwudmFsdWVzLCBwcmV2LnZhbHVlcyk7XG4gICAgICAgIGNvbnN0IGFuZ2xlTnh0ID0gZ2V0QW5nbGUoZWwudmFsdWVzLCBuZXh0LnZhbHVlcyk7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gYW5nbGVOeHQgLSBhbmdsZVBydjsgLy8gcmFkaWFuc1xuICAgICAgICBjb25zdCBkZWdyZWVzID0gYW5nbGUgKiAoMTgwL01hdGguUEkpO1xuICAgICAgICAvLyBwcmV2ZW50IGFyYyBjcm9zc2luZyB0aGUgbmV4dCBjb21tYW5kXG4gICAgICAgIGNvbnN0IHNob3J0ZXN0ID0gc2hvcnRlc3RTaWRlKGVsLCBwcmV2LCBuZXh0KTtcbiAgICAgICAgY29uc3QgbWF4UmFkaXVzID0gTWF0aC5hYnMoZ2V0VGFuZ2VudE5vSHlwKGFuZ2xlIC8gMiwgc2hvcnRlc3QgLyAyKSk7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHIsIG1heFJhZGl1cyk7XG5cbiAgICAgICAgY29uc3QgbyA9IGdldE9mZnNldChhbmdsZSwgcmFkaXVzKTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gby5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IHN3ZWVwRmxhZyA9IG8uc3dlZXBGbGFnO1xuICAgICAgICBcbiAgICAgICAgc3dpdGNoIChlbC5tYXJrZXIpIHtcbiAgICAgICAgICBjYXNlICdNJzogLy8gbW92ZVRvIHgseVxuICAgICAgICAgIGNhc2UgJ0wnOiAvLyBsaW5lVG8geCx5XG4gICAgICAgICAgICBjb25zdCBwcmV2UG9pbnQgPSBbXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy54ICsgZ2V0T3Bwb3NpdGVMZW5ndGgoYW5nbGVQcnYsIG9mZnNldCksXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy55ICsgZ2V0QWRqYWNlbnRMZW5ndGgoYW5nbGVQcnYsIG9mZnNldClcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IG5leHRQb2ludCA9IFtcbiAgICAgICAgICAgICAgZWwudmFsdWVzLnggKyBnZXRPcHBvc2l0ZUxlbmd0aChhbmdsZU54dCwgb2Zmc2V0KSxcbiAgICAgICAgICAgICAgZWwudmFsdWVzLnkgKyBnZXRBZGphY2VudExlbmd0aChhbmdsZU54dCwgb2Zmc2V0KVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgLy8gdGhlcmUgb25seSBuZWVkIGJlIGEgY3VydmUgaWYgYW5kIG9ubHkgaWYgdGhlIG5leHQgbWFya2VyIGlzIGEgY29ybmVyXG4gICAgICAgICAgICBuZXdDbWRzLnB1c2goe1xuICAgICAgICAgICAgICBtYXJrZXI6IGVsLm1hcmtlcixcbiAgICAgICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgeDogcGFyc2VGbG9hdChwcmV2UG9pbnRbMF0udG9GaXhlZCgzKSksXG4gICAgICAgICAgICAgICAgeTogcGFyc2VGbG9hdChwcmV2UG9pbnRbMV0udG9GaXhlZCgzKSksXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobmV4dC5tYXJrZXIgPT09ICdMJyB8fCBuZXh0Lm1hcmtlciA9PT0gJ00nKSB7ICBcbiAgICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBtYXJrZXI6ICdBJyxcbiAgICAgICAgICAgICAgICByYWRpdXM6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgIHJhZGl1c1g6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICAgIHJhZGl1c1k6IHJhZGl1cyxcbiAgICAgICAgICAgICAgICAgIHJvdGF0aW9uOiBkZWdyZWVzLFxuICAgICAgICAgICAgICAgICAgbGFyZ2VBcmM6IGxhcmdlQXJjRmxhZyxcbiAgICAgICAgICAgICAgICAgIHN3ZWVwOiBzd2VlcEZsYWcsXG4gICAgICAgICAgICAgICAgICB4OiBwYXJzZUZsb2F0KG5leHRQb2ludFswXS50b0ZpeGVkKDMpKSxcbiAgICAgICAgICAgICAgICAgIHk6IHBhcnNlRmxvYXQobmV4dFBvaW50WzFdLnRvRml4ZWQoMykpLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBlbHNlIGlmIChuZXh0Lm1hcmtlciA9PT0gJ0MnKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRvdGFsRGlzdGFuY2UgPSBnZXREaXN0YW5jZShcbiAgICAgICAgICAgICAgICB7IHg6ZWwudmFsdWVzLngsIHk6IGVsLnZhbHVlcy55IH0sXG4gICAgICAgICAgICAgICAgeyB4Om5leHQudmFsdWVzLngsIHk6IG5leHQudmFsdWVzLnkgfVxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGNvbnN0IHAgPSBvZmZzZXQgLyB0b3RhbERpc3RhbmNlO1xuICAgICAgICAgICAgICBjb25zdCBzcGxpdHRlZCA9IGJzcGxpdChcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICBbZWwudmFsdWVzLngsIGVsLnZhbHVlcy55XSxcbiAgICAgICAgICAgICAgICAgIFtuZXh0LnZhbHVlcy54MSwgbmV4dC52YWx1ZXMueTFdLFxuICAgICAgICAgICAgICAgICAgW25leHQudmFsdWVzLngyLCBuZXh0LnZhbHVlcy55Ml0sXG4gICAgICAgICAgICAgICAgICBbbmV4dC52YWx1ZXMueCwgbmV4dC52YWx1ZXMueV1cbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHBcbiAgICAgICAgICAgICAgKVsxXTtcblxuICAgICAgICAgICAgICBuZXh0LnZhbHVlcyA9IHtcbiAgICAgICAgICAgICAgICB4MTogc3BsaXR0ZWRbMV1bMF0sXG4gICAgICAgICAgICAgICAgeTE6IHNwbGl0dGVkWzFdWzFdLFxuICAgICAgICAgICAgICAgIHgyOiBzcGxpdHRlZFsyXVswXSxcbiAgICAgICAgICAgICAgICB5Mjogc3BsaXR0ZWRbMl1bMV0sXG4gICAgICAgICAgICAgICAgeDogc3BsaXR0ZWRbM11bMF0sXG4gICAgICAgICAgICAgICAgeTogc3BsaXR0ZWRbM11bMV1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG5ld0NtZHMucHVzaCh7XG4gICAgICAgICAgICAgICAgbWFya2VyOiAnQScsXG4gICAgICAgICAgICAgICAgZGVncmVlczogZGVncmVlcy50b0ZpeGVkKDMpLFxuICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgcmFkaXVzWDogcixcbiAgICAgICAgICAgICAgICAgIHJhZGl1c1k6IHIsXG4gICAgICAgICAgICAgICAgICByb3RhdGlvbjogZGVncmVlcyxcbiAgICAgICAgICAgICAgICAgIGxhcmdlQXJjOiBsYXJnZUFyY0ZsYWcsXG4gICAgICAgICAgICAgICAgICBzd2VlcDogc3dlZXBGbGFnLFxuICAgICAgICAgICAgICAgICAgeDogc3BsaXR0ZWRbMF1bMF0sXG4gICAgICAgICAgICAgICAgICB5OiBzcGxpdHRlZFswXVsxXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBuZXdDbWRzLnB1c2goeyBtYXJrZXI6IGVsLm1hcmtlciwgdmFsdWVzOiBlbC52YWx1ZXMgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAqL1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgLy8gY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4LiBUcmFuc2Zvcm1lZCB0byBMIGluIHV0aWxzXG4gICAgICAgICAgLy8gY2FzZSAnVic6IC8vIHZlcnRpY2FsVG8geS4gVHJhbnNmb3JtZWQgdG8gTCBpbiB1dGlsc1xuICAgICAgICAgIGNhc2UgJ0MnOiAvLyBjdWJpYyBiZXppw6lyOiB4MSB5MSwgeDIgeTIsIHggeVxuICAgICAgICAgIGNhc2UgJ1MnOiAvLyBzaG9ydCBiZXppw6lyOiB4MiB5MiwgeCB5XG4gICAgICAgICAgY2FzZSAnUSc6IC8vIHF1YWRyYXRpYyBiZXppw6lyOiB4MSB5MSwgeCB5XG4gICAgICAgICAgY2FzZSAnVCc6IC8vIHNob3J0IHF1YWRyYXRpYyBiZXppw6lyOiB4IHlcbiAgICAgICAgICBjYXNlICdBJzogLy8gYXJjOiByeCByeSB4LWF4aXMtcm90YXRpb24gbGFyZ2UtYXJjLWZsYWcgc3dlZXAtZmxhZyB4IHlcbiAgICAgICAgICBjYXNlICdaJzogLy8gY2xvc2UgcGF0aFxuICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHsgbWFya2VyOiBlbC5tYXJrZXIsIHZhbHVlczogZWwudmFsdWVzIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pXG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogY29tbWFuZHNUb1N2Z1BhdGgobmV3Q21kcyksXG4gICAgICBjb21tYW5kczogbmV3Q21kc1xuICAgIH07XG59XG5cbi8qKlxuICogVGhpcyBpcyBhIHNob3J0aGFuZCBmb3IgcGFyc2VQYXRoKCkgYW5kIHJvdW5kQ29tbWFuZHMoKS5cbiAqIFlvdSBnZXQgdGhlIGVuZCByZXN1bHQgaW4gb25lIGZ1bmN0aW9uIGNhbGwuXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFJhdyBzdHJpbmcgd2l0aCBjb21tYW5kcyBmcm9tIHRoZSBwYXRoIGVsZW1lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSByIEV4cGVjdGVkIHJhZGl1cyBvZiB0aGUgYXJjcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3VuZCBOdW1iZXIgb2YgZGVjaW1hbCBkaWdpdHMgdG8gcm91bmQgdmFsdWVzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBOZXcgY29tbWFuZHMgc2VxdWVuY2Ugd2l0aCByb3VuZGVkIGNvcm5lcnMgXG4gKi9cbmZ1bmN0aW9uIHJvdW5kQ29ybmVycyhzdHIsIHIsIHJvdW5kKSB7XG4gIHJldHVybiByb3VuZENvbW1hbmRzKFsuLi5wYXJzZVBhdGgoc3RyKV0sIHIsIHJvdW5kKTtcbn1cblxuZXhwb3J0IHtcbiAgcGFyc2VQYXRoLFxuICByb3VuZENvbW1hbmRzLFxuICByb3VuZENvcm5lcnMsXG59IiwiLyoqXG4gKiBSb3VuZCB0aGUgdmFsdWVzIG9mIGVhY2ggY29tbWFuZCB0byB0aGUgZ2l2ZW4gbnVtYmVyIG9mIGRlY2ltYWxzLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgb2JqZWN0IGluIHBsYWNlLlxuICogQHBhcmFtIHthcnJheX0gY21kcyBTZXF1ZW5jZSBvZiBjb21tYW5kc1xuICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlIHRvIGJlIHJvdW5kZWRcbiAqIEByZXR1cm5zIHthcnJheX0gU2VxdWVuY2Ugb2YgY29tbWFuZHMgd2l0aCB0aGVpciB2YWx1ZXMgcm91bmRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcm91bmRWYWx1ZXMoZWwsIHJvdW5kKSB7XG4gIE9iamVjdC5rZXlzKGVsLnZhbHVlcykuZm9yRWFjaChrZXkgPT4gXG4gICAgZWwudmFsdWVzW2tleV0gPSBlbC52YWx1ZXNba2V5XSAmJiBwYXJzZUZsb2F0KGVsLnZhbHVlc1trZXldLnRvRml4ZWQocm91bmQpKVxuICApO1xuXG4gIHJldHVybiBlbDtcbn1cblxuLyoqXG4gKiBHZXQgcHJldmlvdXMgZWxlbWVudCBpbiBhcnJheSwgd3JhcHBpbmcgaWYgaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBhbmQgc2tpcHBpbmcgaWYgdGhlIGNvbW1hbmQgaXMgJ1onXG4gKiBAcGFyYW0ge2FueX0gZSBDb21tYW5kIG9iamVjdCBcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIEN1cnJlbnQgaW5kZXhcbiAqIEBwYXJhbSB7YXJyYXl9IGEgQXJyYXkgYmVpbmcgaXRlcmF0ZWRcbiAqIEByZXR1cm5zIHthbnl9IFByZXZpb3VzIGVsZW1lbnQgdGhhdCBkb2Vzbid0IGhhdmUgYSAnWicgbWFya2VyXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmV2aW91c05vWihlLCBpLCBhKSB7XG4gIGNvbnN0IGNvdW50ZXIgPSBpIC0gMTtcbiAgY29uc3QgcHJldmlvdXMgPSBhW21vZChjb3VudGVyLCBhLmxlbmd0aCldO1xuXG4gIGlmIChwcmV2aW91cy5tYXJrZXIgIT09ICdaJykge1xuICAgIHJldHVybiBwcmV2aW91cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZ2V0UHJldmlvdXNOb1ooZSwgY291bnRlciwgYSk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgbmV4dCBlbGVtZW50IGluIGFycmF5LCB3cmFwcGluZyBpZiBpbmRleCBpcyBvdXQgb2YgYm91bmRzIGFuZCBza2lwcGluZyBpZiB0aGUgY29tbWFuZCBpcyAnWidcbiAqIEBwYXJhbSB7YW55fSBlIENvbW1hbmQgb2JqZWN0IFxuICogQHBhcmFtIHtudW1iZXJ9IGkgQ3VycmVudCBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYSBBcnJheSBiZWluZyBpdGVyYXRlZFxuICogQHJldHVybnMge2FueX0gTmV4dCBlbGVtZW50IHRoYXQgZG9lc24ndCBoYXZlIGEgJ1onIG1hcmtlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dE5vWihlLCBpLCBhKSB7XG4gIGNvbnN0IGNvdW50ZXIgPSBpICsgMTtcbiAgY29uc3QgbmV4dCA9IGFbbW9kKGNvdW50ZXIsIGEubGVuZ3RoKV07XG5cbiAgaWYgKG5leHQubWFya2VyID09PSAnWicpIHtcbiAgICByZXR1cm4gZ2V0TmV4dE5vWihlLCBjb3VudGVyLCBhKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxufVxuXG4vKipcbiAqIEl0ZXJhdGUgdGhyb3VnaCBhbiBhcnJheSBhbmQgY29udmVydCBhbGwgY29tbWFuZHMgdG8gYWJzb2x1dGUuXG4gKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB1c2VkIGFzIGFyZ3VtZW50IGluIGEgbWFwKCkgY2FsbC5cbiAqIEBwYXJhbSB7YW55fSBlbCBDdXJyZW50IGVsZW1lbnQgaW4gdGhpcyBpdGVyYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBDdXJyZW50IGl0ZXJhdGlvbiBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYXJyIEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9BYnNvbHV0ZShlbCwgaW5kZXgsIGFycikge1xuICAvLyBnZXQgcHJldmlvdXMgaXRlbSBvciBjcmVhdGUgb25lIGVtcHR5IGlmIGl0IGRvZXNudCBleGlzdFxuICBsZXQgcHJldiA9IGFycltpbmRleCAtIDFdIHx8IHsgdmFsdWVzOiB7IHg6IDAsIHk6IDAgfSB9O1xuXG4gIC8vIG9ubHkgbmVlZCB0byB0ZXN0IGxvd2VyY2FzZSAocmVsYXRpdmUpIGNvbW1hbmRzXG4gIGlmIChlbC5tYXJrZXIgPT09IGVsLm1hcmtlci50b0xvd2VyQ2FzZSgpKSB7XG4gICAgLy8gY29udmVydCBhbGwgdG8gdXBwZXJjYXNlXG4gICAgZWwubWFya2VyID0gZWwubWFya2VyLnRvVXBwZXJDYXNlKCk7XG4gICAgc3dpdGNoIChlbC5tYXJrZXIpIHtcbiAgICAgIGNhc2UgJ00nOiAvLyBtb3ZlIHRvIHgseVxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0wnOiAvLyBsaW5lIHRvIHgseVxuICAgICAgY2FzZSAnQSc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4XG4gICAgICAgIGVsLm1hcmtlciA9ICdMJztcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1YnOiAvLyB2ZXJ0aWNhbFRvIHlcbiAgICAgICAgZWwubWFya2VyID0gJ0wnO1xuICAgICAgICBlbC52YWx1ZXMueCA9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQyc6IC8vIGJlemnDqXIgY3VydmUgeDEgeTEsIHgyIHkyLCB4IHlcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngxICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBlbC52YWx1ZXMueDIgKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkyICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGVsLnZhbHVlcy54MiArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueTIgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdRJzpcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngxICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1QnOlxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1onOlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIC8vIEgvViB1cHBlcmNhc2UgbmVlZCB0byBiZSBjb252ZXJ0ZWQgdG9vLiBDb252ZXJ0IHRvIEwgYW5kIGFkZCBtaXNzaW5nIHZhbHVlXG4gIH0gZWxzZSBpZiAoZWwubWFya2VyID09PSBlbC5tYXJrZXIudG9VcHBlckNhc2UoKSkge1xuICAgIHN3aXRjaCAoZWwubWFya2VyKSB7XG4gICAgICBjYXNlICdIJzogLy8gaG9yaXpvbnRhbFRvIHhcbiAgICAgICAgZWwubWFya2VyID0gJ0wnO1xuICAgICAgICBlbC52YWx1ZXMueSA9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnVic6IC8vIHZlcnRpY2FsVG8geVxuICAgICAgICBlbC5tYXJrZXIgPSAnTCc7XG4gICAgICAgIGVsLnZhbHVlcy54ID0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLyogXG4gICAgJ1onIGNvbW1hbmRzIGRvbid0IGhhdmUgYW55IGNvb3JkaW5hdGUgYnV0IHdlIGFyZSBjbG9uaW5nIHRoZVxuICAgIHN0YXJ0IGNvb3JkaW5hdGVzIGRlZmluZWQgYnkgdGhpcyBzdWJwYXRoIGluaXRpYWwgJ00nIHNvIGl0J3NcbiAgICBlYXNpZXIgdG8gZG8gdGhlIHN0aXRjaGluZyBsYXR0ZXIuXG4gICovXG4gIGlmIChlbC5tYXJrZXIgPT09ICdaJykge1xuICAgIC8vIGZpbmQgcHJldmlvdXMgJ00nIHJlY3Vyc2l2ZWx5XG4gICAgZnVuY3Rpb24gcmVjKGFyciwgaSkge1xuICAgICAgaWYgKGFycltpXS5tYXJrZXIgPT09ICdNJykge1xuICAgICAgICByZXR1cm4gYXJyW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlYyhhcnIsIGkgLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IG1CZWZvcmUgPSByZWMoYXJyLCBpbmRleCk7XG4gICAgZWwudmFsdWVzLnggPSBtQmVmb3JlLnZhbHVlcy54O1xuICAgIGVsLnZhbHVlcy55ID0gbUJlZm9yZS52YWx1ZXMueTtcbiAgfVxuXG4gIHJldHVybiBlbDtcbn1cblxuLyoqXG4gKiBUYWtlcyBvbmUgbWFya2VyIGFuZCBhbiBhcnJheSBvZiBudW1iZXJzIGFuZCBjcmVhdGVzIG9uZSBvciBtb3JlIGNvbW1hbmQgb2JqZWN0cyB3aXRoIHRoZSByaWdodFxuICogcHJvcGVydGllcyBiYXNlZCBvbiB0aGUgZ2l2ZW4gbWFya2VyLiBTb21lIG1hcmtlcnMgYWxsb3cgZm9yIG11bHRpcGxlIGNvb3JkaW5hdGVzIGZvciBvbmUgc2luZ2xlIGNvbW1hbmQuXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIGNhcmUgb2Ygc3BsaXR0aW5nIG11bHRpcGxlIGNvb3JkaW5hdGVzIHBlciBjb21tYW5kIGFuZCBnZW5lcmF0aW5nIHRoZSBcbiAqIEBwYXJhbSB7c3RyaW5nfSBtYXJrZXIgTGV0dGVyIG9mIHRoZSBjb21tYW5kIGJlaW5nIGdlbmVyYXRlZFxuICogQHBhcmFtIHthcnJheX0gdmFsdWVzIEFycmF5IG9mIG51bWJlcnMgdG8gYmUgc3BsaXR0ZWQgYW5kIHBhcnNlZCBpbnRvIHRoZSByaWdodCBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7YXJyYXl9IEFycmF5IG9mIGNvbW1hbmRzLiBNb3N0IG9mIHRoZSB0aW1lIHdpbGwgaGF2ZSBvbmx5IG9uZSBpdGVtXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBuZXdDb21tYW5kcyhtYXJrZXIsIHZhbHVlcykge1xuICBjb25zdCBjbWRzID0gW107XG5cbiAgc3dpdGNoIChtYXJrZXIudG9VcHBlckNhc2UoKSkge1xuICAgIGNhc2UgJ00nOiAvLyBtb3ZlVG8geCx5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrPTIpIHtcbiAgICAgICAgbGV0IG07XG4gICAgICAgIGlmIChtYXJrZXIgPT09IG1hcmtlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgbSA9IGkgPT09IDAgPyAnTScgOiAnTCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9IGkgPT09IDAgPyAnbScgOiAnbCc7XG4gICAgICAgIH1cbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXI6IG0sXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdMJzogLy8gbGluZVRvIHgseVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKz0yKSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1YnOiAvLyB2ZXJ0aWNhbFRvIHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpXSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQyc6IC8vIGN1YmljIGJlemnDqXIgY3VydmUgeDEgeTEsIHgyIHkyLCB4IHlcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSs9Nikge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHgxOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5MTogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICAgIHgyOiB2YWx1ZXNbaSArIDJdLFxuICAgICAgICAgICAgeTI6IHZhbHVlc1tpICsgM10sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDRdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyA1XSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUyc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrPTQpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4MjogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTI6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDJdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAzXSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUSc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrPTQpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4MTogdmFsdWVzW2ldLFxuICAgICAgICAgICAgeTE6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDJdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyAzXSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnVCc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrPTIpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdBJzpcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSs9Nykge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHJhZGl1c1g6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHJhZGl1c1k6IHZhbHVlc1tpICsgMV0sXG4gICAgICAgICAgICByb3RhdGlvbjogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIGxhcmdlQXJjOiB2YWx1ZXNbaSArIDNdLFxuICAgICAgICAgICAgc3dlZXA6IHZhbHVlc1tpICsgNF0sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDVdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyA2XSxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnWic6XG4gICAgICBjbWRzLnB1c2goe1xuICAgICAgICBtYXJrZXIsXG4gICAgICAgIHZhbHVlczogeyAvLyB2YWx1ZXMgd2lsbCBiZSBvdmVycmlkZW4gbGF0ZXIgYnkgY29udmVydFRvQWJzb2x1dGUoKVxuICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgeTogMCxcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gY21kcztcbn1cblxuLyoqXG4gKiBUYWtlcyBhbiBpbmRleCBhbmQgYSBsZW5ndGggYW5kIHJldHVybnMgdGhlIGluZGV4IHdyYXBwZWQgaWYgb3V0IG9mIGJvdW5kcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4IEluZGV4XG4gKiBAcGFyYW0ge251bWJlcn0gbSBMZW5ndGhcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEluZGV4IG9yIHdyYXBwZWQgaW5kZXggaWYgb3V0IGJvdW5kc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbW9kKHgsIG0pIHtcbiAgcmV0dXJuICh4ICUgbSArIG0pICUgbTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgZ2l2ZW4gZWxlbWVudCB3aXRoIGl0J3MgcHJlZGVjZXNzb3IgYW5kIGNoZWNrcyBpZiB0aGVpciBlbmQgcG9zaXRpb24gaXMgdGhlIHNhbWUuXG4gKiBJZiBpdCBpcywgYWRkIGEgYm9vbGVhbiAnb3ZlcmxhcCcgcHJvcGVydHkgdG8gdGhlIGVsZW1lbnQuIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIGFycmF5IGVsZW1lbnRzIGluIHBsYWNlXG4gKiBAcGFyYW0ge2FueX0gZWwgQ29tbWFuZCBvYmplY3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBDdXJyZW50IGl0ZXJhdGlvbiBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgQXJyYXkgYmVpbmcgaXRlcmF0ZWRcbiAqIEByZXR1cm5zIHthbnl9IENvbW1hbmQgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrT3ZlcmxhcHBlZChlbCwgaW5kZXgsIGFycmF5KSB7XG4gIC8vIFNraXAgdGhlIGZpcnN0IG1vdmVUbyBjb21tYW5kIGFuZCBhbnkgb3RoZXIgdGhhdCdzIG5vdCBhIGxpbmVUby5cbiAgaWYgKGluZGV4ICE9PSAwICYmIGVsLm1hcmtlciA9PT0gJ0wnKSB7XG4gICAgLy8gSXQgc2VlbXMgd2UgaGF2ZSBhIGxpbmVUbyBoZXJlLiBHZXQgdGhlIGltbWVkaWF0ZSBwcmV2aW91cyBjb21tYW5kXG4gICAgbGV0IHByZXZpb3VzID0gYXJyYXlbaW5kZXggLSAxXTtcbiAgICAvLyDigKZhbmQgY2hlY2sgaWYgdGhlIHgsIHkgY29vcmRpbmF0ZXMgYXJlIGVxdWFscy5cbiAgICBjb25zdCBvdmVybGFwID0gWyd4JywgJ3knXS5ldmVyeSgoa2V5KSA9PiB7XG4gICAgICAvLyBJZiB4IEFORCB5IG92ZXJsYXAsIHRoaXMgY29tbWFuZCBzaG91bGQgYmUgc2tpcHBlZFxuICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5hYnMocHJldmlvdXMudmFsdWVzW2tleV0gLSBlbC52YWx1ZXNba2V5XSkpID09PSAwO1xuICAgIH0pO1xuXG4gICAgaWYgKG92ZXJsYXApIHtcbiAgICAgIGVsLm92ZXJsYXAgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGVsO1xufVxuXG4vKipcbiAqIFNpbWlsYXIgcHVycG9zZSBhcyBtYXJrT3ZlcmxhcHBlZCgpLiBSZWN1cnNpdmVseSBtYXJrcyB0cmFpbGxpbmcgY29tbWFuZHMgdGhhdCBoYXZlIHRoZSBzYW1lIGVuZCBjb29yZGluYXRlIGFzIHRoZSBpbml0YWwgJ00nLlxuICogVGhpcyBmdW5jdGlvbiBtb2RpZmllcyB0aGUgYXJyYXkgaW4gcGxhY2UuXG4gKiBAcGFyYW0ge2FycmF5fSBjbWRzIENvbW1hbmRzIGFycmF5XG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggT3B0aW9uYWwgc3RhcnQgaW5kZXggY291bnRpbmcgYmFja3dhcmRzLiBVc3VhbGx5IHRoZSBsYXN0IGluZGV4IGZyb20gdGhlIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZXZlcnNlTWFya092ZXJsYXBwZWQoY21kcywgY291bnRlcikgeyBcbiAgY29uc3Qgb3ZlcmxhcCA9IFsneCcsICd5J10uZXZlcnkoKGtleSkgPT4ge1xuICAgIC8vIElmIHggQU5EIHkgb3ZlcmxhcCwgdGhpcyBjb21tYW5kIHNob3VsZCBiZSBza2lwcGVkXG4gICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5hYnMoY21kc1tjb3VudGVyXS52YWx1ZXNba2V5XSAtIGNtZHNbMF0udmFsdWVzW2tleV0pKSA9PT0gMDtcbiAgfSk7XG5cbiAgaWYgKGNtZHNbY291bnRlcl0ubWFya2VyID09PSAnTCcgJiYgb3ZlcmxhcCkge1xuICAgIGNtZHNbY291bnRlcl0ub3ZlcmxhcCA9IHRydWU7XG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKGNtZHMsIGNvdW50ZXIgLSAxKVxuICB9XG4gIFxuICBpZiAoY21kc1tjb3VudGVyXS5tYXJrZXIgPT09ICdaJykge1xuICAgIHJldmVyc2VNYXJrT3ZlcmxhcHBlZChjbWRzLCBjb3VudGVyIC0gMSlcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGN1cnJlbnQgY29tbWFuZCBhbmRcbiAqIGl0J3MgZGlyZWN0IG5laWdoYm91cnMgYW5kIHJldHVybnMgdGhlIG5lYXJlc3QgZGlzdGFuY2VcbiAqIEBwYXJhbSB7YW55fSBlbCBjdXJyZW50IGNvbW1hbmRcbiAqIEBwYXJhbSB7YW55fSBwcmV2aW91cyBwcmV2aW91cyBjb21tYW5kXG4gKiBAcGFyYW0ge2FueX0gbmV4dCBuZXh0IGNvbW1hbmRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBkaXN0YW5jZSB0byB0ZWggbmVhcmVzdCBjb21tYW5kXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG9ydGVzdFNpZGUoZWwsIHByZXZpb3VzLCBuZXh0KSB7XG4gIGNvbnN0IG54dFNpZGUgPSBnZXREaXN0YW5jZShlbC52YWx1ZXMsIG5leHQudmFsdWVzKTtcbiAgY29uc3QgcHJ2U2lkZSA9IGdldERpc3RhbmNlKHByZXZpb3VzLnZhbHVlcywgZWwudmFsdWVzKTtcbiAgcmV0dXJuIE1hdGgubWluKHBydlNpZGUsIG54dFNpZGUpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFuZ2xlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHthbnl9IHAxIE9iamVjdCB3aXRoIHggYW5kIHkgcHJvcGVydGllc1xuICogQHBhcmFtIHthbnl9IHAyIE9iamVjdCB3aXRoIHggYW5kIHkgcHJvcGVydGllc1xuICogQHJldHVybnMge251bWJlcn0gQW5nbGUgaW4gcmFkaWFuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5nbGUocDEsIHAyKSB7XG4gIHJldHVybiBNYXRoLmF0YW4yKHAyLnggLSBwMS54LCBwMi55IC0gcDEueSk7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0d28gcG9pbnRzXG4gKiBAcGFyYW0ge2FueX0gcDEgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0ge2FueX0gcDIgT2JqZWN0IHdpdGggeCBhbmQgeSBwcm9wZXJ0aWVzXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBEaXN0YW5jZSBiZXR3ZWVuIHBvaW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGlzdGFuY2UocDEsIHAyKSB7XG4gIGNvbnN0IHhEaWZmID0gcDEueCAtIHAyLng7XG4gIGNvbnN0IHlEaWZmID0gcDEueSAtIHAyLnk7XG5cbiAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh4RGlmZiwgMikgKyBNYXRoLnBvdyh5RGlmZiwgMikpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCBvZiB0aGUgb3Bwb3NpdGUgc2lkZVxuICogb2YgYSBnaXZlbiBhbmdsZSB1c2luZyB0aGUgaHlwb3RoZW51c2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gaGlwIEh5cG90aGVudXNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIG9wcG9zaXRlIHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9wcG9zaXRlTGVuZ3RoKGFuZ2xlLCBoaXApIHtcbiAgcmV0dXJuIE1hdGguc2luKGFuZ2xlKSAqIGhpcDtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhlIGFkamFjZW50IHNpZGVcbiAqIG9mIGEgZ2l2ZW4gYW5nbGUgdXNpbmcgdGhlIGh5cG90aGVudXNlXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgQW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGhpcCBIeXBvdGhlbnVzZVxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoIG9mIHRoZSBhZGphY2VudCBzaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRBZGphY2VudExlbmd0aChhbmdsZSwgaGlwKSB7XG4gIHJldHVybiBNYXRoLmNvcyhhbmdsZSkgKiBoaXA7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgYWRqYWNlbnQgc2lkZSBvZiB0aGUgZ2l2ZW5cbiAqIGFuZ2xlIHVzaW5nIHRoZSBhbmdsZSdzIG9wcG9zaXRlIHNpZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gb3Bwb3NpdGUgb3Bwb3NpdGUgc2lkZVxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoIG9mIHRoZSBhZGphY2VudCBzaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYW5nZW50TGVuZ3RoKGFuZ2xlLCBvcHBvc2l0ZSkge1xuICBjb25zdCBhID0gb3Bwb3NpdGUgLyBNYXRoLnRhbihhbmdsZSk7XG4gIGlmIChhID09PSBJbmZpbml0eSB8fCBhID09PSAtSW5maW5pdHkpIHtcbiAgICByZXR1cm4gb3Bwb3NpdGU7XG4gIH1cblxuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBvcHBvc2l0ZSBzaWRlIG9mIHRoZSBnaXZlblxuICogYW5nbGUgdXNpbmcgdGhlIGFuZ2xlJ3MgYWRqYWNlbnQgc2lkZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBhZGphY2VudCBhZGphY2VudCBzaWRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBMZW5ndGggb2YgdGhlIG9wcG9zaXRlIHNpZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhbmdlbnROb0h5cChhbmdsZSwgYWRqYWNlbnQpIHtcbiAgcmV0dXJuIGFkamFjZW50ICogTWF0aC50YW4oYW5nbGUpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGxlbmd0aCB0aGF0IHNob3VsZCBiZSB1c2VkIHRvIHNob3J0ZW4gdGhlXG4gKiBkaXN0YW5jZSBiZXR3ZWVuIGNvbW1hbmRzIGJhc2VkIG9uIHRoZSBnaXZlbiByYWRpdXMgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zIGJldHdlZW4gcG9pbnRzXG4gKiBAcGFyYW0ge251bWJlcn0gciBSYWRpdXMgb2YgdGhlIGFyYyB0aGF0IHNob3VsZCBmaXQgaW5zaWRlIHRoZSB0cmlhbmdsZVxuICogQHJldHVybnMge2FueX0gT2JqZWN0IGNvbnRhaW5pbmcgb2Zmc2V0IGFuZCB0aGUgYXJjJ3Mgc3dlZXBGbGFnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPZmZzZXQoYW5nbGUsIHIpIHtcbiAgbGV0IG9mZnNldDtcbiAgbGV0IHN3ZWVwRmxhZyA9IDA7XG4gIGxldCBkZWdyZWVzID0gYW5nbGUgKiAoMTgwL01hdGguUEkpO1xuXG4gIC8vIHNoYXJwIGFuZ2xlc1xuICBpZiAoXG4gICAgKGRlZ3JlZXMgPCAwICYmIGRlZ3JlZXMgPiAtOTApIHx8XG4gICAgKGRlZ3JlZXMgPiAxODAgJiYgZGVncmVlcyA8PSAyNzApIHx8XG4gICAgKGRlZ3JlZXMgPD0gLTkwICYmIGRlZ3JlZXMgPiAtMTgwKVxuICApIHtcbiAgICBvZmZzZXQgPSBnZXRUYW5nZW50TGVuZ3RoKGFuZ2xlLzIsIC1yKTtcbiAgLy8gb2J0dXNlIGFuZ2xlc1xuICB9IGVsc2Uge1xuICAgIG9mZnNldCA9IGdldFRhbmdlbnRMZW5ndGgoYW5nbGUvMiwgciApO1xuICAgIHN3ZWVwRmxhZyA9IDE7XG4gICAgaWYgKG9mZnNldCA9PT0gSW5maW5pdHkpIHtcbiAgICAgIG9mZnNldCA9IHI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvZmZzZXQsXG4gICAgc3dlZXBGbGFnLFxuICB9XG59XG5cbi8qKlxuICogT3JpZ2luYWxseSB0YWtlbiBmcm9tOiBodHRwOi8vYmwub2Nrcy5vcmcvYmFsaW50NDIvOGM5MzEwNjA1ZGY5MzA1YzQyYjNcbiAqIEBicmllZiBEZSBDYXN0ZWxqYXUncyBhbGdvcml0aG0gc3BsaXR0aW5nIG4tdGggZGVncmVlIEJlemllciBjdXJ2ZVxuICogQHJldHVybnMge2FycmF5fSBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJzcGxpdChwb2ludHMsIHQwKSB7XG4gIGNvbnN0IG4gPSBwb2ludHMubGVuZ3RoIC0gMTsgLy8gbnVtYmVyIG9mIGNvbnRyb2wgcG9pbnRzXG4gIGNvbnN0IGIgPSBbXTtcdFx0ICAgXHQgICAvLyBjb2VmZmljaWVudHMgYXMgaW4gRGUgQ2FzdGVsamF1J3MgYWxnb3JpdGhtXG4gIGNvbnN0IHJlczEgPSBbXTtcdFx0ICAgLy8gZmlyc3QgY3VydmUgcmVzdWx0aW5nIGNvbnRyb2wgcG9pbnRzXG4gIGNvbnN0IHJlczIgPSBbXTtcdFx0ICAgLy8gc2Vjb25kIGN1cnZlIHJlc3VsdGluZyBjb250cm9sIHBvaW50c1xuICBjb25zdCB0MSA9IDEgLSB0MDtcbiAgXG4gIC8vIG11bHRpcGx5IHBvaW50IHdpdGggc2NhbGFyIGZhY3RvclxuICBjb25zdCBwZiA9IGZ1bmN0aW9uKHAsIGYpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzLnB1c2goZiAqIHBbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICAvLyBhZGQgcG9pbnRzIGFzIHZlY3RvcnNcbiAgY29uc3QgcHAgPSBmdW5jdGlvbihwMSwgcDIpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgTWF0aC5taW4ocDEubGVuZ3RoLCBwMi5sZW5ndGgpOyBpKyspIHtcbiAgICAgIHJlcy5wdXNoKHAxW2ldICsgcDJbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9O1xuICBcbiAgLy8gc2V0IG9yaWdpbmFsIGNvZWZmaWNpZW50czogYltpXVswXSA9IHBvaW50c1tpXVxuICBmb3IobGV0IGkgPSAwOyBpIDw9IG47IGkrKykge1xuICAgIHBvaW50c1tpXSA9ICh0eXBlb2YgcG9pbnRzW2ldID09IFwib2JqZWN0XCIpID8gcG9pbnRzW2ldIDogW3BvaW50c1tpXV07XG4gICAgYi5wdXNoKFsgcG9pbnRzW2ldIF0pO1xuICB9XG5cbiAgLy8gZ2V0IGFsbCBjb2VmZmljaWVudHNcbiAgZm9yKGxldCBqID0gMTsgaiA8PSBuOyBqKyspIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDw9IChuLWopOyBpKyspIHtcbiAgICAgIGJbaV0ucHVzaCggXG4gICAgICAgIHBwKFxuICAgICAgICAgIHBmKGJbaV1bai0xXSwgdDEpLFxuICAgICAgICAgIHBmKGJbaSsxXVtqLTFdLCB0MClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLy8gc2V0IHJlc3VsdDogcmVzMSAmIHJlczJcbiAgZm9yKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICByZXMxLnB1c2goYlswXVtqXSk7XG4gICAgcmVzMi5wdXNoKGJbal1bbi1qXSk7XG4gIH1cbiAgXG4gIHJldHVybiBbcmVzMSwgcmVzMl07XG59O1xuXG4vKipcbiAqIENvbmNhdGVuYXRlcyBjb21tYW5kcyBpbiBhIHN0cmluZyBhbmQgZW5zdXJlcyB0aGF0IGVhY2hcbiAqIHZhbHVlIGZyb20gZWFjaCBjb21tYW5kIGlzIHByaW50ZWQgaW4gdGhlIHJpZ2h0IG9yZGVyXG4gKiBAcGFyYW0ge2FycmF5fSBjbWRzIEFycmF5IG9mIHN2ZyBjb21tYW5kc1xuICogQHJldHVybnMge3N0cmluZ30gU3RyaW5nIGNvbnRhaW5pbmcgYWxsIGNvbW1hbmRzIGZvcm1hdGVkIHJlYWR5IGZvciB0aGUgJ2QnIEF0dHJpYnV0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gY29tbWFuZHNUb1N2Z1BhdGgoY21kcykge1xuICAvLyB3aGVuIHdyaXRpbmcgdGhlIGNvbW1hbmRzIGJhY2ssIHRoZSByZWxldmFudCB2YWx1ZXMgc2hvdWxkIGJlIHdyaXR0ZW4gaW4gdGhpcyBvcmRlclxuICBjb25zdCB2YWx1ZXNPcmRlciA9IFtcbiAgICAncmFkaXVzWCcsXG4gICAgJ3JhZGl1c1knLFxuICAgICdyb3RhdGlvbicsXG4gICAgJ2xhcmdlQXJjJyxcbiAgICAnc3dlZXAnLFxuICAgICd4MScsXG4gICAgJ3kxJyxcbiAgICAneDInLFxuICAgICd5MicsXG4gICAgJ3gnLFxuICAgICd5JyxcbiAgXTtcblxuICByZXR1cm4gY21kc1xuICAgIC5tYXAoKGNtZCkgPT4ge1xuICAgICAgLy8gZGVmYXVsdHMgZm9yIGVtcHR5IHN0cmluZywgc28gWiB3aWxsIG91dHB1dCBubyB2YWx1ZXNcbiAgICAgIGxldCBkID0gJyc7XG4gICAgICAvLyBmaWx0ZXIgYW55IGNvbW1hbmQgdGhhdCdzIG5vdCBaXG4gICAgICBpZiAoY21kLm1hcmtlciAhPT0gJ1onKSB7XG4gICAgICAgIC8vIGdldCBhbGwgdmFsdWVzIGZyb20gY3VycmVudCBjb21tYW5kXG4gICAgICAgIGNvbnN0IGNtZEtleXMgPSBPYmplY3Qua2V5cyhjbWQudmFsdWVzKTtcbiAgICAgICAgLy8gZmlsdGVyIHRoZSB2YWx1ZXNPcmRlciBhcnJheSBmb3Igb25seSB0aGUgdmFsdWVzIHRoYXQgYXBwZWFyIGluIHRoZSBjdXJyZW50IGNvbW1hbmQuXG4gICAgICAgIC8vIFdlIGRvIHRoaXMgYmVjYXVzZSB2YWx1ZXNPcmRlciBndWFyYW50ZWVzIHRoYXQgdGhlIHJlbGV2YW50IHZhbHVlcyB3aWxsIGJlIGluIHRoZSByaWdodCBvcmRlclxuICAgICAgICBkID0gdmFsdWVzT3JkZXIuZmlsdGVyKHYgPT4gY21kS2V5cy5pbmRleE9mKHYpICE9PSAtMSlcbiAgICAgICAgICAvLyByZXBsYWNlIHRoZSBrZXkgd2l0aCBpdCdzIHZhbHVlXG4gICAgICAgICAgLm1hcChrZXkgPT4gY21kLnZhbHVlc1trZXldKVxuICAgICAgICAgIC8vIGFuZCBzdHJpbmdpZnkgZXZlcnl0aGluZyB0b2dldGhlciB3aXRoIGEgY29tbWEgaW5iZXR3ZWVuIHZhbHVlc1xuICAgICAgICAgIC5qb2luKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYCR7Y21kLm1hcmtlcn0ke2R9YDtcbiAgICB9KVxuICAgIC5qb2luKCcnKVxuICAgIC50cmltKCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9