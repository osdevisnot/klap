#!/usr/bin/env node

/**
 * TODO: add react example -- resolve jsx syntax issue
 * TODO: add react-tx example
 * TODO: styled components examples
 * TODO: styled components ts example
 */

import init from './init'
import { klap } from './klap'
import { read } from './utils'
import { info, error } from './logger'

const command = process.argv[2]

;(async () => {
	switch (command) {
		case 'init':
			info(`Initializing your package...`)
			await init(command)
			break
		case 'build':
		case 'watch':
		case 'start':
			info(`Working on ${command}`)
			const pkg = JSON.parse(await read('./package.json'))
			await klap(command, pkg)
			break
		default:
			error('No Such Command !!')
	}
})()
