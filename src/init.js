import merge from 'deepmerge';
import sort from 'sort-package-json';
import cli from '../package.json';
import { getDefaults, getTemplates } from './init-create';
import { error, info, log } from './logger';
import { exec, exists, read, write } from './utils';

/**
 * Source user's .gitconfig info (name & email)
 */
const gitInfo = () => {
  const cmd = 'git config';
  const email = exec(`${cmd} user.email`);
  const user = exec(`${cmd} github.username`) || exec(`${cmd} user.name`);
  if (!user) {
    error('Command Failed: Tried `git config github.username` && `git config user.name`');
    warn('Count not determine `repository` and `author` fields for `package.json`');
    warn('Skipped generating `LICENSE` file');
  }
  return { user, email };
};

/**
 * Generate / supplement `package.json` with fields and klap scripts
 */
const writePackage = async (template, { user, email }) => {
  let pkg = {};
  const name = process
    .cwd()
    .split('/')
    .pop();
  const source = `src/${name}.${template}`;

  if (await exists('./package.json')) {
    pkg = JSON.parse(await read('./package.json'));
  }

  pkg = merge({ name, version: '0.0.0', license: 'MIT', description: '' }, pkg);

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
    devDependencies: {
      [cli.name]: cli.version,
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

/**
 * Write boilerplate scripts and common files such as LICENSE and .gitignore to
 * user's directories.
 */
const writeFiles = async (pkg, template) => {
  // An array of objects each having `file`, `content`, & optionally
  // `extensions` properties
  const files = [...getDefaults(pkg, template), ...getTemplates(pkg, template)];

  // Write files.
  // Only write files that don't already exist.
  for (const { file, content, extensions } of files) {
    let existing = false;
    // If there's a range of possible extensions, check them all.
    if (extensions) {
      existing = (await Promise.all(extensions.map(async (ext) => await exists(file + ext)))).includes(true);
    } else {
      existing = await exists(file);
    }

    if (!existing) {
      await write(file, content);
      info(`\t- wrote ./${file}`);
    }
  }
};

/**
 * The main function exported by this module.
 */
export const init = async () => {
  const template = process.argv[3] || 'js'; // js, jsx, ts, tsx

  if (!['js', 'ts', 'jsx', 'tsx'].includes(template)) {
    error('Invalid init template. Try one of js, jsx, ts, tsx');
    return;
  }
  const pkg = await writePackage(template, gitInfo());
  await writeFiles(pkg, template);

  if (!process.argv[3]) {
    log('\nWant to use typescript with klap?');
    info('Initialize your package with `klap init ts`\n');
  }
};
