import { DEFAULT_EXTENSIONS } from '@babel/core';

// babel presets
import presetEnv from '@babel/preset-env';
import presetTs from '@babel/preset-typescript';
import presetReact from '@babel/preset-react';

// babel plugins
import pluginClassProperties from '@babel/plugin-proposal-class-properties';
import pluginObjectRestSpread from '@babel/plugin-proposal-object-rest-spread';

export const babelConfig = async () => {
  let extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

  let presets = [presetEnv, presetTs, presetReact];

  let plugins = [pluginClassProperties, pluginObjectRestSpread];

  return { presets, plugins, extensions };
};
