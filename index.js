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

const walk = async (dirpath, rank = 0) => {
  const files = fs.readdirSync(dirpath);
  const route = dirpath.split("/");
  const section = {
    title: lastItem(route),
    rank: rank + 1,
    links: [],
    noLink: [],
    incompleteLink: []
  };

  await asyncForEach(files, async file => {
    const filePath = path.join(dirpath, file);

    // Check for nested dirs
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, section.rank);
    }

    if (path.extname(filePath) === ".webloc") {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });

      if (content.includes("<string>")) {
        const link = content.split("<string>")[1].split("</string>")[0];
        section.links.push(link);
      } else if (content.includes("SURL_")) {
        console.log(`WEIRD ENCORDING in: ${file}`);
      } else {
        console.log(`CANNOT COMPUTE "${file}"`);
      }
    } else if (path.extname(filePath) === ".pdf") {
      const content = fs.readFileSync(filePath);
      // here asynchronous fucks with the final links array returning. fix this
      await pdf(content).then(data => {
        const dataByLine = data.text.split("\n");
        let link = searchPdfByLine(dataByLine);

        if (link === null) {
          console.log(`NO LINK FOUND in: ${file}`);
          section.noLink.push(file);
          return;
        } else if (isIncomplete(link)) {
          console.log(`INCOMPLETE LINK in: ${file}`);
          section.incompleteLink.push(file);
          return;
        }

        link = cutPageNumbering(link);
        section.links.push(link);
      });
    }
  });

  console.log("Section Title:", section.title);
  console.log("Section Rank:", section.rank);
  console.log("Section Links:", section.links);
  console.log("Missing Links:", section.noLink);
  console.log("Incomplete Links:", section.incompleteLink);

  return section;
};

try {
  walk("./data/sample");
} catch (err) {
  console.error(err);
}
