import { pathParser, getDistance, getAngle, getTangentLength, getOppositeLength, getAdjacentLength, commandsToSvgPath, linkAdjacent, mod, chunkSubPaths, removeOverlapped, addMaxRadius, convertHVToL, roundValues, convertToAbsolute, removeLastCmdIfOverlapped, getPreviousDiff, getNextDiff } from "./utils.js";

export function roundCorners(string, r, round) {
  // create specific commands
  let cmds = [...pathParser(string)];
  let subpaths = [];
  let newCmds = [];
  cmds
    // split sub and compound paths
    .forEach((e, i, a) => {
      if (e.marker === 'M') {
        subpaths.push([]);
      }
      subpaths[subpaths.length - 1].push(e);
    });
  
  if (round) {
    roundValues(cmds, round);
  }

  subpaths.forEach((subPathCmds) => {
    subPathCmds
      // We are only excluding lineTo commands that may be
      // overlapping or having really, really near coordinates
      .map(removeOverlapped);
    removeLastCmdIfOverlapped(subPathCmds);
      // .map(linkAdjacent)
      // .map(convertHVToL)
    subPathCmds
      .filter((el) => !el.overlap)
      .map(addMaxRadius)
      .map((el, i, arr) => {
        const largeArcFlag = 0;

        console.log('el', el);
        const prev = getPreviousDiff(el, i, arr);
        const next = getNextDiff(el, i, arr);

        if (next.marker === 'Z') {
          console.log('next Z', el);
        }

        const anglePrv = getAngle(el.values, prev.values);
        const angleNxt = getAngle(el.values, next.values);
        
        const angle = angleNxt - anglePrv; // radians
        const degrees = angle * (180/Math.PI); // degrees

        let offset;
        let sweepFlag = 0;
        
        // prevent arc crossing the next command
        if (r >= el.maxRadius) {
          r = el.maxRadius;
        }

        if ( degrees <= -270 || (degrees > 0 && degrees <= 90) ) { // sharp angles
          offset = getTangentLength(angle/2, r);
          if (offset === Infinity) {
            offset = r;
          }
          sweepFlag = 1;
        } else if ( (degrees > -270 && degrees <= 0) || degrees > 90 ) { // obtuse angles
          offset = getTangentLength(angle/2, -r );
          if (offset === -Infinity) {
            offset = -r;
          }
        }
        
        const prevPoint = [
          el.values.x + getOppositeLength(anglePrv, offset),
          el.values.y + getAdjacentLength(anglePrv, offset)
        ];
        
        // console.log(el, next);

        const nextPoint = [
          el.values.x + getOppositeLength(angleNxt, offset),
          el.values.y + getAdjacentLength(angleNxt, offset)
        ];
        
        // console.log(el, degrees, prevPoint, nextPoint);
        
        switch (el.marker) {
          case 'M': // moveTo x,y
          case 'L': // lineTo x,y
            newCmds.push({
              marker: el.marker,
              values: {
                x: parseFloat(prevPoint[0].toFixed(3)),
                y: parseFloat(prevPoint[1].toFixed(3)),
              }
            });
            
            // there only need be a curve if and only if the next marker is a corner
            if (next.marker === 'L' || next.marker === 'M') {
              newCmds.push({
                marker: 'A',
                values: {
                  radiusX: r,
                  radiusY: r,
                  rotation: degrees,
                  largeArc: largeArcFlag,
                  sweep: sweepFlag,
                  x: parseFloat(nextPoint[0].toFixed(3)),
                  y: parseFloat(nextPoint[1].toFixed(3)),
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
    })
    console.log('newCmds', newCmds);
    const newCommands = commandsToSvgPath(newCmds);
    return newCommands;
}