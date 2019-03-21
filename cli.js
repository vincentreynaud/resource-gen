#!/usr/bin/env node

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
