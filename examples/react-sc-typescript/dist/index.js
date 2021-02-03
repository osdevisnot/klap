var e, n
;(e = this),
	(n = function (e, n) {
		function o(e) {
			return e && 'object' == typeof e && 'default' in e ? e : { default: e }
		}
		var t,
			f,
			d,
			i = o(n).default.button(
				t || ((f = ['\n  background-color: red;\n  width: 100%;\n']), d || (d = f.slice(0)), (f.raw = d), (t = f))
			)
		e.Button = i
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? n(exports, require('styled-components'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'styled-components'], n)
		: n(((e = 'undefined' != typeof globalThis ? globalThis : e || self).reactScTypescript = {}), e.styledComponents)
//# sourceMappingURL=index.js.map
