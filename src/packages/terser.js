/**
 * A rollup plugin to run generated code through `terser`
 * We need a custom plugin because `rollup-plugin-terser` relies on `jest-worker`
 * and `jest-worker` can't be bundled using ncc.
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

	let hasRc
	let options_

	// Read Project .terserrc if exists...
	const rc = path.join(process.cwd(), '.terserrc')

	if (existsSync(rc)) {
		options_ = JSON.parse(readFileSync(rc, 'utf-8'))
		hasRc = true
	} else {
		options_ = {
			toplevel: true,
			mangle: { properties: { regex: '^[_|\\$]' } },
			// eslint-disable-next-line camelcase
			compress: { passes: 10, pure_getters: true },
		}
		hasRc = false
	}

	const finalOptions = merge(options_, options)

	return {
		name: 'terser',

		async renderChunk(code, chunk) {
			if (!filter(chunk.fileName)) return null

			let result
			try {
				result = await transform(code, finalOptions)
				try {
					if (hasRc && finalOptions.nameCache) {
						options_.nameCache = finalOptions.nameCache
						writeFileSync(rc, JSON.stringify(options_, null, '  ') + '\n', 'utf-8')
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
