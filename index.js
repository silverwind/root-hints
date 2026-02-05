import {readFileSync} from "node:fs";

const hints = JSON.parse(readFileSync(new URL("hints.json", import.meta.url)));

const values = {
  A: hints.map(hint => hint.A),
  AAAA: hints.map(hint => hint.AAAA),
};

export default function rootHints(type) {
  if (values[type]) {
    return values[type];
  } else if (!type) {
    return hints;
  } else {
    throw new Error(`Unknown record type: ${type}`);
  }
}
