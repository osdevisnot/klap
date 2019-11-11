import getopts from 'getopts'
import { safePackageName } from './utils'

const getOptions = pkg => {
	const { klap = {} } = pkg
	const {
		name = pkg.name,
		port = 1234,
		sourcemap = true,
		minify = true,
		pragma = 'React.createElement',
		pragmaFrag = 'React.Fragment',
		globals = {},
		namedExports = {},
		index = 'public/index.html',
		example = 'public/index.js',
		browserlist = '>1%, not dead, not ie 11, not op_mini all',
	} = klap
	const opts = getopts(process.argv.slice(2), {
		alias: {
			name: 'n',
			port: 'p',
			sourcemap: 's',
			minify: 'm',
			pragma: 'pg',
			pragmaFrag: 'pgf',
			globals: 'g',
			namedExports: 'd',
			index: 'i',
			example: 'e',
			browserlist: 'b',
		},
		default: {
			name: safePackageName(name),
			port,
			sourcemap,
			minify,
			pragma,
			pragmaFrag,
			globals,
			namedExports,
			index,
			example,
			browserlist,
		},
	})
	return { ...pkg, ...opts }
}

export { getOptions }
