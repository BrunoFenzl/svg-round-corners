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
    .map(convertHVToL);
    // .filter(cmd => Object.keys(cmd.values).some(k => cmd.values[k] !== 0)) // remove relative points where all values are zero
  
  // results = removeOverlapped(results);
    
  results = results
    
  if (round) {
    results.forEach((el) => {
      return Object.keys(el.values).forEach(key => 
        el.values[key] = el.values[key] && parseFloat(el.values[key].toFixed(3))
      )}
    )
  }

  return results;
}

export function linkAdjacent(el, index, array) {
  let prev = array[mod(index - 1, array.length)];
  if (prev.marker.toLowerCase() === 'z') {
    prev = array[mod(index - 2, array.length)];
  }
  el.previous = prev;

  let next = array[mod(index + 1, array.length)];

  if (next.marker.toLowerCase() === 'z') {
    next = array[mod(index + 2, array.length)];
  }
  el.next = next;

  console.log('adjacent', el.marker, prev, next);
  return el;
}

export function removeOverlapped(array) {
  const filtered = [array[0]];
  let p = 0;
  let current = array[p];

  // recurse
  function findNext(counter) {
    const testnext = array[counter];
    const overlap = Object.keys(testnext.values)
      .every((key) => {
        const diff = testnext.values[key] - current.values[key];
        // This value less the previous should not be equal zero.
        // If the difference is zero means they are at the same position
        return diff === 0 || isNaN(diff);
      });

    if (overlap) {
      counter = counter + 1;
      if (counter >= array.length - 1) {
        return array.length - 1;
      } else {
        findNext(counter);
      }
    } else {
      return counter;
    }
  }

  while (p < array.length - 1) {
    const nextIndex = findNext(p + 1);
    array[p].next = array[nextIndex];
    current = array[nextIndex];
    filtered.push(current);
    p = nextIndex;
  }

  // last command needs to reference the first one to have a triangle
  filtered[filtered.length - 1].next = filtered[0];
  // filtered[filtered.length - 1].values = filtered[0].values;

  return filtered;
}

export function convertToAbsolute(el, index, arr) {
  // get previous item or last one if its the first coordinate
  // const prev = index < 0 ? arr[arr.length - 1] : arr[index - 1];
  let prev;

  prev = arr[mod(index - 1, arr.length)];
  // if (prev.marker.toLowerCase() === 'z') {
  //   prev = arr[mod(index - 1, arr.length)];
  // }

  // First is always absolute
  // only need to test lowercase (relative) commands
  if (index !== 0 && el.marker === el.marker.toLowerCase()) {
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

  if (el.marker.toLowerCase() === 'z') {
    el.values.x = prev.values.x;
    el.values.y = prev.values.y;
  }

  console.log('absolute', el);
  return el;
}

function newCommand(marker, values) {
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

export function mod(x, m) {
  return (x % m + m) % m;
}

export function convertHVToL(el, index, arr) {
  if (index > 0) {
    const prev = el.previous;
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

export function chunkSubPaths(el, index, arr) {
  return el.marker === 'M' ?
    arr.splice(index, arr.findIndex((el, i) => el.marker === 'M' && i > index)) : false;
}

export function commandsToSvgPath(cmds) {
  return cmds
    .map((cmd) => {
      let d = '';
      if (cmd.marker.toLowerCase() !== 'z') {
        d = Object.keys(cmd.values).map(key => cmd.values[key]).join(',');
      }
      return `\n${cmd.marker} ${d}`;
    })
    .join(' ')
    .trim();
}

export function getAngle(p1, p2) {
  // console.log('getAngle', p1, p2);
  return Math.atan2(p2.x - p1.x, p2.y - p1.y);
}

export function getDistance(p1, p2) {
  // console.log('getDistance', p1, p2);
  const xDiff = p2.x - p1.x;
  const yDiff = p2.y - p1.y;

  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

export function getOppositeLength(angle, hip) {
  // console.log('getOppositeLength', angle, hip);
  return Math.sin(angle) * hip;
}

export function getAdjacentLength(angle, hip) {
  // console.log('getAdjacentLength', angle, hip);
  return Math.cos(angle) * hip;
}

export function getTangentLength(angle, opposite) {
  // console.log('getTangentLength', angle, opposite);
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
