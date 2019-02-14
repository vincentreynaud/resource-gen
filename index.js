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
  asyncForEach,
  lastItem,
  searchPdfByLine,
  cutPageNumbering,
  isIncomplete
} = require("./helpers");

const outputFile = "dev-tools-&-resources.md";

const walk = async dirpath => {
  const files = fs.readdirSync(dirpath);
  const links = [];
  const noLink = [];
  const incompleteLink = [];

  await asyncForEach(files, async file => {
    const filePath = path.join(dirpath, file);

    // Check for nested dirs
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath); // give dirname
    }

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
      await pdf(content).then(data => {
        const dataByLine = data.text.split("\n");
        let link = searchPdfByLine(dataByLine);

        if (link === null) {
          console.log(`NO LINK FOUND in: ${file}`);
          noLink.push(file);
          return;
        } else if (isIncomplete(link)) {
          console.log(`INCOMPLETE LINK in: ${file}`);
          incompleteLink.push(file);
          return;
        }

        link = cutPageNumbering(link);
        links.push(link);
      });
    }
  });

  const route = dirpath.split("/");
  const section = {
    title: lastItem(route),
    links,
    noLink,
    incompleteLink
  };

  console.log("Section Title:", section.title);
  console.log("Section Links:", section.links);
  console.log("Missing Links:", section.noLink);
  console.log("Incomplete Links:", section.incompleteLink);
};

try {
  walk("./data/sample");
} catch (err) {
  console.error(err);
}
