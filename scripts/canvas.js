import { pathParser, getDistance, getAngle, getTangentLength, getOppositeLength, getAdjacentLength, commandsToSvgPath, linkAdjacent, mod } from "./utils.js";

export default class Canvas {
  constructor(el) {
    this.canvas = document.getElementsByTagName('svg')[0];
    this.el = el
    this.originalPath = el.getAttribute('d');
    this.calculatePath(15);
    this.minOffset = 10;
  }

  /*
  calculatePath(r) {
    let cmds = [...pathParser(this.originalPath, true)];
    let newCmds = [];
    cmds
      // .filter(cmd => cmd.marker !== 'Z') // remove Z command
      .filter((el, i, arr) => { // filter out adjacent points with same values
        const nxt = i < arr.length - 1 ? arr[i + 1] : arr[0];
        // x or y needs to be different than the next one
        return el.values.x !== nxt.values.x || el.values.y !== nxt.values.y;
      })
      .map((item, index, arr) => {
        if (index === 0) { // first command
          item.first = true;
          item.prev = arr[arr.length - 1];
          item.next = arr[index + 1];
        } else if (index === arr.length - 1) { // last command
          item.last = true;
          item.prev = arr[index - 1];
          item.next = arr[0];
        } else { // all others
          item.prev = arr[index - 1];
          item.next = arr[index + 1];
        }

        const nxtSide = getDistance({
          x: item.values.x,
          y: item.values.y,
        },
        {
          x: item.next.values.x,
          y: item.next.values.y,
        }) / 2; // half way through between both points

        const prvSide = getDistance({
          x: item.values.x,
          y: item.values.y,
        },
        {
          x: item.prev.values.x,
          y: item.prev.values.y,
        }) / 2; // half way through between both points

        item.maxRadius = Math.min(prvSide, nxtSide);
        return item;
      })
      .map((item) => {
        let prevPoint;
        let nextPoint;
        let largeArcFlag;
        let sweepFlag;

        let prv = item.prev;
        let nxt = item.next;

        const anglePrv = getAngle(item.values, prv.values);
        const angleNxt = getAngle(item.values, nxt.values);

        let angle = angleNxt - anglePrv;

        let offset;

        // prevent arc crossing the next command
        if (r >= item.maxRadius) {
          r = item.maxRadius;
        }

        if (Math.abs(angle) > Math.PI * 1.5) { // > 270°
          angle = Math.PI * 2 - Math.abs(angle);
        }

        if (Math.abs(angle) < Math.PI/4 ) {
          offset = getTangentLength(angle/2, r );
          largeArcFlag = 0;
          sweepFlag = 1;
        } else {
          offset = getTangentLength(angle/2, -r);
          largeArcFlag = 0;
          sweepFlag = 0;
        }

        prevPoint = [
          item.values.x + getOppositeLength(anglePrv, offset),
          item.values.y + getAdjacentLength(anglePrv, offset)
        ];

        nextPoint = [
          item.values.x + getOppositeLength(angleNxt, offset),
          item.values.y + getAdjacentLength(angleNxt, offset)
        ];

        switch (item.marker) {
          case 'M': // move to x,y
          case 'L': // line to x,y
            newCmds.push({
              marker: item.marker,
              values: {
                x: prevPoint[0],
                y: prevPoint[1],
              }
            });
            // there only need be a curve if and only if the next marker is a corner
            if (item.next.marker === 'L' || item.next.marker === 'M') {
              newCmds.push({
                marker: 'A',
                values: {
                  radiusX: r,
                  radiusY: r,
                  rotation: angle * (180/Math.PI),
                  largeArc: largeArcFlag,
                  sweep: sweepFlag,
                  x: nextPoint[0],
                  y: nextPoint[1],
                },
              });
            }
            break;
          case 'H': // horizontal to x
            // transformed to L in utils
            break;
          case 'V': // vertical to y
            // transformed to L in utils
            break;
          case 'C': // cubic beziér: x1 y1, x2 y2, x y
          case 'S': // short beziér: x2 y2, x y
          case 'Q': // quadratic beziér: x1 y1, x y
          case 'T': // short quadratic beziér: x y
          case 'A': // arc: rx ry x-axis-rotation large-arc-flag sweep-flag x y
          case 'Z': // close path
            newCmds.push(item);
            break;
        }
      }
    );
    this.el.setAttribute('d', commandsToSvgPath(newCmds));
  }
  */
}

export function roundCorners(string, r) {
  // create specific commands
  let cmds = [...pathParser(string, true)];
  let subpaths = [];
  let newCmds = [];
  
  cmds
    .filter((el, index, array) => {
      let next = array[mod(index + 1, array.length)];

      if (next.marker.toLowerCase() === 'z') {
        next = array[mod(index + 2, array.length)];
      }
      
      return Object.keys(el.values).some((key) => {
        if (el.marker.toLowerCase() === 'z') {
          return true;
        } else {
          console.log(el.marker, key, Math.abs(next.values[key] - el.values[key]) > parseInt(r));
          return Math.abs(next.values[key] - el.values[key]) !== 0; parseInt(r);
        }
      })
    })
    .map(linkAdjacent)
    .map(el => {
      console.log('filtered el', el);
      return el;
    })
    .map((el, index, arr) => {
      if (index === 0) { // first command
        el.first = true;
      } else if (index === arr.length - 1) { // last command
        el.last = true;
      }
      
      const nxtSide = getDistance({
        x: el.values.x,
        y: el.values.y,
      },
      {
        x: el.next.values.x,
        y: el.next.values.y,
      }) / 2; // half way through between both points

      const prvSide = getDistance({
        x: el.values.x,
        y: el.values.y,
      },
      {
        x: el.previous.values.x,
        y: el.previous.values.y,
      }) / 2; // half way through between both points

      el.maxRadius = Math.min(prvSide, nxtSide) / 2;
      return el;
    })
    .map((el) => {
      const largeArcFlag = 0;
      let prevPoint;
      let nextPoint;
      let sweepFlag;

      let prv = el.previous;
      let nxt = el.next;

      const anglePrv = getAngle(el.values, prv.values);
      const angleNxt = getAngle(el.values, nxt.values);
      
      let angle = angleNxt - anglePrv;
      
      let offset;
      
      // prevent arc crossing the next command
      if (r >= el.maxRadius) {
        r = el.maxRadius || r;
      }

      if (Math.abs(angle) > Math.PI * 1.5) { // > 270°
        angle = Math.PI * 2 - Math.abs(angle);
      }

      if (Math.abs(angle) < Math.PI/4 ) {
        offset = getTangentLength(angle/2, r );
        // largeArcFlag = 0;
        sweepFlag = 1;
      } else {
        offset = getTangentLength(angle/2, -r);
        // largeArcFlag = 0;
        sweepFlag = 0;
      }

      prevPoint = [
        el.values.x + getOppositeLength(anglePrv, offset),
        el.values.y + getAdjacentLength(anglePrv, offset)
      ];
      
      nextPoint = [
        el.values.x + getOppositeLength(angleNxt, offset),
        el.values.y + getAdjacentLength(angleNxt, offset)
      ];

      switch (el.marker.toUpperCase()) {
        case 'M': // moveTo x,y
        case 'L': // lineTo x,y
          newCmds.push({
            marker: el.marker,
            values: {
              x: prevPoint[0],
              y: prevPoint[1],
            }
          });
          // there only need be a curve if and only if the next marker is a corner
          if (el.next.marker.toUpperCase() === 'L' || el.next.marker.toUpperCase() === 'M') {
            newCmds.push({
              marker: 'A',
              values: {
                radiusX: r,
                radiusY: r,
                rotation: angle * (180/Math.PI),
                largeArc: largeArcFlag,
                sweep: sweepFlag,
                x: nextPoint[0],
                y: nextPoint[1],
              },
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
        case 'Z': // close path
          newCmds.push({ marker: el.marker, values: el.values });
          break;
      }
    });
  const newCommands = commandsToSvgPath(newCmds);
  return newCommands;
/*
    // convert to absolute coordinates
    .map(convertToAbsolute)
    // convert unidimensionals (h,v) to lineTo
    .map(convertHVToL)
    // remove duplicated adjacent coordinates (L, Z)
    .filter(removeOverlapped)
    // split array into subpath arrays (everything between a mM and the next mM or zZ)
    .filter(chunkSubPaths)
*/
    // calculate rounded corners
      // get previous and next coordinates. save them in cmd
      // set max radius for point, save it in cmd
      // get angle between previous, current an next coordinates. save them in cmd
      // add cC between adjacent non equal lL
    // parse commands back into string and return
}