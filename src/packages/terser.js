/**
 * A rollup plugin to run generated code through `terser`
 * [rollup-plugin-terser](https://www.npmjs.com/package/rollup-plugin-terser)
 * relies on [jest-worker](https://www.npmjs.com/package/jest-worker).
 * jest-worker package had issues with bundling approach we want to follow for `klap`.
 */

import { codeFrameColumns } from '@babel/code-frame'
import { createFilter } from 'rollup-pluginutils'
import { minify } from 'terser'

const transform = code => {
	const result = minify(code)
	if (result.error) {
		throw result.error
	} else {
		return result
	}
}

export const terser = (options = {}) => {
	const filter = createFilter(options.include, options.exclude, { resolve: false })

	return {
		name: 'terser',

		renderChunk(code, chunk) {
			if (!filter(chunk.fileName)) return null

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
