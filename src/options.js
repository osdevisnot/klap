import getopts from 'getopts'
import { safePackageName } from './utils.js'

const getOptions = (pkg, command) => {
	const {
		klap = {},
		source = 'src/index.js',
		browserslist = '>1% and supports es6-module and last 2 versions',
		main,
		module,
		browser,
		types,
	} = pkg
	const {
		name = pkg.name || process.cwd(),
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
			esm: 'e',
			cjs: 'c',
			umd: 'u',
			types: 't',
			name: 'n',
			port: 'p',
			source: 's',
			browserslist: 'b',
		},
		string: ['cjs', 'umd', 'esm', 'types', 'runtime'],
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
	if (!options.cjs && !options.esm && !options.umd && !options.types) {
		options.main = main
		options.module = module
		options.browser = browser
		options.types = types
	} else {
		if (options.cjs) options.main = options.cjs
		if (options.esm) options.module = options.esm
		if (options.umd) options.browser = options.umd
	}

	return { ...options, globals, runtime }
}

export { getOptions }
