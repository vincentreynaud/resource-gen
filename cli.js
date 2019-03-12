#!/usr/bin/env node

/**
 * Improvements:
 * - checkout markdown-magic
 * - Capitalise section titles
 * - order links by alphabetical order? -already done?
 * - find how to search outside of project
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

("use strict");

const print = require("./lib/print");
const [, , dirpath, ...options] = process.argv;

// error handling for no path provided

console.log("process.cwd", process.cwd());

try {
  print(dirpath);
} catch (err) {
  console.error(err);
}
