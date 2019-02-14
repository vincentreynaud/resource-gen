const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");
const markdownMagic = require("markdown-magic");
// https://www.npmjs.com/package/markdown-magic-directory-tree

("use strict");

/**
 * Improvements:
 * - Capitalise section titles
 * - Relay nesting info to allow diff between h1, h2, h3
 */

const outputFile = "dev-tools-&-resources.md";
const ignored = ["node_modules", ".git", ".DS_Store"];

const lastItem = arr => arr[arr.length - 1];

const walk = dirpath => {
  const files = fs.readdirSync(dirpath);
  let links = [];

  files.forEach(file => {
    const filePath = path.join(dirpath, file);

    // Check for nested dirs
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath); // give dirname
    }

    // Retrieve Link from .webloc files
    if (path.extname(filePath) === ".webloc") {
      const content = fs.readFileSync(filePath, { encoding: "utf8" });

      if (content.includes("<string>")) {
        const link = content.split("<string>")[1].split("</string>")[0];
        links.push(link);
      } else if (content.includes("SURL_")) {
        console.log(`File "${file}" with WEIRD ENCORDING HERE`);
      } else {
        console.log(`Cannot compute file "${file}"`);
      }

      // Retrieve Link from .pdf files
    } else if (path.extname(filePath) === ".pdf") {
      const content = fs.readFileSync(filePath);
      // here asynchronous fucks with the final links array returning. fix this
      pdf(content).then(data => {
        const link = data.text.split("\n")[3].slice(0, -3);
        // only works if doc doesn't exceed 9 pages, implement page number check

        if (link.includes("http")) {
          console.log("link:", link);
          links.push(link);
        } else {
          data = data.text.split("\n");
          // console.log("link", data);
          console.log(`in: "${file}" link not found at specified location`);
        }
      });
    }
  });

  const route = dirpath.split("/");
  const section = {
    title: lastItem(route),
    links
  };

  console.log("Section Title:", section.title);
  console.log("Section Links:", section.links);
};

try {
  walk("./data/sample");
} catch (err) {
  console.error(err);
}
