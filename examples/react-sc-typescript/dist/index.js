var e, n
;(e = this),
	(n = function (e, n) {
		function t() {
			var e,
				n,
				o = ((e = ['\n  background-color: red;\n  width: 100%;\n']), n || (n = e.slice(0)), (e.raw = n), e)
			return (
				(t = function () {
					return o
				}),
				o
			)
		}
		var o = (n = n && Object.prototype.hasOwnProperty.call(n, 'default') ? n.default : n).button(t())
		e.Button = o
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? n(exports, require('styled-components'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'styled-components'], n)
		: n(((e = e || self).reactScTypescript = {}), e.styledComponents)
//# sourceMappingURL=index.js.map
