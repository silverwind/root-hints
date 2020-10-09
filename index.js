"use strict";

const hints = require("./hints.json");

const values = {
  A: hints.map(hint => hint.A),
  AAAA: hints.map(hint => hint.AAAA),
};

module.exports = function rootHints(type) {
  if (values[type]) {
    return values[type];
  } else if (!type) {
    return hints;
  } else {
    throw new Error(`Unknown record type: ${type}`);
  }
};
