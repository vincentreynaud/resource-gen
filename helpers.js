exports.asyncForEach = async (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
};

exports.lastItem = arr => arr[arr.length - 1];

// useless?
exports.startsWithHttp = link => {
  const doesit = link.search(/^(http|https):\/\//);
  return doesit === 0 ? true : false;
};

exports.linkPosition = str => {
  return str.search(/(http|https):\/\//);
};

// fix this
const linkPosition = str => {
  return str.search(/(http|https):\/\//);
};

exports.searchPdfByLine = arr => {
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

exports.isIncomplete = link => {
  const dotdotdot = link.search(/\.{3}$/);
  if (dotdotdot !== -1) return true;
};
