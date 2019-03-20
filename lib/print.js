"use strict";

const fs = require("fs");
const crawl = require("./crawl");
const logger = require("./logger");

const { hash, capitalise, formatTitle, lastItem } = require("./helpers");

const appendSection = async (section, outputFile, dirpath) => {
  if (
    !section.links.length &&
    !section.subDirs.length && // will print folder name if subfolders
    !section.noLink.length &&
    !section.incompleteLink.length
  )
    return;

  const stream = fs.createWriteStream(outputFile, { flags: "a" });
  const sectionTitle = capitalise(formatTitle(section.title));

  let data = `\n${hash(section.rank)} ${sectionTitle} \n`;

  if (section.rank === 1) {
    data += `Bookmark resource generated from ${dirpath}  \n`;
    if (section.description) {
      data += `\n${section.description}  \n`;
    }
  }

  section.links.forEach(link => {
    data += `${link}  \n`;
  });

  if (section.noLink.length) {
    section.noLink.forEach(link => {
      logger(`${sectionTitle}: Missing link: ${link}  \n`);
    });
  }

  if (section.incompleteLink.length) {
    section.incompleteLink.forEach(link => {
      logger(`${sectionTitle}: Incomplete link: ${link}  \n`);
    });
  }

  stream.write(data);
};

const print = async (outputFile, dirpath, options = [], rank = 1) => {
  console.log("options", options);

  if (rank === 1) {
    fs.writeFileSync(outputFile, "");
    logger(lastItem(dirpath.split("/")), { clear: true });
  }

  const section = await crawl(dirpath, rank);
  try {
    await appendSection(section, outputFile, dirpath);
  } catch (error) {
    throw new Error(error);
  }

  if (section.subDirs.length) {
    for (let subDir of section.subDirs) {
      await print(outputFile, subDir, options, rank + 1);
    }
  }
};

module.exports = print;
