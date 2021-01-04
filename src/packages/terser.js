/**
 * A rollup plugin to run generated code through `terser`
 * Why we need a custom plugin :- to be able to bundle things up.
 * - `rollup-plugin-terser` relies on `jest-worker`
 * - `jest-worker` had issues with bundling approach we want to follow for `klap`.
 */
import path from 'path'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { codeFrameColumns } from '@babel/code-frame'
import { createFilter } from '@rollup/pluginutils'
import { minify } from 'terser'
import { error } from '../logger.js'
import merge from 'deepmerge'

const transform = async (code, options) => {
	const result = await minify(code, options).catch((error) => {
		throw error
	})
	return result
}

export const terser = (options = {}) => {
	const filter = createFilter(options.include, options.exclude, {
		resolve: false,
	})

	let options_ = {
		toplevel: true,
		mangle: { properties: { regex: '^[_|\\$]' } },
		// eslint-disable-next-line camelcase
		compress: { passes: 10, pure_getters: true },
	}

	// Read Project .terserrc if exists...
	const rc = path.join(process.cwd(), '.terserrc')
	let cache

	if (existsSync(rc)) {
		options_ = JSON.parse(readFileSync(rc, 'utf-8'))
	}

	options_ = merge(options_, options)

	return {
		name: 'terser',

		async renderChunk(code, chunk) {
			if (!filter(chunk.fileName)) return null

			let result
			try {
				result = await transform(code, options_)
				try {
					if (cache && options_.nameCache) {
						cache.nameCache = options_.nameCache
						writeFileSync(rc, JSON.stringify(cache, null, '  ') + '\n', 'utf-8')
					}
				} catch {}
			} catch (error_) {
				const { message, line, col: column } = error_
				error(codeFrameColumns(code, { start: { line, column } }, { message }))
				throw error_
			}

			return {
				code: result.code,
				map: result.map,
			}
		},
	}
}
