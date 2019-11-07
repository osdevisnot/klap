import { rollup, watch } from 'rollup'
import { error, info, log, warn } from './logger'
import { init } from './init'
import { plugins, babelConfig, terser, sizeme, servor } from './plugins'
import { exists, read, write, safePackageName } from './utils'

const createConfig = async (command, pkg) => {
	const { klap = {}, dependencies = {}, peerDependencies = {}, source = 'src/index.js', main, module, browser } = pkg

	const example = klap.example || 'public/index.js'

	const external = command === 'start' ? [] : Object.keys({ ...dependencies, ...peerDependencies })

	let outputOptions,
		inputOptions = { external }

	const sourcemap = klap.sourcemap !== false
	const globals = klap.globals || {}

	if (command === 'start') {
		inputOptions = { ...inputOptions, input: example }
		outputOptions = [{ file: browser, format: 'umd', sourcemap }]
	} else {
		inputOptions = { ...inputOptions, input: source }
		outputOptions = [
			main && { file: main, format: 'cjs', sourcemap },
			module && { file: module, format: 'es', sourcemap },
			browser && {
				file: browser,
				format: 'umd',
				name: safePackageName(klap.name || pkg.name),
				sourcemap,
				globals,
			},
		].filter(Boolean)
	}

	inputOptions = { ...inputOptions, plugins: await plugins(command, pkg) }

	return { inputOptions, outputOptions }
}

const writeBundle = async (bundle, outputOptions) => {
	await bundle.generate(outputOptions)
	await bundle.write(outputOptions)
}

const klap = async (command, pkg) => {
	const { inputOptions, outputOptions } = await createConfig(command, pkg)
	switch (command) {
		case 'build':
			const bundle = await rollup(inputOptions)
			outputOptions.map(options => writeBundle(bundle, options))
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
	warn, // logger
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
