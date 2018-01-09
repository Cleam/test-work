(function(b) {
  var a = {
    fullName: "$baseName.Utility",
    version: "1.0.0",
    register: function() {
      this.browser = this.browser || {};
      if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
        this.browser.ie = document.documentMode || +RegExp["\x241"]
      }
      if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
        this.browser.opera = +RegExp["\x241"]
      }
      if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
        this.browser.firefox = +RegExp["\x241"]
      }
      if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent)) {
        this.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
      }
      if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
        this.browser.chrome = +RegExp["\x241"]
      }
      try {
        if (/(\d+\.\d)/.test(external.max_version)) {
          this.browser.maxthon = +RegExp["\x241"]
        }
      } catch (c) {}
      this.browser.isWebkit = /webkit/i.test(navigator.userAgent);
      this.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
      this.browser.isStrict = document.compatMode == "CSS1Compat"
    },
    browser: {},
    isWindow: function(e) {
      var c = false;
      try {
        if (e && typeof e === "object" && e.document && "setInterval" in e) {
          c = true
        }
      } catch (d) {
        c = false
      }
      return c
    },
    isInIframe: function(c) {
      c = c || window;
      return c != window.top && c != c.parent
    },
    isInCrossDomainIframe: function(g, d) {
      var c = false;
      g = g || window;
      d = d || window.top;
      parentWin = g.parent;
      var f = 0;
      while ((g != d || g != g.parent) && f < 10) {
        f++;
        if (this.isWindow(g) && this.isWindow(g.parent)) {
          try {
            g.parent.location.toString()
          } catch (e) {
            c = true;
            break
          }
        } else {
          c = true;
          break
        }
        g = g.parent
      }
      if (f >= 10) {
        c = true
      }
      return c
    },
    g: function(d, c) {
      c = c || window;
      if ("string" === typeof d || d instanceof String) {
        return c.document.getElementById(d)
      } else {
        if (d && d.nodeName && (d.nodeType == 1 || d.nodeType == 9)) {
          return d
        }
      }
      return d
    },
    sendRequestViaImage: function(d, e) {
      var c = new Image();
      var f = "cx_log_" + Math.floor(Math.random() * 2147483648).toString(36);
      e = e || window;
      e[f] = c;
      c.onload = c.onerror = c.onabort = function() {
        c.onload = c.onerror = c.onabort = null;
        e[f] = null;
        c = null
      };
      c.src = d
    },
    getDocument: function(c) {
      if (!c) {
        return document
      }
      c = this.g(c);
      return c.nodeType == 9 ? c : c.ownerDocument || c.document
    },
    getWindow: function(c) {
      c = this.g(c);
      var d = this.getDocument(c);
      return d.parentWindow || d.defaultView || null
    },
    getTopWindow: function(c) {
      c = c || window;
      if (this.isInIframe(c) && !this.isInCrossDomainIframe(c, c.top) && this.isWindow(c.top)) {
        return c.top
      }
      return c
    },
    bind: function(c, d, e) {
      c = this.g(c);
      d = d.replace(/^on/i, "").toLowerCase();
      if (c.addEventListener) {
        c.addEventListener(d, e, false)
      } else {
        if (c.attachEvent) {
          c.attachEvent("on" + d, e)
        }
      }
      return c
    },
    proxy: function(d, c) {
      var f = d;
      var e = c;
      return function() {
        return f.apply(e || {}, arguments)
      }
    },
    getStyle: function(e, d) {
      var c;
      e = this.g(e);
      var g = this.getDocument(e);
      var h = "";
      if (d.indexOf("-") > -1) {
        h = d.replace(/[-_][^-_]{1}/g, function(i) {
          return i.charAt(1).toUpperCase()
        })
      } else {
        h = d.replace(/[A-Z]{1}/g, function(i) {
          return "-" + i.charAt(0).toLowerCase()
        })
      }
      var f;
      if (g && g.defaultView && g.defaultView.getComputedStyle) {
        f = g.defaultView.getComputedStyle(e, null);
        if (f) {
          c = f.getPropertyValue(d)
        }
        if (typeof c !== "boolean" && !c) {
          c = f.getPropertyValue(h)
        }
      } else {
        if (e.currentStyle) {
          f = e.currentStyle;
          if (f) {
            c = f[d]
          }
          if (typeof c !== "boolean" && !c) {
            c = f[h]
          }
        }
      }
      return c
    },
    getPositionCore: function(c) {
      c = this.g(c);
      var k = this.getDocument(c),
        f = this.browser,
        d = f.isGecko > 0 && k.getBoxObjectFor && this.getStyle(c, "position") == "absolute" && (c.style.top === "" || c.style.left === ""),
        i = {
          left: 0,
          top: 0
        },
        h = (f.ie && !f.isStrict) ? k.body : k.documentElement,
        l, e;
      if (c == h) {
        return i
      }
      if (c.getBoundingClientRect) {
        e = c.getBoundingClientRect();
        i.left = Math.floor(e.left) + Math.max(k.documentElement.scrollLeft, k.body.scrollLeft);
        i.top = Math.floor(e.top) + Math.max(k.documentElement.scrollTop, k.body.scrollTop);
        i.left -= k.documentElement.clientLeft;
        i.top -= k.documentElement.clientTop;
        var j = k.body,
          m = parseInt(this.getStyle(j, "borderLeftWidth")),
          g = parseInt(this.getStyle(j, "borderTopWidth"));
        if (f.ie && !f.isStrict) {
          i.left -= isNaN(m) ? 2 : m;
          i.top -= isNaN(g) ? 2 : g
        }
      } else {
        l = c;
        do {
          i.left += l.offsetLeft;
          i.top += l.offsetTop;
          if (f.isWebkit > 0 && this.getStyle(l, "position") == "fixed") {
            i.left += k.body.scrollLeft;
            i.top += k.body.scrollTop;
            break
          }
          l = l.offsetParent
        } while (l && l != c);
        if (f.opera > 0 || (f.isWebkit > 0 && this.getStyle(c, "position") == "absolute")) {
          i.top -= k.body.offsetTop
        }
        l = c.offsetParent;
        while (l && l != k.body) {
          i.left -= l.scrollLeft;
          if (!f.opera || l.tagName != "TR") {
            i.top -= l.scrollTop
          }
          l = l.offsetParent
        }
      }
      return i
    },
    getPosition: function(h, g) {
      g = g || window;
      var e = this.g(h, g);
      if (!e) {
        return
      }
      var c = this.getPositionCore(e);
      var d;
      var f = 10;
      count = 0;
      while (g != g.parent && count < f) {
        count++;
        d = {
          top: 0,
          left: 0
        };
        if (!this.isInCrossDomainIframe(g, g.parent) && g.frameElement) {
          d = this.getPositionCore(g.frameElement)
        } else {
          break
        }
        c.left += d.left;
        c.top += d.top;
        g = g.parent
      }
      return c
    },
    getOuterWidth: function(e, d) {
      e = this.g(e);
      d = d || false;
      var c = e.offsetWidth;
      if (d) {
        var g = this.getStyle(e, "marginLeft").toString().toLowerCase().replace("px", "").replace("auto", "0");
        var f = this.getStyle(e, "marginRight").toString().toLowerCase().replace("px", "").replace("auto", "0");
        c = c + parseInt(g || 0) + parseInt(f || 0)
      }
      return c
    },
    getOuterHeight: function(e, d) {
      e = this.g(e);
      d = d || false;
      var c = e.offsetHeight;
      if (d) {
        var f = this.getStyle(e, "marginTop").toString().toLowerCase().replace("px", "").replace("auto", "0");
        var g = this.getStyle(e, "marginBottom").toString().toLowerCase().replace("px", "").replace("auto", "0");
        c = c + parseInt(f || 0) + parseInt(g || 0)
      }
      return c
    },
    getTopIframe: function(f) {
      var c = this.g(f);
      var d = this.getWindow(c);
      var e = 0;
      if (this.isInIframe(window) && !this.isInCrossDomainIframe(window)) {
        while (d.parent != window.top && e < 10) {
          e++;
          d = d.parent
        }
        if (e < 10) {
          c = d.frameElement || c
        }
      }
      return c
    },
    getOpacityInWin: function(k) {
      var j = this.g(k);
      var h = this.getWindow(j);
      var c = 100;
      var f = j;
      var i;
      try {
        while (f && f.tagName) {
          i = 100;
          if (this.browser.ie) {
            if (this.browser.ie > 5) {
              try {
                i = f.filters.alpha.opacity || 100
              } catch (g) {}
            }
            c = c > i ? i : c
          } else {
            try {
              i = (h.getComputedStyle(f, null).opacity || 1) * 100
            } catch (g) {}
            c = c * (i / 100)
          }
          f = f.parentNode
        }
      } catch (d) {}
      return c || 100
    },
    getOpacity: function(i) {
      var h = this.g(i);
      var g = this.getWindow(h);
      var c = this.getOpacityInWin(h);
      var d = 100;
      var e = 0,
        f = 10;
      while (this.isInIframe(g)) {
        e++;
        if (!this.isInCrossDomainIframe(g, g.parent)) {
          d = 100;
          if (g.frameElement) {
            d = this.getOpacityInWin(g.frameElement)
          }
          c = c * (d / 100)
        } else {
          break
        }
        g = g.parent
      }
      return c
    },
    dateToString: function(d, c) {
      var g = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours() % 12 == 0 ? 12 : d.getHours() % 12,
        "H+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        S: d.getMilliseconds()
      };
      var f = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
      };
      if (/(y+)/.test(c)) {
        c = c.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length))
      }
      if (/(E+)/.test(c)) {
        c = c.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + f[d.getDay() + ""])
      }
      for (var e in g) {
        if (new RegExp("(" + e + ")").test(c)) {
          c = c.replace(RegExp.$1, (RegExp.$1.length == 1) ? (g[e]) : (("00" + g[e]).substr(("" + g[e]).length)))
        }
      }
      return c
    },
    param: function(h, i) {
      var c = new Array(),
        g, f, d;
      for (var e in h) {
        d = true;
        if (i) {
          g = i[e] ? i[e] : e;
          d = i[e] ? true : false
        }
        if (!d) {
          continue
        }
        var f = h[e];
        switch (typeof f) {
          case "string":
          case "number":
            c.push(g + "=" + f.toString());
            break;
          case "boolean":
            c.push(g + "=" + (f ? "1" : "0"));
            break;
          case "object":
            if (f instanceof Date) {
              c.push(g + "=" + this.dateToString(f, "yyyyMMddhhmmssS"))
            }
            break;
          default:
            break
        }
      }
      return c.join("&")
    },
    getLength: function(e) {
      var c = 0;
      if (typeof e === "object") {
        if (e instanceof Array) {
          c = e.length
        } else {
          var d;
          for (d in e) {
            if (d) {
              c++
            }
          }
        }
      }
      return c
    },
    encodeByMove: function(j, c) {
      if (!j) {
        return ""
      }
      var e = 4,
        c = c || 1,
        h = c * e,
        k = c * 1,
        d = [],
        g = 0;
      for (var f = 0; f < j.length; f++) {
        g = j[f].charCodeAt();
        g -= h;
        d.push(String.fromCharCode(g));
        if (h <= -1 * e || h >= e) {
          k = -1 * k
        }
        h += k
      }
      return d.join("")
    },
    md5: function(s) {
      function N(d, c) {
        return (d << c) | (d >>> (32 - c))
      }

      function M(F, d) {
        var H, c, x, G, k;
        x = (F & 2147483648);
        G = (d & 2147483648);
        H = (F & 1073741824);
        c = (d & 1073741824);
        k = (F & 1073741823) + (d & 1073741823);
        if (H & c) {
          return (k ^ 2147483648 ^ x ^ G)
        }
        if (H | c) {
          if (k & 1073741824) {
            return (k ^ 3221225472 ^ x ^ G)
          } else {
            return (k ^ 1073741824 ^ x ^ G)
          }
        } else {
          return (k ^ x ^ G)
        }
      }

      function r(c, k, d) {
        return (c & k) | ((~c) & d)
      }

      function q(c, k, d) {
        return (c & d) | (k & (~d))
      }

      function p(c, k, d) {
        return (c ^ k ^ d)
      }

      function n(c, k, d) {
        return (k ^ (c | (~d)))
      }

      function u(G, F, ac, ab, k, H, I) {
        G = M(G, M(M(r(F, ac, ab), k), I));
        return M(N(G, H), F)
      }

      function g(G, F, ac, ab, k, H, I) {
        G = M(G, M(M(q(F, ac, ab), k), I));
        return M(N(G, H), F)
      }

      function J(G, F, ac, ab, k, H, I) {
        G = M(G, M(M(p(F, ac, ab), k), I));
        return M(N(G, H), F)
      }

      function t(G, F, ac, ab, k, H, I) {
        G = M(G, M(M(n(F, ac, ab), k), I));
        return M(N(G, H), F)
      }

      function e(F) {
        var I;
        var x = F.length;
        var k = x + 8;
        var d = (k - (k % 64)) / 64;
        var H = (d + 1) * 16;
        var ab = Array(H - 1);
        var c = 0;
        var G = 0;
        while (G < x) {
          I = (G - (G % 4)) / 4;
          c = (G % 4) * 8;
          ab[I] = (ab[I] | (F.charCodeAt(G) << c));
          G++
        }
        I = (G - (G % 4)) / 4;
        c = (G % 4) * 8;
        ab[I] = ab[I] | (128 << c);
        ab[H - 2] = x << 3;
        ab[H - 1] = x >>> 29;
        return ab
      }

      function D(k) {
        var d = "",
          x = "",
          F, c;
        for (c = 0; c <= 3; c++) {
          F = (k >>> (c * 8)) & 255;
          x = "0" + F.toString(16);
          d = d + x.substr(x.length - 2, 2)
        }
        return d
      }

      function L(k) {
        k = k.replace(/\r\n/g, "\n");
        var d = "";
        for (var F = 0; F < k.length; F++) {
          var x = k.charCodeAt(F);
          if (x < 128) {
            d += String.fromCharCode(x)
          } else {
            if ((x > 127) && (x < 2048)) {
              d += String.fromCharCode((x >> 6) | 192);
              d += String.fromCharCode((x & 63) | 128)
            } else {
              d += String.fromCharCode((x >> 12) | 224);
              d += String.fromCharCode(((x >> 6) & 63) | 128);
              d += String.fromCharCode((x & 63) | 128)
            }
          }
        }
        return d
      }
      var E = Array();
      var R, i, K, v, h, aa, Z, Y, X;
      var U = 7,
        S = 12,
        P = 17,
        O = 22;
      var B = 5,
        A = 9,
        z = 14,
        y = 20;
      var o = 4,
        m = 11,
        l = 16,
        j = 23;
      var W = 6,
        V = 10,
        T = 15,
        Q = 21;
      s = L(s);
      E = e(s);
      aa = 1732584193;
      Z = 4023233417;
      Y = 2562383102;
      X = 271733878;
      for (R = 0; R < E.length; R += 16) {
        i = aa;
        K = Z;
        v = Y;
        h = X;
        aa = u(aa, Z, Y, X, E[R + 0], U, 3614090360);
        X = u(X, aa, Z, Y, E[R + 1], S, 3905402710);
        Y = u(Y, X, aa, Z, E[R + 2], P, 606105819);
        Z = u(Z, Y, X, aa, E[R + 3], O, 3250441966);
        aa = u(aa, Z, Y, X, E[R + 4], U, 4118548399);
        X = u(X, aa, Z, Y, E[R + 5], S, 1200080426);
        Y = u(Y, X, aa, Z, E[R + 6], P, 2821735955);
        Z = u(Z, Y, X, aa, E[R + 7], O, 4249261313);
        aa = u(aa, Z, Y, X, E[R + 8], U, 1770035416);
        X = u(X, aa, Z, Y, E[R + 9], S, 2336552879);
        Y = u(Y, X, aa, Z, E[R + 10], P, 4294925233);
        Z = u(Z, Y, X, aa, E[R + 11], O, 2304563134);
        aa = u(aa, Z, Y, X, E[R + 12], U, 1804603682);
        X = u(X, aa, Z, Y, E[R + 13], S, 4254626195);
        Y = u(Y, X, aa, Z, E[R + 14], P, 2792965006);
        Z = u(Z, Y, X, aa, E[R + 15], O, 1236535329);
        aa = g(aa, Z, Y, X, E[R + 1], B, 4129170786);
        X = g(X, aa, Z, Y, E[R + 6], A, 3225465664);
        Y = g(Y, X, aa, Z, E[R + 11], z, 643717713);
        Z = g(Z, Y, X, aa, E[R + 0], y, 3921069994);
        aa = g(aa, Z, Y, X, E[R + 5], B, 3593408605);
        X = g(X, aa, Z, Y, E[R + 10], A, 38016083);
        Y = g(Y, X, aa, Z, E[R + 15], z, 3634488961);
        Z = g(Z, Y, X, aa, E[R + 4], y, 3889429448);
        aa = g(aa, Z, Y, X, E[R + 9], B, 568446438);
        X = g(X, aa, Z, Y, E[R + 14], A, 3275163606);
        Y = g(Y, X, aa, Z, E[R + 3], z, 4107603335);
        Z = g(Z, Y, X, aa, E[R + 8], y, 1163531501);
        aa = g(aa, Z, Y, X, E[R + 13], B, 2850285829);
        X = g(X, aa, Z, Y, E[R + 2], A, 4243563512);
        Y = g(Y, X, aa, Z, E[R + 7], z, 1735328473);
        Z = g(Z, Y, X, aa, E[R + 12], y, 2368359562);
        aa = J(aa, Z, Y, X, E[R + 5], o, 4294588738);
        X = J(X, aa, Z, Y, E[R + 8], m, 2272392833);
        Y = J(Y, X, aa, Z, E[R + 11], l, 1839030562);
        Z = J(Z, Y, X, aa, E[R + 14], j, 4259657740);
        aa = J(aa, Z, Y, X, E[R + 1], o, 2763975236);
        X = J(X, aa, Z, Y, E[R + 4], m, 1272893353);
        Y = J(Y, X, aa, Z, E[R + 7], l, 4139469664);
        Z = J(Z, Y, X, aa, E[R + 10], j, 3200236656);
        aa = J(aa, Z, Y, X, E[R + 13], o, 681279174);
        X = J(X, aa, Z, Y, E[R + 0], m, 3936430074);
        Y = J(Y, X, aa, Z, E[R + 3], l, 3572445317);
        Z = J(Z, Y, X, aa, E[R + 6], j, 76029189);
        aa = J(aa, Z, Y, X, E[R + 9], o, 3654602809);
        X = J(X, aa, Z, Y, E[R + 12], m, 3873151461);
        Y = J(Y, X, aa, Z, E[R + 15], l, 530742520);
        Z = J(Z, Y, X, aa, E[R + 2], j, 3299628645);
        aa = t(aa, Z, Y, X, E[R + 0], W, 4096336452);
        X = t(X, aa, Z, Y, E[R + 7], V, 1126891415);
        Y = t(Y, X, aa, Z, E[R + 14], T, 2878612391);
        Z = t(Z, Y, X, aa, E[R + 5], Q, 4237533241);
        aa = t(aa, Z, Y, X, E[R + 12], W, 1700485571);
        X = t(X, aa, Z, Y, E[R + 3], V, 2399980690);
        Y = t(Y, X, aa, Z, E[R + 10], T, 4293915773);
        Z = t(Z, Y, X, aa, E[R + 1], Q, 2240044497);
        aa = t(aa, Z, Y, X, E[R + 8], W, 1873313359);
        X = t(X, aa, Z, Y, E[R + 15], V, 4264355552);
        Y = t(Y, X, aa, Z, E[R + 6], T, 2734768916);
        Z = t(Z, Y, X, aa, E[R + 13], Q, 1309151649);
        aa = t(aa, Z, Y, X, E[R + 4], W, 4149444226);
        X = t(X, aa, Z, Y, E[R + 11], V, 3174756917);
        Y = t(Y, X, aa, Z, E[R + 2], T, 718787259);
        Z = t(Z, Y, X, aa, E[R + 9], Q, 3951481745);
        aa = M(aa, i);
        Z = M(Z, K);
        Y = M(Y, v);
        X = M(X, h)
      }
      var w = function(x) {
        var c = x;
        for (var d = 0, k = 8 - x.length; d < k; d++) {
          c = "0" + c
        }
        return c
      };
      var C = ((parseInt("0x" + D(aa), 16) + parseInt("0x" + D(Z), 16)) % 4294967296).toString(16);
      var f = ((parseInt("0x" + D(Y), 16) + parseInt("0x" + D(X), 16)) % 4294967296).toString(16);
      if (C.length < 8) {
        C = w(C)
      }
      if (f.length < 8) {
        f = w(f)
      }
      return C + f
    },
    getScrollWidth: function(d) {
      try {
        d = d || window;
        if (d.document.compatMode === "BackCompat") {
          return d.document.body.scrollWidth
        } else {
          return d.document.documentElement.scrollWidth
        }
      } catch (c) {
        return 0
      }
    },
    getScrollHeight: function(d) {
      try {
        d = d || window;
        if (d.document.compatMode === "BackCompat") {
          return d.document.body.scrollHeight
        } else {
          return d.document.documentElement.scrollHeight
        }
      } catch (c) {
        return 0
      }
    },
    getClientWidth: function(d) {
      try {
        d = d || window;
        if (d.document.compatMode === "BackCompat") {
          return d.document.body.clientWidth
        } else {
          return d.document.documentElement.clientWidth
        }
      } catch (c) {
        return 0
      }
    },
    getClientHeight: function(d) {
      try {
        d = d || window;
        if (d.document.compatMode === "BackCompat") {
          return d.document.body.clientHeight
        } else {
          return d.document.documentElement.clientHeight
        }
      } catch (c) {
        return 0
      }
    },
    getScrollTop: function(c) {
      c = c || window;
      var e = c.document;
      return c.pageYOffset || e.documentElement.scrollTop || e.body.scrollTop
    },
    getScrollLeft: function(c) {
      c = c || window;
      var e = c.document;
      return c.pageXOffset || e.documentElement.scrollLeft || e.body.scrollLeft
    },
    escapeToEncode: function(d) {
      var c = d || "";
      if (c) {
        c = c.replace(/%u[\d|\w]{4}/g, function(e) {
          return encodeURIComponent(unescape(e))
        })
      }
      return c
    },
    template: function(e, d) {
      var c = /{(.*?)}/g;
      return e.replace(c, function(h, g, f, i) {
        return d[g] || ""
      })
    },
    extend: function(e, c) {
      for (var d in c) {
        if (c.hasOwnProperty(d)) {
          e[d] = c[d]
        }
      }
      return e
    },
    log: function(f, d) {
      d = typeof d === "undefined" ? true : false;
      if (!this.logMsg) {
        this.logMsg = document.getElementById("baiduCproLogMsg");
        if (!this.logMsg) {
          return
        }
      }
      var c = new Array();
      if (typeof(f) === "object") {
        for (var e in f) {
          if (e !== "analysisUrl") {
            c.push(e + ":" + f[e])
          }
        }
      } else {
        c.push("" + f)
      }
      this.logMsg.innerHTML = d ? this.logMsg.innerHTML : "";
      this.logMsg.innerHTML += c.join("<br/>") + "<br/>"
    },
    getCookieRaw: function(d, h) {
      var c;
      var h = h || window;
      var g = h.document;
      var e = new RegExp("(^| )" + d + "=([^;]*)(;|\x24)");
      var f = e.exec(g.cookie);
      if (f) {
        c = f[2]
      }
      return c
    },
    setCookieRaw: function(e, f, d) {
      d = d || {};
      var c = d.expires;
      if ("number" == typeof d.expires) {
        c = new Date();
        c.setTime(c.getTime() + d.expires)
      }
      document.cookie = e + "=" + f + (d.path ? "; path=" + d.path : "") + (c ? "; expires=" + c.toGMTString() : "") + (d.domain ? "; domain=" + d.domain : "") + (d.secure ? "; secure" : "")
    },
    jsonToObj: function(c) {
      return (new Function("return " + c))()
    },
    getUrlQueryValue: function(d, e) {
      var f = new RegExp("(^|&|\\?|#)" + e + "=([^&]*)(&|\x24)", "");
      var c = d.match(f);
      if (c) {
        return c[2]
      }
      return null
    },
    ready: function(h, d, g) {
      g = g || this.win || window;
      var f = g.document;
      d = d || 0;
      this.domReadyMonitorRunTimes = 0;
      this.readyFuncArray = this.readyFuncArray || [];
      this.readyFuncArray.push({
        func: h,
        delay: d,
        done: false
      });
      var c = this.proxy(function() {
        var n = false;
        this.domReadyMonitorRunTimes++;
        var r = false;
        try {
          if (g.frameElement) {
            r = true
          }
        } catch (s) {
          r = true
        }
        if (this.browser.ie && this.browser.ie < 9 && !r) {
          try {
            f.documentElement.doScroll("left");
            n = true
          } catch (q) {}
        } else {
          if (f.readyState === "complete" || this.domContentLoaded) {
            n = true
          } else {
            if (this.domReadyMonitorRunTimes > 300000) {
              if (this.domReadyMonitorId) {
                g.clearInterval(this.domReadyMonitorId);
                this.domReadyMonitorId = null
              }
              return
            }
          }
        }
        if (n) {
          try {
            if (this.readyFuncArray && this.readyFuncArray.length) {
              for (var k = 0, m = this.readyFuncArray.length; k < m; k++) {
                var l = this.readyFuncArray[k];
                if (!l || !l.func || l.done) {
                  continue
                }
                if (!l.delay) {
                  l.done = true;
                  l.func()
                } else {
                  l.done = true;
                  g.setTimeout(l.func, l.delay)
                }
              }
            }
          } catch (j) {
            throw j
          } finally {
            if (this.domReadyMonitorId) {
              g.clearInterval(this.domReadyMonitorId);
              this.domReadyMonitorId = null
            }
          }
        }
      }, this);
      var e = this.proxy(function() {
        this.domContentLoaded = true;
        c()
      }, this);
      if (!this.domReadyMonitorStarted) {
        this.domReadyMonitorStarted = true;
        this.domReadyMonitorId = g.setInterval(c, 50);
        if (f.addEventListener) {
          f.addEventListener("DOMContentLoaded", e, false);
          g.addEventListener("load", e, false)
        } else {
          if (f.attachEvent) {
            g.attachEvent("onload", e, false)
          }
        }
      }
    },
    canFixed: function() {
      var c = true;
      if (this.browser.ie && (this.browser.ie < 7 || document.compatMode === "BackCompat")) {
        c = false
      }
      return c
    },
    getPara: function(k) {
      var j = {};
      if (k && typeof k == "string" && k.indexOf("?") > -1) {
        var f = k.split("?")[1].split("&");
        for (var g = 0, c = f.length; g < c; g++) {
          var d = f[g].split("=");
          var e = d[0];
          var h = d[1];
          j[e] = h
        }
      }
      return j
    },
    ajaxLoad: function(e, j, h, d, i, g) {
      if (!e) {
        return null
      }
      h = h || "";
      if (typeof(d) !== "boolean") {
        d = false
      }
      if (!d) {
        if (e.indexOf("?") < 0) {
          e += "?"
        }
        e += "&_nocache_=" + Math.random()
      }
      var c = ["GET", "POST", "get", "post"];
      if (c.indexOf(i) < 0) {
        i = "GET"
      }
      if (typeof g !== "boolean") {
        g = true
      }
      var f = null;
      if (window.XMLHttpRequest) {
        f = new XMLHttpRequest()
      } else {
        f = new ActiveXObject("Microsoft.XMLHTTP")
      }
      if (f) {
        f.onreadystatechange = function() {
          if (f.readyState == 4) {
            if (typeof(j) == "function") {
              j(f.responseText, f.status, f)
            }
          }
        };
        f.open(i, e, g);
        f.send(h)
      }
    },
    getOffset: function(g, h) {
      if (!g || typeof(g) !== "object") {
        return null
      }
      h = h || window;
      var k = h.document;
      var j = g.getBoundingClientRect();
      var e = {
        top: j.top,
        right: j.right,
        bottom: j.bottom,
        left: j.left,
        width: j.right - j.left,
        height: j.bottom - j.top
      };
      var f = k.documentElement.clientTop || k.body.clientTop || 0;
      var i = k.documentElement.clientLeft || k.body.clientLeft || 0;
      var c = h.pageYOffset || k.documentElement.scrollTop || k.body.scrollTop || 0;
      var d = h.pageXOffset || k.documentElement.scrollLeft || k.body.scrollLeft || 0;
      e.top = e.top + c - f;
      e.bottom = e.bottom + c - f;
      e.left = e.left + d - i;
      e.right = e.right + d - i;
      return e
    }
  };
  b.registerNamespace(a)
})(window[___sogouNamespaceName]);