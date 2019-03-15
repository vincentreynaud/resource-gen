"use strict";

const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

const {
  asyncForEach,
  linkPosition,
  hasStringTag,
  findLinkByLine,
  cutPageNumbering,
  isIncomplete,
  lastItem
} = require("./helpers");

const crawl = async (dirpath, rank) => {
  // if (rank === 4) return; // doesn't follow up with section rank, to fix
  // make as depth option

  const files = fs.readdirSync(dirpath);
  const route = dirpath.split("/");
  const section = {
    title: lastItem(route),
    rank,
    links: [],
    subDirs: [],
    noLink: [],
    incompleteLink: []
  };

  console.log(`SECTION: ${section.title}`); // debug

  await asyncForEach(files, async file => {
    const filePath = path.join(dirpath, file);
    let link = null;

    // Nested directories
    // here asynchronous fucks with the final links array returning. fix this
    if (fs.statSync(filePath).isDirectory()) {
      section.subDirs.push(filePath);
    }

    switch (path.extname(filePath)) {
      case ".webloc":
        const wFileStr = fs.readFileSync(filePath, { encoding: "utf8" });

        if (linkPosition(wFileStr) !== -1 && hasStringTag(wFileStr)) {
          link = wFileStr.split("<string>")[1].split("</string>")[0];
          section.links.push(link);
        } else if (linkPosition(wFileStr) !== -1) {
          const slice = wFileStr.slice(linkPosition(wFileStr));
          link = slice.split("\b")[0];
          section.links.push(link);
        } else {
          console.log(`NO LINK FOUND in: ${file}`);
        }
        break;

      case ".desktop":
        const dFileStr = fs.readFileSync(filePath, { encoding: "utf8" });

        if (linkPosition(dFileStr) !== -1) {
          const slice = dFileStr.slice(linkPosition(dFileStr));
          link = slice.split("\n")[0];
          section.links.push(link);
        } else {
          console.log(`NO LINK FOUND in: ${file}`);
        }
        break;

      case ".pdf":
        const buffer = fs.readFileSync(filePath);

        await pdf(buffer).then(data => {
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

  return section;
};

module.exports = crawl;
