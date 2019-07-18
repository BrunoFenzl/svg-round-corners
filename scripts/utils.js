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
      
      if (cmd.marker.toUpperCase() === 'Z') {
        values = arr[i - 1].chunk.match(digitRegEx);
        vals = values ? values.map(parseFloat) : [0, 0];
      }

      // convert all relative values to absolute values
      return newCommand(cmd.marker, vals);
    })
    .filter(cmd => Object.keys(cmd.values).some(k => cmd.values[k] !== 0)) // remove relative points where all values are zero
    .map(convertToAbsolute)
    .map(removeUnidimensionals)
    
    if (round) {
      results.forEach(el => 
        Object.keys(el.values).forEach(key => 
          el.values[key] = parseFloat(el.values[key].toFixed(3))
        )
      )
    }

    return results;
}

export function convertToAbsolute(el, index, arr) {
  // First is always absolute
  // only need to test lowercase (relative) commands
  if (el.marker === el.marker.toLowerCase()) {
    el.marker = el.marker.toUpperCase();
    // get previous item or zero if its the first coordinate
    const prev = arr[index - 1] || { values: { x: 0, y: 0 } };

    switch (el.marker) {
      case 'M': // move to x,y
      case 'L': // line to x,y
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
      case 'H': // horizontal to x
        el.values.x += prev.values.x;
        break;
      case 'V': // vertical to y
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
        break;
      case 'T':
        break;
      case 'A':
        el.values.x += prev.values.x;
        el.values.y += prev.values.y;
        break;
    }
  }

  return el;
}

function newCommand(marker, values) {
  let cmd = { marker, values: {} };
  let v = cmd.values;
  switch (marker.toUpperCase()) {
    case 'M': // move to x,y
    case 'L': // line to x,y
    case 'Z': // close path
      v.x = values[0];
      v.y = values[1];
      break;
    case 'H': // horizontal to x
      v.x = values[0];
      break;
    case 'V': // vertical to y
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

export function removeUnidimensionals(el, index, arr) {
  if (index > 0) {
    const prev = arr[index - 1];
    switch (el.marker) {
      case 'H':
        el.marker = 'L'
        el.values.y = prev.values.y;
        break;
      case 'V':
        el.marker = 'L'
        el.values = prev.values.x;
        break;
    }
  }

  return el;
}

export function removeEqualAdjacent(el, index, arr) {
  const nxt = index < arr.length - 1 ? arr[index + 1] : arr[0];
  // x or y needs to be different than the next one
  return el.values.x !== nxt.values.x || el.values.y !== nxt.values.y;
}

export function chunkSubPaths(el, index, arr) {
  return el.marker === 'M' ?
    arr.splice(index, arr.findIndex((el, i) => el.marker === 'M' && i > index)) : false;
}

export function commandsToSvgPath(cmds) {
  return cmds
    .map((cmd) => {
      const d = Object.keys(cmd.values).map(key => cmd.values[key]).join(',');
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
