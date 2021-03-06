# root-hints
[![](https://img.shields.io/npm/v/root-hints.svg?style=flat)](https://www.npmjs.org/package/root-hints) [![](https://img.shields.io/npm/dm/root-hints.svg)](https://www.npmjs.org/package/root-hints)
> Provides IP addresses of the DNS root servers, also known as root hints.

## Installation

```sh
$ npm i root-hints
```

## Usage

```js
const rootHints = require('root-hints');

rootHints('A');
// ['198.41.0.4', '192.228.79.201', ...]

rootHints('AAAA');
// ['2001:503:BA3E::2:30', '2001:500:84::B', ...]

rootHints();
// [{ A: '198.41.0.4', AAAA: '2001:503:ba3e::2:30', name: 'a.root-servers.net' }, ...]
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
