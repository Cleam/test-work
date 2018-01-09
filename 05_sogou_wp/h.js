(function(f, i) {
  var e = "SOGOU_STAR_URL_CALLBACK";
  var d = "SOGOU_STAR_URL_DATA";
  var a = "dsp.brand.sogou.com";
  var l = "http://img.lu.sogoucdn.com/wap/js/pe.js";
  try {
    a = f[___sogouNamespaceName].Business.getAntiBlockServiceUrl().domain
  } catch (c) {}
  var h = "http://" + a + "/wap_ask_service";
  if (i.location.protocol.indexOf("https") !== -1) {
    l = "https://theta.sogoucdn.com/wap/js/pe.js";
    h = "https://service.epro.sogou.com/wap_ask_service"
  }
  var k = function(q) {
    var p = q;
    var o = 0;
    while ((p.parent != p) && (o < 10)) {
      o++;
      try {
        var r = p.parent.document.title;
        p = p.parent
      } catch (n) {
        break
      }
    }
    return p
  };
  var g = function(q) {
    var p = q;
    var n = "";
    try {
      n = p.document.location.href;
      if (p.parent != p) {
        n = p.document.referrer || p.document.location.href
      }
    } catch (o) {
      n = ""
    }
    return n
  };
  var j = function(n, p) {
    var o = h + "?callback=" + n + "&url=" + p;
    i.write('<script type="text/javascript" charset="utf-8" src="' + o + '"><\/script>')
  };
  var m = f[e] = function(n) {
    if (n == null || n.want != "1") {
      return
    }
    f[d] = n;
    var o = i.createElement("script");
    o.src = l;
    i.body.appendChild(o)
  };

  function b() {
    var n = k(f) || f;
    if (n.pe_has_loaded) {
      return
    } else {
      n.pe_has_loaded = true
    }
    var o = g(n);
    o = encodeURIComponent(o);
    j(e, o)
  }
  b()
})(window, document);