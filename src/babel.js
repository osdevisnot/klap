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

export const babelConfig = async (command, pkg) => {
	let extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx']

	const { klap = {} } = pkg
	const { pragma = 'React.createElement', pragmaFrag = 'React.Fragment' } = klap

	let presets = [
		[
			presetEnv,
			{
				loose: true,
				useBuiltIns: false,
				modules: false,
				exclude: ['transform-async-to-generator', 'transform-regenerator'],
			},
		],
		[presetReact, { pragma, pragmaFrag }],
		[presetTs, { jsxPragma: pragma }],
	]

	let plugins = [
		pluginObjectRestSpread,
		[pluginAsyncToPromise, { inlineHelpers: true, externalHelpers: true }],
		[pluginClassProperties, { loose: true }],
		[pluginTransformRegen, { async: false }],
		[pluginStyledComponents, { displayName: true }],
		pluginMacros,
	]

	return { presets, plugins, extensions }
}
