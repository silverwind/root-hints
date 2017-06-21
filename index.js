"use strict";

const hints = require("./hints.json");

module.exports = function rootHints(type) {
  if (type === "A" || type === "AAAA") {
    const records = [];
    hints.forEach(function(hint) {
      if (hint[type]) {
        records.push(hint[type]);
      }
    });
    return records;
  } else if (type === undefined) {
    return hints;
  } else {
    throw new Error("Unknown record type: " + type);
  }
};
