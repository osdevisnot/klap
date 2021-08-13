# klap :clap:

## a zero config, zero dependency bundler for tiny javascript packages.

<!-- prettier-ignore-start -->
[![Build Status](https://github.com/osdevisnot/klap/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/osdevisnot/klap/actions/workflows/build.yml)
![David](https://img.shields.io/david/osdevisnot/klap?style=flat-square)
![David](https://img.shields.io/david/dev/osdevisnot/klap?style=flat-square)
![npm](https://img.shields.io/npm/v/klap?style=flat-square)
![NPM](https://img.shields.io/npm/l/klap?style=flat-square)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- prettier-ignore-end -->

<img src="klap-init.gif" alt="klap output">

## :sparkles: Features

- :tada: **zero config**: bundle your library using only a `package.json`
- :boom: **zero config**: typescript support (just rename `*.js` to `*.ts`)
- :star2: **zero config**: code transforms using babel macros
- :rainbow: **zero config**: code generation using babel plugin codegen
- :rocket: **zero dependency**: uses [gcc-style bundling](https://www.npmjs.com/package/@vercel/ncc).
- :octopus: creates **tiny bundles** for multiple output formats `cjs`, `esm` and `umd`
- :fire: **Modern JS** syntax with class properties, async/await, and generators
- :zap: Built in Minification and Gzip Size Tracking
- :cyclone: Built in development server for quick prototyping.
- :confetti_ball: Supports **`react`**, **`styled-components`** and **`emotion`** out of the box.

### :muscle: Powered By

- [rollup](https://rollupjs.org) - Next-generation ES module bundler
- [babel](https://babeljs.io) - The compiler for next generation JavaScript
- [typescript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale.

## :plate_with_cutlery: Usage

First, initialize your project using `klap init`:

```bash
npx klap init
```

**Prefer Typescript ?** initialize using `ts` argument:

```bash
npx klap init ts
```

**Want to use JSX with Typescript?** `init` using `tsx` argument:

```bash
npx klap init tsx
```

The `init` command will create a minimal `package.json` with `source`, `main`, `module` and `browser` entries and the `build`, `watch` and `start` scripts.

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

> Note: Dropping `pkg.main` will disable `cjs` output, also applies to `esm` and `umd` outputs.

Then use `npm run` or `yarn` to invoke npm scripts as you normally would.

> See [examples](examples) for common use cases using `klap`.

### :anger: Granular Control

`klap` uses sensible defaults for most part. However, as needed, use below properties in `package.json` to fine tune `klap`. You can also use `cli flags` to control config options for `klap`.

| option            | cli flag(s)            | description                                    | default                                                       |
| ----------------- | ---------------------- | ---------------------------------------------- | ------------------------------------------------------------- |
| `source`          | -s&nbsp;--source       | source file to compile and bundle              | `src/index.js`                                                |
| `cjs`             | -c&nbsp;--cjs          | the output file for common js format           | pkg.main                                                      |
| `esm`             | -e&nbsp;--esm          | the output file for esm format                 | pkg.module                                                    |
| `umd`             | -u&nbsp;--umd          | the output file for umd format                 | pkg.browser                                                   |
| `types`           | -t&nbsp;--types        | the output file for type definitions           | pkg.types                                                     |
| `browserslist`    | -b&nbsp;--browserslist | browserslist compatible compilation target     | `last 2 versions modern browsers if usage is greater than 1%` |
| `klap.name`       | -n&nbsp;--name         | package name for `umd` bundles                 | sanitized `pkg.name`                                          |
| `klap.port`       | -p&nbsp;--port         | port for development server                    | `1234`                                                        |
| `klap.example`    | --example              | location of index js/ts file for start command | `public/index.js` or `pkg.source`                             |
| `klap.fallback`   | --fallback             | location of index html file for start command  | `public/index.html`                                           |
| `klap.target`     | --target               | target for development server (`umd, es`)      | `es`                                                          |
| `klap.sourcemap`  | --no-sourcemap         | sourcemaps for builds                          | `true`                                                        |
| `klap.minify`     | --no-minify            | minification for builds                        | `true`                                                        |
| `klap.runtime`    | --runtime              | the runtime for new JSX transform              | `react`                                                       |
| `klap.pragma`     | --pragma               | the JSX Pragma for classic runtime             | `react`                                                       |
| `klap.pragmaFrag` | --pragmaFrag           | JSX Fragment pragma                            | `react`                                                       |
| `klap.usets`      | --usets                | use typescript compiler for the project        | `false`                                                       |
| `klap.globals`    |                        | global names for umd bundles                   | `{}`                                                          |

> `--usets` allows the library code to use typescript features not supported by `@babel/preset-typescript`. See [const-enums](examples/const-enums) example to enable usage of const enums.

## :clinking_glasses: License

**klap** is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).

Created with ❤️ by [@osdevisnot](https://github.com/osdevisnot) and [all contributors](https://github.com/osdevisnot/klap/graphs/contributors).

## :sparkles: Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://v1rtl.site"><img src="https://avatars0.githubusercontent.com/u/35937217?v=4" width="100px;" alt=""/><br /><sub><b>v 1 r t l</b></sub></a><br /><a href="https://github.com/osdevisnot/klap/commits?author=talentlessguy" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/dnl-brnr"><img src="https://avatars1.githubusercontent.com/u/58155720?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Berner</b></sub></a><br /><a href="https://github.com/osdevisnot/klap/commits?author=dnl-brnr" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Tom-Julux"><img src="https://avatars2.githubusercontent.com/u/42802270?v=4" width="100px;" alt=""/><br /><sub><b>Tom Julius</b></sub></a><br /><a href="https://github.com/osdevisnot/klap/commits?author=Tom-Julux" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/marcuslindblom"><img src="https://avatars1.githubusercontent.com/u/319720?v=4" width="100px;" alt=""/><br /><sub><b>Marcus Lindblom</b></sub></a><br /><a href="https://github.com/osdevisnot/klap/commits?author=marcuslindblom" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## :gift_heart: Supporters

- [JetBrains](https://www.jetbrains.com/?from=klap) has been kind enough to support `klap` with an [open source license](https://www.jetbrains.com/community/opensource/?from=klap).
