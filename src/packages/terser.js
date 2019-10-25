/**
 * TODO: Extract into rollup-plugin-terser-simple
 * This plugin was created because https://www.npmjs.com/package/rollup-plugin-terser
 * relies on https://www.npmjs.com/package/jest-worker. The jest-worker package had issues
 * with bundling approach we want to follow for `klap`.
 */

import { minify } from 'terser'
import { createFilter } from 'rollup-pluginutils'
import { codeFrameColumns } from '@babel/code-frame'

const transform = code => {
	const result = minify(code)
	if (result.error) {
		throw result.error
	} else {
		return result
	}
}

export const terser = (userOptions = {}) => {
	const filter = createFilter(userOptions.include, userOptions.exclude, { resolve: false })

	return {
		name: 'terser',

		renderChunk(code, chunk, outputOptions) {
			if (!filter(chunk.fileName)) {
				return null
			}
			let result
			try {
				result = transform(code)
			} catch (e) {
				const { message, line, col: column } = error
				console.error(codeFrameColumns(code, { start: { line, column } }, { message }))
				throw error
			}
			return result
		},
	}
}
