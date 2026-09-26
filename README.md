# root-hints
[![](https://img.shields.io/npm/v/root-hints.svg?style=flat)](https://www.npmjs.org/package/root-hints) [![](https://img.shields.io/npm/dm/root-hints.svg)](https://www.npmjs.org/package/root-hints) [![](https://packagephobia.com/badge?p=root-hints)](https://packagephobia.com/result?p=root-hints)

> Provides IP addresses of the DNS root servers, also known as root hints.

## Usage

```sh
pnpm add root-hints
```

```js
import rootHints from "root-hints";

rootHints("A");
// ["198.41.0.4", "170.247.170.2", ...]

rootHints("AAAA");
// ["2001:503:ba3e::2:30", "2801:1b8:10::b", ...]

rootHints();
// [{name: "a.root-servers.net", A: "198.41.0.4", AAAA: "2001:503:ba3e::2:30"}, ...]
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
