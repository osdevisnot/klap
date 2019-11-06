!(function(e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports)
		: 'function' == typeof define && define.amd
		? define(['exports'], t)
		: t(((e = e || self).reactTypescript = {}))
})(this, function(e) {
	'use strict'
	;(e.Button = function(e) {
		var t = e.onClick
		return React.createElement('button', { class: 'button', onClick: t }, 'Hello Button')
	}),
		Object.defineProperty(e, '__esModule', { value: !0 })
})
//# sourceMappingURL=index.js.map
