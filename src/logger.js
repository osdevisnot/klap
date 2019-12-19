import { bold, green, gray } from 'kleur'

const error = message => console.error(bold().red(message))
const warn = message => console.warn(bold().yellow(message))
const info = message => console.error(green(message))
const log = message => console.error(gray(message))

const prompt = (message, suffix) => bold().yellow(message) + ' ' + suffix + ' '

export { error, warn, info, log, gray, green, bold, prompt }
