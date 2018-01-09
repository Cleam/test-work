(function(b) {
  var a = {
    fullName: "$baseName.Business.Param",
    version: "1.0.0",
    register: function() {
      this.G = b.using("$baseName", this.win);
      this.U = b.using("$baseName.Utility", this.win);
      this.BL = b.using("$baseName.Business", this.win)
    },
    initialize: function(c) {
      this.currentWindow = c.currentWindow;
      this.doc = this.win.document;
      this.nav = this.win.navigator;
      this.scr = this.win.screen;
      this.displayType = c.displayType || "inlay";
      this.startTime = (new Date());
      this.BL.pnTypeArray = this.BL.pnTypeArray || [];
      this.BL.pnTypeArray[this.displayType] = this.BL.pnTypeArray[this.displayType] || [];
      this.timeStamp = c.timeStamp || (new Date()).getTime()
    },
    getSlot2UIMapping: function(e) {
      var d = {};
      var c;
      for (c in e) {
        if (c && e[c] && e[c].slotParamName) {
          d[e[c].slotParamName] = c
        }
      }
      return d
    },
    getCust2UIMapping: function(e) {
      var d = {};
      var c;
      for (c in e) {
        if (c && e[c] && e[c].custParamName) {
          d[e[c].custParamName] = c
        }
      }
      return d
    },
    mergeSlot2UI: function(f, e, d) {
      if (!f || !e || !d) {
        return null
      }
      var c, g;
      for (g in e) {
        if (g && e[g] && e.hasOwnProperty(g)) {
          c = d[g];
          f.set(c, e[g])
        }
      }
      return f
    },
    serialize: function(f) {
      var e = [];
      var d, c;
      for (d in f) {
        if (d && f[d] && (typeof f[d] === "object") && f[d].isUIParam && f[d].isUIParam[f.displayType]) {
          c = f.get(d);
          if (c == null) {
            continue
          }
          if (f[d].encode || f.displayType == "ui") {
            c = encodeURIComponent(c)
          }
          e.push(d + "=" + c)
        }
      }
      return e.join("&")
    },
    snap: function(f) {
      var e = {};
      var d, c;
      for (d in f) {
        if (d && f[d] && (typeof f[d] === "object") && f[d].defaultValue) {
          c = f.get(d);
          if (c == null) {
            continue
          }
          if (f[d].encode || f.displayType == "ui") {
            c = encodeURIComponent(c)
          }
          e[d] = c
        }
      }
      return e
    },
    get: function(e) {
      var c;
      if (this[e].get && this[e].get !== "default") {
        var d = Array.prototype.slice.call(arguments, 0);
        d.shift();
        if (!this[e]._init) {
          this[e]._value = this[e].defaultValue[this.displayType]
        }
        c = this.U.proxy(this[e].get, this, d)()
      } else {
        if (!this[e]._init) {
          c = this[e].defaultValue[this.displayType]
        } else {
          c = this[e]._value
        }
      }
      return c
    },
    set: function(e, f) {
      var c = false;
      if (this[e].set && this[e].set !== "default") {
        var d = Array.prototype.slice.call(arguments, 0);
        d.shift();
        c = this.U.proxy(this[e].set, this, (d))()
      } else {
        this[e]._value = f;
        this[e]._init = true;
        c = true
      }
      return c
    },
    pid: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: "default",
      set: "default"
    },
    id: {
      slotParamName: "slotId",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true
      },
      get: "default",
      set: "default"
    },
    h: {
      slotParamName: "star_h",
      custParamName: "h",
      modifier: "dynamic",
      defaultValue: {
        inlay: "125",
        "float": "270",
        ui: null
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true
      },
      get: "default",
      set: "default"
    },
    w: {
      slotParamName: "star_w",
      custParamName: "w",
      modifier: "dynamic",
      defaultValue: {
        inlay: "125",
        "float": "120",
        ui: null
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true
      },
      get: "default",
      set: "default"
    },
    fv: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "0",
        "float": "0",
        ui: "",
        post: ""
      },
      encode: true,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        var c = "ShockwaveFlash.ShockwaveFlash",
          g = this.nav,
          d, h;
        if (this.nav.plugins && g.mimeTypes.length) {
          d = g.plugins["Shockwave Flash"];
          if (d && d.description) {
            return d.description.replace(/[^\d\.]/g, "").split(".")[0]
          }
        } else {
          if (this.U.browser.ie) {
            h = ActiveXObject;
            try {
              d = new h(c + ".7")
            } catch (f) {
              try {
                d = new h(c + ".6");
                d.AllowScriptAccess = "always";
                return 6
              } catch (f) {}
              try {
                d = new h(c)
              } catch (f) {}
            }
            if (d != null) {
              try {
                return d.GetVariable("$version").split(" ")[1].split(",")[0]
              } catch (f) {}
            }
          }
        }
        return 0
      },
      set: "default"
    },
    "if": {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "0",
        "float": "0",
        ui: "0",
        post: "0"
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        var d = 0;
        if (this.U.isInIframe()) {
          d += 1
        }
        if (this.U.isInCrossDomainIframe()) {
          d += 2
        }
        var c = this.get("w");
        var f = this.get("h");
        var e = this.U.getClientWidth(this.currentWindow);
        var g = this.U.getClientHeight(this.currentWindow);
        if (e < 40 || g < 10) {
          d += 4
        } else {
          if (e < c || g < f) {
            d += 8
          }
        }
        if ((e >= 2 * c) || (g >= 2 * f)) {
          d += 16
        }
        return d
      },
      set: "default"
    },
    mi: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      set: "default",
      get: function() {
        if (this.mi.__value != undefined) {
          return this.mi.__value
        }
        var c = function() {
          if (top == self) {
            return 0
          } else {
            if (top == window.parent) {
              return 1
            } else {
              return 2
            }
          }
        };
        var d = function(g) {
          if (!g) {
            return ""
          }
          var f = g.split(".");
          if (f.length <= 2) {
            return g
          }
          var h = 2;
          if (f[f.length - 2] == "com" || f[f.length - 2] == "net" || f[f.length - 2] == "org") {
            h += 1
          }
          f.splice(0, f.length - h);
          return f.join(".")
        };
        var e = function() {
          ret = -1;
          mi = c();
          var q = window.location.host;
          var o = document.referrer;
          var n = "";
          if (o) {
            n = /^(http:\/\/|https:\/\/)+?([^\/]*)/.exec(o)[2]
          } else {
            try {
              n = window.parent.location.host
            } catch (m) {}
          }
          if (mi == 0) {
            ret = 0
          } else {
            if (mi == 1) {
              if (n == q) {
                ret = 1
              } else {
                if (d(n) == d(q)) {
                  ret = 2
                } else {
                  ret = 3
                }
              }
            } else {
              if (mi == 2) {
                var j = 0;
                var k = window;
                var g = window;
                var h = 1;
                var l = 0;
                var p = [];
                while (j < 10) {
                  p.push(k);
                  k = k.parent;
                  try {
                    var f = k.document.title
                  } catch (m) {
                    if (p.length >= 1) {
                      var g = p[p.length - 1];
                      var n = /^(http:\/\/|https:\/\/)+?([^\/]*)/.exec(g.document.referrer)[2];
                      if (d(n) == d(g.location.host)) {
                        ret = 6;
                        break
                      }
                      if (p.length >= 2) {
                        var g = p[p.length - 2];
                        if (g.location.host == g.parent.location.host) {
                          ret = 7;
                          break
                        } else {
                          ret = 8;
                          break
                        }
                      }
                    }
                    ret = 9;
                    break
                  }
                  if (k.location.host != self.location.host) {
                    h = 0
                  }
                  if (k == window.top) {
                    break
                  }
                  j++
                }
                if (j == 10) {
                  ret = 10
                } else {
                  if (ret > 5) {
                    ret = ret
                  } else {
                    if (h) {
                      ret = 4
                    } else {
                      if (!h) {
                        ret = 5
                      }
                    }
                  }
                }
              }
            }
          }
          if (ret < 0) {
            ret = 15
          }
          return ret
        };
        this.mi.__value = e();
        return this.mi.__value
      },
      encode: true
    },
    sohuurl: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: true,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        var h = this.currentWindow;
        var o, l = 10,
          e = 0;
        var f = this.get("w") || 0;
        var m = this.get("h") || 0;
        o = h.document.location.href;
        if (this.U.isInIframe(h)) {
          for (e = 0; e < l; e++) {
            if (!this.U.isInCrossDomainIframe(h, h.parent)) {
              h = h.parent;
              if (!this.U.isInIframe(h, h.parent)) {
                o = h.location.href;
                break
              }
            } else {
              try {
                o = h.document.referrer || h.document.location
              } catch (j) {
                var i = null;
                try {
                  i = window.top.location.href
                } catch (k) {
                  i = o
                }
                var n = document.location;
                if (n != i) {
                  o = n
                } else {
                  o = i
                }
                return o
              }
              var g = o.toString();
              var d = null;
              if (this.U.isWindow(h.parent)) {
                try {
                  d = h.parent.location.toString()
                } catch (j) {
                  d = null
                }
              }
              if (d != null && (g != d || h != h.parent)) {
                h = h.parent;
                continue
              }
              h = h.parent;
              if (!this.U.isInCrossDomainIframe(h, h.parent)) {
                break
              }
            }
          }
          if (e >= 10) {
            o = h.document.referrer || h.document.location
          }
        }
        return o
      },
      set: "default"
    },
    refer: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: true,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.U.escapeToEncode(this.doc.referrer || "")
      },
      set: "default"
    },
    ti: {
      slotParamName: "",
      custParamName: "",
      modifer: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: true,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        var d = "";
        if (top == window) {
          d = document.title
        } else {
          try {
            return window.top.document.title.substring(0, 60)
          } catch (c) {}
        }
        return d.substring(0, 60)
      },
      set: "default"
    },
    rnd: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        if (!this["rnd"]._value) {
          if (b.page_id) {
            this["rnd"]._value = b.page_id
          } else {
            this["rnd"]._value = this.U.md5(this.BL.randomArray.join("") + Math.random() * 1000000 + this.doc.location.href);
            b.page_id = this["rnd"]._value
          }
          this["rnd"]._init = true
        }
        return this["rnd"]._value
      },
      set: function() {
        this["rnd"]._value = ""
      }
    },
    z: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        if (!this["z"]._value) {
          this["z"]._value = this.U.md5(this.BL.randomArray.join("") + Math.random() * 1000000 + this.doc.location.href);
          this["z"]._init = true
        }
        return this["z"]._value
      },
      set: function() {
        this["z"]._value = ""
      }
    },
    hs: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        if (!this["hs"]._value) {
          this["hs"]._value = 0;
          if (this.doc.location.protocol == "https:") {
            this["hs"]._value = 1
          }
          this["hs"]._init = true
        }
        return this["hs"]._value
      },
      set: function() {
        this["hs"]._value = 0
      }
    },
    js: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "c",
        "float": "f",
        ui: "ui",
        post: "post"
      },
      encode: false,
      isUIParam: {
        inlay: false,
        "float": false,
        ui: true,
        post: true
      },
      get: "default",
      set: "default"
    },
    lmt: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return Date.parse(this.doc.lastModified) / 1000
      },
      set: "default"
    },
    bs: {
      slotParamName: "",
      custParamName: "",
      modifer: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        try {
          if (document.documentElement.clientHeight == 0) {
            return document.body.clientWidth + "," + document.body.clientHeight
          } else {
            return document.documentElement.clientWidth + "," + document.documentElement.clientHeight
          }
        } catch (c) {}
        return ""
      },
      set: "default"
    },
    srp: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.scr.width + "," + this.scr.height
      },
      set: "default"
    },
    srn: {
      slotParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": ""
      },
      encode: false,
      isUIParam: {
        inlay: false,
        "float": false
      },
      get: function() {
        return this.scr.availWidth + "," + this.scr.availHeight
      },
      set: "default"
    },
    ccd: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.scr.colorDepth || 0
      },
      set: "default"
    },
    lhi: {
      slotParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true
      },
      get: function() {
        return this.win.history.length || 0
      },
      set: "default"
    },
    eja: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        try {
          return this.nav.javaEnabled().toString()
        } catch (c) {}
        return ""
      },
      set: "default"
    },
    npl: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.nav.plugins.length || 0
      },
      set: "default"
    },
    nmi: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.nav.mimeTypes.length || 0
      },
      set: "default"
    },
    ece: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.nav.cookieEnabled || 0
      },
      set: "default"
    },
    lan: {
      uuserApiName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.nav.systemLanguage || this.nav.language
      },
      set: "default"
    },
    bi: {
      uuserApiName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "1",
        "float": "1",
        ui: "1",
        post: "1"
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return this.BL.displayCounter || 1
      },
      set: function() {
        this.BL.displayCounter = this.BL.displayCounter || 1;
        this.BL.displayCounter++;
        return true
      }
    },
    t1: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        var c = 0;
        if (this.startTime) {
          c = (new Date()).getTime() - this.startTime.getTime()
        }
        return c
      },
      set: "default"
    },
    t2: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "",
        "float": "",
        ui: "",
        post: ""
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        return Math.round((new Date).getTime() / 1000)
      },
      set: "default"
    },
    pvt: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "0",
        "float": "0",
        ui: "0",
        post: "0"
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        if (!this.BL.pageFirstRequestTime) {
          this.BL.pageFirstRequestTime = (new Date()).getTime()
        }
        return this.BL.pageFirstRequestTime || ""
      },
      set: "default"
    },
    ssi0: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "0",
        "float": "0",
        ui: "0",
        post: "0"
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        var d = navigator.userAgent.toLowerCase();
        var e = 0;
        if (d.indexOf("windows") > -1) {
          e = 1
        } else {
          if (d.indexOf("mac") > -1) {
            e = 2
          } else {
            if (d.indexOf("linux") > -1) {
              e = 3
            } else {
              if (d.indexOf("solaris") > -1) {
                e = 4
              } else {
                if (d.indexOf("x11") > -1) {
                  e = 5
                }
              }
            }
          }
        }
        if (!!d.match(/AppleWebKit.*Mobile.*/) || !!d.match(/AppleWebKit/)) {
          e = 6
        } else {
          if (d.indexOf("ios") > -1) {
            e = 6
          } else {
            if (d.indexOf("android") > -1) {
              e = 7
            } else {
              if (d.indexOf("iphone") > -1) {
                e = 8
              } else {
                if (d.indexOf("ipad") > -1) {
                  e = 9
                }
              }
            }
          }
        }
        var c = 0;
        if (d.indexOf("android") > -1) {
          if (d.indexOf("safari") > -1 || d.indexOf("chrome") > -1) {
            c = 4
          }
        } else {
          if (d.indexOf("mac") > -1) {
            if (d.indexOf("safari") > -1) {
              c = 5
            }
          }
        }
        if (d.indexOf("mqqbrowser") > -1) {
          c = 2;
          if (d.indexOf("nettype") > -1) {
            c = 1
          }
        } else {
          if (d.indexOf("qq") > -1) {
            c = 1
          } else {
            if (d.indexOf("ucbrowser") > -1) {
              c = 3
            } else {
              if (d.indexOf("crios") > -1) {
                c = 4
              } else {
                if (d.indexOf("liebaofast") > -1) {
                  c = 6
                } else {
                  if (d.indexOf("qhbrowser") > -1 || (d.indexOf("360") > -1 && d.indexOf("aphone") > -1) || d.indexOf("360browser") > -1) {
                    c = 7
                  } else {
                    if (d.indexOf("baidubrowser") > -1) {
                      c = 8
                    } else {
                      if (d.indexOf("baiduboxapp") > -1) {
                        c = 9
                      } else {
                        if (d.indexOf("sogousearch") > -1) {
                          c = 10
                        } else {
                          if (d.indexOf("sogoumobilebrowser") > -1 || d.indexOf("sogoumse") > -1) {
                            c = 11
                          } else {
                            if (d.indexOf("opios") > -1 || d.indexOf("opr") > -1) {
                              c = 12
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return ((e & 255) << 8) | (c & 255)
      },
      set: "default"
    },
    ia: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "0",
        "float": "0",
        ui: "0",
        post: "0"
      },
      encode: false,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        try {
          var c = window.navigator.userAgent;
          var f = "SogouSearch Android";
          if (c.indexOf(f) != -1) {
            if (window.JSInvoker && window.JSInvoker.getEncryptDeviceId) {
              return window.JSInvoker.getEncryptDeviceId()
            }
          }
          return ""
        } catch (d) {
          return ""
        }
      },
      set: "default"
    },
    enc: {
      custParamName: "charset",
      modifier: "dynamic",
      defaultValue: {
        ui: null
      },
      encode: true,
      isUIParam: {
        ui: true
      },
      get: function() {
        if (typeof(this["enc"]._value) == "string") {
          switch (this["enc"]._value.toLowerCase()) {
            case "gb2312":
            case "gbk":
              return "0";
              break;
            case "utf8":
            case "utf-8":
              return "1";
              break;
            default:
              return null;
              break
          }
        }
      },
      set: "default"
    },
    wg: {
      slotParamName: "",
      custParamName: "",
      modifier: "dynamic",
      defaultValue: {
        inlay: "0",
        "float": "0",
        ui: "0",
        post: "0"
      },
      encode: true,
      isUIParam: {
        inlay: true,
        "float": true,
        ui: true,
        post: true
      },
      get: function() {
        var c = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (!c) {
          return 0
        }
        var d = c.type;
        if (typeof d == "undefined" || d == null) {
          return 0
        }
        d = ("" + d).toLowerCase();
        if (d == "2" || d == "wifi") {
          return 1
        } else {
          if (d == "cellular" || d == "3" || d == "4" || d == "5") {
            return 2
          } else {
            return 3
          }
        }
      },
      set: "default"
    }
  };
  b.registerClass(a)
})(window[___sogouNamespaceName]);