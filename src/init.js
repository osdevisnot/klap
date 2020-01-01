import merge from 'deepmerge';
import sort from 'sort-package-json';
import cli from '../package.json';
import { createIndex, createLicense, createTsConfig } from './init-create';
import { error, info, log } from './logger';
import { exec, exists, read, write } from './utils';

const unscopedName = name => name.split('/').pop();

const gitInfo = () => {
  let { user, email } = {};
  try {
    user = exec('git config github.username');
  } catch {
    try {
      user = exec('git config user.name');
    } catch {
      // neither github.username or user.name exist
    }
  }
  try {
    email = exec('git config user.email');
  } catch {
    // user.email doesn't exist
  }
  return { user, email };
};

const writePackage = async (template, { user, email }) => {
  let pkg = {},
    name = unscopedName(process.cwd());
  let source = `src/${name}.${template}`;
  if (await exists('./package.json')) {
    pkg = JSON.parse(await read('./package.json'));
  }
  pkg = merge({ name, version: '0.0.0', license: 'MIT', description: '' }, pkg);
  // only add fields to pkg if defined, otherwise omit them for author to
  // handle manually
  if (user) {
    pkg = merge({ repository: `${user}/${pkg.name}` }, pkg);
    if (email) pkg = merge({ author: `${user} <${email}>` }, pkg);
  }
  pkg = merge(pkg, {
    main: `dist/${name}.cjs.js`,
    unpkg: `dist/${name}.esm.js`,
    module: `dist/${name}.esm.js`,
    browser: `dist/${name}.js`,
    source,
    files: ['dist'],
    scripts: {
      build: 'klap build',
      prepublishOnly: 'yarn build',
      start: 'klap start',
      watch: 'klap watch',
    },
    prettier: '@osdevisnot/prettier',
    devDependencies: {
      [cli.name]: cli.version,
      '@osdevisnot/prettier': cli.devDependencies['@osdevisnot/prettier'],
    },
  });
  if (template !== 'js') {
    pkg = merge(pkg, { klap: { example: `public/index.${template}` } });
    if (template === 'ts' || template === 'tsx') {
      pkg = merge(pkg, {
        types: 'dist/types',
        scripts: { postbuild: 'tsc -p tsconfig.json' },
        devDependencies: { typescript: cli.devDependencies['typescript'] },
      });
    }
  }
  await write('./package.json', JSON.stringify(sort(pkg), null, '  '));
  info('\t- wrote ./package.json');
  return pkg;
};

const writeFiles = async (pkg, template) => {
  const defaults = {
    LICENSE: createLicense(pkg.author),
    '.gitignore': ['node_modules', 'dist', 'coverage'].join('\n'),
    'public/index.html': createIndex(pkg),
    [`public/index.${template}`]: `import { sum } from '../src/${unscopedName(
      pkg.name
    )}';\n\nconsole.log('this works => ', sum(2, 3));`,
    [pkg.source]: `export const sum = (a, b) => a + b;`,
  };
  // overrides based on templates
  const templates = {
    ts: {
      [pkg.source]: `export const sum = (a: number, b: number): number => a + b;`,
      'tsconfig.json': createTsConfig(),
    },
  };
  const files = Object.assign(
    {},
    defaults,
    templates[template.substring(0, 2)]
  );
  for (let [file, content] of Object.entries(files)) {
    if (!(await exists(file))) {
      await write(file, content);
      info(`\t- wrote ./${file}`);
    }
  }
};

export const init = async () => {
  let template = process.argv[3] || 'js'; // js, jsx, ts, tsx
  if (
    template == 'js' ||
    template == 'ts' ||
    template == 'jsx' ||
    template == 'tsx'
  ) {
  } else {
    error('Invalid init template. Try one of js, jsx, ts, tsx');
  }
  const pkg = await writePackage(template, gitInfo());
  await writeFiles(pkg, template);
  log('\nWant to use typescript with klap?');
  info('Initialize your package with `klap init ts`\n');
};
