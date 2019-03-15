#!/usr/bin/env node

/**
 * Improvements:
 * - implement error handling for no path provided to command
 * - setup debug option to show missing links
 * - setup folder depth limit option
 * - order links by alphabetical order? find why capital letters come first..?
 * - find possible errors in file path handling
 * - fix html character entity conversion at link retrieval?
 * - write README.md: installation, supported file types, etc.
 * - make it a CLI npm package to install globally (can use https://github.com/yargs/yargs)
 * - change index.js to cli.js + run $ chmod +x cli.js + npm link
 * - fill in package.json https://docs.npmjs.com/files/package.json#bin
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
outputFileName = "dev-tools-&-resources" // debug
dirpath = "/Users/vincentreynaud/Dropbox/Development DCI/tools-&-resources"; // debug
const outputFile = `${outputFileName}.md`;

try {
  print(outputFile, dirpath);
} catch (error) {
  console.error(error);
}
