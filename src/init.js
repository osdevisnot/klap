import merge from 'deepmerge'
import sort from 'sort-package-json'
import cli from '../package.json'
import { info } from './logger'
import { exists, read, write } from './utils'

const writePackage = async () => {
	let pkg = {}
	if (await exists('./package.json')) {
		pkg = JSON.parse(await read('./package.json'))
	}
	pkg = merge(
		{
			name: process
				.cwd()
				.split('/')
				.pop(),
			version: '0.0.0',
		},
		pkg
	)
	pkg = merge(pkg, {
		main: 'dist/index.cjs.js',
		module: 'dist/index.esm.js',
		browser: 'dist/index.js',
		source: 'src/index.js',
		files: ['dist'],
		scripts: {
			start: 'klap start',
			build: 'klap build',
			watch: 'klap watch',
		},
		devDependencies: {
			[cli.name]: cli.version,
		},
	})
	await write('./package.json', JSON.stringify(sort(pkg), null, '  '))
	info('\t- wrote ./package.json')
	return pkg
}

const writeFiles = async pkg => {
	const files = {
		'src/index.js': `export const sum = (a, b) => a + b;`,
		'public/index.js': `import { sum } from '../src';\n\nconsole.log('this works => ', sum(2, 3));`,
		'public/index.html': `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="ie=edge" />
		<title>${pkg.name} example</title>
	</head>
	<body>
		<div id="root"></div>
		<script src="${pkg.browser}"></script>
	</body>
</html>`,
	}
	for (let [file, content] of Object.entries(files)) {
		if (!(await exists(file))) {
			await write(file, content)
			info(`\t- wrote ./${file}`)
		}
	}
}

export const init = async () => {
	const pkg = await writePackage()
	await writeFiles(pkg)
}
