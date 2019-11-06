'use strict'
function _interopDefault(t) {
	return t && 'object' == typeof t && 'default' in t ? t.default : t
}
Object.defineProperty(exports, '__esModule', { value: !0 })
var styled = _interopDefault(require('styled-components'))
function _taggedTemplateLiteralLoose(t, e) {
	return e || (e = t.slice(0)), (t.raw = e), t
}
function _templateObject() {
	var t = _taggedTemplateLiteralLoose(['\n\tbackground-color: red;\n\twidth: 100%;\n'])
	return (
		(_templateObject = function() {
			return t
		}),
		t
	)
}
var Button = styled.button(_templateObject())
exports.Button = Button
//# sourceMappingURL=index.cjs.js.map
