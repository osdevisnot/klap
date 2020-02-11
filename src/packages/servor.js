/**
 * A rollup plugin to start `servor` as build step
 */
import _servor from 'servor';
import { warn } from '../logger';

let singleton = false;

export const servor = (options) => {
  return {
    name: 'servor',
    generateBundle() {
      if (!singleton) {
        _servor({ silent: true, browse: false, ...options });
        warn(`Servor Listening on http://localhost:${options.port || 8080}`);
        singleton = true;
      }
    },
  };
};
