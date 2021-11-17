export interface SVGCommand {
  marker: string
  values?: { [key: string]: number }
  overlap?: boolean
}

/**
 * Parses the given command string and generates an array of parsed commands.
 * This function normalises all relative commands into absolute commands and
 * transforms h, H, v, V to L commands
 * @param {string} str Raw string from 'd' Attribute
 * @returns {array} Array of normalised commands
 */
export function parsePath(str: string): SVGCommand[]

/**
 * Iterates through an array of normalised commands and insert arcs where applicable.
 * This function modifies the array in place.
 * @param {array} _cmds Array with commands to be modified
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {array} Sequence of commands containing arcs in place of corners
 */
export function roundCommands(cmds: SVGCommand[], r: number, round?: number): { path: string; commands: SVGCommand[] }

/**
 * This is a shorthand for parsePath() and roundCommands().
 * You get the end result in one function call.
 * @param {string} str Raw string with commands from the path element
 * @param {number} r Expected radius of the arcs.
 * @param {number} round Number of decimal digits to round values
 * @returns {array} New commands sequence with rounded corners
 */
export function roundCorners(str: string, r: number, round?: number): { path: string; commands: SVGCommand[] }
