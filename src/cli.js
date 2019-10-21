#!/usr/bin/env node

import init from './init';
import { klap } from './klap';
import { read } from './utils';

const command = process.argv[2];

(async () => {
  switch (command) {
    case 'init':
      await init(command);
      break;
    case 'build':
    case 'watch':
    case 'start':
      const pkg = JSON.parse(await read('./package.json'));
      await klap(command, pkg);
      break;
    default:
      console.error('No Such Command !!');
  }
})();
