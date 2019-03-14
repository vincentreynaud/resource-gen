("use strict");

const fs = require("fs");
const crawl = require("./crawl");

const { hash, capitalise } = require("./helpers");

const appendSection = (section, data = "") => {
  data = `\n ${hash(section.rank)} ${capitalise(section.title)} \n`;

  section.links.forEach(link => {
    data += `${link}  \n`;
  });

  section.noLink.forEach(link => {
    data += `\n **Missing links at**  \n`;
    data += `${link}  \n`;
  });

  section.noLink.forEach(link => {
    data += `\n **Incomplete links**  \n`;
    data += `${link}  \n`;
  });

  return data;
};

const print = async (dirpath, rank = 1) => {
  const outputFile = "dev-tools-&-resources.md";

  const section = await crawl(dirpath, rank);
  let data = appendSection(section);

  if (section.subDirs.length) {
    for (let subDir of section.subDirs) {
      const subSection = await crawl(subDir, section.rank + 1);
      data += appendSection(subSection, data);
    }
  }

  await fs.writeFileSync(outputFile, data);
};

module.exports = print;
