import { promisify } from 'util'
import { exists as _exists, writeFile as _writeFile, readFile as _readFile } from 'fs'
import { dirname } from 'path'
import mkdir from 'mkdirp'

const readFile = promisify(_readFile)
const writeFile = promisify(_writeFile)

export const exists = promisify(_exists)

export const read = async p => await readFile(p, 'utf-8')

export const write = async (p, d) => {
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

export const cleanName = str => snakeToCamel(str.replace('@', '').replace('/', '.'))
