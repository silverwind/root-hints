#!/usr/bin/env node
import {writeFile} from "node:fs/promises";
import {isIPv4, isIPv6} from "node:net";

type HintEntry = {
  name: string,
  A?: string,
  AAAA?: string,
};

type PartialHintEntry = {
  name?: string,
  A?: string,
  AAAA?: string,
};

const res = await fetch("https://www.internic.net/domain/named.root");
const partials: Array<PartialHintEntry> = [];

const lines = (await res.text()).split("\n").filter(line => {
  line = line.trim();
  return line && !line.startsWith(";") && !/\bNS\b/.test(line);
});

for (const line of lines) {
  const name = /^(\S+)\.\s/.exec(line)![1].toLowerCase();

  const index = partials.findIndex(el => el.name === name);

  const entry: PartialHintEntry = index >= 0 ? partials[index] : {};
  entry.name = name;

  if (/\bAAAA\b/.test(line)) {
    entry.AAAA = line.split(/\s+/).find(token => isIPv6(token))!;
  } else {
    entry.A = line.split(/\s+/).find(token => isIPv4(token))!;
  }

  if (index >= 0) {
    partials[index] = entry;
  } else {
    partials.push(entry);
  }
}

const hints = partials as Array<HintEntry>;

await writeFile(new URL("hints.json", import.meta.url), `${JSON.stringify(hints, null, 2)}\n`);
