import kleur from 'kleur'

const error = (message) => console.error(kleur.bold().red(message))
const warn = (message) => console.warn(kleur.bold().yellow(message))
const info = (message) => console.error(kleur.green(message))
const log = (message) => console.error(kleur.gray(message))

export { error, warn, info, log }
