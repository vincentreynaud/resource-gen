#!/usr/bin/env node

/**
 * Improvements:
 *
 * 1. Code refractor (software logic)
 *
 * 2. Implement options:
 *   - debug option to show missing links
 *   - folder depth limit option
 *
 * 3. md Rendering:
 *   - write title  of folder with path to it
 *   - print tabs for each sub level
 *   - order links by alphabetical order? find why capital letters come first..?
 *
 * 4. Error handling:
 *   - for no path provided to command
 *   - find possible errors in file path handling
 *
 * 5. Fixes:
 *  - fix html character entity conversion at link retrieval?
 *
 * 6. Write README.md: installation, supported file types, etc.
 *
 * 7. Make it a CLI npm package to install globally (can use https://github.com/yargs/yargs)
 *  - change index.js to cli.js + run $ chmod +x cli.js + npm link
 *  - fill in package.json https://docs.npmjs.com/files/package.json#bin
 *
 * Publishing:
 * - generate .md on github
 * - update every X
 * - host with now
 *
 */

"use strict";

const print = require("./lib/print");
let [, , outputFileName, dirpath, ...options] = process.argv;

// prettier-ignore
dirpath = "/Users/vincentreynaud/Dropbox/Development DCI/tools-&-resources"; // debug
outputFileName = "dev-tools-&-resources"; // debug
// prettier-ignore
dirpath = "/Users/vincentreynaud/Desktop/FILES/WORK/2\ Research/4\ Science\ &\ Tech"; // debug
outputFileName = "research"; // debug
// prettier-ignore
// dirpath = "/Users/vincentreynaud/Desktop/FILES/WORK/1\ Production/1\ COLLECTIVE\ ANXIETY/2\ Research/2\ Anthropocène"; // debug
// prettier-ignore
dirpath = "/Users/vincentreynaud/Desktop/FILES/WORK/1\ Production/1\ COLLECTIVE\ ANXIETY/2\ Research/"; // debug
dirpath = "/Users/vincentreynaud/Dropbox/Development DCI/tools-&-resources";

const outputFile = `output/${outputFileName}.md`;

try {
  print(outputFile, dirpath);
} catch (error) {
  console.error(error);
}
