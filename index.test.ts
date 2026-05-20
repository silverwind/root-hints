import {isIPv4, isIPv6} from "node:net";
import rootHints from "./index.ts";

test("rootHints returns arrays", () => {
  expect(Array.isArray(rootHints("A"))).toBe(true);
  expect(Array.isArray(rootHints("AAAA"))).toBe(true);
  expect(Array.isArray(rootHints())).toBe(true);
});

test("rootHints returns at least 13 entries", () => {
  expect(rootHints("A").length).toBeGreaterThanOrEqual(13);
  expect(rootHints("AAAA").length).toBeGreaterThanOrEqual(13);
  expect(rootHints().length).toBeGreaterThanOrEqual(13);
});

test("rootHints A entries are valid IPv4 addresses", () => {
  for (const address of rootHints("A") as Array<string>) {
    expect(isIPv4(address)).toBe(true);
  }
});

test("rootHints AAAA entries are valid IPv6 addresses", () => {
  for (const address of rootHints("AAAA") as Array<string>) {
    expect(isIPv6(address)).toBe(true);
  }
});

test("rootHints entries have valid root server names", () => {
  for (const hint of rootHints() as Array<{name: string}>) {
    expect(hint.name).toMatch(/^[a-z]\.root-servers\.net$/);
  }
});
