var e, n
;(e = this),
	(n = function (e, n) {
		function t(e) {
			return e && 'object' == typeof e && 'default' in e ? e : { default: e }
		}
		function o() {
			var e,
				n,
				t = ((e = ['\n  background-color: red;\n  width: 100%;\n']), n || (n = e.slice(0)), (e.raw = n), e)
			return (
				(o = function () {
					return t
				}),
				t
			)
		}
		var f = t(n).default.button(o())
		e.Button = f
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? n(exports, require('styled-components'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'styled-components'], n)
		: n(((e = 'undefined' != typeof globalThis ? globalThis : e || self).reactScTypescript = {}), e.styledComponents)
//# sourceMappingURL=index.js.map
