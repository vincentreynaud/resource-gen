#!/usr/bin/env node

"use strict";

const argv = require("yargs")
  .usage("Usage: $0 <output-file> <directory-path> [options]")
  .example('$0 dev-tools-and-resources /some/path -d 5 -i "snippets"')
  .command({
    command: "<output-file> <directory-path> [options]",
    desc: "Define output file and directory to crawl"
  })
  .option("depth", {
    type: "number",
    alias: "d",
    describe: "Max sub-directory depth to search",
    choices: [1, 2, 3, 4, 6, 7],
    default: 7
  })
  .option("ignore", {
    type: "array",
    alias: "i",
    describe: "Ignore folders in your parent directory",
    default: []
  })
  .describe("<output-file>", "Name of the file to be rendered")
  .describe("<directory-path", "Path of the parent folder to crawl")
  .demandCommand(2, "Please provide at least 2 arguments")
  .help().argv;
// .boolean('v') if flag used returns true

const outputFileName = argv._[0];
const dirpath = argv._[1];
const options = {};
options.folderDepth = argv.depth;
options.ignore = argv.ignore;

console.log(outputFileName, dirpath, options);

// prettier-ignore
// npm run gen -- dev-tools-and-resources /Users/vincentreynaud/Dropbox/Development\ DCI/tools-and-resources

const print = require("./lib/print");
// const outputFile = `output/${outputFileName}.md`;

// try {
//   print(outputFile, dirpath, options);
// } catch (error) {
//   console.error(error);
// }
