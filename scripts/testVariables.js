
const pathSquare = `
m 200, 200
l 0, 50
l 50, 0
l 0, -50
l -50, 0
z
`;
/* 
…in absolute commands:
M 200, 200
L 200, 250
L 250, 250
L 250, 200
L 200, 200
Z
*/

const commandsSquare = [
  { marker: 'M', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 250 } },
  { marker: 'L', values: { x: 250, y: 250 } },
  { marker: 'L', values: { x: 250, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 } },
  { marker: 'Z', values: { x: null, y: null } },
];

const absOverlapped = [
  { marker: 'M', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 250 } },
  { marker: 'L', values: { x: 250, y: 250 } },
  { marker: 'L', values: { x: 250, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 } },
  { marker: 'Z', values: { x: null, y: null } },
];

const absNoOverlap = [
  { marker: 'M', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 250 } },
  { marker: 'L', values: { x: 250, y: 250 } },
  { marker: 'L', values: { x: 250, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 }, overlap: true },
  { marker: 'L', values: { x: 200, y: 200 }, overlap: true },
  { marker: 'L', values: { x: 200, y: 200 }, overlap: true },
  { marker: 'Z', values: { x: null, y: null } },
];

const absLatestNoOverlap = [
  { marker: 'M', values: { x: 200, y: 200 } },
  { marker: 'L', values: { x: 200, y: 250 } },
  { marker: 'L', values: { x: 250, y: 250 } },
  { marker: 'L', values: { x: 250, y: 200 } },
  { marker: 'L', values: { x: 200, y: 200 }, overlap: true },
  { marker: 'Z', values: { x: null, y: null } },
];

export default {
  pathSquare,
  commandsSquare,
  absOverlapped,
  absNoOverlap,
  absLatestNoOverlap,
}