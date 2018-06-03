#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const ipRegex = require("ip-regex");
const request = require("request-promise-native");
const source = "https://www.internic.net/domain/named.root";

request(source).catch(console.error).then(body => {
  const hints = [];

  body.split("\n").filter(line => {
    return !/^$/.test(line) && !/^;/.test(line) && !/\bNS\b/.test(line);
  }).forEach(line => {
    line = line.trim();
    const name = /^(\S+)\.\s/.exec(line)[1].toLowerCase();

    let i;
    hints.some((el, index) => {
      if (el.name === name) {
        i = index;
        return true;
      }
    });

    const entry = hints[i] || {};
    entry.name = name;

    if (/\bAAAA\b/.test(line)) {
      entry.AAAA = ipRegex.v6().exec(line)[0];
    } else {
      entry.A = ipRegex.v4().exec(line)[0];
    }

    if (typeof i === "number") {
      hints[i] = entry;
    } else {
      hints.push(entry);
    }
  });

  fs.writeFileSync(path.join(__dirname, "hints.json"), JSON.stringify(hints, null, 2) + "\n");
});
