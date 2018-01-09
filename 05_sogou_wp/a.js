var ___sogouNamespaceName = "WapStarNamespace";
(function() {
  var name = ___sogouNamespaceName;
  var win = window,
    i = 0,
    isInIframe = false,
    isCrossDomain = false;
  while ((win != window.top || win != win.parent) && i < 10) {
    isInIframe = true;
    try {
      win.parent.location.toString()
    } catch (e) {
      isCrossDomain = true;
      break
    }
    i++;
    win = win.parent
  }
  if (i >= 10) {
    isCrossDomain = true
  }
  var d = function(h, isInIframe, isCrossDomain) {
    h.baseName = name;
    h.isInIframe = isInIframe;
    h.isCrossDomain = isCrossDomain;
    h.needInitTop = 0;
    h.buildInObject = {
      "[object Function]": 1,
      "[object RegExp]": 1,
      "[object Date]": 1,
      "[object Error]": 1,
      "[object Window]": 1
    };
    h.clone = function(o) {
      var l = o,
        m, k;
      if (!o || o instanceof Number || o instanceof String || o instanceof Boolean) {
        return l
      } else {
        if (o instanceof Array) {
          l = [];
          var n = 0;
          for (m = 0, k = o.length; m < k; m++) {
            l[n++] = this.clone(o[m])
          }
        } else {
          if ("object" === typeof o) {
            if (this.buildInObject[Object.prototype.toString.call(o)]) {
              return l
            }
            l = {};
            for (m in o) {
              if (o.hasOwnProperty(m)) {
                l[m] = this.clone(o[m])
              }
            }
          }
        }
      }
      return l
    };
    h.create = function(m, p) {
      var l = Array.prototype.slice.call(arguments, 0);
      l.shift();
      var n = function(q) {
        this.initialize = this.initialize || function() {};
        this.initializeDOM = this.initializeDOM || function() {};
        this.initializeEvent = this.initializeEvent || function() {};
        this.initialize.apply(this, q);
        this.initializeDOM.apply(this, q);
        this.initializeEvent.apply(this, q)
      };
      n.prototype = m;
      var k = new n(l);
      for (var o in m) {
        if (k[o] && typeof k[o] === "object" && k[o].modifier && k[o].modifier.indexOf("dynamic") > -1) {
          k[o] = this.clone(k[o])
        }
      }
      k.instances = null;
      m.instances = m.instances || [];
      m.instances.push(k);
      return k
    };
    h.registerMethod = function(o, k) {
      var p = {};
      var l = {};
      var s, q, r;
      for (q in k) {
        s = k[q];
        if (!q || !s) {
          continue
        }
        if (typeof s === "object" && s.modifier && s.modifier === "dynamic") {
          this.registerMethod(o[q], s)
        } else {
          if (typeof s === "function") {
            p[q] = s
          } else {
            l[q] = s
          }
        }
      }
      for (q in p) {
        s = p[q];
        if (q && s) {
          o[q] = s
        }
      }
      if (o.instances && o.instances.length && o.instances.length > 0) {
        for (var m = 0, n = o.instances.length; m < n; m++) {
          r = o.instances[m];
          this.registerMethod(r, k)
        }
      }
    };
    h.registerObj = function(m, o) {
      var l = Array.prototype.slice.call(arguments, 0);
      l.shift();
      var n = function(p) {
        this.register = this.register || function() {};
        this.register.apply(this, p)
      };
      n.prototype = m;
      n.prototype.instances = null;
      var k = new n(l);
      return k
    };
    h.registerNamespaceByWin = function(m, o) {
      var o = m.win = o || window;
      var l = m.fullName.replace("$baseName", this.baseName);
      namespaceNames = l.split(".");
      var p = namespaceNames.length;
      var s = o;
      var r;
      for (var n = 0; n < p - 1; n++) {
        var k = namespaceNames[n];
        if (s == o) {
          s[k] = o[k] = o[k] || {};
          r = k;
          m.baseName = r
        } else {
          s[k] = s[k] || {}
        }
        s = s[k]
      }
      var q = s[namespaceNames[p - 1]] || {};
      if (q.fullName && q.version) {
        this.registerMethod(q, m)
      } else {
        q = this.registerObj(m);
        q.instances = null;
        s[namespaceNames[p - 1]] = q
      }
    };
    h.registerNamespace = function(k) {
      if (!k || !k.fullName || !k.version) {
        return
      }
      this.registerNamespaceByWin(k, window)
    };
    h.registerClass = h.registerNamespace;
    h.using = function(m, p) {
      var k;
      p = p || window;
      m = m.replace("$baseName", this.baseName);
      var l = m.split(".");
      k = p[l[0]];
      for (var n = 1, o = l.length; n < o; n++) {
        if (k && k[l[n]]) {
          k = k[l[n]]
        } else {
          k = null
        }
      }
      return k
    }
  };
  window[name] = window[name] || {};
  d(window[name], isInIframe, isCrossDomain)
})();