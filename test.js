"use strict";

var assert = require("assert");
var net    = require("net");
var hints  = require("./");

it("should return an array", function() {
  assert(Array.isArray(hints("A")));
  assert(Array.isArray(hints("AAAA")));
  assert(Array.isArray(hints()));
});

it("should return a minimum of records", function() {
  assert(hints("A").length >= 13);
  assert(hints("AAAA").length >= 11);
  assert(hints().length >= 13);
});

it("should return valid IPv4 addresses", function() {
  hints("A").forEach(function(address) {
    assert(net.isIPv4(address));
  });
});

it("should return valid IPv6 addresses", function() {
  hints("AAAA").forEach(function(address) {
    assert(net.isIPv6(address));
  });
});

it("should return names in the root-servers.net zone", function() {
  hints().forEach(function(hint) {
    assert(/^[a-z]\.root-servers\.net$/.test(hint.name));
  });
});
