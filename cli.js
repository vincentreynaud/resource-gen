#!/usr/bin/env node

/**
 * Improvements:
 *
 * 1. Code refractor (software logic)
 *
 * 2. Implement options:
 *   - debug option to show missing links
 *   - folder depth limit option
 *   - file description option
 *
 * 3. Write README.md: installation, supported file types, etc.
 *   - list of unhhandled filepaths
 *
 * 4. md Rendering:
 *   - write title of folder with path to it
 *   - print tabs for each sub level
 *   - order links by alphabetical order? find why capital letters come first..?
 *
 * 5. Error handling:
 *   - for no path provided to command
 *   - find possible errors in file path handling
 *
 * 6. Fixes:
 *  - fix html character entity conversion at link retrieval?
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
const [, , outputFileName, dirpath, ...options] = process.argv;

// prettier-ignore
// npm start dev-tools-and-resources /Users/vincentreynaud/Dropbox/Development\ DCI/tools-and-resources

// prettier-ignore
// dirpath = "/Users/vincentreynaud/Desktop/FILES/WORK/1\ Production/1\ COLLECTIVE\ ANXIETY/2\ Research/";

const outputFile = `output/${outputFileName}.md`;

try {
  print(outputFile, dirpath);
} catch (error) {
  console.error(error);
}
