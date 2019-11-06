# klap :clap:

> zero config, zero dependency bundler for tiny javascript packages.

[![Build Status](https://travis-ci.org/osdevisnot/klap.svg?branch=master)](https://travis-ci.org/osdevisnot/klap)
![David](https://img.shields.io/david/osdevisnot/klap)
![David](https://img.shields.io/david/dev/osdevisnot/klap)
![npm](https://img.shields.io/npm/v/klap)
![NPM](https://img.shields.io/npm/l/klap)

## :sparkles: Features

- :tada: **zero config** to bundle your library using only a `package.json`
- :rocket: **zero dependency** build tool.
- :boom: **zero config** typescript support (just rename `*.js` to `*.ts`)
- :star2: **zero config** code transforms using babel macros
- :haircut: **tiny bundles** for all inputs
- :fire: **Modern JS** syntax with class properties, async/await, and generators
- :confetti_ball: Supports **`react`** and **`styled-components`** out of the box.
- :octopus: creates multiple output formats `cjs`, `esm` and `umd`
- :zap: Built in Minification and Gzip Size Tracking
- :cyclone: Built in development server for quick prototyping.
- :snowflake: Carefully picked default to optimize generated code.

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

- `pkg.main`, `pkg.module` and `pkg.browser` determines compilation targets for `cjs`, `esm` and `umd` respectively.

- `pkg.example` determines the source file for `start` command

### :trident: Granular Control

For more granular control, configure `klap` using these properties in your `package.json`

| option              | description                               | default                                    |
| ------------------- | ----------------------------------------- | ------------------------------------------ |
| `klap.name`         | package name for `umd` bundles            | `pkg.name`                                 |
| `klap.port`         | port for development server               | `1234`                                     |
| `klap.index`        | location of index file                    | `public/index.html`                        |
| `klap.sourcemap`    | sourcemaps for builds                     | `true`                                     |
| `klap.minify`       | minification for builds                   | `true`                                     |
| `klap.pragma`       | pragma for `jsx` and `tsx` compilation    | `React.createElement`                      |
| `klap.pragmaFrag`   | pragma for `jsx` and `tsx` fragments      | `React.Fragment`                           |
| `klap.namedExports` | named exports for commonjs modules        | `{}`                                       |
| `klap.globals`      | global names for umd bundles              | `{}`                                       |
| `browserslist`      | browserlist compatible compilation target | `>1%, not dead, not ie 11, not op_mini all |

Note: See default [browserlist coverage](https://browserl.ist/?q=%3E1%25%2C+not+dead%2C+not+ie+11%2C+not+op_mini+all)

## :clinking_glasses: License

**klap** is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).

Created with ♥ by [@osdevisnot](https://github.com/osdevisnot) and [all contributors](https://github.com/osdevisnot/klap/graphs/contributors).
