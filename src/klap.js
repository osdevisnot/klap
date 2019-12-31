import del from 'del';
import { dirname } from 'path';
import { rollup, watch } from 'rollup';
import { error, info } from './logger';
import { getOptions } from './options';
import { plugins } from './plugins';

const defaultOptions = { esModule: false, strict: false, freeze: false };

const buildConfig = (command, pkg, options) => {
  const {
    dependencies = {},
    peerDependencies = {},
    main,
    module,
    browser,
  } = pkg;
  const { name, globals, source: input, sourcemap } = options;
  const external = Object.keys({ ...dependencies, ...peerDependencies });

  let inputOptions = [
    main && {
      external,
      input,
      plugins: plugins(command, pkg, { ...options, format: 'cjs' }),
    },
    module && {
      external,
      input,
      plugins: plugins(command, pkg, { ...options, format: 'es' }),
    },
    browser && {
      external,
      input,
      plugins: plugins(command, pkg, { ...options, format: 'umd' }),
    },
  ].filter(Boolean);

  let outputOptions = [
    main && { ...defaultOptions, file: main, format: 'cjs', sourcemap },
    module && { ...defaultOptions, file: module, format: 'es', sourcemap },
    browser && {
      ...defaultOptions,
      file: browser,
      format: 'umd',
      name,
      sourcemap,
      globals,
    },
  ].filter(Boolean);

  return { inputOptions, outputOptions };
};

const startConfig = (command, pkg, options) => {
  const { module, browser } = pkg;
  const { name, globals, example: input, sourcemap, target } = options;
  let inputOptions, outputOptions;
  if (target === 'es') {
    inputOptions = {
      input,
      plugins: plugins(command, pkg, { ...options, format: 'es' }),
    };
    outputOptions = {
      ...defaultOptions,
      file: module,
      format: 'es',
      sourcemap,
    };
  } else if (target === 'umd') {
    inputOptions = {
      input,
      plugins: plugins(command, pkg, { ...options, format: 'umd' }),
    };
    outputOptions = {
      ...defaultOptions,
      file: browser,
      format: 'umd',
      name,
      sourcemap,
      globals,
    };
  }
  return { inputOptions, outputOptions };
};

const deleteDirs = async pkg => {
  const dirs = {};
  ['main', 'module', 'browser'].map(
    type => pkg[type] && (dirs[dirname(pkg[type]) + '/*.{js,map}'] = true)
  );
  await del(Object.keys(dirs));
};

const writeBundle = async (bundle, outputOptions) => {
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
};

const build = async (options, index, inputOptions) => {
  let err, bundle;

  try {
    bundle = await rollup(inputOptions);
  } catch (e) {
    err = e;
  }
  err ? error(err) : await writeBundle(bundle, options);
};

const processWatcher = event => {
  switch (event.code) {
    case 'ERROR':
      error(event.error);
      break;
    case 'END':
      info(
        `${new Date().toLocaleTimeString('en-GB')} - Waiting for Changes...`
      );
      break;
  }
};

const klap = async (command, pkg) => {
  const options = getOptions(pkg);
  await deleteDirs(pkg);
  let config, watchOptions, watcher;
  switch (command) {
    case 'build':
      config = buildConfig(command, pkg, options);
      config.outputOptions.map((opts, index) =>
        build(opts, index, config.inputOptions[index])
      );
      break;
    case 'watch':
      config = buildConfig(command, pkg, options);
      watchOptions = config.outputOptions.map((output, index) => ({
        ...config.inputOptions[index],
        output,
      }));
      watcher = watch(watchOptions);
      watcher.on('event', processWatcher);
      break;
    case 'start':
      config = startConfig(command, pkg, options);
      watchOptions = {
        ...config.inputOptions,
        output: config.outputOptions,
      };
      watcher = watch(watchOptions);
      watcher.on('event', processWatcher);
      break;
  }
};

// Experimental: Export internals to support extending parts of `klap`
// Remove parts once we determine what we need in `tslib-cli`
export { babelConfig } from './babel';
export { init } from './init';
export { bold, error, gray, green, info, log, warn } from './logger';
export { getOptions } from './options';
export { servor } from './packages/servor';
export { sizeme } from './packages/sizeme';
export { terser } from './packages/terser';
export { plugins } from './plugins';
export { exists, read, safePackageName, write } from './utils';
export { klap };
