import _servor from 'servor';

let _instance = false;

export const servor = options => {
  return {
    name: 'servor',
    generateBundle() {
      if (!_instance) {
        _servor({ silent: true, browse: false, ...options });
        console.log(`Servor Listening on http://localhost:${options.port || 8080}`);
        _instance = true;
      }
    },
  };
};
