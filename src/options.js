import getopts from 'getopts';
import { safePackageName } from './utils';

const getOptions = pkg => {
  const {
    klap = {},
    source = 'src/index.js',
    browserlist = '>1%, not ie 11, not op_mini all',
  } = pkg;
  const {
    name = pkg.name,
    port = 1234,
    sourcemap = true,
    minify = true,
    target = 'es',
    globals = {},
    namedExports = {},
    fallback = 'public/index.html',
    example = 'public/index.js',
    closure = false,
  } = klap;
  const opts = getopts(process.argv.slice(2), {
    boolean: ['sourcemap', 'minify', 'closure'],
    alias: {
      name: 'n',
      port: 'p',
      source: 's',
      target: 't',
      fallback: 'f',
      example: 'e',
      browserlist: 'b',
      closure: 'c',
    },
    default: {
      name: safePackageName(name),
      source,
      port,
      target,
      sourcemap,
      minify,
      fallback,
      example,
      browserlist,
      closure,
    },
  });
  return { ...opts, globals, namedExports };
};

export { getOptions };
