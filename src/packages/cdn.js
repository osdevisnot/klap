const cache = new Map()
const isUrl = (string) => /^[a-zA-Z\d+-.]+:\/\//.test(string)
const isAbs = (string) => string.startsWith('/')

const origin = (url) => url.split('/').slice(0, 3).join('/')

const resolveUrl = (baseUrl, path) => {
	const parts = baseUrl.split('/').slice(0, -1)
	const length = isUrl(baseUrl) ? 3 : 1

	for (const part of path.split('/')) {
		if (part === '.' || !part) {
			continue
		}

		if (part === '..') {
			if (parts.length > length) parts.pop()
			continue
		}

		parts.push(part)
	}

	return parts.join('/')
}

const resolveModule = (specifier, referrer) => {
	if (isUrl(specifier)) return specifier
	if (isAbs(specifier)) {
		if (isUrl(referrer)) {
			return origin(referrer) + specifier
		}

		return specifier
	}

	return resolveUrl(referrer, specifier)
}

const fetch = (url, redirects = 0) => {
	return new Promise((resolve, reject) => {
		const http = url.startsWith('https') ? require('https') : require('http')
		const request = http.get(url, (response) => {
			if (response.statusCode < 200 || response.statusCode > 299) {
				const location = response.headers && response.headers.location

				if (location) {
					if (redirects > 10) reject(new Error('Too Many Redirects ' + url))
					// eslint-disable-next-line node/no-deprecated-api
					const redirection = location.startsWith('http') ? location : require('url').resolve(url, location)
					return fetch(redirection, redirects + 1).then(resolve, reject)
				}

				reject(new Error('Error Status Code ' + response.statusCode))
			}

			const body = []
			response.setEncoding('utf8')
			response.on('data', (chunk) => body.push(chunk))
			response.on('end', () => resolve(body.join('')))
		})
		request.on('error', (error) => reject(error))
	})
}

export const cdn = () => {
	return {
		name: 'cdn',
		resolveId(specifier, referrer) {
			if (isUrl(specifier) || isUrl(referrer)) {
				return resolveModule(specifier, referrer)
			}
		},
		load(id) {
			if (isUrl(id)) {
				if (cache.has(id)) {
					return cache.get(id)
				}

				const code = fetch(id)
				cache.set(id, code)
				return code
			}

			return null
		},
	}
}
