/**
 * Round the values of each command to the given number of decimals.
 * This function modifies the object in place.
 * @param {array} cmds Sequence of commands
 * @param {number} round Number of decimal place to be rounded
 * @returns {array} Sequence of commands with their values rounded
 */
export function roundValues(el, round) {
  Object.keys(el.values).forEach(
    key =>
      (el.values[key] =
        el.values[key] && parseFloat(el.values[key].toFixed(round)))
  );

  return el;
}

/**
 * Get previous element in array, wrapping if index is out of bounds and skipping if the command is 'Z'
 * @param {any} e Command object
 * @param {number} i Current index
 * @param {array} a Array being iterated
 * @returns {any} Previous element that doesn't have a 'Z' marker
 */
export function getPreviousNoZ(e, i, a) {
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
export function getNextNoZ(e, i, a) {
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
export function convertToAbsolute(el, index, arr) {
  // get previous item or create one empty if it doesnt exist
  let prev = arr[index - 1] || { values: { x: 0, y: 0 } };

  // only need to test lowercase (relative) commands
  if (el.marker === el.marker.toLowerCase()) {
    // convert all to uppercase
    el.marker = el.marker.toUpperCase();
    switch (el.marker) {
      case 'M': // move to x,y
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'L': // line to x,y
      case 'A':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'H': // horizontalTo x
        el.marker = 'L';
        el.values.x += prev.values.x;
        el.values.y = prev.values.y;
        break;
      case 'V': // verticalTo y
        el.marker = 'L';
        el.values.x = prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'C': // beziér curve x1 y1, x2 y2, x y
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
      case 'H': // horizontalTo x
        el.marker = 'L';
        el.values.y = prev.values.y;
        break;
      case 'V': // verticalTo y
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
export function newCommands(marker, values) {
  const cmds = [];

  switch (marker.toUpperCase()) {
    case 'M': // moveTo x,y
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
    case 'L': // lineTo x,y
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
    case 'H': // horizontalTo x
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
    case 'V': // verticalTo y
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
    case 'C': // cubic beziér curve x1 y1, x2 y2, x y
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
export function mod(x, m) {
  return ((x % m) + m) % m;
}

/**
 * Compares the given element with it's predecessor and checks if their end position is the same.
 * If it is, add a boolean 'overlap' property to the element. This function modifies the array elements in place
 * @param {any} el Command object
 * @param {number} index Current iteration index
 * @param {array} array Array being iterated
 * @returns {any} Command object
 */
export function markOverlapped(el, index, array) {
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
export function reverseMarkOverlapped(cmds, counter) {
  const overlap = ['x', 'y'].every(key => {
    // If x AND y overlap, this command should be skipped
    return (
      Math.round(Math.abs(cmds[counter].values[key] - cmds[0].values[key])) ===
      0
    );
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
export function shortestSide(el, previous, next) {
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
export function getAngle(p1, p2) {
  return Math.atan2(p2.x - p1.x, p2.y - p1.y);
}

/**
 * Calculates the distance between two points
 * @param {any} p1 Object with x and y properties
 * @param {any} p2 Object with x and y properties
 * @returns {number} Distance between points
 */
export function getDistance(p1, p2) {
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
export function getOppositeLength(angle, hip) {
  return Math.sin(angle) * hip;
}

/**
 * Calculates the length of the adjacent side
 * of a given angle using the hypothenuse
 * @param {number} angle Angle in radians
 * @param {number} hip Hypothenuse
 * @returns {number} Length of the adjacent side
 */
export function getAdjacentLength(angle, hip) {
  return Math.cos(angle) * hip;
}

/**
 * Calculates the adjacent side of the given
 * angle using the angle's opposite side
 * @param {number} angle Angle in radians
 * @param {number} opposite opposite side
 * @returns {number} Length of the adjacent side
 */
export function getTangentLength(angle, opposite) {
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
export function getTangentNoHyp(angle, adjacent) {
  return adjacent * Math.tan(angle);
}

/**
 * Calculates the length that should be used to shorten the
 * distance between commands based on the given radius value
 * @param {number} angle Angle in radians between points
 * @param {number} r Radius of the arc that should fit inside the triangle
 * @returns {any} Object containing offset and the arc's sweepFlag
 */
export function getOffset(angle, r) {
  let offset;
  let sweepFlag = 0;
  let degrees = angle * (180 / Math.PI);

  // sharp angles
  if ((degrees < 0 && degrees >= -180) || (degrees > 180 && degrees < 360)) {
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
export function bsplit(points, t0) {
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
export function commandsToSvgPath(cmds) {
  // when writing the commands back, the relevant values should be written in this order
  const valuesOrder = [
    'radiusX',
    'radiusY',
    'rotation',
    'largeArc',
    'sweep',
    'x1',
    'y1',
    'x2',
    'y2',
    'x',
    'y'
  ];

  return cmds
    .map(cmd => {
      // defaults for empty string, so Z will output no values
      let d = '';
      // filter any command that's not Z
      if (cmd.marker !== 'Z') {
        // get all values from current command
        const cmdKeys = Object.keys(cmd.values);
        // filter the valuesOrder array for only the values that appear in the current command.
        // We do this because valuesOrder guarantees that the relevant values will be in the right order
        d = valuesOrder
          .filter(v => cmdKeys.indexOf(v) !== -1)
          // replace the key with it's value
          .map(key => cmd.values[key])
          // and stringify everything together with a comma inbetween values
          .join();
      }
      return `${cmd.marker}${d}`;
    })
    .join('')
    .trim();
}
