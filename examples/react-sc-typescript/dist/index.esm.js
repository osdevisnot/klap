import styled from 'styled-components'
function _taggedTemplateLiteralLoose(t, e) {
	return e || (e = t.slice(0)), (t.raw = e), t
}
function _templateObject() {
	const t = _taggedTemplateLiteralLoose(['\n\tbackground-color: red;\n\twidth: 100%;\n'])
	return (
		(_templateObject = function() {
			return t
		}),
		t
	)
}
const Button = styled.button(_templateObject())
export { Button }
//# sourceMappingURL=index.esm.js.map
