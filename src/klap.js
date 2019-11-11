import { rollup, watch } from 'rollup'
import { error, info, log, warn, gray, green, bold } from './logger'
import { init } from './init'
import { plugins, babelConfig, terser, sizeme, servor } from './plugins'
import { exists, read, write, safePackageName } from './utils'
import { getOptions } from './options'

const createConfig = (command, pkg, options) => {
	const { dependencies = {}, peerDependencies = {}, source = 'src/index.js', main, module, browser } = pkg
	const { name, globals, example, sourcemap } = options
	const external = command === 'start' ? [] : Object.keys({ ...dependencies, ...peerDependencies })

	let outputOptions,
		inputOptions = { external }

	if (command === 'start') {
		inputOptions = { ...inputOptions, input: example }
		outputOptions = [{ file: browser, format: 'umd', sourcemap }]
	} else {
		inputOptions = { ...inputOptions, input: source }
		outputOptions = [
			main && { file: main, format: 'cjs', sourcemap },
			module && { file: module, format: 'es', sourcemap },
			browser && { file: browser, format: 'umd', name, sourcemap, globals },
		].filter(Boolean)
	}

	inputOptions = { ...inputOptions, plugins: plugins(command, pkg, options) }

	return { inputOptions, outputOptions }
}

const writeBundle = async (bundle, outputOptions) => {
	await bundle.generate(outputOptions)
	await bundle.write(outputOptions)
}

const klap = async (command, pkg) => {
	const options = getOptions(pkg)
	const { inputOptions, outputOptions } = createConfig(command, pkg, options)
	switch (command) {
		case 'build':
			const bundle = await rollup(inputOptions)
			outputOptions.map(opts => writeBundle(bundle, opts))
			break
		case 'watch':
		case 'start':
			const watchOptions = {
				...inputOptions,
				output: outputOptions,
			}
			const watcher = watch(watchOptions)
			watcher.on('event', event => {
				switch (event.code) {
					case 'ERROR':
						error(event.error)
						break
					case 'END':
						info(`${new Date().toLocaleTimeString('en-GB')} - Waiting for Changes...`)
						break
				}
			})
			break
	}
}

export {
	error,
	info,
	log,
	warn,
	gray,
	green,
	bold, // logger
	init, // init
	plugins,
	babelConfig,
	terser,
	sizeme,
	servor, // plugins
	exists,
	read,
	write,
	safePackageName, // utils
	klap,
}
