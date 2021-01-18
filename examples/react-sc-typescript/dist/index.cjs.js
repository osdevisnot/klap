function e(e) {
	return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var t = e(require('styled-components')).default.button`
  background-color: red;
  width: 100%;
`
exports.Button = t
//# sourceMappingURL=index.cjs.js.map
