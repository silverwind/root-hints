"use strict";

module.exports = function rootHints(recordType) {
    var hints;
    if (typeof recordType === "undefined")
        recordType = "A";

    if (recordType === "A") {
        hints = [
            "198.41.0.4",           // A.ROOT-SERVERS.NET
            "192.228.79.201",       // B.ROOT-SERVERS.NET
            "192.33.4.12",          // C.ROOT-SERVERS.NET
            "199.7.91.13",          // D.ROOT-SERVERS.NET
            "192.203.230.10",       // E.ROOT-SERVERS.NET
            "192.5.5.241",          // F.ROOT-SERVERS.NET
            "192.112.36.4",         // G.ROOT-SERVERS.NET
            "128.63.2.53",          // H.ROOT-SERVERS.NET
            "192.36.148.17",        // I.ROOT-SERVERS.NET
            "192.58.128.30",        // J.ROOT-SERVERS.NET
            "193.0.14.129",         // K.ROOT-SERVERS.NET
            "199.7.83.42",          // L.ROOT-SERVERS.NET
            "202.12.27.33"          // M.ROOT-SERVERS.NET
        ];
    } else if (recordType === "AAAA") {
        hints = [
            "2001:503:BA3E::2:30",  // A.ROOT-SERVERS.NET
            "2001:500:84::B",       // B.ROOT-SERVERS.NET
            "2001:500:2::C",        // C.ROOT-SERVERS.NET
            "2001:500:2D::D",       // D.ROOT-SERVERS.NET
                                    // E.ROOT-SERVERS.NET
            "2001:500:2F::F",       // F.ROOT-SERVERS.NET
                                    // G.ROOT-SERVERS.NET
            "2001:500:1::803F:235", // H.ROOT-SERVERS.NET
            "2001:7FE::53",         // I.ROOT-SERVERS.NET
            "2001:503:C27::2:30",   // J.ROOT-SERVERS.NET
            "2001:7FD::1",          // K.ROOT-SERVERS.NET
            "2001:500:3::42",       // L.ROOT-SERVERS.NET
            "2001:DC3::35"          // M.ROOT-SERVERS.NET
        ];
    } else {
        throw new Error("Unknown record type: " + recordType);
    }
    return hints;
};
