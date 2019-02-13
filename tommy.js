const fs = require("fs");
const { append, write } = require("fs-jetpack");

const path = require("path");
const ignoredDirs = ["node_modules", "git"];

const outPutFile = "TOC.md";
const repo = `https://github.com/DigitalCareerInstitute/web-developer-curriculum/blob/master/`;
// const repo = `./`

write(outPutFile, "");

const walk = async function(directoryName) {
  if (
    !ignoredDirs.some(function(v) {
      return directoryName.indexOf(v) >= 0;
    })
  ) {
    fs.readdir(directoryName, function(e, files) {
      if (e) {
        console.log("Error: ", e);
        return;
      }
      files.forEach(function(file) {
        var fullPath = path.join(directoryName, file);
        fs.stat(fullPath, function(e, f) {
          if (e) {
            console.log("Error: ", e);
            return;
          }
          if (f.isDirectory()) {
            walk(fullPath);
          } else {
            if (file.toLowerCase() == "readme.md") {
              fs.readFile(fullPath, { encoding: "utf-8" }, function(err, data) {
                const match = data.match(/^#\s(.*)/gm);
                if (match) {
                  const topic = fullPath.match(/.+?(?=\/)/)[0];
                  const heading = match[0].replace("# ", "");
                  const tocLine = `**${topic}** [${heading}](${repo}${fullPath}) \n\r`;
                  //quickfix: create react app readme contains this comment
                  const isCreateReactAppReadme =
                    tocLine.indexOf("also works") < 0;
                  if (isCreateReactAppReadme) {
                    append(outPutFile, tocLine);
                  }
                }
              });
            }
          }
        });
      });
    });
  }
};
walk("./");
