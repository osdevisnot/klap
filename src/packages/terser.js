/**
 * A rollup plugin to run generated code through `terser`
 * Why we need a custom plugin :- to be able to bundle things up.
 * - `rollup-plugin-terser` relies on `jest-worker`
 * - `jest-worker` had issues with bundling approach we want to follow for `klap`.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import merge from 'deepmerge';
import { codeFrameColumns } from '@babel/code-frame';
import { createFilter } from 'rollup-pluginutils';
import { minify } from 'terser';

import { error } from '../logger';

const cacheFileName = join(process.cwd(), 'node_modules', '.klap.cache.json');

const readNameCache = () => {
  try {
    return JSON.parse(readFileSync(cacheFileName, 'utf-8'));
  } catch (e) {}
  return {};
};
const writeNameCache = nameCache => {
  try {
    writeFileSync(cacheFileName, JSON.stringify(nameCache, null, '  ') + '\n');
  } catch (e) {}
};

const transform = (code, options) => {
  const result = minify(code, options);
  if (result.error) {
    throw result.error;
  }
  return result;
};

const nameCache = readNameCache();

export const terser = (options = {}) => {
  const filter = createFilter(options.include, options.exclude, {
    resolve: false,
  });

  delete options.include;
  delete options.exclude;

  const finalOptions = merge(
    {
      toplevel: true,
      mangle: { properties: { regex: '^_|^\\$' } },
      compress: { passes: 10, pure_getters: true },
      nameCache,
    },
    options
  );

  return {
    name: 'terser',

    renderChunk(code, chunk) {
      if (!filter(chunk.fileName)) return null;

      let result;
      try {
        result = transform(code, finalOptions);
      } catch (err) {
        const { message, line, col: column } = err;
        error(codeFrameColumns(code, { start: { line, column } }, { message }));
        throw err;
      }
      if (finalOptions.nameCache) {
        writeNameCache(finalOptions.nameCache);
      }
      return {
        code: result.code,
        map: result.map,
      };
    },
  };
};
