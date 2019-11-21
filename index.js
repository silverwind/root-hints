"use strict";

const hints = require("./hints.json");

module.exports = function rootHints(type) {
  if (["A", "AAAA"].includes(type)) {
    return hints.map(hint => hint[type]);
  } else if (type === undefined) {
    return hints;
  } else {
    throw new Error(`Unknown record type: ${type}`);
  }
};
