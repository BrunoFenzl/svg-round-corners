import { pathParser, getAngle, getTangentLength, getOppositeLength, getAdjacentLength, commandsToSvgPath, removeOverlapped, shortestSide, roundValues, getPreviousDiff, getNextDiff, removeLastCmdIfOverlapped, bsplit, getDistance, getOffset, getTangentNoHyp } from "./utils.js";

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
      // We are only excluding lineTo commands that may be overlapping
      .map(removeOverlapped);

    removeLastCmdIfOverlapped(subPathCmds, subPathCmds.length - 1);
    
    subPathCmds
      .filter((el) => !el.overlap)
      .map((el, i, arr) => {
        const largeArcFlag = 0;
        const prev = getPreviousDiff(el, i, arr);
        const next = getNextDiff(el, i, arr);
        const anglePrv = getAngle(el.values, prev.values);
        const angleNxt = getAngle(el.values, next.values);
        const angle = angleNxt - anglePrv; // radians
        const degrees = angle * (180/Math.PI);

        // prevent arc crossing the next command
        const shortest = shortestSide(el, prev, next);
        
        const maxRadius = Math.abs(getTangentNoHyp(angle / 2, shortest / 2));
        
        const radius = Math.min(r, maxRadius);

        const o = getOffset(angle, radius);
        const offset = o.offset;
        const sweepFlag = o.sweepFlag;
        
        switch (el.marker) {
          case 'M': // moveTo x,y
          case 'L': // lineTo x,y
            const prevPoint = [
              el.values.x + getOppositeLength(anglePrv, offset),
              el.values.y + getAdjacentLength(anglePrv, offset)
            ];
            
            const nextPoint = [
              el.values.x + getOppositeLength(angleNxt, offset),
              el.values.y + getAdjacentLength(angleNxt, offset)
            ];

            // there only need be a curve if and only if the next marker is a corner
            newCmds.push({
              marker: el.marker,
              values: {
                x: parseFloat(prevPoint[0].toFixed(3)),
                y: parseFloat(prevPoint[1].toFixed(3)),
              }
            });

            if (next.marker === 'L' || next.marker === 'M') {  
              newCmds.push({
                marker: 'A',
                degrees: degrees.toFixed(3),
                radius: radius,
                values: {
                  radiusX: radius,
                  radiusY: radius,
                  rotation: degrees,
                  largeArc: largeArcFlag,
                  sweep: sweepFlag,
                  x: parseFloat(nextPoint[0].toFixed(3)),
                  y: parseFloat(nextPoint[1].toFixed(3)),
                },
              });
            } 
            /*
            else if (next.marker === 'C') {
              const totalDistance = getDistance(
                { x:el.values.x, y: el.values.y },
                { x:next.values.x, y: next.values.y }
              );

              const p = offset / totalDistance;
              const splitted = bsplit(
                [
                  [el.values.x, el.values.y],
                  [next.values.x1, next.values.y1],
                  [next.values.x2, next.values.y2],
                  [next.values.x, next.values.y]
                ],
                p
              )[1];

              next.values = {
                x1: splitted[1][0],
                y1: splitted[1][1],
                x2: splitted[2][0],
                y2: splitted[2][1],
                x: splitted[3][0],
                y: splitted[3][1]
              }

              newCmds.push({
                marker: 'A',
                degrees: degrees.toFixed(3),
                values: {
                  radiusX: r,
                  radiusY: r,
                  rotation: degrees,
                  largeArc: largeArcFlag,
                  sweep: sweepFlag,
                  x: splitted[0][0],
                  y: splitted[0][1],
                },
              });

            } 
            else {
              newCmds.push({ marker: el.marker, values: el.values });
            }
         */
            break;
          case 'C': // cubic beziér: x1 y1, x2 y2, x y
          case 'H': // horizontal to x. Transformed to L in utils
          case 'V': // vertical to y. Transformed to L in utils
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

    return {
      path: commandsToSvgPath(newCmds),
      commands: newCmds
    };
}