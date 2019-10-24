<h1 align="center">klap&nbsp;&nbsp;<a href="https://travis-ci.org/osdevisnot/klap"><img src="https://travis-ci.org/osdevisnot/klap.svg?branch=master"></a>&nbsp;<a href="https://www.npmjs.com/package/klap"><img alt="NPM" src="https://img.shields.io/npm/l/klap"></a></h1><p align="center"><strong>zero config, zero dependency</strong> bundler for tiny javascript packages.</p>

---

> ### 🛠 Status: In Development
>
> Expect breaking changes in patch version until we reach **1.0 Milestone**

## :sparkles: Features

- :rocket: **zero dependency**
- :tada: **zero config** to bundle your library using only a `package.json`
- :boom: **zero config** typescript support (just rename `*.js` to `*.ts`)
- :star2: **zero config** code transforms using babel macros
- :haircut: **tiny bundles** for all inputs
- :octopus: creates multiple output formats `cjs`, `esm` and `umd`
- :fire: **Modern JS** syntax with class properties, async/await, and generators
- :zap: Built in Minification and Gzip Size Tracking
- :cyclone: Built in development server for quick prototyping.

### :muscle: Powered By

- [babel](https://babeljs.io) The compiler for next generation JavaScript
- [rollup](https://rollupjs.org) Next-generation ES module bundler

## :plate_with_cutlery: Usage

First, Install klap as a global dependency.

```bash
npm install -g klap
```

Then, use `init` command inside your package directory.

```bash
klap init
```

> Tip: use `yarn init --yes` first if you are starting a new project

### `klap` commands

- **`npm run build`** to build your project.

- **`npm run watch`** to build and watch for changes.

- **`npm run start`** to watch and start a dev server.

## :anger: `klap` configuration

`klap` reads your `package.json` for config options. Notably,

- `pkg.source` determines source file to compile and bundle

- `pkg.main`, `pkg.module` and `pkg.browser` determines compilation targets for `cjs`, `esm` and `umd` targets respectively.

- `pkg.example` detemines the source file for `start` command

### :trident: Granular Control

For more granular control, configure `klap` using these properties in your `package.json`

- `klap.pragma` determines `pragma` for `jsx` and `tsx` compilation. Useful for react like libraries such as `preact`, `hyperapp`, `superfine` or `klick`
- `klap.pragmaFrag` determines a `pragma` for `jsx` and `tsx` fragments.

## :clinking_glasses: License

**klap** is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).

Created with ♥ by [@osdevisnot](https://github.com/osdevisnot) and [all contributors](https://github.com/osdevisnot/klap/graphs/contributors).
