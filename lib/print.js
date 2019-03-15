"use strict";

const fs = require("fs");
const crawl = require("./crawl");

const { hash, capitalise } = require("./helpers");

const appendSection = async (outputFile, section) => {
  const stream = fs.createWriteStream(outputFile, { flags: "a" });

  let data = `\n${hash(section.rank)} ${capitalise(section.title)} \n`;

  section.links.forEach(link => {
    data += `${link}  \n`;
  });

  if (section.noLink.length) {
    data += `\n**Missing links at**  \n`;
    section.noLink.forEach(link => {
      data += `${link}  \n`;
    });
  }

  if (section.incompleteLink.length) {
    data += `\n**Incomplete links**  \n`;
    section.incompleteLink.forEach(link => {
      data += `${link}  \n`;
    });
  }

  stream.write(data);
};

const recurse = async (section, data) => {
  for (let subDir of section.subDirs) {
    const subSection = await crawl(subDir, section.rank + 1);
    data = appendSection(subSection, data);

    if (subSection.subDirs.length) {
      data += recurse(subSection, data);
    }
  }
  return data;
};

const print = async (outputFile, dirpath, rank = 1) => {
  if (rank === 1) fs.writeFileSync(outputFile, "");

  const section = await crawl(dirpath, rank);
  await appendSection(outputFile, section);

  if (section.subDirs.length) {
    for (let subDir of section.subDirs) {
      await print(outputFile, subDir, rank + 1);
    }
  }
};

module.exports = print;
