"use strict";

const fs = require("fs");

const logger = (message, options = { clear: false }) => {
  const logFile = "./resource-gen.log";

  if (options.clear === true) fs.writeFileSync(logFile, "");
  const stream = fs.createWriteStream(logFile, {
    flags: "a" // appends to the file
  });

  stream.write(`Crawl Log: ${message} \n`);
};

module.exports = logger;
