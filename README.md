#root-hints [![NPM version](https://img.shields.io/npm/v/root-hints.svg?style=flat)](https://www.npmjs.org/package/root-hints)
> Provides IP addresses of the DNS root server, aka root hints

##Installation
```bash
npm install --save root-hints
```
##Usage
```js
var rootHints = require("root-hints");

console.log(rootHints("A"));
// -> ["198.41.0.4", "192.228.79.201", ...]

console.log(rootHints("AAAA"));
// -> ["2001:503:BA3E::2:30", "2001:500:84::B", ...]

console.log(rootHints());
// -> [{ A: '198.41.0.4', AAAA: '2001:503:ba3e::2:30', name: 'a.root-servers.net' }, ...]
```

© 2014-2015 [silverwind](https://github.com/silverwind), distributed under BSD licence
