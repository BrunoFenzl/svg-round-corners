import { pathParser, getDistance, getAngle, getTangentLength, getOppositeLength, getAdjacentLength, commandsToSvgPath, linkAdjacent, mod, chunkSubPaths, removeOverlapped, addMaxRadius, convertHVToL } from "./utils.js";

export function roundCorners(string, r) {
  // create specific commands
  let cmds = [...pathParser(string, true)];
  let subpaths = [];
  let newCmds = [];
  
  // split sub and compound paths
  cmds.forEach((e, i, a) => {
    if (e.marker.toUpperCase() === 'M') {
      subpaths.push([]);
    }
    subpaths[subpaths.length - 1].push(e);
  });

  subpaths.forEach((subPathCmds) => {
    subPathCmds
      // We are only looking for lineTo commands that may be
      // overlapping or having really, really near coordinates
      .filter(removeOverlapped)
      .map(linkAdjacent)
      .map(convertHVToL)
      .map(addMaxRadius)
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
          angle = Math.PI * 2 - Math.abs(angle); // flip side with 180°
        }
        const degreeAngle = angle * (180/Math.PI);
/*
        if (degreeAngle <= -270 ) {
          offset = getTangentLength(angle/2, r );
          sweepFlag = 1;
          // console.log(`${degreeAngle} <= -270`);
        } else if (degreeAngle > -270 && degreeAngle < -90 ) {
          offset = getTangentLength(angle/2, -r );
          sweepFlag = 0;
          // console.log(`-270 < ${degreeAngle} < -90`);
        } else if (degreeAngle === -90) {
          offset = getTangentLength(angle/2, -r); // obtuse angle
          sweepFlag = 0;
          // console.log(`${degreeAngle} === -90`);
        } else if (degreeAngle > -90 && degreeAngle <= 0) {
          offset = getTangentLength(angle/2, -r);
          sweepFlag = 0;
          // console.log(`-90 < ${degreeAngle} <= 0`);
        } else if (degreeAngle > 0 && degreeAngle < 90) {
          offset = getTangentLength(angle/2, r );
          sweepFlag = 1;
          // console.log(`0 < ${degreeAngle} < 90`);
        } else if (degreeAngle === 90) {
          offset = getTangentLength(angle/2, r); // obtuse angle
          sweepFlag = 1;
          // console.log(`${degreeAngle} === 90`);
        } else if (degreeAngle > 90 && degreeAngle < 270) {
          offset = getTangentLength(angle/2, -r); // obtuse angle
          sweepFlag = 0;
          // console.log(`90 < ${degreeAngle} < 270`);
        } else {
          offset = getTangentLength(angle/2, -r); // obtuse angle
          sweepFlag = 0;
          // console.log(`270 <= ${degreeAngle}`);
        }
*/

        if ( degreeAngle <= -270 || (degreeAngle > 0 && degreeAngle <= 90) ) {
          offset = getTangentLength(angle/2, r );
          sweepFlag = 1;
        } else if ( (degreeAngle > -270 && degreeAngle <= 0) || degreeAngle > 90 ) {
          offset = getTangentLength(angle/2, -r );
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
                x: parseFloat(prevPoint[0].toFixed(3)),
                y: parseFloat(prevPoint[1].toFixed(3)),
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
    const newCommands = commandsToSvgPath(newCmds);
    console.log(cmds, newCmds);
    return newCommands;
}