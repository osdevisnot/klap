#!/usr/bin/env node
const path = require('path');
const { init, klap, read, log, error, info } = require('./dist');
const { name, version } = require('./package.json');
const command = process.argv[2];

(async () => {
  switch (command) {
    case 'init':
      log(`${name}@${version} - Initializing your package...`);
      await init(command);
      break;
    case 'build':
    case 'prod':
    case 'watch':
    case 'start':
      log(`${name}@${version} - Working on ${command}...`);
      const pkg = JSON.parse(await read(path.join(process.cwd(), 'package.json')));
      await klap(command, pkg);
      break;
    case 'help':
      info(`
${name}@${version} - Usage

  klap init  - create a new package.
  klap build - bundle your package, in production mode.
  klap watch - bundle your package and watch for changes.
  klap start - start a development server.
`);
      break;
    default:
      error('No Such Command !!');
  }
})();
