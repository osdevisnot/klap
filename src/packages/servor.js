/**
 * `servor` as rollup plugin.
 * TODO: extract into its own package once servor v2 is released
 */
import _servor from 'servor';
import { log } from '../logger';

let _instance = false;

export const servor = options => {
  return {
    name: 'servor',
    generateBundle() {
      if (!_instance) {
        _servor({ silent: true, browse: false, ...options });
        log.warn(`Servor Listening on http://localhost:${options.port || 8080}`);
        _instance = true;
      }
    },
  };
};
