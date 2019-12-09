import getopts from 'getopts'
import { safePackageName } from './utils'

const getOptions = pkg => {
	const { klap = {}, source = 'src/index.js' } = pkg
	const {
		name = pkg.name,
		port = 1234,
		sourcemap = true,
		minify = true,
		pragma = 'React.createElement',
		frag = 'React.Fragment',
		target = 'es',
		globals = {},
		namedExports = {},
		fallback = 'public/index.html',
		example = 'public/index.js',
		browserlist = '>1%, not ie 11, not op_mini all',
	} = klap
	const opts = getopts(process.argv.slice(2), {
		boolean: ['sourcemap', 'minify'],
		string: ['pragma', 'frag'],
		alias: {
			name: 'n',
			port: 'p',
			source: 's',
			target: 't',
			fallback: 'f',
			example: 'e',
			browserlist: 'b',
		},
		default: {
			name: safePackageName(name),
			source,
			port,
			target,
			sourcemap,
			minify,
			pragma,
			frag,
			fallback,
			example,
			browserlist,
		},
	})
	return { ...opts, globals, namedExports }
}

export { getOptions }
