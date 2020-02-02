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
}(); // Component responsible for controlling the radius


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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    new SVGPreview("svg", "path");
  });
} else {
  new SVGPreview("svg", "path");
}

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
    if (e.marker === "M") {
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
      console.log(i, angle * (180 / Math.PI));
      var offset = o.offset;
      var sweepFlag = o.sweepFlag;

      switch (el.marker) {
        case "M": // moveTo x,y

        case "L":
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

          if (next.marker === "L" || next.marker === "M") {
            newCmds.push({
              marker: "A",
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

        case "C": // cubic beziér: x1 y1, x2 y2, x y

        case "S": // short beziér: x2 y2, x y

        case "Q": // quadratic beziér: x1 y1, x y

        case "T": // short quadratic beziér: x y

        case "A": // arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y

        case "Z":
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

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby9tYWluLmpzIiwid2VicGFjazovLy8uL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvdXRpbHMuanMiXSwibmFtZXMiOlsic3ZnbnMiLCJTVkdQcmV2aWV3Iiwic3RhZ2VTZWxlY3RvciIsInBhdGhTZWxlY3RvciIsImNvbW1hbmRzIiwiZG90cyIsImRvdFJhZGl1cyIsIm1vdXNlRG93bk9mZnNldCIsIngiLCJ5IiwiYWN0aXZlRG90SW5kZXgiLCJyYWRpdXMiLCJzdGFnZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0YWdlT2Zmc2V0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicGF0aCIsInJhbmdlU2xpZGVyIiwic2V0QXR0cmlidXRlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiY2xvbmUiLCJjbG9uZU5vZGUiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJSYW5nZVNsaWRlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldnQiLCJkZXRhaWwiLCJ1cGRhdGVQYXRoIiwiZG90TW91c2VEb3duIiwiYmluZCIsInN0YWdlTW91c2VNb3ZlIiwic3RhZ2VNb3VzZVVwIiwic3RhZ2VDbGljayIsImQiLCJyZWR1Y2UiLCJhY2MiLCJjdXJyIiwibWFya2VyIiwidmFsdWVzIiwickNvcm5lcnMiLCJyb3VuZENvcm5lcnMiLCJkb3QiLCJ0YXJnZXQiLCJpbmRleE9mIiwiY2xpZW50WCIsImxlZnQiLCJnZXRBdHRyaWJ1dGVOUyIsImNsaWVudFkiLCJ0b3AiLCJwYXRoQ21kIiwic2V0QXR0cmlidXRlTlMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY3JlYXRlRWxlbWVudE5TIiwiYXBwZW5kQ2hpbGQiLCJzaGlmdEtleSIsImxlbmd0aCIsInB1c2giLCJuZXdEb3QiLCJjb250YWluZXJTZWxlY3RvciIsIm9wdGlvbnMiLCJkZWZhdWx0cyIsInNpemUiLCJtaW5SYWRpdXMiLCJtYXhSYWRpdXMiLCJzdGFydFJhZGl1cyIsImhhbmRsZVJhZGl1cyIsInN0ciIsImNvbnRhaW5lciIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlIiwiZG9jdW1lbnRGcmFnbWVudCIsImNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCIsImNpcmNsZSIsImxpbmUiLCJoYW5kbGUiLCJkb2NNb3VzZU1vdmUiLCJkb2NNb3VzZVVwIiwiaGFuZGxlTW91c2VEb3duIiwicDEiLCJwMiIsImRpc3RhbmNlIiwiTWF0aCIsIm1pbiIsImdldERpc3RhbmNlIiwiYW5nbGUiLCJnZXRBbmdsZSIsIm1heFgiLCJzaW4iLCJtYXhZIiwiY29zIiwiZXZlbnQiLCJDdXN0b21FdmVudCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudFRhcmdldCIsInJlYWR5U3RhdGUiLCJwYXJzZVBhdGgiLCJtYXJrZXJSZWdFeCIsImRpZ2l0UmVnRXgiLCJtYXRjaEFsbCIsIm1hcCIsIm1hdGNoIiwiaW5kZXgiLCJyZWR1Y2VSaWdodCIsImN1ciIsImNodW5rIiwic3Vic3RyaW5nIiwiY29uY2F0Iiwic3Vic3RyIiwicmV2ZXJzZSIsImZsYXRNYXAiLCJjbWQiLCJ2YWxzIiwicGFyc2VGbG9hdCIsIm5ld0NvbW1hbmRzIiwiY29udmVydFRvQWJzb2x1dGUiLCJyb3VuZENvbW1hbmRzIiwiY21kcyIsInIiLCJyb3VuZCIsInN1YnBhdGhzIiwibmV3Q21kcyIsImZvckVhY2giLCJlbCIsInJvdW5kVmFsdWVzIiwiZSIsImkiLCJhIiwic3ViUGF0aENtZHMiLCJtYXJrT3ZlcmxhcHBlZCIsInJldmVyc2VNYXJrT3ZlcmxhcHBlZCIsImZpbHRlciIsIm92ZXJsYXAiLCJhcnIiLCJsYXJnZUFyY0ZsYWciLCJwcmV2IiwiZ2V0UHJldmlvdXNOb1oiLCJuZXh0IiwiZ2V0TmV4dE5vWiIsImFuZ2xlUHJ2IiwiYW5nbGVOeHQiLCJkZWdyZWVzIiwiUEkiLCJzaG9ydGVzdCIsInNob3J0ZXN0U2lkZSIsImFicyIsImdldFRhbmdlbnROb0h5cCIsIm8iLCJnZXRPZmZzZXQiLCJjb25zb2xlIiwibG9nIiwib2Zmc2V0Iiwic3dlZXBGbGFnIiwicHJldlBvaW50IiwiZ2V0T3Bwb3NpdGVMZW5ndGgiLCJnZXRBZGphY2VudExlbmd0aCIsIm5leHRQb2ludCIsInRvRml4ZWQiLCJyYWRpdXNYIiwicmFkaXVzWSIsInJvdGF0aW9uIiwibGFyZ2VBcmMiLCJzd2VlcCIsImNvbW1hbmRzVG9TdmdQYXRoIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsImNvdW50ZXIiLCJwcmV2aW91cyIsIm1vZCIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJ4MSIsInkxIiwieDIiLCJ5MiIsInJlYyIsIm1CZWZvcmUiLCJtIiwiYXJyYXkiLCJldmVyeSIsIm54dFNpZGUiLCJwcnZTaWRlIiwiYXRhbjIiLCJ4RGlmZiIsInlEaWZmIiwic3FydCIsInBvdyIsImhpcCIsImdldFRhbmdlbnRMZW5ndGgiLCJvcHBvc2l0ZSIsInRhbiIsIkluZmluaXR5IiwiYWRqYWNlbnQiLCJic3BsaXQiLCJwb2ludHMiLCJ0MCIsIm4iLCJiIiwicmVzMSIsInJlczIiLCJ0MSIsInBmIiwicCIsImYiLCJyZXMiLCJwcCIsImoiLCJ2YWx1ZXNPcmRlciIsImNtZEtleXMiLCJ2Iiwiam9pbiIsInRyaW0iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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QUE1QjtBQUFBLE9BRFAsRUFFRjtBQUZFLE9BR0Q5RyxHQUhDLENBR0csVUFBQWtFLEdBQUc7QUFBQSxlQUFJdkQsR0FBRyxDQUFDekUsTUFBSixDQUFXZ0ksR0FBWCxDQUFKO0FBQUEsT0FITixFQUlGO0FBSkUsT0FLRDZDLElBTEMsRUFBSjtBQU1EOztBQUNELHFCQUFVcEcsR0FBRyxDQUFDMUUsTUFBZCxTQUF1QkosQ0FBdkI7QUFDRCxHQWxCSSxFQW1CSmtMLElBbkJJLENBbUJDLEVBbkJELEVBb0JKQyxJQXBCSSxFQUFQO0FBcUJELEMiLCJmaWxlIjoic3ZnLXJvdW5kLWNvcm5lcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2RlbW8vbWFpbi5qc1wiKTtcbiIsImltcG9ydCB7IHJvdW5kQ29ybmVycywgcGFyc2VQYXRoIH0gZnJvbSBcIi4uL2xpYlwiO1xuaW1wb3J0IHtcbiAgZ2V0RGlzdGFuY2UsXG4gIGdldEFuZ2xlLFxuICBnZXRBZGphY2VudExlbmd0aCxcbiAgZ2V0T3Bwb3NpdGVMZW5ndGhcbn0gZnJvbSBcIi4uL2xpYi91dGlsc1wiO1xuXG5jb25zdCBzdmducyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcblxuY2xhc3MgU1ZHUHJldmlldyB7XG4gIGNvbnN0cnVjdG9yKHN0YWdlU2VsZWN0b3IsIHBhdGhTZWxlY3Rvcikge1xuICAgIHRoaXMuY29tbWFuZHMgPSBbXTtcbiAgICB0aGlzLmRvdHMgPSBbXTtcbiAgICB0aGlzLmRvdFJhZGl1cyA9IDU7XG4gICAgdGhpcy5tb3VzZURvd25PZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLmFjdGl2ZURvdEluZGV4O1xuICAgIHRoaXMucmFkaXVzID0gMjA7XG5cbiAgICB0aGlzLnN0YWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzdGFnZVNlbGVjdG9yKTtcbiAgICB0aGlzLnN0YWdlT2Zmc2V0ID0gdGhpcy5zdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB0aGlzLnBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhdGhTZWxlY3Rvcik7XG4gICAgdGhpcy5yYW5nZVNsaWRlciA9IHRoaXMucmFuZ2VTbGlkZXI7XG5cbiAgICAvLyBTZXQgdGhlIHN2ZyBzdGFnZSB0byBiZSB0aGUgc2FtZSBzaXplIG9mIHRoZSB3aW5kb3dcbiAgICB0aGlzLnN0YWdlLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgICB0aGlzLnN0YWdlLnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgLy8gY3JlYXRlIGNsb25lIHBhdGggdG8gc2hvdyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIG9yaWdpbmFsXG4gICAgLy8gYW5kIHBhdGggd2l0aCByb3VuZGVkIGNvcm5lcnMuXG4gICAgdGhpcy5jbG9uZSA9IHRoaXMucGF0aC5jbG9uZU5vZGUoKTtcbiAgICB0aGlzLmNsb25lLmNsYXNzTGlzdC5hZGQoXCJvcmlnaW5hbFwiKTtcbiAgICB0aGlzLnBhdGguaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgdGhpcy5jbG9uZSk7XG5cbiAgICB0aGlzLnJhbmdlU2xpZGVyID0gbmV3IFJhbmdlU2xpZGVyKFwiLmNvbnRyb2xsZXJcIiwge30pO1xuICAgIHRoaXMucmFuZ2VTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcihcInVwZGF0ZVwiLCBldnQgPT4ge1xuICAgICAgdGhpcy5yYWRpdXMgPSBldnQuZGV0YWlsO1xuICAgICAgdGhpcy51cGRhdGVQYXRoKCk7XG4gICAgfSk7XG5cbiAgICAvLyBiaW5kIGV2ZW50IGxpc3RlbmVycyB0byB0aGlzIGNsYXNzIGNvbnRleHRcbiAgICB0aGlzLmRvdE1vdXNlRG93biA9IHRoaXMuZG90TW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFnZU1vdXNlTW92ZSA9IHRoaXMuc3RhZ2VNb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLnN0YWdlTW91c2VVcCA9IHRoaXMuc3RhZ2VNb3VzZVVwLmJpbmQodGhpcyk7XG4gICAgdGhpcy5zdGFnZUNsaWNrID0gdGhpcy5zdGFnZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnN0YWdlQ2xpY2spO1xuICB9XG5cbiAgdXBkYXRlUGF0aCgpIHtcbiAgICAvLyBidWlsZCB0aGUgc3RyaW5nXG4gICAgY29uc3QgZCA9XG4gICAgICB0aGlzLmNvbW1hbmRzLnJlZHVjZShcbiAgICAgICAgKGFjYywgY3VycikgPT5cbiAgICAgICAgICAoYWNjICs9IGAke2N1cnIubWFya2VyfSR7Y3Vyci52YWx1ZXMueH0sJHtjdXJyLnZhbHVlcy55fWApLFxuICAgICAgICBcIlwiXG4gICAgICApICsgXCJaXCI7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHBhdGgnc1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuICAgIHRoaXMucGF0aC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW9yaWdpbmFsLWRcIiwgZCk7XG4gICAgdGhpcy5jbG9uZS5zZXRBdHRyaWJ1dGUoXCJkXCIsIGQpO1xuXG4gICAgLy8gcm91bmQgdGhlIGNvcm5lcnNcbiAgICBjb25zdCByQ29ybmVycyA9IHJvdW5kQ29ybmVycyhkLCB0aGlzLnJhZGl1cyk7XG4gICAgdGhpcy5wYXRoLnNldEF0dHJpYnV0ZShcImRcIiwgckNvcm5lcnMucGF0aCk7XG4gIH1cblxuICBkb3RNb3VzZURvd24oZXZ0KSB7XG4gICAgY29uc3QgZG90ID0gZXZ0LnRhcmdldDtcbiAgICB0aGlzLmFjdGl2ZURvdEluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoZG90KTtcbiAgICB0aGlzLm1vdXNlRG93bk9mZnNldCA9IHtcbiAgICAgIHg6XG4gICAgICAgIGV2dC5jbGllbnRYIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC5sZWZ0ICtcbiAgICAgICAgdGhpcy5kb3RSYWRpdXMgLVxuICAgICAgICBkb3QuZ2V0QXR0cmlidXRlTlMobnVsbCwgXCJjeFwiKSxcbiAgICAgIHk6XG4gICAgICAgIGV2dC5jbGllbnRZIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC50b3AgK1xuICAgICAgICB0aGlzLmRvdFJhZGl1cyAtXG4gICAgICAgIGRvdC5nZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN5XCIpXG4gICAgfTtcblxuICAgIHRoaXMuc3RhZ2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLnN0YWdlTW91c2VNb3ZlKTtcbiAgICB0aGlzLnN0YWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuc3RhZ2VNb3VzZVVwKTtcbiAgfVxuXG4gIHN0YWdlTW91c2VNb3ZlKGV2dCkge1xuICAgIGNvbnN0IGRvdCA9IHRoaXMuZG90c1t0aGlzLmFjdGl2ZURvdEluZGV4XTtcbiAgICBjb25zdCBwYXRoQ21kID0gdGhpcy5jb21tYW5kc1t0aGlzLmFjdGl2ZURvdEluZGV4XS52YWx1ZXM7XG4gICAgcGF0aENtZC54ID0gZXZ0LmNsaWVudFggLSB0aGlzLm1vdXNlRG93bk9mZnNldC54O1xuICAgIHBhdGhDbWQueSA9IGV2dC5jbGllbnRZIC0gdGhpcy5tb3VzZURvd25PZmZzZXQueTtcbiAgICB0aGlzLnVwZGF0ZVBhdGgoKTtcblxuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN4XCIsIHBhdGhDbWQueCk7XG4gICAgZG90LnNldEF0dHJpYnV0ZU5TKG51bGwsIFwiY3lcIiwgcGF0aENtZC55KTtcbiAgfVxuXG4gIHN0YWdlTW91c2VVcChldnQpIHtcbiAgICAvLyBDbGVhbnVwXG4gICAgdGhpcy5zdGFnZS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuc3RhZ2VNb3VzZU1vdmUpO1xuICAgIHRoaXMuc3RhZ2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5zdGFnZU1vdXNlVXApO1xuICB9XG5cbiAgbmV3RG90KHgsIHkpIHtcbiAgICBjb25zdCBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnbnMsIFwiY2lyY2xlXCIpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN4XCIsIHgpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN5XCIsIHkpO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInJcIiwgdGhpcy5kb3RSYWRpdXMpO1xuICAgIHRoaXMuc3RhZ2UuYXBwZW5kQ2hpbGQoZG90KTtcblxuICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMuZG90TW91c2VEb3duLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIGRvdDtcbiAgfVxuXG4gIHN0YWdlQ2xpY2soZXZ0KSB7XG4gICAgLy8gaWYgZHJhZ2dpbmdcbiAgICBpZiAoZXZ0LnNoaWZ0S2V5KSByZXR1cm47XG5cbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLmNvbW1hbmRzLmxlbmd0aCA/IFwiTFwiIDogXCJNXCI7XG4gICAgY29uc3QgeCA9IGV2dC5jbGllbnRYIC0gdGhpcy5zdGFnZU9mZnNldC5sZWZ0O1xuICAgIGNvbnN0IHkgPSBldnQuY2xpZW50WSAtIHRoaXMuc3RhZ2VPZmZzZXQudG9wO1xuICAgIHRoaXMuY29tbWFuZHMucHVzaCh7IG1hcmtlciwgdmFsdWVzOiB7IHgsIHkgfSB9KTtcbiAgICB0aGlzLmRvdHMucHVzaCh0aGlzLm5ld0RvdCh4LCB5KSk7XG4gICAgdGhpcy51cGRhdGVQYXRoKCk7XG4gIH1cbn1cblxuLy8gQ29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjb250cm9sbGluZyB0aGUgcmFkaXVzXG5jbGFzcyBSYW5nZVNsaWRlciBleHRlbmRzIEV2ZW50VGFyZ2V0IHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyU2VsZWN0b3IsIG9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgc2l6ZTogMjUwLFxuICAgICAgbWluUmFkaXVzOiAwLFxuICAgICAgbWF4UmFkaXVzOiA3MCxcbiAgICAgIHN0YXJ0UmFkaXVzOiAyMCxcbiAgICAgIGhhbmRsZVJhZGl1czogNVxuICAgIH07XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7IC4uLmRlZmF1bHRzLCAuLi5vcHRpb25zIH07XG4gICAgdGhpcy5tb3VzZURvd25PZmZzZXQgPSB7IHg6IDAsIHk6IDAgfTtcblxuICAgIGNvbnN0IHN0ciA9IGBcbiAgICAgIDxzdmdcbiAgICAgICAgY2xhc3M9XCJyYWRpdXMtY29udHJvbFwiXG4gICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICB4bWxuczp4bGluaz1cImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmtcIlxuICAgICAgICB3aWR0aD1cIiR7dGhpcy5vcHRpb25zLnNpemV9XCJcbiAgICAgICAgaGVpZ2h0PVwiJHt0aGlzLm9wdGlvbnMuc2l6ZX1cIlxuICAgICAgICB2aWV3UG9ydD1cIjAgMCAke3RoaXMub3B0aW9ucy5zaXplfSAke3RoaXMub3B0aW9ucy5zaXplfVwiXG4gICAgICA+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjeD1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyfVwiXG4gICAgICAgICAgY3k9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIHI9XCIke3RoaXMub3B0aW9ucy5zdGFydFJhZGl1c31cIlxuICAgICAgICAgIGNsYXNzPVwicmFkaXVzLWNvbnRyb2xfX2NpcmNsZVwiIC8+XG4gICAgICAgIDxsaW5lXG4gICAgICAgICAgeDE9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIHkxPVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICB4Mj1cIiR7dGhpcy5vcHRpb25zLnNpemUgLyAyICsgdGhpcy5vcHRpb25zLnN0YXJ0UmFkaXVzfVwiXG4gICAgICAgICAgeTI9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMn1cIlxuICAgICAgICAgIGNsYXNzPVwicmFkaXVzLWNvbnRyb2xfX2xpbmVcIlxuICAgICAgICAvPlxuICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgY3g9XCIke3RoaXMub3B0aW9ucy5zaXplIC8gMiArIHRoaXMub3B0aW9ucy5zdGFydFJhZGl1c31cIlxuICAgICAgICAgIGN5PVwiJHt0aGlzLm9wdGlvbnMuc2l6ZSAvIDJ9XCJcbiAgICAgICAgICByPVwiJHt0aGlzLm9wdGlvbnMuaGFuZGxlUmFkaXVzfVwiXG4gICAgICAgICAgY2xhc3M9XCJyYWRpdXMtY29udHJvbF9faGFuZGxlXCIgLz5cbiAgICAgIDwvc3ZnPlxuICAgIGA7XG5cbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgLy8gTWFrZSB0aGUgcGFyZW50IG9mIHRoZSBmaXJzdCBkaXYgaW4gdGhlIGRvY3VtZW50IGJlY29tZXMgdGhlIGNvbnRleHQgbm9kZVxuICAgIHJhbmdlLnNlbGVjdE5vZGUoY29udGFpbmVyKTtcbiAgICB2YXIgZG9jdW1lbnRGcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudEZyYWdtZW50KTtcblxuICAgIC8vIEdldCByZWZlcmVuY2VzIHRvIHRoZSBwYXJ0cyB3ZSBuZWVkXG4gICAgdGhpcy5zdGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFkaXVzLWNvbnRyb2xcIik7XG4gICAgdGhpcy5jaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhZGl1cy1jb250cm9sX19jaXJjbGVcIik7XG4gICAgdGhpcy5saW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYWRpdXMtY29udHJvbF9fbGluZVwiKTtcbiAgICB0aGlzLmhhbmRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFkaXVzLWNvbnRyb2xfX2hhbmRsZVwiKTtcblxuICAgIHRoaXMuc3RhZ2VPZmZzZXQgPSB0aGlzLnN0YWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBhbmQgYmluZCB0aGUgY2FsbGJhY2tzIHRvIHRoZSBjbGFzcyBjb250ZXh0XG4gICAgdGhpcy5kb2NNb3VzZU1vdmUgPSB0aGlzLmRvY01vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMuZG9jTW91c2VVcCA9IHRoaXMuZG9jTW91c2VVcC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuaGFuZGxlTW91c2VEb3duID0gdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKTtcblxuICAgIHRoaXMuaGFuZGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5oYW5kbGVNb3VzZURvd24pO1xuICB9XG5cbiAgaGFuZGxlTW91c2VEb3duKGV2dCkge1xuICAgIC8vIHRoZSB4L3kgZGlzdGFuY2UgZnJvbSB0aGUgcG9pbnRlciB0byB0aGUgY2VudGVyIG9mIHRoZSBoYW5kbGVcbiAgICB0aGlzLm1vdXNlRG93bk9mZnNldCA9IHtcbiAgICAgIHg6XG4gICAgICAgIGV2dC5jbGllbnRYIC1cbiAgICAgICAgdGhpcy5zdGFnZU9mZnNldC54ICtcbiAgICAgICAgdGhpcy5vcHRpb25zLmhhbmRsZVJhZGl1cyAtXG4gICAgICAgIHRoaXMuaGFuZGxlLmdldEF0dHJpYnV0ZU5TKG51bGwsIFwiY3hcIiksXG4gICAgICB5OlxuICAgICAgICBldnQuY2xpZW50WSAtXG4gICAgICAgIHRoaXMuc3RhZ2VPZmZzZXQueSArXG4gICAgICAgIHRoaXMub3B0aW9ucy5oYW5kbGVSYWRpdXMgLVxuICAgICAgICB0aGlzLmhhbmRsZS5nZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN5XCIpXG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5kb2NNb3VzZU1vdmUpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuZG9jTW91c2VVcCk7XG4gIH1cblxuICBkb2NNb3VzZU1vdmUoZXZ0KSB7XG4gICAgY29uc3QgeCA9XG4gICAgICBldnQuY2xpZW50WCAtXG4gICAgICB0aGlzLnN0YWdlT2Zmc2V0LnggK1xuICAgICAgdGhpcy5vcHRpb25zLmhhbmRsZVJhZGl1cyAtXG4gICAgICB0aGlzLm1vdXNlRG93bk9mZnNldC54O1xuICAgIGNvbnN0IHkgPVxuICAgICAgZXZ0LmNsaWVudFkgLVxuICAgICAgdGhpcy5zdGFnZU9mZnNldC55ICtcbiAgICAgIHRoaXMub3B0aW9ucy5oYW5kbGVSYWRpdXMgLVxuICAgICAgdGhpcy5tb3VzZURvd25PZmZzZXQueTtcblxuICAgIGNvbnN0IHAxID0geyB4LCB5IH07XG4gICAgY29uc3QgcDIgPSB7IHg6IHRoaXMub3B0aW9ucy5zaXplIC8gMiwgeTogdGhpcy5vcHRpb25zLnNpemUgLyAyIH07XG4gICAgLy8gZ2V0IGRpc3RhbmNlIGZyb20gY2VudGVyIG9mIHN0YWdlXG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1pbihnZXREaXN0YW5jZShwMSwgcDIpLCB0aGlzLm9wdGlvbnMubWF4UmFkaXVzKTtcblxuICAgIGNvbnN0IGFuZ2xlID0gZ2V0QW5nbGUocDEsIHAyKTtcbiAgICAvLyBUaGUgaGFuZGxlIHNob3VsZCBub3QgcGFzcyB0aGUgbWF4aW1hbCByYWRpdXMgZGVmaW5lZCBpbiBvcHRpb25zXG4gICAgY29uc3QgbWF4WCA9IC1NYXRoLnNpbihhbmdsZSkgKiBkaXN0YW5jZSArIHRoaXMub3B0aW9ucy5zaXplIC8gMjtcbiAgICBjb25zdCBtYXhZID0gLU1hdGguY29zKGFuZ2xlKSAqIGRpc3RhbmNlICsgdGhpcy5vcHRpb25zLnNpemUgLyAyO1xuXG4gICAgdGhpcy5oYW5kbGUuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJjeFwiLCBtYXhYKTtcbiAgICB0aGlzLmhhbmRsZS5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcImN5XCIsIG1heFkpO1xuXG4gICAgdGhpcy5jaXJjbGUuc2V0QXR0cmlidXRlKFwiclwiLCBkaXN0YW5jZSk7XG4gICAgdGhpcy5saW5lLnNldEF0dHJpYnV0ZShcIngyXCIsIG1heFgpO1xuICAgIHRoaXMubGluZS5zZXRBdHRyaWJ1dGUoXCJ5MlwiLCBtYXhZKTtcblxuICAgIC8vIERpc3BhdGNoIGN1c3RvbSBFdmVudFxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwidXBkYXRlXCIsIHsgZGV0YWlsOiBkaXN0YW5jZSB9KTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgZG9jTW91c2VVcCgpIHtcbiAgICAvLyBDbGVhbnVwXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLmRvY01vdXNlTW92ZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5kb2NNb3VzZVVwKTtcbiAgfVxufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJsb2FkaW5nXCIpIHtcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIG5ldyBTVkdQcmV2aWV3KFwic3ZnXCIsIFwicGF0aFwiKTtcbiAgfSk7XG59IGVsc2Uge1xuICBuZXcgU1ZHUHJldmlldyhcInN2Z1wiLCBcInBhdGhcIik7XG59XG4iLCJpbXBvcnQge1xuICBnZXRBbmdsZSxcbiAgZ2V0T3Bwb3NpdGVMZW5ndGgsXG4gIGdldEFkamFjZW50TGVuZ3RoLFxuICBjb21tYW5kc1RvU3ZnUGF0aCxcbiAgbWFya092ZXJsYXBwZWQsXG4gIHNob3J0ZXN0U2lkZSxcbiAgcm91bmRWYWx1ZXMsXG4gIGdldFByZXZpb3VzTm9aLFxuICBnZXROZXh0Tm9aLFxuICByZXZlcnNlTWFya092ZXJsYXBwZWQsXG4gIGJzcGxpdCxcbiAgZ2V0RGlzdGFuY2UsXG4gIGdldE9mZnNldCxcbiAgZ2V0VGFuZ2VudE5vSHlwLFxuICBuZXdDb21tYW5kcyxcbiAgY29udmVydFRvQWJzb2x1dGVcbn0gZnJvbSBcIi4vdXRpbHMuanNcIjtcblxuLyoqXG4gKiBQYXJzZXMgdGhlIGdpdmVuIGNvbW1hbmQgc3RyaW5nIGFuZCBnZW5lcmF0ZXMgYW4gYXJyYXkgb2YgcGFyc2VkIGNvbW1hbmRzLlxuICogVGhpcyBmdW5jdGlvbiBub3JtYWxpc2VzIGFsbCByZWxhdGl2ZSBjb21tYW5kcyBpbnRvIGFic29sdXRlIGNvbW1hbmRzIGFuZFxuICogdHJhbnNmb3JtcyBoLCBILCB2LCBWIHRvIEwgY29tbWFuZHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgUmF3IHN0cmluZyBmcm9tICdkJyBBdHRyaWJ1dGVcbiAqIEByZXR1cm5zIHthcnJheX0gQXJyYXkgb2Ygbm9ybWFsaXNlZCBjb21tYW5kc1xuICovXG5mdW5jdGlvbiBwYXJzZVBhdGgoc3RyKSB7XG4gIGNvbnN0IG1hcmtlclJlZ0V4ID0gL1tNbUxsU3NRcUxsSGhWdkNjU3NRcVR0QWFael0vZztcbiAgY29uc3QgZGlnaXRSZWdFeCA9IC8tP1swLTldKlxcLj9cXGQrL2c7XG5cbiAgcmV0dXJuIFsuLi5zdHIubWF0Y2hBbGwobWFya2VyUmVnRXgpXVxuICAgIC5tYXAobWF0Y2ggPT4ge1xuICAgICAgcmV0dXJuIHsgbWFya2VyOiBtYXRjaFswXSwgaW5kZXg6IG1hdGNoLmluZGV4IH07XG4gICAgfSlcbiAgICAucmVkdWNlUmlnaHQoKGFjYywgY3VyKSA9PiB7XG4gICAgICBjb25zdCBjaHVuayA9IHN0ci5zdWJzdHJpbmcoXG4gICAgICAgIGN1ci5pbmRleCxcbiAgICAgICAgYWNjLmxlbmd0aCA/IGFjY1thY2MubGVuZ3RoIC0gMV0uaW5kZXggOiBzdHIubGVuZ3RoXG4gICAgICApO1xuICAgICAgcmV0dXJuIGFjYy5jb25jYXQoW1xuICAgICAgICB7XG4gICAgICAgICAgbWFya2VyOiBjdXIubWFya2VyLFxuICAgICAgICAgIGluZGV4OiBjdXIuaW5kZXgsXG4gICAgICAgICAgY2h1bms6IGNodW5rLmxlbmd0aCA+IDAgPyBjaHVuay5zdWJzdHIoMSwgY2h1bmsubGVuZ3RoIC0gMSkgOiBjaHVua1xuICAgICAgICB9XG4gICAgICBdKTtcbiAgICB9LCBbXSlcbiAgICAucmV2ZXJzZSgpXG4gICAgLmZsYXRNYXAoY21kID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IGNtZC5jaHVuay5tYXRjaChkaWdpdFJlZ0V4KTtcbiAgICAgIGNvbnN0IHZhbHMgPSB2YWx1ZXMgPyB2YWx1ZXMubWFwKHBhcnNlRmxvYXQpIDogW107XG4gICAgICByZXR1cm4gbmV3Q29tbWFuZHMoY21kLm1hcmtlciwgdmFscyk7XG4gICAgfSlcbiAgICAubWFwKGNvbnZlcnRUb0Fic29sdXRlKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGFuIGFycmF5IG9mIG5vcm1hbGlzZWQgY29tbWFuZHMgYW5kIGluc2VydCBhcmNzIHdoZXJlIGFwcGxpY2FibGUuXG4gKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBhcnJheSBpbiBwbGFjZS5cbiAqIEBwYXJhbSB7YXJyYXl9IF9jbWRzIEFycmF5IHdpdGggY29tbWFuZHMgdG8gYmUgbW9kaWZpZWRcbiAqIEBwYXJhbSB7bnVtYmVyfSByIEV4cGVjdGVkIHJhZGl1cyBvZiB0aGUgYXJjcy5cbiAqIEBwYXJhbSB7bnVtYmVyfSByb3VuZCBOdW1iZXIgb2YgZGVjaW1hbCBkaWdpdHMgdG8gcm91bmQgdmFsdWVzXG4gKiBAcmV0dXJucyB7YXJyYXl9IFNlcXVlbmNlIG9mIGNvbW1hbmRzIGNvbnRhaW5pbmcgYXJjcyBpbiBwbGFjZSBvciBjb3JuZXJzXG4gKi9cbmZ1bmN0aW9uIHJvdW5kQ29tbWFuZHMoY21kcywgciwgcm91bmQpIHtcbiAgbGV0IHN1YnBhdGhzID0gW107XG4gIGxldCBuZXdDbWRzID0gW107XG5cbiAgaWYgKHJvdW5kKSB7XG4gICAgY21kcy5mb3JFYWNoKGVsID0+IHJvdW5kVmFsdWVzKGVsLCByb3VuZCkpO1xuICAgIC8vIHJvdW5kVmFsdWVzKGNtZHMsIHJvdW5kKTtcbiAgfVxuXG4gIGNtZHNcbiAgICAvLyBzcGxpdCBzdWIgcGF0aHNcbiAgICAuZm9yRWFjaCgoZSwgaSwgYSkgPT4ge1xuICAgICAgaWYgKGUubWFya2VyID09PSBcIk1cIikge1xuICAgICAgICBzdWJwYXRocy5wdXNoKFtdKTtcbiAgICAgIH1cbiAgICAgIHN1YnBhdGhzW3N1YnBhdGhzLmxlbmd0aCAtIDFdLnB1c2goZSk7XG4gICAgfSk7XG5cbiAgc3VicGF0aHMuZm9yRWFjaChzdWJQYXRoQ21kcyA9PiB7XG4gICAgc3ViUGF0aENtZHNcbiAgICAgIC8vIFdlIGFyZSBvbmx5IGV4Y2x1ZGluZyBsaW5lVG8gY29tbWFuZHMgdGhhdCBtYXkgYmUgb3ZlcmxhcHBpbmdcbiAgICAgIC5tYXAobWFya092ZXJsYXBwZWQpO1xuXG4gICAgcmV2ZXJzZU1hcmtPdmVybGFwcGVkKHN1YlBhdGhDbWRzLCBzdWJQYXRoQ21kcy5sZW5ndGggLSAxKTtcblxuICAgIHN1YlBhdGhDbWRzXG4gICAgICAuZmlsdGVyKGVsID0+ICFlbC5vdmVybGFwKVxuICAgICAgLm1hcCgoZWwsIGksIGFycikgPT4ge1xuICAgICAgICBjb25zdCBsYXJnZUFyY0ZsYWcgPSAwO1xuICAgICAgICBjb25zdCBwcmV2ID0gZ2V0UHJldmlvdXNOb1ooZWwsIGksIGFycik7XG4gICAgICAgIGNvbnN0IG5leHQgPSBnZXROZXh0Tm9aKGVsLCBpLCBhcnIpO1xuICAgICAgICBjb25zdCBhbmdsZVBydiA9IGdldEFuZ2xlKGVsLnZhbHVlcywgcHJldi52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZU54dCA9IGdldEFuZ2xlKGVsLnZhbHVlcywgbmV4dC52YWx1ZXMpO1xuICAgICAgICBjb25zdCBhbmdsZSA9IGFuZ2xlTnh0IC0gYW5nbGVQcnY7IC8vIHJhZGlhbnNcbiAgICAgICAgY29uc3QgZGVncmVlcyA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xuICAgICAgICAvLyBwcmV2ZW50IGFyYyBjcm9zc2luZyB0aGUgbmV4dCBjb21tYW5kXG4gICAgICAgIGNvbnN0IHNob3J0ZXN0ID0gc2hvcnRlc3RTaWRlKGVsLCBwcmV2LCBuZXh0KTtcbiAgICAgICAgY29uc3QgbWF4UmFkaXVzID0gTWF0aC5hYnMoZ2V0VGFuZ2VudE5vSHlwKGFuZ2xlIC8gMiwgc2hvcnRlc3QgLyAyKSk7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHIsIG1heFJhZGl1cyk7XG5cbiAgICAgICAgY29uc3QgbyA9IGdldE9mZnNldChhbmdsZSwgcmFkaXVzKTtcbiAgICAgICAgY29uc29sZS5sb2coaSwgYW5nbGUgKiAoMTgwIC8gTWF0aC5QSSkpO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBvLm9mZnNldDtcbiAgICAgICAgY29uc3Qgc3dlZXBGbGFnID0gby5zd2VlcEZsYWc7XG5cbiAgICAgICAgc3dpdGNoIChlbC5tYXJrZXIpIHtcbiAgICAgICAgICBjYXNlIFwiTVwiOiAvLyBtb3ZlVG8geCx5XG4gICAgICAgICAgY2FzZSBcIkxcIjogLy8gbGluZVRvIHgseVxuICAgICAgICAgICAgY29uc3QgcHJldlBvaW50ID0gW1xuICAgICAgICAgICAgICBlbC52YWx1ZXMueCArIGdldE9wcG9zaXRlTGVuZ3RoKGFuZ2xlUHJ2LCBvZmZzZXQpLFxuICAgICAgICAgICAgICBlbC52YWx1ZXMueSArIGdldEFkamFjZW50TGVuZ3RoKGFuZ2xlUHJ2LCBvZmZzZXQpXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBjb25zdCBuZXh0UG9pbnQgPSBbXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy54ICsgZ2V0T3Bwb3NpdGVMZW5ndGgoYW5nbGVOeHQsIG9mZnNldCksXG4gICAgICAgICAgICAgIGVsLnZhbHVlcy55ICsgZ2V0QWRqYWNlbnRMZW5ndGgoYW5nbGVOeHQsIG9mZnNldClcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIC8vIHRoZXJlIG9ubHkgbmVlZCBiZSBhIGN1cnZlIGlmIGFuZCBvbmx5IGlmIHRoZSBuZXh0IG1hcmtlciBpcyBhIGNvcm5lclxuICAgICAgICAgICAgbmV3Q21kcy5wdXNoKHtcbiAgICAgICAgICAgICAgbWFya2VyOiBlbC5tYXJrZXIsXG4gICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgIHg6IHBhcnNlRmxvYXQocHJldlBvaW50WzBdLnRvRml4ZWQoMykpLFxuICAgICAgICAgICAgICAgIHk6IHBhcnNlRmxvYXQocHJldlBvaW50WzFdLnRvRml4ZWQoMykpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAobmV4dC5tYXJrZXIgPT09IFwiTFwiIHx8IG5leHQubWFya2VyID09PSBcIk1cIikge1xuICAgICAgICAgICAgICBuZXdDbWRzLnB1c2goe1xuICAgICAgICAgICAgICAgIG1hcmtlcjogXCJBXCIsXG4gICAgICAgICAgICAgICAgcmFkaXVzOiByYWRpdXMsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgICByYWRpdXNYOiByYWRpdXMsXG4gICAgICAgICAgICAgICAgICByYWRpdXNZOiByYWRpdXMsXG4gICAgICAgICAgICAgICAgICByb3RhdGlvbjogZGVncmVlcyxcbiAgICAgICAgICAgICAgICAgIGxhcmdlQXJjOiBsYXJnZUFyY0ZsYWcsXG4gICAgICAgICAgICAgICAgICBzd2VlcDogc3dlZXBGbGFnLFxuICAgICAgICAgICAgICAgICAgeDogcGFyc2VGbG9hdChuZXh0UG9pbnRbMF0udG9GaXhlZCgzKSksXG4gICAgICAgICAgICAgICAgICB5OiBwYXJzZUZsb2F0KG5leHRQb2ludFsxXS50b0ZpeGVkKDMpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAvLyBjYXNlICdIJzogLy8gaG9yaXpvbnRhbFRvIHguIFRyYW5zZm9ybWVkIHRvIEwgaW4gdXRpbHNcbiAgICAgICAgICAvLyBjYXNlICdWJzogLy8gdmVydGljYWxUbyB5LiBUcmFuc2Zvcm1lZCB0byBMIGluIHV0aWxzXG4gICAgICAgICAgY2FzZSBcIkNcIjogLy8gY3ViaWMgYmV6acOpcjogeDEgeTEsIHgyIHkyLCB4IHlcbiAgICAgICAgICBjYXNlIFwiU1wiOiAvLyBzaG9ydCBiZXppw6lyOiB4MiB5MiwgeCB5XG4gICAgICAgICAgY2FzZSBcIlFcIjogLy8gcXVhZHJhdGljIGJlemnDqXI6IHgxIHkxLCB4IHlcbiAgICAgICAgICBjYXNlIFwiVFwiOiAvLyBzaG9ydCBxdWFkcmF0aWMgYmV6acOpcjogeCB5XG4gICAgICAgICAgY2FzZSBcIkFcIjogLy8gYXJjOiByeCByeSB4LWF4aXMtcm90YXRpb24gbGFyZ2UtYXJjLWZsYWcgc3dlZXAtZmxhZyB4IHlcbiAgICAgICAgICBjYXNlIFwiWlwiOiAvLyBjbG9zZSBwYXRoXG4gICAgICAgICAgICBuZXdDbWRzLnB1c2goeyBtYXJrZXI6IGVsLm1hcmtlciwgdmFsdWVzOiBlbC52YWx1ZXMgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aDogY29tbWFuZHNUb1N2Z1BhdGgobmV3Q21kcyksXG4gICAgY29tbWFuZHM6IG5ld0NtZHNcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGEgc2hvcnRoYW5kIGZvciBwYXJzZVBhdGgoKSBhbmQgcm91bmRDb21tYW5kcygpLlxuICogWW91IGdldCB0aGUgZW5kIHJlc3VsdCBpbiBvbmUgZnVuY3Rpb24gY2FsbC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgUmF3IHN0cmluZyB3aXRoIGNvbW1hbmRzIGZyb20gdGhlIHBhdGggZWxlbWVudFxuICogQHBhcmFtIHtudW1iZXJ9IHIgRXhwZWN0ZWQgcmFkaXVzIG9mIHRoZSBhcmNzLlxuICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kIE51bWJlciBvZiBkZWNpbWFsIGRpZ2l0cyB0byByb3VuZCB2YWx1ZXNcbiAqIEByZXR1cm5zIHtzdHJpbmd9IE5ldyBjb21tYW5kcyBzZXF1ZW5jZSB3aXRoIHJvdW5kZWQgY29ybmVyc1xuICovXG5mdW5jdGlvbiByb3VuZENvcm5lcnMoc3RyLCByLCByb3VuZCkge1xuICByZXR1cm4gcm91bmRDb21tYW5kcyhbLi4ucGFyc2VQYXRoKHN0cildLCByLCByb3VuZCk7XG59XG5cbmV4cG9ydCB7IHBhcnNlUGF0aCwgcm91bmRDb21tYW5kcywgcm91bmRDb3JuZXJzIH07XG4iLCIvKipcbiAqIFJvdW5kIHRoZSB2YWx1ZXMgb2YgZWFjaCBjb21tYW5kIHRvIHRoZSBnaXZlbiBudW1iZXIgb2YgZGVjaW1hbHMuXG4gKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBvYmplY3QgaW4gcGxhY2UuXG4gKiBAcGFyYW0ge2FycmF5fSBjbWRzIFNlcXVlbmNlIG9mIGNvbW1hbmRzXG4gKiBAcGFyYW0ge251bWJlcn0gcm91bmQgTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2UgdG8gYmUgcm91bmRlZFxuICogQHJldHVybnMge2FycmF5fSBTZXF1ZW5jZSBvZiBjb21tYW5kcyB3aXRoIHRoZWlyIHZhbHVlcyByb3VuZGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByb3VuZFZhbHVlcyhlbCwgcm91bmQpIHtcbiAgT2JqZWN0LmtleXMoZWwudmFsdWVzKS5mb3JFYWNoKFxuICAgIGtleSA9PlxuICAgICAgKGVsLnZhbHVlc1trZXldID1cbiAgICAgICAgZWwudmFsdWVzW2tleV0gJiYgcGFyc2VGbG9hdChlbC52YWx1ZXNba2V5XS50b0ZpeGVkKHJvdW5kKSkpXG4gICk7XG5cbiAgcmV0dXJuIGVsO1xufVxuXG4vKipcbiAqIEdldCBwcmV2aW91cyBlbGVtZW50IGluIGFycmF5LCB3cmFwcGluZyBpZiBpbmRleCBpcyBvdXQgb2YgYm91bmRzIGFuZCBza2lwcGluZyBpZiB0aGUgY29tbWFuZCBpcyAnWidcbiAqIEBwYXJhbSB7YW55fSBlIENvbW1hbmQgb2JqZWN0XG4gKiBAcGFyYW0ge251bWJlcn0gaSBDdXJyZW50IGluZGV4XG4gKiBAcGFyYW0ge2FycmF5fSBhIEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKiBAcmV0dXJucyB7YW55fSBQcmV2aW91cyBlbGVtZW50IHRoYXQgZG9lc24ndCBoYXZlIGEgJ1onIG1hcmtlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJldmlvdXNOb1ooZSwgaSwgYSkge1xuICBjb25zdCBjb3VudGVyID0gaSAtIDE7XG4gIGNvbnN0IHByZXZpb3VzID0gYVttb2QoY291bnRlciwgYS5sZW5ndGgpXTtcblxuICBpZiAocHJldmlvdXMubWFya2VyICE9PSAnWicpIHtcbiAgICByZXR1cm4gcHJldmlvdXM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGdldFByZXZpb3VzTm9aKGUsIGNvdW50ZXIsIGEpO1xuICB9XG59XG5cbi8qKlxuICogR2V0IG5leHQgZWxlbWVudCBpbiBhcnJheSwgd3JhcHBpbmcgaWYgaW5kZXggaXMgb3V0IG9mIGJvdW5kcyBhbmQgc2tpcHBpbmcgaWYgdGhlIGNvbW1hbmQgaXMgJ1onXG4gKiBAcGFyYW0ge2FueX0gZSBDb21tYW5kIG9iamVjdFxuICogQHBhcmFtIHtudW1iZXJ9IGkgQ3VycmVudCBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYSBBcnJheSBiZWluZyBpdGVyYXRlZFxuICogQHJldHVybnMge2FueX0gTmV4dCBlbGVtZW50IHRoYXQgZG9lc24ndCBoYXZlIGEgJ1onIG1hcmtlclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TmV4dE5vWihlLCBpLCBhKSB7XG4gIGNvbnN0IGNvdW50ZXIgPSBpICsgMTtcbiAgY29uc3QgbmV4dCA9IGFbbW9kKGNvdW50ZXIsIGEubGVuZ3RoKV07XG5cbiAgaWYgKG5leHQubWFya2VyID09PSAnWicpIHtcbiAgICByZXR1cm4gZ2V0TmV4dE5vWihlLCBjb3VudGVyLCBhKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV4dDtcbiAgfVxufVxuXG4vKipcbiAqIEl0ZXJhdGUgdGhyb3VnaCBhbiBhcnJheSBhbmQgY29udmVydCBhbGwgY29tbWFuZHMgdG8gYWJzb2x1dGUuXG4gKiBUaGlzIGZ1bmN0aW9uIHNob3VsZCBiZSB1c2VkIGFzIGFyZ3VtZW50IGluIGEgbWFwKCkgY2FsbC5cbiAqIEBwYXJhbSB7YW55fSBlbCBDdXJyZW50IGVsZW1lbnQgaW4gdGhpcyBpdGVyYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBDdXJyZW50IGl0ZXJhdGlvbiBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYXJyIEFycmF5IGJlaW5nIGl0ZXJhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9BYnNvbHV0ZShlbCwgaW5kZXgsIGFycikge1xuICAvLyBnZXQgcHJldmlvdXMgaXRlbSBvciBjcmVhdGUgb25lIGVtcHR5IGlmIGl0IGRvZXNudCBleGlzdFxuICBsZXQgcHJldiA9IGFycltpbmRleCAtIDFdIHx8IHsgdmFsdWVzOiB7IHg6IDAsIHk6IDAgfSB9O1xuXG4gIC8vIG9ubHkgbmVlZCB0byB0ZXN0IGxvd2VyY2FzZSAocmVsYXRpdmUpIGNvbW1hbmRzXG4gIGlmIChlbC5tYXJrZXIgPT09IGVsLm1hcmtlci50b0xvd2VyQ2FzZSgpKSB7XG4gICAgLy8gY29udmVydCBhbGwgdG8gdXBwZXJjYXNlXG4gICAgZWwubWFya2VyID0gZWwubWFya2VyLnRvVXBwZXJDYXNlKCk7XG4gICAgc3dpdGNoIChlbC5tYXJrZXIpIHtcbiAgICAgIGNhc2UgJ00nOiAvLyBtb3ZlIHRvIHgseVxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0wnOiAvLyBsaW5lIHRvIHgseVxuICAgICAgY2FzZSAnQSc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4XG4gICAgICAgIGVsLm1hcmtlciA9ICdMJztcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1YnOiAvLyB2ZXJ0aWNhbFRvIHlcbiAgICAgICAgZWwubWFya2VyID0gJ0wnO1xuICAgICAgICBlbC52YWx1ZXMueCA9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQyc6IC8vIGJlemnDqXIgY3VydmUgeDEgeTEsIHgyIHkyLCB4IHlcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngxICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBlbC52YWx1ZXMueDIgKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkyICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnUyc6XG4gICAgICAgIGVsLnZhbHVlcy54ICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55ICs9IHByZXYudmFsdWVzLnk7XG4gICAgICAgIGVsLnZhbHVlcy54MiArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueTIgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdRJzpcbiAgICAgICAgZWwudmFsdWVzLnggKz0gcHJldi52YWx1ZXMueDtcbiAgICAgICAgZWwudmFsdWVzLnkgKz0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgZWwudmFsdWVzLngxICs9IHByZXYudmFsdWVzLng7XG4gICAgICAgIGVsLnZhbHVlcy55MSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1QnOlxuICAgICAgICBlbC52YWx1ZXMueCArPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBlbC52YWx1ZXMueSArPSBwcmV2LnZhbHVlcy55O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1onOlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgLy8gSC9WIHVwcGVyY2FzZSBuZWVkIHRvIGJlIGNvbnZlcnRlZCB0b28uIENvbnZlcnQgdG8gTCBhbmQgYWRkIG1pc3NpbmcgdmFsdWVcbiAgfSBlbHNlIGlmIChlbC5tYXJrZXIgPT09IGVsLm1hcmtlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgc3dpdGNoIChlbC5tYXJrZXIpIHtcbiAgICAgIGNhc2UgJ0gnOiAvLyBob3Jpem9udGFsVG8geFxuICAgICAgICBlbC5tYXJrZXIgPSAnTCc7XG4gICAgICAgIGVsLnZhbHVlcy55ID0gcHJldi52YWx1ZXMueTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdWJzogLy8gdmVydGljYWxUbyB5XG4gICAgICAgIGVsLm1hcmtlciA9ICdMJztcbiAgICAgICAgZWwudmFsdWVzLnggPSBwcmV2LnZhbHVlcy54O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvKiBcbiAgICAnWicgY29tbWFuZHMgZG9uJ3QgaGF2ZSBhbnkgY29vcmRpbmF0ZSBidXQgd2UgYXJlIGNsb25pbmcgdGhlXG4gICAgc3RhcnQgY29vcmRpbmF0ZXMgZGVmaW5lZCBieSB0aGlzIHN1YnBhdGggaW5pdGlhbCAnTScgc28gaXQnc1xuICAgIGVhc2llciB0byBkbyB0aGUgc3RpdGNoaW5nIGxhdHRlci5cbiAgKi9cbiAgaWYgKGVsLm1hcmtlciA9PT0gJ1onKSB7XG4gICAgLy8gZmluZCBwcmV2aW91cyAnTScgcmVjdXJzaXZlbHlcbiAgICBmdW5jdGlvbiByZWMoYXJyLCBpKSB7XG4gICAgICBpZiAoYXJyW2ldLm1hcmtlciA9PT0gJ00nKSB7XG4gICAgICAgIHJldHVybiBhcnJbaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVjKGFyciwgaSAtIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsZXQgbUJlZm9yZSA9IHJlYyhhcnIsIGluZGV4KTtcbiAgICBlbC52YWx1ZXMueCA9IG1CZWZvcmUudmFsdWVzLng7XG4gICAgZWwudmFsdWVzLnkgPSBtQmVmb3JlLnZhbHVlcy55O1xuICB9XG5cbiAgcmV0dXJuIGVsO1xufVxuXG4vKipcbiAqIFRha2VzIG9uZSBtYXJrZXIgYW5kIGFuIGFycmF5IG9mIG51bWJlcnMgYW5kIGNyZWF0ZXMgb25lIG9yIG1vcmUgY29tbWFuZCBvYmplY3RzIHdpdGggdGhlIHJpZ2h0XG4gKiBwcm9wZXJ0aWVzIGJhc2VkIG9uIHRoZSBnaXZlbiBtYXJrZXIuIFNvbWUgbWFya2VycyBhbGxvdyBmb3IgbXVsdGlwbGUgY29vcmRpbmF0ZXMgZm9yIG9uZSBzaW5nbGUgY29tbWFuZC5cbiAqIFRoaXMgZnVuY3Rpb24gdGFrZXMgY2FyZSBvZiBzcGxpdHRpbmcgbXVsdGlwbGUgY29vcmRpbmF0ZXMgcGVyIGNvbW1hbmQgYW5kIGdlbmVyYXRpbmcgdGhlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWFya2VyIExldHRlciBvZiB0aGUgY29tbWFuZCBiZWluZyBnZW5lcmF0ZWRcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbHVlcyBBcnJheSBvZiBudW1iZXJzIHRvIGJlIHNwbGl0dGVkIGFuZCBwYXJzZWQgaW50byB0aGUgcmlnaHQgcHJvcGVydGllc1xuICogQHJldHVybnMge2FycmF5fSBBcnJheSBvZiBjb21tYW5kcy4gTW9zdCBvZiB0aGUgdGltZSB3aWxsIGhhdmUgb25seSBvbmUgaXRlbVxuICovXG5leHBvcnQgZnVuY3Rpb24gbmV3Q29tbWFuZHMobWFya2VyLCB2YWx1ZXMpIHtcbiAgY29uc3QgY21kcyA9IFtdO1xuXG4gIHN3aXRjaCAobWFya2VyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICBjYXNlICdNJzogLy8gbW92ZVRvIHgseVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgbGV0IG07XG4gICAgICAgIGlmIChtYXJrZXIgPT09IG1hcmtlci50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgbSA9IGkgPT09IDAgPyAnTScgOiAnTCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbSA9IGkgPT09IDAgPyAnbScgOiAnbCc7XG4gICAgICAgIH1cbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXI6IG0sXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDFdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0wnOiAvLyBsaW5lVG8geCx5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgMV1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnSCc6IC8vIGhvcml6b250YWxUbyB4XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnVic6IC8vIHZlcnRpY2FsVG8geVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogdmFsdWVzW2ldXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0MnOiAvLyBjdWJpYyBiZXppw6lyIGN1cnZlIHgxIHkxLCB4MiB5MiwgeCB5XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gNikge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHgxOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5MTogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICAgIHgyOiB2YWx1ZXNbaSArIDJdLFxuICAgICAgICAgICAgeTI6IHZhbHVlc1tpICsgM10sXG4gICAgICAgICAgICB4OiB2YWx1ZXNbaSArIDRdLFxuICAgICAgICAgICAgeTogdmFsdWVzW2kgKyA1XVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlICdTJzpcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIGNtZHMucHVzaCh7XG4gICAgICAgICAgbWFya2VyLFxuICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgeDI6IHZhbHVlc1tpXSxcbiAgICAgICAgICAgIHkyOiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyAyXSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgM11cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnUSc6XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICBjbWRzLnB1c2goe1xuICAgICAgICAgIG1hcmtlcixcbiAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHgxOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5MTogdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgICAgIHg6IHZhbHVlc1tpICsgMl0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDNdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ1QnOlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB4OiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICB5OiB2YWx1ZXNbaSArIDFdXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ0EnOlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDcpIHtcbiAgICAgICAgY21kcy5wdXNoKHtcbiAgICAgICAgICBtYXJrZXIsXG4gICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICByYWRpdXNYOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICByYWRpdXNZOiB2YWx1ZXNbaSArIDFdLFxuICAgICAgICAgICAgcm90YXRpb246IHZhbHVlc1tpICsgMl0sXG4gICAgICAgICAgICBsYXJnZUFyYzogdmFsdWVzW2kgKyAzXSxcbiAgICAgICAgICAgIHN3ZWVwOiB2YWx1ZXNbaSArIDRdLFxuICAgICAgICAgICAgeDogdmFsdWVzW2kgKyA1XSxcbiAgICAgICAgICAgIHk6IHZhbHVlc1tpICsgNl1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnWic6XG4gICAgICBjbWRzLnB1c2goe1xuICAgICAgICBtYXJrZXIsXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIC8vIHZhbHVlcyB3aWxsIGJlIG92ZXJyaWRlbiBsYXRlciBieSBjb252ZXJ0VG9BYnNvbHV0ZSgpXG4gICAgICAgICAgeDogMCxcbiAgICAgICAgICB5OiAwXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGNtZHM7XG59XG5cbi8qKlxuICogVGFrZXMgYW4gaW5kZXggYW5kIGEgbGVuZ3RoIGFuZCByZXR1cm5zIHRoZSBpbmRleCB3cmFwcGVkIGlmIG91dCBvZiBib3VuZHMuXG4gKiBAcGFyYW0ge251bWJlcn0geCBJbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IG0gTGVuZ3RoXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBJbmRleCBvciB3cmFwcGVkIGluZGV4IGlmIG91dCBib3VuZHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZCh4LCBtKSB7XG4gIHJldHVybiAoKHggJSBtKSArIG0pICUgbTtcbn1cblxuLyoqXG4gKiBDb21wYXJlcyB0aGUgZ2l2ZW4gZWxlbWVudCB3aXRoIGl0J3MgcHJlZGVjZXNzb3IgYW5kIGNoZWNrcyBpZiB0aGVpciBlbmQgcG9zaXRpb24gaXMgdGhlIHNhbWUuXG4gKiBJZiBpdCBpcywgYWRkIGEgYm9vbGVhbiAnb3ZlcmxhcCcgcHJvcGVydHkgdG8gdGhlIGVsZW1lbnQuIFRoaXMgZnVuY3Rpb24gbW9kaWZpZXMgdGhlIGFycmF5IGVsZW1lbnRzIGluIHBsYWNlXG4gKiBAcGFyYW0ge2FueX0gZWwgQ29tbWFuZCBvYmplY3RcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBDdXJyZW50IGl0ZXJhdGlvbiBpbmRleFxuICogQHBhcmFtIHthcnJheX0gYXJyYXkgQXJyYXkgYmVpbmcgaXRlcmF0ZWRcbiAqIEByZXR1cm5zIHthbnl9IENvbW1hbmQgb2JqZWN0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtYXJrT3ZlcmxhcHBlZChlbCwgaW5kZXgsIGFycmF5KSB7XG4gIC8vIFNraXAgdGhlIGZpcnN0IG1vdmVUbyBjb21tYW5kIGFuZCBhbnkgb3RoZXIgdGhhdCdzIG5vdCBhIGxpbmVUby5cbiAgaWYgKGluZGV4ICE9PSAwICYmIGVsLm1hcmtlciA9PT0gJ0wnKSB7XG4gICAgLy8gSXQgc2VlbXMgd2UgaGF2ZSBhIGxpbmVUbyBoZXJlLiBHZXQgdGhlIGltbWVkaWF0ZSBwcmV2aW91cyBjb21tYW5kXG4gICAgbGV0IHByZXZpb3VzID0gYXJyYXlbaW5kZXggLSAxXTtcbiAgICAvLyDigKZhbmQgY2hlY2sgaWYgdGhlIHgsIHkgY29vcmRpbmF0ZXMgYXJlIGVxdWFscy5cbiAgICBjb25zdCBvdmVybGFwID0gWyd4JywgJ3knXS5ldmVyeShrZXkgPT4ge1xuICAgICAgLy8gSWYgeCBBTkQgeSBvdmVybGFwLCB0aGlzIGNvbW1hbmQgc2hvdWxkIGJlIHNraXBwZWRcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGguYWJzKHByZXZpb3VzLnZhbHVlc1trZXldIC0gZWwudmFsdWVzW2tleV0pKSA9PT0gMDtcbiAgICB9KTtcblxuICAgIGlmIChvdmVybGFwKSB7XG4gICAgICBlbC5vdmVybGFwID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWw7XG59XG5cbi8qKlxuICogU2ltaWxhciBwdXJwb3NlIGFzIG1hcmtPdmVybGFwcGVkKCkuIFJlY3Vyc2l2ZWx5IG1hcmtzIHRyYWlsbGluZyBjb21tYW5kcyB0aGF0IGhhdmUgdGhlIHNhbWUgZW5kIGNvb3JkaW5hdGUgYXMgdGhlIGluaXRhbCAnTScuXG4gKiBUaGlzIGZ1bmN0aW9uIG1vZGlmaWVzIHRoZSBhcnJheSBpbiBwbGFjZS5cbiAqIEBwYXJhbSB7YXJyYXl9IGNtZHMgQ29tbWFuZHMgYXJyYXlcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBPcHRpb25hbCBzdGFydCBpbmRleCBjb3VudGluZyBiYWNrd2FyZHMuIFVzdWFsbHkgdGhlIGxhc3QgaW5kZXggZnJvbSB0aGUgYXJyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldmVyc2VNYXJrT3ZlcmxhcHBlZChjbWRzLCBjb3VudGVyKSB7XG4gIGNvbnN0IG92ZXJsYXAgPSBbJ3gnLCAneSddLmV2ZXJ5KGtleSA9PiB7XG4gICAgLy8gSWYgeCBBTkQgeSBvdmVybGFwLCB0aGlzIGNvbW1hbmQgc2hvdWxkIGJlIHNraXBwZWRcbiAgICByZXR1cm4gKFxuICAgICAgTWF0aC5yb3VuZChNYXRoLmFicyhjbWRzW2NvdW50ZXJdLnZhbHVlc1trZXldIC0gY21kc1swXS52YWx1ZXNba2V5XSkpID09PVxuICAgICAgMFxuICAgICk7XG4gIH0pO1xuXG4gIGlmIChjbWRzW2NvdW50ZXJdLm1hcmtlciA9PT0gJ0wnICYmIG92ZXJsYXApIHtcbiAgICBjbWRzW2NvdW50ZXJdLm92ZXJsYXAgPSB0cnVlO1xuICAgIHJldmVyc2VNYXJrT3ZlcmxhcHBlZChjbWRzLCBjb3VudGVyIC0gMSk7XG4gIH1cblxuICBpZiAoY21kc1tjb3VudGVyXS5tYXJrZXIgPT09ICdaJykge1xuICAgIHJldmVyc2VNYXJrT3ZlcmxhcHBlZChjbWRzLCBjb3VudGVyIC0gMSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjdXJyZW50IGNvbW1hbmQgYW5kXG4gKiBpdCdzIGRpcmVjdCBuZWlnaGJvdXJzIGFuZCByZXR1cm5zIHRoZSBuZWFyZXN0IGRpc3RhbmNlXG4gKiBAcGFyYW0ge2FueX0gZWwgY3VycmVudCBjb21tYW5kXG4gKiBAcGFyYW0ge2FueX0gcHJldmlvdXMgcHJldmlvdXMgY29tbWFuZFxuICogQHBhcmFtIHthbnl9IG5leHQgbmV4dCBjb21tYW5kXG4gKiBAcmV0dXJucyB7bnVtYmVyfSB0aGUgZGlzdGFuY2UgdG8gdGVoIG5lYXJlc3QgY29tbWFuZFxuICovXG5leHBvcnQgZnVuY3Rpb24gc2hvcnRlc3RTaWRlKGVsLCBwcmV2aW91cywgbmV4dCkge1xuICBjb25zdCBueHRTaWRlID0gZ2V0RGlzdGFuY2UoZWwudmFsdWVzLCBuZXh0LnZhbHVlcyk7XG4gIGNvbnN0IHBydlNpZGUgPSBnZXREaXN0YW5jZShwcmV2aW91cy52YWx1ZXMsIGVsLnZhbHVlcyk7XG4gIHJldHVybiBNYXRoLm1pbihwcnZTaWRlLCBueHRTaWRlKTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBhbmdsZSBiZXR3ZWVuIHR3byBwb2ludHNcbiAqIEBwYXJhbSB7YW55fSBwMSBPYmplY3Qgd2l0aCB4IGFuZCB5IHByb3BlcnRpZXNcbiAqIEBwYXJhbSB7YW55fSBwMiBPYmplY3Qgd2l0aCB4IGFuZCB5IHByb3BlcnRpZXNcbiAqIEByZXR1cm5zIHtudW1iZXJ9IEFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFuZ2xlKHAxLCBwMikge1xuICByZXR1cm4gTWF0aC5hdGFuMihwMi54IC0gcDEueCwgcDIueSAtIHAxLnkpO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gdHdvIHBvaW50c1xuICogQHBhcmFtIHthbnl9IHAxIE9iamVjdCB3aXRoIHggYW5kIHkgcHJvcGVydGllc1xuICogQHBhcmFtIHthbnl9IHAyIE9iamVjdCB3aXRoIHggYW5kIHkgcHJvcGVydGllc1xuICogQHJldHVybnMge251bWJlcn0gRGlzdGFuY2UgYmV0d2VlbiBwb2ludHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpc3RhbmNlKHAxLCBwMikge1xuICBjb25zdCB4RGlmZiA9IHAxLnggLSBwMi54O1xuICBjb25zdCB5RGlmZiA9IHAxLnkgLSBwMi55O1xuXG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coeERpZmYsIDIpICsgTWF0aC5wb3coeURpZmYsIDIpKTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb2YgdGhlIG9wcG9zaXRlIHNpZGVcbiAqIG9mIGEgZ2l2ZW4gYW5nbGUgdXNpbmcgdGhlIGh5cG90aGVudXNlXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgQW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGhpcCBIeXBvdGhlbnVzZVxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoIG9mIHRoZSBvcHBvc2l0ZSBzaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHBvc2l0ZUxlbmd0aChhbmdsZSwgaGlwKSB7XG4gIHJldHVybiBNYXRoLnNpbihhbmdsZSkgKiBoaXA7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9mIHRoZSBhZGphY2VudCBzaWRlXG4gKiBvZiBhIGdpdmVuIGFuZ2xlIHVzaW5nIHRoZSBoeXBvdGhlbnVzZVxuICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIEFuZ2xlIGluIHJhZGlhbnNcbiAqIEBwYXJhbSB7bnVtYmVyfSBoaXAgSHlwb3RoZW51c2VcbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aCBvZiB0aGUgYWRqYWNlbnQgc2lkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWRqYWNlbnRMZW5ndGgoYW5nbGUsIGhpcCkge1xuICByZXR1cm4gTWF0aC5jb3MoYW5nbGUpICogaGlwO1xufVxuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGFkamFjZW50IHNpZGUgb2YgdGhlIGdpdmVuXG4gKiBhbmdsZSB1c2luZyB0aGUgYW5nbGUncyBvcHBvc2l0ZSBzaWRlXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgQW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IG9wcG9zaXRlIG9wcG9zaXRlIHNpZGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IExlbmd0aCBvZiB0aGUgYWRqYWNlbnQgc2lkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFuZ2VudExlbmd0aChhbmdsZSwgb3Bwb3NpdGUpIHtcbiAgY29uc3QgYSA9IG9wcG9zaXRlIC8gTWF0aC50YW4oYW5nbGUpO1xuICBpZiAoYSA9PT0gSW5maW5pdHkgfHwgYSA9PT0gLUluZmluaXR5KSB7XG4gICAgcmV0dXJuIG9wcG9zaXRlO1xuICB9XG5cbiAgcmV0dXJuIGE7XG59XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgb3Bwb3NpdGUgc2lkZSBvZiB0aGUgZ2l2ZW5cbiAqIGFuZ2xlIHVzaW5nIHRoZSBhbmdsZSdzIGFkamFjZW50IHNpZGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBBbmdsZSBpbiByYWRpYW5zXG4gKiBAcGFyYW0ge251bWJlcn0gYWRqYWNlbnQgYWRqYWNlbnQgc2lkZVxuICogQHJldHVybnMge251bWJlcn0gTGVuZ3RoIG9mIHRoZSBvcHBvc2l0ZSBzaWRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYW5nZW50Tm9IeXAoYW5nbGUsIGFkamFjZW50KSB7XG4gIHJldHVybiBhZGphY2VudCAqIE1hdGgudGFuKGFuZ2xlKTtcbn1cblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggdGhhdCBzaG91bGQgYmUgdXNlZCB0byBzaG9ydGVuIHRoZVxuICogZGlzdGFuY2UgYmV0d2VlbiBjb21tYW5kcyBiYXNlZCBvbiB0aGUgZ2l2ZW4gcmFkaXVzIHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgQW5nbGUgaW4gcmFkaWFucyBiZXR3ZWVuIHBvaW50c1xuICogQHBhcmFtIHtudW1iZXJ9IHIgUmFkaXVzIG9mIHRoZSBhcmMgdGhhdCBzaG91bGQgZml0IGluc2lkZSB0aGUgdHJpYW5nbGVcbiAqIEByZXR1cm5zIHthbnl9IE9iamVjdCBjb250YWluaW5nIG9mZnNldCBhbmQgdGhlIGFyYydzIHN3ZWVwRmxhZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T2Zmc2V0KGFuZ2xlLCByKSB7XG4gIGxldCBvZmZzZXQ7XG4gIGxldCBzd2VlcEZsYWcgPSAwO1xuICBsZXQgZGVncmVlcyA9IGFuZ2xlICogKDE4MCAvIE1hdGguUEkpO1xuXG4gIC8vIHNoYXJwIGFuZ2xlc1xuICBpZiAoKGRlZ3JlZXMgPCAwICYmIGRlZ3JlZXMgPj0gLTE4MCkgfHwgKGRlZ3JlZXMgPiAxODAgJiYgZGVncmVlcyA8IDM2MCkpIHtcbiAgICBvZmZzZXQgPSBnZXRUYW5nZW50TGVuZ3RoKGFuZ2xlIC8gMiwgLXIpO1xuICAgIC8vIG9idHVzZSBhbmdsZXNcbiAgfSBlbHNlIHtcbiAgICBvZmZzZXQgPSBnZXRUYW5nZW50TGVuZ3RoKGFuZ2xlIC8gMiwgcik7XG4gICAgc3dlZXBGbGFnID0gMTtcbiAgICBpZiAob2Zmc2V0ID09PSBJbmZpbml0eSkge1xuICAgICAgb2Zmc2V0ID0gcjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9mZnNldCxcbiAgICBzd2VlcEZsYWdcbiAgfTtcbn1cblxuLyoqXG4gKiBPcmlnaW5hbGx5IHRha2VuIGZyb206IGh0dHA6Ly9ibC5vY2tzLm9yZy9iYWxpbnQ0Mi84YzkzMTA2MDVkZjkzMDVjNDJiM1xuICogQGJyaWVmIERlIENhc3RlbGphdSdzIGFsZ29yaXRobSBzcGxpdHRpbmcgbi10aCBkZWdyZWUgQmV6aWVyIGN1cnZlXG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBic3BsaXQocG9pbnRzLCB0MCkge1xuICBjb25zdCBuID0gcG9pbnRzLmxlbmd0aCAtIDE7IC8vIG51bWJlciBvZiBjb250cm9sIHBvaW50c1xuICBjb25zdCBiID0gW107IC8vIGNvZWZmaWNpZW50cyBhcyBpbiBEZSBDYXN0ZWxqYXUncyBhbGdvcml0aG1cbiAgY29uc3QgcmVzMSA9IFtdOyAvLyBmaXJzdCBjdXJ2ZSByZXN1bHRpbmcgY29udHJvbCBwb2ludHNcbiAgY29uc3QgcmVzMiA9IFtdOyAvLyBzZWNvbmQgY3VydmUgcmVzdWx0aW5nIGNvbnRyb2wgcG9pbnRzXG4gIGNvbnN0IHQxID0gMSAtIHQwO1xuXG4gIC8vIG11bHRpcGx5IHBvaW50IHdpdGggc2NhbGFyIGZhY3RvclxuICBjb25zdCBwZiA9IGZ1bmN0aW9uKHAsIGYpIHtcbiAgICBjb25zdCByZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcy5wdXNoKGYgKiBwW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfTtcbiAgLy8gYWRkIHBvaW50cyBhcyB2ZWN0b3JzXG4gIGNvbnN0IHBwID0gZnVuY3Rpb24ocDEsIHAyKSB7XG4gICAgY29uc3QgcmVzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBNYXRoLm1pbihwMS5sZW5ndGgsIHAyLmxlbmd0aCk7IGkrKykge1xuICAgICAgcmVzLnB1c2gocDFbaV0gKyBwMltpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH07XG5cbiAgLy8gc2V0IG9yaWdpbmFsIGNvZWZmaWNpZW50czogYltpXVswXSA9IHBvaW50c1tpXVxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBuOyBpKyspIHtcbiAgICBwb2ludHNbaV0gPSB0eXBlb2YgcG9pbnRzW2ldID09ICdvYmplY3QnID8gcG9pbnRzW2ldIDogW3BvaW50c1tpXV07XG4gICAgYi5wdXNoKFtwb2ludHNbaV1dKTtcbiAgfVxuXG4gIC8vIGdldCBhbGwgY29lZmZpY2llbnRzXG4gIGZvciAobGV0IGogPSAxOyBqIDw9IG47IGorKykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IG4gLSBqOyBpKyspIHtcbiAgICAgIGJbaV0ucHVzaChwcChwZihiW2ldW2ogLSAxXSwgdDEpLCBwZihiW2kgKyAxXVtqIC0gMV0sIHQwKSkpO1xuICAgIH1cbiAgfVxuICAvLyBzZXQgcmVzdWx0OiByZXMxICYgcmVzMlxuICBmb3IgKGxldCBqID0gMDsgaiA8PSBuOyBqKyspIHtcbiAgICByZXMxLnB1c2goYlswXVtqXSk7XG4gICAgcmVzMi5wdXNoKGJbal1bbiAtIGpdKTtcbiAgfVxuXG4gIHJldHVybiBbcmVzMSwgcmVzMl07XG59XG5cbi8qKlxuICogQ29uY2F0ZW5hdGVzIGNvbW1hbmRzIGluIGEgc3RyaW5nIGFuZCBlbnN1cmVzIHRoYXQgZWFjaFxuICogdmFsdWUgZnJvbSBlYWNoIGNvbW1hbmQgaXMgcHJpbnRlZCBpbiB0aGUgcmlnaHQgb3JkZXJcbiAqIEBwYXJhbSB7YXJyYXl9IGNtZHMgQXJyYXkgb2Ygc3ZnIGNvbW1hbmRzXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBTdHJpbmcgY29udGFpbmluZyBhbGwgY29tbWFuZHMgZm9ybWF0ZWQgcmVhZHkgZm9yIHRoZSAnZCcgQXR0cmlidXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb21tYW5kc1RvU3ZnUGF0aChjbWRzKSB7XG4gIC8vIHdoZW4gd3JpdGluZyB0aGUgY29tbWFuZHMgYmFjaywgdGhlIHJlbGV2YW50IHZhbHVlcyBzaG91bGQgYmUgd3JpdHRlbiBpbiB0aGlzIG9yZGVyXG4gIGNvbnN0IHZhbHVlc09yZGVyID0gW1xuICAgICdyYWRpdXNYJyxcbiAgICAncmFkaXVzWScsXG4gICAgJ3JvdGF0aW9uJyxcbiAgICAnbGFyZ2VBcmMnLFxuICAgICdzd2VlcCcsXG4gICAgJ3gxJyxcbiAgICAneTEnLFxuICAgICd4MicsXG4gICAgJ3kyJyxcbiAgICAneCcsXG4gICAgJ3knXG4gIF07XG5cbiAgcmV0dXJuIGNtZHNcbiAgICAubWFwKGNtZCA9PiB7XG4gICAgICAvLyBkZWZhdWx0cyBmb3IgZW1wdHkgc3RyaW5nLCBzbyBaIHdpbGwgb3V0cHV0IG5vIHZhbHVlc1xuICAgICAgbGV0IGQgPSAnJztcbiAgICAgIC8vIGZpbHRlciBhbnkgY29tbWFuZCB0aGF0J3Mgbm90IFpcbiAgICAgIGlmIChjbWQubWFya2VyICE9PSAnWicpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB2YWx1ZXMgZnJvbSBjdXJyZW50IGNvbW1hbmRcbiAgICAgICAgY29uc3QgY21kS2V5cyA9IE9iamVjdC5rZXlzKGNtZC52YWx1ZXMpO1xuICAgICAgICAvLyBmaWx0ZXIgdGhlIHZhbHVlc09yZGVyIGFycmF5IGZvciBvbmx5IHRoZSB2YWx1ZXMgdGhhdCBhcHBlYXIgaW4gdGhlIGN1cnJlbnQgY29tbWFuZC5cbiAgICAgICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHZhbHVlc09yZGVyIGd1YXJhbnRlZXMgdGhhdCB0aGUgcmVsZXZhbnQgdmFsdWVzIHdpbGwgYmUgaW4gdGhlIHJpZ2h0IG9yZGVyXG4gICAgICAgIGQgPSB2YWx1ZXNPcmRlclxuICAgICAgICAgIC5maWx0ZXIodiA9PiBjbWRLZXlzLmluZGV4T2YodikgIT09IC0xKVxuICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIGtleSB3aXRoIGl0J3MgdmFsdWVcbiAgICAgICAgICAubWFwKGtleSA9PiBjbWQudmFsdWVzW2tleV0pXG4gICAgICAgICAgLy8gYW5kIHN0cmluZ2lmeSBldmVyeXRoaW5nIHRvZ2V0aGVyIHdpdGggYSBjb21tYSBpbmJldHdlZW4gdmFsdWVzXG4gICAgICAgICAgLmpvaW4oKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgJHtjbWQubWFya2VyfSR7ZH1gO1xuICAgIH0pXG4gICAgLmpvaW4oJycpXG4gICAgLnRyaW0oKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=