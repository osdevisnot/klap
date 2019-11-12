import { DEFAULT_EXTENSIONS } from '@babel/core'

// babel presets
import presetEnv from '@babel/preset-env'
import presetTs from '@babel/preset-typescript'
import presetReact from '@babel/preset-react'

// babel plugins
import pluginObjectRestSpread from '@babel/plugin-proposal-object-rest-spread'
import pluginAsyncToPromise from 'babel-plugin-transform-async-to-promises'
import pluginClassProperties from '@babel/plugin-proposal-class-properties'
import pluginTransformRegen from '@babel/plugin-transform-regenerator'
import pluginStyledComponents from 'babel-plugin-styled-components'
import pluginMacros from 'babel-plugin-macros'

export const babelConfig = (command, pkg, options) => {
	const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.json']
	const { browserlist, pragma, frag } = options

	const presets = [
		[
			presetEnv,
			{
				loose: true,
				useBuiltIns: false,
				modules: false,
				targets: browserlist,
				exclude: ['transform-async-to-generator', 'transform-regenerator'],
			},
		],
		[presetTs, { isTSX: true, allExtensions: true }],
		[presetReact, { pragma, pragmaFrag: frag }],
	]

	const plugins = [
		[pluginObjectRestSpread, { loose: true, useBuiltIns: true }],
		[pluginAsyncToPromise, { inlineHelpers: true, externalHelpers: true }],
		[pluginClassProperties, { loose: true }],
		[pluginTransformRegen, { async: false }],
		pluginStyledComponents,
		pluginMacros,
	]

	return { presets, plugins, extensions }
}
