(function(c) {
  var c = c;
  var a = c.using("$baseName.Business");
  var b = a.getAntiBlockServiceUrl().domain;
  var d = {
    fullName: "$baseName.Business.User_Capture",
    version: "1.0.0",
    callback_name: "_sogou_wap_user_callback",
    callback_data: "_sogou_wap_user_data",
    http: {
      ask_url: "http://" + b + "/action_ask",
      load_url: "http://img.lu.sogoucdn.com/wap/js/wuc.js",
    },
    https: {
      ask_url: "https://service.epro.sogou.com/action_ask",
      load_url: "https://theta.sogoucdn.com/wap/js/wuc.js"
    },
    in_special_domain: function(e) {
      var g = ["ifeng"];
      for (var f = 0; f < g.length; f++) {
        if (e.indexOf(g[f]) !== -1) {
          return true
        }
        return false
      }
    },
    get_top_win: function(h) {
      var g = h;
      var f = 0;
      while ((g.parent != g) && (f < 10)) {
        f++;
        try {
          var i = g.parent.document.title;
          g = g.parent
        } catch (e) {
          break
        }
      }
      return g
    },
    get_url: function(h) {
      var g = h;
      var e = g.document.location.href;
      if (g.parent != g) {
        try {
          e = g.document.referrer
        } catch (f) {}
      }
      return e
    },
    ask_server: function(g) {
      var i = this.http.ask_url,
        e = this.http.load_url,
        k = this.callback_name,
        f = this.callback_data;
      if (document.location.protocol.indexOf("https") !== -1) {
        e = this.https.load_url;
        i = this.https.ask_url
      }
      var j = i + "?callback=" + k + "&url=" + g;
      document.write('<script type="text/javascript" charset="utf-8" src="' + j + '"><\/script>');
      var h = this.in_special_domain(document.domain);
      var l = window[k] = function(n) {
        if (!n || !h) {
          return
        }
        window[f] = n;
        var m = document.createElement("script");
        m.src = e;
        m.charset = "utf-8";
        document.body.appendChild(m)
      }
    },
    init: function() {
      var e = this.get_top_win(window) || window;
      if (e._sg_wuc_loaded) {
        return
      } else {
        e._sg_wuc_loaded = true
      }
      var f = encodeURIComponent(this.get_url(e));
      this.ask_server(f)
    }
  };
  c.registerNamespace(d)
})(window[___sogouNamespaceName]);