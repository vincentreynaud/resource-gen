const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");
const markdownMagic = require("markdown-magic"); // https://www.npmjs.com/package/markdown-magic-directory-tree

("use strict");

/**
 * Improvements:
 * - Capitalise section titles
 * - order links by alphabetical order?
 */

const {
  asyncForEach,
  lastItem,
  linkPosition,
  hasStringTag,
  findLinkByLine,
  cutPageNumbering,
  isIncomplete
} = require("./helpers");

const outputFile = "dev-tools-&-resources.md";

const walk = async (dirpath, rank = 0) => {
  if (rank === 3) return; // security

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
    let link = null;

    // Nested directories
    // here asynchronous fucks with the final links array returning. fix this
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath, section.rank);
    }

    switch (path.extname(filePath)) {
      case ".webloc":
        const weblocStr = fs.readFileSync(filePath, { encoding: "utf8" });

        if (linkPosition(weblocStr) !== -1 && hasStringTag(weblocStr)) {
          link = weblocStr.split("<string>")[1].split("</string>")[0];
          section.links.push(link);
        } else if (linkPosition(weblocStr) !== -1) {
          const slice = weblocStr.slice(linkPosition(weblocStr));
          link = slice.split("\b")[0];
          section.links.push(link);
        } else {
          console.log(`NO LINK FOUND in: ${file}`);
        }
        break;

      case ".desktop":
        const desktopStr = fs.readFileSync(filePath, { encoding: "utf8" });

        if (linkPosition(desktopStr) !== -1) {
          const slice = desktopStr.slice(linkPosition(desktopStr));
          link = slice.split("\n")[0];
          section.links.push(link);
        } else {
          console.log(`NO LINK FOUND in: ${file}`);
        }
        break;

      case ".pdf":
        const pdfBuffer = fs.readFileSync(filePath);

        await pdf(pdfBuffer).then(data => {
          const dataByLine = data.text.split("\n");
          link = findLinkByLine(dataByLine);

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
        break;
    }
  });

  console.log("");
  console.log(`###### ${section.title.toUpperCase()} (sub ${section.rank})`);
  console.log("##################################");
  console.log("Section Links:", section.links);
  console.log("Missing Links:", section.noLink);
  console.log("Incomplete Links:", section.incompleteLink);
  console.log("");

  return section;
};

try {
  walk("./data/color");
} catch (err) {
  console.error(err);
}
