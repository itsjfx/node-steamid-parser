# node-steamid-parser
[![npm version](https://img.shields.io/npm/v/steamid-parser.svg)](https://npmjs.com/package/steamid-parser)

Just a wrapper around node-steamid to aid in parsing Steam IDs.

```
npm install steamid-parser
```

## This module

The idea was to have a module that could handle any input of steam id or vanity and be able to return a node-steamid instance for it.

Options (apiKey, checkForAccountID, checkNumberForVanity) can be overriden per get() call which allows it to be very customisable depending on use case and needs.

See JSDoc for in depth explanation.

## Examples

See example.js

It can handle steam profile links (/id/ or /profiles/), vanity text only, and any steam id format supported by node-steamid.

## JSDoc

See doc.md