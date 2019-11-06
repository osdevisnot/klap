!(function(e, t) {
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports)
		: 'function' == typeof define && define.amd
		? define(['exports'], t)
		: t(((e = e || self).reactComponent = {}))
})(this, function(e) {
	'use strict'
	;(e.Button = ({ onClick: e }) => React.createElement('button', { class: 'button', onClick: e }, 'Hello Button')),
		Object.defineProperty(e, '__esModule', { value: !0 })
})
//# sourceMappingURL=index.js.map
