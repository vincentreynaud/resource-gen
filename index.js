const fs = require("fs");
const path = require("path");
const markdownMagic = require("markdown-magic");
// https://www.npmjs.com/package/markdown-magic-directory-tree

const outputFile = "dev-tools-&-resources.md";
const ignored = ["node_modules", ".git", ".DS_Store"];

const walk = dirname => {
  const files = fs.readdirSync(dirname);
  let links = [];

  files.forEach(file => {
    file = path.join("./", dirname, file);

    // Check for nested dirs
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      console.log("isDirectory!!!!");
      walk(file); // give dirname
    }

    // Retrieve Link from .webloc files
    if (path.extname(file) === ".webloc") {
      const content = fs.readFileSync(file, { encoding: "utf8" });

      if (content.includes("<string>")) {
        const link = content.split("<string>")[1].split("</string>")[0];
        console.log("links before push:", links);
        links.push(link);
      } else if (content.includes("SURL_")) {
        console.log(`FILE ${file} WITH WEIRD ENCORDING HERE`);
      }
    }
  });
  console.log("final links:", links);
};

try {
  walk("./data/color");
} catch (err) {
  console.error(err);
}

/* ALTERNATIVE DIR IDENTIFICATION
  if (path.extname(file) === "") {
    console.log("there is a directory here");
    const nestedDir = path.extname(file);
    walk(nestedDir)
  }
*/

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
