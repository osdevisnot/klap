import { DEFAULT_EXTENSIONS } from '@babel/core'

// babel presets
import presetEnv from '@babel/preset-env'
import presetTs from '@babel/preset-typescript'
import presetReact from '@babel/preset-react'

// babel plugins
import pluginDevExpression from 'babel-plugin-dev-expression'
import pluginObjectRestSpread from '@babel/plugin-proposal-object-rest-spread'
import pluginAsyncToPromise from 'babel-plugin-transform-async-to-promises'
import pluginDecorators from '@babel/plugin-proposal-decorators'
import pluginClassProperties from '@babel/plugin-proposal-class-properties'
import pluginTransformRegen from '@babel/plugin-transform-regenerator'
import pluginStyledComponents from 'babel-plugin-styled-components'
import pluginEmotion from 'babel-plugin-emotion'
import pluginMacros from 'babel-plugin-macros'
import pluginCodegen from 'babel-plugin-codegen'

let hasPackage = (pkg, name) =>
	['dependencies', 'devDependencies', 'peerDependencies'].reduce(
		(last, current) => last || (pkg[current] && pkg[current][name]),
		false
	)

export const babelConfig = (command, pkg, options) => {
	const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.json']
	const { browserslist, format } = options

	// Note: when using `React`, presetTs needs `React` as jsxPragma,
	// vs presetReact needs `React.createElement`,
	// but when using `h` as pragma, both presets needs it to be just `h`
	let [jsxPragma, pragma, pragmaFrag] = hasPackage(pkg, 'react')
		? ['React', 'React.createElement', 'React.Fragment']
		: ['h', 'h', 'h']
	// Note: The styled component plugin effects the css prop, even if
	// styled components are not being used in project. So, we enable
	// this only when styled-components is a project dependency...
	let useStyledComponents = hasPackage(pkg, 'styled-components')
	let useEmotion = hasPackage(pkg, 'emotion')

	const presets = [
		[
			presetEnv,
			{
				bugfixes: true,
				loose: true,
				useBuiltIns: false,
				modules: false,
				targets: format === 'umd' ? 'defaults' : browserslist,
				exclude: ['transform-async-to-generator', 'transform-regenerator'],
				include: ['transform-block-scoping'],
			},
		],
		[presetTs, { jsxPragma, isTSX: true, allExtensions: true }],
		[presetReact, { pragma, pragmaFrag }],
	]

	const plugins = [
		pluginDevExpression,
		[pluginObjectRestSpread, { loose: true, useBuiltIns: true }],
		[pluginAsyncToPromise, { inlineHelpers: true, externalHelpers: true }],
		[pluginDecorators, { legacy: true }],
		[pluginClassProperties, { loose: true }],
		[pluginTransformRegen, { async: false }],
		useStyledComponents && pluginStyledComponents,
		useEmotion && pluginEmotion,
		pluginCodegen,
		pluginMacros,
	].filter(Boolean)

	return { presets, plugins, extensions }
}
