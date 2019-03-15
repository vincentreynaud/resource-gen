"use strict";

const fs = require("fs");
const path = require("path");

exports.asyncForEach = async (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
};

// fix duplicates
const linkPosition = str => {
  return str.search(/(http|https):\/\//);
};

exports.linkPosition = str => {
  return str.search(/(http|https):\/\//);
};

exports.findLinkByLine = arr => {
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

exports.hasStringTag = str => {
  return str.search(/<string>/g) !== -1 ? true : false;
};

exports.cutPageNumbering = link => {
  const pageNumberingAt = link.search(/\d\/(\d{1,2})$/);
  if (pageNumberingAt !== -1) {
    const lastChars = pageNumberingAt - link.length;
    link = link.slice(0, lastChars);
    return link;
  } else {
    return link;
  }
};

exports.lastItem = arr => arr[arr.length - 1];

exports.isIncomplete = link => {
  const dotdotdot = link.search(/\.{3}$/);
  if (dotdotdot !== -1) return true;
};

exports.currentDirectory = () => {
  return path.basename(process.cwd());
};

exports.directoryExists = filePath => {
  try {
    return fs.statSync(filePath).isDirectory();
  } catch (error) {
    return false;
  }
};

exports.capitalise = str => {
  if (typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.formatTitle = str => {
  const dash = new RegExp("-", "g");
  return str.replace(dash, " ");
};

exports.hash = int => {
  if (typeof int !== "number") return;
  let hash = "";
  for (let i = 0; i < int; i++) {
    hash += "#";
  }
  return hash;
};
