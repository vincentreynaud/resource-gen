const fs = require("fs");
const path = require("path");
const markdownMagic = require("markdown-magic"); // https://www.npmjs.com/package/markdown-magic-directory-tree

// const fileURL = new URL(
//   "file:///Users/vincentreynaud/Dropbox/Development DCI/tools-&-resources"
// ); // For most fs module functions, the path or filename argument may be passed as a WHATWG URL object

const file = "./Getting Started.webloc";

console.log(path.basename(file));

try {
  fs.readFile(file, { encoding: "utf8" }, function(err, data) {
    const link = data.split("<string>")[1].split("</string>")[0];
    console.log("link:", link);
  });
  // fs.stat(file, (err, stats) => {
  //   if (err) throw err;
  //   console.log("stats:", stats);
  // });
} catch (err) {
  console.error(err);
}
