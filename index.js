const fs = require("fs");
const path = require("path");
const markdownMagic = require("markdown-magic"); // https://www.npmjs.com/package/markdown-magic-directory-tree

// const fileURL = new URL(
//   "file:///Users/vincentreynaud/Dropbox/Development DCI/tools-&-resources"
// ); // For most fs module functions, the path or filename argument may be passed as a WHATWG URL object

const file = "./Getting Started.webloc";

try {
  fs.readFile(file, { encoding: "utf8" }, function(err, data) {
    const link = data.split("<string>")[1].split("</string>")[0];
    console.log("link:", link);
  });
  fs.stat(file, (err, stats) => {
    if (err) throw err;
    console.log("stats:", stats);
  });
} catch (err) {
  console.error(err);
}

// fs.open("bootstrap.webloc", "r", (err, fd) => {
//   if (err) throw err;
//   console.log("file opened");
//   fs.close(fd, err => {
//     if (err) throw err;
//     console.log("file closing");
//   });
// });

// fs.stat("Getting Started.webloc", (err, stats) => {
//   if (err) throw err;
//   console.log("stats:", stats);
// });
