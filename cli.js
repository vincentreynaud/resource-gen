#!/usr/bin/env node

"use strict";

const argv = require("yargs")
  .usage("Usage: $0 <directory-path> <output-file-name> [options]")
  .example(
    "$0 tools-and-resources /Users/myusername/Development/tools-and-resources --depth 3 --ignore 'code-snippets'"
  )
  .command({
    command: "<directory-path> <output-file-name> [options]",
    desc: "Specify the directory to crawl and the output file name"
  })
  .option("depth", {
    type: "number",
    alias: "d",
    describe: "Max sub-directory depth to search into",
    choices: [1, 2, 3, 4, 5, 6],
    default: 5
  })
  .option("ignore", {
    type: "array",
    alias: "i",
    describe: "Ignore folders in the base- and sub-directories",
    default: []
  })
  .option("description", {
    type: "string",
    alias: "t",
    describe: "Describe the generated resource"
  })
  .option("log", {
    type: "boolean",
    alias: "l",
    describe: "Create log file for errors in link retrieval"
  })
  .demandCommand(1, "Please provide a directory to crawl")
  .help().argv;

const path = require("path");
const print = require("./lib/print");

let dirpath = argv._[0];
let outputFileName = argv._[1];
const options = {};
options.depth = argv.depth;
options.ignore = argv.ignore;
options.description = argv.description;
options.log = argv.log;

if (path.isAbsolute(dirpath) === false) dirpath = path.resolve(dirpath);

const baseName = path.parse(dirpath).base;
if (path.extname(baseName)) {
  console.error(`Path provided is a file path. Did you mean "${path.dirname(dirpath)}"?`);
  return;
}
if (!outputFileName) outputFileName = baseName;

const outputFile = path.join(dirpath, setOutputFile(outputFileName));
// outputFile = path.join("output", setOutputFile(outputFileName));

try {
  print(outputFile, dirpath, options);
} catch (error) {
  console.error(error);
}

function setOutputFile(name) {
  let outputFile;

  if (!path.extname(name)) {
    outputFile = name + ".md";
  } else if (path.extname(name) === ".md") {
    outputFile = name;
  } else {
    throw new Error(`Incorrect file extension "${name}", please use .md or simply specify file name`);
  }
  return outputFile;
}
