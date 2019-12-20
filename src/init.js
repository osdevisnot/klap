import merge from 'deepmerge'
import sort from 'sort-package-json'
import cli from '../package.json'
import { info } from './logger'
import { exists, read, write } from './utils'

let name, source

const writePackage = async () => {
  let pkg = {}
  name = process
    .cwd()
    .split('/')
    .pop()
  source = `src/${name}.js`
  if (await exists('./package.json')) {
    pkg = JSON.parse(await read('./package.json'))
  }
  pkg = merge({ name, version: '0.0.0', license: 'MIT' }, pkg)
  pkg = merge(pkg, {
    main: `dist/${name}.cjs.js`,
    module: `dist/${name}.esm.js`,
    browser: `dist/${name}.js`,
    source,
    files: ['dist'],
    scripts: {
      build: 'klap build',
      prepublishOnly: 'klap build',
      start: 'klap start',
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
    [source]: `export const sum = (a, b) => a + b;`,
    'public/index.js': `import { sum } from '../src/${name}';\n\nconsole.log('this works => ', sum(2, 3));`,
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
		<script src="${pkg.module}" type="module"></script>
	</body>
</html>`,
    '.gitignore': ['node_modules', 'dist', 'coverage'].join('\n'),
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
