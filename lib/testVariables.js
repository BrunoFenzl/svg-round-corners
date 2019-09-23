"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var pathSquare = "\nm 200, 200\nl 0, 50\nl 50, 0\nl 0, -50\nl -50, 0\nz\n";
/* 
…in absolute commands:
M 200, 200
L 200, 250
L 250, 250
L 250, 200
L 200, 200
Z
*/

var commandsSquare = [{
  marker: 'M',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 250
  }
}, {
  marker: 'L',
  values: {
    x: 250,
    y: 250
  }
}, {
  marker: 'L',
  values: {
    x: 250,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'Z',
  values: {
    x: null,
    y: null
  }
}];
var absOverlapped = [{
  marker: 'M',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 250
  }
}, {
  marker: 'L',
  values: {
    x: 250,
    y: 250
  }
}, {
  marker: 'L',
  values: {
    x: 250,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'Z',
  values: {
    x: null,
    y: null
  }
}];
var absNoOverlap = [{
  marker: 'M',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 250
  }
}, {
  marker: 'L',
  values: {
    x: 250,
    y: 250
  }
}, {
  marker: 'L',
  values: {
    x: 250,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  }
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  },
  skip: true
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  },
  skip: true
}, {
  marker: 'L',
  values: {
    x: 200,
    y: 200
  },
  skip: true
}, {
  marker: 'Z',
  values: {
    x: null,
    y: null
  }
}];
var _default = {
  pathSquare: pathSquare,
  commandsSquare: commandsSquare,
  absOverlapped: absOverlapped,
  absNoOverlap: absNoOverlap
};
exports.default = _default;