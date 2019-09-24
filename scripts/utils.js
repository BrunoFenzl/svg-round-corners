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
    // .map(convertHVToL)
    .map(convertToAbsolute)
    // .map(convertHVToL)
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

  if (next.overlap || next.marker === 'Z') {
    return getNextDiff(e, counter, a);
  } else {
    return next;
  }
}

export function convertToAbsolute(el, index, arr) {
  // get previous item or last one if its the first coordinate
  const prev = getPreviousDiff(el, index, arr);

  // First is always absolute
  if (index === 0) {
    el.marker = el.marker.toUpperCase();
  }
  // debugger;
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
        break;
      case 'T':
        break;
    }
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

  if (el.marker === 'Z') {
    el.values.x = null;
    el.values.y = null;
  }

  console.log('after flat', el);
  return el;
}

export function newCommands(marker, values) {
  const cmds = [];
  
  switch (marker.toUpperCase()) {
    case 'M': // moveTo x,y
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
        values: []
      });
      break;
  }
  return cmds;
}

export function mod(x, m) {
  return (x % m + m) % m;
}

export function convertHVToL(el, index, arr) {
  if (index > 0) {
    const prev = arr[index - 1];
    switch (el.marker) {
      // case 'h':
      //   el.marker = 'l'
      //   el.values.y = prev.values.y;
      //   break;
      // case 'v':
      //   el.marker = 'l'
      //   el.values.x = prev.values.x;
      //   break;
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

export function removeLastCmdIfOverlapped(cmds, counter) {  
  const overlap = ['x', 'y'].every((key) => {
    // If any of x or y are different, we may draw a curve here and return true.
    return Math.round(Math.abs(cmds[counter].values[key] - cmds[0].values[key])) === 0;
  });

  if (cmds[counter].marker === 'L' && overlap) {
    cmds[counter].overlap = true;
    removeLastCmdIfOverlapped(cmds, counter - 1)
  }
  
  if (cmds[counter].marker === 'Z') {
    removeLastCmdIfOverlapped(cmds, counter - 1)
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