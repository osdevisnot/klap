import { exists, write } from './utils';
import merge from 'deepmerge';
import sort from 'sort-package-json';
import cli from '../package.json';

const writePackage = async () => {
  let pkg = {};
  if (await exists('./package.json')) {
    pkg = JSON.parse(await read('./package.json'));
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
  );
  pkg = merge(pkg, {
    main: 'dist/index.cjs.js',
    module: 'dist/index.esm.js',
    browser: 'dist/index.js',
    source: 'src/index.js',
    example: 'public/index.js',
    scripts: {
      start: 'klap start',
      build: 'klap build',
      watch: 'klap watch',
    },
    devDependencies: {
      [cli.name]: cli.version,
    },
  });
  await write('./package.json', JSON.stringify(sort(pkg), null, '  '));
  return pkg;
};

const writeFiles = async pkg => {
  const files = {
    'src/index.js': `export const sum = (a, b) => a + b;`,
    'public/index.js': `import { sum } from '../src';\n\nconsole.log('this works => ', sum);`,
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
		<script src="${pkg.browser}" type="module"></script>
	</body>
</html>`,
  };
  for (let [file, content] of Object.entries(files)) {
    await write(file, content);
  }
};

export default async () => {
  const pkg = await writePackage();
  await writeFiles(pkg);
};
