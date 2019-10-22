import json from 'rollup-plugin-json';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

import { babelConfig } from './babel';

export const plugins = async (command, pkg) => {
  const { extensions, presets, plugins } = await babelConfig(command, pkg);
  return [
    json(),
    nodeGlobals(),
    nodeResolve({ mainFields: ['module', 'main'], extensions }),
    commonjs(),
    babel({ babelrc: false, extensions, presets, plugins }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    command === 'start' && serve({ contentBase: ['dist', 'public'], historyApiFallback: true, port: 1234 }),
    command === 'start' && livereload('dist'),
  ].filter(Boolean);
};
