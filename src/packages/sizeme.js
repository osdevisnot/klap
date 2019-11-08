/**
 * A rollup plugin to print gzip size of output assets.
 * Why we need a custom plugin :- To save 2 terser passes
 * - `rollup-plugin-filesize` does an internal terser pass for all the files
 * - This is little expensive, specially when we use `terser` to generate final output anyway.
 */
import gzip from 'gzip-size'
import prettyBytes from 'pretty-bytes'
import { info } from '../logger'

export const sizeme = () => {
	const showSize = bundle => {
		const { code, fileName } = bundle
		const size = prettyBytes(gzip.sync(code))
		info(`\t${size}\t${fileName}`)
	}

	return {
		name: 'sizeme',
		generateBundle(_, bundle, isWrite) {
			if (isWrite) {
				Object.keys(bundle)
					.map(file => bundle[file])
					.filter(bundle => !bundle.isAsset)
					.forEach(bundle => showSize(bundle))
			}
		},
	}
}
