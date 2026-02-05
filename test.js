import rootHints from "./index.js";
import assert from "node:assert";
import net from "node:net";

assert(Array.isArray(rootHints("A")));
assert(Array.isArray(rootHints("AAAA")));
assert(Array.isArray(rootHints()));

assert(rootHints("A").length >= 13);
assert(rootHints("AAAA").length >= 13);
assert(rootHints().length >= 13);

for (const address of rootHints("A")) assert(net.isIPv4(address));
for (const address of rootHints("AAAA")) assert(net.isIPv6(address));
for (const hint of rootHints()) assert(/^[a-z]\.root-servers\.net$/.test(hint.name));
