var e, n
;(e = this),
	(n = function (e) {
		Promise.resolve().then(function () {
			return n
		})
		var n = {
			__proto__: null,
			sub: function (e, n) {
				return e - n
			},
		}
		e.sum = function (e, n) {
			return e + n
		}
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? n(exports)
		: 'function' == typeof define && define.amd
		? define(['exports'], n)
		: n(((e = 'undefined' != typeof globalThis ? globalThis : e || self).dynamicImport = {}))
//# sourceMappingURL=index.js.map
