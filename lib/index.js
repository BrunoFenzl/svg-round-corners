import { getAngle, getOppositeLength, getAdjacentLength, commandsToSvgPath, markOverlapped, shortestSide, roundValues, getPreviousNoZ, getNextNoZ, reverseMarkOverlapped, bsplit, getDistance, getOffset, getTangentNoHyp, newCommands, convertToAbsolute, bezierArc, calculateThirdPoint, findD } from "./utils.js";
import Bezier from 'Bezier-js';
/**
 * Parses the given command string and generates an array of parsed commands.
 * This function normalises all relative commands into absolute commands and
 * transforms h, H, v, V to L commands
 * @param {string} str Raw string from 'd' Attribute
 * @returns {array} Array of normalised commands
 */
function parsePath(str) {
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
    .map(convertToAbsolute);
}

/**
 * Iterates through an array of normalised commands and insert arcs where applicable.
 * This function modifies the array in place.
 * @param {array} _cmds Array with commands to be modified
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {array} Sequence of commands containing arcs in place or corners
 */
function roundCommands(cmds, r, round) {
  let subpaths = [];
  let newCmds = [];

  if (round) {
    cmds.forEach(el => roundValues(el, round));
    // roundValues(cmds, round);
  }

  cmds
    // split sub paths
    .forEach((e, i, a) => {
      if (e.marker === 'M') {
        subpaths.push([]);
      }
      subpaths[subpaths.length - 1].push(e);
    });

  subpaths.forEach((subPathCmds) => {
    subPathCmds
      // We are only excluding lineTo commands that may be overlapping
      .map(markOverlapped);

    reverseMarkOverlapped(subPathCmds, subPathCmds.length - 1);
    
    subPathCmds
      .filter((el) => !el.overlap)
      .map((el, i, arr) => {
        const largeArcFlag = 0;
        const prev = getPreviousNoZ(el, i, arr);
        const next = getNextNoZ(el, i, arr);
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
            if (next.marker === 'L' || next.marker === 'M') {
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

              newCmds.push({
                marker: 'A',
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
            else if (next.marker === 'C') {
              /*
              console.log('angles', anglePrv, angleNxt, degrees);
              // collect coordinates from this C segment
              const xs = [el.values.x, next.values.x1, next.values.x2, next.values.x];
              const ys = [el.values.y, next.values.y1, next.values.y2, next.values.y];

              const pathLength = getArcLength(xs, ys);
              
              // still using coordinates from the original C segment
              const splitted = bsplit(
                [
                  [el.values.x, el.values.y],
                  [next.values.x1, next.values.y1],
                  [next.values.x2, next.values.y2],
                  [next.values.x, next.values.y],
                ],
                (offset / pathLength),
              );

              console.log('totalDistance', offset, pathLength, offset / pathLength, radius);
                
              next.values = {
                x1: splitted[1][1][0],
                y1: splitted[1][1][1],
                x2: splitted[1][2][0],
                y2: splitted[1][2][1],
                x: splitted[1][3][0],
                y: splitted[1][3][1]
              }

              const splitEnd = {
                x: splitted[0][3][0],
                y: splitted[0][3][1],
              }

              const angleNewNext = getAngle(el.values, splitEnd);

              const l = Math.sqrt(
                Math.pow(splitEnd.x - el.values.x, 2) + 
                Math.pow(splitEnd.y - el.values.y, 2)
              );

              const yp = (radius * (el.values.y - splitEnd.y)) / l
              const xp = (radius * (splitEnd.x - el.values.x)) / l

              const y3 = splitEnd.y + yp;
              const x3 = splitEnd.x + xp;

              console.log('xy3', x3, y3);

              const arcPoints = bezierArc(anglePrv, angleNewNext, {x: x3, y: y3}, radius);
              
              console.log((anglePrv - angleNewNext) * (180/Math.PI));
              */
              const distancePrev = getDistance(el.values, prev.values);
              const tempOffset = Math.min(r, distancePrev / 2);
              const maxRadius = Math.abs(getTangentNoHyp(anglePrv, tempOffset));

              const b = new Bezier(
                { x: el.values.x, y: el.values.y },
                { x: next.values.x2, y: next.values.y2 },
                { x: next.values.x, y: next.values.y },
              );
              const length = b.length();
              const cut = b.get(tempOffset/length);
              const splitted = b.split(tempOffset/length);

              console.log('el', b, length);

              // const angleNxt = getAngle(el.values, {
              //   x: splitted.right.points[0].x,
              //   y: splitted.right.points[0].y,
              // });

              // const angle = angleNxt - anglePrv; // radians
              // const o = getOffset(angle, tempOffset);
              
              const prevPoint = [
                el.values.x + getOppositeLength(anglePrv, tempOffset),
                el.values.y + getAdjacentLength(anglePrv, tempOffset)
              ];
              
              // there only need to be a curve if and only if the next marker is a corner
              newCmds.push({
                marker: el.marker,
                values: {
                  x: parseFloat(prevPoint[0].toFixed(3)),
                  y: parseFloat(prevPoint[1].toFixed(3)),
                }
              });

              newCmds.push({
                marker: 'C',
                values: {
                  x1: splitted.left.points[0].x,
                  y1: splitted.left.points[0].y,
                  x2: splitted.left.points[1].x,
                  y2: splitted.left.points[1].y,
                  x: splitted.left.points[2].x,
                  y: splitted.left.points[2].y,
                },
              });

              next.values = {
                x1: splitted.right.points[0].x,
                y1: splitted.right.points[0].y,
                x2: splitted.right.points[1].x,
                y2: splitted.right.points[1].y,
                x: splitted.right.points[2].x,
                y: splitted.right.points[2].y,
              }
              
              // next.values = {
              //   x1: b.points[0].x,
              //   y1: b.points[0].y,
              //   x2: b.points[1].x,
              //   y2: b.points[1].y,
              //   x: b.points[2].x,
              //   y: b.points[2].y,
              // }

            } 
            else {
              // newCmds.push({ marker: el.marker, values: el.values });
            }
            break;
          // case 'H': // horizontalTo x. Transformed to L in utils
          // case 'V': // verticalTo y. Transformed to L in utils
          case 'C': // cubic beziér: x1 y1, x2 y2, x y
            if (next.marker === 'L' || next.marker === 'M') {
              /*
              const b = new Bezier(
                { x: el.values.x, y: el.values.y },
                { x: next.values.x1, y: next.values.y1 },
                { x: next.values.x2, y: next.values.y2 },
                { x: next.values.x, y: next.values.y },
              );
              const length = b.length();
              const splitted = b.split(offset/length);
  
              next.values = {
                x1: splitted.right.points[1].x,
                y1: splitted.right.points[1].y,
                x2: splitted.right.points[2].x,
                y2: splitted.right.points[2].y,
                x: splitted.right.points[3].x,
                y: splitted.right.points[3].y,
              }
  
              newCmds.push({
                marker: 'C',
                values: {
                  x1: splitted.left.points[1].x,
                  y1: splitted.left.points[1].y,
                  x2: splitted.left.points[2].x,
                  y2: splitted.left.points[2].y,
                  x: splitted.left.points[3].x,
                  y: splitted.left.points[3].y,
                },
              });
              */
              newCmds.push({ marker: el.marker, values: el.values });
            } else {
              newCmds.push({ marker: el.marker, values: el.values });
            }
            break;
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

/**
 * This is a shorthand for parsePath() and roundCommands().
 * You get the end result in one function call.
 * @param {string} str Raw string with commands from the path element
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {string} New commands sequence with rounded corners 
 */
function roundCorners(str, r, round) {
  return roundCommands([...parsePath(str)], r, round);
}

export {
  parsePath,
  roundCommands,
  roundCorners,
}