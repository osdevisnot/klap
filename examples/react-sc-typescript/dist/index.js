!(function(e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports, require('styled-components'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'styled-components'], t)
		: t(((e = e || self).reactScTypescript = {}), e.styledComponents)
})(this, function(e, t) {
	'use strict'
	function n() {
		const e = ((t = ['\n\tbackground-color: red;\n\twidth: 100%;\n']), o || (o = t.slice(0)), (t.raw = o), t)
		var t, o
		return (
			(n = function() {
				return e
			}),
			e
		)
	}
	const o = (t = t && t.hasOwnProperty('default') ? t.default : t).button(n())
	;(e.Button = o), Object.defineProperty(e, '__esModule', { value: !0 })
})
//# sourceMappingURL=index.js.map
