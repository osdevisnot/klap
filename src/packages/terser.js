/**
 * A rollup plugin to run generated code through `terser`
 * Why we need a custom plugin :- to be able to bundle things up.
 * - `rollup-plugin-terser` relies on `jest-worker`
 * - `jest-worker` had issues with bundling approach we want to follow for `klap`.
 */

import { codeFrameColumns } from '@babel/code-frame';
import { createFilter } from 'rollup-pluginutils';
import { minify } from 'terser';
import { error } from '../logger';

const transform = (code, options) => {
  const result = minify(code, options);
  if (result.error) {
    throw result.error;
  }
  return result;
};

export const terser = (options = {}) => {
  const filter = createFilter(options.include, options.exclude, {
    resolve: false,
  });

  return {
    name: 'terser',

    renderChunk(code, chunk) {
      if (!filter(chunk.fileName)) return null;

      let result;
      try {
        result = transform(code, {
          sourceMap: options.sourcemap,
          toplevel: true,
          mangle: { properties: { regex: '^_' } },
          compress: { passes: 10, pure_getters: true },
        });
      } catch (err) {
        const { message, line, col: column } = err;
        error(codeFrameColumns(code, { start: { line, column } }, { message }));
        throw err;
      }
      return {
        code: result.code,
        map: result.map,
      };
    },
  };
};
