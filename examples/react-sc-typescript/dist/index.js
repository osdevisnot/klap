var e, o
;(e = this),
	(o = function (e, o) {
		function t(e) {
			return e && 'object' == typeof e && 'default' in e ? e : { default: e }
		}
		var n = t(o).default.button.withConfig({ displayName: 'src__Button', componentId: 'sc-a2me5-0' })([
			'background-color:red;width:100%;',
		])
		e.Button = n
	}),
	'object' == typeof exports && 'undefined' != typeof module
		? o(exports, require('styled-components'))
		: 'function' == typeof define && define.amd
		? define(['exports', 'styled-components'], o)
		: o(((e = 'undefined' != typeof globalThis ? globalThis : e || self).reactScTypescript = {}), e.styledComponents)
//# sourceMappingURL=index.js.map
