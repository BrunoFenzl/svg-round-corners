export function pathParser(str, round) {
  const markerRegEx = /[MmLlSsQqLlHhVvCcSsQqTtAaZz]/g;
  const digitRegEx = /-?[0-9]*\.?\d+/g;
  let results = [];
  
  results = [...str.matchAll(markerRegEx)]
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
    .map((cmd, i, arr) => {
      let values = cmd.chunk.match(digitRegEx);
      let vals = values ? values.map(parseFloat) : [];      
      return newCommand(cmd.marker, vals);
    })
    .map(convertToAbsolute)

  return results;
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

  if (next.overlap || next.marker === 'Z') {
    return getNextDiff(e, counter, a);
  } else {
    return next;
  }
}

export function linkAdjacent(el, index, array) {  
  el.previous = getPreviousDiff(el, index, array);
  el.next = getNextDiff(el, index, array);

  return el;
}

export function convertToAbsolute(el, index, arr) {
  // get previous item or last one if its the first coordinate
  const prev = arr[mod(index - 1, arr.length)];

  // First is always absolute
  if (index === 0) {
    el.marker = el.marker.toUpperCase();
  }
  // only need to test lowercase (relative) commands
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
      case 'H': // horizontal to x
        el.values.x += prev.values.x;
        break;
      case 'V': // vertical to y
        el.values.x = prev.values.x;
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

export function newCommand(marker, values) {
  let cmd = { marker, values: {} };
  let v = cmd.values; // shortcut
  switch (marker.toUpperCase()) {
    case 'M': // move to x,y
    case 'L': // line to x,y
      v.x = values[0];
      v.y = values[1];
      break;
    case 'H': // horizontal to x
      v.x = values[0];
      v.y = null;
      break;
    case 'V': // vertical to y
      v.x = null;
      v.y = values[0];
      break;
    case 'C': // cubic beziér curve x1 y1, x2 y2, x y
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

export function mod(x, m) {
  return (x % m + m) % m;
}

export function convertHVToL(el, index, arr) {
  if (index > 0) {
    const prev = arr[index - 1];
    switch (el.marker) {
      case 'H':
        el.marker = 'L'
        el.values.y = prev.values.y;
        break;
      case 'V':
        el.marker = 'L'
        el.values.x = prev.values.x;
        break;
    }
  }

  return el;
}

export function addMaxRadius(el, i, arr) {
  const previous = getPreviousDiff(el, i, arr);
  const next = getNextDiff(el, i, arr);
  
  const nxtSide = getDistance({
    x: el.values.x,
    y: el.values.y,
  },
  {
    x: next.values.x,
    y: next.values.y,
  }); // half way through between both points

  const prvSide = getDistance({
    x: el.values.x,
    y: el.values.y,
  },
  {
    x: previous.values.x,
    y: previous.values.y,
  }); // half way through between both points

  el.maxRadius = Math.min(prvSide, nxtSide) / 2;
  return el;
}

export function removeOverlapped(el, index, array) {
  // Skip the first moveTo command and any other that's not a lineTo.
  if (index !== 0 || el.marker === 'L') {
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

export function removeLastCmdIfOverlapped(cmds) {
  const first = { ...cmds[0] };
  
  // ignore first index
  for(let i = cmds.length - 1; i > 1; i--) {
    const overlap = ['x', 'y'].every((key) => {
      // If any of x or y are different, we may draw a curve here and return true.
      return Math.round(Math.abs(cmds[i].values[key] - first.values[key])) === 0;
    });

    if (overlap) {
      cmds[i].overlap = true;
    }
  }
}

export function chunkSubPaths(el, index, arr) {
  return el.marker === 'M' ?
    arr.splice(index, arr.findIndex((el, i) => el.marker === 'M' && i > index)) :
    false;
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
  const xDiff = p2.x - p1.x;
  const yDiff = p2.y - p1.y;

  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

export function getOppositeLength(angle, hip) {
  return Math.sin(angle) * hip;
}

export function getAdjacentLength(angle, hip) {
  return Math.cos(angle) * hip;
}

export function getTangentLength(angle, opposite) {
  return opposite / Math.tan(angle);
}

export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for(let i = arr1.length; i--;) {
      if(arr1[i] !== arr2[i]) {
        return false;
      }
  }

  return true;
}

export default {
  pathParser,
  roundValues,
  getPreviousDiff,
  getNextDiff,
  linkAdjacent,
  convertToAbsolute,
  mod,
  convertHVToL,
  addMaxRadius,
  removeOverlapped,
  removeLastCmdIfOverlapped,
  chunkSubPaths,
  commandsToSvgPath,
  getAngle,
  getDistance,
  getOppositeLength,
  getAdjacentLength,
  getTangentLength,
  arraysEqual,
}