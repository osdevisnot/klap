#!/usr/bin/env node
const path = require('path')
const { init, klap, read, log, error, info } = require('./dist')
const { name, version } = require('./package.json')
const command = process.argv[2]

;(async () => {
  switch (command) {
    case 'init':
      log(`${name}@${version} - Initializing your package...`)
      await init(command)
      break
    case 'build':
    case 'watch':
    case 'start':
      log(`${name}@${version} - Working on ${command}...`)
      const pkg = JSON.parse(await read(path.join(process.cwd(), 'package.json')))
      await klap(command, pkg)
      break
    case 'help':
      info(`
      Usage:
    
      klap init - create a new Klap application
      klap build - build in production mode
      klap watch - watches files for changes
      klap start - start watching and building in development mode
      `)
      break
    default:
      error('No Such Command !!')
  }
})()
