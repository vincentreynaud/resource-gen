const fs = require("fs");
const path = require("path");
const markdownMagic = require("markdown-magic");
// https://www.npmjs.com/package/markdown-magic-directory-tree

const outputFile = "dev-tools-&-resources.md";
const ignored = ["node_modules", ".git", ".DS_Store"];

const walk = async dirname => {
  // implement nested readdir
  fs.readdir(dirname, (err, files) => {
    if (err) throw err;
    console.log("files", files);

    files.forEach(file => {
      file = path.join("./", dirname, file);

      if (path.extname(file) === "") {
        console.log("there is a directory here");
        const nestedDir = path.extname(file);
        // walk this dir
      }

      // Retrieve Link from .webloc files
      if (path.extname(file) === ".webloc") {
        fs.readFile(file, { encoding: "utf8" }, (err, content) => {
          if (err) throw err;
          if (content.includes("<string>")) {
            const link = content.split("<string>")[1].split("</string>")[0];
            console.log("link:", link);
            return link;
          }
        });
      }
    });
  });
};

try {
  walk("./data/color");
} catch (err) {
  console.error(err);
}

/* TRY OUTS
  console.log("basename", path.basename(file));
  console.log("delimiter", process.env.PATH.split(path.delimiter));
  console.log("dirname", path.dirname(file));
  console.log("extname", path.extname(file));

  try {
    fs.readFile(file, { encoding: "utf8" }, function(err, content) {
      const link = content.split("<string>")[1].split("</string>")[0];
      console.log("link:", link);
      return link;
    });
    fs.stat(file, (err, stats) => {
      if (err) throw err;
      console.log("stats:", stats);
    });
  } catch (err) {
    console.error(err);
  }
*/
