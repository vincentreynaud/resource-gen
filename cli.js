#!/usr/bin/env node

/**
 * Improvements:
 * - checkout markdown-magic
 * - make debug option to show missing links
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
  print(dirpath);
} catch (err) {
  console.error(err);
}
