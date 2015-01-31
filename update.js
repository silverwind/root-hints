#!/usr/bin/env node
"use strict";

var fs  = require("fs"),
    got = require("got");

got("http://www.internic.net/domain/named.root", function (err, data) {
    if (err) return console.err(err);
    var lines = String(data).split("\n");

    // Exclude comments, "." lines and empty lines
    lines = lines.filter(function (line) {
        return !/^[\.|\;]$/.test(line[0]) && line.trim().length;
    });

    // Create a hash table of servers
    var servers = {};
    lines.forEach(function(line) {
        var parts = line.split(/\s+/), name = /(.+)\.$/.exec(parts[0])[1].toLowerCase();
        if (!servers[name]) servers[name] = {};
        servers[name][parts[2]] = parts[3];
    });

    // Put the server names into the result array
    var result = [];
    Object.keys(servers).forEach(function(server) {
        servers[server].name = server;
        result.push(servers[server]);
    });

    fs.writeFile("hints.json", JSON.stringify(result, null, 2), function (err) {
        if (err) return console.err(err);
        console.log("hints.json updated successfully!");
    });
});
