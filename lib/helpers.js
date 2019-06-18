"use strict";

const fs = require("fs");
const path = require("path");

const asyncForEach = async (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
};

const setOutputFile = name => {
  let outputFile;

  if (!path.extname(name)) {
    outputFile = name + ".md";
  } else if (path.extname(name) === ".md") {
    outputFile = name;
  } else {
    throw new Error(`Incorrect file extension "${name}", please use .md or simply specify file name`);
  }
  return outputFile;
};

const linkPosition = str => {
  return str.search(/(http|https):\/\//);
};

const findLinkByLine = arr => {
  let link = null;

  arr.forEach(line => {
    if (link !== null) {
      return;
    } else if (linkPosition(line) !== -1) {
      link = line.slice(linkPosition(line));
      return link;
    }
  });

  return link;
};

const hasStringTag = str => {
  return str.search(/<string>/g) !== -1 ? true : false;
};

const cutPageNumbering = link => {
  const pageNumberingAt = link.search(/\d\/(\d{1,2})$/);
  if (pageNumberingAt !== -1) {
    const lastChars = pageNumberingAt - link.length;
    link = link.slice(0, lastChars);
    return link;
  } else {
    return link;
  }
};

const lastItem = arr => arr[arr.length - 1];

const isIncomplete = link => {
  const dotdotdot = link.search(/\.{3}$/);
  if (dotdotdot !== -1) return true;
};

const currentDirectory = () => {
  return path.basename(process.cwd());
};

const directoryExists = filePath => {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (error) {
    return false;
  }
};

const capitalise = str => {
  if (typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatTitle = str => {
  const dash = new RegExp("-", "g");

  // Personal setup to change folder names marked with "*" to upper case
  if (str.match(/\*/g)) {
    str = str.toUpperCase().replace("*", "");
  }

  return str.replace(dash, " ");
};

const hash = int => {
  if (typeof int !== "number") return;
  let hash = "";
  for (let i = 0; i < int; i++) {
    hash += "#";
  }
  return hash;
};

module.exports = {
  asyncForEach,
  setOutputFile,
  linkPosition,
  findLinkByLine,
  hasStringTag,
  cutPageNumbering,
  lastItem,
  isIncomplete,
  currentDirectory,
  directoryExists,
  capitalise,
  formatTitle,
  hash
};
