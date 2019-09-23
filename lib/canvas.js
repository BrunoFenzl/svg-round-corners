"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roundCorners = roundCorners;

var _utils = require("./utils.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function roundCorners(string, r, round) {
  // create specific commands
  var cmds = _toConsumableArray((0, _utils.pathParser)(string));

  var subpaths = [];
  var newCmds = [];
  cmds // split sub and compound paths
  .forEach(function (e, i, a) {
    if (e.marker === 'M') {
      subpaths.push([]);
    } // add property shouldClose to array but don't push command Z


    if (e.marker === 'Z') {
      subpaths[subpaths.length - 1].shouldClose = true; // console.log('subpaths[subpaths.length - 1]', subpaths[subpaths.length - 1])
      // push all other commands
    } else {
      subpaths[subpaths.length - 1].push(e);
    }
  });

  if (round) {
    (0, _utils.roundValues)(cmds, round);
  }

  subpaths.forEach(function (subPathCmds) {
    (0, _utils.removeLastCmdIfOverlapped)(subPathCmds);
    subPathCmds // We are only excluding lineTo commands that may be
    // overlapping or having really, really near coordinates
    .map(_utils.removeOverlapped).map(_utils.linkAdjacent).map(_utils.convertHVToL).map(_utils.addMaxRadius);

    var first = _objectSpread({}, subPathCmds[0]);

    subPathCmds.map(function (el) {
      var largeArcFlag = 0;
      var anglePrv = (0, _utils.getAngle)(el.values, el.previous.values);
      var angleNxt = (0, _utils.getAngle)(el.values, el.next.values);
      var angle = angleNxt - anglePrv; // radians

      var degrees = angle * (180 / Math.PI); // degrees

      var offset;
      var sweepFlag = 0; // prevent arc crossing the next command

      if (r >= el.maxRadius) {
        r = el.maxRadius || r;
      }

      if (degrees <= -270 || degrees > 0 && degrees <= 90) {
        // sharp angles
        offset = (0, _utils.getTangentLength)(angle / 2, r);

        if (offset === Infinity) {
          offset = r;
        }

        sweepFlag = 1;
      } else if (degrees > -270 && degrees <= 0 || degrees > 90) {
        // obtuse angles
        offset = (0, _utils.getTangentLength)(angle / 2, -r);

        if (offset === -Infinity) {
          offset = -r;
        }
      }

      var prevPoint = [el.values.x + (0, _utils.getOppositeLength)(anglePrv, offset), el.values.y + (0, _utils.getAdjacentLength)(anglePrv, offset)];
      var nextPoint = [el.values.x + (0, _utils.getOppositeLength)(angleNxt, offset), el.values.y + (0, _utils.getAdjacentLength)(angleNxt, offset)];
      console.log('el', el);

      switch (el.marker) {
        case 'M': // moveTo x,y

        case 'L':
          // lineTo x,y
          newCmds.push({
            marker: el.marker,
            values: {
              x: parseFloat(prevPoint[0].toFixed(3)),
              y: parseFloat(prevPoint[1].toFixed(3))
            }
          }); // there only need be a curve if and only if the next marker is a corner

          if (el.next.marker === 'L' || el.next.marker === 'M') {
            newCmds.push({
              marker: 'A',
              values: {
                radiusX: r,
                radiusY: r,
                rotation: degrees,
                largeArc: largeArcFlag,
                sweep: sweepFlag,
                x: parseFloat(nextPoint[0].toFixed(3)),
                y: parseFloat(nextPoint[1].toFixed(3))
              }
            });
          }

          break;

        case 'H': // horizontal to x. Transformed to L in utils

        case 'V': // vertical to y. Transformed to L in utils

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
  var newCommands = (0, _utils.commandsToSvgPath)();
  return newCommands;
}