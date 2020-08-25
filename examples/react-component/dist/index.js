var e, t
;(e = this),
	(t = function (e, t) {
		function n(e) {
			return e && 'object' == typeof e && 'default' in e ? e : { default: e }
		}
		var o = n(t)
		e.Button = function (e) {
			return o.default.createElement('button', { class: 'button', onClick: e.onClick }, 'Hello Button')
		}
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports, require('react'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'react'], t)
		: t(((e = 'undefined' != typeof globalThis ? globalThis : e || self).reactComponent = {}), e.React)
//# sourceMappingURL=index.js.map
