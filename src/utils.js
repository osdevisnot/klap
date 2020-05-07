import { execSync } from 'child_process';
// TODO `exists` is deprecated, use fs.stat() or fs.access() instead.
// https://nodejs.org/api/fs.html#fs_fs_exists_path_callback
import { exists as _exists, readFile as _readFile, writeFile as _writeFile } from 'fs';
import mkdir from 'mkdirp';
import { dirname, parse } from 'path';
import { promisify } from 'util';

const readFile = promisify(_readFile);
const writeFile = promisify(_writeFile);
const exists = promisify(_exists);

const read = async (p) => await readFile(p, 'utf-8');

const write = async (p, d) => {
  const dest = dirname(p);
  if (!(await exists(dest))) mkdir.sync(dest);
  await writeFile(p, d + '\n', 'utf-8');
};

const snakeToCamel = (str) =>
  str.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''));

const safePackageName = (str) => snakeToCamel(str.replace('@', '').replace('/', '.'));

const trim = (str) => str.replace(/^\s|\s$/, '');

const baseName = (str) => parse(str).name;

const exec = (cmd) => {
  try {
    return trim(execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString());
  } catch {
    return false;
  }
};

export { exists, read, write, safePackageName, exec, baseName };
