import gzip from 'gzip-size';

export const sizeme = options => {
  const showSize = (options, bundle) => {
    const { code, fileName } = bundle;
    const info = {};
    info.fileName = fileName;
    info.size = gzip.sync(code);
    console.log(info);
  };

  return {
    name: 'sizeme',
    generateBundle(options, bundle) {
      Object.keys(bundle)
        .map(file => bundle[file])
        .filter(bundle => !bundle.isAsset)
        .forEach(bundle => showSize(options, bundle));
    },
  };
};
