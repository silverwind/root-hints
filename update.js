#!/usr/bin/env node
import {writeFile} from "node:fs/promises";
import {join} from "node:path";
import ipRegex from "ip-regex";
import fetchEnhanced from "fetch-enhanced";
import nodeFetch from "node-fetch";

const fetch = fetchEnhanced(nodeFetch);

function exit(err) {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

async function main() {
  const res = await fetch("https://www.internic.net/domain/named.root");
  const hints = [];

  const lines = (await res.text()).split("\n").filter(line => {
    line = line.trim();
    return line && !line.startsWith(";") && !/\bNS\b/.test(line);
  });

  for (const line of lines) {
    const name = /^(\S+)\.\s/.exec(line)[1].toLowerCase();

    const i = hints.findIndex(el => el.name === name);

    const entry = i >= 0 ? hints[i] : {};
    entry.name = name;

    if (/\bAAAA\b/.test(line)) {
      entry.AAAA = ipRegex.v6().exec(line)[0];
    } else {
      entry.A = ipRegex.v4().exec(line)[0];
    }

    if (i >= 0) {
      hints[i] = entry;
    } else {
      hints.push(entry);
    }
  }

  await writeFile(join(import.meta.dirname, "hints.json"), `${JSON.stringify(hints, null, 2)}\n`);
}

main().then(exit).catch(exit);
