#What is this about?

This is a small, dependency free, all vanilla library for rounding corners of SVG path's commands.
Currently it rounds corners between straight lines (M, L, H, V, Z). It also converts all commands to the absolute (uppercase) Versions and converts H & V commands to L. 

I'm working on rounding corners between straight lines <--> beziér curves. Unfortunately this is not yet supported.

## Installing

This library is not yet in NPM. It will be released soon! In the meanwhile, you can clone or download it and place it directy into your project.

## API

```
parsePath(pathString)
```
*Parameters*
*pathString: string from the 'd' attribute of a <path> element.

*Returns*
Array containing parsed and normalised (absolute) commands.

```
roundCommands(commandsArray, radius, round)
```
*Parameters*
*commandsArray: parsed commands from a path element, from example the output of parsePath().
*radius: Expected radius of the arcs
*round: number of decimal digits to round each value inside commands

*Returns*
string containing parsed and normalised (absolute) commands.

```
roundCorners(pathString, radius, round)
```
*Parameters*
*pathString: string from the 'd' attribute of a <path> element.
*radius: Expected radius of the arcs
*round: number of decimal digits to round each value inside commands

*Returns*
string containing parsed and normalised (absolute) commands.