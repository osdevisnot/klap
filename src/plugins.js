import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

import nodePolyfills from 'rollup-plugin-polyfill-node'
import babel from '@rollup/plugin-babel'

import { terser } from './packages/terser.js'
import { sizeme } from './packages/sizeme.js'
import { servor } from './packages/servor.js'
import { cdn } from './packages/cdn.js'

import { babelConfig } from './babel.js'

const plugins = (command, pkg, options) => {
	const { extensions, presets, plugins } = babelConfig(command, pkg, options)
	const { sourcemap, minify, fallback, port, usets } = options

	const babelDefaults = { babelrc: false, configFile: false, compact: false }

	return [
		json(),
		nodePolyfills({ sourceMap: sourcemap }),
		nodeResolve({
			mainFields: ['module', 'jsnext:main', 'browser', 'main'],
			extensions,
		}),
		commonjs({ extensions, include: /\/node_modules\// }),
		usets && require('@rollup/plugin-typescript')({
			typescript: require("ttypescript")
		}),
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
		cdn(),
		replace({ preventAssignment: true, values: { 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) } }),
		command !== 'start' && minify && terser({ sourceMap: sourcemap }),
		command !== 'start' && sizeme(),
		command === 'start' && servor({ fallback, port }),
	].filter(Boolean)
}

const dtsPlugins = () => {
	return [require('rollup-plugin-dts').default(), sizeme()]
}

export { plugins, dtsPlugins }
