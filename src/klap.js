import { rollup, watch } from 'rollup';
import { cleanName } from './utils';
import { plugins } from './plugins';
import { log } from './logger';

const createConfig = async (command, pkg) => {
  const { dependencies = {}, peerDependencies = {}, example, browser, source, main, module } = pkg;
  const external = Object.keys({ ...dependencies, ...peerDependencies });
  let outputOptions,
    inputOptions = { external };

  if (command === 'start') {
    inputOptions = { ...inputOptions, input: example };
    outputOptions = [{ file: browser, format: 'umd' }];
  } else {
    inputOptions = { ...inputOptions, input: source };
    outputOptions = [
      main && { file: main, format: 'cjs' },
      module && { file: module, format: 'es' },
      browser && { file: browser, format: 'umd', name: cleanName(pkg.name) },
    ].filter(Boolean);
  }

  inputOptions = { ...inputOptions, plugins: await plugins(command, pkg) };

  return { inputOptions, outputOptions };
};

const writeBundle = async (bundle, outputOptions) => {
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
};

export const klap = async (command, pkg) => {
  const { inputOptions, outputOptions } = await createConfig(command, pkg);
  switch (command) {
    case 'build':
      const bundle = await rollup(inputOptions);
      outputOptions.map(out => writeBundle(bundle, out));
      break;
    case 'watch':
    case 'start':
      const watchOptions = {
        ...inputOptions,
        output: outputOptions,
      };
      const watcher = watch(watchOptions);
      watcher.on('event', event => {
        switch (event.code) {
          case 'ERROR':
            log.error(event.error);
            break;
          case 'END':
            log.info(`${new Date().toLocaleTimeString('en-GB')} - Waiting for Changes...`);
            break;
        }
      });
      break;
  }
};
