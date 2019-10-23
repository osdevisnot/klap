# klap

zero config, zero dependency bundler for tiny javascript packages

[![Build Status](https://travis-ci.org/osdevisnot/klap.svg?branch=master)](https://travis-ci.org/osdevisnot/klap)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **zero config**: detemine source and targets from `package.json`
- **zero config** typescript support: just rename `.js` file to `.ts`
- **tiny bundles**: produces tiny, optimized code for all inputs
- creates multiple output formats `cjs`, `umd` and `esm`
- **zero dependency**: bundled deps powered by [@zeit/ncc](https://www.npmjs.com/package/@zeit/ncc)

## Usage

First install klap as a global dep

```bash
npm install -g klap
```

Then, fire `init` command inside your package directory.

```bash
klap init
```

### `klap` commands

- Use **`npm run build`** to build your project.

- Use **`npm run watch`** to build and watch for changes.

- Use **`npm run start`** to watch and start a dev server.

## `klap` configuration

`klap` reads your `package.json` for config options. Notably,

- `pkg.source` determines source file to compile and bundle

- `pkg.main`, `pkg.module` and `pkg.browser` determines compilation targets

- `pkg.example` detemines the source file for `start` command

### Granular Control

For more granular control, configure `klap` using these properties in your `package.json`

- `klap.pragma` determines `pragma` for `jsx` and `tsx` compilation
- `klap.pragmaFrag` determines a `pragma` for `jsx` and `tsx` fragments

## License

**klap** is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).

Created with ♥ by [@osdevisnot](https://github.com/osdevisnot) and [all contributors](https://github.com/osdevisnot/klap/graphs/contributors).
