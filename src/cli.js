#!/usr/bin/env node

import init from './init'
import { klap } from './klap'
import { read } from './utils'
import { log } from './logger'

const command = process.argv[2]

;(async () => {
	switch (command) {
		case 'init':
			log.info(`Initializing your package...`)
			await init(command)
			break
		case 'build':
		case 'watch':
		case 'start':
			log.info(`Working on ${command}`)
			const pkg = JSON.parse(await read('./package.json'))
			await klap(command, pkg)
			break
		default:
			log.error('No Such Command !!')
	}
})()
