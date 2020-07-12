var e, t
;(e = this),
	(t = function (e, t) {
		;(t = t && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t),
			(e.Button = function (e) {
				return t.createElement('button', { class: 'button', onClick: e.onClick }, 'Hello Button')
			})
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports, require('react'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'react'], t)
		: t(((e = e || self).reactComponent = {}), e.React)
//# sourceMappingURL=index.js.map
