import { rollup, watch } from 'rollup'
import { error, info, log } from './logger.js'
import { getOptions } from './options.js'
import { plugins, dtsPlugins } from './plugins.js'
import { exists, read } from './utils.js'

const defaultInputOptions = { inlineDynamicImports: true }
const defaultOutputOptions = { esModule: false, strict: false, freeze: false }

const validateConfig = (inputOptions, outputOptions) => {
	if (!inputOptions || inputOptions.length === 0 || (outputOptions && outputOptions.length === 0)) {
		error('Error: Could not determine input and output options.')
		info('Are you running `klap` command in appropriate package directory ?')
		throw new Error('Could not determine input and output options.')
	}
}

const buildConfig = (command, pkg, options) => {
	const { dependencies = {}, peerDependencies = {} } = pkg
	const { name, globals, source: input, main, module, browser, sourcemap, types } = options
	const external = Object.keys({ ...dependencies, ...peerDependencies })

	const inputOptions = [
		main && {
			...defaultInputOptions,
			external,
			input,
			plugins: plugins(command, pkg, { ...options, format: 'cjs' }),
		},
		module && {
			...defaultInputOptions,
			external,
			input,
			plugins: plugins(command, pkg, { ...options, format: 'es' }),
		},
		browser && {
			...defaultInputOptions,
			external,
			input,
			plugins: plugins(command, pkg, { ...options, format: 'umd' }),
		},
		types && {
			input,
			plugins: dtsPlugins(),
		},
	].filter(Boolean)

	const outputOptions = [
		main && { ...defaultOutputOptions, file: main, format: 'cjs', sourcemap },
		module && { ...defaultOutputOptions, file: module, format: 'es', sourcemap },
		browser && {
			...defaultOutputOptions,
			file: browser,
			format: 'umd',
			name,
			sourcemap,
			globals,
		},
		types && {
			file: types,
			format: 'es',
			sourcemap: false,
		},
	].filter(Boolean)

	validateConfig(inputOptions, outputOptions)

	return { inputOptions, outputOptions }
}

const startConfig = async (command, pkg, options) => {
	const { name, globals, example, source, module, browser, sourcemap, target } = options
	const input = exists(example) ? example : source
	let inputOptions
	let outputOptions
	if (target === 'es') {
		inputOptions = {
			...defaultInputOptions,
			input,
			plugins: plugins(command, pkg, { ...options, format: 'es' }),
		}
		outputOptions = {
			...defaultOutputOptions,
			file: module,
			format: 'es',
			sourcemap,
		}
	} else if (target === 'umd') {
		inputOptions = {
			...defaultInputOptions,
			input,
			plugins: plugins(command, pkg, { ...options, format: 'umd' }),
		}
		outputOptions = {
			...defaultOutputOptions,
			file: browser,
			format: 'umd',
			name,
			sourcemap,
			globals,
		}
	}

	validateConfig(inputOptions)

	return { inputOptions, outputOptions }
}

const writeBundle = async (bundle, outputOptions) => {
	await bundle.generate(outputOptions)
	await bundle.write(outputOptions)
}

const build = async (options, inputOptions) => {
	try {
		const bundle = await rollup(inputOptions)
		await writeBundle(bundle, options)
	} catch (error_) {
		error(error_)
		throw new Error(error_)
	}
}

const processWatcher = (event) => {
	switch (event.code) {
		case 'ERROR':
			error(event.error)
			break
		case 'END':
			info(`${new Date().toLocaleTimeString('en-GB')} - Waiting for Changes...`)
			break
		default:
	}
}

const klap = async (command, pkg) => {
	const options = getOptions(pkg, command)
	let config
	let watchOptions
	let watcher
	switch (command) {
		case 'build':
			config = buildConfig(command, pkg, options)
			config.outputOptions.map((options_, index) => build(options_, config.inputOptions[index]))
			break
		case 'watch':
			config = buildConfig(command, pkg, options)
			watchOptions = config.outputOptions.map((output, index) => ({
				...config.inputOptions[index],
				output,
			}))
			watcher = watch(watchOptions)
			watcher.on('event', processWatcher)
			break
		case 'start':
			config = await startConfig(command, pkg, options)
			watchOptions = {
				...config.inputOptions,
				output: config.outputOptions,
			}
			watcher = watch(watchOptions)
			watcher.on('event', processWatcher)
			break
		case 'prod':
			config = await startConfig(command, pkg, options)
			build(config.outputOptions, config.inputOptions)
			break
		default:
			error('Unknown command :', command)
	}
}

export { init } from './init.js'
export { klap, error, info, log, read }
