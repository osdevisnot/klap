import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

import nodeGlobals from 'rollup-plugin-node-globals'
import babel from '@rollup/plugin-babel'

import { terser } from './packages/terser'
import { sizeme } from './packages/sizeme'
import { servor } from './packages/servor'

import { babelConfig } from './babel'

const plugins = (command, pkg, options) => {
	const { extensions, presets, plugins } = babelConfig(command, pkg, options)
	const { sourcemap, minify, fallback, port } = options

	const babelDefaults = { babelrc: false, configFile: false, compact: false }

	return [
		json(),
		nodeGlobals(),
		nodeResolve({
			mainFields: ['module', 'jsnext:main', 'browser', 'main'],
			extensions,
		}),
		commonjs({ extensions, include: /\/node_modules\// }),
		babel({
			...babelDefaults,
			exclude: 'node_modules/**',
			extensions,
			presets,
			plugins,
			sourceMap: sourcemap,
			babelHelpers: 'bundled',
			inputSourceMap: sourcemap,
		}),
		replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
		command !== 'start' && minify && terser({ sourceMap: sourcemap }),
		command !== 'start' && sizeme(),
		command === 'start' && servor({ fallback, port }),
	].filter(Boolean)
}

export { plugins }
