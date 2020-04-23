import { DEFAULT_EXTENSIONS } from '@babel/core';

// babel presets
import presetEnv from '@babel/preset-env';
import presetTs from '@babel/preset-typescript';
import presetReact from '@babel/preset-react';

// babel plugins
import pluginObjectRestSpread from '@babel/plugin-proposal-object-rest-spread';
import pluginAsyncToPromise from 'babel-plugin-transform-async-to-promises';
import pluginDecorators from '@babel/plugin-proposal-decorators';
import pluginClassProperties from '@babel/plugin-proposal-class-properties';
import pluginTransformRegen from '@babel/plugin-transform-regenerator';
import pluginStyledComponents from 'babel-plugin-styled-components';
import pluginMacros from 'babel-plugin-macros';

let hasReact = (pkg) =>
  ['dependencies', 'devDependencies', 'peerDependencies'].reduce(
    (last, current) => last || (pkg[current] && pkg[current]['react']),
    false
  );

export const babelConfig = (command, pkg, options) => {
  const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.json'];
  const { browserlist, format } = options;

  // Note: when using `React`, presetTs needs `React` as jsxPragma,
  // vs presetReact needs `React.createElement`,
  // but when using `h` as pragma, both presets needs it to be just `h`
  let [jsxPragma, pragma, pragmaFrag] = hasReact(pkg)
    ? ['React', 'React.createElement', 'React.Fragment']
    : ['h', 'h', 'h'];

  const presets = [
    [
      presetEnv,
      {
        bugfixes: true,
        loose: true,
        useBuiltIns: false,
        modules: false,
        targets: format === 'umd' ? browserlist + ', ie 11' : browserlist,
        exclude: ['transform-async-to-generator', 'transform-regenerator'],
      },
    ],
    [presetTs, { jsxPragma, isTSX: true, allExtensions: true }],
    [presetReact, { pragma, pragmaFrag }],
  ];

  const plugins = [
    [pluginObjectRestSpread, { loose: true, useBuiltIns: true }],
    [pluginAsyncToPromise, { inlineHelpers: true, externalHelpers: true }],
    [pluginDecorators, { legacy: true }],
    [pluginClassProperties, { loose: true }],
    [pluginTransformRegen, { async: false }],
    pluginStyledComponents,
    pluginMacros,
  ];

  return { presets, plugins, extensions };
};
