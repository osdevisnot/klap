# klap :clap:

a zero config, zero dependency bundler for tiny javascript packages.

[![Build Status](https://travis-ci.org/osdevisnot/klap.svg?branch=master)](https://travis-ci.org/osdevisnot/klap)
![David](https://img.shields.io/david/osdevisnot/klap)
![David](https://img.shields.io/david/dev/osdevisnot/klap)
![npm](https://img.shields.io/npm/v/klap)
![NPM](https://img.shields.io/npm/l/klap)

<table border="0">
<tr><td>
<img src="docs/klap-init.gif" alt="klap init output">
</td><td>
<img src="docs/klap-build.gif" alt="klap build output">
</td></tr>
</table>

## :sparkles: Features

- :tada: **zero config**: bundle your library using only a `package.json`
- :boom: **zero config**: typescript support (just rename `*.js` to `*.ts`)
- :star2: **zero config**: code transforms using babel macros
- :rocket: **zero dependency**: uses [gcc-style bundling](https://www.npmjs.com/package/@zeit/ncc).
- :octopus: creates **tiny bundles** for multiple output formats `cjs`, `esm` and `umd`
- :fire: **Modern JS** syntax with class properties, async/await, and generators
- :zap: Built in Minification and Gzip Size Tracking
- :cyclone: Built in development server for quick prototyping.
- :confetti_ball: Supports **`react`** and **`styled-components`** out of the box.

### :muscle: Powered By

- [rollup](https://rollupjs.org) - Next-generation ES module bundler
- [babel](https://babeljs.io) - The compiler for next generation JavaScript

## :plate_with_cutlery: Usage

First, setup your project using `klap init`:

```bash
npx klap init
```

This will create a minimal `package.json` with `source`, `main`, `module` and `browser` entries and the `build`, `watch` and `start` scripts.

```jsonc
{
  "name": "...",
  "version": "0.0.0",
  "files": [ "dist" ],
  "source": "src/sum.js",         # source file of your package
  "main": "dist/sum.cjs.js",      # commonjs bundle target
  "module": "dist/sum.esm.js",    # esm bundle target
  "browser": "dist/sum.js",       # umd bundle target
  "scripts": {
    "build": "klap build",        # bundle your package
    "watch": "klap watch",        # bundle your package and watch for changes
    "start": "klap start",        # start a development server
  },
  "devDependencies": {
    "klap": "3.2.0"               # klap as dev dependency
  }
}

```

> Note: Dropping `pkg.main` will disable `cjs` output. This also applies to `esm` and `umd` as well.

Then use `npm run` or `yarn` to invoke npm scripts as you normally would.

### :anger: Granular Control

`klap` uses sensible defaults for most part. However, as needed, use below properties in `package.json` to fine tune `klap`. You can also use `cli flags` to control config options for `klap`.

| option              | cli flag(s)           | description                               | default                           |
| ------------------- | --------------------- | ----------------------------------------- | --------------------------------- |
| `source`            | -s&nbsp;--source      | source file to compile and bundle         | `src/index.js`                    |
| `klap.name`         | -n&nbsp;--name        | package name for `umd` bundles            | sanitized `pkg.name`              |
| `klap.port`         | -p&nbsp;--port        | port for development server               | `1234`                            |
| `klap.target`       | -t&nbsp;--target      | target for development server (`umd|es`)  | `es`                              |
| `browserslist`      | -b&nbsp;--browserlist | browserlist compatible compilation target | `>1%, not ie 11, not op_mini all` |
| `klap.example`      | -e&nbsp;--example     | location of index js/ts file for example  | `public/index.js`                 |
| `klap.fallback`     | -f&nbsp;--fallback    | location of index html file for example   | `public/index.html`               |
| `klap.sourcemap`    | --no-sourcemap        | sourcemaps for builds                     | `true`                            |
| `klap.minify`       | --no-minify           | minification for builds                   | `true`                            |
| `klap.pragma`       | --pragma              | pragma for `jsx` and `tsx` compilation    | `React.createElement`             |
| `klap.frag`         | --frag                | pragma for `jsx` and `tsx` fragments      | `React.Fragment`                  |
| `klap.globals`      |                       | global names for umd bundles              | `{}`                              |
| `klap.namedExports` |                       | named exports for commonjs modules        | `{}`                              |

> Note: See default [browserlist coverage](https://browserl.ist/?q=%3E1%25%2C+not+ie+11%2C+not+op_mini+all)

## :clinking_glasses: License

**klap** is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).

Created with ♥ by [@osdevisnot](https://github.com/osdevisnot) and [all contributors](https://github.com/osdevisnot/klap/graphs/contributors).
