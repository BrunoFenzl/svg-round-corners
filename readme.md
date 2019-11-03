#What is this about?

This is a small, dependency free, all vanilla library for rounding corners of SVG path's commands.
Currently it rounds corners between straight lines (M, L, H, V, Z). It also converts all commands to the absolute (uppercase) Versions and converts H & V commands to L. 

I'm working on rounding corners between straight lines <--> beziér curves. Unfortunately this is not yet supported.

## Installing

To use this library run `npm install svgRoundCorners` with your terminal of choice inside your project's root folder. When successfully installed, you should be able to import the library for example like this:

```
import { parsePath, roundCommands, roundCorners } from 'svgRoundCorners';
```

## API

```
parsePath(pathString)
```
**Parameters**
* pathString: String from the 'd' attribute of a <path> element.

**Returns**
Array containing parsed and normalised (absolute) commands.

```
roundCommands(commandsArray, radius, round)
```
**Parameters**
* commandsArray: Parsed commands from a path element, from example the output of parsePath().
* radius: Expected radius of the arcs
* round: Number of decimal digits to round each value inside commands

**Returns**
String containing parsed and normalised (absolute) commands.

```
roundCorners(pathString, radius, round)
```
**Parameters**
* pathString: String from the 'd' attribute of a <path> element.
* radius: Expected radius of the arcs
* round: Number of decimal digits to round each value inside commands

**Returns**
String containing parsed and normalised (absolute) commands.