import getopts from 'getopts'
import { safePackageName } from './utils'

const getOptions = (pkg, command) => {
	const {
		klap = {},
		source = 'src/index.js',
		browserslist = '>1%, not ie 11, not op_mini all',
		main,
		module,
		browser,
	} = pkg
	const {
		name = pkg.name,
		port = 1234,
		sourcemap = command !== 'start',
		minify = command !== 'start',
		target = 'es',
		globals = {},
		fallback = 'public/index.html',
		example = 'public/index.js',
		runtime = 'classic',
	} = klap
	const options = getopts(process.argv.slice(3), {
		boolean: ['sourcemap', 'minify'],
		alias: {
			name: 'n',
			port: 'p',
			source: 's',
			target: 't',
			fallback: 'f',
			example: 'e',
			browserslist: 'b',
		},
		string: ['main', 'browser', 'module'],
		default: {
			name: safePackageName(name),
			source,
			port,
			target,
			sourcemap,
			minify,
			fallback,
			example,
			browserslist,
		},
	})

	// If no specific target is given, build the standard outputs
	if (!options.main && !options.module && !options.browser) {
		options.main = main
		options.module = module
		options.browser = browser
	}

	return { ...options, globals, runtime }
}

export { getOptions }
