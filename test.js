"use strict";

const rootHints = require(".");
const assert = require("assert");
const net = require("net");

assert(Array.isArray(rootHints("A")));
assert(Array.isArray(rootHints("AAAA")));
assert(Array.isArray(rootHints()));

assert(rootHints("A").length >= 13);
assert(rootHints("AAAA").length >= 13);
assert(rootHints().length >= 13);

rootHints("A").forEach(address => assert(net.isIPv4(address)));
rootHints("AAAA").forEach(address => assert(net.isIPv6(address)));
rootHints().forEach(hint => assert(/^[a-z]\.root-servers\.net$/.test(hint.name)));
