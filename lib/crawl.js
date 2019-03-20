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

const crawl = async (dirpath, rank, options = { folderDepth: 7 }) => {
  const route = dirpath.split("/");
  const section = {};
  section.title = lastItem(route);
  section.rank = rank;
  section.links = [];
  section.subDirs = [];
  section.noLink = [];
  section.incompleteLink = [];

  // if (options.description) {
  //   section.description = options.description;
  // }
  if (section.rank === options.folderDepth) return section;

  console.log(`Browsing ${section.title}`); // debug

  const files = fs.readdirSync(dirpath);
  await asyncForEach(files, async file => {
    const filePath = path.join(dirpath, file);
    let link = null;

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
