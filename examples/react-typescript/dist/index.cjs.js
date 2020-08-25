function t(t) {
	return t && 'object' == typeof t && 'default' in t ? t : { default: t }
}
var e = t(require('react'))
exports.Button = ({ onClick: t }) => e.default.createElement('button', { class: 'button', onClick: t }, 'Hello Button')
//# sourceMappingURL=index.cjs.js.map
