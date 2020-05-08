#!/usr/bin/env node
"use strict";

const {writeFile} = require("fs").promises;
const {join} = require("path");
const ipRegex = require("ip-regex");
const fetch = require("make-fetch-happen");

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

async function main() {
  const res = await fetch("https://www.internic.net/domain/named.root");
  const hints = [];

  (await res.text()).split("\n").filter(line => {
    line = line.trim();
    return line && !line.startsWith(";") && !/\bNS\b/.test(line);
  }).forEach(line => {
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

  await writeFile(join(__dirname, "hints.json"), `${JSON.stringify(hints, null, 2)}\n`);
}

main().then(exit).catch(exit);
