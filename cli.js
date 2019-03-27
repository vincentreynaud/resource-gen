#!/usr/bin/env node

"use strict";

const argv = require("yargs")
  .usage("Usage: $0 <output-file> <directory-path> [options]")
  .example(
    // prettier-ignore
    "$0 dev-tools-and-resources /Users/vincentreynaud/Dropbox/Development\ DCI/tools-and-resources --depth 5 --ignore snippets"
  )
  .command({
    command: "<output-file> <directory-path> [options]",
    desc: "Define the output file name and the base directory to crawl"
  })
  .option("depth", {
    type: "number",
    alias: "d",
    describe: "Max sub-directory depth to search into",
    choices: [1, 2, 3, 4, 6, 7],
    default: 7
  })
  .option("ignore", {
    type: "array",
    alias: "i",
    describe: "Ignore folders in the base and sub-directories",
    default: []
  })
  .option("description", {
    type: "string",
    alias: "t",
    describe: "Describe the generated resource"
  })
  .demandCommand(2, "Please provide at least 2 arguments")
  .help().argv;
// .boolean('v') if flag used returns true

const outputFileName = argv._[0];
const dirpath = argv._[1];
const options = {};
options.depth = argv.depth;
options.ignore = argv.ignore;
options.description = argv.description;

// prettier-ignore
// Run command: npm run gen -- dev-tools-and-resources /Users/vincentreynaud/Dropbox/Development\ DCI/tools-and-resources --i _snippets liked -t "Web Development Bookmarks"

const print = require("./lib/print");
const outputFile = `output/${outputFileName}.md`;

try {
  print(outputFile, dirpath, options);
} catch (error) {
  console.error(error);
}
