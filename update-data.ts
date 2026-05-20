#!/usr/bin/env node
import {writeFile} from "node:fs/promises";
import ipRegex from "ip-regex";

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

function exit(err?: unknown): void {
  if (err) console.error(err);
  process.exit(err ? 1 : 0);
}

async function main(): Promise<void> {
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
      entry.AAAA = ipRegex.v6().exec(line)![0];
    } else {
      entry.A = ipRegex.v4().exec(line)![0];
    }

    if (index >= 0) {
      partials[index] = entry;
    } else {
      partials.push(entry);
    }
  }

  const hints = partials as Array<HintEntry>;

  await writeFile(new URL("hints.json", import.meta.url), `${JSON.stringify(hints, null, 2)}\n`);
}

main().then(() => exit()).catch(exit);
