!(function(e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports, require('styled-components'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'styled-components'], t)
		: t(((e = e || self).reactScTypescript = {}), e.styledComponents)
})(this, function(e, t) {
	'use strict'
	function n() {
		var e,
			t,
			o = ((e = ['\n\tbackground-color: red;\n\twidth: 100%;\n']), t || (t = e.slice(0)), (e.raw = t), e)
		return (
			(n = function() {
				return o
			}),
			o
		)
	}
	var o = (t = t && t.hasOwnProperty('default') ? t.default : t).button(n())
	;(e.Button = o), Object.defineProperty(e, '__esModule', { value: !0 })
})
//# sourceMappingURL=index.js.map
