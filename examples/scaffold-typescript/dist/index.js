var e, f
;(e = this),
	(f = function(e) {
		e.sum = (e, f) => e + f
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? f(exports)
		: 'function' == typeof define && define.amd
		? define(['exports'], f)
		: f(((e = e || self).scaffoldTypescript = {}))
//# sourceMappingURL=index.js.map
