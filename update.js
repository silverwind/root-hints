#!/usr/bin/env node
"use strict";

var fs           = require("fs");
var path         = require("path");
var got          = require("got");
var ipRegex      = require("ip-regex");

got("http://www.internic.net/domain/named.root", function (err, data) {
    var hints = [];

    data.split("\n").filter(function (line) {
       return !/^$/.test(line) && !/^;/.test(line) && !/\bNS\b/.test(line);
    }).forEach(function (line) {
        var name = /^(\S+)\.\s/.exec(line)[1].toLowerCase();

        var i;
        hints.some(function (el, index) {
            if (el.name === name) {
                i = index;
                return true;
            }
        });

        var entry = hints[i] || {};
        entry.name = name;

        if (/\bAAAA\b/.test(line)) {
            entry.AAAA = ipRegex.v6().exec(line)[0];
        } else {
            entry.A = ipRegex.v4().exec(line)[0];
        }

        if (typeof i === "number") {
            hints[i] = entry;
        } else {
            hints.push(entry);
        }
    });

    fs.writeFileSync(path.join(__dirname, "hints.json"), JSON.stringify(hints, null, 2) + "\n");
});
