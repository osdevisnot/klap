var e, t
;(e = this),
	(t = function(e, t) {
		'use strict'
		;(t = t && t.hasOwnProperty('default') ? t.default : t),
			(e.Button = ({ onClick: e }) => t.createElement('button', { class: 'button', onClick: e }, 'Hello Button')),
			Object.defineProperty(e, 't', { value: !0 })
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? t(exports, require('react'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'react'], t)
		: t(((e = e || self).reactTypescript = {}), e.React)
//# sourceMappingURL=index.js.map
