var r = (r, o) => r + o,
	o =
		(Promise.resolve().then(function () {
			return o
		}),
		{ __proto__: null, sub: (r, o) => r - o })
export { r as sum }
//# sourceMappingURL=index.esm.js.map
