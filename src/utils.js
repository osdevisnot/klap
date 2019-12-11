import mkdir from 'mkdirp'
import { dirname } from 'path'
import { promisify } from 'util'
import { exists as _exists, readFile as _readFile, writeFile as _writeFile } from 'fs'

const readFile = promisify(_readFile)
const writeFile = promisify(_writeFile)
const exists = promisify(_exists)

const read = async p => await readFile(p, 'utf-8')

const write = async (p, d) => {
  const dest = dirname(p)
  if (!(await exists(dest))) mkdir.sync(dest)
  await writeFile(p, d + '\n', 'utf-8')
}

const snakeToCamel = str =>
  str.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', '')
  )

const safePackageName = str => snakeToCamel(str.replace('@', '').replace('/', '.'))

export { exists, read, write, safePackageName }
