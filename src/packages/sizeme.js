/**
 * A rollup plugin to print gzip size of output assets.
 * We need a custom plugin because `rollup-plugin-filesize` does an
 * internal terser pass for all the files. This is little expensive,
 * specially when we use `terser` to generate final output anyway.
 */
/* eslint-disable unicorn/no-array-for-each */
import gzip from 'gzip-size'
import prettyBytes from 'pretty-bytes'
import { info } from '../logger.js'

export const sizeme = () => {
	const showSize = (bundle) => {
		const { code, fileName } = bundle
		const size = gzip.sync(code)
		const pretty = prettyBytes(gzip.sync(code))
		info(`\t${pretty}\t(${size})\t${fileName}`)
	}

	return {
		name: 'sizeme',
		generateBundle(_, bundle, isWrite) {
			if (isWrite) {
				Object.keys(bundle)
					.map((file) => bundle[file])
					.filter((bundle) => !bundle.isAsset)
					.forEach((bundle) => showSize(bundle))
			}
		},
	}
}
