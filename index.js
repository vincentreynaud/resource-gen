const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");
const markdownMagic = require("markdown-magic");
// https://www.npmjs.com/package/markdown-magic-directory-tree

("use strict");

/**
 * Improvements:
 * - Capitalise section titles
 *
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
    // here asynchronous fucks with the final links array returning. fix this
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, section.rank);
    }

    if (path.extname(filePath) === ".webloc") {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });
      const linkPosition = content.search(/(http|https):\/\//);
      let link = null;

      if (linkPosition !== -1 && content.includes("<string>")) {
        link = content.split("<string>")[1].split("</string>")[0];
        section.links.push(link);
      } else if (linkPosition !== -1) {
        const slice = content.slice(linkPosition);
        link = slice.split("\b")[0];
        section.links.push(link);
      } else {
        console.log(`NO LINK FOUND in: ${file}`);
      }
    } else if (path.extname(filePath) === ".pdf") {
      const content = fs.readFileSync(filePath);

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
