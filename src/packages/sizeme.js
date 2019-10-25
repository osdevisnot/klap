/**
 * TODO: Extract this into `rollup-plugin-sizeme` plugin
 * This plugin was created because, https://www.npmjs.com/package/rollup-plugin-filesize creates
 * and extra terset pass for all the files. This is little expensive, specially when we use terser
 * to generate final output anyway.
 */
import gzip from 'gzip-size'
import prettyBytes from 'pretty-bytes'
import { log } from '../logger'

export const sizeme = options => {
	const showSize = (options, bundle) => {
		const { code, fileName } = bundle
		const size = prettyBytes(gzip.sync(code))
		log.log(`\t${size}\t${fileName}`)
	}

	return {
		name: 'sizeme',
		generateBundle(options, bundle, isWrite) {
			if (isWrite) {
				Object.keys(bundle)
					.map(file => bundle[file])
					.filter(bundle => !bundle.isAsset)
					.forEach(bundle => showSize(options, bundle))
			}
		},
	}
}
