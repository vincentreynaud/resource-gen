#!/usr/bin/env node

/**
 * Improvements:
 * - make debug option to show missing links
 * - implement error handling for no path provided to command
 * - order links by alphabetical order? -already done?
 * - find how to search outside of project
 * - make it a CLI npm package to install globally (can use https://github.com/yargs/yargs)
 * - change index.js to cli.js + run $ chmod +x cli.js + npm link
 * - fill in package.json https://docs.npmjs.com/files/package.json#bin
 *
 *
 * Publishing:
 * - generate .md on github
 * - update every X
 * - host with now
 *
 */

"use strict";

const print = require("./lib/print");
let [, , dirpath, ...options] = process.argv;

// dirpath = "/data/sample"; // debug
dirpath = "/Users/vincentreynaud/Dropbox/Development DCI/tools-&-resources"; // debug
const outputFile = "dev-tools-&-resources.md";

try {
  print(outputFile, dirpath);
} catch (err) {
  console.error(err);
}
