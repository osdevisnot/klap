import json from 'rollup-plugin-json'
import nodeGlobals from 'rollup-plugin-node-globals'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import { terser } from './packages/terser'
import { sizeme } from './packages/sizeme'
import { servor } from './packages/servor'

import { babelConfig } from './babel'

export const plugins = async (command, pkg) => {
	const { extensions, presets, plugins } = await babelConfig(command, pkg)
	return [
		json(),
		nodeGlobals(),
		nodeResolve({ mainFields: ['module', 'main'], extensions }),
		commonjs(),
		babel({ babelrc: false, extensions, presets, plugins }),
		replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
		command !== 'start' && terser(),
		command !== 'start' && sizeme(),
		command === 'start' && servor({ fallback: 'public/index.html', port: 1234 }),
	].filter(Boolean)
}
