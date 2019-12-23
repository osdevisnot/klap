import json from 'rollup-plugin-json';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import sourcemaps from 'rollup-plugin-sourcemaps';

import { terser } from './packages/terser';
import { sizeme } from './packages/sizeme';
import { servor } from './packages/servor';

import { babelConfig } from './babel';

const plugins = (command, pkg, options) => {
  const { extensions, presets, plugins } = babelConfig(command, pkg, options);
  const { sourcemap, minify, fallback, port, namedExports } = options;

  const babelDefaults = { babelrc: false, configFile: false, compact: false };

  return [
    sourcemap && sourcemaps(),
    json(),
    nodeGlobals(),
    nodeResolve({
      mainFields: ['module', 'jsnext:main', 'browser', 'main'],
      extensions,
    }),
    commonjs({ extensions, include: /\/node_modules\//, namedExports }),
    babel({
      ...babelDefaults,
      exclude: 'node_modules/**',
      extensions,
      presets,
      plugins,
    }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    command !== 'start' && minify && terser({ sourcemap, warnings: false }),
    command !== 'start' && sizeme(),
    command === 'start' && servor({ fallback, port }),
  ].filter(Boolean);
};

export { plugins };
