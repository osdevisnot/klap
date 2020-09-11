import { DEFAULT_EXTENSIONS } from '@babel/core'

// Babel presets
import presetEnv from '@babel/preset-env'
import presetTs from '@babel/preset-typescript'
import presetReact from '@babel/preset-react'

// Babel plugins
import pluginDevExpression from 'babel-plugin-dev-expression'
import pluginAsyncToPromise from 'babel-plugin-transform-async-to-promises'
import pluginDecorators from '@babel/plugin-proposal-decorators'
import pluginTransformRegen from '@babel/plugin-transform-regenerator'
import pluginStyledComponents from 'babel-plugin-styled-components'
import pluginEmotion from 'babel-plugin-emotion'
import pluginMacros from 'babel-plugin-macros'
import pluginCodegen from 'babel-plugin-codegen'

const hasPackage = (pkg, name) =>
	// eslint-disable-next-line unicorn/no-reduce
	['dependencies', 'devDependencies', 'peerDependencies'].reduce(
		(last, current) => last || (pkg[current] && pkg[current][name]),
		false
	)

export const babelConfig = (command, pkg, options) => {
	const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.json']
	const { browserslist, format, runtime } = options

	// Note: when using `React`, presetTs needs `React` as jsxPragma,
	// vs presetReact needs `React.createElement`,
	// but when using `h` as pragma, both presets needs it to be just `h`
	const [jsxPragma, pragma, pragmaFrag] = hasPackage(pkg, 'react')
		? ['React', 'React.createElement', 'React.Fragment']
		: ['h', 'h', 'h']

	// New JSX Transform - https://github.com/reactjs/rfcs/blob/createlement-rfc/text/0000-create-element-changes.md
	let reactPresetOptions = { runtime: 'classic', pragma, pragmaFrag }
	if (runtime !== 'classic') {
		reactPresetOptions = { runtime: 'automatic', importSource: runtime }
	}

	// Note: The styled component plugin effects the css prop, even if
	// styled components are not being used in project. So, we enable
	// this only when styled-components is a project dependency...
	const useStyledComponents = hasPackage(pkg, 'styled-components')
	const useEmotion = hasPackage(pkg, 'emotion')

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
		[presetReact, reactPresetOptions],
	]

	const plugins = [
		pluginDevExpression,
		[pluginAsyncToPromise, { inlineHelpers: true, externalHelpers: true }],
		[pluginDecorators, { legacy: true }],
		[pluginTransformRegen, { async: false }],
		useStyledComponents && pluginStyledComponents,
		useEmotion && pluginEmotion,
		pluginCodegen,
		pluginMacros,
	].filter(Boolean)

	return { presets, plugins, extensions }
}
