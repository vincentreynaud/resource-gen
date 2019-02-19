#!/usr/bin/env node

/**
 * Improvements:
 * - checkout markdown-magic
 * - Capitalise section titles
 * - order links by alphabetical order? -already done?
 * - make it a CLI npm package to install globally
 * (can use https://github.com/yargs/yargs)
 * - change index.js to cli.js + run $ chmod +x cli.js + npm link
 *
 * Publishing:
 * - generate .md on github
 * - update every X
 * - host with now
 */

("use strict");

const crawl = require("./lib/crawl");
const [, , dirpath, ...options] = process.argv;

try {
  crawl(dirpath);
} catch (err) {
  console.error(err);
}
