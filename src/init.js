import merge from 'deepmerge'
import sort from 'sort-package-json'
import cli from '../package.json'
import { getDefaults, getTemplates } from './init-create'
import { error, info, warn } from './logger'
import { exec, exists, read, write, baseName } from './utils'

/**
 * Source user's .gitconfig info (name & email)
 */
const gitInfo = () => {
	const cmd = 'git config'
	const email = exec(`${cmd} user.email`)
	const user = exec(`${cmd} github.username`) || exec(`${cmd} user.name`)
	if (!user) {
		error('Command Failed: Tried `git config github.username` && `git config user.name`')
		warn('Count not determine `repository` and `author` fields for `package.json`')
		warn('Skipped generating `LICENSE` file')
	}

	return { user, email }
}

/**
 * Generate / supplement `package.json` with fields and klap scripts
 */
const writePackage = async (template, { user, email }) => {
	let pkg = {}
	const name = process.cwd().split('/').pop()
	const source = `src/${name}.${template}`

	if (exists('./package.json')) {
		pkg = JSON.parse(await read('./package.json'))
	}

	pkg = merge(
		{
			name,
			version: '0.0.0',
			license: 'MIT',
			description: name,
			exports: {
				'.': {
					browser: `./dist/${name}.js`,
					import: `./dist/${name}.js`,
					require: `./dist/${name}.cjs.js`,
					umd: `./dist/${name}.umd.js`,
				},
				'./': './',
				'./package.json': './package.json',
			},
			keywords: [name],
		},
		pkg
	)

	if (user) {
		pkg = merge({ repository: `${user}/${pkg.name}` }, pkg)
		if (email) pkg = merge({ author: `${user} <${email}>` }, pkg)
	}

	pkg = merge(pkg, {
		main: `dist/${name}.cjs.js`,
		unpkg: `dist/${name}.js`,
		module: `dist/${name}.js`,
		browser: `dist/${name}.umd.js`,
		types: `dist/${name}.d.ts`,
		source,
		sideEffects: false,
		files: ['dist'],
		scripts: {
			build: 'klap build',
			prepublishOnly: 'yarn build',
			start: 'klap start',
			watch: 'klap watch',
		},
		devDependencies: {
			[cli.name]: `^${cli.version}`,
			typescript: cli.devDependencies.typescript,
		},
	})

	if (template !== 'js') {
		pkg = merge(pkg, { klap: { example: `public/index.${template}` } })
	}

	await write('./package.json', JSON.stringify(sort(pkg), null, '  '))
	info('\t- wrote ./package.json')
	return pkg
}

/**
 * Write boilerplate scripts and common files such as LICENSE and .gitignore to user's directories.
 */
const writeFiles = async (pkg, template, options) => {
	// An array of objects each having `file`, `content`, & optionally `extensions` properties
	const files = [...getDefaults(pkg, template, options), ...getTemplates(pkg, template, options)]

	// Write files, that do not already exist.
	for (const { file, content, extensions } of files) {
		let existing = false
		// If there's a range of possible extensions, check them all.

		existing = extensions
			? // eslint-disable-next-line no-await-in-loop
			  (await Promise.all(extensions.map(async (ext) => exists(baseName(file) + ext)))).includes(true)
			: exists(file)

		if (!existing) {
			// eslint-disable-next-line no-await-in-loop
			await write(file, content)
			info(`\t- wrote ./${file}`)
		}
	}
}

/**
 * The main function exported by this module.
 */
export const init = async () => {
	const template = process.argv[3] || 'js'

	if (!['js', 'ts', 'jsx', 'tsx'].includes(template)) {
		error('Invalid init template. Try one of js, jsx, ts, tsx')
		return
	}

	const options = gitInfo()
	const pkg = await writePackage(template, options)
	await writeFiles(pkg, template, options)
}
