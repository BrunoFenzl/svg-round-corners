"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var pathParser = function pathParser(str, round) {
  var markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
  var digitRegEx = /-?[0-9]*\.?\d+/g;
  var results = [];
  results = _toConsumableArray(str.matchAll(markerRegEx)).map(function (match) {
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
  }, []).reverse().map(function (cmd, i, arr) {
    var values = cmd.chunk.match(digitRegEx);
    var vals = values ? values.map(parseFloat) : [];
    return newCommand(cmd.marker, vals);
  }).map(convertToAbsolute);
  return results;
};

function roundValues(cmds, round) {
  cmds.forEach(function (el) {
    return Object.keys(el.values).forEach(function (key) {
      return el.values[key] = el.values[key] && parseFloat(el.values[key].toFixed(round));
    });
  });
}

function getPreviousDiff(e, i, a) {
  var counter = i - 1;
  var prev = a[mod(counter, a.length)]; // if (e.marker === 'M') {
  //   return a[a.length - 1]; // return z
  // }

  var isDiff = ['x', 'y'].some(function (key) {
    return Math.round(Math.abs(prev.values[key] - e.values[key])) > 10;
  });

  if (isDiff) {
    return prev;
  } else {
    return getPreviousDiff(e, counter - 1, a);
  }
}

function getNextDiff(e, i, a) {
  var counter = i + 1;
  var next = a[mod(counter, a.length)]; // if (e.marker === 'Z') {
  //   return a[0]; // return m
  // }

  var isDiff = ['x', 'y'].some(function (key) {
    return Math.round(Math.abs(next.values[key] - e.values[key])) !== 0;
  });

  if (isDiff) {
    return next;
  } else {
    return getNextDiff(e, counter + 1, a);
  }
}

function linkAdjacent(el, index, array) {
  el.previous = getPreviousDiff(el, index, array);
  el.next = getNextDiff(el, index, array);
  return el;
}

function convertToAbsolute(el, index, arr) {
  // get previous item or last one if its the first coordinate
  var prev = arr[mod(index - 1, arr.length)]; // First is always absolute

  if (index === 0) {
    el.marker = el.marker.toUpperCase();
  } // only need to test lowercase (relative) commands


  if (el.marker === el.marker.toLowerCase()) {
    // convert all to uppercase
    el.marker = el.marker.toUpperCase();

    switch (el.marker) {
      case 'M': // move to x,y

      case 'L': // line to x,y

      case 'A':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;

      case 'H':
        // horizontal to x
        el.values.x += prev.values.x;
        break;

      case 'V':
        // vertical to y
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
        break;

      case 'T':
        break;

      case 'A':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
    }
  }

  if (el.marker === 'Z') {
    el.values.x = null;
    el.values.y = null;
  }

  return el;
}

function newCommand(marker, values) {
  var cmd = {
    marker: marker,
    values: {}
  };
  var v = cmd.values; // shortcut

  switch (marker.toUpperCase()) {
    case 'M': // move to x,y

    case 'L':
      // line to x,y
      v.x = values[0];
      v.y = values[1];
      break;

    case 'H':
      // horizontal to x
      v.x = values[0];
      v.y = null;
      break;

    case 'V':
      // vertical to y
      v.x = null;
      v.y = values[0];
      break;

    case 'C':
      // cubic beziér curve x1 y1, x2 y2, x y
      v.x1 = values[0];
      v.y1 = values[1];
      v.x2 = values[2];
      v.y2 = values[3];
      v.x = values[4];
      v.y = values[5];
      break;

    case 'S':
      v.x2 = values[0];
      v.y2 = values[1];
      v.x = values[2];
      v.y = values[3];
      break;

    case 'Q':
      v.x1 = values[0];
      v.y1 = values[1];
      v.x = values[2];
      v.y = values[3];
      break;

    case 'T':
      v.x = values[0];
      v.y = values[1];
      break;

    case 'A':
      v.radiusX = values[0];
      v.radiusY = values[1];
      v.rotation = values[2];
      v.largeArc = values[3];
      v.sweep = values[4];
      v.x = values[5];
      v.y = values[6];
      break;

    case 'Z':
      break;
  }

  return cmd;
}

function mod(x, m) {
  return (x % m + m) % m;
}

function convertHVToL(el, index) {
  if (index > 0) {
    var prev = el.previous;

    switch (el.marker) {
      case 'H':
        el.marker = 'L';
        el.values.y = prev.values.y;
        break;

      case 'V':
        el.marker = 'L';
        el.values.x = prev.values.x;
        break;
    }
  }

  return el;
}

function addMaxRadius(el) {
  var nxtSide = getDistance({
    x: el.values.x,
    y: el.values.y
  }, {
    x: el.next.values.x,
    y: el.next.values.y
  }); // half way through between both points

  var prvSide = getDistance({
    x: el.values.x,
    y: el.values.y
  }, {
    x: el.previous.values.x,
    y: el.previous.values.y
  }); // half way through between both points

  el.maxRadius = Math.min(prvSide, nxtSide) / 2;
  return el;
}

function removeOverlapped(el, index, array) {
  // Skip the first moveTo command and any other that's not a lineTo.
  if (index === 0 || el.marker !== 'L') {
    return el;
  } // It seems we have a lineTo here. Get the immediate previous command


  var previous = array[index - 1]; // …and check if the x, y coordinates are equals.

  var overlap = ['x', 'y'].every(function (key) {
    // If any of x or y are different, we may draw a curve here and return true.
    return Math.round(Math.abs(previous.values[key] - el.values[key])) === 0;
  });

  if (overlap) {
    el.skip = true;
  }

  return el;
}

function removeLastCmdIfOverlapped(cmds) {
  var first = cmds[0];
  var l = cmds.length - 1;
  console.log('l', first, cmds[l - 1], cmds[l]);

  if (cmds[l].marker === 'Z' && cmds[l - 1].marker === 'L') {
    var isDiff = ['x', 'y'].some(function (key) {
      return Math.round(Math.abs(cmds[l - 1].values[key] - first.values[key])) !== 0;
    });

    if (!isDiff) {
      cmds.splice(l - 1, 1);
    }
  }
}

function chunkSubPaths(el, index, arr) {
  return el.marker === 'M' ? arr.splice(index, arr.findIndex(function (el, i) {
    return el.marker === 'M' && i > index;
  })) : false;
}

function commandsToSvgPath(cmds) {
  return cmds.map(function (cmd) {
    var d = '';

    if (cmd.marker !== 'Z') {
      d = Object.keys(cmd.values).map(function (key) {
        return cmd.values[key];
      }).join(',');
    }

    return "\n".concat(cmd.marker, " ").concat(d);
  }).join(' ').trim();
}

function getAngle(p1, p2) {
  return Math.atan2(p2.x - p1.x, p2.y - p1.y);
}

function getDistance(p1, p2) {
  var xDiff = p2.x - p1.x;
  var yDiff = p2.y - p1.y;
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

function getOppositeLength(angle, hip) {
  return Math.sin(angle) * hip;
}

function getAdjacentLength(angle, hip) {
  return Math.cos(angle) * hip;
}

function getTangentLength(angle, opposite) {
  return opposite / Math.tan(angle);
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (var i = arr1.length; i--;) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

var _default = {
  pathParser: pathParser,
  roundValues: roundValues,
  getPreviousDiff: getPreviousDiff,
  getNextDiff: getNextDiff,
  linkAdjacent: linkAdjacent,
  convertToAbsolute: convertToAbsolute,
  mod: mod,
  convertHVToL: convertHVToL,
  addMaxRadius: addMaxRadius,
  removeOverlapped: removeOverlapped,
  removeLastCmdIfOverlapped: removeLastCmdIfOverlapped,
  chunkSubPaths: chunkSubPaths,
  commandsToSvgPath: commandsToSvgPath,
  getAngle: getAngle,
  getDistance: getDistance,
  getOppositeLength: getOppositeLength,
  getAdjacentLength: getAdjacentLength,
  getTangentLength: getTangentLength,
  arraysEqual: arraysEqual
};
exports.default = _default;