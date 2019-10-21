# klap

zero config, zero dependency bundler for tiny javascript packages

## Features

- **zero config** uses your `package.json` to detemine source and target
- **zero dependency** using bundled deps.
- produces tiny, optimized code for all inputs
- creates multiple output formats `cjs`, `umd` and `esm`
- **zero config** typescript support

## Usage

### Initialize

The fastest way to get started with `klap` is to use `npm init` command.

```bash
npm init klap
```

if you are starting new project from scratch, just provide your `package-name` as an argument

```bash
npm init klap <my-package>
```

### `klap` commands

`npm init klap` adds `build`, `watch` and `start` commands to `scripts` section of your `package.json`

- Use **`npm run build`** to build your project.

- Use **`npm run watch`** to build and watch for changes.

- Use **`npm run start`** to watch and start a dev server.

## `klap` configuration

`klap` reads your `package.json` for configuration options. Notably,

- `pkg.source` determines source file to compile and bundle

- `pkg.main`, `pkg.module` and `pkg.browser` determines compilation targets

- `pkg.example` detemines the source file for `start` command

## License

**klap** is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).

Created with ♥ by [@osdevisnot](https://github.com/osdevisnot) and [all contributors](https://github.com/osdevisnot/klick/graphs/contributors).
