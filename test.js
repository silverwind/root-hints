"use strict";

const assert = require("assert");
const net    = require("net");
const hints  = require(".");

assert(Array.isArray(hints("A")));
assert(Array.isArray(hints("AAAA")));
assert(Array.isArray(hints()));

assert(hints("A").length >= 13);
assert(hints("AAAA").length >= 13);
assert(hints().length >= 13);

hints("A").forEach(function(address) {
  assert(net.isIPv4(address));
});

hints("AAAA").forEach(function(address) {
  assert(net.isIPv6(address));
});

hints().forEach(function(hint) {
  assert(/^[a-z]\.root-servers\.net$/.test(hint.name));
});
