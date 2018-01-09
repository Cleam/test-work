(function(a) {
  var b = {
    fullName: "$baseName.Business.ViewWatch",
    version: "1.0.0",
    register: function() {
      this.G = a.using("$baseName", this.win);
      this.U = a.using("$baseName.Utility", this.win);
      this.BL = a.using("$baseName.Business", this.win)
    },
    view_watch_array: [],
    client_params: {},
    analysis_url: "http://eff.inte.sogou.com/answer",
    long_time: 300000,
    check_view: function(c, g) {
      if (!g) {
        g = 1
      }
      var j = document.getElementById(c.domId);
      var d = this.U.getClientWidth(window);
      var m = this.U.getClientHeight(window);
      var n = this.U.getPosition(c.domId, window);
      var h = this.U.getScrollTop(window);
      var f = this.U.getScrollLeft(window);
      var i = this.U.getOuterWidth(j);
      var l = this.U.getOuterHeight(j);
      var k = 0;
      if (h - n.top <= 0) {
        if (h + m - n.top > l * g) {
          k = 1
        }
      } else {
        if (h - n.top < l * (1 - g)) {
          k = 1
        }
      }
      var e = 0;
      if (f - n.left <= 0) {
        if (f + d - n.left > i * g) {
          e = 1
        }
      } else {
        if (f - n.left < i * (1 - g)) {
          e = 1
        }
      }
      return e & k
    },
    set_pt_time: function(c, d) {
      if (d) {
        c.ps = (new Date()).getTime();
        if (c.pt_stamp) {
          c.pt = (c.ps - c.pt_stamp)
        }
        return c.pt
      }
      c.pt_stamp = (new Date()).getTime();
      return
    },
    set_it_time: function(c, d) {
      if (d) {
        if (c.it_stamp) {
          c.it = ((new Date()).getTime() - c.it_stamp)
        }
        return c.it
      }
      if (c.it_stamp) {
        ((new Date()).getTime() - c.it_stamp)
      }
      if (this.check_view(c, 0.35)) {
        c.it_stamp = (new Date()).getTime()
      }
      return
    },
    set_vt_time: function(d, e) {
      var c = this.check_view(d, 0.5);
      if (e) {
        if (d.vt_stamp) {
          d.vt += ((new Date()).getTime() - d.vt_stamp)
        }
        return d.vt
      }
      if (d.vt_stamp && !c) {
        d.vt += ((new Date()).getTime() - d.vt_stamp);
        d.vt_stamp = null
      } else {
        if (c && !d.vt_stamp) {
          d.vt_stamp = (new Date()).getTime()
        }
      }
      return d.vt
    },
    set_ft_time: function(c, e) {
      var d = document.getElementById(c.domId);
      if (e) {
        if (c.ft_stamp) {
          c.ft += ((new Date()).getTime() - c.ft_stamp)
        }
        return c.ft
      }
      this.U.bind(d, "mouseenter", function() {
        c.ft_stamp = (new Date()).getTime()
      });
      this.U.bind(d, "mouseleave", function() {
        c.ft += ((new Date()).getTime() - c.ft_stamp);
        c.ft_stamp = null
      })
    },
    set_vs: function(c) {
      c.vs = this.check_view(c, 0.5);
      return c.vs
    },
    set_custom: function(d) {
      var c = this.U.getPosition(d.domId, window);
      d.left = c.left;
      d.top = c.top;
      d.op = this.U.getOpacityInWin(d.domId)
    },
    get_client_params: function() {
      this.client_params.csp = window.screen.availWidth + "," + window.screen.availHeight;
      this.client_params.bcl = this.U.getClientWidth(window) + "," + this.U.getClientHeight(window);
      this.client_params.pof = this.U.getScrollWidth(window) + "," + this.U.getScrollHeight(window);
      this.client_params.fs = 1
    },
    init_params: function(c) {
      var d = this;
      c.it = 0;
      c.ft = 0;
      c.vt = 0;
      c.vs = 0;
      c.left = 0;
      c.top = 0;
      c.op = 100;
      this.set_pt_time(c);
      this.U.ready(function() {
        d.set_it_time(c);
        d.U.bind(window, "scroll", function() {
          d.set_it_time(c);
          d.set_vt_time(c)
        });
        d.set_vt_time(c);
        d.set_custom(c)
      });
      this.set_ft_time(c)
    },
    template: function(e, d) {
      var c = /{(.*?)}/g;
      return e.replace(c, function(h, g, f, i) {
        if (!d) {
          return ""
        }
        if (d[g] != undefined && d[g] != null) {
          return d[g]
        } else {
          return ""
        }
      })
    },
    build_url: function(c) {
      var d = this.analysis_url;
      d += "?id={id}&bi={bi}&sohuurl={sohuurl}&rnd={rnd}&if={if}&w={w}&h={h}&js={js}&z={z}";
      d = this.template(d, c.uiParamSnap);
      this.set_pt_time(c, 1);
      this.set_it_time(c, 1);
      this.set_vt_time(c, 1);
      this.set_ft_time(c, 1);
      this.set_vs(c);
      this.set_custom(c);
      d += "&pt={pt}&ps={ps}&it={it}&vs={vs}&ft={ft}&vt={vt}&left={left}&top={top}&op={op}";
      d = this.template(d, c);
      d += "&csp={csp}&bcl={bcl}&pof={pof}&fs={fs}&total=" + this.view_watch_array.length;
      d = this.template(d, this.client_params);
      return d
    },
    sendback: function() {
      this.get_client_params();
      for (var d = 0; d < this.view_watch_array.length; d++) {
        var c = this.build_url(this.view_watch_array[d]);
        this.U.sendRequestViaImage(c)
      }
    },
    getInstance: function() {
      var d = this.BL.adsArray[this.BL.adsArray.length - 1];
      var e = this;
      this.init_params(d);
      this.view_watch_array.push(d);
      if (this.view_watch_array.length == 1) {
        var f;
        var c = function() {
          if (e.vw_send_flag) {
            return
          }
          clearTimeout(f);
          e.vw_send_flag = true;
          e.sendback()
        };
        f = setTimeout(c, this.long_time);
        this.U.bind(window, "beforeunload", c);
        this.U.bind(window, "pagehide", c);
        this.U.bind(window, "unload", c);
        this.U.bind(document, "visibilityChange", c)
      }
      window.vw = this.view_watch_array
    }
  };
  a.registerNamespace(b)
})(window[___sogouNamespaceName]);