const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");
const markdownMagic = require("markdown-magic");
// https://www.npmjs.com/package/markdown-magic-directory-tree

("use strict");

/**
 * Improvements:
 * - Capitalise section titles
 * - Relay nesting info to allow diff between h1, h2, h3
 */

const {
  lastItem,
  searchPdfByLine,
  cutPageNumbering,
  startsWithHttp
} = require("./helpers");

const outputFile = "dev-tools-&-resources.md";

const walk = dirpath => {
  const files = fs.readdirSync(dirpath);
  let links = [];

  files.forEach(file => {
    const filePath = path.join(dirpath, file);

    // // Check for nested dirs
    // if (fs.statSync(filePath).isDirectory()) {
    //   walk(filePath); // give dirname
    // }

    // .webloc files
    if (path.extname(filePath) === ".webloc") {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });

      if (content.includes("<string>")) {
        const link = content.split("<string>")[1].split("</string>")[0];
        links.push(link);
      } else if (content.includes("SURL_")) {
        console.log(`File "${file}" with WEIRD ENCORDING HERE`);
      } else {
        console.log(`Cannot compute file "${file}"`);
      }

      // .pdf files
    } else if (path.extname(filePath) === ".pdf") {
      const content = fs.readFileSync(filePath);
      // here asynchronous fucks with the final links array returning. fix this
      pdf(content).then(data => {
        const dataByLine = data.text.split("\n");

        let link = searchPdfByLine(dataByLine);
        if (link === null) {
          console.log(`No link found in ${file}`);
          return;
        }

        link = cutPageNumbering(link);
        console.log("link", link);
        links.push(link);
      });
    }
  });

  const route = dirpath.split("/");
  const section = {
    title: lastItem(route),
    links
  };

  console.log("Section Title:", section.title);
  console.log("Section Links:", section.links);
};

try {
  walk("./data/sample");
} catch (err) {
  console.error(err);
}
