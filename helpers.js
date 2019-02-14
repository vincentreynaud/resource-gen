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

exports.searchPdfByLine = arr => {
  let link = null;

  arr.forEach(line => {
    const linkPosition = line.search(/(http|https):\/\//);

    if (link !== null) {
      return;
    } else if (linkPosition !== -1) {
      link = line.slice(linkPosition);
      return link;
    }
  });

  return link;
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
