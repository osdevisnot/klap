var e, n;
(e = this),
  (n = function (e) {
    e.sum = function (e, n) {
      return e + n;
    };
  }),
  'object' == typeof exports && 'undefined' != typeof module
    ? n(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], n)
    : n(((e = e || self).scaffoldTypescript = {}));
//# sourceMappingURL=index.js.map
