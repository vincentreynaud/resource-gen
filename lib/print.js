("use strict");

const fs = require("fs");
const crawl = require("./crawl");

const { hash, capitalise } = require("./helpers");

const appendSection = (section, data = "") => {
  data = `${hash(section.rank)} ${capitalise(section.title)} \n`;

  section.links.forEach(link => {
    data += `${link} \n`;
  });

  section.noLink.forEach(link => {
    data += `##### Missing links at \n`;
    data += `${link} \n`;
  });

  section.noLink.forEach(link => {
    data += `##### Incomplete links \n`;
    data += `${link} \n`;
  });

  return data;
};

const print = async dirpath => {
  const outputFile = "dev-tools-&-resources.md";

  const section = await crawl(dirpath);
  console.log("SECTIONS", section);

  let data = appendSection(section);

  if (section.subDirs) {
    for (let subDir in section.subDirs) {
      const subSection = await crawl(subDir, section.rank + 1);
      data += appendSection(subSection, data);
    }
  }

  await fs.writeFileSync(outputFile, data);
};

module.exports = print;
