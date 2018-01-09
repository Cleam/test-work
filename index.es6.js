! function t(e, n, i) {
  function o(a, s) {
    if (!n[a]) {
      if (!e[a]) {
        var c = "function" == typeof require && require;
        if (!s && c) return c(a, !0);
        if (r) return r(a, !0);
        var u = new Error("Cannot find module '" + a + "'");
        throw u.code = "MODULE_NOT_FOUND", u
      }
      var l = n[a] = {
        exports: {}
      };
      e[a][0].call(l.exports, function(t) {
        var n = e[a][1][t];
        return o(n || t)
      }, l, l.exports, t, e, n, i)
    }
    return n[a].exports
  }
  for (var r = "function" == typeof require && require, a = 0; a < i.length; a++) o(i[a]);
  return o
}({
  1: [function(t, e, n) {
    function i() {
      throw new Error("setTimeout has not been defined")
    }

    function o() {
      throw new Error("clearTimeout has not been defined")
    }

    function r(t) {
      if (f === setTimeout) return setTimeout(t, 0);
      if ((f === i || !f) && setTimeout) return f = setTimeout, setTimeout(t, 0);
      try {
        return f(t, 0)
      } catch (e) {
        try {
          return f.call(null, t, 0)
        } catch (e) {
          return f.call(this, t, 0)
        }
      }
    }

    function a(t) {
      if (p === clearTimeout) return clearTimeout(t);
      if ((p === o || !p) && clearTimeout) return p = clearTimeout, clearTimeout(t);
      try {
        return p(t)
      } catch (e) {
        try {
          return p.call(null, t)
        } catch (e) {
          return p.call(this, t)
        }
      }
    }

    function s() {
      g && h && (g = !1, h.length ? m = h.concat(m) : v = -1, m.length && c())
    }

    function c() {
      if (!g) {
        var t = r(s);
        g = !0;
        for (var e = m.length; e;) {
          for (h = m, m = []; ++v < e;) h && h[v].run();
          v = -1, e = m.length
        }
        h = null, g = !1, a(t)
      }
    }

    function u(t, e) {
      this.fun = t, this.array = e
    }

    function l() {}
    var f, p, d = e.exports = {};
    ! function() {
      try {
        f = "function" == typeof setTimeout ? setTimeout : i
      } catch (t) {
        f = i
      }
      try {
        p = "function" == typeof clearTimeout ? clearTimeout : o
      } catch (t) {
        p = o
      }
    }();
    var h, m = [],
      g = !1,
      v = -1;
    d.nextTick = function(t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      m.push(new u(t, e)), 1 !== m.length || g || r(c)
    }, u.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = l, d.addListener = l, d.once = l, d.off = l, d.removeListener = l, d.removeAllListeners = l, d.emit = l, d.prependListener = l, d.prependOnceListener = l, d.listeners = function(t) {
      return []
    }, d.binding = function(t) {
      throw new Error("process.binding is not supported")
    }, d.cwd = function() {
      return "/"
    }, d.chdir = function(t) {
      throw new Error("process.chdir is not supported")
    }, d.umask = function() {
      return 0
    }
  }, {}],
  2: [function(t, e, n) {
    "use strict";
    var i = t("object-keys"),
      o = t("foreach"),
      r = "function" == typeof Symbol && "symbol" == typeof Symbol(),
      a = Object.prototype.toString,
      s = function(t) {
        return "function" == typeof t && "[object Function]" === a.call(t)
      },
      c = Object.defineProperty && function() {
        var t = {};
        try {
          Object.defineProperty(t, "x", {
            enumerable: !1,
            value: t
          });
          for (var e in t) return !1;
          return t.x === t
        } catch (t) {
          return !1
        }
      }(),
      u = function(t, e, n, i) {
        (!(e in t) || s(i) && i()) && (c ? Object.defineProperty(t, e, {
          configurable: !0,
          enumerable: !1,
          value: n,
          writable: !0
        }) : t[e] = n)
      },
      l = function(t, e) {
        var n = arguments.length > 2 ? arguments[2] : {},
          a = i(e);
        r && (a = a.concat(Object.getOwnPropertySymbols(e))), o(a, function(i) {
          u(t, i, e[i], n[i])
        })
      };
    l.supportsDescriptors = !!c, e.exports = l
  }, {
    foreach: 4,
    "object-keys": 7
  }],
  3: [function(t, e, n) {
    "use strict";

    function i() {}

    function o(t, e, n) {
      this.fn = t, this.context = e, this.once = n || !1
    }

    function r() {
      this._events = new i, this._eventsCount = 0
    }
    var a = Object.prototype.hasOwnProperty,
      s = "~";
    Object.create && (i.prototype = Object.create(null), (new i).__proto__ || (s = !1)), r.prototype.eventNames = function() {
      var t, e, n = [];
      if (0 === this._eventsCount) return n;
      for (e in t = this._events) a.call(t, e) && n.push(s ? e.slice(1) : e);
      return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(t)) : n
    }, r.prototype.listeners = function(t, e) {
      var n = s ? s + t : t,
        i = this._events[n];
      if (e) return !!i;
      if (!i) return [];
      if (i.fn) return [i.fn];
      for (var o = 0, r = i.length, a = new Array(r); o < r; o++) a[o] = i[o].fn;
      return a
    }, r.prototype.emit = function(t, e, n, i, o, r) {
      var a = s ? s + t : t;
      if (!this._events[a]) return !1;
      var c, u, l = this._events[a],
        f = arguments.length;
      if (l.fn) {
        switch (l.once && this.removeListener(t, l.fn, void 0, !0), f) {
          case 1:
            return l.fn.call(l.context), !0;
          case 2:
            return l.fn.call(l.context, e), !0;
          case 3:
            return l.fn.call(l.context, e, n), !0;
          case 4:
            return l.fn.call(l.context, e, n, i), !0;
          case 5:
            return l.fn.call(l.context, e, n, i, o), !0;
          case 6:
            return l.fn.call(l.context, e, n, i, o, r), !0
        }
        for (u = 1, c = new Array(f - 1); u < f; u++) c[u - 1] = arguments[u];
        l.fn.apply(l.context, c)
      } else {
        var p, d = l.length;
        for (u = 0; u < d; u++) switch (l[u].once && this.removeListener(t, l[u].fn, void 0, !0), f) {
          case 1:
            l[u].fn.call(l[u].context);
            break;
          case 2:
            l[u].fn.call(l[u].context, e);
            break;
          case 3:
            l[u].fn.call(l[u].context, e, n);
            break;
          case 4:
            l[u].fn.call(l[u].context, e, n, i);
            break;
          default:
            if (!c)
              for (p = 1, c = new Array(f - 1); p < f; p++) c[p - 1] = arguments[p];
            l[u].fn.apply(l[u].context, c)
        }
      }
      return !0
    }, r.prototype.on = function(t, e, n) {
      var i = new o(e, n || this),
        r = s ? s + t : t;
      return this._events[r] ? this._events[r].fn ? this._events[r] = [this._events[r], i] : this._events[r].push(i) : (this._events[r] = i, this._eventsCount++), this
    }, r.prototype.once = function(t, e, n) {
      var i = new o(e, n || this, !0),
        r = s ? s + t : t;
      return this._events[r] ? this._events[r].fn ? this._events[r] = [this._events[r], i] : this._events[r].push(i) : (this._events[r] = i, this._eventsCount++), this
    }, r.prototype.removeListener = function(t, e, n, o) {
      var r = s ? s + t : t;
      if (!this._events[r]) return this;
      if (!e) return 0 == --this._eventsCount ? this._events = new i : delete this._events[r], this;
      var a = this._events[r];
      if (a.fn) a.fn !== e || o && !a.once || n && a.context !== n || (0 == --this._eventsCount ? this._events = new i : delete this._events[r]);
      else {
        for (var c = 0, u = [], l = a.length; c < l; c++)(a[c].fn !== e || o && !a[c].once || n && a[c].context !== n) && u.push(a[c]);
        u.length ? this._events[r] = 1 === u.length ? u[0] : u : 0 == --this._eventsCount ? this._events = new i : delete this._events[r]
      }
      return this
    }, r.prototype.removeAllListeners = function(t) {
      var e;
      return t ? (e = s ? s + t : t, this._events[e] && (0 == --this._eventsCount ? this._events = new i : delete this._events[e])) : (this._events = new i, this._eventsCount = 0), this
    }, r.prototype.off = r.prototype.removeListener, r.prototype.addListener = r.prototype.on, r.prototype.setMaxListeners = function() {
      return this
    }, r.prefixed = s, r.EventEmitter = r, void 0 !== e && (e.exports = r)
  }, {}],
  4: [function(t, e, n) {
    var i = Object.prototype.hasOwnProperty,
      o = Object.prototype.toString;
    e.exports = function(t, e, n) {
      if ("[object Function]" !== o.call(e)) throw new TypeError("iterator must be a function");
      var r = t.length;
      if (r === +r)
        for (var a = 0; a < r; a++) e.call(n, t[a], a, t);
      else
        for (var s in t) i.call(t, s) && e.call(n, t[s], s, t)
    }
  }, {}],
  5: [function(t, e, n) {
    var i = Array.prototype.slice,
      o = Object.prototype.toString;
    e.exports = function(t) {
      var e = this;
      if ("function" != typeof e || "[object Function]" !== o.call(e)) throw new TypeError("Function.prototype.bind called on incompatible " + e);
      for (var n, r = i.call(arguments, 1), a = function() {
          if (this instanceof n) {
            var o = e.apply(this, r.concat(i.call(arguments)));
            return Object(o) === o ? o : this
          }
          return e.apply(t, r.concat(i.call(arguments)))
        }, s = Math.max(0, e.length - r.length), c = [], u = 0; u < s; u++) c.push("$" + u);
      if (n = Function("binder", "return function (" + c.join(",") + "){ return binder.apply(this,arguments); }")(a), e.prototype) {
        var l = function() {};
        l.prototype = e.prototype, n.prototype = new l, l.prototype = null
      }
      return n
    }
  }, {}],
  6: [function(t, e, n) {
    var i = t("./implementation");
    e.exports = Function.prototype.bind || i
  }, {
    "./implementation": 5
  }],
  7: [function(t, e, n) {
    "use strict";
    var i = Object.prototype.hasOwnProperty,
      o = Object.prototype.toString,
      r = Array.prototype.slice,
      a = t("./isArguments"),
      s = Object.prototype.propertyIsEnumerable,
      c = !s.call({
        toString: null
      }, "toString"),
      u = s.call(function() {}, "prototype"),
      l = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
      f = function(t) {
        var e = t.constructor;
        return e && e.prototype === t
      },
      p = {
        $console: !0,
        $external: !0,
        $frame: !0,
        $frameElement: !0,
        $frames: !0,
        $innerHeight: !0,
        $innerWidth: !0,
        $outerHeight: !0,
        $outerWidth: !0,
        $pageXOffset: !0,
        $pageYOffset: !0,
        $parent: !0,
        $scrollLeft: !0,
        $scrollTop: !0,
        $scrollX: !0,
        $scrollY: !0,
        $self: !0,
        $webkitIndexedDB: !0,
        $webkitStorageInfo: !0,
        $window: !0
      },
      d = function() {
        if ("undefined" == typeof window) return !1;
        for (var t in window) try {
          if (!p["$" + t] && i.call(window, t) && null !== window[t] && "object" == typeof window[t]) try {
            f(window[t])
          } catch (t) {
            return !0
          }
        } catch (t) {
          return !0
        }
        return !1
      }(),
      h = function(t) {
        if ("undefined" == typeof window || !d) return f(t);
        try {
          return f(t)
        } catch (t) {
          return !1
        }
      },
      m = function(t) {
        var e = null !== t && "object" == typeof t,
          n = "[object Function]" === o.call(t),
          r = a(t),
          s = e && "[object String]" === o.call(t),
          f = [];
        if (!e && !n && !r) throw new TypeError("Object.keys called on a non-object");
        var p = u && n;
        if (s && t.length > 0 && !i.call(t, 0))
          for (var d = 0; d < t.length; ++d) f.push(String(d));
        if (r && t.length > 0)
          for (var m = 0; m < t.length; ++m) f.push(String(m));
        else
          for (var g in t) p && "prototype" === g || !i.call(t, g) || f.push(String(g));
        if (c)
          for (var v = h(t), y = 0; y < l.length; ++y) v && "constructor" === l[y] || !i.call(t, l[y]) || f.push(l[y]);
        return f
      };
    m.shim = function() {
      if (Object.keys) {
        if (! function() {
            return 2 === (Object.keys(arguments) || "").length
          }(1, 2)) {
          var t = Object.keys;
          Object.keys = function(e) {
            return t(a(e) ? r.call(e) : e)
          }
        }
      } else Object.keys = m;
      return Object.keys || m
    }, e.exports = m
  }, {
    "./isArguments": 8
  }],
  8: [function(t, e, n) {
    "use strict";
    var i = Object.prototype.toString;
    e.exports = function(t) {
      var e = i.call(t),
        n = "[object Arguments]" === e;
      return n || (n = "[object Array]" !== e && null !== t && "object" == typeof t && "number" == typeof t.length && t.length >= 0 && "[object Function]" === i.call(t.callee)), n
    }
  }, {}],
  9: [function(t, e, n) {
    "use strict";
    var i = t("object-keys");
    e.exports = function() {
      if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
      if ("symbol" == typeof Symbol.iterator) return !0;
      var t = {},
        e = Symbol("test"),
        n = Object(e);
      if ("string" == typeof e) return !1;
      if ("[object Symbol]" !== Object.prototype.toString.call(e)) return !1;
      if ("[object Symbol]" !== Object.prototype.toString.call(n)) return !1;
      t[e] = 42;
      for (e in t) return !1;
      if (0 !== i(t).length) return !1;
      if ("function" == typeof Object.keys && 0 !== Object.keys(t).length) return !1;
      if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(t).length) return !1;
      var o = Object.getOwnPropertySymbols(t);
      if (1 !== o.length || o[0] !== e) return !1;
      if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1;
      if ("function" == typeof Object.getOwnPropertyDescriptor) {
        var r = Object.getOwnPropertyDescriptor(t, e);
        if (42 !== r.value || !0 !== r.enumerable) return !1
      }
      return !0
    }
  }, {
    "object-keys": 7
  }],
  10: [function(t, e, n) {
    "use strict";
    var i = t("object-keys"),
      o = t("function-bind"),
      r = function(t) {
        return void 0 !== t && null !== t
      },
      a = t("./hasSymbols")(),
      s = Object,
      c = o.call(Function.call, Array.prototype.push),
      u = o.call(Function.call, Object.prototype.propertyIsEnumerable),
      l = a ? Object.getOwnPropertySymbols : null;
    e.exports = function(t, e) {
      if (!r(t)) throw new TypeError("target must be an object");
      var n, o, f, p, d, h, m, g = s(t);
      for (n = 1; n < arguments.length; ++n) {
        o = s(arguments[n]), p = i(o);
        var v = a && (Object.getOwnPropertySymbols || l);
        if (v)
          for (d = v(o), f = 0; f < d.length; ++f) m = d[f], u(o, m) && c(p, m);
        for (f = 0; f < p.length; ++f) m = p[f], h = o[m], u(o, m) && (g[m] = h)
      }
      return g
    }
  }, {
    "./hasSymbols": 9,
    "function-bind": 6,
    "object-keys": 7
  }],
  11: [function(t, e, n) {
    "use strict";
    var i = t("define-properties"),
      o = t("./implementation"),
      r = t("./polyfill"),
      a = t("./shim"),
      s = r();
    i(s, {
      implementation: o,
      getPolyfill: r,
      shim: a
    }), e.exports = s
  }, {
    "./implementation": 10,
    "./polyfill": 12,
    "./shim": 13,
    "define-properties": 2
  }],
  12: [function(t, e, n) {
    "use strict";
    var i = t("./implementation"),
      o = function() {
        if (!Object.assign) return !1;
        for (var t = "abcdefghijklmnopqrst", e = t.split(""), n = {}, i = 0; i < e.length; ++i) n[e[i]] = e[i];
        var o = Object.assign({}, n),
          r = "";
        for (var a in o) r += a;
        return t !== r
      },
      r = function() {
        if (!Object.assign || !Object.preventExtensions) return !1;
        var t = Object.preventExtensions({
          1: 2
        });
        try {
          Object.assign(t, "xy")
        } catch (e) {
          return "y" === t[1]
        }
        return !1
      };
    e.exports = function() {
      return Object.assign ? o() ? i : r() ? i : Object.assign : i
    }
  }, {
    "./implementation": 10
  }],
  13: [function(t, e, n) {
    "use strict";
    var i = t("define-properties"),
      o = t("./polyfill");
    e.exports = function() {
      var t = o();
      return i(Object, {
        assign: t
      }, {
        assign: function() {
          return Object.assign !== t
        }
      }), t
    }
  }, {
    "./polyfill": 12,
    "define-properties": 2
  }],
  14: [function(t, e, n) {
    (function(t) {
      ! function(t) {
        "use strict";
        if ("function" == typeof bootstrap) bootstrap("promise", t);
        else if ("object" == typeof n && "object" == typeof e) e.exports = t();
        else if ("function" == typeof define && define.amd) define(t);
        else if ("undefined" != typeof ses) {
          if (!ses.ok()) return;
          ses.makeQ = t
        } else {
          if ("undefined" == typeof window && "undefined" == typeof self) throw new Error("This environment was not anticipated by Q. Please file a bug.");
          var i = "undefined" != typeof window ? window : self,
            o = i.Q;
          i.Q = t(), i.Q.noConflict = function() {
            return i.Q = o, this
          }
        }
      }(function() {
        "use strict";

        function e(t) {
          return function() {
            return _.apply(t, arguments)
          }
        }

        function n(t) {
          return t === Object(t)
        }

        function i(t) {
          return "[object StopIteration]" === nt(t) || t instanceof Y
        }

        function o(t, e) {
          if (U && e.stack && "object" == typeof t && null !== t && t.stack) {
            for (var n = [], i = e; i; i = i.source) i.stack && (!t.__minimumStackCounter__ || t.__minimumStackCounter__ > i.stackCounter) && ($(t, "__minimumStackCounter__", {
              value: i.stackCounter,
              configurable: !0
            }), n.unshift(i.stack));
            n.unshift(t.stack);
            var o = n.join("\n" + it + "\n"),
              a = r(o);
            $(t, "stack", {
              value: a,
              configurable: !0
            })
          }
        }

        function r(t) {
          for (var e = t.split("\n"), n = [], i = 0; i < e.length; ++i) {
            var o = e[i];
            c(o) || a(o) || !o || n.push(o)
          }
          return n.join("\n")
        }

        function a(t) {
          return -1 !== t.indexOf("(module.js:") || -1 !== t.indexOf("(node.js:")
        }

        function s(t) {
          var e = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(t);
          if (e) return [e[1], Number(e[2])];
          var n = /at ([^ ]+):(\d+):(?:\d+)$/.exec(t);
          if (n) return [n[1], Number(n[2])];
          var i = /.*@(.+):(\d+)$/.exec(t);
          return i ? [i[1], Number(i[2])] : void 0
        }

        function c(t) {
          var e = s(t);
          if (!e) return !1;
          var n = e[0],
            i = e[1];
          return n === H && i >= G && i <= ut
        }

        function u() {
          if (U) try {
            throw new Error
          } catch (i) {
            var t = i.stack.split("\n"),
              e = t[0].indexOf("@") > 0 ? t[1] : t[2],
              n = s(e);
            if (!n) return;
            return H = n[0], n[1]
          }
        }

        function l(t) {
          return t instanceof h ? t : y(t) ? E(t) : C(t)
        }

        function f() {
          function t(t) {
            e = t, l.longStackSupport && U && (r.source = t), K(n, function(e, n) {
              l.nextTick(function() {
                t.promiseDispatch.apply(t, n)
              })
            }, void 0), n = void 0, i = void 0
          }
          var e, n = [],
            i = [],
            o = V(f.prototype),
            r = V(h.prototype);
          if (r.promiseDispatch = function(t, o, r) {
              var a = X(arguments);
              n ? (n.push(a), "when" === o && r[1] && i.push(r[1])) : l.nextTick(function() {
                e.promiseDispatch.apply(e, a)
              })
            }, r.valueOf = function() {
              if (n) return r;
              var t = g(e);
              return v(t) && (e = t), t
            }, r.inspect = function() {
              return e ? e.inspect() : {
                state: "pending"
              }
            }, l.longStackSupport && U) try {
            throw new Error
          } catch (t) {
            r.stack = t.stack.substring(t.stack.indexOf("\n") + 1), r.stackCounter = ot++
          }
          return o.promise = r, o.resolve = function(n) {
            e || t(l(n))
          }, o.fulfill = function(n) {
            e || t(C(n))
          }, o.reject = function(n) {
            e || t(O(n))
          }, o.notify = function(t) {
            e || K(i, function(e, n) {
              l.nextTick(function() {
                n(t)
              })
            }, void 0)
          }, o
        }

        function p(t) {
          if ("function" != typeof t) throw new TypeError("resolver must be a function.");
          var e = f();
          try {
            t(e.resolve, e.reject, e.notify)
          } catch (t) {
            e.reject(t)
          }
          return e.promise
        }

        function d(t) {
          return p(function(e, n) {
            for (var i = 0, o = t.length; i < o; i++) l(t[i]).then(e, n)
          })
        }

        function h(t, e, n) {
          void 0 === e && (e = function(t) {
            return O(new Error("Promise does not support operation: " + t))
          }), void 0 === n && (n = function() {
            return {
              state: "unknown"
            }
          });
          var i = V(h.prototype);
          if (i.promiseDispatch = function(n, o, r) {
              var a;
              try {
                a = t[o] ? t[o].apply(i, r) : e.call(i, o, r)
              } catch (t) {
                a = O(t)
              }
              n && n(a)
            }, i.inspect = n, n) {
            var o = n();
            "rejected" === o.state && (i.exception = o.reason), i.valueOf = function() {
              var t = n();
              return "pending" === t.state || "rejected" === t.state ? i : t.value
            }
          }
          return i
        }

        function m(t, e, n, i) {
          return l(t).then(e, n, i)
        }

        function g(t) {
          if (v(t)) {
            var e = t.inspect();
            if ("fulfilled" === e.state) return e.value
          }
          return t
        }

        function v(t) {
          return t instanceof h
        }

        function y(t) {
          return n(t) && "function" == typeof t.then
        }

        function b(t) {
          return v(t) && "pending" === t.inspect().state
        }

        function w(t) {
          return !v(t) || "fulfilled" === t.inspect().state
        }

        function A(t) {
          return v(t) && "rejected" === t.inspect().state
        }

        function k() {
          rt.length = 0, at.length = 0, ct || (ct = !0)
        }

        function x(e, n) {
          ct && ("object" == typeof t && "function" == typeof t.emit && l.nextTick.runAfter(function() {
            -1 !== Z(at, e) && (t.emit("unhandledRejection", n, e), st.push(e))
          }), at.push(e), n && void 0 !== n.stack ? rt.push(n.stack) : rt.push("(no stack) " + n))
        }

        function j(e) {
          if (ct) {
            var n = Z(at, e); - 1 !== n && ("object" == typeof t && "function" == typeof t.emit && l.nextTick.runAfter(function() {
              var i = Z(st, e); - 1 !== i && (t.emit("rejectionHandled", rt[n], e), st.splice(i, 1))
            }), at.splice(n, 1), rt.splice(n, 1))
          }
        }

        function O(t) {
          var e = h({
            when: function(e) {
              return e && j(this), e ? e(t) : this
            }
          }, function() {
            return this
          }, function() {
            return {
              state: "rejected",
              reason: t
            }
          });
          return x(e, t), e
        }

        function C(t) {
          return h({
            when: function() {
              return t
            },
            get: function(e) {
              return t[e]
            },
            set: function(e, n) {
              t[e] = n
            },
            delete: function(e) {
              delete t[e]
            },
            post: function(e, n) {
              return null === e || void 0 === e ? t.apply(void 0, n) : t[e].apply(t, n)
            },
            apply: function(e, n) {
              return t.apply(e, n)
            },
            keys: function() {
              return et(t)
            }
          }, void 0, function() {
            return {
              state: "fulfilled",
              value: t
            }
          })
        }

        function E(t) {
          var e = f();
          return l.nextTick(function() {
            try {
              t.then(e.resolve, e.reject, e.notify)
            } catch (t) {
              e.reject(t)
            }
          }), e.promise
        }

        function D(t) {
          return h({
            isDef: function() {}
          }, function(e, n) {
            return S(t, e, n)
          }, function() {
            return l(t).inspect()
          })
        }

        function T(t, e, n) {
          return l(t).spread(e, n)
        }

        function z(t) {
          return function() {
            function e(t, e) {
              var a;
              if ("undefined" == typeof StopIteration) {
                try {
                  a = n[t](e)
                } catch (t) {
                  return O(t)
                }
                return a.done ? l(a.value) : m(a.value, o, r)
              }
              try {
                a = n[t](e)
              } catch (t) {
                return i(t) ? l(t.value) : O(t)
              }
              return m(a, o, r)
            }
            var n = t.apply(this, arguments),
              o = e.bind(e, "next"),
              r = e.bind(e, "throw");
            return o()
          }
        }

        function M(t) {
          l.done(l.async(t)())
        }

        function I(t) {
          throw new Y(t)
        }

        function B(t) {
          return function() {
            return T([this, R(arguments)], function(e, n) {
              return t.apply(e, n)
            })
          }
        }

        function S(t, e, n) {
          return l(t).dispatch(e, n)
        }

        function R(t) {
          return m(t, function(t) {
            var e = 0,
              n = f();
            return K(t, function(i, o, r) {
              var a;
              v(o) && "fulfilled" === (a = o.inspect()).state ? t[r] = a.value : (++e, m(o, function(i) {
                t[r] = i, 0 == --e && n.resolve(t)
              }, n.reject, function(t) {
                n.notify({
                  index: r,
                  value: t
                })
              }))
            }, void 0), 0 === e && n.resolve(t), n.promise
          })
        }

        function P(t) {
          if (0 === t.length) return l.resolve();
          var e = l.defer(),
            n = 0;
          return K(t, function(i, o, r) {
            function a(t) {
              e.resolve(t)
            }

            function s(t) {
              0 === --n && (t.message = "Q can't get fulfillment value from any promise, all promises were rejected. Last error message: " + t.message, e.reject(t))
            }

            function c(t) {
              e.notify({
                index: r,
                value: t
              })
            }
            var u = t[r];
            n++, m(u, a, s, c)
          }, void 0), e.promise
        }

        function L(t) {
          return m(t, function(t) {
            return t = W(t, l), m(R(W(t, function(t) {
              return m(t, Q, Q)
            })), function() {
              return t
            })
          })
        }

        function q(t) {
          return l(t).allSettled()
        }

        function N(t, e) {
          return l(t).then(void 0, void 0, e)
        }

        function F(t, e) {
          return l(t).nodeify(e)
        }
        var U = !1;
        try {
          throw new Error
        } catch (t) {
          U = !!t.stack
        }
        var H, Y, G = u(),
          Q = function() {},
          J = function() {
            function e() {
              for (var t, e; i.next;) i = i.next, t = i.task, i.task = void 0, e = i.domain, e && (i.domain = void 0, e.enter()), n(t, e);
              for (; c.length;) t = c.pop(), n(t);
              r = !1
            }

            function n(t, n) {
              try {
                t()
              } catch (t) {
                if (s) throw n && n.exit(), setTimeout(e, 0), n && n.enter(), t;
                setTimeout(function() {
                  throw t
                }, 0)
              }
              n && n.exit()
            }
            var i = {
                task: void 0,
                next: null
              },
              o = i,
              r = !1,
              a = void 0,
              s = !1,
              c = [];
            if (J = function(e) {
                o = o.next = {
                  task: e,
                  domain: s && t.domain,
                  next: null
                }, r || (r = !0, a())
              }, "object" == typeof t && "[object process]" === t.toString() && t.nextTick) s = !0, a = function() {
              t.nextTick(e)
            };
            else if ("function" == typeof setImmediate) a = "undefined" != typeof window ? setImmediate.bind(window, e) : function() {
              setImmediate(e)
            };
            else if ("undefined" != typeof MessageChannel) {
              var u = new MessageChannel;
              u.port1.onmessage = function() {
                a = l, u.port1.onmessage = e, e()
              };
              var l = function() {
                u.port2.postMessage(0)
              };
              a = function() {
                setTimeout(e, 0), l()
              }
            } else a = function() {
              setTimeout(e, 0)
            };
            return J.runAfter = function(t) {
              c.push(t), r || (r = !0, a())
            }, J
          }(),
          _ = Function.call,
          X = e(Array.prototype.slice),
          K = e(Array.prototype.reduce || function(t, e) {
            var n = 0,
              i = this.length;
            if (1 === arguments.length)
              for (;;) {
                if (n in this) {
                  e = this[n++];
                  break
                }
                if (++n >= i) throw new TypeError
              }
            for (; n < i; n++) n in this && (e = t(e, this[n], n));
            return e
          }),
          Z = e(Array.prototype.indexOf || function(t) {
            for (var e = 0; e < this.length; e++)
              if (this[e] === t) return e;
            return -1
          }),
          W = e(Array.prototype.map || function(t, e) {
            var n = this,
              i = [];
            return K(n, function(o, r, a) {
              i.push(t.call(e, r, a, n))
            }, void 0), i
          }),
          V = Object.create || function(t) {
            function e() {}
            return e.prototype = t, new e
          },
          $ = Object.defineProperty || function(t, e, n) {
            return t[e] = n.value, t
          },
          tt = e(Object.prototype.hasOwnProperty),
          et = Object.keys || function(t) {
            var e = [];
            for (var n in t) tt(t, n) && e.push(n);
            return e
          },
          nt = e(Object.prototype.toString);
        Y = "undefined" != typeof ReturnValue ? ReturnValue : function(t) {
          this.value = t
        };
        var it = "From previous event:";
        l.resolve = l, l.nextTick = J, l.longStackSupport = !1;
        var ot = 1;
        "object" == typeof t && t && t.env && t.env.Q_DEBUG && (l.longStackSupport = !0), l.defer = f, f.prototype.makeNodeResolver = function() {
          var t = this;
          return function(e, n) {
            e ? t.reject(e) : arguments.length > 2 ? t.resolve(X(arguments, 1)) : t.resolve(n)
          }
        }, l.Promise = p, l.promise = p, p.race = d, p.all = R, p.reject = O, p.resolve = l, l.passByCopy = function(t) {
          return t
        }, h.prototype.passByCopy = function() {
          return this
        }, l.join = function(t, e) {
          return l(t).join(e)
        }, h.prototype.join = function(t) {
          return l([this, t]).spread(function(t, e) {
            if (t === e) return t;
            throw new Error("Q can't join: not the same: " + t + " " + e)
          })
        }, l.race = d, h.prototype.race = function() {
          return this.then(l.race)
        }, l.makePromise = h, h.prototype.toString = function() {
          return "[object Promise]"
        }, h.prototype.then = function(t, e, n) {
          function i(e) {
            try {
              return "function" == typeof t ? t(e) : e
            } catch (t) {
              return O(t)
            }
          }

          function r(t) {
            if ("function" == typeof e) {
              o(t, s);
              try {
                return e(t)
              } catch (t) {
                return O(t)
              }
            }
            return O(t)
          }

          function a(t) {
            return "function" == typeof n ? n(t) : t
          }
          var s = this,
            c = f(),
            u = !1;
          return l.nextTick(function() {
            s.promiseDispatch(function(t) {
              u || (u = !0, c.resolve(i(t)))
            }, "when", [function(t) {
              u || (u = !0, c.resolve(r(t)))
            }])
          }), s.promiseDispatch(void 0, "when", [void 0, function(t) {
            var e, n = !1;
            try {
              e = a(t)
            } catch (t) {
              if (n = !0, !l.onerror) throw t;
              l.onerror(t)
            }
            n || c.notify(e)
          }]), c.promise
        }, l.tap = function(t, e) {
          return l(t).tap(e)
        }, h.prototype.tap = function(t) {
          return t = l(t), this.then(function(e) {
            return t.fcall(e).thenResolve(e)
          })
        }, l.when = m, h.prototype.thenResolve = function(t) {
          return this.then(function() {
            return t
          })
        }, l.thenResolve = function(t, e) {
          return l(t).thenResolve(e)
        }, h.prototype.thenReject = function(t) {
          return this.then(function() {
            throw t
          })
        }, l.thenReject = function(t, e) {
          return l(t).thenReject(e)
        }, l.nearer = g, l.isPromise = v, l.isPromiseAlike = y, l.isPending = b, h.prototype.isPending = function() {
          return "pending" === this.inspect().state
        }, l.isFulfilled = w, h.prototype.isFulfilled = function() {
          return "fulfilled" === this.inspect().state
        }, l.isRejected = A, h.prototype.isRejected = function() {
          return "rejected" === this.inspect().state
        };
        var rt = [],
          at = [],
          st = [],
          ct = !0;
        l.resetUnhandledRejections = k, l.getUnhandledReasons = function() {
          return rt.slice()
        }, l.stopUnhandledRejectionTracking = function() {
          k(), ct = !1
        }, k(), l.reject = O, l.fulfill = C, l.master = D, l.spread = T, h.prototype.spread = function(t, e) {
          return this.all().then(function(e) {
            return t.apply(void 0, e)
          }, e)
        }, l.async = z, l.spawn = M, l.return = I, l.promised = B, l.dispatch = S, h.prototype.dispatch = function(t, e) {
          var n = this,
            i = f();
          return l.nextTick(function() {
            n.promiseDispatch(i.resolve, t, e)
          }), i.promise
        }, l.get = function(t, e) {
          return l(t).dispatch("get", [e])
        }, h.prototype.get = function(t) {
          return this.dispatch("get", [t])
        }, l.set = function(t, e, n) {
          return l(t).dispatch("set", [e, n])
        }, h.prototype.set = function(t, e) {
          return this.dispatch("set", [t, e])
        }, l.del = l.delete = function(t, e) {
          return l(t).dispatch("delete", [e])
        }, h.prototype.del = h.prototype.delete = function(t) {
          return this.dispatch("delete", [t])
        }, l.mapply = l.post = function(t, e, n) {
          return l(t).dispatch("post", [e, n])
        }, h.prototype.mapply = h.prototype.post = function(t, e) {
          return this.dispatch("post", [t, e])
        }, l.send = l.mcall = l.invoke = function(t, e) {
          return l(t).dispatch("post", [e, X(arguments, 2)])
        }, h.prototype.send = h.prototype.mcall = h.prototype.invoke = function(t) {
          return this.dispatch("post", [t, X(arguments, 1)])
        }, l.fapply = function(t, e) {
          return l(t).dispatch("apply", [void 0, e])
        }, h.prototype.fapply = function(t) {
          return this.dispatch("apply", [void 0, t])
        }, l.try = l.fcall = function(t) {
          return l(t).dispatch("apply", [void 0, X(arguments, 1)])
        }, h.prototype.fcall = function() {
          return this.dispatch("apply", [void 0, X(arguments)])
        }, l.fbind = function(t) {
          var e = l(t),
            n = X(arguments, 1);
          return function() {
            return e.dispatch("apply", [this, n.concat(X(arguments))])
          }
        }, h.prototype.fbind = function() {
          var t = this,
            e = X(arguments);
          return function() {
            return t.dispatch("apply", [this, e.concat(X(arguments))])
          }
        }, l.keys = function(t) {
          return l(t).dispatch("keys", [])
        }, h.prototype.keys = function() {
          return this.dispatch("keys", [])
        }, l.all = R, h.prototype.all = function() {
          return R(this)
        }, l.any = P, h.prototype.any = function() {
          return P(this)
        }, l.allResolved = function(t, e, n) {
          return function() {
            return "undefined" != typeof console && "function" == typeof console.warn && console.warn(e + " is deprecated, use " + n + " instead.", new Error("").stack), t.apply(t, arguments)
          }
        }(L, "allResolved", "allSettled"), h.prototype.allResolved = function() {
          return L(this)
        }, l.allSettled = q, h.prototype.allSettled = function() {
          return this.then(function(t) {
            return R(W(t, function(t) {
              function e() {
                return t.inspect()
              }
              return t = l(t), t.then(e, e)
            }))
          })
        }, l.fail = l.catch = function(t, e) {
          return l(t).then(void 0, e)
        }, h.prototype.fail = h.prototype.catch = function(t) {
          return this.then(void 0, t)
        }, l.progress = N, h.prototype.progress = function(t) {
          return this.then(void 0, void 0, t)
        }, l.fin = l.finally = function(t, e) {
          return l(t).finally(e)
        }, h.prototype.fin = h.prototype.finally = function(t) {
          if (!t || "function" != typeof t.apply) throw new Error("Q can't apply finally callback");
          return t = l(t), this.then(function(e) {
            return t.fcall().then(function() {
              return e
            })
          }, function(e) {
            return t.fcall().then(function() {
              throw e
            })
          })
        }, l.done = function(t, e, n, i) {
          return l(t).done(e, n, i)
        }, h.prototype.done = function(e, n, i) {
          var r = function(t) {
              l.nextTick(function() {
                if (o(t, a), !l.onerror) throw t;
                l.onerror(t)
              })
            },
            a = e || n || i ? this.then(e, n, i) : this;
          "object" == typeof t && t && t.domain && (r = t.domain.bind(r)), a.then(void 0, r)
        }, l.timeout = function(t, e, n) {
          return l(t).timeout(e, n)
        }, h.prototype.timeout = function(t, e) {
          var n = f(),
            i = setTimeout(function() {
              e && "string" != typeof e || (e = new Error(e || "Timed out after " + t + " ms"), e.code = "ETIMEDOUT"), n.reject(e)
            }, t);
          return this.then(function(t) {
            clearTimeout(i), n.resolve(t)
          }, function(t) {
            clearTimeout(i), n.reject(t)
          }, n.notify), n.promise
        }, l.delay = function(t, e) {
          return void 0 === e && (e = t, t = void 0), l(t).delay(e)
        }, h.prototype.delay = function(t) {
          return this.then(function(e) {
            var n = f();
            return setTimeout(function() {
              n.resolve(e)
            }, t), n.promise
          })
        }, l.nfapply = function(t, e) {
          return l(t).nfapply(e)
        }, h.prototype.nfapply = function(t) {
          var e = f(),
            n = X(t);
          return n.push(e.makeNodeResolver()), this.fapply(n).fail(e.reject), e.promise
        }, l.nfcall = function(t) {
          var e = X(arguments, 1);
          return l(t).nfapply(e)
        }, h.prototype.nfcall = function() {
          var t = X(arguments),
            e = f();
          return t.push(e.makeNodeResolver()), this.fapply(t).fail(e.reject), e.promise
        }, l.nfbind = l.denodeify = function(t) {
          if (void 0 === t) throw new Error("Q can't wrap an undefined function");
          var e = X(arguments, 1);
          return function() {
            var n = e.concat(X(arguments)),
              i = f();
            return n.push(i.makeNodeResolver()), l(t).fapply(n).fail(i.reject), i.promise
          }
        }, h.prototype.nfbind = h.prototype.denodeify = function() {
          var t = X(arguments);
          return t.unshift(this), l.denodeify.apply(void 0, t)
        }, l.nbind = function(t, e) {
          var n = X(arguments, 2);
          return function() {
            function i() {
              return t.apply(e, arguments)
            }
            var o = n.concat(X(arguments)),
              r = f();
            return o.push(r.makeNodeResolver()), l(i).fapply(o).fail(r.reject), r.promise
          }
        }, h.prototype.nbind = function() {
          var t = X(arguments, 0);
          return t.unshift(this), l.nbind.apply(void 0, t)
        }, l.nmapply = l.npost = function(t, e, n) {
          return l(t).npost(e, n)
        }, h.prototype.nmapply = h.prototype.npost = function(t, e) {
          var n = X(e || []),
            i = f();
          return n.push(i.makeNodeResolver()), this.dispatch("post", [t, n]).fail(i.reject), i.promise
        }, l.nsend = l.nmcall = l.ninvoke = function(t, e) {
          var n = X(arguments, 2),
            i = f();
          return n.push(i.makeNodeResolver()), l(t).dispatch("post", [e, n]).fail(i.reject), i.promise
        }, h.prototype.nsend = h.prototype.nmcall = h.prototype.ninvoke = function(t) {
          var e = X(arguments, 1),
            n = f();
          return e.push(n.makeNodeResolver()), this.dispatch("post", [t, e]).fail(n.reject), n.promise
        }, l.nodeify = F, h.prototype.nodeify = function(t) {
          if (!t) return this;
          this.then(function(e) {
            l.nextTick(function() {
              t(null, e)
            })
          }, function(e) {
            l.nextTick(function() {
              t(e)
            })
          })
        }, l.noConflict = function() {
          throw new Error("Q.noConflict only works when Q is used as a global")
        };
        var ut = u();
        return l
      })
    }).call(this, t("_process"))
  }, {
    _process: 1
  }],
  15: [function(t, e, n) {
    "use strict";
    var i = String.prototype.replace,
      o = /%20/g;
    e.exports = {
      default: "RFC3986",
      formatters: {
        RFC1738: function(t) {
          return i.call(t, o, "+")
        },
        RFC3986: function(t) {
          return t
        }
      },
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    }
  }, {}],
  16: [function(t, e, n) {
    "use strict";
    var i = t("./stringify"),
      o = t("./parse"),
      r = t("./formats");
    e.exports = {
      formats: r,
      parse: o,
      stringify: i
    }
  }, {
    "./formats": 15,
    "./parse": 17,
    "./stringify": 18
  }],
  17: [function(t, e, n) {
    "use strict";
    var i = t("./utils"),
      o = Object.prototype.hasOwnProperty,
      r = {
        allowDots: !1,
        allowPrototypes: !1,
        arrayLimit: 20,
        decoder: i.decode,
        delimiter: "&",
        depth: 5,
        parameterLimit: 1e3,
        plainObjects: !1,
        strictNullHandling: !1
      },
      a = function(t, e) {
        for (var n = {}, i = t.split(e.delimiter, e.parameterLimit === 1 / 0 ? void 0 : e.parameterLimit), r = 0; r < i.length; ++r) {
          var a, s, c = i[r],
            u = -1 === c.indexOf("]=") ? c.indexOf("=") : c.indexOf("]=") + 1; - 1 === u ? (a = e.decoder(c), s = e.strictNullHandling ? null : "") : (a = e.decoder(c.slice(0, u)), s = e.decoder(c.slice(u + 1))), o.call(n, a) ? n[a] = [].concat(n[a]).concat(s) : n[a] = s
        }
        return n
      },
      s = function(t, e, n) {
        if (!t.length) return e;
        var i, o = t.shift();
        if ("[]" === o) i = [], i = i.concat(s(t, e, n));
        else {
          i = n.plainObjects ? Object.create(null) : {};
          var r = "[" === o.charAt(0) && "]" === o.charAt(o.length - 1) ? o.slice(1, -1) : o,
            a = parseInt(r, 10);
          !isNaN(a) && o !== r && String(a) === r && a >= 0 && n.parseArrays && a <= n.arrayLimit ? (i = [], i[a] = s(t, e, n)) : i[r] = s(t, e, n)
        }
        return i
      },
      c = function(t, e, n) {
        if (t) {
          var i = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t,
            r = /(\[[^[\]]*])/,
            a = /(\[[^[\]]*])/g,
            c = r.exec(i),
            u = c ? i.slice(0, c.index) : i,
            l = [];
          if (u) {
            if (!n.plainObjects && o.call(Object.prototype, u) && !n.allowPrototypes) return;
            l.push(u)
          }
          for (var f = 0; null !== (c = a.exec(i)) && f < n.depth;) {
            if (f += 1, !n.plainObjects && o.call(Object.prototype, c[1].slice(1, -1)) && !n.allowPrototypes) return;
            l.push(c[1])
          }
          return c && l.push("[" + i.slice(c.index) + "]"), s(l, e, n)
        }
      };
    e.exports = function(t, e) {
      var n = e || {};
      if (null !== n.decoder && void 0 !== n.decoder && "function" != typeof n.decoder) throw new TypeError("Decoder has to be a function.");
      if (n.delimiter = "string" == typeof n.delimiter || i.isRegExp(n.delimiter) ? n.delimiter : r.delimiter, n.depth = "number" == typeof n.depth ? n.depth : r.depth, n.arrayLimit = "number" == typeof n.arrayLimit ? n.arrayLimit : r.arrayLimit, n.parseArrays = !1 !== n.parseArrays, n.decoder = "function" == typeof n.decoder ? n.decoder : r.decoder, n.allowDots = "boolean" == typeof n.allowDots ? n.allowDots : r.allowDots, n.plainObjects = "boolean" == typeof n.plainObjects ? n.plainObjects : r.plainObjects, n.allowPrototypes = "boolean" == typeof n.allowPrototypes ? n.allowPrototypes : r.allowPrototypes, n.parameterLimit = "number" == typeof n.parameterLimit ? n.parameterLimit : r.parameterLimit, n.strictNullHandling = "boolean" == typeof n.strictNullHandling ? n.strictNullHandling : r.strictNullHandling, "" === t || null === t || void 0 === t) return n.plainObjects ? Object.create(null) : {};
      for (var o = "string" == typeof t ? a(t, n) : t, s = n.plainObjects ? Object.create(null) : {}, u = Object.keys(o), l = 0; l < u.length; ++l) {
        var f = u[l],
          p = c(f, o[f], n);
        s = i.merge(s, p, n)
      }
      return i.compact(s)
    }
  }, {
    "./utils": 19
  }],
  18: [function(t, e, n) {
    "use strict";
    var i = t("./utils"),
      o = t("./formats"),
      r = {
        brackets: function(t) {
          return t + "[]"
        },
        indices: function(t, e) {
          return t + "[" + e + "]"
        },
        repeat: function(t) {
          return t
        }
      },
      a = Date.prototype.toISOString,
      s = {
        delimiter: "&",
        encode: !0,
        encoder: i.encode,
        encodeValuesOnly: !1,
        serializeDate: function(t) {
          return a.call(t)
        },
        skipNulls: !1,
        strictNullHandling: !1
      },
      c = function t(e, n, o, r, a, s, c, u, l, f, p, d) {
        var h = e;
        if ("function" == typeof c) h = c(n, h);
        else if (h instanceof Date) h = f(h);
        else if (null === h) {
          if (r) return s && !d ? s(n) : n;
          h = ""
        }
        if ("string" == typeof h || "number" == typeof h || "boolean" == typeof h || i.isBuffer(h)) {
          if (s) {
            return [p(d ? n : s(n)) + "=" + p(s(h))]
          }
          return [p(n) + "=" + p(String(h))]
        }
        var m = [];
        if (void 0 === h) return m;
        var g;
        if (Array.isArray(c)) g = c;
        else {
          var v = Object.keys(h);
          g = u ? v.sort(u) : v
        }
        for (var y = 0; y < g.length; ++y) {
          var b = g[y];
          a && null === h[b] || (m = Array.isArray(h) ? m.concat(t(h[b], o(n, b), o, r, a, s, c, u, l, f, p, d)) : m.concat(t(h[b], n + (l ? "." + b : "[" + b + "]"), o, r, a, s, c, u, l, f, p, d)))
        }
        return m
      };
    e.exports = function(t, e) {
      var n = t,
        i = e || {};
      if (null !== i.encoder && void 0 !== i.encoder && "function" != typeof i.encoder) throw new TypeError("Encoder has to be a function.");
      var a = void 0 === i.delimiter ? s.delimiter : i.delimiter,
        u = "boolean" == typeof i.strictNullHandling ? i.strictNullHandling : s.strictNullHandling,
        l = "boolean" == typeof i.skipNulls ? i.skipNulls : s.skipNulls,
        f = "boolean" == typeof i.encode ? i.encode : s.encode,
        p = "function" == typeof i.encoder ? i.encoder : s.encoder,
        d = "function" == typeof i.sort ? i.sort : null,
        h = void 0 !== i.allowDots && i.allowDots,
        m = "function" == typeof i.serializeDate ? i.serializeDate : s.serializeDate,
        g = "boolean" == typeof i.encodeValuesOnly ? i.encodeValuesOnly : s.encodeValuesOnly;
      if (void 0 === i.format) i.format = o.default;
      else if (!Object.prototype.hasOwnProperty.call(o.formatters, i.format)) throw new TypeError("Unknown format option provided.");
      var v, y, b = o.formatters[i.format];
      "function" == typeof i.filter ? (y = i.filter, n = y("", n)) : Array.isArray(i.filter) && (y = i.filter, v = y);
      var w = [];
      if ("object" != typeof n || null === n) return "";
      var A;
      A = i.arrayFormat in r ? i.arrayFormat : "indices" in i ? i.indices ? "indices" : "repeat" : "indices";
      var k = r[A];
      v || (v = Object.keys(n)), d && v.sort(d);
      for (var x = 0; x < v.length; ++x) {
        var j = v[x];
        l && null === n[j] || (w = w.concat(c(n[j], j, k, u, l, f ? p : null, y, d, h, m, b, g)))
      }
      return w.join(a)
    }
  }, {
    "./formats": 15,
    "./utils": 19
  }],
  19: [function(t, e, n) {
    "use strict";
    var i = Object.prototype.hasOwnProperty,
      o = function() {
        for (var t = [], e = 0; e < 256; ++e) t.push("%" + ((e < 16 ? "0" : "") + e.toString(16)).toUpperCase());
        return t
      }();
    n.arrayToObject = function(t, e) {
      for (var n = e && e.plainObjects ? Object.create(null) : {}, i = 0; i < t.length; ++i) void 0 !== t[i] && (n[i] = t[i]);
      return n
    }, n.merge = function(t, e, o) {
      if (!e) return t;
      if ("object" != typeof e) {
        if (Array.isArray(t)) t.push(e);
        else {
          if ("object" != typeof t) return [t, e];
          (o.plainObjects || o.allowPrototypes || !i.call(Object.prototype, e)) && (t[e] = !0)
        }
        return t
      }
      if ("object" != typeof t) return [t].concat(e);
      var r = t;
      return Array.isArray(t) && !Array.isArray(e) && (r = n.arrayToObject(t, o)), Array.isArray(t) && Array.isArray(e) ? (e.forEach(function(e, r) {
        i.call(t, r) ? t[r] && "object" == typeof t[r] ? t[r] = n.merge(t[r], e, o) : t.push(e) : t[r] = e
      }), t) : Object.keys(e).reduce(function(t, i) {
        var r = e[i];
        return Object.prototype.hasOwnProperty.call(t, i) ? t[i] = n.merge(t[i], r, o) : t[i] = r, t
      }, r)
    }, n.decode = function(t) {
      try {
        return decodeURIComponent(t.replace(/\+/g, " "))
      } catch (e) {
        return t
      }
    }, n.encode = function(t) {
      if (0 === t.length) return t;
      for (var e = "string" == typeof t ? t : String(t), n = "", i = 0; i < e.length; ++i) {
        var r = e.charCodeAt(i);
        45 === r || 46 === r || 95 === r || 126 === r || r >= 48 && r <= 57 || r >= 65 && r <= 90 || r >= 97 && r <= 122 ? n += e.charAt(i) : r < 128 ? n += o[r] : r < 2048 ? n += o[192 | r >> 6] + o[128 | 63 & r] : r < 55296 || r >= 57344 ? n += o[224 | r >> 12] + o[128 | r >> 6 & 63] + o[128 | 63 & r] : (i += 1, r = 65536 + ((1023 & r) << 10 | 1023 & e.charCodeAt(i)), n += o[240 | r >> 18] + o[128 | r >> 12 & 63] + o[128 | r >> 6 & 63] + o[128 | 63 & r])
      }
      return n
    }, n.compact = function(t, e) {
      if ("object" != typeof t || null === t) return t;
      var i = e || [],
        o = i.indexOf(t);
      if (-1 !== o) return i[o];
      if (i.push(t), Array.isArray(t)) {
        for (var r = [], a = 0; a < t.length; ++a) t[a] && "object" == typeof t[a] ? r.push(n.compact(t[a], i)) : void 0 !== t[a] && r.push(t[a]);
        return r
      }
      return Object.keys(t).forEach(function(e) {
        t[e] = n.compact(t[e], i)
      }), t
    }, n.isRegExp = function(t) {
      return "[object RegExp]" === Object.prototype.toString.call(t)
    }, n.isBuffer = function(t) {
      return null !== t && void 0 !== t && !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))
    }
  }, {}],
  20: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function r(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var a = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      s = t("./ComponentManager.es6"),
      c = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(s),
      u = (t("../libs/zepto.js"), t("eventemitter3")),
      l = function(t) {
        function e() {
          i(this, e);
          var t = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
          return c.default.registerComponent(t), t
        }
        return r(e, t), a(e, [{
          key: "cuid",
          get: function() {
            return null
          }
        }, {
          key: "css",
          get: function() {
            return null
          }
        }]), e
      }(u);
    n.default = l
  }, {
    "../libs/zepto.js": 22,
    "./ComponentManager.es6": 21,
    eventemitter3: 3
  }],
  21: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function r(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var a = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      s = t("../libs/zepto.js"),
      c = t("eventemitter3"),
      u = function(t) {
        function e() {
          i(this, e);
          var t = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
          return t._appendCSSMap = {}, t
        }
        return r(e, t), a(e, [{
          key: "_appendCSS",
          value: function(t) {
            this._appendCSSMap[t.cuid] || (this._appendCSSMap[t.cuid] = !0, s("head").append('<style data-cuid="' + t.cuid + '">' + t.css + "</style>"))
          }
        }, {
          key: "registerComponent",
          value: function(t) {
            t.cuid && t.css && this._appendCSS(t)
          }
        }]), e
      }(c);
    n.default = new u
  }, {
    "../libs/zepto.js": 22,
    eventemitter3: 3
  }],
  22: [function(t, e, n) {
    var i = function() {
      function t(t) {
        return null == t ? String(t) : X[K.call(t)] || "object"
      }

      function e(e) {
        return "function" == t(e)
      }

      function n(t) {
        return null != t && t == t.window
      }

      function i(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE
      }

      function o(e) {
        return "object" == t(e)
      }

      function r(t) {
        return o(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
      }

      function a(t) {
        var e = !!t && "length" in t && t.length,
          i = j.type(t);
        return "function" != i && !n(t) && ("array" == i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
      }

      function s(t) {
        return z.call(t, function(t) {
          return null != t
        })
      }

      function c(t) {
        return t.length > 0 ? j.fn.concat.apply([], t) : t
      }

      function u(t) {
        return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
      }

      function l(t) {
        return t in S ? S[t] : S[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
      }

      function f(t, e) {
        return "number" != typeof e || R[u(t)] ? e : e + "px"
      }

      function p(t) {
        var e, n;
        return B[t] || (e = I.createElement(t), I.body.appendChild(e), n = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == n && (n = "block"), B[t] = n), B[t]
      }

      function d(t) {
        return "children" in t ? M.call(t.children) : j.map(t.childNodes, function(t) {
          if (1 == t.nodeType) return t
        })
      }

      function h(t, e) {
        var n, i = t ? t.length : 0;
        for (n = 0; n < i; n++) this[n] = t[n];
        this.length = i, this.selector = e || ""
      }

      function m(t, e, n) {
        for (x in e) n && (r(e[x]) || $(e[x])) ? (r(e[x]) && !r(t[x]) && (t[x] = {}), $(e[x]) && !$(t[x]) && (t[x] = []), m(t[x], e[x], n)) : e[x] !== k && (t[x] = e[x])
      }

      function g(t, e) {
        return null == e ? j(t) : j(t).filter(e)
      }

      function v(t, n, i, o) {
        return e(n) ? n.call(t, i, o) : n
      }

      function y(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n)
      }

      function b(t, e) {
        var n = t.className || "",
          i = n && n.baseVal !== k;
        if (e === k) return i ? n.baseVal : n;
        i ? n.baseVal = e : t.className = e
      }

      function w(t) {
        try {
          return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? j.parseJSON(t) : t) : t
        } catch (e) {
          return t
        }
      }

      function A(t, e) {
        e(t);
        for (var n = 0, i = t.childNodes.length; n < i; n++) A(t.childNodes[n], e)
      }
      var k, x, j, O, C, E, D = [],
        T = D.concat,
        z = D.filter,
        M = D.slice,
        I = window.document,
        B = {},
        S = {},
        R = {
          "column-count": 1,
          columns: 1,
          "font-weight": 1,
          "line-height": 1,
          opacity: 1,
          "z-index": 1,
          zoom: 1
        },
        P = /^\s*<(\w+|!)[^>]*>/,
        L = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        q = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        N = /^(?:body|html)$/i,
        F = /([A-Z])/g,
        U = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        H = ["after", "prepend", "before", "append"],
        Y = I.createElement("table"),
        G = I.createElement("tr"),
        Q = {
          tr: I.createElement("tbody"),
          tbody: Y,
          thead: Y,
          tfoot: Y,
          td: G,
          th: G,
          "*": I.createElement("div")
        },
        J = /complete|loaded|interactive/,
        _ = /^[\w-]*$/,
        X = {},
        K = X.toString,
        Z = {},
        W = I.createElement("div"),
        V = {
          tabindex: "tabIndex",
          readonly: "readOnly",
          for: "htmlFor",
          class: "className",
          maxlength: "maxLength",
          cellspacing: "cellSpacing",
          cellpadding: "cellPadding",
          rowspan: "rowSpan",
          colspan: "colSpan",
          usemap: "useMap",
          frameborder: "frameBorder",
          contenteditable: "contentEditable"
        },
        $ = Array.isArray || function(t) {
          return t instanceof Array
        };
      return Z.matches = function(t, e) {
        if (!e || !t || 1 !== t.nodeType) return !1;
        var n = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
        if (n) return n.call(t, e);
        var i, o = t.parentNode,
          r = !o;
        return r && (o = W).appendChild(t), i = ~Z.qsa(o, e).indexOf(t), r && W.removeChild(t), i
      }, C = function(t) {
        return t.replace(/-+(.)?/g, function(t, e) {
          return e ? e.toUpperCase() : ""
        })
      }, E = function(t) {
        return z.call(t, function(e, n) {
          return t.indexOf(e) == n
        })
      }, Z.fragment = function(t, e, n) {
        var i, o, a;
        return L.test(t) && (i = j(I.createElement(RegExp.$1))), i || (t.replace && (t = t.replace(q, "<$1></$2>")), e === k && (e = P.test(t) && RegExp.$1), e in Q || (e = "*"), a = Q[e], a.innerHTML = "" + t, i = j.each(M.call(a.childNodes), function() {
          a.removeChild(this)
        })), r(n) && (o = j(i), j.each(n, function(t, e) {
          U.indexOf(t) > -1 ? o[t](e) : o.attr(t, e)
        })), i
      }, Z.Z = function(t, e) {
        return new h(t, e)
      }, Z.isZ = function(t) {
        return t instanceof Z.Z
      }, Z.init = function(t, n) {
        var i;
        if (!t) return Z.Z();
        if ("string" == typeof t)
          if (t = t.trim(), "<" == t[0] && P.test(t)) i = Z.fragment(t, RegExp.$1, n), t = null;
          else {
            if (n !== k) return j(n).find(t);
            i = Z.qsa(I, t)
          }
        else {
          if (e(t)) return j(I).ready(t);
          if (Z.isZ(t)) return t;
          if ($(t)) i = s(t);
          else if (o(t)) i = [t], t = null;
          else if (P.test(t)) i = Z.fragment(t.trim(), RegExp.$1, n), t = null;
          else {
            if (n !== k) return j(n).find(t);
            i = Z.qsa(I, t)
          }
        }
        return Z.Z(i, t)
      }, j = function(t, e) {
        return Z.init(t, e)
      }, j.extend = function(t) {
        var e, n = M.call(arguments, 1);
        return "boolean" == typeof t && (e = t, t = n.shift()), n.forEach(function(n) {
          m(t, n, e)
        }), t
      }, Z.qsa = function(t, e) {
        var n, i = "#" == e[0],
          o = !i && "." == e[0],
          r = i || o ? e.slice(1) : e,
          a = _.test(r);
        return t.getElementById && a && i ? (n = t.getElementById(r)) ? [n] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : M.call(a && !i && t.getElementsByClassName ? o ? t.getElementsByClassName(r) : t.getElementsByTagName(e) : t.querySelectorAll(e))
      }, j.contains = I.documentElement.contains ? function(t, e) {
        return t !== e && t.contains(e)
      } : function(t, e) {
        for (; e && (e = e.parentNode);)
          if (e === t) return !0;
        return !1
      }, j.type = t, j.isFunction = e, j.isWindow = n, j.isArray = $, j.isPlainObject = r, j.isEmptyObject = function(t) {
        var e;
        for (e in t) return !1;
        return !0
      }, j.isNumeric = function(t) {
        var e = Number(t),
          n = typeof t;
        return null != t && "boolean" != n && ("string" != n || t.length) && !isNaN(e) && isFinite(e) || !1
      }, j.inArray = function(t, e, n) {
        return D.indexOf.call(e, t, n)
      }, j.camelCase = C, j.trim = function(t) {
        return null == t ? "" : String.prototype.trim.call(t)
      }, j.uuid = 0, j.support = {}, j.expr = {}, j.noop = function() {}, j.map = function(t, e) {
        var n, i, o, r = [];
        if (a(t))
          for (i = 0; i < t.length; i++) null != (n = e(t[i], i)) && r.push(n);
        else
          for (o in t) null != (n = e(t[o], o)) && r.push(n);
        return c(r)
      }, j.each = function(t, e) {
        var n, i;
        if (a(t)) {
          for (n = 0; n < t.length; n++)
            if (!1 === e.call(t[n], n, t[n])) return t
        } else
          for (i in t)
            if (!1 === e.call(t[i], i, t[i])) return t;
        return t
      }, j.grep = function(t, e) {
        return z.call(t, e)
      }, window.JSON && (j.parseJSON = JSON.parse), j.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
        X["[object " + e + "]"] = e.toLowerCase()
      }), j.fn = {
        constructor: Z.Z,
        length: 0,
        forEach: D.forEach,
        reduce: D.reduce,
        push: D.push,
        sort: D.sort,
        splice: D.splice,
        indexOf: D.indexOf,
        concat: function() {
          var t, e, n = [];
          for (t = 0; t < arguments.length; t++) e = arguments[t], n[t] = Z.isZ(e) ? e.toArray() : e;
          return T.apply(Z.isZ(this) ? this.toArray() : this, n)
        },
        map: function(t) {
          return j(j.map(this, function(e, n) {
            return t.call(e, n, e)
          }))
        },
        slice: function() {
          return j(M.apply(this, arguments))
        },
        ready: function(t) {
          return J.test(I.readyState) && I.body ? t(j) : I.addEventListener("DOMContentLoaded", function() {
            t(j)
          }, !1), this
        },
        get: function(t) {
          return t === k ? M.call(this) : this[t >= 0 ? t : t + this.length]
        },
        toArray: function() {
          return this.get()
        },
        size: function() {
          return this.length
        },
        remove: function() {
          return this.each(function() {
            null != this.parentNode && this.parentNode.removeChild(this)
          })
        },
        each: function(t) {
          return D.every.call(this, function(e, n) {
            return !1 !== t.call(e, n, e)
          }), this
        },
        filter: function(t) {
          return e(t) ? this.not(this.not(t)) : j(z.call(this, function(e) {
            return Z.matches(e, t)
          }))
        },
        add: function(t, e) {
          return j(E(this.concat(j(t, e))))
        },
        is: function(t) {
          return this.length > 0 && Z.matches(this[0], t)
        },
        not: function(t) {
          var n = [];
          if (e(t) && t.call !== k) this.each(function(e) {
            t.call(this, e) || n.push(this)
          });
          else {
            var i = "string" == typeof t ? this.filter(t) : a(t) && e(t.item) ? M.call(t) : j(t);
            this.forEach(function(t) {
              i.indexOf(t) < 0 && n.push(t)
            })
          }
          return j(n)
        },
        has: function(t) {
          return this.filter(function() {
            return o(t) ? j.contains(this, t) : j(this).find(t).size()
          })
        },
        eq: function(t) {
          return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
        },
        first: function() {
          var t = this[0];
          return t && !o(t) ? t : j(t)
        },
        last: function() {
          var t = this[this.length - 1];
          return t && !o(t) ? t : j(t)
        },
        find: function(t) {
          var e = this;
          return t ? "object" == typeof t ? j(t).filter(function() {
            var t = this;
            return D.some.call(e, function(e) {
              return j.contains(e, t)
            })
          }) : 1 == this.length ? j(Z.qsa(this[0], t)) : this.map(function() {
            return Z.qsa(this, t)
          }) : j()
        },
        closest: function(t, e) {
          var n = [],
            o = "object" == typeof t && j(t);
          return this.each(function(r, a) {
            for (; a && !(o ? o.indexOf(a) >= 0 : Z.matches(a, t));) a = a !== e && !i(a) && a.parentNode;
            a && n.indexOf(a) < 0 && n.push(a)
          }), j(n)
        },
        parents: function(t) {
          for (var e = [], n = this; n.length > 0;) n = j.map(n, function(t) {
            if ((t = t.parentNode) && !i(t) && e.indexOf(t) < 0) return e.push(t), t
          });
          return g(e, t)
        },
        parent: function(t) {
          return g(E(this.pluck("parentNode")), t)
        },
        children: function(t) {
          return g(this.map(function() {
            return d(this)
          }), t)
        },
        contents: function() {
          return this.map(function() {
            return this.contentDocument || M.call(this.childNodes)
          })
        },
        siblings: function(t) {
          return g(this.map(function(t, e) {
            return z.call(d(e.parentNode), function(t) {
              return t !== e
            })
          }), t)
        },
        empty: function() {
          return this.each(function() {
            this.innerHTML = ""
          })
        },
        pluck: function(t) {
          return j.map(this, function(e) {
            return e[t]
          })
        },
        show: function() {
          return this.each(function() {
            "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = p(this.nodeName))
          })
        },
        replaceWith: function(t) {
          return this.before(t).remove()
        },
        wrap: function(t) {
          var n = e(t);
          if (this[0] && !n) var i = j(t).get(0),
            o = i.parentNode || this.length > 1;
          return this.each(function(e) {
            j(this).wrapAll(n ? t.call(this, e) : o ? i.cloneNode(!0) : i)
          })
        },
        wrapAll: function(t) {
          if (this[0]) {
            j(this[0]).before(t = j(t));
            for (var e;
              (e = t.children()).length;) t = e.first();
            j(t).append(this)
          }
          return this
        },
        wrapInner: function(t) {
          var n = e(t);
          return this.each(function(e) {
            var i = j(this),
              o = i.contents(),
              r = n ? t.call(this, e) : t;
            o.length ? o.wrapAll(r) : i.append(r)
          })
        },
        unwrap: function() {
          return this.parent().each(function() {
            j(this).replaceWith(j(this).children())
          }), this
        },
        clone: function() {
          return this.map(function() {
            return this.cloneNode(!0)
          })
        },
        hide: function() {
          return this.css("display", "none")
        },
        toggle: function(t) {
          return this.each(function() {
            var e = j(this);
            (t === k ? "none" == e.css("display") : t) ? e.show(): e.hide()
          })
        },
        prev: function(t) {
          return j(this.pluck("previousElementSibling")).filter(t || "*")
        },
        next: function(t) {
          return j(this.pluck("nextElementSibling")).filter(t || "*")
        },
        html: function(t) {
          return 0 in arguments ? this.each(function(e) {
            var n = this.innerHTML;
            j(this).empty().append(v(this, t, e, n))
          }) : 0 in this ? this[0].innerHTML : null
        },
        text: function(t) {
          return 0 in arguments ? this.each(function(e) {
            var n = v(this, t, e, this.textContent);
            this.textContent = null == n ? "" : "" + n
          }) : 0 in this ? this.pluck("textContent").join("") : null
        },
        attr: function(t, e) {
          var n;
          return "string" != typeof t || 1 in arguments ? this.each(function(n) {
            if (1 === this.nodeType)
              if (o(t))
                for (x in t) y(this, x, t[x]);
              else y(this, t, v(this, e, n, this.getAttribute(t)))
          }) : 0 in this && 1 == this[0].nodeType && null != (n = this[0].getAttribute(t)) ? n : k
        },
        removeAttr: function(t) {
          return this.each(function() {
            1 === this.nodeType && t.split(" ").forEach(function(t) {
              y(this, t)
            }, this)
          })
        },
        prop: function(t, e) {
          return t = V[t] || t, 1 in arguments ? this.each(function(n) {
            this[t] = v(this, e, n, this[t])
          }) : this[0] && this[0][t]
        },
        removeProp: function(t) {
          return t = V[t] || t, this.each(function() {
            delete this[t]
          })
        },
        data: function(t, e) {
          var n = "data-" + t.replace(F, "-$1").toLowerCase(),
            i = 1 in arguments ? this.attr(n, e) : this.attr(n);
          return null !== i ? w(i) : k
        },
        val: function(t) {
          return 0 in arguments ? (null == t && (t = ""), this.each(function(e) {
            this.value = v(this, t, e, this.value)
          })) : this[0] && (this[0].multiple ? j(this[0]).find("option").filter(function() {
            return this.selected
          }).pluck("value") : this[0].value)
        },
        offset: function(t) {
          if (t) return this.each(function(e) {
            var n = j(this),
              i = v(this, t, e, n.offset()),
              o = n.offsetParent().offset(),
              r = {
                top: i.top - o.top,
                left: i.left - o.left
              };
            "static" == n.css("position") && (r.position = "relative"), n.css(r)
          });
          if (!this.length) return null;
          if (I.documentElement !== this[0] && !j.contains(I.documentElement, this[0])) return {
            top: 0,
            left: 0
          };
          var e = this[0].getBoundingClientRect();
          return {
            left: e.left + window.pageXOffset,
            top: e.top + window.pageYOffset,
            width: Math.round(e.width),
            height: Math.round(e.height)
          }
        },
        css: function(e, n) {
          if (arguments.length < 2) {
            var i = this[0];
            if ("string" == typeof e) {
              if (!i) return;
              return i.style[C(e)] || getComputedStyle(i, "").getPropertyValue(e)
            }
            if ($(e)) {
              if (!i) return;
              var o = {},
                r = getComputedStyle(i, "");
              return j.each(e, function(t, e) {
                o[e] = i.style[C(e)] || r.getPropertyValue(e)
              }), o
            }
          }
          var a = "";
          if ("string" == t(e)) n || 0 === n ? a = u(e) + ":" + f(e, n) : this.each(function() {
            this.style.removeProperty(u(e))
          });
          else
            for (x in e) e[x] || 0 === e[x] ? a += u(x) + ":" + f(x, e[x]) + ";" : this.each(function() {
              this.style.removeProperty(u(x))
            });
          return this.each(function() {
            this.style.cssText += ";" + a
          })
        },
        index: function(t) {
          return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(t) {
          return !!t && D.some.call(this, function(t) {
            return this.test(b(t))
          }, l(t))
        },
        addClass: function(t) {
          return t ? this.each(function(e) {
            if ("className" in this) {
              O = [];
              var n = b(this);
              v(this, t, e, n).split(/\s+/g).forEach(function(t) {
                j(this).hasClass(t) || O.push(t)
              }, this), O.length && b(this, n + (n ? " " : "") + O.join(" "))
            }
          }) : this
        },
        removeClass: function(t) {
          return this.each(function(e) {
            if ("className" in this) {
              if (t === k) return b(this, "");
              O = b(this), v(this, t, e, O).split(/\s+/g).forEach(function(t) {
                O = O.replace(l(t), " ")
              }), b(this, O.trim())
            }
          })
        },
        toggleClass: function(t, e) {
          return t ? this.each(function(n) {
            var i = j(this);
            v(this, t, n, b(this)).split(/\s+/g).forEach(function(t) {
              (e === k ? !i.hasClass(t) : e) ? i.addClass(t): i.removeClass(t)
            })
          }) : this
        },
        scrollTop: function(t) {
          if (this.length) {
            var e = "scrollTop" in this[0];
            return t === k ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
              this.scrollTop = t
            } : function() {
              this.scrollTo(this.scrollX, t)
            })
          }
        },
        scrollLeft: function(t) {
          if (this.length) {
            var e = "scrollLeft" in this[0];
            return t === k ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
              this.scrollLeft = t
            } : function() {
              this.scrollTo(t, this.scrollY)
            })
          }
        },
        position: function() {
          if (this.length) {
            var t = this[0],
              e = this.offsetParent(),
              n = this.offset(),
              i = N.test(e[0].nodeName) ? {
                top: 0,
                left: 0
              } : e.offset();
            return n.top -= parseFloat(j(t).css("margin-top")) || 0, n.left -= parseFloat(j(t).css("margin-left")) || 0, i.top += parseFloat(j(e[0]).css("border-top-width")) || 0, i.left += parseFloat(j(e[0]).css("border-left-width")) || 0, {
              top: n.top - i.top,
              left: n.left - i.left
            }
          }
        },
        offsetParent: function() {
          return this.map(function() {
            for (var t = this.offsetParent || I.body; t && !N.test(t.nodeName) && "static" == j(t).css("position");) t = t.offsetParent;
            return t
          })
        }
      }, j.fn.detach = j.fn.remove, ["width", "height"].forEach(function(t) {
        var e = t.replace(/./, function(t) {
          return t[0].toUpperCase()
        });
        j.fn[t] = function(o) {
          var r, a = this[0];
          return o === k ? n(a) ? a["inner" + e] : i(a) ? a.documentElement["scroll" + e] : (r = this.offset()) && r[t] : this.each(function(e) {
            a = j(this), a.css(t, v(this, o, e, a[t]()))
          })
        }
      }), H.forEach(function(e, n) {
        var i = n % 2;
        j.fn[e] = function() {
          var e, o, r = j.map(arguments, function(n) {
              var i = [];
              return e = t(n), "array" == e ? (n.forEach(function(t) {
                return t.nodeType !== k ? i.push(t) : j.zepto.isZ(t) ? i = i.concat(t.get()) : void(i = i.concat(Z.fragment(t)))
              }), i) : "object" == e || null == n ? n : Z.fragment(n)
            }),
            a = this.length > 1;
          return r.length < 1 ? this : this.each(function(t, e) {
            o = i ? e : e.parentNode, e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null;
            var s = j.contains(I.documentElement, o);
            r.forEach(function(t) {
              if (a) t = t.cloneNode(!0);
              else if (!o) return j(t).remove();
              o.insertBefore(t, e), s && A(t, function(t) {
                if (!(null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src)) {
                  var e = t.ownerDocument ? t.ownerDocument.defaultView : window;
                  e.eval.call(e, t.innerHTML)
                }
              })
            })
          })
        }, j.fn[i ? e + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
          return j(t)[e](this), this
        }
      }), Z.Z.prototype = h.prototype = j.fn, Z.uniq = E, Z.deserializeValue = w, j.zepto = Z, j
    }();
    ! function(t) {
      function e(t) {
        return t._zid || (t._zid = p++)
      }

      function n(t, n, r, a) {
        if (n = i(n), n.ns) var s = o(n.ns);
        return (g[e(t)] || []).filter(function(t) {
          return t && (!n.e || t.e == n.e) && (!n.ns || s.test(t.ns)) && (!r || e(t.fn) === e(r)) && (!a || t.sel == a)
        })
      }

      function i(t) {
        var e = ("" + t).split(".");
        return {
          e: e[0],
          ns: e.slice(1).sort().join(" ")
        }
      }

      function o(t) {
        return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
      }

      function r(t, e) {
        return t.del && !y && t.e in b || !!e
      }

      function a(t) {
        return w[t] || y && b[t] || t
      }

      function s(n, o, s, c, l, p, d) {
        var h = e(n),
          m = g[h] || (g[h] = []);
        o.split(/\s/).forEach(function(e) {
          if ("ready" == e) return t(document).ready(s);
          var o = i(e);
          o.fn = s, o.sel = l, o.e in w && (s = function(e) {
            var n = e.relatedTarget;
            if (!n || n !== this && !t.contains(this, n)) return o.fn.apply(this, arguments)
          }), o.del = p;
          var h = p || s;
          o.proxy = function(t) {
            if (t = u(t), !t.isImmediatePropagationStopped()) {
              t.data = c;
              var e = h.apply(n, t._args == f ? [t] : [t].concat(t._args));
              return !1 === e && (t.preventDefault(), t.stopPropagation()), e
            }
          }, o.i = m.length, m.push(o), "addEventListener" in n && n.addEventListener(a(o.e), o.proxy, r(o, d))
        })
      }

      function c(t, i, o, s, c) {
        var u = e(t);
        (i || "").split(/\s/).forEach(function(e) {
          n(t, e, o, s).forEach(function(e) {
            delete g[u][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, r(e, c))
          })
        })
      }

      function u(e, n) {
        return !n && e.isDefaultPrevented || (n || (n = e), t.each(j, function(t, i) {
          var o = n[t];
          e[t] = function() {
            return this[i] = A, o && o.apply(n, arguments)
          }, e[i] = k
        }), e.timeStamp || (e.timeStamp = Date.now()), (n.defaultPrevented !== f ? n.defaultPrevented : "returnValue" in n ? !1 === n.returnValue : n.getPreventDefault && n.getPreventDefault()) && (e.isDefaultPrevented = A)), e
      }

      function l(t) {
        var e, n = {
          originalEvent: t
        };
        for (e in t) x.test(e) || t[e] === f || (n[e] = t[e]);
        return u(n, t)
      }
      var f, p = 1,
        d = Array.prototype.slice,
        h = t.isFunction,
        m = function(t) {
          return "string" == typeof t
        },
        g = {},
        v = {},
        y = "onfocusin" in window,
        b = {
          focus: "focusin",
          blur: "focusout"
        },
        w = {
          mouseenter: "mouseover",
          mouseleave: "mouseout"
        };
      v.click = v.mousedown = v.mouseup = v.mousemove = "MouseEvents", t.event = {
        add: s,
        remove: c
      }, t.proxy = function(n, i) {
        var o = 2 in arguments && d.call(arguments, 2);
        if (h(n)) {
          var r = function() {
            return n.apply(i, o ? o.concat(d.call(arguments)) : arguments)
          };
          return r._zid = e(n), r
        }
        if (m(i)) return o ? (o.unshift(n[i], n), t.proxy.apply(null, o)) : t.proxy(n[i], n);
        throw new TypeError("expected function")
      }, t.fn.bind = function(t, e, n) {
        return this.on(t, e, n)
      }, t.fn.unbind = function(t, e) {
        return this.off(t, e)
      }, t.fn.one = function(t, e, n, i) {
        return this.on(t, e, n, i, 1)
      };
      var A = function() {
          return !0
        },
        k = function() {
          return !1
        },
        x = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
        j = {
          preventDefault: "isDefaultPrevented",
          stopImmediatePropagation: "isImmediatePropagationStopped",
          stopPropagation: "isPropagationStopped"
        };
      t.fn.delegate = function(t, e, n) {
        return this.on(e, t, n)
      }, t.fn.undelegate = function(t, e, n) {
        return this.off(e, t, n)
      }, t.fn.live = function(e, n) {
        return t(document.body).delegate(this.selector, e, n), this
      }, t.fn.die = function(e, n) {
        return t(document.body).undelegate(this.selector, e, n), this
      }, t.fn.on = function(e, n, i, o, r) {
        var a, u, p = this;
        return e && !m(e) ? (t.each(e, function(t, e) {
          p.on(t, n, i, e, r)
        }), p) : (m(n) || h(o) || !1 === o || (o = i, i = n, n = f), o !== f && !1 !== i || (o = i, i = f), !1 === o && (o = k), p.each(function(f, p) {
          r && (a = function(t) {
            return c(p, t.type, o), o.apply(this, arguments)
          }), n && (u = function(e) {
            var i, r = t(e.target).closest(n, p).get(0);
            if (r && r !== p) return i = t.extend(l(e), {
              currentTarget: r,
              liveFired: p
            }), (a || o).apply(r, [i].concat(d.call(arguments, 1)))
          }), s(p, e, o, i, n, u || a)
        }))
      }, t.fn.off = function(e, n, i) {
        var o = this;
        return e && !m(e) ? (t.each(e, function(t, e) {
          o.off(t, n, e)
        }), o) : (m(n) || h(i) || !1 === i || (i = n, n = f), !1 === i && (i = k), o.each(function() {
          c(this, e, i, n)
        }))
      }, t.fn.trigger = function(e, n) {
        return e = m(e) || t.isPlainObject(e) ? t.Event(e) : u(e), e._args = n, this.each(function() {
          e.type in b && "function" == typeof this[e.type] ? this[e.type]() : "dispatchEvent" in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n)
        })
      }, t.fn.triggerHandler = function(e, i) {
        var o, r;
        return this.each(function(a, s) {
          o = l(m(e) ? t.Event(e) : e), o._args = i, o.target = s, t.each(n(s, e.type || e), function(t, e) {
            if (r = e.proxy(o), o.isImmediatePropagationStopped()) return !1
          })
        }), r
      }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
        t.fn[e] = function(t) {
          return 0 in arguments ? this.bind(e, t) : this.trigger(e)
        }
      }), t.Event = function(t, e) {
        m(t) || (e = t, t = e.type);
        var n = document.createEvent(v[t] || "Events"),
          i = !0;
        if (e)
          for (var o in e) "bubbles" == o ? i = !!e[o] : n[o] = e[o];
        return n.initEvent(t, i, !0), u(n)
      }
    }(i),
    function(t) {
      function e(e, n, i) {
        var o = t.Event(n);
        return t(e).trigger(o, i), !o.isDefaultPrevented()
      }

      function n(t, n, i, o) {
        if (t.global) return e(n || b, i, o)
      }

      function i(e) {
        e.global && 0 == t.active++ && n(e, null, "ajaxStart")
      }

      function o(e) {
        e.global && !--t.active && n(e, null, "ajaxStop")
      }

      function r(t, e) {
        var i = e.context;
        if (!1 === e.beforeSend.call(i, t, e) || !1 === n(e, i, "ajaxBeforeSend", [t, e])) return !1;
        n(e, i, "ajaxSend", [t, e])
      }

      function a(t, e, i, o) {
        var r = i.context;
        i.success.call(r, t, "success", e), o && o.resolveWith(r, [t, "success", e]), n(i, r, "ajaxSuccess", [e, i, t]), c("success", e, i)
      }

      function s(t, e, i, o, r) {
        var a = o.context;
        o.error.call(a, i, e, t), r && r.rejectWith(a, [i, e, t]), n(o, a, "ajaxError", [i, o, t || e]), c(e, i, o)
      }

      function c(t, e, i) {
        var r = i.context;
        i.complete.call(r, e, t), n(i, r, "ajaxComplete", [e, i]), o(i)
      }

      function u(t, e, n) {
        if (n.dataFilter == l) return t;
        var i = n.context;
        return n.dataFilter.call(i, t, e)
      }

      function l() {}

      function f(t) {
        return t && (t = t.split(";", 2)[0]), t && (t == j ? "html" : t == x ? "json" : A.test(t) ? "script" : k.test(t) && "xml") || "text"
      }

      function p(t, e) {
        return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
      }

      function d(e) {
        e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)), !e.data || e.type && "GET" != e.type.toUpperCase() && "jsonp" != e.dataType || (e.url = p(e.url, e.data), e.data = void 0)
      }

      function h(e, n, i, o) {
        return t.isFunction(n) && (o = i, i = n, n = void 0), t.isFunction(i) || (o = i, i = void 0), {
          url: e,
          data: n,
          success: i,
          dataType: o
        }
      }

      function m(e, n, i, o) {
        var r, a = t.isArray(n),
          s = t.isPlainObject(n);
        t.each(n, function(n, c) {
          r = t.type(c), o && (n = i ? o : o + "[" + (s || "object" == r || "array" == r ? n : "") + "]"), !o && a ? e.add(c.name, c.value) : "array" == r || !i && "object" == r ? m(e, c, i, n) : e.add(n, c)
        })
      }
      var g, v, y = +new Date,
        b = window.document,
        w = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        A = /^(?:text|application)\/javascript/i,
        k = /^(?:text|application)\/xml/i,
        x = "application/json",
        j = "text/html",
        O = /^\s*$/,
        C = b.createElement("a");
      C.href = window.location.href, t.active = 0, t.ajaxJSONP = function(e, n) {
        if (!("type" in e)) return t.ajax(e);
        var i, o, c = e.jsonpCallback,
          u = (t.isFunction(c) ? c() : c) || "Zepto" + y++,
          l = b.createElement("script"),
          f = window[u],
          p = function(e) {
            t(l).triggerHandler("error", e || "abort")
          },
          d = {
            abort: p
          };
        return n && n.promise(d), t(l).on("load error", function(r, c) {
          clearTimeout(o), t(l).off().remove(), "error" != r.type && i ? a(i[0], d, e, n) : s(null, c || "error", d, e, n), window[u] = f, i && t.isFunction(f) && f(i[0]), f = i = void 0
        }), !1 === r(d, e) ? (p("abort"), d) : (window[u] = function() {
          i = arguments
        }, l.src = e.url.replace(/\?(.+)=\?/, "?$1=" + u), b.head.appendChild(l), e.timeout > 0 && (o = setTimeout(function() {
          p("timeout")
        }, e.timeout)), d)
      }, t.ajaxSettings = {
        type: "GET",
        beforeSend: l,
        success: l,
        error: l,
        complete: l,
        context: null,
        global: !0,
        xhr: function() {
          return new window.XMLHttpRequest
        },
        accepts: {
          script: "text/javascript, application/javascript, application/x-javascript",
          json: x,
          xml: "application/xml, text/xml",
          html: j,
          text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0,
        dataFilter: l
      }, t.ajax = function(e) {
        var n, o, c = t.extend({}, e || {}),
          h = t.Deferred && t.Deferred();
        for (g in t.ajaxSettings) void 0 === c[g] && (c[g] = t.ajaxSettings[g]);
        i(c), c.crossDomain || (n = b.createElement("a"), n.href = c.url, n.href = n.href, c.crossDomain = C.protocol + "//" + C.host != n.protocol + "//" + n.host), c.url || (c.url = window.location.toString()), (o = c.url.indexOf("#")) > -1 && (c.url = c.url.slice(0, o)), d(c);
        var m = c.dataType,
          y = /\?.+=\?/.test(c.url);
        if (y && (m = "jsonp"), !1 !== c.cache && (e && !0 === e.cache || "script" != m && "jsonp" != m) || (c.url = p(c.url, "_=" + Date.now())), "jsonp" == m) return y || (c.url = p(c.url, c.jsonp ? c.jsonp + "=?" : !1 === c.jsonp ? "" : "callback=?")), t.ajaxJSONP(c, h);
        var w, A = c.accepts[m],
          k = {},
          x = function(t, e) {
            k[t.toLowerCase()] = [t, e]
          },
          j = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : window.location.protocol,
          E = c.xhr(),
          D = E.setRequestHeader;
        if (h && h.promise(E), c.crossDomain || x("X-Requested-With", "XMLHttpRequest"), x("Accept", A || "*/*"), (A = c.mimeType || A) && (A.indexOf(",") > -1 && (A = A.split(",", 2)[0]), E.overrideMimeType && E.overrideMimeType(A)), (c.contentType || !1 !== c.contentType && c.data && "GET" != c.type.toUpperCase()) && x("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers)
          for (v in c.headers) x(v, c.headers[v]);
        if (E.setRequestHeader = x, E.onreadystatechange = function() {
            if (4 == E.readyState) {
              E.onreadystatechange = l, clearTimeout(w);
              var e, n = !1;
              if (E.status >= 200 && E.status < 300 || 304 == E.status || 0 == E.status && "file:" == j) {
                if (m = m || f(c.mimeType || E.getResponseHeader("content-type")), "arraybuffer" == E.responseType || "blob" == E.responseType) e = E.response;
                else {
                  e = E.responseText;
                  try {
                    e = u(e, m, c), "script" == m ? (0, eval)(e) : "xml" == m ? e = E.responseXML : "json" == m && (e = O.test(e) ? null : t.parseJSON(e))
                  } catch (t) {
                    n = t
                  }
                  if (n) return s(n, "parsererror", E, c, h)
                }
                a(e, E, c, h)
              } else s(E.statusText || null, E.status ? "error" : "abort", E, c, h)
            }
          }, !1 === r(E, c)) return E.abort(), s(null, "abort", E, c, h), E;
        var T = !("async" in c) || c.async;
        if (E.open(c.type, c.url, T, c.username, c.password), c.xhrFields)
          for (v in c.xhrFields) E[v] = c.xhrFields[v];
        for (v in k) D.apply(E, k[v]);
        return c.timeout > 0 && (w = setTimeout(function() {
          E.onreadystatechange = l, E.abort(), s(null, "timeout", E, c, h)
        }, c.timeout)), E.send(c.data ? c.data : null), E
      }, t.get = function() {
        return t.ajax(h.apply(null, arguments))
      }, t.post = function() {
        var e = h.apply(null, arguments);
        return e.type = "POST", t.ajax(e)
      }, t.getJSON = function() {
        var e = h.apply(null, arguments);
        return e.dataType = "json", t.ajax(e)
      }, t.fn.load = function(e, n, i) {
        if (!this.length) return this;
        var o, r = this,
          a = e.split(/\s/),
          s = h(e, n, i),
          c = s.success;
        return a.length > 1 && (s.url = a[0], o = a[1]), s.success = function(e) {
          r.html(o ? t("<div>").html(e.replace(w, "")).find(o) : e), c && c.apply(r, arguments)
        }, t.ajax(s), this
      };
      var E = encodeURIComponent;
      t.param = function(e, n) {
        var i = [];
        return i.add = function(e, n) {
          t.isFunction(n) && (n = n()), null == n && (n = ""), this.push(E(e) + "=" + E(n))
        }, m(i, e, n), i.join("&").replace(/%20/g, "+")
      }
    }(i),
    function(t) {
      t.fn.serializeArray = function() {
        var e, n, i = [],
          o = function(t) {
            if (t.forEach) return t.forEach(o);
            i.push({
              name: e,
              value: t
            })
          };
        return this[0] && t.each(this[0].elements, function(i, r) {
          n = r.type, e = r.name, e && "fieldset" != r.nodeName.toLowerCase() && !r.disabled && "submit" != n && "reset" != n && "button" != n && "file" != n && ("radio" != n && "checkbox" != n || r.checked) && o(t(r).val())
        }), i
      }, t.fn.serialize = function() {
        var t = [];
        return this.serializeArray().forEach(function(e) {
          t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
        }), t.join("&")
      }, t.fn.submit = function(e) {
        if (0 in arguments) this.bind("submit", e);
        else if (this.length) {
          var n = t.Event("submit");
          this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit()
        }
        return this
      }
    }(i),
    function() {
      try {
        getComputedStyle(void 0)
      } catch (e) {
        var t = getComputedStyle;
        window.getComputedStyle = function(e, n) {
          try {
            return t(e, n)
          } catch (t) {
            return null
          }
        }
      }
    }(),
    function(t) {
      function e(n) {
        var i = [
            ["resolve", "done", t.Callbacks({
              once: 1,
              memory: 1
            }), "resolved"],
            ["reject", "fail", t.Callbacks({
              once: 1,
              memory: 1
            }), "rejected"],
            ["notify", "progress", t.Callbacks({
              memory: 1
            })]
          ],
          o = "pending",
          r = {
            state: function() {
              return o
            },
            always: function() {
              return a.done(arguments).fail(arguments), this
            },
            then: function() {
              var n = arguments;
              return e(function(e) {
                t.each(i, function(i, o) {
                  var s = t.isFunction(n[i]) && n[i];
                  a[o[1]](function() {
                    var n = s && s.apply(this, arguments);
                    if (n && t.isFunction(n.promise)) n.promise().done(e.resolve).fail(e.reject).progress(e.notify);
                    else {
                      var i = this === r ? e.promise() : this,
                        a = s ? [n] : arguments;
                      e[o[0] + "With"](i, a)
                    }
                  })
                }), n = null
              }).promise()
            },
            promise: function(e) {
              return null != e ? t.extend(e, r) : r
            }
          },
          a = {};
        return t.each(i, function(t, e) {
          var n = e[2],
            s = e[3];
          r[e[1]] = n.add, s && n.add(function() {
            o = s
          }, i[1 ^ t][2].disable, i[2][2].lock), a[e[0]] = function() {
            return a[e[0] + "With"](this === a ? r : this, arguments), this
          }, a[e[0] + "With"] = n.fireWith
        }), r.promise(a), n && n.call(a, a), a
      }
      var n = Array.prototype.slice;
      t.when = function(i) {
        var o, r, a, s = n.call(arguments),
          c = s.length,
          u = 0,
          l = 1 !== c || i && t.isFunction(i.promise) ? c : 0,
          f = 1 === l ? i : e(),
          p = function(t, e, i) {
            return function(r) {
              e[t] = this, i[t] = arguments.length > 1 ? n.call(arguments) : r, i === o ? f.notifyWith(e, i) : --l || f.resolveWith(e, i)
            }
          };
        if (c > 1)
          for (o = new Array(c), r = new Array(c), a = new Array(c); u < c; ++u) s[u] && t.isFunction(s[u].promise) ? s[u].promise().done(p(u, a, s)).fail(f.reject).progress(p(u, r, o)) : --l;
        return l || f.resolveWith(a, s), f.promise()
      }, t.Deferred = e
    }(i),
    function(t) {
      t.Callbacks = function(e) {
        e = t.extend({}, e);
        var n, i, o, r, a, s, c = [],
          u = !e.once && [],
          l = function(t) {
            for (n = e.memory && t, i = !0, s = r || 0, r = 0, a = c.length, o = !0; c && s < a; ++s)
              if (!1 === c[s].apply(t[0], t[1]) && e.stopOnFalse) {
                n = !1;
                break
              }
            o = !1, c && (u ? u.length && l(u.shift()) : n ? c.length = 0 : f.disable())
          },
          f = {
            add: function() {
              if (c) {
                var i = c.length,
                  s = function(n) {
                    t.each(n, function(t, n) {
                      "function" == typeof n ? e.unique && f.has(n) || c.push(n) : n && n.length && "string" != typeof n && s(n)
                    })
                  };
                s(arguments), o ? a = c.length : n && (r = i, l(n))
              }
              return this
            },
            remove: function() {
              return c && t.each(arguments, function(e, n) {
                for (var i;
                  (i = t.inArray(n, c, i)) > -1;) c.splice(i, 1), o && (i <= a && --a, i <= s && --s)
              }), this
            },
            has: function(e) {
              return !(!c || !(e ? t.inArray(e, c) > -1 : c.length))
            },
            empty: function() {
              return a = c.length = 0, this
            },
            disable: function() {
              return c = u = n = void 0, this
            },
            disabled: function() {
              return !c
            },
            lock: function() {
              return u = void 0, n || f.disable(), this
            },
            locked: function() {
              return !u
            },
            fireWith: function(t, e) {
              return !c || i && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], o ? u.push(e) : l(e)), this
            },
            fire: function() {
              return f.fireWith(this, arguments)
            },
            fired: function() {
              return !!i
            }
          };
        return f
      }
    }(i),
    function(t) {
      function e(t, e, n, i) {
        return Math.abs(t - e) >= Math.abs(n - i) ? t - e > 0 ? "Left" : "Right" : n - i > 0 ? "Up" : "Down"
      }

      function n() {
        l = null, p.last && (p.el.trigger("longTap"), p = {})
      }

      function i() {
        l && clearTimeout(l), l = null
      }

      function o() {
        s && clearTimeout(s), c && clearTimeout(c), u && clearTimeout(u), l && clearTimeout(l), s = c = u = l = null, p = {}
      }

      function r(t) {
        return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
      }

      function a(t, e) {
        return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
      }
      var s, c, u, l, f, p = {};
      t(document).ready(function() {
        var d, h, m, g, v = 0,
          y = 0;
        "MSGesture" in window && (f = new MSGesture, f.target = document.body), t(document).bind("MSGestureEnd", function(t) {
          var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
          e && (p.el.trigger("swipe"), p.el.trigger("swipe" + e))
        }).on("touchstart MSPointerDown pointerdown", function(e) {
          (g = a(e, "down")) && !r(e) || (m = g ? e : e.touches[0], e.touches && 1 === e.touches.length && p.x2 && (p.x2 = void 0, p.y2 = void 0), d = Date.now(), h = d - (p.last || d), p.el = t("tagName" in m.target ? m.target : m.target.parentNode), s && clearTimeout(s), p.x1 = m.pageX, p.y1 = m.pageY, h > 0 && h <= 250 && (p.isDoubleTap = !0), p.last = d, l = setTimeout(n, 750), f && g && f.addPointer(e.pointerId))
        }).on("touchmove MSPointerMove pointermove", function(t) {
          (g = a(t, "move")) && !r(t) || (m = g ? t : t.touches[0], i(), p.x2 = m.pageX, p.y2 = m.pageY, v += Math.abs(p.x1 - p.x2), y += Math.abs(p.y1 - p.y2))
        }).on("touchend MSPointerUp pointerup", function(n) {
          (g = a(n, "up")) && !r(n) || (i(), p.x2 && Math.abs(p.x1 - p.x2) > 30 || p.y2 && Math.abs(p.y1 - p.y2) > 30 ? u = setTimeout(function() {
            p.el && (p.el.trigger("swipe"), p.el.trigger("swipe" + e(p.x1, p.x2, p.y1, p.y2))), p = {}
          }, 0) : "last" in p && (v < 30 && y < 30 ? c = setTimeout(function() {
            var e = t.Event("tap");
            e.cancelTouch = o, p.el && p.el.trigger(e), p.isDoubleTap ? (p.el && p.el.trigger("doubleTap"), p = {}) : s = setTimeout(function() {
              s = null, p.el && p.el.trigger("singleTap"), p = {}
            }, 250)
          }, 0) : p = {}), v = y = 0)
        }).on("touchcancel MSPointerCancel pointercancel", o), t(window).on("scroll", o)
      }), ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
        t.fn[e] = function(t) {
          return this.on(e, t)
        }
      })
    }(i),
    function(t, e) {
      function n(t) {
        return t.replace(/([A-Z])/g, "-$1").toLowerCase()
      }

      function i(t) {
        return o ? o + t : t.toLowerCase()
      }
      var o, r, a, s, c, u, l, f, p, d, h = "",
        m = {
          Webkit: "webkit",
          Moz: "",
          O: "o"
        },
        g = document.createElement("div"),
        v = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        y = {};
      void 0 === g.style.transform && t.each(m, function(t, e) {
        if (void 0 !== g.style[t + "TransitionProperty"]) return h = "-" + t.toLowerCase() + "-", o = e, !1
      }), r = h + "transform", y[a = h + "transition-property"] = y[s = h + "transition-duration"] = y[u = h + "transition-delay"] = y[c = h + "transition-timing-function"] = y[l = h + "animation-name"] = y[f = h + "animation-duration"] = y[d = h + "animation-delay"] = y[p = h + "animation-timing-function"] = "", t.fx = {
        off: void 0 === o && void 0 === g.style.transitionProperty,
        speeds: {
          _default: 400,
          fast: 200,
          slow: 600
        },
        cssPrefix: h,
        transitionEnd: i("TransitionEnd"),
        animationEnd: i("AnimationEnd")
      }, t.fn.animate = function(e, n, i, o, r) {
        return t.isFunction(n) && (o = n, i = void 0, n = void 0), t.isFunction(i) && (o = i, i = void 0), t.isPlainObject(n) && (i = n.easing, o = n.complete, r = n.delay, n = n.duration), n && (n = ("number" == typeof n ? n : t.fx.speeds[n] || t.fx.speeds._default) / 1e3), r && (r = parseFloat(r) / 1e3), this.anim(e, n, i, o, r)
      }, t.fn.anim = function(e, i, o, h, m) {
        var g, b, w, A = {},
          k = "",
          x = this,
          j = t.fx.transitionEnd,
          O = !1;
        if (void 0 === i && (i = t.fx.speeds._default / 1e3), void 0 === m && (m = 0), t.fx.off && (i = 0), "string" == typeof e) A[l] = e, A[f] = i + "s", A[d] = m + "s", A[p] = o || "linear", j = t.fx.animationEnd;
        else {
          b = [];
          for (g in e) v.test(g) ? k += g + "(" + e[g] + ") " : (A[g] = e[g], b.push(n(g)));
          k && (A[r] = k, b.push(r)), i > 0 && "object" == typeof e && (A[a] = b.join(", "), A[s] = i + "s", A[u] = m + "s", A[c] = o || "linear")
        }
        return w = function(e) {
          if (void 0 !== e) {
            if (e.target !== e.currentTarget) return;
            t(e.target).unbind(j, w)
          } else t(this).unbind(j, w);
          O = !0, t(this).css(y), h && h.call(this)
        }, i > 0 && (this.bind(j, w), setTimeout(function() {
          O || w.call(x)
        }, 1e3 * (i + m) + 25)), this.size() && this.get(0).clientLeft, this.css(A), i <= 0 && setTimeout(function() {
          x.each(function() {
            w.call(this)
          })
        }, 0), this
      }, g = null
    }(i),
    function(t, e) {
      function n(n, i, o, r, a) {
        "function" != typeof i || a || (a = i, i = e);
        var s = {
          opacity: o
        };
        return r && (s.scale = r, n.css(t.fx.cssPrefix + "transform-origin", "0 0")), n.animate(s, i, null, a)
      }

      function i(e, i, o, r) {
        return n(e, i, 0, o, function() {
          a.call(t(this)), r && r.call(this)
        })
      }
      var o = window.document,
        r = (o.documentElement, t.fn.show),
        a = t.fn.hide,
        s = t.fn.toggle;
      t.fn.show = function(t, i) {
        return r.call(this), t === e ? t = 0 : this.css("opacity", 0), n(this, t, 1, "1,1", i)
      }, t.fn.hide = function(t, n) {
        return t === e ? a.call(this) : i(this, t, "0,0", n)
      }, t.fn.toggle = function(n, i) {
        return n === e || "boolean" == typeof n ? s.call(this, n) : this.each(function() {
          var e = t(this);
          e["none" == e.css("display") ? "show" : "hide"](n, i)
        })
      }, t.fn.fadeTo = function(t, e, i) {
        return n(this, t, e, null, i)
      }, t.fn.fadeIn = function(t, e) {
        var n = this.css("opacity");
        return n > 0 ? this.css("opacity", 0) : n = 1, r.call(this).fadeTo(t, n, e)
      }, t.fn.fadeOut = function(t, e) {
        return i(this, t, null, e)
      }, t.fn.fadeToggle = function(e, n) {
        return this.each(function() {
          var i = t(this);
          i[0 == i.css("opacity") || "none" == i.css("display") ? "fadeIn" : "fadeOut"](e, n)
        })
      }
    }(i), e.exports = i
  }, {}],
  23: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function r(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function s() {
      y.default.qs("dev");
      return "//url-server.1sapp.com"
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.BUCKET_TYPE = void 0;
    var c = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      u = t("../../common/qukan/UpStatHelper.es6"),
      l = i(u),
      f = t("./api/APIAjaxConfig.es6"),
      p = i(f),
      d = t("./api/APIAjax.es6"),
      h = i(d),
      m = t("./getToken.es6"),
      g = i(m),
      v = t("./Env.es6"),
      y = i(v),
      b = function(t) {
        function e(t) {
          return o(this, e), r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t))
        }
        return a(e, t), c(e, [{
          key: "newURL3",
          value: function(t, e, n, i) {
            return this._ajax("api/url/new_url3", {
              memberId: t,
              bucketType: e,
              purpose: n,
              data: i
            }, "post")
          }
        }]), e
      }(h.default),
      w = (n.BUCKET_TYPE = {
        PYQ: "qukan_pyq",
        WX: "qukan_wx",
        QRCODE: "qukan_qrcode",
        QQ: "qukan_qq",
        ARTICLE: "qukan_article",
        SHARE_INCOME: "qukan_share_income",
        IDEA: "qukan_idea"
      }, function() {
        function t() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : g.default;
          o(this, t);
          var n = new p.default(s() + "/", "", e());
          this._api = new b(n)
        }
        return c(t, [{
          key: "_getInviteCode",
          value: function(t) {
            return "A" + t
          }
        }, {
          key: "getDomainByBucket",
          value: function(e) {
            var n = e.memberId,
              i = e.bucketType,
              o = e.purpose,
              r = e.awardTrace,
              a = e.source,
              s = e.pdtu,
              c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            r = r || {};
            var u = l.default.getPdtuPrefix(s),
              f = this._getInviteCode(n),
              p = {
                source: a,
                id: f,
                ip: r.ip,
                wk: r.wk,
                sk: r.sk,
                bucket: "",
                domain: "",
                domainGroup: "",
                purpose: o,
                pdtu: s,
                policy: u,
                extendInfo: c
              };
            return this._api.newURL3(n, i, o, JSON.stringify(p)).then(function(e) {
              var i = e.code,
                r = e.data,
                f = e.message;
              if (0 !== i) throw new Error(f || "返回未知错误");
              var p = r.hitBucket,
                d = r.urlData;
              return l.default.upDataStat({
                cmd: 9045,
                item: 104,
                source: a,
                action: "share",
                domain: d.domain,
                domainGroup: p.domainGroup,
                memberId: n,
                bucket: p.ruleBucket,
                purpose: o,
                pdtu: s,
                policy: u,
                extendInfo: JSON.stringify(c, null)
              }), {
                url: t._genUrlProtocol(r.fullUrl),
                orgUrl: d.domain,
                hitBucket: p
              }
            })
          }
        }], [{
          key: "_genUrlProtocol",
          value: function(t) {
            var e = !1,
              n = ["789hao.cn", "ihailong.com.cn", "uyijia.cn", "xdny.net.cn", "szssxad.cn", "fe6.com.cn", "goodtimewine.cn", "nbhcfl.cn", "gcbattery.cn", "meidajsq.net.cn"];
            if (/^http[s]?/.test(t)) return t;
            for (var i = 0; i < n.length; i++) {
              var o = n[i];
              if (-1 !== t.indexOf(o)) {
                e = !0;
                break
              }
            }
            return e ? "https://" + t : "http://" + t
          }
        }]), t
      }());
    n.default = w
  }, {
    "../../common/qukan/UpStatHelper.es6": 31,
    "./Env.es6": 26,
    "./api/APIAjax.es6": 33,
    "./api/APIAjaxConfig.es6": 34,
    "./getToken.es6": 35
  }],
  24: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      r = t("./Env.es6"),
      a = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(r),
      s = t("q"),
      c = 0,
      u = {};
    window._callapp_callback = u;
    var l = function() {
      function t() {
        i(this, t)
      }
      return o(t, [{
        key: "_call",
        value: function(t, e, n, i) {
          var o = s.defer(),
            r = "_call" + c++;
          u[r] = function(t) {
            delete u[r], o.resolve(t)
          };
          var l = t + "?target=" + e + (n ? "&value=" + encodeURIComponent(n) : "") + (i ? "&desc=" + encodeURIComponent(i) : "") + "&callback=_callapp_callback." + r;
          return console.log(l), a.default.inApp() && (location.href = l), o.promise
        }
      }, {
        key: "attention",
        value: function(t) {
          return this._call("call", "attention", t)
        }
      }, {
        key: "pay",
        value: function(t) {
          return this._call("call", "pay", t)
        }
      }, {
        key: "getEnv",
        value: function() {
          return this._call("call", "getEnv")
        }
      }, {
        key: "scanner",
        value: function() {
          return this._call("call", "scanner")
        }
      }, {
        key: "isTFInstall",
        value: function() {
          return this._call("call", "isTFInstall")
        }
      }, {
        key: "gift",
        value: function(t, e) {
          return this._call("call", "gift", t, e)
        }
      }, {
        key: "like",
        value: function() {
          return this._call("call", "like")
        }
      }, {
        key: "viewBack",
        value: function() {
          location.href = "ts?target=back"
        }
      }, {
        key: "openViewIsSupported",
        value: function() {
          var t = a.default.getVersion();
          return !(a.default.isios() && t >= 20306 && t < 20602) && (a.default.inApp() && t > 20301)
        }
      }, {
        key: "openView",
        value: function(t) {
          if (t = t.replace(/(^\s*)|(\s*$)/g, ""), this.openViewIsSupported()) {
            0 === t.indexOf("//") && (t = location.protocol + t);
            var e = t.split("#"); - 1 === e[0].indexOf("?") ? e[0] += "?openview=1" : e[0] += "&openview=1", t = e[0], a.default.isAndroid() && e[1] && (t = e[0] + "#" + e[1]), location.href = (a.default.isAndroid() ? "goto" : "tools") + "?target=openview&value=" + encodeURIComponent(t)
          } else location.href = t
        }
      }, {
        key: "login",
        value: function() {
          return this._call("tools", "login")
        }
      }, {
        key: "report",
        value: function() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
            i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
            o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
            r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "",
            s = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : "",
            c = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
            u = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : "";
          if (!a.default.inApp() || a.default.getVersion() < 20505) return !1;
          try {
            var l = {
              cmd: +t,
              action: +e,
              metric: +n,
              status: +i,
              tCmd: +o,
              selectedId: (r || "").toString(),
              channel: (s || "").toString(),
              source: +c,
              extra: u && JSON.stringify(u)
            };
            console.log(JSON.stringify(l)), window.qukanClient && window.qukanClient.report && window.qukanClient.report(JSON.stringify(l))
          } catch (t) {}
        }
      }]), t
    }();
    n.default = l
  }, {
    "./Env.es6": 26,
    q: 14
  }],
  25: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      r = t("./Env.es6"),
      a = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(r),
      s = t("../libs/zepto.js"),
      c = function() {
        function t(e) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 640,
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100,
            r = this,
            a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
            c = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1;
          i(this, t), this._id = e, this._width = n, this._height = o, this._type = a, this._capacity = c, s.post(this._getUrl(), JSON.stringify(this._getSendData())).then(function(t) {
            return r._render(t)
          }, function(t) {
            return r._render()
          })
        }
        return o(t, [{
          key: "_getSendData",
          value: function() {
            return {
              media: {
                type: 2,
                site: {
                  domain: location.hostname,
                  urls: "" + location.host + location.pathname,
                  title: s("title").text()
                },
                browser: {
                  user_agent: a.default.UA
                }
              },
              client: {
                type: 3,
                version: "1.1.2"
              },
              device: {
                id_idfa: a.default.isios() ? a.default.qs("dc") : "",
                id_imei: a.default.isios() ? "" : a.default.qs("dc"),
                height: s(window).height(),
                width: s(window).width(),
                brand: "",
                model: "",
                os_version: "",
                os_type: a.default.isios() ? 2 : 1
              },
              adslot: {
                id: this._id,
                type: this._type,
                height: this._height,
                width: this._width,
                capacity: this._capacity
              },
              network: {
                type: this._getNetWork()
              }
            }
          }
        }, {
          key: "_getUrl",
          value: function() {
            return -1 !== location.hostname.toString().indexOf("local") ? "http://devapi.iclicash.com/v3/json" : "//api.iclicash.com/v3/json"
          }
        }, {
          key: "_getNetWork",
          value: function() {
            var t = a.default.qs("netWork");
            if (t) switch (t) {
              case "wifi":
                t = 1;
                break;
              case "2g":
                t = 3;
                break;
              case "3g":
                t = 4;
                break;
              case "4g":
                t = 5
            } else t = 2;
            return t
          }
        }, {
          key: "_showReport",
          value: function(t) {
            t.forEach(function(t) {
              return (new Image).src = t
            })
          }
        }, {
          key: "_clickReport",
          value: function(t, e) {
            ! function(e) {
              function n(t) {
                var e = document.createElement("img");
                e[r]("ahw", "1"), e[r]("src", t), e[r]("style", "display:none;"), o.appendChild(e)
              }

              function i(t) {
                var e = !1;
                t.addEventListener(a ? "touchstart" : "mousedown", function(t) {
                  e = !0
                }), t.addEventListener(a ? "touchmove" : "mousemove", function(t) {
                  e = !1
                }), t.addEventListener(a ? "touchend" : "mouseup", function(t) {
                  if (!e) return !1;
                  e = !1, i.logs && i.logs.length && (i.logs.forEach(n), i.logs = null)
                })
              }
              var o = (document.documentElement, document.body),
                r = "setAttribute",
                a = e.Modernizr && !0 === Modernizr.touch || function() {
                  return !!("ontouchstart" in e || e.DocumentTouch && document instanceof DocumentTouch)
                }();
              e.regClickLog = function(t) {
                i.logs = (i.logs || []).concat(t)
              }, t && i(t)
            }(window), window.regClickLog && window.regClickLog(e)
          }
        }, {
          key: "_reportMsg",
          value: function(t) {
            this._showReport(t.imp), this._clickReport(t.target, t.clk)
          }
        }, {
          key: "_render",
          value: function() {
            return ""
          }
        }]), t
      }();
    n.default = c
  }, {
    "../libs/zepto.js": 22,
    "./Env.es6": 26
  }],
  26: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      r = t("qs"),
      a = function() {
        function t() {
          i(this, t)
        }
        return o(t, null, [{
          key: "os",
          value: function() {
            return t.isios() ? "ios" : "android"
          }
        }, {
          key: "qs",
          value: function(t) {
            return r.parse(location.search.substring(1))[t] || ""
          }
        }, {
          key: "inApp",
          value: function() {
            return -1 != t.UA.toLowerCase().indexOf("qukan")
          }
        }, {
          key: "isios",
          value: function() {
            return -1 != t.UA.toLowerCase().indexOf("iphone")
          }
        }, {
          key: "isIOS",
          value: function() {
            return t.isios()
          }
        }, {
          key: "isAndroid",
          value: function() {
            return -1 != t.UA.toLowerCase().indexOf("android")
          }
        }, {
          key: "getVersion",
          value: function() {
            return parseInt(t.qs("v")) || 0
          }
        }, {
          key: "isWeixinBrowser",
          value: function() {
            return /micromessenger/i.test(navigator.userAgent)
          }
        }, {
          key: "toqs",
          value: function(t) {
            var e = [];
            for (var n in t) e.push(n + "=" + encodeURIComponent(t[n]));
            return e.join("&")
          }
        }, {
          key: "allqs",
          value: function() {
            for (var t = {}, e = location.search.substring(1).split("&"), n = 0, i = e.length; n < i; n++) {
              var o = e[n].split("=");
              o[0] && (t[o[0]] = o[1])
            }
            return t
          }
        }, {
          key: "isOpenView",
          value: function() {
            return !!t.qs("openview")
          }
        }, {
          key: "UA",
          get: function() {
            return navigator.userAgent
          }
        }]), t
      }();
    n.default = a
  }, {
    qs: 16
  }],
  27: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      r = function() {
        function t(e) {
          i(this, t), this._key = e
        }
        return o(t, [{
          key: "get",
          value: function() {
            try {
              return localStorage.getItem(this._key)
            } catch (t) {}
            return null
          }
        }, {
          key: "set",
          value: function(t) {
            try {
              localStorage.setItem(this._key, t)
            } catch (t) {}
          }
        }, {
          key: "getInt",
          value: function() {
            var t = parseInt(this.get());
            return isNaN(t) ? 0 : t
          }
        }]), t
      }();
    n.default = r
  }, {}],
  28: [function(t, e, n) {
    "use strict";

    function i(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : a.default.isIOS() ? s.DEVICE.IOS : s.DEVICE.ANDROID;
      return "string" == typeof t ? s.SHARE_SOURCE[t][e] : "object" === (void 0 === t ? "undefined" : o(t)) ? t[e] : void 0
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
      return typeof t
    } : function(t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    n.getSourceByDevice = i;
    var r = t("./Env.es6"),
      a = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(r),
      s = {
        UP_LOG: {
          URL_SHARE_LOG_CMD: 9045,
          URL_SHARE_LOG_ITEM: 104
        },
        SHARE_PURPOSE: {
          DEFAULT: 0,
          WX: 1,
          FRIENDS: 2,
          QRCODE: 3,
          QQ: 4,
          LITTLE: 5,
          WEIBO: 6,
          VIDEO_TUTORIAL: 7,
          AWAKEN_PUPIL: 8,
          FACE2FACE: 9,
          HTML_OUT_GO_REG: 10,
          GROUP_SEND_HELP: 11,
          SHARE_INCOME: 13,
          IDEA: 14
        },
        SHARE_SOURCE: {
          WX: {
            IOS: 5,
            ANDROID: 1
          },
          QQ: {
            IOS: 6,
            ANDROID: 2
          },
          PYQ: {
            IOS: 7,
            ANDROID: 3
          },
          QQZONE: {
            IOS: 8,
            ANDROID: 4
          },
          MYQR: {
            IOS: 9,
            ANDROID: 10
          },
          WEIBO: {
            IOS: 12,
            ANDROID: 11
          },
          FTF: {
            IOS: 14,
            ANDROID: 13
          },
          ARTICLE: {
            IOS: 16,
            ANDROID: 15
          }
        },
        DEVICE: {
          IOS: "IOS",
          ANDROID: "ANDROID"
        }
      };
    n.default = s
  }, {
    "./Env.es6": 26
  }],
  29: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.SHARE_PURPOSE = void 0;
    var o = t("./ShareEnums.es6"),
      r = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(o),
      a = (n.SHARE_PURPOSE = r.default.SHARE_PURPOSE, function t() {
        i(this, t)
      });
    n.default = a
  }, {
    "./ShareEnums.es6": 28
  }],
  30: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.SHARE_SOURCE = void 0;
    var o = t("./ShareEnums.es6"),
      r = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(o),
      a = (n.SHARE_SOURCE = r.default.SHARE_SOURCE, function t() {
        i(this, t)
      });
    a.getSourceByDevice = o.getSourceByDevice, n.default = a
  }, {
    "./ShareEnums.es6": 28
  }],
  31: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      r = t("./Env.es6"),
      a = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(r),
      s = function() {
        function t() {
          i(this, t)
        }
        return o(t, null, [{
          key: "upDataStat",
          value: function(t) {
            if (!t) throw new Error("上报数据为空");
            var e = [];
            Object.keys(t).forEach(function(n) {
              var i = n.replace(/([A-Z])/g, function(t, e) {
                return "_" + e.toLowerCase()
              });
              e.push(i + "=" + encodeURIComponent(t[n] || ""))
            }), (new Image).src = "//log.1sapp.com/a.gif?" + e.join("&")
          }
        }, {
          key: "genPdtu",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : a.default.qs("source");
            return t + (n ? "[" + n + "]" : "") + ":" + e
          }
        }, {
          key: "getPdtuPrefix",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
              e = /^[^\[:]+/g,
              n = t.match(e),
              i = n ? n[0] : "";
            return console.log(i), i
          }
        }]), t
      }();
    n.default = s
  }, {
    "./Env.es6": 26
  }],
  32: [function(t, e, n) {
    "use strict";

    function i(t, e, n, i) {
      var o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : "",
        r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : "",
        a = ["type=" + t, "api=" + encodeURIComponent(e), "params=" + encodeURIComponent(JSON.stringify(n)), "method=" + ("get" === i ? 1 : 2), "code=" + o, "msg=" + encodeURIComponent(r)]; - 1 === location.host.indexOf("localhost") && ((new Image).src = "//log.1sapp.com/a.gif?cmd=9049&" + a.join("&"))
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t, e) {
      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "get",
        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "json";
      return r.Promise(function(r, c) {
        var u = setTimeout(function() {
          return i(a.TIMEOUT, t, e, n)
        }, 1e4);
        o.ajax({
          dataType: s,
          url: t,
          cache: !1,
          data: e,
          type: n,
          crossDomain: !0,
          success: function(o) {
            r(o), clearTimeout(u), o && -1 !== [-147, -126, -1, 1, 200, 404].indexOf(o.code) && i(a.CODE, t, e, n, o.code, o.message)
          },
          error: function(o, r) {
            c(new Error("Can't XHR " + t)), clearTimeout(u), i(a.HTTP, t, e, n, o.status, r)
          }
        })
      })
    };
    var o = t("../libs/zepto.js"),
      r = t("q"),
      a = {
        HTTP: 1,
        CODE: 2,
        TIMEOUT: 3
      }
  }, {
    "../libs/zepto.js": 22,
    q: 14
  }],
  33: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var r = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      a = t("q"),
      s = (i(a), t("../ajax.es6")),
      c = i(s),
      u = t("../Env.es6"),
      l = i(u),
      f = t("../Local.es6"),
      p = (i(f), t("object.assign")),
      d = function() {
        function t(e) {
          o(this, t), this._apiConfig = e, this._dbv = l.default.qs("dbv") || "0"
        }
        return r(t, [{
          key: "_ajax",
          value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "get",
              i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "json";
            return (0, c.default)("" + this.apiConfig.apiUrl + t, this._mergeData(e), n, i)
          }
        }, {
          key: "_ajaxDoubleBuffering",
          value: function(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "get",
              i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "json";
            return this._ajax(t, e, n, i)
          }
        }, {
          key: "_mergeData",
          value: function(t) {
            return p({
              token: this.apiConfig.token,
              dtu: this.apiConfig.dtu,
              version: l.default.getVersion(),
              os: l.default.os()
            }, t)
          }
        }, {
          key: "_formatDBKey",
          value: function(t, e, n) {
            var i = [];
            for (var o in e) i.push(o + "=" + e[o]);
            return "ajax_double_buffer2:" + n + ":" + this.apiConfig.apiUrl + t + "/{" + i.join("&") + "}"
          }
        }, {
          key: "apiConfig",
          get: function() {
            return this._apiConfig
          }
        }]), t
      }();
    n.default = d
  }, {
    "../Env.es6": 26,
    "../Local.es6": 27,
    "../ajax.es6": 32,
    "object.assign": 11,
    q: 14
  }],
  34: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      r = function() {
        function t(e, n, o) {
          i(this, t), this._apiUrl = e, this._dtu = n, this._token = o
        }
        return o(t, [{
          key: "apiUrl",
          get: function() {
            return this._apiUrl
          }
        }, {
          key: "dtu",
          get: function() {
            return this._dtu
          }
        }, {
          key: "token",
          get: function() {
            return this._token
          }
        }]), t
      }();
    n.default = r
  }, {}],
  35: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function() {
      var t = location.hash.split("#")[1];
      return t ? r.set(t) : t = r.get("token") || "", t
    };
    var i = t("./Local.es6"),
      o = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(i),
      r = new o.default("token")
  }, {
    "./Local.es6": 27
  }],
  36: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function() {
      function t() {
        clearTimeout(o), o = setTimeout(function() {
          i.close(), r.default.alert(e, function() {
            return location.reload()
          })
        }, n)
      }
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "请求超时，请重试",
        n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1e4,
        i = new s.default,
        o = null;
      return t(), {
        wait: function() {
          t()
        },
        close: function() {
          i.close(), clearTimeout(o)
        }
      }
    };
    var o = t("../../components/MessageBox/MessageBox.es6"),
      r = i(o),
      a = t("../../components/Loading/Loading.es6"),
      s = i(a)
  }, {
    "../../components/Loading/Loading.es6": 40,
    "../../components/MessageBox/MessageBox.es6": 41
  }],
  37: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t) {
      return t.length ? t[Math.floor(Math.random() * t.length)] : null
    }
  }, {}],
  38: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function r(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var a = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      s = t("../common/component/Component.es6"),
      c = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(s),
      u = t("../common/libs/zepto.js"),
      l = '<div class="Loading" ahw="1">\n    <div class="spinner" style="display: none;">\n        <div class="spinner-container container1">\n            <div class="circle1"></div>\n            <div class="circle2"></div>\n            <div class="circle3"></div>\n            <div class="circle4"></div>\n        </div>\n        <div class="spinner-container container2">\n            <div class="circle1"></div>\n            <div class="circle2"></div>\n            <div class="circle3"></div>\n            <div class="circle4"></div>\n        </div>\n        <div class="spinner-container container3">\n            <div class="circle1"></div>\n            <div class="circle2"></div>\n            <div class="circle3"></div>\n            <div class="circle4"></div>\n        </div>\n    </div>\n</div>',
      f = function(t) {
        function e() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 800;
          i(this, e);
          var n = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
          return n._root = u(l), u("body").append(n._root), n._icon = u(".spinner", n._root).hide(), n._timer = setTimeout(function() {
            n._root.css("background", "rgba(0,0,0,.3)"), n._icon.show()
          }, t), n
        }
        return r(e, t), a(e, [{
          key: "close",
          value: function() {
            this._root && (clearTimeout(this._timer), this._root.remove(), this._root = null)
          }
        }, {
          key: "cuid",
          get: function() {
            return "components2/Loading"
          }
        }, {
          key: "css",
          get: function() {
            return "@-webkit-keyframes bouncedelay{0%,80%,100%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}@keyframes bouncedelay{0%,80%,100%{transform:scale(0);-webkit-transform:scale(0)}40%{transform:scale(1);-webkit-transform:scale(1)}}.Loading{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0);z-index:99}.Loading .spinner{position:absolute;width:2.25rem;height:2.25rem;top:50%;left:50%;margin:-1.125rem 0 0 -1.125rem}.Loading .container1>div,.Loading .container2>div,.Loading .container3>div{width:.4rem;height:.4rem;background-color:rgba(255,255,255,0.8);border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.2s infinite ease-in-out;animation:bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.Loading .spinner .spinner-container{position:absolute;width:100%;height:100%}.Loading .container2{-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.Loading .container3{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.Loading .circle1{top:0;left:0}.Loading .circle2{top:0;right:0}.Loading .circle3{right:0;bottom:0}.Loading .circle4{left:0;bottom:0}.Loading .container2 .circle1{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.Loading .container3 .circle1{-webkit-animation-delay:-1s;animation-delay:-1s}.Loading .container1 .circle2{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.Loading .container2 .circle2{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.Loading .container3 .circle2{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.Loading .container1 .circle3{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.Loading .container2 .circle3{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.Loading .container3 .circle3{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.Loading .container1 .circle4{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.Loading .container2 .circle4{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.Loading .container3 .circle4{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}"
          }
        }]), e
      }(c.default);
    n.default = f
  }, {
    "../common/component/Component.es6": 20,
    "../common/libs/zepto.js": 22
  }],
  39: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function r(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var a = function() {
        function t(t, e) {
          var n = [],
            i = !0,
            o = !1,
            r = void 0;
          try {
            for (var a, s = t[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); i = !0);
          } catch (t) {
            o = !0, r = t
          } finally {
            try {
              !i && s.return && s.return()
            } finally {
              if (o) throw r
            }
          }
          return n
        }
        return function(e, n) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return t(e, n);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
      }(),
      s = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      c = t("../common/component/Component.es6"),
      u = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(c),
      l = t("../common/libs/zepto.js"),
      f = function(t) {
        function e(t) {
          i(this, e);
          var n = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this)),
            r = {
              icon: null,
              center: !0,
              text1: null,
              text2: null
            };
          t = l.extend(r, t);
          var a = "",
            s = "",
            c = "",
            u = "";
          t.icon && (a = '<p class="pic"><img src="' + t.icon + '"></p>'), t.text1 && (s = '<p class="txt_1">' + t.text1 + "</p>"), t.text2 && (c = '<p class="txt_2">' + t.text2 + "</p>"), t.center && (u = " center");
          var f = '<div class="MessageBox" ahw="1">\n\t\t\t\t\t<div class="msg_mask">\n\t\t\t\t\t\t<div class="msg_pop">\n\t\t\t\t\t\t\t<div class="msg_box' + u + '">\n\t\t\t\t\t\t\t\t' + a + "\n\t\t\t\t\t\t\t\t" + s + "\n\t\t\t\t\t\t\t\t" + c + '\n\t\t\t\t\t\t\t</div>\n                            <div class="actions"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>';
          return n._root = l(f), l("body").append(n._root), n._actions = l(".actions", n._root), n
        }
        return r(e, t), s(e, [{
          key: "close",
          value: function() {
            this._root.remove()
          }
        }, {
          key: "oneButton",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "确定",
              e = l('<a href="" class="btn">' + t + "</a>");
            return this._actions.html(e), e
          }
        }, {
          key: "twoButtons",
          value: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "取消",
              e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "确定",
              n = l('<a href="" class="btn cancel_btn">' + t + '</a>\n            <a href="" class="btn submit_btn">' + e + "</a>");
            return this._actions.html(n), [l(".cancel_btn:first-child", this._actions), l(".submit_btn:last-child", this._actions)]
          }
        }, {
          key: "cuid",
          get: function() {
            return "components2/MessageBox"
          }
        }, {
          key: "css",
          get: function() {
            return '.MessageBox .center{text-align:center}.MessageBox .msg_mask{position:fixed;width:100%;height:100%;left:0;top:0;background:rgba(0,0,0,0.6);z-index:100;font-family:"microsoft yahei";-webkit-animation:mask .3s;-webkit-backface-visibility:hidden;-webkit-perspective:1000}.MessageBox .msg_pop{position:absolute;width:92%;left:4%;bottom:2.5rem;display:block;z-index:101;background:#fff;-webkit-border-radius:.25rem;-webkit-animation:msg_pop .4s}.MessageBox .msg_box{padding:.65rem}.MessageBox .pic img{width:2.75rem;height:2.75rem}.MessageBox .txt_1{font-size:.85rem;color:#2B2B2B;line-height:1.5}.MessageBox .txt_2{font-size:.7rem;color:#AFAFAF;line-height:2}.MessageBox .actions{zoom:1;border-top:1px #E4E4E4 solid;background:#f7f7f7;-webkit-border-radius:0 0 .25rem .25rem}.MessageBox .actions:after{clear:both;display:block;height:0;content:"";visibility:hidden}.MessageBox .actions .btn{display:block;text-align:center;height:2.5rem;line-height:2.5rem;font-size:.85rem;color:#585858}.MessageBox .actions .submit_btn{width:50%;position:relative;float:left}.MessageBox .actions .cancel_btn{width:50%;float:left}.MessageBox .actions .submit_btn:before{display:block;content:"";background:#E4E4E4;width:1px;height:2.5rem;position:absolute;left:0;top:0}@-webkit-keyframes mask{from{background:rgba(0,0,0,0)}to{background:rgba(0,0,0,0.6)}}@-webkit-keyframes msg_pop{from{bottom:-100%}to{bottom:.75rem}}'
          }
        }], [{
          key: "alert",
          value: function(t, n) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "确定",
              o = new e({
                text1: t
              });
            o.oneButton(i).click(function() {
              return o.close(), n && n(), !1
            })
          }
        }, {
          key: "show",
          value: function(t, n, i) {
            var o = new e({
                text1: t
              }),
              r = o.twoButtons(),
              s = a(r, 2),
              c = s[0],
              u = s[1];
            c.click(function() {
              return o.close(), i && i(), !1
            }), u.click(function() {
              return o.close(), n && n(), !1
            })
          }
        }, {
          key: "showTwo",
          value: function(t, n, i, o, r, s) {
            var c = new e({
                text1: t,
                text2: n
              }),
              u = c.twoButtons(i, o),
              l = a(u, 2),
              f = l[0],
              p = l[1];
            f.click(function() {
              return c.close(), r && r(), !1
            }), p.click(function() {
              return c.close(), s && s(), !1
            })
          }
        }]), e
      }(u.default);
    n.default = f
  }, {
    "../common/component/Component.es6": 20,
    "../common/libs/zepto.js": 22
  }],
  40: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var i = t("../../components2/Loading.es6"),
      o = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(i);
    n.default = o.default
  }, {
    "../../components2/Loading.es6": 38
  }],
  41: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var i = t("../../components2/MessageBox.es6"),
      o = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(i);
    n.default = o.default
  }, {
    "../../components2/MessageBox.es6": 39
  }],
  42: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var i = t("../../../common/qukan/ajax.es6"),
      o = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(i),
      r = t("../../../common/libs/zepto.js"),
      a = (t("q"), t("qs"));
    n.default = {
      sendView: function(t, e) {
        if (top === window) {
          var n = {
            cb: "?",
            dtu: t.dtu,
            ua: encodeURIComponent(t.ua),
            key: t.key,
            token: t.token
          };
          r.get(t.getApiURl() + "content/view?" + a.stringify(n, {
            encode: !1
          }), function(n) {
            console.log("view", n), n.code || (t.memberID = n.data.member_id, e && e())
          })
        }
      },
      sendRead: function(t, e) {
        var n = {
          cb: "?",
          dtu: t.dtu,
          ua: encodeURIComponent(t.ua),
          member_id: t.memberID,
          key: t.key,
          token: t.token,
          version: t.version,
          tk: window.qukanClient && window.qukanClient.getTk && window.qukanClient.getTk() || "",
          expand_flg: t.expand_flg || "1"
        };
        r.get(t.getApiURl() + "content/read?" + a.stringify(n, {
          encode: !1
        }), function(t) {
          console.log("read", t), t.code || e && e(t.data.amount)
        })
      },
      getCommentList: function(t) {
        return (0, o.default)(t.getApiURl() + "comment/hotList", {
          token: t.token,
          dtu: t.dtu,
          content_id: t.getContentID()
        })
      },
      commentLike: function(t, e, n) {
        return (0, o.default)(t.getApiURl() + "comment/like", {
          token: t.token,
          dtu: t.dtu,
          content_id: t.getContentID(),
          comment_id: e,
          act: n
        })
      },
      getDBAD: function() {
        return (0, o.default)("//h5ssl.1sapp.com/duiba-db/dbad-database.json", {})
      },
      getRecommend: function(t) {
        var e = t.inApp() ? t.getApiURl() + "content/getRecommend" : "//api.1sapp.com/content/getRecommendTopN";
        return (0, o.default)(e, {
          token: t.token,
          dtu: t.dtu
        })
      },
      unfoldReply: function(t, e) {
        return (0, o.default)(t.getApiURl() + "comment/unfoldReply", {
          token: t.token,
          dtu: t.dtu,
          content_id: t.getContentID(),
          comment_id: e
        })
      },
      getReward: function(t, e) {
        return (0, o.default)(t.getApiURl() + "reward/getReward", {
          token: t.token,
          dtu: t.dtu,
          contentId: t.getContentID(),
          limit: e
        })
      },
      reward: function(t, e) {
        return (0, o.default)(t.getApiURl() + "reward/reward", {
          token: t.token,
          dtu: t.dtu,
          contentId: t.getContentID(),
          coin: e
        })
      }
    }
  }, {
    "../../../common/libs/zepto.js": 22,
    "../../../common/qukan/ajax.es6": 32,
    q: 14,
    qs: 16
  }],
  43: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = {
      API_URL: "//api.1sapp.com/",
      DEV_API_URL: "//test4-api.qukan.aimodou.net/",
      REGISTER_URL: "http://a.app.qq.com/o/simple.jsp?aaa?&pkgname=com.jifen.qukan",
      HOT_SHARE_DOWNLOAD_URL: "http://a.app.qq.com/o/simple.jsp?site=toutiaodown?&pkgname=com.jifen.qukan",
      LOG_GIF_URL: "//log.1sapp.com/a.gif",
      READ_CONFIG: {
        dev: {
          list: [{
            type: "a",
            num: 2
          }, {
            type: "b",
            num: 7
          }, {
            type: "c",
            num: 10
          }, {
            type: "d",
            num: 14
          }, {
            type: "e",
            num: 16
          }],
          time: 1
        },
        prod: {
          list: [{
            type: "a",
            num: 1
          }, {
            type: "b",
            num: 10
          }, {
            type: "c",
            num: 15
          }, {
            type: "d",
            num: 25
          }, {
            type: "e",
            num: 40
          }],
          time: 3
        }
      }
    }
  }, {}],
  44: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      r = t("../../../common/libs/zepto.js"),
      a = function() {
        function t(e, n) {
          var o = this;
          i(this, t), this._env = n, this._list = e, this._win = r(window), this.timer = setInterval(function() {
            return o._loop()
          }, 1500), setTimeout(function() {
            return o._loop()
          }, 0)
        }
        return o(t, [{
          key: "_getViewPort",
          value: function() {
            return {
              top: this._win.scrollTop(),
              bottom: this._win.scrollTop() + this._win.height()
            }
          }
        }, {
          key: "_stop",
          value: function() {
            clearInterval(this.timer)
          }
        }, {
          key: "_onView",
          value: function(t) {
            var e = t.offset();
            e.bottom = e.top + t.height();
            var n = this._getViewPort();
            return !(n.bottom < e.bottom || n.top > e.top)
          }
        }, {
          key: "destroy",
          value: function() {
            this._stop()
          }
        }, {
          key: "_getPos",
          value: function(t) {
            return Math.round((t.offset().top - this._list.offset().top) / t.height())
          }
        }, {
          key: "_loop",
          value: function() {
            var t = this,
              e = r(".item_report", this._list);
            if (e.length) {
              var n = [],
                i = [],
                o = [];
              r.each(e, function(e, a) {
                var s = r(a);
                t._onView(s) && (n.push(s.data("id")), i.push(t._getPos(s)), o.push(1), s.removeClass("item_report"))
              }), n.length && this._report(n, i, o)
            } else this.destroy()
          }
        }, {
          key: "_report",
          value: function(t, e, n) {
            var i = ["cmd=9058", "selectedid=" + this._env.getContentID(), "dc=" + (this._env.qs("dc") || ""), "memberid=" + this._env.memberID, "ids=" + t.join(","), "pos=" + e.join(","), "times=" + n.join(",")];
            (new Image).src = "//ddd.1sapp.com/a.gif?" + i.join("&")
          }
        }]), t
      }();
    n.default = a
  }, {
    "../../../common/libs/zepto.js": 22
  }],
  45: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }

    function o(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function r(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function a(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var s = function() {
        function t(t, e) {
          var n = [],
            i = !0,
            o = !1,
            r = void 0;
          try {
            for (var a, s = t[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !e || n.length !== e); i = !0);
          } catch (t) {
            o = !0, r = t
          } finally {
            try {
              !i && s.return && s.return()
            } finally {
              if (o) throw r
            }
          }
          return n
        }
        return function(e, n) {
          if (Array.isArray(e)) return e;
          if (Symbol.iterator in Object(e)) return t(e, n);
          throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }
      }(),
      c = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      u = t("./writeScript.es6"),
      l = (i(u), t("./getPageConfig.es6")),
      f = i(l),
      p = t("./findSource.es6"),
      d = i(p),
      h = t("./API.es6"),
      m = i(h),
      g = t("./sendJSError.es6"),
      v = i(g),
      y = t("../../../common/qukan/CallApp.es6"),
      b = i(y),
      w = t("./validReadConfig.es6"),
      A = i(w),
      k = t("../../../common/libs/zepto.js"),
      x = t("eventemitter3"),
      j = {
        normal: 19,
        middle: 21,
        large: 25
      },
      O = {
        normal: 29,
        middle: 29,
        large: 34
      },
      C = function(t) {
        function e(t, n) {
          o(this, e);
          var i = r(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
          return i._env = t, i._root = n, i._callApp = new b.default, i._ct = k(".content", i._root), i._info = k(".info", i._root), i._infoText = i._info.html(), i.init = i.init.bind(i), i._validRead = !1, i._isExpand = !1, i._hideCopy = !1, i
        }
        return a(e, t), c(e, [{
          key: "init",
          value: function() {
            var t = this;
            this._initInfo();
            var e = this;
            k("span", this._ct).each(function() {
              -1 != k(this).html().indexOf("习近平专题") && (e._hideCopy = !0)
            });
            var n = "本文及配图均为趣头条自媒体用户上传，不代表平台观点。",
              i = (0, f.default)("isOrigin"),
              o = (0, f.default)("siteName");
            o && (n = i ? "本文为" + o + "原创，未经允许不得转载。" : "本文为" + o + "上传，不代表平台观点。"), this._hideCopy && (n = ""), this._env.getContentID() && -1 !== [3256891, 3254949, 3248783, 3253577, 3253595, 3253701, 3253731, 3253781, 3253835, 3253864, 3247596, 3253672].indexOf(parseInt(this._env.getContentID())) && (n = ""), this._ct.after('<div class="qtg" style="display: none;">' + n + '</div>\n                        <div class="tags" style="display: none;"></div>\n                        <div class="wx_accounts"></div>\n                        <div class="shang"></div>\n                        <div class="zan_btn"></div>'), this._initImages(), this._replaceNextPage(), this._initVideos(), this.on("expand", function() {
              t._initSourceInfo(), t._showTags(), t._initShang(), t._wxAccounts(), t._initLike()
            }), this._initCollapse(), this._initTop()
          }
        }, {
          key: "setFontSize",
          value: function(t) {
            if (t in j) {
              var e = j[t],
                n = O[t];
              k(window).width() <= 320 && "normal" == t && (e = 17, n = 24), this._ct.css({
                "font-size": e + "px",
                "line-height": n + "px"
              })
            }
          }
        }, {
          key: "setTags",
          value: function(t) {
            var e = k(".tags", this._root),
              n = t.map(function(t) {
                return '<a href="goto?target=search&value=' + encodeURIComponent("##" + t + "##") + '">' + t + "</a>"
              });
            e.html(n.join("")), this.isExpand && e.show()
          }
        }, {
          key: "_wxAccounts",
          value: function() {
            var t = (0, f.default)("wx_public_nickname"),
              e = t ? '<div class="wx_inner"><h6>' + t + "</h6><p>" + (0, f.default)("wx_public_info") + "</p></div>" : "";
            k(".wx_accounts", this._root).html(e)
          }
        }, {
          key: "_showTags",
          value: function() {
            k(".tags", this._root).show()
          }
        }, {
          key: "_sendStat0904",
          value: function(t, e) {
            this._env.inApp() && ((new Image).src = "//log.1sapp.com/a.gif?cmd=" + t + "&item=" + e + "&dc=" + this._env.qs("dc") + "&timestamp_s=" + +new Date + "&content_id=" + this._env.getContentID())
          }
        }, {
          key: "_initCollapse",
          value: function() {
            function t(t) {
              var e = [t.nodeName];
              t.id && e.push("id:" + t.id), t.className && e.push("c:" + t.className);
              var n = t.getAttribute("style");
              return n && e.push("s:" + encodeURIComponent(n)), t.getAttribute("ahw") && e.push("ahw"), e.join("/")
            }
            var e = this,
              n = +new Date,
              i = this._ct.offset().height,
              o = k(window).height();
            if ("1" === this._env.qs("rc") || this._env.testB() || i < 2.4 * o) return this._validRead = !0, this._isExpand = !0, this.emit("expand"), void(i < 2.4 * o && (this._env.expand_flg = "0"));
            var r = k('<div class="pcl ct_bottom"></div>'),
              a = k('<div class="cc"><span class="pcl">展开查看全文 ▾</span></div>');
            this._ct.css("height", 1.2 * o).append(r), this._root.append(a);
            var s = function() {
              e._ct.css("height", ""), a.remove(), r.remove(), e._isExpand = !0, e.emit("expand");
              var t = +new Date;
              t - n > A.default.lookAll && (e._validRead = !0, console.log("validRead", t - n))
            };
            a.on("click", function() {
              return s(), !1
            });
            var c = null;
            setInterval(function() {
              var t = a.offset();
              if (c && (c.remove(), c = null), !c && !e.isExpand) {
                c = k('<div ahw="1" class="collbtn" style="position:absolute;z-index:2147483647;opacity:.1;background:#fff;left:0;top:' + t.top + "px;width:100%;height:" + t.height + 'px;"></div>'), c.on("click", function() {
                  s(), e._sendStat0904(9046, "news_detail_open"), e._callApp.report(1002, 1, 302, null, null, e._env.getContentID())
                }), k("body").append(c);
                var n, i, o;
                c.on("touchstart", function(t) {
                  if (c) {
                    n = +new Date;
                    var e = t.touches[0],
                      r = c.offset();
                    i = Math.round(e.pageX - r.left), o = Math.round(e.pageY - r.top)
                  }
                }), c.on("touchend", function(t) {
                  if (n) {
                    var e = +new Date - n;
                    e < 3 && ((new Image).src = "//log.aimodou.net/qukan/trackAnalysis/a.html?readpage_jq5=" + (c ? c.width() : 0) + "," + (c ? c.height() : 0) + "|" + e + "," + i + "," + o)
                  }
                })
              }
            }, 1e3), this._env.inApp() && k(document).on("click", function(e) {
              var n = a.offset(),
                i = e.pageY;
              if (i >= n.top && i <= n.top + n.height) {
                var o = e.target,
                  r = [],
                  s = k(o).offset(),
                  c = k(window);
                for (r.push(document.body.scrollTop + "/" + c.width() + "/" + c.height()), r.push(n.left + "/" + n.top + "/" + n.width + "/" + n.height), r.push(s.left + "/" + s.top + "/" + s.width + "/" + s.height), r.push(t(o)); o;) {
                  var u = o.parentNode;
                  if (!u || "BODY" == u.nodeName || "HTML" == u.nodeName) break;
                  r.push(t(u)), o = u
                }
                o && (o.getAttribute("ahw") || "BODY" == o.nodeName || (0, v.default)("coll43", r.join(",")))
              }
            })
          }
        }, {
          key: "_initTop",
          value: function() {
            var t = this,
              e = k('<a href="" class="gototop" ahw="1"></a>');
            k("body").append(e);
            e.hide().click(function() {
              var e = k(window).scrollTop(),
                n = e / 20,
                i = setInterval(function() {
                  e -= n, e = Math.max(e, 0), k(window).scrollTop(e), e || clearInterval(i)
                }, 1e3 / 60);
              return t._callApp.report(1002, 1, 304, null, null, t._env.getContentID()), !1
            });
            var n = null,
              i = !1;
            setInterval(function() {
              if (k(window).scrollTop() > 2 * k(window).height()) {
                if (clearInterval(n), !i) {
                  var t = 0;
                  e.css("opacity", t), n = setInterval(function() {
                    t += .05, e.css("opacity", t), t >= 1 && clearInterval(n)
                  }, 1e3 / 60)
                }
                e.show(), i = !0
              } else {
                if (clearInterval(n), i) {
                  var t = 1;
                  e.css("opacity", t), n = setInterval(function() {
                    t -= .05, e.css("opacity", t), t <= 1 && clearInterval(n)
                  }, 1e3 / 60)
                }
                e.hide(), i = !1
              }
            }, 500)
          }
        }, {
          key: "_initInfo",
          value: function() {
            var t = this,
              e = /\d{1,4}-(\d{1,2})-(\d{1,2}) (\d{1,2}:\d{1,2}):\d{1,2}/g,
              n = this._info.html(),
              i = "";
            n = n.replace(e, function(t) {
              var n = e.exec(t);
              return i = n[1] + "/" + n[2] + " " + n[3], ""
            });
            var o = (0, f.default)("authorid"),
              r = (0, f.default)("nickname"),
              a = (0, f.default)("avatar"),
              s = this._env.qs("zmtgz");
            if (o && s) {
              var c = "";
              if (s && (c = '<a href="" class="btn ' + ("1" == s ? "btn_gray" : "btn_light") + '">' + ("1" == s ? "主页" : "关注") + "</a>"), this._info.addClass("zmtinfo").html('\n    <p class="nikename">' + r + "</p>\n    <p>" + i + '</p>\n    <img src="' + a + '"/>\n    ' + c + "\n"), s) {
                var u = this;
                k("p,img", this._info).click(function() {
                  u._sendStat0904(9046, "IMG" === this.tagName ? "news_detail_head" : "news_detail_nickname"), location.href = "goto?target=wemedia&value=" + o
                })
              }
              var l = k(".btn", this._info),
                p = function(t) {
                  s = t, l.html("1" === s ? "主页" : "关注"), l[0].className = "btn " + ("1" === s ? "btn_gray" : "btn_light")
                };
              return l.click(function() {
                return t._sendStat0904(9046, "0" === s ? "news_detail_attention" : "news_detail_homepage"), "0" === s ? t._callApp.attention(o).then(function(t) {
                  return p(t)
                }) : location.href = "goto?target=wemedia&value=" + o, !1
              }), void(window.attention = function(t) {
                return p(t)
              })
            }
            var d = (0, f.default)("siteName"),
              h = (0, f.default)("siteWWW");
            d && h ? (-1 == h.indexOf("http://") && -1 == h.indexOf("https://") && (h = "http://" + h), n = i + ' <a href="' + h + '" style="color:#999;">' + d + "</a>") : n = "" + i + n;
            var m = (0, f.default)("sourceUrl2");
            m ? n = '<a class="complain-btn" href="' + m + '">查看原文</a>' + n : this._env.version >= 2e4 && (n = '<a class="complain-btn" href="art?target=ts">投诉</a>' + n), (0, f.default)("isOrigin") && (n = '<span class="origin">原创 · </span>' + n), this._info.html(n), k(".complain-btn").click(function() {
              var e = k(".complain-btn"),
                n = "投诉" === e.text(),
                i = n ? 207 : 208,
                o = n ? 5011 : 5999,
                r = n ? t._env.getContentID() : e.attr("href");
              t._callApp.report(1002, 2, i, null, o, r)
            })
          }
        }, {
          key: "_initLike",
          value: function() {
            var t = this,
              e = !1;
            try {
              window.qukanClient && qukanClient.displayLike && (e = 1 == qukanClient.displayLike("article"))
            } catch (t) {}
            if (e) {
              if (!this._env.inApp()) return !1;
              if (this._env.isIOS()) {
                if (this._env.qs("v") < 20409) return !1
              } else if (this._env.qs("v") < 20501) return !1;
              var n = "1" === this._env.qs("like");
              k(".zan_btn", this._root).html('\n            <a class="like ' + (n ? "selected" : "") + '"><i></i>' + (n ? decodeURIComponent(this._env.qs("like_num") || 1) : "赞") + '</a>\n            <a href="call?target=dislike" class="dislike"><i></i>不喜欢</a>\n        ');
              var i = k(".zan_btn .like", this._root);
              i.click(function() {
                t._callApp.like().then(function(t) {
                  t = JSON.parse(t), 1 === t.like && i.html("<i></i>" + decodeURIComponent(t.like_num)).addClass("selected gif")
                })
              }), window.resetLikeNum = function(t) {
                return n && i.html("<i></i>" + decodeURIComponent(t))
              }
            }
          }
        }, {
          key: "_replaceNextPage",
          value: function() {
            var t = this._ct.html(); - 1 != t.indexOf("nextpage") && this._ct.html(t.replace(/\[nextpage\]/g, ""))
          }
        }, {
          key: "_initImages",
          value: function() {
            function t(e) {
              var n = e.parent();
              return !!n.length && ("A" == n[0].tagName || t(n))
            }

            function e(e) {
              var n = parseInt(e.attr("data-view"));
              console.log("viewPics", r, n), a && !t(e) && (location.href = "tools?target=viewpics&value=" + encodeURIComponent(JSON.stringify(r)) + "&index=" + n)
            }

            function n(t) {
              var e = 0,
                n = setInterval(function() {
                  e += .0999, t.css("opacity", e), e >= 1 && clearInterval(n)
                }, 1e3 / 60)
            }
            var i = this;
            k("img", this._ct).each(function() {
              k(this).css("visibility", "visible").attr({
                width: null,
                height: null
              })
            });
            var o = this._ct.offset().width;
            k("[data-size]", this._ct).each(function() {
              var t = k(this),
                e = t.attr("data-size").split(","),
                n = s(e, 2),
                i = n[0],
                r = n[1],
                a = [parseInt(i), parseInt(r)],
                c = a[0],
                u = a[1],
                l = o;
              c <= .6 * l && (l = c), t.css({
                width: l === o ? "100%" : l,
                height: l / c * u
              })
            });
            var r = [],
              a = this._env.inApp() && this._env.version > 10201,
              c = 0;
            k("[data-src]", this._ct).each(function() {
              var t = k(this),
                n = t.attr("data-src"),
                o = t.width(),
                a = t.height();
              t.attr("data-src", null);
              var s = "http:";
              if (0 === n.indexOf(s) && (n = n.substring(s.length)), s = "//file.", 0 === n.indexOf(s) && (n = "//static." + n.substring(s.length)), -1 !== n.indexOf(".gif") && o > 50 && a > 50) {
                var u = "wifi" === i._env.qs("network").toLowerCase();
                t.replaceWith('<span class="gifview" data-src="' + n + '?imageView2/1/q/80" style="width:' + o + "px;height:" + a + 'px;">\n                                        <img src="' + n + '?imageView2/1/q/20/format/jpeg" ' + (u ? 'data-src="' + n + '?imageView2/1/q/80"' : "") + ' style="visibility: visible;"/>\n                                        ' + (u ? "" : '<i class="pcl"></i>') + "\n                                    </span>")
              } else {
                if (!t.attr("data-load")) {
                  var l = Math.random() <= .5 && i._env.isAndroid() ? "webp" : "jpeg";
                  t.attr("src", n + "?imageView2/2/w/750/q/80/format/" + l)
                } - 1 === n.indexOf("fenxian.png") && (r.push("http:" + n), t.attr("data-view", c).click(function() {
                  e(k(this))
                }), c++)
              }
            }), k(".gifview", this._ct).click(function() {
              var t = k(this);
              t.html('<img src="' + t.attr("data-src") + '" style="visibility: visible;"/>')
            });
            setInterval(function() {
              var t = k("img[data-src]"),
                e = k(window).scrollTop(),
                i = e + k(window).height();
              t.each(function() {
                var t = k(this),
                  o = t.offset();
                if (o.top >= e && o.top <= i) {
                  var r = t.attr("data-src"); - 1 !== r.indexOf(".gif") ? t.attr({
                    "data-src": null,
                    src: r
                  }) : (t.css({
                    visibility: "visible",
                    opacity: 0
                  }).attr({
                    "data-src": null,
                    src: r
                  }), n(t))
                }
              })
            }, 500)
          }
        }, {
          key: "_initVideos",
          value: function() {
            var t = this;
            setTimeout(function() {
              var e = document.documentElement.clientWidth * (9 / 16),
                n = 0;
              k("script", t._ct).each(function() {
                var t = k(this),
                  i = t.attr("data-mp4");
                if (i && t.replaceWith('<video style="width:100%;height:' + e + 'px;background:#000;" controls="controls" poster="" src="' + i.replace("http:", "") + '"></video>'), i = t.attr("data-iframe"), i && t.replaceWith('<iframe frameborder="0" style="width:100%;height:' + e + 'px;" src="' + i.replace("http:", "") + '"></iframe>'), i = t.attr("data-youku")) {
                  var o = "yk" + n++;
                  t.replaceWith('<div id="' + o + '" style="width:100%;height:' + e + 'px;"></div>');
                  var r = document.createElement("script");
                  r.type = "text/javascript", r.src = "//player.youku.com/jsapi", r.innerText = '\n                    new YKU.Player("' + o + '",{\n                    styleid:0,\n                    client_id:"4b8b9654459baef0",\n                    autoplay:false,\n                    vid:"' + i + '"});', k("body").append(r)
                }
              }), window.clientCloseVideo = function() {
                k("video", t._ct).each(function() {
                  this.pause()
                }), k("iframe", t._ct).each(function() {
                  this.src = this.src
                })
              }
            }, 0)
          }
        }, {
          key: "_showShangBox",
          value: function(t, e) {
            function n() {
              a.remove()
            }
            var i = [5, 10, 20, 30],
              o = i.map(function(e) {
                return '<a href="" class="btn ' + (t.coin >= e ? "light" : "gray") + '">\n                        <strong>' + e + "</strong>\n                        <span>金币</span>\n                    </a>"
              }),
              r = t.coin < i[0] ? '<p class="pcl tips">您的金币不足，无法打赏!</p>' : '<p class="pcl tips" style="color:#999;">打赏会消耗您的金币</p>',
              a = k('<div ahw="1" class="shang_mask">\n                        <div class="box1 pcl" style="display: none;"></div>\n                        <div class="box2 pcl">\n                            <div class="list">' + o.join("") + '</div>\n                            <a href="" class="pcl close"></a>\n                            ' + r + "\n                        </div>\n                    </div>");
            k("body").append(a);
            var s = k(".box1", a),
              c = k(".box2", a),
              u = !1,
              l = this._env;
            k(".list a", c).click(function() {
              var t = k(this);
              if (!t.hasClass("light") || u) return !1;
              u = !0;
              var i = k("strong", t).html();
              return m.default.reward(l, i).done(function(t) {
                u = !1, t.code ? alert(t.message) : (c.hide(), s.show(), setTimeout(function() {
                  n(), e && e()
                }, 2e3))
              }), !1
            }), k(".close", c).click(function() {
              return n(), !1
            })
          }
        }, {
          key: "_initShang",
          value: function() {
            var t = this,
              e = (0, f.default)("canReward");
            if (this._env.inApp() && e) {
              var n = k(".shang", this._root),
                i = null;
              ! function e() {
                clearInterval(i), m.default.getReward(t._env, 30).then(function(o) {
                  if (!o.code) {
                    var r = o.data,
                      a = "若觉得文章不错请打赏一下~";
                    n.addClass("shang_notemp").html('<div class="pcl scroll"></div><a href="" class="pcl"></a>'), k("a", n).click(function() {
                      return t._env.token ? t._showShangBox(r, function() {
                        return e()
                      }) : location.href = "tools?target=login", !1
                    });
                    var s = k(".scroll", n);
                    if (r.count) {
                      var c = r.list.map(function(t, e) {
                        return '<p>"' + t.nick_name + '"累计打赏 <span>' + t.coins + "金币</span></p>"
                      });
                      if (s.html("<p>" + a + '</p><div class="sc">' + c.join("") + "</div>"), c.length > 1) {
                        var u = k(".sc", s),
                          l = 0,
                          f = u[0].scrollHeight - u.height();
                        i = setInterval(function() {
                          l += 1, l >= f && (l = 0), u.scrollTop(l)
                        }, 50)
                      }
                    } else s.html(a)
                  }
                })
              }()
            }
          }
        }, {
          key: "_initSourceInfo",
          value: function() {
            k(".qtg", this._root).show();
            var t = (0, d.default)(this._infoText);
            t && this._root.append('<div class="sourceinfo">\n                                    <img src="' + t.qr + '" class="pcl"/>\n                                    <p class="pcl">来源：' + t.source + '<br/>网址：<a href="' + t.url2 + '">' + t.url1 + "</a></p>\n                                </div>")
          }
        }, {
          key: "isExpand",
          get: function() {
            return this._isExpand
          }
        }, {
          key: "height",
          get: function() {
            return this._root.height()
          }
        }, {
          key: "validRead",
          get: function() {
            return this._validRead
          }
        }, {
          key: "hideCopy",
          get: function() {
            return this._hideCopy
          }
        }]), e
      }(x);
    n.default = C
  }, {
    "../../../common/libs/zepto.js": 22,
    "../../../common/qukan/CallApp.es6": 24,
    "./API.es6": 42,
    "./findSource.es6": 48,
    "./getPageConfig.es6": 49,
    "./sendJSError.es6": 55,
    "./validReadConfig.es6": 58,
    "./writeScript.es6": 60,
    eventemitter3: 3
  }],
  46: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = {
      YS: 5,
      QG: 11,
      SH: 1,
      MS: 12,
      JS: 15,
      QW: 3,
      YE: 17,
      GX: 2,
      SS: 14,
      CJ: 10,
      KJ: 7,
      YL: 6,
      LY: 16,
      QC: 9,
      TY: 13,
      SSH: 8
    }
  }, {}],
  47: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var i = {
      set: function(t, e, n) {
        var i = t + "=" + escape(e);
        if (0 == n) i += "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        else if (n > 0) {
          var o = new Date;
          o.setTime(o.getTime() + 3600 * n * 1e3), i = i + "; expires=" + o.toUTCString()
        }
        document.cookie = i
      },
      get: function(t) {
        for (var e = document.cookie, n = e.split("; "), i = 0; i < n.length; i++) {
          var o = n[i].split("=");
          if (o[0] == t) return unescape(o[1])
        }
        return ""
      },
      remove: function(t) {
        var e = new Date;
        e.setTime(e.getTime() - 1e4), document.cookie = t + "=v; expires=" + e.toGMTString()
      }
    };
    n.default = i
  }, {}],
  48: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t) {
      var e = i.filter(function(e) {
        return -1 != t.indexOf(e.source)
      });
      return e.length ? e[0] : null
    };
    var i = [{
      source: "星座屋",
      qr: "//h5ssl.1sapp.com/qukan/article/style/images/qr2.png",
      url1: "www.xzw.com",
      url2: "http://www.xzw.com/astro/love/"
    }, {
      source: "伊人女性网",
      qr: "//h5ssl.1sapp.com/qukan/article/style/images/qr1.png",
      url1: "www.ebangzhu.com",
      url2: "http://www.ebangzhu.com/meirong/hufu/"
    }, {
      source: "车市网",
      qr: "//h5ssl.1sapp.com/qukan/article/style/images/qr3.png",
      url1: "www.cheshi.com",
      url2: "http://www.cheshi.com/"
    }, {
      source: "39健康",
      qr: "//h5ssl.1sapp.com/qukan/article/style/images/qr4.jpg",
      url1: "www.39.net",
      url2: "http://www.39.net/"
    }]
  }, {}],
  49: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t) {
      return "_config" in window && window._config[t]
    }
  }, {}],
  50: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }

    function o(t, e) {
      if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function r(t, e) {
      if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }

    function a(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function s(t, e, n) {
      var i = $(t, e);
      return n && et.push(i), i
    }

    function c(t) {
      -1 === et.indexOf(t) && tt(t)
    }

    function u(t) {
      return u.kvs || (u.kvs = Z.parse(location.search.substring(1))), u.kvs[t] || ""
    }

    function l(t) {
      return w.default.fcall(function() {
        var e = new G.default(function() {
            for (var t = [], e = 0; e < 3; e++) t.push(Math.random().toString(36).substr(2));
            return "AR" + t.join("") + "========"
          }),
          n = parseInt(nt.getContentID()) || 0;
        return e.getDomainByBucket({
          memberId: n % 2 == 0 ? 18558024 : 10294301,
          bucketType: Y.BUCKET_TYPE.ARTICLE,
          purpose: F.SHARE_PURPOSE.HTML_OUT_GO_REG,
          source: H.default.getSourceByDevice(U.SHARE_SOURCE.ARTICLE),
          pdtu: "article:" + t
        }, {
          contentId: n
        })
      }).then(function(t) {
        return t
      })
    }

    function f() {
      if (!nt.inApp()) return !1;
      for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
      return !!e.filter(function(t) {
        return (0, C.default)(t)
      }).length
    }

    function p() {
      K("head").append('<style>ins[id*=FTAPI_container]{background:none !important}body>*:not([ahw]){display:none}.pcl{display:block;position:absolute}.wad{margin:0 .375rem 0 .375rem;overflow:hidden}.wad_bottom{margin-bottom:.4rem}.wad_fix{position:absolute;top:0;left:.375rem;right:.375rem}.wad_offset{margin-left:-0.375rem}.wad2{margin:0 15px 0 15px;overflow:hidden}.wad2_offset{margin-left:-15px}.article>.info{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.article>.info .origin{color:#0BA809}.article>.info .complain-btn{position:relative;float:right;margin-left:.5rem;color:inherit;text-decoration:none}.article .zmtinfo{position:relative;height:1.6rem;margin:.3rem 0 .3rem 0}.article .zmtinfo img{display:block;position:absolute;left:0;top:0;width:1.6rem;height:1.6rem;border-radius:1.6rem}.article .zmtinfo p{height:.8rem;padding-left:2rem;line-height:.8rem}.article .zmtinfo .nikename{font-size:.6rem;color:#1B1B1B}.article .zmtinfo .btn{position:absolute;display:block;top:50%;right:0;padding:0 .5rem 0 .5rem;height:1.15rem;margin-top:-0.575rem;line-height:1.15rem;border-radius:.2rem;color:#fff;font-size:.6rem;text-align:center}.article .zmtinfo .btn_light{background:#1AAD19}.article .zmtinfo .btn_light:active{opacity:.6}.article .zmtinfo .btn_gray{color:#1AAD19;border:.05rem solid #1AAD19;margin-top:-0.625rem}.article .content .ct_bottom{left:0;bottom:0;width:100%;height:2rem;background:linear-gradient(rgba(246,246,246,0), #f6f6f6)}.article .content .gifview{position:relative;display:block}.article .content .gifview i{left:50%;top:50%;width:2.5rem;height:2.5rem;margin:-1.25rem 0 0 -1.25rem;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAMAAAAOARRQAAAA0lBMVEUAAAAAAAD///+Dg4M2NjZERETs7OwTExP///+dnZ0LCwv5+fmenp59fX3///////////////////////////9sbGy/v7+hoaH6+vrX19fLy8tzc3NRUVEjIyP////29vYnJyfg4ODa2trQ0NDBwcGvr6+UlJSFhYVnZ2dfX1////////////////////////////////////////+urq6IiIjz8/Pv7+/o6Ojd3d2Tk5NaWloZGRlNTU27u7uqqqp7e3s4ODhDQ0Pj4+Ovr6////9JYBd4AAAARXRSTlOZAJnBmauZmVnLmpmZmY6JeGosJxK52sz75+CZmZlE+aOZmZmZmZmZmZmUhXFVUUo8HBsI0sL39PDqxrOfrdjRvaiZ7dMK35CrAAAD2klEQVRo3rTW2VbiQBSF4eO2TIrME60yRJllnhY407aref9X6gqtiDGBEJL/Lhc530pOXRSdJc1zfG5bfaMH9Iy+ZXPf8RK/nIyZ+raBiAzbn2bFuNyESGq2yxVWlRUiRa6ySrndlCAyuXs6443MgNC6VYqo2tWkQBp5JzGuDaDeYbQn1qkDsN3UjGsBqsboYExTActNxcwGgKTLlChZl4DB7GhmzgNEocQpAcTnxzGOCWgyHZWsAaZzDDMEGoyOjjWAYWLGs6CWKVVlFZaXjHEM1BiljNVgOEmYCdCSKXVyC5gcZsaATielA+NDDAfu6MTuAL6f4VArdHIVFXwfM4b6Thn0rmIcz0yACmVSBZjEMU5oLyfux4lmPAM6ZZYOw4tkLLQow1qwopghanKWjFzD8CfjQGWUaUyFE2bmJsqUcWWY8xDD0aDMa4B/Z2YAy55hwOwbM4BGOaRhsMu4kGTKIVmCu8NY0CmXdFhfjAtJoVxSJLhbxoZOOaXD/mQ8qDLllKzC+2BG0Ci3NIw+GBOMcovB/M+4qFOO1eFuGI4O5VgHXDC5/LPwXxPMFBLlmoSpYPx950wprh7vr5YPpcsL2nZRKBQ2j7eFUOfRZ80XjI1urLJYrrddb6Fz8XS+8dahHimiLmzBGKjGIC/X34cs0jFVGGfkQYpTHtei5aqwuFw9rIPeIpjl9U6rmOV45KAZw5TEkJuFQpuKAXRz+5P5RQdrwiEf7Zi9BHNf6bPbwPmdimnDJx5z1VDuxYwifXURsEoapgxOdsy1+e3HiGBVr2mYCmyywGI380y7PT89PV2kYRgs6sec5xtxiCiiFEwVfTIgU0R/xIRSRowMg3pQKKJnMeHvYUZ0tdMLRaWgRwBFVRQDLj+/rLTtLcSEimYI2Mf8q9ZadhCEgeDBeCh308pB+hFgEUKQkP3/X9I1SriswNKMtafeJulu9zEz5n3vaDpWCfPt0fo1MOfT7GTSo0kpMI+uL18nZxhlCkgJnTmiWgiXIqHF78lNYIgCw99TLDYNBycKDBcbuXQWRO4YA4ZLp9wIDBGFIQYMNwK5rXF0iuaTo94EhtG2NblJ+5EYKDfVvbK5Iz5GAcNNesvIQa5RlE4eORYGqEOYgVx7r6nQPEAtjoNteasLF8bctNlUIay1HV/883JasXpcQMMtZlQHLR6gNQqzFIJWXNDCjqEfQGQKhhoCEV0Y2g5EQmIoVRBBjKG7MeQ9RooACSsYmQgjemEkvN8LkvHk1TTE4jjSdzpC/n5bQlomi12WkRQNMEo7T7rmpK1Wq/SNYyttcP9k6othUXwA4q3C7uwvMTkAAAAASUVORK5CYII=") no-repeat;background-size:100%}.article .content .gifview img{width:100%;height:100%}.article .qtg{padding:.25rem 0 .4rem 0;font-size:.5rem;color:#949494}.article .tags{overflow:hidden;padding-bottom:.6rem}.article .tags a{display:block;float:left;padding:0 .5rem 0 .5rem;margin:.45rem .375rem 0;height:1.15rem;line-height:1.15rem;border-radius:.25rem;font-size:.6rem;background:#fff}.article .collapse{position:relative;height:1.4rem;line-height:1.4rem;margin:.5rem 0 .5rem 0}.article .collapse:before{position:absolute;content:"";left:0;top:.7rem;width:100%;overflow:hidden;background-image:-webkit-linear-gradient(top, #E4E4E4, #E4E4E4 60%, transparent 60%);background-size:100% 1px;background-position:bottom;background-repeat:no-repeat;height:1px}.article .collapse a,.article .collapse span{left:50%;top:0;width:7rem;height:100%;border-radius:1.4rem;margin-left:-3.5rem;font-size:.65rem;text-align:center;background:#45C018;color:#fff}.article .cc{position:relative;height:1.8rem;margin:.5rem 0 .5rem 0}.article .cc span{left:10%;top:0;width:80%;height:1.7rem;line-height:1.7rem;border-radius:1.7rem;font-size:.75rem;text-align:center;background:#DFEDDF;color:#1AAD19;border:.05rem solid #85CF84}.article .sourceinfo{position:relative;height:2.5rem}.article .sourceinfo img{top:50%;left:1.25rem;width:2rem;height:2rem;margin:-1rem 0 0 0}.article .sourceinfo p{top:.25rem;left:4rem;height:2rem;font-size:.55rem;line-height:1rem}.article .sourceinfo a{text-decoration:underline}.collbtn:active{opacity:.3 !important}.shang{position:relative}.shang_notemp{background:#fff;height:2.5rem;margin-bottom:.4rem}.shang a{right:.4rem;top:.4rem;width:5.5rem;height:1.7rem;background:url("data:image/png;base64,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") no-repeat;background-size:100%}.shang .scroll{top:.4rem;left:.4rem;right:.4rem;height:1.7rem;line-height:1.7rem;color:#868686;font-size:.55rem;overflow:hidden}.shang .scroll p{height:.85rem;line-height:.85rem;overflow:hidden}.shang .scroll .sc{height:.85rem;overflow:hidden}.shang .scroll span{color:#FF5167}.shang_mask{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:2147483647}.shang_mask .box1{top:50%;left:50%;width:12rem;height:8.75rem;margin:-4.375rem 0 0 -6rem;background:url("data:image/png;base64,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") no-repeat;background-size:100%;border-radius:.25rem}.shang_mask .box2{top:50%;left:50%;width:12rem;height:15.425rem;margin:-7.625rem 0 0 -6rem;background:url("data:image/png;base64,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") no-repeat;background-size:100%}.shang_mask .box2 .list{width:9.5rem;margin:7.25rem auto 0 auto;overflow:hidden}.shang_mask .box2 .list .btn{display:block;float:left;width:4.4rem;height:3rem;border-radius:.45rem;margin:0 .25rem .25rem 0;border:.05rem solid #DFDFDF;text-align:center;font-size:.55rem;color:#000}.shang_mask .box2 .list .btn strong{display:block;padding:.5rem 0 0 0;font-size:1.1rem;color:#FF5066;line-height:1.1rem}.shang_mask .box2 .list .btn span{display:block}.shang_mask .box2 .list .light:active{border-color:#FF5167;background:#FF5167;color:#fff}.shang_mask .box2 .list .light:active strong{color:#fff}.shang_mask .box2 .list .gray{background:#E6E6E6;color:#B7B6B6}.shang_mask .box2 .list .gray strong{color:#B7B6B6}.shang_mask .box2 .close{top:0;right:0;width:1.25rem;height:1.25rem;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAS1BMVEUAAAD7T2X7T2T7TmT6T2T/UmT/Umv6TmT8TmX7T2X7UGX6T2X8UGT8TmX/YID7T2X6TmT//v/7i5n6b4H8s7z8nan7eYn6YHT92t8Klz6TAAAAEHRSTlMA+e26ohwP3ZOIeWpZTgjFK3VF8gAAAUJJREFUSMelluGSgyAMhBNQwILtWqv2/Z/07qZzhwVSzdz+k5nPACGbUC2XgvWG2XgbkqND9dEydmIb+89Ah4Y6GXIDoykehP2NBqLM2CIu+KhLBVw7HKi7FsQNh7q9Mx1OqFOco3GeESc1/uXDnEXMb34GnNbwInrOS/MyI6te4768rXmapntB3L/X5vdb65G1TJnZEdOSv3/CROyjZCYT+yiIRGTLf2Ymf2dZIseQmZoAO0pAi5EIIFGAwAgEAlkIjEDAkofAPNoEPBkIjEDAEENgBALcRvB47Q1NxGijGPLas3iy2huzFLR5CZS02U/kWPfG2BFZ3Uu2RBR19RKLQt6EqtzyQl/YxSrU/prtojKlZ9NhnjtTqq1v3VBqWwvr0xqs3sb1zULfkvSNT99e1U1cPyroBxL12PPv4Uo/wn0BqVF6QMcG1kYAAAAASUVORK5CYII=") no-repeat;background-size:100%}.shang_mask .box2 .tips{left:0;bottom:0;width:100%;height:1.5rem;line-height:1.5rem;text-align:center;color:#F24A5F;font-size:.55rem}.hot2{position:relative;margin:.4rem 0 .4rem 0;border-top:.4rem solid #E6E6E6}.hot2 .th{position:relative;margin:0 15px 0 15px;padding:.375rem 0 .375rem 0}.hot2 .th span{position:relative;display:block;height:1.35rem;padding-left:.6rem;line-height:1.35rem;font-size:19px;font-weight:700}.hot2 .th span:after{content:"";position:absolute;display:block;width:.1rem;height:.75rem;left:0;top:50%;margin-top:-0.375rem;background:#3ABD0B;overflow:hidden}.hot2 .th:before{position:absolute;content:"";z-index:99;bottom:0;right:0;left:0;overflow:hidden;background-image:-webkit-linear-gradient(top, #E6E6E6, #E6E6E6 60%, transparent 60%);background-size:100% 1px;background-position:bottom;background-repeat:no-repeat;height:1px}.hot2 .list{position:relative;margin:0 15px 0 15px}.hot2 .list.preload{height:24.15rem;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmIAAAChAQMAAABee0GWAAAABlBMVEUAAADz8/MJwGWeAAAAAXRSTlMAQObYZgAAAF9JREFUaN7t16ERwCAQRNHrJP13kZIi4w6BQYCAQcH7BTy5MxuSJLVlty+enO+l0Wg0Go1GO1xbikaj0armtdFoNBqNRqN5bTQa7SJtvG8/jUaj0Wg02vGaJEltua+IAhH0KoC2mxEXAAAAAElFTkSuQmCC") repeat-y;background-size:100%}.hot2 .list.preload *{visibility:hidden}.hot2 .item{position:relative;display:block;height:4.025rem;overflow:hidden}.hot2 .item img{top:.5rem;left:0;width:4.5rem;height:3rem;background:#eeeeee}.hot2 .item .title{display:block;margin:.5rem 0 0 4.9rem;font-size:19px;line-height:1rem;height:3rem;color:#1a1a1a;overflow:hidden}.hot2 .item .title2l{height:2rem}.hot2 .item .sbtn{display:block;position:absolute;right:0;bottom:.5rem;height:.75rem;padding:0 .5rem 0 .5rem;line-height:.75rem;color:#DB1616;border:.05rem solid #DB1616;border-radius:.75rem;font-size:.4rem;background:#f6f6f6}.hot2 .item:before{position:absolute;content:"";z-index:99;bottom:0;right:0;left:0;overflow:hidden;background-image:-webkit-linear-gradient(top, #E6E6E6, #E6E6E6 60%, transparent 60%);background-size:100% 1px;background-position:bottom;background-repeat:no-repeat;height:1px}.hot2 .item:active{background:#f2f2f2}.hot2 .custom{position:relative;padding:.5rem 0 .5rem 0;overflow:hidden}.hot2 .custom:before{position:absolute;content:"";z-index:99;bottom:0;right:0;left:0;overflow:hidden;background-image:-webkit-linear-gradient(top, #E6E6E6, #E6E6E6 60%, transparent 60%);background-size:100% 1px;background-position:bottom;background-repeat:no-repeat;height:1px}.hot2 .custom:active{background:#f2f2f2}.hot2 .custom2{position:relative;margin-top:.5rem;height:3.525rem;overflow:hidden}.hot2 .custom2:before{position:absolute;content:"";z-index:99;bottom:0;right:0;left:0;overflow:hidden;background-image:-webkit-linear-gradient(top, #E6E6E6, #E6E6E6 60%, transparent 60%);background-size:100% 1px;background-position:bottom;background-repeat:no-repeat;height:1px}.hot2 .custom2:active{background:#f2f2f2}.comment2{position:relative;margin:.4rem 0 .4rem 0;border-top:.4rem solid #E6E6E6}.comment2 .th{position:relative;margin:0 15px .55rem 15px;padding:.375rem 0 .375rem 0}.comment2 .th span{position:relative;display:block;height:1.35rem;padding-left:.6rem;line-height:1.35rem;font-size:19px;font-weight:700}.comment2 .th span:after{content:"";position:absolute;display:block;width:.1rem;height:.75rem;left:0;top:50%;margin-top:-0.375rem;background:#3ABD0B;overflow:hidden}.comment2 .th:before{position:absolute;content:"";z-index:99;bottom:0;right:0;left:0;overflow:hidden;background-image:-webkit-linear-gradient(top, #E6E6E6, #E6E6E6 60%, transparent 60%);background-size:100% 1px;background-position:bottom;background-repeat:no-repeat;height:1px}.comment2 .item{position:relative;margin:0 15px 0 15px;padding-bottom:.75rem;overflow:hidden}.comment2 .item .face{top:0;left:0;width:1.6rem;height:1.6rem;border-radius:1.6rem}.comment2 .item .ct{padding:0 0 0 2rem}.comment2 .item .nickname{font-size:.65rem;color:#5491D3}.comment2 .item .time{padding-top:.15rem;font-size:.5rem;color:#989898}.comment2 .item .txt{padding-top:.25rem;font-size:19px;line-height:26px;color:#1a1a1a;overflow:hidden}.comment2 .item .lick{top:0;right:0;padding-right:.9rem;height:.75rem;line-height:.85rem;font-size:.6rem;color:#8A8A8A;overflow:hidden}.comment2 .item .lick span{top:0;right:0;width:.75rem;height:.75rem;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAATlBMVEUAAACYmJijo6OampqYmJiXl5eampqZmZmZmZmZmZmYmJiZmZmZmZmYmJiXl5eXl5eZmZmbm5ucnJyXl5eYmJiampqXl5eYmJiampqXl5fyRVFLAAAAGXRSTlMA9gpBzr4yjmArnXtwxOSvUSEQ7YNJ26YaDGXHDQAAAPBJREFUOMvFkstywyAMRcXLxsaAsZ2k9/9/tE4poe4IssxZaKE5MHrRJ5n8HtM7RwAw1Mdj3gRk/yMESXdMXcliJjJYu9KIhcidZo/jKSWIr57k4M74wKMnLRjPmARsR1LwuX6h2tIGkRtgrcXoH/A7oxlCZ6Kqrb8Y/mdCkQLWIfNqPlnoZ6IuiVuXyosGSkJjakgb9pKIsA0p4V4nPTakAbokbvCslGMdouSlFZFq5YqT8oXVaR6MVFZei+KlA44KEtg4Kd9qwWBlpblOMB82J8W/jyfskpP8pW0NJy/cYM543apCA3k5ziAYgqUP8A2dEhF2Ws5gpgAAAABJRU5ErkJggg==") no-repeat;background-size:100%}.comment2 .item .lick .light{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAbFBMVEUAAADiAADiAADhAADiAADiAADkAAD0AADiAADiAADiAADiAADiAADiAADiAADjAADhAADkAADmAADiAADiAADiAADjAADlAADkAADhAAD2qqrweHj5wsLzi4vuZmbjAADhAAD////zmZntZmYQmJkZAAAAIHRSTlMAwHrp44ocBfjauqmcdWdWRDYT0MlfSSsg7+XZyamZbnVJk/cAAAC/SURBVDjLzdPtDoIgFIBhFQE/M9TKvo91//cYjHYGiwP9q/eHbu6ZTjhkP60/TmPK7ABgk0K1RjxhFtC1CbQ1iMk4GsC0/+JNMMeR0iT5f6NF1SGqSqtKEUMt2Ool8Jl7YWvgHStul6t5ohDl8NlzfZjbhKii0YyopFGDqKFRi4jTqEM00IgjEjQqnJUmkLePHYkGZ7YJ5A2XIJFyTwCF3KnhFBLu4FJIOkiyMKr88x1GzEOyy/3O60lf++xfewFw7D1msx9rBAAAAABJRU5ErkJggg==") no-repeat;background-size:100%}.comment2 .item .reply{position:relative;margin:.5rem 0 0 2rem;padding:.25rem 0 .25rem 0;background:#F0F0F0}.comment2 .item .reply:before{content:"";display:block;position:absolute;left:.5rem;top:-0.25rem;width:.5rem;height:.5rem;transform:rotate(45deg);background:#F0F0F0}.comment2 .item .reply p{padding:.1rem .5rem .1rem .5rem;line-height:1rem;font-size:.65rem}.comment2 .item .reply p span{color:#6391C3}.comment2 .item .reply .more a{display:block;height:1.25rem;line-height:1.25rem;color:#6391C3;font-size:.65rem;text-align:center;border-top:.05rem solid #E3E3E3;border-bottom:.05rem solid #E3E3E3}.comment2 .item .reply .more a:active{opacity:.6}.comment2 .ctl{position:relative;height:1.65rem;line-height:1.65rem}.comment2 .ctl .more{display:block;width:100%;height:100%;text-align:center;font-size:.65rem;color:#45C018}@media screen and (max-width:320px) and (min-width:0){.article h1{font-size:21px;line-height:26px}.hot2 .item span{font-size:17px;line-height:1rem;height:3rem}.comment2 .item .txt{font-size:17px;line-height:24px}}.gototop{position:fixed;right:.25rem;bottom:2.75rem;width:2.5rem;height:2.5rem;background:url("data:image/png;base64,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") center no-repeat;background-size:80%;z-index:100}#floating-coin{display:none;position:fixed;top:50%;left:50%;width:5.85rem;height:5.975rem;margin-left:-2.925rem;margin-top:-2.975rem;background:rgba(0,0,0,0.6);border-radius:.25rem;padding-top:.025rem;z-index:2147483647;-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)}#floating-coin .icon{width:3.55rem;height:2.65rem;margin:.625rem auto 0;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAABqCAMAAABd9pmuAAACT1BMVEUAAAAAAAD0twcBAAABAQAAAAD84Rz/6h0AAAD56iD76B36+nrhoRj56Bz46BxEMAT66h8DAwD56Bz55xweFgHnqQb56Bz56Bz56h7/7iDlug346BzKkRSWaw366Bz0vQLdnhj2ugDdnRf46Bz56BzUmBX56Bz56Rz76R7johfXmRfyuwH56Bz1ugD56RxsUAf0uwHxtALbnxH3wQD0vQDysgTPkxbBiRT56R356R2mdhH66R32xAH2xAL56BzAiBS4gxP3vwDytwT0tgCDXwr76R7ztADywwDotADZnxL1uAD0uADtsw3mqBT56Bz65x3zsgDjswPjoRjvtB32xAH46B3HnQDyvwD41nGNbgD////81gD70wD3vwD70AD6ywD2uwD4xQD6zQD55xz0tAD1uAD3wgDyrAD4xwDjohj5yADzsQDnpxP0vgXtqgjprBLrrw/0xQbxuwnqpwzlpBbrsw/2yQXnqhPytgbkoxf0wAXuuQzwtAj82CDyrgD4zCLmlhL854fvsAf97ab82A34xwz61lH60zX2vR7ttQ3utAv63nX61kT5zRn5zA/70wzsowv83Cn72Cnurgr+76/83kj2wzD50Cz2wSb60xbjjhTomg/qnw7+9tX95XT732763GL85GD3xhXlkhP865v85Wz83Db82Rr1uhL///7855P86Yz941r62ln4zFH4y0f40jr50Sb+87n75qD64Y/96nz4z1z941D83j3++N/98sb74Xv20nP41GX3xjj97ZL63Yb+/OvtsEb21p7uu3JPs3aIAAAAW3RSTlMAM/4mGy4OGxAJJAT07eVDMAn7rDkV9HVJFAbAsGlh7+rj4N/YyslSOfrUyrSoWlFJPCD418a9oJ17e2nytaWYko+CdFxA7+ihmIpkXeTSjNzGw6+Yk3wvcTodRC66YAAAD15JREFUaN7NmQd701YUhm1nFCijDZCySguUDigUCoVCoS2U7r2HLMuSbUWyLe+V2CF770VCQgIh7D3LKnT+sJ47LNmWkxgnLbwOeSCE+OU75557JRkeEU8aHiueMTxOFJcWGx4j3rK9ZXh8eHKdbd1j1D3P2Gy2x6d75pWCTuk8w+NB8Rc2xBePRzfPXWkjrJxrePQ88aItyYtPGB41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");background-size:100% auto;background-repeat:no-repeat}#floating-coin .th,#floating-coin .amout{text-align:center;color:#FFDB35;font-size:.65rem}#floating-coin .th{margin-top:.5rem}@-webkit-keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.3, .3, .3);transform:scale3d(.3, .3, .3)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}@keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(.215, .61, .355, 1);animation-timing-function:cubic-bezier(.215, .61, .355, 1)}0%{opacity:0;-webkit-transform:scale3d(.3, .3, .3);transform:scale3d(.3, .3, .3)}20%{-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:scale3d(.9, .9, .9);transform:scale3d(.9, .9, .9)}60%{opacity:1;-webkit-transform:scale3d(1.03, 1.03, 1.03);transform:scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:scale3d(.97, .97, .97);transform:scale3d(.97, .97, .97)}to{opacity:1;-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}}.bounceIn{-webkit-animation-name:bounceIn;animation-name:bounceIn;-webkit-animation-duration:.55s;animation-duration:.55s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.anttips{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);z-index:2147483647}.anttips .box{position:absolute;left:50%;top:1.25rem;width:14rem;height:9rem;margin:0 0 0 -7rem;background:url(//h5ssl.1sapp.com/jssdk/tips.png) no-repeat;background-size:100%;border-radius:.25rem}.anttips .box a{position:absolute;left:0;bottom:0;display:block;width:100%;height:2.15rem}.zan_btn{text-align:center}.zan_btn a{display:inline-block;width:4.375rem;height:1.375rem;line-height:1.4rem;border:1px solid #DDDDDD;border-radius:1.4rem;color:#333333;font-size:.45rem;position:relative;margin:.4rem .5rem .8rem .5rem}.zan_btn a i{display:inline-block;width:.8rem;height:.8rem;vertical-align:middle;margin-right:.1rem;margin-top:-0.1rem}.zan_btn a:active{opacity:.5}.zan_btn .like i{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAhFBMVEUAAAAzMzNGRkYzMzMzMzMzMzM0NDQzMzM0NDQzMzMzMzM0NDQzMzM0NDQzMzM0NDQ0NDQ0NDQzMzM0NDQ1NTU3Nzc3Nzc0NDQzMzMzMzM0NDQ1NTU1NTUzMzM0NDQ6Ojo3NzdNTU00NDQzMzMzMzMzMzM0NDQzMzMzMzM1NTU2NjYzMzNeOOgmAAAAK3RSTlMA9Qvn0+FbzMKup3c/LeqLhmpjU08eDtvWlW5IMiciGgkF/O+4tJ2bgWY5dj96BwAAAOBJREFUOMvt08duwzAQRVFKlKhebbnEPT25//9/AQTFIEVCXHnnt+PDWQwGQ/GgnJJ45TPhFmIf6okCNh6Uo7ZUHpRQ5bx4UMRZkXhQyvFao5bRB2tRIJdHb/kWt4j9IlrzLsQxWJ79Qj1SOmGneWXMtO+O/+QaCu7mML7VbnoHGpIMYhYQYkAa+zm4UEWkNXsKFypJtUaRudDKqM/ULvTDl15JTg5U0JqH1DlQY47akznQJ71eDbzdbJRh/oodpY3SWdnQ2iia3XtJvAn1QBhKLvPzduVqol8Z2EnEM1P+AHhAG9MStppdAAAAAElFTkSuQmCC") no-repeat;background-size:100%}.zan_btn .like.selected{color:#FF2626;border-color:#FF2626}.zan_btn .like.selected i{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAY1BMVEUAAAD/Jyf/Jib/Jib/Jib/Jib/Jyf/KSn/Jib/Jib/Jyf/Jyf/Jyf/Jib/Jyf/Jyf/Jyf/Jyf/Jyf/KCj/Kyv/Ly//Njb/////Jyf/Jyf/Jib/Jyf/KCj/Jyf/Jib/KCj/JibDqjFuAAAAIHRSTlMA9OfUh2NRIvjezMvAq6eabltALRoNCQHgxbSRjnZqOYkdYTcAAACqSURBVDjL7dLJDoMwDEVRJ0DC1AFK6dz6/7+yTcTCVnDcTXe9C1ZHwooe/Cjfnp1m5gax0VCFn44K2gZ0UFAb0F5BRUCdgi4YGvLoGpHNn15ibJdFLhDx9hPEJlx6Sr/hAYTvhiAjISTISsgS1EuoIOgmoZ6g4ZvDvYD4s1oBlWxIAnqwSQqoosgLyKVzS9HI0D1F6d7HdTTxrRSraAbWyxpaDVAb08G/pTfN5TEV8+Yd6gAAAABJRU5ErkJggg==") no-repeat;background-size:100%}.zan_btn .like.gif i{animation:bounceIn .75s;-webkit-animation:bounceIn .75s}.zan_btn .dislike i{background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAGFBMVEUAAAAzMzM3Nzc0NDQ0NDQ0NDQ0NDQzMzOfSulHAAAAB3RSTlMA5Rym7bZJwljvygAAAE1JREFUKM9joA9ILC8XQxMSLy8vRBMqByK8QuzlSKAAmxApoBzOwCsEQUNXCN1D4goQmgkR/OZBEFq1GC6kAgtTJ7gQkyFERFiBYUAAAGMaL0mqYRZMAAAAAElFTkSuQmCC") no-repeat;background-size:100%}.cpc_link_ad{display:block;position:relative;font-size:.65rem;height:1.5rem;line-height:1.5rem;background:#FFFFFF;margin:10px auto;overflow:hidden;text-align:center;padding:0 1.8rem 0 .1rem;border-radius:.2rem;text-overflow:ellipsis;white-space:nowrap;max-width:16rem}.cpc_link_ad:after{content:\'广告\';position:absolute;font-size:.45rem;height:.7rem;line-height:.8rem;color:#e1e1e1;border:1px solid #e1e1e1;right:.1rem;top:.375rem;border-radius:.375rem;padding:0 .25rem}.wx_accounts .wx_inner{margin-bottom:.4rem;position:relative;border:1px solid #DDDDDD;padding:.5rem;border-radius:.2rem}.wx_accounts .wx_inner:after{content:\'作者微信公众号\';position:absolute;font-size:.5rem;line-height:.7rem;left:.6rem;top:-0.35rem;color:#CCCCCC;background:#F6F6F6}.wx_accounts .wx_inner h6{font-size:.6rem;line-height:.8rem;color:#666666;text-align:center;margin-bottom:.2rem}.wx_accounts .wx_inner p{line-height:.7rem;font-size:.5rem;color:#999999}.m-ts-login{position:fixed;left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:2147483647;background:rgba(0,0,0,0.3)}.m-pop-login{width:12rem;height:14.5rem;background:#FFF;border-radius:.5rem;position:fixed;left:50%;top:50%;margin-left:-6rem;margin-top:-7.25rem;text-align:center}.m-pop-login .close{width:1.5rem;height:1.5rem;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAMAAADzN3VRAAAAhFBMVEUAAADo6OixsbGxsbGysrLAwMCxsbGxsbGzs7O1tbWxsbGwsLCxsbGxsbGysrKzs7OysrK1tbW5ubmxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGysrKysrKzs7O5ubmxsbGwsLCxsbGysrKysrKysrKysrKysrKysrKwsLCwsLAioFhCAAAAK3RSTlMAA/jzSgjv4Dsa7KeORDYsJyAT6NrUyLy2rqKclVVPMQ3lz8KDe3Vmh21e4PXWuwAAANFJREFUKM9l0dkOgjAQBdBBK4q7uLMvKur8//95hxQnLfeB0JyknYXIGBon6iIyzEngwzbkiwivPFqEDKEUdA8cmDIvd/jJhGYKG8ARgKxBtz+ZCXO9t4c36GqpAMwPNOQhVBGSO4A8QS1I4BQ5hb5Al/iL7xng5MO4RiAmPx1LGgXNCjC15Y5e0ue96s5SmS3Z7WjmtukMyAjtx2DHWStlugidNBKkw/J0O2UPCduF66o53AKkwRSgKZc9FYAMR58a2jCvyc/uyC1eXNA4cV79ALX7HDbqiEIdAAAAAElFTkSuQmCC") no-repeat center;background-size:.55rem auto;position:absolute;right:.4rem;top:.4rem;transition:all .2s linear;-webkit-transition:all .2s linear}.m-pop-login .close:active{transform:scale(1.1);-webkit-transform:scale(1.1)}.m-pop-login .box{width:5rem;display:block;margin:2.05rem auto .25rem}.m-pop-login .title{font-size:.9rem;color:#333333;line-height:1.2;font-weight:bold;margin:1rem auto .5rem}.m-pop-login .desc{font-size:.7rem;color:#676767;line-height:1.4}.m-pop-login .login-btn{width:9.75rem;height:2rem;line-height:2rem;font-size:.75rem;color:#FFF;margin:.9rem auto 0;display:block;background:#35AF5D;border-radius:.15rem;transition:all .2s linear;-webkit-transition:all .2s linear}.m-pop-login .login-btn:active{background:#2f9b53}.reset_ads{height:0;padding:0 !important}.init_animation{transition:height .2s;height:0}</style>')
    }

    function d() {
      function t(t) {
        if (!t.attr("ahw") && !t.attr("noahw")) {
          var e = [t[0].tagName.toLowerCase()];
          ["id", "class", "href", "src"].forEach(function(n) {
            var i = t.attr(n);
            i && e.push(n + ":" + i)
          });
          var n = e.join("").toLowerCase();
          if (-1 !== n.indexOf("baidu_dup_fp_wrapper") || -1 !== n.indexOf("youku") || -1 !== n.indexOf("cnzz")) return void t.attr("noahw", "white");
          var i = e.join(","); - 1 === i.indexOf("webviewprogressproxy") && t.width() > 0 && t.height() > 0 && ((new Image).src = W + "?cmd=9010&item=103&page_id=1&mark=" + encodeURIComponent(i)), t.remove()
        }
      }

      function e() {
        K("body").children().each(function() {
          try {
            t(K(this))
          } catch (t) {}
        })
      }
      e(), s(e, 1e3, !0)
    }

    function h() {
      nt.isIOS() && 20502 === nt.version || nt.isDangerousUser() || K("body").append('<div id="adContentBottom" class="wad2 wad_bottom reset_ads" ahw="1"></div>')
    }

    function m() {
      K("body").append('<div class="wrap reset_ads" id="adCommentTop" ahw="1"></div>')
    }

    function g() {
      nt.skipAD || nt.isIOS() && 20502 === nt.version || nt.isDangerousUser() || K("body").append('<ins class="wrap" ahw="1"><div id="adContentLink" class="reset_ads wad_bottom"></div></ins>')
    }

    function v() {
      setTimeout(function() {
        if (nt.inApp()) {
          var t = nt.dev ? "http://139.224.15.11:3030/captcha/v2/?cid=47514950895225&uid=" : "//c.innotechx.com/captcha/v2/?cid=47514950895225&uid=",
            e = document.createElement("script");
          e.setAttribute("src", "" + t + nt.memberID);
          document.getElementsByTagName("head")[0].appendChild(e)
        }
      }, 2e3)
    }
    var y = function() {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
          }
        }
        return function(e, n, i) {
          return n && t(e.prototype, n), i && t(e, i), e
        }
      }(),
      b = t("q"),
      w = i(b),
      A = t("./CONST.es6"),
      k = i(A),
      x = t("./TYPES.es6"),
      j = i(x),
      O = t("./typeEqual.es6"),
      C = i(O),
      E = t("./API.es6"),
      D = i(E),
      T = t("./MainBody.es6"),
      z = i(T),
      M = t("./writeScript.es6"),
      I = (i(M), t("./initRead.es6")),
      B = i(I),
      S = t("./initComment.es6"),
      R = i(S),
      P = t("./initHot.es6"),
      L = i(P),
      q = t("../../../common/qukan/Local.es6"),
      N = i(q),
      F = t("../../../common/qukan/SharePurpose.es6"),
      U = t("../../../common/qukan/ShareSource.es6"),
      H = i(U),
      Y = t("../../../common/qukan/BucketSystem.es6"),
      G = i(Y),
      Q = t("../../../common/qukan/CpcAd.es6"),
      J = i(Q),
      _ = t("./notLoginLog.es6"),
      X = i(_),
      K = t("../../../common/libs/zepto.js"),
      Z = t("qs"),
      W = k.default.LOG_GIF_URL,
      V = "//pic.qktoutiao.com/sdk/js/qukan.m.js",
      $ = window.setInterval,
      tt = window.clearInterval,
      et = [];
    window.setInterval = s, window.clearInterval = c, top !== window && "1" !== u("_n302") && (top.location.href = location.href);
    var nt = {
      dtu: 200,
      version: u("v") ? parseInt(u("v")) : 0,
      skipAD: !1,
      memberID: 0,
      key: u("key"),
      ua: navigator.userAgent.toLowerCase(),
      leaveWebView: !1,
      token: location.hash.substr(1),
      dev: -1 !== location.href.indexOf("http://test-static") || u("dev"),
      showCoinTips: !u("showCoinTips") || "1" === u("showCoinTips"),
      qs: u,
      testB: function() {
        return !this.token
      },
      getContentID: function() {
        var t = location.href.match(/\/(\d+).html/);
        return t ? t[1] : null
      },
      inApp: function() {
        return -1 !== nt.ua.indexOf("qukan")
      },
      isXMF: function() {
        return -1 !== nt.ua.indexOf("wifi_android")
      },
      isQKTT: function() {
        return u("qktt") || /html\.qktoutiao\.com/.test(document.referrer)
      },
      isIOS: function() {
        return -1 !== nt.ua.indexOf("iphone")
      },
      isAndroid: function() {
        return -1 !== nt.ua.indexOf("android")
      },
      getApiURl: function() {
        return nt.dev ? k.default.DEV_API_URL : k.default.API_URL
      },
      getRegisterUrl: l,
      isDangerousUser: function() {
        return nt.isIOS() && window.qukanClient && qukanClient.dangerousUser && 1 === qukanClient.dangerousUser()
      },
      udId: u("dc") || "",
      isWeixinBrowser: function() {
        return /micromessenger/i.test(navigator.userAgent)
      }
    };
    nt.skipAD = "1" === u("skip_ad") || !nt.inApp();
    var it = new z.default(nt, K(".article").eq(0));
    window.changeFontSize = function(t) {
      it.setFontSize(t)
    }, window.clientTags = function(t) {
      if (!clientTags._once) {
        clientTags._once = !0;
        try {
          t = JSON.parse(t), t.length && it.setTags(t)
        } catch (t) {}
      }
    }, window.clientCloseWebview = function() {
      nt.leaveWebView = !0
    }, u("fontSize") && changeFontSize(u("fontSize"));
    var ot = {
      contentBottom: "1028653",
      hot1: "1024310",
      hot2: "1024360",
      commentTop: "1028658"
    };
    window.csrr = "http://ad.qutoutiao.net/param?v=" + JSON.stringify({
      channel: "_config" in window ? "" + window._config.type : "",
      lon: u("lat") || "",
      lat: u("lat") || "",
      network: u("network") || ""
    });
    var rt = function() {
        function t() {
          a(this, t);
          var e = new Date,
            n = "reads_" + e.getFullYear() + "_" + (e.getMonth() + 1) + "_" + e.getDate();
          this._l = new N.default(n), this._time = null
        }
        return y(t, [{
          key: "acc",
          value: function() {
            this._l.set(this._l.getInt() + 1)
          }
        }, {
          key: "check",
          value: function() {
            100 === this._l.getInt() && nt.memberID && this._showTips()
          }
        }, {
          key: "_showTips",
          value: function() {
            var t = this,
              e = K('<div ahw="1" class="anttips">\n<div class="box">\n    <a href=""></a>\n</div>\n</div>');
            K("body").append(e), this._stat("item=1&uid=" + nt.memberID), this._time = +new Date;
            var n = setInterval(function() {
              t._stat("item=4&uid=" + nt.memberID + "&time=" + (+new Date - t._time))
            }, 5e3);
            K("a", e).on("touchstart", function() {
              return t._stat("item=2&uid=" + nt.memberID + "&time=" + (+new Date - t._time)), clearInterval(n), e.remove(), !1
            }), e.on("touchstart", function() {
              t._stat("item=3&uid=" + nt.memberID + "&top=" + K(window).scrollTop() + "&time=" + (+new Date - t._time))
            })
          }
        }, {
          key: "_stat",
          value: function(t) {
            (new Image).src = W + "?cmd=9039&" + t
          }
        }]), t
      }(),
      at = new rt,
      st = [p, it.init, function() {
        return D.default.sendView(nt, function() {
          at.check()
        })
      }, function() {
        -1 === location.protocol.indexOf("https") && setTimeout(d, 100)
      }, h, g, function() {
        return (0, B.default)(nt, it, function() {
          return at.acc()
        })
      }, function() {
        it.hideCopy || u("hidech") || (0, L.default)(nt, {
          pos1: function() {
            if (nt.skipAD) return "";
            var t = null;
            return f(j.default.SH) ? t = "1028655" : f(j.default.SSH, j.default.YL, j.default.GX, j.default.QW) ? t = "1028659" : f(j.default.YE, j.default.MS, j.default.QG, j.default.YS, j.default.KJ, j.default.CJ, j.default.QC, j.default.TY, j.default.JS) && (t = "1028660"), ot.hot0 = t, t ? '<div class="custom reset_ads" id="hotAd0"></div>' : ""
          },
          pos2: function() {
            return nt.skipAD ? "" : '<div class="custom reset_ads" id="hotAd1"></div>'
          },
          pos4: function() {
            if (nt.skipAD) return "";
            return ot.hot3 = null, ""
          },
          pos5: function() {
            if (nt.skipAD) return "";
            return ""
          },
          pos7: function() {
            return nt.skipAD ? "" : '<div class="custom reset_ads" id="hotAd2"></div>'
          },
          pos8: function() {
            if (nt.skipAD) return "";
            return ""
          }
        })
      }, function() {
        u("hidech") || m()
      }, function() {
        u("nocomment") || u("hidech") || (0, R.default)(nt)
      }, function() {
        function t(t) {
          var e = document.createElement("script");
          e.src = t, K("head").append(e)
        }
        if (!nt.skipAD) {
          if (Math.random() <= .2) {
            new(function(t) {
              function e(t, n) {
                a(this, e);
                var i = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
                return i._target = K("#adContentLink"), i._target.attr("class", "wad2 wad_bottom"), i
              }
              return r(e, t), y(e, [{
                key: "_render",
                value: function(t) {
                  if (t && (t = JSON.parse(t), t.success)) {
                    var e = JSON.parse(t.ads.native_material.text_icon_snippet);
                    e.target = this._target.get(0), this._target.append('<a class="cpc_link_ad" href="' + e.c_url + '">' + e.title + "</a>"), this._reportMsg(e)
                  }
                }
              }]), e
            }(J.default))("1027962")
          } else ot.contentLink = "1028040";
          K("head").append("<style>ins[id*='QUKANTT_']{background: transparent !important;}ins[id*='QUKANTT_'] iframe{width:100% !important;}#adContentBottom{width: auto !important;}</style>"), K(window).on("message", function(t) {
            var e = t.data;
            if (e && "string" == typeof e && e.indexOf("fillAsyncData") > 0) {
              var n = e.match(/slotid:(\d+)/);
              if (n && n[1]) {
                var i = "QUKANTT_container_" + n[1] + "_0",
                  o = K("#" + i).parent();
                o.addClass("init_animation");
                var r = setInterval(function() {
                  var t = K("ins,div", o).height(),
                    e = o.find("iframe");
                  t && e.length && (clearInterval(r), o.height(t).removeClass("reset_ads"))
                }, 1e3 / 60)
              }
            }
          }), t(V), t("//cpro.baidustatic.com/cpro/ui/cm.js");
          var e = setInterval(function() {
            var t = window._QUKANTT_;
            if (t && window.slotbydup) {
              clearInterval(e), t.init(ot.contentBottom, {
                sync: !1,
                target: "adContentBottom",
                udid: nt.udId
              }), ot.contentLink && t.init(ot.contentLink, {
                sync: !1,
                target: "adContentLink",
                udid: nt.udId
              });
              var n = [function() {
                  ot.hot0 && t.init(ot.hot0, {
                    sync: !1,
                    target: "hotAd0",
                    udid: nt.udId
                  })
                }, function() {
                  ot.hot3 && t.init(ot.hot3, {
                    sync: !1,
                    target: "hotAd3",
                    udid: nt.udId
                  })
                }, function() {
                  t.init(ot.hot1, {
                    sync: !1,
                    target: "hotAd1",
                    udid: nt.udId
                  })
                }, function() {
                  t.init(ot.hot2, {
                    sync: !1,
                    target: "hotAd2",
                    udid: nt.udId
                  })
                }, function() {
                  t.init(ot.commentTop, {
                    sync: !1,
                    target: "adCommentTop",
                    udid: nt.udId
                  })
                }],
                i = 0,
                o = setInterval(function() {
                  n[i](), i++, n.length === i && clearInterval(o)
                }, 100)
            }
          }, 100)
        }
      }, v, X.default.init(nt), function() {
        if (!nt.inApp()) {
          K("body").append('<a class="share_pop" data-pdtu="顶部浮层" href="" ahw="1" style="position:fixed;z-index:2147483647;width:100%;height:2.25rem;top:0;left:0;right: 0;max-width: 16rem;margin:0 auto;">\n    <img src="//h5ssl.1sapp.com/qukan_other/images/art_banner_02.png" style="width: 100%;">\n    </a>'), K(K(".wrap")[0]).css("margin-top", "2.25rem"), K(".share_pop").click(function() {
            return l(K(this).data("pdtu")).then(function(t) {
              location.href = t.url
            }).catch(function(t) {
              location.href = k.default.HOT_SHARE_DOWNLOAD_URL
            }), !1
          })
        }
      }];
    u("ispc") ? document.write(decodeURIComponent("%3Cscript%20src%3D%22http%3A%2F%2Fh5ssl.1sapp.com%2Fweb%2Fdist%2Fstatic%2Fjs%2Fdetails.js%22%3E%3C%2Fscript%3E")) : function() {
      st.forEach(function(t) {
        return t()
      })
    }()
  }, {
    "../../../common/libs/zepto.js": 22,
    "../../../common/qukan/BucketSystem.es6": 23,
    "../../../common/qukan/CpcAd.es6": 25,
    "../../../common/qukan/Local.es6": 27,
    "../../../common/qukan/SharePurpose.es6": 29,
    "../../../common/qukan/ShareSource.es6": 30,
    "./API.es6": 42,
    "./CONST.es6": 43,
    "./MainBody.es6": 45,
    "./TYPES.es6": 46,
    "./initComment.es6": 51,
    "./initHot.es6": 52,
    "./initRead.es6": 53,
    "./notLoginLog.es6": 54,
    "./typeEqual.es6": 57,
    "./writeScript.es6": 60,
    q: 14,
    qs: 16
  }],
  51: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t) {
      function e(t) {
        return "<p><span>" + t.nickname + "</span>：" + t.comment + "</p>"
      }

      function n(t) {
        var n = t.reply_list.length;
        return n ? '<div class="reply">' + t.reply_list.map(function(i, o) {
          var r = "";
          return t.more_reply && o === n - 1 && (r = '<div class="more">\n                            <a href="" data-id="' + t.comment_id + '">展开全部</a>\n                        </div>'), "" + r + e(i)
        }).join("") + "</div>" : ""
      }

      function i(i, a) {
        var c = g(".list", i),
          u = a.map(function(t) {
            var e = (t.avatar || "").replace("http:", ""),
              i = e.indexOf("?");
            return -1 != i && (e = e.substring(0, i)), e += "?imageView2/1/w/64/h/64/q/65", '<div class="item" data-id="' + t.comment_id + '">\n                        <div class="ct">\n                            <p class="nickname">' + t.nickname + '</p>\n                            <p class="time">' + t.create_time + '</p>\n                            <p class="txt">' + t.comment + "</p>\n                        </div>\n                        " + n(t) + '\n                        <img style="visibility: hidden;" data-src="' + e + '" class="pcl face"/>\n                        <a href="" class="pcl lick">' + t.like_num + ' <span class="pcl"></span></a>\n                    </div>'
          });
        c.html(u.join("")), i.show(), g(".lick", c).click(function() {
          var e = g(this),
            n = e.parent().attr("data-id");
          return t.token ? s.default.commentLike(t, n, "add").then(function(t) {
            t.code || e.html(parseInt(e.text()) + 1 + ' <span class="pcl light"></span>')
          }) : t.inApp() ? location.href = "tools?target=login" : location.href = r.default.REGISTER_URL, o.report(1002, 1, 206, e.find(".light").length > 0 ? 1 : 2, null, n, "web", null, {
            contendId: t.getContentID()
          }), !1
        }), g(".reply .more a", c).click(function() {
          var n = g(this),
            i = n.attr("data-id"),
            a = (0, f.default)();
          return s.default.unfoldReply(t, i).then(function(o) {
            if (o.code) d.default.alert(o.message);
            else {
              var a = o.data;
              1 == a.unfold_type ? n.parent().parent().html(a.reply_list.map(function(t) {
                return e(t)
              }).join("")) : t.inApp() ? location.href = "goto?target=comment&content_id=" + t.getContentID() + "&comment_id=" + i : location.href = r.default.REGISTER_URL
            }
          }).fin(function() {
            return a.close()
          }), o.report(1002, 1, 205, null, null, i, "web", null, {
            contentId: t.getContentID()
          }), !1
        })
      }
      if (t.getContentID() && !t.isXMF()) {
        var o = new m.default;
        (0, u.default)('<section id="{root}" class="wrap" ahw="1" style="display: none;">\n                    <div class="comment2">\n                        <div class="th"><span>热门评论</span></div>\n                        <div class="list"></div>\n                        <div class="ctl">\n                            <a href="" class="more">' + (t.isQKTT() ? "打开趣头条，查看所有评论" : "查看更多评论") + " ▾</a>\n                        </div>\n                    </div>\n                </section>").then(function(e) {
          var n = e.get("root");
          s.default.getCommentList(t).then(function(t) {
            !t.code && t.data.length && i(n, t.data)
          }), g(".ctl .more", n).on("click", function() {
            return t.inApp() ? (o.report(1002, 2, 204, null, 4014, t.getContentID(), "web"), location.href = "art?target=showComments") : t.getRegisterUrl().then(function(t) {
              location.href = t.url
            }).catch(function(t) {
              location.href = r.default.REGISTER_URL
            }), !1
          })
        })
      }
    };
    var o = t("./CONST.es6"),
      r = i(o),
      a = t("./API.es6"),
      s = i(a),
      c = t("./writeHtml.es6"),
      u = i(c),
      l = t("../../../common/qukan/loading2Timeout.es6"),
      f = i(l),
      p = t("../../../components2/MessageBox.es6"),
      d = i(p),
      h = t("../../../common/qukan/CallApp.es6"),
      m = i(h),
      g = t("../../../common/libs/zepto.js")
  }, {
    "../../../common/libs/zepto.js": 22,
    "../../../common/qukan/CallApp.es6": 24,
    "../../../common/qukan/loading2Timeout.es6": 36,
    "../../../components2/MessageBox.es6": 39,
    "./API.es6": 42,
    "./CONST.es6": 43,
    "./writeHtml.es6": 59
  }],
  52: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t, e) {
      function n(e, n) {
        for (var i = e, o = p(".insertList1", i), r = p(".insertList2", i), a = p(".list", i), c = [], l = 0, d = n.length; l < d; l++) {
          var m = n[l],
            g = m.cover[0] || "",
            v = g.indexOf("?"); - 1 !== v && (g = g.substring(0, v)), g += "?imageView2/1/w/180/h/120/q/65";
          var y = '<a data-id="' + m.id + '" href="' + m.url + (t.isQKTT() ? "&qktt=1" : "") + '" class="item item_report">\n                                <img class="pcl" style="visibility: hidden;" data-src="' + g.replace("http:", "") + '"/>\n                                <span class="title">' + m.title + "</span>\n                            </a>";
          t.inApp() || (y = '<a href="" class="item share_item">\n                                <img class="pcl" style="visibility: hidden;" data-src="' + g.replace("http:", "") + '"/>\n                                <span class="title title2l">' + m.title + '</span>\n                                <span class="sbtn">下载头条阅读</a>\n                            </a>', 0 === l && ("772819" === t.getContentID() ? y = '<a href="http://yx.fitbtc.com/qu/" class="item">\n                                <img class="pcl" style="visibility: hidden;" data-src="//h5ssl.1sapp.com/qukan_other/images/006.jpg"/>\n                                <span class="title title2">注册送豪礼，天天抽大奖</span>\n                            </a>' : (m = (0, u.default)(h), y = '<a href="' + m.url + '" class="item">\n                                <img class="pcl" style="visibility: hidden;" data-src="' + m.img + '"/>\n                                <span class="title title2l">' + m.title + '</span>\n                                <span class="sbtn">下载趣多拍观看</a>\n                            </a>'))), 0 === l ? o.append(y) : 1 === l ? r.append(y) : c.push(y)
        }
        a.removeClass("preload").append(c.join("")), p(".share_item", i).click(function() {
          return t.getRegisterUrl("相关推荐").then(function(t) {
            location.href = t.url
          }).catch(function(t) {
            location.href = s.default.HOT_SHARE_DOWNLOAD_URL
          }), !1
        }), t.inApp() && new f.default(a, t)
      }
      p("body").append('<section id="recommend" class="wrap" ahw="1">\n                    <div class="hot2">\n                        <div class="th"><span>相关资讯</span></div>\n                        <div class="list preload">\n                            ' + e.pos1() + "\n                            " + e.pos2() + '\n                            <div class="insertList1"></div>\n                            ' + e.pos4() + "\n                            " + e.pos5() + '\n                            <div class="insertList2"></div>\n                            ' + e.pos7() + "\n                            " + e.pos8() + "\n                        </div>\n                    </div>\n                </section>"), r.default.getRecommend(t).then(function(t) {
        var e = p("#recommend");
        !t.code && t.data && t.data.data && t.data.data.length ? n(e, t.data.data) : e.hide()
      })
    };
    var o = t("./API.es6"),
      r = i(o),
      a = t("./CONST.es6"),
      s = i(a),
      c = t("../../../common/qukan/randomArray.es6"),
      u = i(c),
      l = t("./HotReport.es6"),
      f = i(l),
      p = t("../../../common/libs/zepto.js"),
      d = "http://m.jiclip.com/jipai/dest/toqtt/pages/toqtt/article_detail.html",
      h = [{
        img: "//h5ssl.1sapp.com/qukan_other/images/001.png",
        title: "村民喂养蟒蛇九年，蟒蛇报恩，救下溺水儿童",
        url: d
      }, {
        img: "//h5ssl.1sapp.com/qukan_other/images/002.png",
        title: "尴尬！美女夹得疼吗，这么会玩",
        url: d
      }, {
        img: "//h5ssl.1sapp.com/qukan_other/images/003.png",
        title: "肌肉男脱掉睡衣的那一刻，女评委的表情亮了",
        url: d
      }, {
        img: "//h5ssl.1sapp.com/qukan_other/images/004.png",
        title: "男子疯狂整容上千次，只为变成老虎的模样！",
        url: d
      }, {
        img: "//h5ssl.1sapp.com/qukan_other/images/005.png",
        title: "汪星人被主人剃了毛后，整个狗都崩溃了！",
        url: d
      }]
  }, {
    "../../../common/libs/zepto.js": 22,
    "../../../common/qukan/randomArray.es6": 37,
    "./API.es6": 42,
    "./CONST.es6": 43,
    "./HotReport.es6": 44
  }],
  53: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }

    function o(t, e) {
      e = e || 1500;
      var n = '<div ahw="1" id="floating-coin">    <div class="icon"></div>    <div class="th">$title</div>    <div class="amout">$amout</div></div>',
        i = n.replace("$title", t.title).replace("$amout", "+" + t.amout),
        o = u(i).appendTo(u("body"));
      o.show().addClass("bounceIn animated"), setTimeout(function() {
        o.hide().remove()
      }, e)
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), 
    n.default = function(t, e, n) {
      function hasRead() {
        t.leaveWebView || (n && n(), a.default.sendRead(t, function(e) {
          return (!t.isIOS() || 20502 !== t.version) && (!t.isDangerousUser() && void(t.showCoinTips && e && (20403 === t.version || t.qs("hidech") ? location.href = "tools?target=coinTips&value=" + e + "&message=" + encodeURIComponent("阅读奖励") : o({
            title: "阅读奖励",
            amout: e
          }))))
        }))
      }
      var r = !1,
        s = !1;
      setTimeout(function() {
        s = !0
      }, c.default.pageStay);
      var l = setInterval(function() {
          if (e.validRead) {
            var n = u(window).height(),
              i = u(window).scrollTop() + n;
            t.qs("hidech") && window.qukanClient && window.qukanClient.getScrollHeight && (i = window.qukanClient.getScrollHeight() + window.qukanClient.getScrollTop()), i / e.height >= c.default.viewHeight && (r = !0, clearInterval(l))
          }
        }, 100),
        f = setInterval(function() {
          s && r && (clearInterval(f), hasRead())
        }, 100)
    };
    var r = t("./API.es6"),
      a = i(r),
      s = t("./validReadConfig.es6"),
      c = i(s),
      u = t("../../../common/libs/zepto.js")
  }, {
    "../../../common/libs/zepto.js": 22,
    "./API.es6": 42,
    "./validReadConfig.es6": 58
  }],
  54: [function(t, e, n) {
    "use strict";

    function i(t) {
      return t && t.__esModule ? t : {
        default: t
      }
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var o = t("./CONST.es6"),
      r = i(o),
      a = t("./storage.es6"),
      s = i(a),
      c = t("../../../common/libs/zepto.js"),
      u = r.default.LOG_GIF_URL,
      l = {
        show: function() {
          c("body").append('\n        <div class="m-ts-login" ahw="1" >\n            <div class="m-pop-login bounceIn">\n                <span class="close" id="tsLoginClose"></span>\n                <img class="box" src="//static.1sapp.com/image/sp/2017/10/28/f625036deff4910697c93b1ecf0258d3.png" />\n                <p class="title">登录阅读领金币</p>\n                <p class="desc">登录后阅读可以获得金币<br>金币可以兑换提现哦</p>\n                <a href="javascript:;" class="login-btn" id="loginBtn">去登录</a>\n            </div>\n        </div>'), c("#tsLoginClose").on("click", function() {
            c(".m-ts-login").remove()
          }), c("#loginBtn").on("click", function() {
            f.report(2), f.setReadLog("logStatus", !1), location.href = "tools?target=login"
          }), f.write(!0), c("head").append("<style>[style*='2147483647']{z-index:2147483646 !important;}</style>")
        },
        close: function() {
          c(".m-ts-login").remove()
        }
      },
      f = {
        env: {},
        init: function(t) {
          return this.env = t,
            function() {
              t.qs("hidech") || (f.initLoginLog(), f.write(), f.check() && (f.report(1), l.show()))
            }
        },
        check: function() {
          var t = this.env;
          if (t.inApp() && !t.token) {
            var e = s.default.get("readLog");
            if (!e) return !1;
            e = JSON.parse(e);
            var n = e.num,
              i = void 0;
            i = t.dev ? r.default.READ_CONFIG.dev : r.default.READ_CONFIG.prod;
            var o = i.list,
              a = o.findIndex(function(t) {
                return t.num == n
              });
            if (a > -1) return f.setReadLog("lastType", ++a), !0;
            if (n > o[4].num) {
              var c = e.lastTime;
              return f.checkTime(c, i.time)
            }
            return !1
          }
          return !1
        },
        write: function(t) {
          var e = this.env;
          if (e.inApp() && !e.token) {
            var n = f.get();
            t ? n.lastTime = +new Date : (n.update = +new Date, n.num += 1), s.default.set("readLog", JSON.stringify(n))
          }
        },
        get: function() {
          var t = s.default.get("readLog");
          return t = t ? JSON.parse(t) : {
            lastType: "0",
            logStatus: !0,
            lastTime: 0,
            update: 0,
            num: 0
          }
        },
        initLoginLog: function() {
          var t = this.env;
          if (t.inApp() && t.token) {
            f.get().logStatus || (f.report(3), f.setReadLog("logStatus", !0))
          }
        },
        setReadLog: function(t, e) {
          var n = f.get();
          n[t] = e, s.default.set("readLog", JSON.stringify(n))
        },
        checkTime: function(t, e) {
          var n = new Date((new Date).setHours(0, 0, 0, 0));
          return t = new Date(new Date(t).setHours(0, 0, 0, 0)), n - t >= 24 * e * 60 * 60 * 1e3 && (f.setReadLog("lastType", 6), !0)
        },
        report: function(t) {
          var e = f.get();
          (new Image).src = u + "?cmd=9055&position=" + e.lastType + "&type=" + t
        }
      };
    n.default = f
  }, {
    "../../../common/libs/zepto.js": 22,
    "./CONST.es6": 43,
    "./storage.es6": 56
  }],
  55: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t, e) {
      console.log("sendJSError", t, e);
      var n = [];
      n.push("type=jserror"), n.push("type=" + t), n.push("message=" + e), (new Image).src = "//log.aimodou.net/qukan/trackAnalysis/a.html?" + n.join("&")
    }
  }, {}],
  56: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var i = t("./cookie.es6"),
      o = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(i),
      r = window.qukanClient,
      a = {
        set: function(t, e) {
          if (r && r.localWrite && "function" == typeof r.localWrite) r.localWrite(t, e);
          else if (window.localStorage) try {
            window.localStorage[t] = e
          } catch (n) {
            o.default.set(t, e, 0)
          } else o.default.set(t, e, 0)
        },
        get: function(t) {
          if (r && r.localRead && "function" == typeof r.localRead) return r.localRead(t);
          if (!window.localStorage) return o.default.get(t);
          try {
            return window.localStorage[t]
          } catch (e) {
            return o.default.get(t)
          }
        }
      };
    n.default = a
  }, {
    "./cookie.es6": 47
  }],
  57: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t) {
      return "_config" in window && _config.type === t
    }
  }, {}],
  58: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var i = t("../../../common/qukan/Env.es6"),
      o = function(t) {
        return t && t.__esModule ? t : {
          default: t
        }
      }(i),
      r = "1" === o.default.qs("fqc_flag"),
      a = {
        newUser: {
          lookAll: 0,
          pageStay: 8e3,
          viewHeight: .5
        },
        normalUser: {
          lookAll: 3e3,
          pageStay: 12e3,
          viewHeight: .9
        }
      };
    n.default = r ? a.newUser : a.normalUser
  }, {
    "../../../common/qukan/Env.es6": 26
  }],
  59: [function(t, e, n) {
    "use strict";

    function i(t, e) {
      if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o() {
      return "_write_html" + c++
    }
    Object.defineProperty(n, "__esModule", {
      value: !0
    });
    var r = function() {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
      }
      return function(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
      }
    }();
    n.default = function(t) {
      var e = [];
      t = t.replace(/(\{[_0-9a-zA-Z]+\})/g, function(t) {
        var n = o();
        return e.push({
          key: t.substring(1, t.length - 1),
          id: n,
          el: null
        }), n
      }), document.write(t);
      var n = s.defer(),
        i = e.length,
        r = setInterval(function() {
          e.forEach(function(t) {
            if (!t.el) {
              var o = a("#" + t.id);
              o.length && (t.el = o, i--)
            }
            i || (clearInterval(r), n.resolve(new u(e)))
          })
        }, 100);
      return n.promise
    };
    var a = t("../../../common/libs/zepto.js"),
      s = t("q"),
      c = 0,
      u = function() {
        function t(e) {
          i(this, t), this._ids = e
        }
        return r(t, [{
          key: "get",
          value: function(t) {
            var e = this._ids.filter(function(e) {
              return e.key == t
            });
            return e.length ? e[0].el : 0
          }
        }]), t
      }()
  }, {
    "../../../common/libs/zepto.js": 22,
    q: 14
  }],
  60: [function(t, e, n) {
    "use strict";
    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = function(t, e) {
      var n = decodeURIComponent("%3Cscript"),
        i = decodeURIComponent("%3E"),
        o = decodeURIComponent("%3C%2Fscript%3E");
      return n + (t ? ' src="' + t + '"' : "") + i + (e || "") + o
    }
  }, {}]
}, {}, [50]);