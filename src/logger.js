import { bold, green, gray } from 'kleur'

export const log = {
	error: message => console.error(bold().red(message)),
	warn: message => console.warn(bold().yellow(message)),
	info: message => console.error(green(message)),
	log: message => console.error(gray(message)),
}
