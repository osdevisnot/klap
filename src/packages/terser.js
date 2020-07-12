/**
 * A rollup plugin to run generated code through `terser`
 * Why we need a custom plugin :- to be able to bundle things up.
 * - `rollup-plugin-terser` relies on `jest-worker`
 * - `jest-worker` had issues with bundling approach we want to follow for `klap`.
 */
import { join } from 'path'
import { readFileSync, existsSync } from 'fs'
import { codeFrameColumns } from '@babel/code-frame'
import { createFilter } from '@rollup/pluginutils'
import { minify } from 'terser'
import { error } from '../logger'
import merge from 'deepmerge'

const transform = (code, options) => {
	const result = minify(code, options)
	if (result.error) {
		throw result.error
	}
	return result
}

export const terser = (options = {}) => {
	const filter = createFilter(options.include, options.exclude, {
		resolve: false,
	})

	let opts = {
		toplevel: true,
		mangle: { properties: { regex: '^_' } },
		compress: { passes: 10, pure_getters: true },
	}

	// Read Project .terserrc if exists...
	let rc = join(process.cwd(), '.terserrc')
	if (existsSync(rc)) opts = merge(opts, JSON.parse(readFileSync(rc, 'utf-8')))

	opts = merge(opts, options)

	return {
		name: 'terser',

		renderChunk(code, chunk) {
			if (!filter(chunk.fileName)) return null

			let result
			try {
				result = transform(code, opts)
			} catch (err) {
				const { message, line, col: column } = err
				error(codeFrameColumns(code, { start: { line, column } }, { message }))
				throw err
			}
			return {
				code: result.code,
				map: result.map,
			}
		},
	}
}
