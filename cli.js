#!/usr/bin/env node

/**
 * Improvements:
 *
 * 1. Code refractor (software logic):
 *   - draw a shema of the program's logic
 *
 * 2. Features:
 *   - find how to generate resource from chrome/firefox favorites
 *   - file description option
 *   - folder ignore option
 *
 * 3. Write README.md: installation, supported file types, etc.
 *   - list of unhhandled filepaths
 *
 * 4. md Rendering:
 *   - print tabs for each sub level
 *   - order links by alphabetical order? find why capital letters come first..?
 *
 * 5. Error handling:
 *   - for no path provided to command
 *   - find possible errors in file path handling
 *
 * 6. Fixes: none
 *
 * 7. Make it a CLI npm package to install globally
 *  - change index.js to cli.js + run $ chmod +x cli.js + npm link
 *  - fill in package.json https://docs.npmjs.com/files/package.json#bin
 *  - generate resource every x to keep folder changes updated. server + now
 *
 */

"use strict";

const print = require("./lib/print");
const [, , outputFileName, dirpath, ...options] = process.argv;

// prettier-ignore
// npm start dev-tools-and-resources /Users/vincentreynaud/Dropbox/Development\ DCI/tools-and-resources

const outputFile = `output/${outputFileName}.md`;

try {
  print(outputFile, dirpath, options);
} catch (error) {
  console.error(error);
}
