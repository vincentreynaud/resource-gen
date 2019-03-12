("use strict");

const fs = require("fs");
const crawl = require("./crawl");

const { hash, capitalise } = require("./helpers");

const print = async dirpath => {
  const outputFile = "dev-tools-&-resources.md";

  const sections = await crawl(dirpath);
  console.log("SECTIONS", sections);

  let data = ``;

  sections.forEach(section => {
    data += `${hash(section.rank)} ${capitalise(section.title)} \n`;

    section.links.forEach(link => {
      data += `${link} \n`;
      return data;
    });

    section.noLink.forEach(link => {
      data += `##### Missing links at \n`;
      data += `${link} \n`;
      return data;
    });

    section.noLink.forEach(link => {
      data += `##### Incomplete links \n`;
      data += `${link} \n`;
      return data;
    });
  });

  await fs.writeFileSync(outputFile, data);
};

module.exports = print;
