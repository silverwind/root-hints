import {isIPv4, isIPv6} from "node:net";
import rootHints, {type Hint} from "./index.ts";

test.each([
  ["A", isIPv4],
  ["AAAA", isIPv6],
  [undefined, ({name}: Hint) => /^[a-z]\.root-servers\.net$/.test(name)],
] as const)("rootHints(%s) returns an array of at least 13 valid entries", (type, isValid) => {
  const entries = rootHints(type);
  expect(Array.isArray(entries)).toBe(true);
  expect(entries.length).toBeGreaterThanOrEqual(13);
  expect(entries.filter(entry => !isValid(entry as never))).toEqual([]);
});

test("rootHints throws on Object.prototype keys as record type", () => {
  expect(() => rootHints("toString" as "A")).toThrow("Unknown record type: toString");
});
