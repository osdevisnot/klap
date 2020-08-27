import { execSync } from 'child_process'
import { existsSync as exists, readFile as _readFile, writeFile as _writeFile } from 'fs'
import mkdir from 'mkdirp'
import { dirname, parse } from 'path'
import { promisify } from 'util'

const readFile = promisify(_readFile)
const writeFile = promisify(_writeFile)

const read = async (p) => readFile(p, 'utf-8')

const write = async (p, d) => {
	const dest = dirname(p)
	if (!exists(dest)) mkdir.sync(dest)
	await writeFile(p, d + '\n', 'utf-8')
}

const snakeToCamel = (string) =>
	string.replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace('-', '').replace('_', ''))

const safePackageName = (string) => snakeToCamel(string.replace('@', '').replace('/', '.'))

const trim = (string) => string.replace(/^\s|\s$/, '')

const baseName = (string) => parse(string).name

const exec = (cmd) => {
	try {
		return trim(execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString())
	} catch {
		return false
	}
}

export { exists, read, write, safePackageName, exec, baseName }
