"use strict";

const fs = require("fs");
const crawl = require("./crawl");
const logger = require("./logger");

const { hash, capitalise, formatTitle, lastItem } = require("./helpers");

const appendSection = async (section, outputFile, dirpath) => {
  if (
    !section.links.length &&
    !section.subDirs.length &&
    !section.noLink.length &&
    !section.incompleteLink.length
  )
    return;

  const stream = fs.createWriteStream(outputFile, { flags: "a" });

  const sectionTitle = capitalise(formatTitle(section.title));
  let data = `\n${hash(section.rank)} ${sectionTitle} \n`;

  if (section.rank === 1) {
    if (section.description) {
      data += `${section.description}  \n`;
    }

    data += `Resource generated from ${dirpath}  \n`;
  }

  section.links.forEach(link => {
    data += `${link}  \n`;
  });

  stream.write(data);
};

const print = async (outputFile, dirpath, options, rank = 1) => {
  if (rank === 1) fs.writeFileSync(outputFile, "");

  const section = await crawl(dirpath, rank, options);

  for (let ignore of options.ignore) {
    if (section.title.toLowerCase() === ignore.toLowerCase().trim()) {
      return;
    }
  }

  if (options.log === true) {
    if (rank === 1) logger(lastItem(dirpath.split("/")), { clear: true });
    const sectionTitle = capitalise(formatTitle(section.title));

    section.incompleteLink.forEach(link => {
      logger(`${sectionTitle}: Incomplete link: ${link}  \n`);
    });
    section.noLink.forEach(link => {
      logger(`${sectionTitle}: Missing link: ${link}  \n`);
    });
  }

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
