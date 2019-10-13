export function pathParser(str, round) {
  const markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
  const digitRegEx = /-?[0-9]*\.?\d+/g;
  
  return [...str.matchAll(markerRegEx)]
    .map((match) => {
      return { marker: match[0], index: match.index };
    })
    .reduceRight((acc, cur) => {
      const chunk = str.substring(
        cur.index,
        acc.length ? acc[acc.length - 1].index : str.length
      );
      return acc.concat([
        {
          marker: cur.marker,
          index: cur.index,
          chunk: chunk.length > 0 ? chunk.substr(1, chunk.length - 1) : chunk
        }
      ]);
    }, [])
    .reverse()
    .flatMap((cmd) => {
      const values = cmd.chunk.match(digitRegEx);
      const vals = values ? values.map(parseFloat) : [];
      return newCommands(cmd.marker, vals);
    })
    .map(convertToAbsolute)
    .map(el => {
      // console.log('after flat', el);
      return el;
    })

}

export function roundValues(cmds, round) {
  cmds.forEach(el => 
    Object.keys(el.values).forEach(key => 
      el.values[key] = el.values[key] && parseFloat(el.values[key].toFixed(round))
    )
  )
}

export function getPreviousDiff(e, i, a) {
  const counter = i - 1;
  const previous = a[mod(counter, a.length)];

  if (previous.marker !== 'Z') {
    return previous;
  } else {
    return getPreviousDiff(e, counter, a);
  }
}

export function getNextDiff(e, i, a) {
  const counter = i + 1;
  const next = a[mod(counter, a.length)];

  if (next.marker === 'Z') {
    return getNextDiff(e, counter, a);
  } else {
    return next;
  }
}

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
  } else if (el.marker === el.marker.toUpperCase()) { // convert to L and add missing value
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

  if (el.marker === 'Z') {
    // find previous M recursively 
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

export function newCommands(marker, values) {
  const cmds = [];
  
  switch (marker.toUpperCase()) {
    case 'M': // moveTo x,y
      for (let i = 0; i < values.length; i+=2) {
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
            y: values[i + 1],
          }
        });
      }
      break;
    case 'L': // lineTo x,y
      for (let i = 0; i < values.length; i+=2) {
        cmds.push({
          marker,
          values: {
            x: values[i],
            y: values[i + 1],
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
            y: 0,
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
            y: values[i],
          }
        });
      }
      break;
    case 'C': // cubic beziér curve x1 y1, x2 y2, x y
      for (let i = 0; i < values.length; i+=6) {
        cmds.push({
          marker,
          values: {
            x1: values[i],
            y1: values[i + 1],
            x2: values[i + 2],
            y2: values[i + 3],
            x: values[i + 4],
            y: values[i + 5],
          }
        });
      }
      break;
    case 'S':
      for (let i = 0; i < values.length; i+=4) {
        cmds.push({
          marker,
          values: {
            x2: values[i],
            y2: values[i + 1],
            x: values[i + 2],
            y: values[i + 3],
          }
        });
      }
      break;
    case 'Q':
      for (let i = 0; i < values.length; i+=4) {
        cmds.push({
          marker,
          values: {
            x1: values[i],
            y1: values[i + 1],
            x: values[i + 2],
            y: values[i + 3],
          }
        });
      }
      break;
    case 'T':
      for (let i = 0; i < values.length; i+=2) {
        cmds.push({
          marker,
          values: {
            x: values[i],
            y: values[i + 1],
          }
        });
      }
      break;
    case 'A':
      for (let i = 0; i < values.length; i+=7) {
        cmds.push({
          marker,
          values: {
            radiusX: values[i],
            radiusY: values[i + 1],
            rotation: values[i + 2],
            largeArc: values[i + 3],
            sweep: values[i + 4],
            x: values[i + 5],
            y: values[i + 6],
          }
        });
      }
      break;
    case 'Z':
      cmds.push({
        marker,
        values: { // values will be overriden
          x: 0,
          y: 0,
        }
      });
      break;
  }
  return cmds;
}

export function mod(x, m) {
  return (x % m + m) % m;
}

export function shortestSide(el, previous, next) {
  const nxtSide = getDistance(el.values, next.values);
  const prvSide = getDistance(previous.values, el.values);
  
  // half way through between both points
  return Math.min(prvSide, nxtSide);
}

export function markOverlapped(el, index, array) {
  // Skip the first moveTo command and any other that's not a lineTo.
  if (index !== 0 && el.marker === 'L') {
    // It seems we have a lineTo here. Get the immediate previous command
    let previous = array[index - 1];
    // …and check if the x, y coordinates are equals.
    const overlap = ['x', 'y'].every((key) => {
      // If any of x or y are different, we may draw a curve here and return true.
      return Math.round(Math.abs(previous.values[key] - el.values[key])) === 0;
    });

    if (overlap) {
      el.overlap = true;
    }
  }
  
  return el;
}

export function reverseMarkOverlapped(cmds, counter) {  
  const overlap = ['x', 'y'].every((key) => {
    // If any of x or y are different, we may draw a curve here and return true.
    return Math.round(Math.abs(cmds[counter].values[key] - cmds[0].values[key])) === 0;
  });

  if (cmds[counter].marker === 'L' && overlap) {
    cmds[counter].overlap = true;
    reverseMarkIfOverlapped(cmds, counter - 1)
  }
  
  if (cmds[counter].marker === 'Z') {
    reverseMarkIfOverlapped(cmds, counter - 1)
  }
}

export function commandsToSvgPath(cmds) {
  return cmds
    .map((cmd) => {
      let d = '';
      if (cmd.marker !== 'Z') {
        d = Object.keys(cmd.values).map(key => cmd.values[key]).join(',');
      }
      return `\n${cmd.marker} ${d}`;
    })
    .join(' ')
    .trim();
}

export function getAngle(p1, p2) {
  return Math.atan2(p2.x - p1.x, p2.y - p1.y);
}

export function getDistance(p1, p2) {
  const xDiff = p1.x - p2.x;
  const yDiff = p1.y - p2.y;

  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

export function getOppositeLength(angle, hip) {
  return Math.sin(angle) * hip;
}

export function getAdjacentLength(angle, hip) {
  return Math.cos(angle) * hip;
}

export function getTangentLength(angle, opposite) {
  return opposite / Math.tan(angle) || 0;
}

export function getTangentNoHyp(angle, opposite) {
  return opposite * Math.tan(angle);
}

export function getOffset(angle, r) {
  let offset;
  let sweepFlag = 0;
  let degrees = angle * (180/Math.PI);

  if ( (degrees < 0 && degrees > -90) || (degrees > 180 && degrees <= 270) || (degrees <= -90 && degrees > -180) ) { // sharp angles
    offset = getTangentLength(angle/2, -r);
    sweepFlag = 0;
    if (offset === -Infinity || offset == 0) {
      offset = -r;
    } 
  } else { // obtuse angles
    offset = getTangentLength(angle/2, r );
    sweepFlag = 1;
    if (offset === Infinity) {
      offset = r;
    }
  }

  return {
    offset,
    sweepFlag,
  }
}

/**
 * http://bl.ocks.org/balint42/8c9310605df9305c42b3
 * @brief De Casteljau's algorithm splitting n-th degree Bezier curve
 */
export function bsplit(points, t0) {
  const n = points.length - 1; // number of control points
  const b = [];		   	   // coefficients as in De Casteljau's algorithm
  const res1 = [];		   // first curve resulting control points
  const res2 = [];		   // second curve resulting control points
  const t1 = 1 - t0;
  
  // multiply point with scalar factor
  const pf = function(p, f) {
    const res = [];
    for(let i = 0; i < p.length; i++) {
      res.push(f * p[i]);
    }
    return res;
  };
  // add points as vectors
  const pp = function(p1, p2) {
    const res = [];
    for(let i = 0; i < Math.min(p1.length, p2.length); i++) {
      res.push(p1[i] + p2[i]);
    }
    return res;
  };
  
  // set original coefficients: b[i][0] = points[i]
  for(let i = 0; i <= n; i++) {
    points[i] = (typeof points[i] == "object") ? points[i] : [points[i]];
    b.push([ points[i] ]);
  }

  // get all coefficients
  for(let j = 1; j <= n; j++) {
    for(let i = 0; i <= (n-j); i++) {
      b[i].push( 
        pp(
          pf(b[i][j-1], t1),
          pf(b[i+1][j-1], t0)
        )
      );
    }
  }
  // set result: res1 & res2
  for(let j = 0; j <= n; j++) {
    res1.push(b[0][j]);
    res2.push(b[j][n-j]);
  }
  
  return [res1, res2];
};
