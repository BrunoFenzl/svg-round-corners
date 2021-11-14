# What is this about?

This is a small, dependency free, all vanilla library for rounding corners of SVG path's commands.
Currently it rounds corners between straight lines (M, L, H, V, Z). It also converts all commands to the absolute (uppercase) versions and converts H & V commands to L. 

I'm working on rounding corners between straight lines <--> beziér curves. Unfortunately this is not yet supported.

An interactive example can be found at [brunofenzl.github.io/svg-round-corners/](https://brunofenzl.github.io/svg-round-corners/)

## Installing

To use this library, run `npm install svg-round-corners` with your terminal of choice inside your project's root folder. When successfully installed, you should be able to import the library like this:

```js
import { parsePath, roundCommands, roundCorners } from 'svg-round-corners';
```

or as a CommonJS module:

```js
const { parsePath, roundCommands, roundCorners } = require('svg-round-corners');
```

## API

### parsePath()

```
parsePath(pathString)
```
**Parameters**

* pathString: String from the 'd' attribute of a <path> element.

**Returns**

Array containing parsed and normalised (absolute) commands.

**Example**
```js
const { parsePath } = require('svg-round-corners');
const path = 'm216.1042,78.4l0,49.49112l49.21308,0l0,-49.49112l-49.21308,0z';
parsePath(path);

/*
  [
    { marker: 'M', values: { x: 216.1, y: 78.4 } },
    { marker: 'L', values: { x: 216.1, y: 127.89 } },
    { marker: 'L', values: { x: 265.32, y: 127.89 } },
    { marker: 'L', values: { x: 265.32, y: 78.4 } },
    { marker: 'L', values: { x: 216.1, y: 78.4 }, overlap: true },
    { marker: 'Z', values: { x: 216.1, y: 78.4 } }
  ]
*/
```

### roundCommands()
```
roundCommands(commandsArray, radius, round)
```
**Parameters**

* commandsArray: Parsed commands from a path element, from example the output of parsePath().
* radius: Expected radius of the arcs in pixel values.
* round (optional): Number of decimal digits to round each value inside commands. Defaults to false.

**Returns**
Object containing transformed path as a string and an array with all commands

**Example**
```js
const { roundCommands } = require('svg-round-corners');
const cmds = [
  { marker: 'M', values: { x: 216.1, y: 78.4 } },
  { marker: 'L', values: { x: 216.1, y: 127.89 } },
  { marker: 'L', values: { x: 265.32, y: 127.89 } },
  { marker: 'L', values: { x: 265.32, y: 78.4 } },
  { marker: 'L', values: { x: 216.1, y: 78.4 }, overlap: true },
  { marker: 'Z', values: { x: 216.1, y: 78.4 } }
];
roundCommands(cmds, 10, 2);

/*
{
  "path": "M226.1,78.4A10,10,-90,0,0,216.1,88.4L216.1,117.89A10,10,-90,0,0,226.1,127.89L255.32,127.89A10,10,270,0,0,265.32,117.89L265.32,88.4A10,10,-90,0,0,255.32,78.4Z",
  "commands": [
    { "marker": "M", "values": { "x": 226.1, "y": 78.4 } },
    {
      "marker": "A",
      "degrees": "-90.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": -90,
        "largeArc": 0,
        "sweep": 0,
        "x": 216.1,
        "y": 88.4
      }
    },
    { "marker": "L", "values": { "x": 216.1, "y": 117.89 } },
    {
      "marker": "A",
      "degrees": "-90.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": -90,
        "largeArc": 0,
        "sweep": 0,
        "x": 226.1,
        "y": 127.89
      }
    },
    { "marker": "L", "values": { "x": 255.32, "y": 127.89 } },
    {
      "marker": "A",
      "degrees": "270.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": 270,
        "largeArc": 0,
        "sweep": 0,
        "x": 265.32,
        "y": 117.89
      }
    },
    { "marker": "L", "values": { "x": 265.32, "y": 88.4 } },
    {
      "marker": "A",
      "degrees": "-90.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": -90,
        "largeArc": 0,
        "sweep": 0,
        "x": 255.32,
        "y": 78.4
      }
    },
    { "marker": "Z", "values": { "x": 216.1, "y": 78.4 } }
  ]
}
*/
```

### roundCorners()

```
roundCorners(pathString, radius, round)
```

This is a shortcut combining both functions parsePath and roundCommands. It's the same as writing for example:

```
roundCommands([...parsePath(str)], 10, 2);
```

**Parameters**

* pathString: String from the 'd' attribute of a <path> element.
* radius: Expected radius of the arcs in pixel values.
* round (optional): Number of decimal digits to round each value inside commands. Defaults to false.

**Returns**
String containing parsed and normalised (absolute) commands.

**Example**
```js
const { roundCorners } = require('svg-round-corners');
const path = 'm216.1042,78.4l0,49.49112l49.21308,0l0,-49.49112l-49.21308,0z';
roundCorners(path, 10, 2);

/*
{
  "path": "M226.1,78.4A10,10,-90,0,0,216.1,88.4L216.1,117.89A10,10,-90,0,0,226.1,127.89L255.32,127.89A10,10,270,0,0,265.32,117.89L265.32,88.4A10,10,-90,0,0,255.32,78.4Z",
  "commands": [
    { "marker": "M", "values": { "x": 226.1, "y": 78.4 } },
    {
      "marker": "A",
      "degrees": "-90.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": -90,
        "largeArc": 0,
        "sweep": 0,
        "x": 216.1,
        "y": 88.4
      }
    },
    { "marker": "L", "values": { "x": 216.1, "y": 117.89 } },
    {
      "marker": "A",
      "degrees": "-90.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": -90,
        "largeArc": 0,
        "sweep": 0,
        "x": 226.1,
        "y": 127.89
      }
    },
    { "marker": "L", "values": { "x": 255.32, "y": 127.89 } },
    {
      "marker": "A",
      "degrees": "270.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": 270,
        "largeArc": 0,
        "sweep": 0,
        "x": 265.32,
        "y": 117.89
      }
    },
    { "marker": "L", "values": { "x": 265.32, "y": 88.4 } },
    {
      "marker": "A",
      "degrees": "-90.000",
      "radius": 10,
      "values": {
        "radiusX": 10,
        "radiusY": 10,
        "rotation": -90,
        "largeArc": 0,
        "sweep": 0,
        "x": 255.32,
        "y": 78.4
      }
    },
    { "marker": "Z", "values": { "x": 216.1, "y": 78.4 } }
  ]
}
*/
```
