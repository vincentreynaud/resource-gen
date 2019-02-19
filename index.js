#!/usr/bin/env node

/**
 * Improvements:
 * - checkout markdown-magic
 * - Capitalise section titles
 * - order links by alphabetical order? -already done?
 * - make it a CLI npm package to install globally
 * (can use https://github.com/yargs/yargs)
 * - change index.js to cli.js + run $ chmod +x cli.js + npm link
 *
 * Publishing:
 * - generate .md on github
 * - update every X
 * - host with now
 */

("use strict");

const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

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

const [, , dirpath, ...options] = process.argv;

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

  console.log("");
  console.log(`###### ${section.title.toUpperCase()} (sub ${section.rank})`);
  console.log("##################################");
  console.log("Section Links:", section.links);
  console.log("Missing Links:", section.noLink);
  console.log("Incomplete Links:", section.incompleteLink);
  console.log("");

  const data = `
  # ${section.title.toUpperCase()}
  ${section.links.forEach(link => `${link}`)}
  `;
  fs.writeFileSync(outputFile, data);

  return section;
};

try {
  walk(dirpath);
} catch (err) {
  console.error(err);
}
