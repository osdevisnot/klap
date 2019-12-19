import merge from 'deepmerge'
import { join } from 'path'
import ask from 'readline-sync'
import sort from 'sort-package-json'
import cli from '../package.json'
import { info, log, prompt } from './logger'
import { exists, read, write } from './utils'

let source,
  useTS = false,
  name = process
    .cwd()
    .split('/')
    .pop()

const writePackage = async () => {
  let pkg = {}
  if (await exists('./package.json')) {
    pkg = JSON.parse(await read('./package.json'))
  }
  pkg = merge({ name, version: '0.0.0', license: 'MIT' }, pkg)
  name = name.split('/').pop()
  source = useTS ? `src/${name}.ts` : `src/${name}.js`
  pkg = merge(pkg, {
    main: `dist/${name}.cjs.js`,
    module: `dist/${name}.esm.js`,
    browser: `dist/${name}.js`,
    source,
    files: ['dist'],
    scripts: merge(
      {
        build: 'klap build',
        prepublishOnly: 'klap build',
        start: 'klap start',
        watch: 'klap watch',
      },
      useTS && { postbuild: 'tsc -p tsconfig.json' }
    ),
    devDependencies: merge(
      { [cli.name]: cli.version },
      useTS && { typescript: cli.devDependencies.typescript }
    ),
  })
  if (useTS) {
    pkg = merge(pkg, {
      klap: { example: 'public/index.ts' },
      types: 'dist/types',
    })
  }
  await write('./package.json', JSON.stringify(sort(pkg), null, '  '))
  info('\t- wrote ./package.json')
  return pkg
}

const writeFiles = async pkg => {
  let example = useTS ? 'public/index.ts' : 'public/index.js'
  const files = merge(
    {
      [source]: `export const sum = (a, b) => a + b;`,
      [example]: `import { sum } from '../src/${name}';\n\nconsole.log('this works => ', sum(2, 3));`,
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
    },
    useTS && {
      'tsconfig.json':
        '' + (await read(join(__dirname, 'blueprints', 'tsconfig.json'))),
    }
  )
  for (let [file, content] of Object.entries(files)) {
    if (!(await exists(file))) {
      await write(file, content)
      info(`\t- wrote ./${file}`)
    }
  }
}

export const init = async () => {
  useTS = ask.keyInYN(prompt(`Do you prefer typescript ?`, `[default: y]`))
  name = ask.question(prompt(`What the package name ?`, `[default: ${name}]`), {
    defaultInput: name,
  })
  const pkg = await writePackage()
  await writeFiles(pkg)
  log('\ncheck more klap examples @ https://bit.ly/2tzP98y\n')
}
