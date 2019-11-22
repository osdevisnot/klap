var e, n
;(e = this),
	(n = function(e, n) {
		function t() {
			const e = ((n = ['\n\tbackground-color: red;\n\twidth: 100%;\n']), o || (o = n.slice(0)), (n.raw = o), n)
			var n, o
			return (
				(t = function() {
					return e
				}),
				e
			)
		}
		const o = (n = n && n.hasOwnProperty('default') ? n.default : n).button(t())
		e.Button = o
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? n(exports, require('styled-components'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'styled-components'], n)
		: n(((e = e || self).reactScTypescript = {}), e.styledComponents)
//# sourceMappingURL=index.js.map
