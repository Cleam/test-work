(function(p) {
  var p = p;
  var f = p.using("$baseName.Utility");
  var w = p.using("$baseName.Business");
  var b = "wp";
  var o = "inlay";
  w.randomArray.push(Math.random() * 1000000);
  var y = "_sg" + f.md5(w.randomArray.join(""));
  var x = window[y];
  var e = 0;
  while (typeof x !== "undefined") {
    if (e == 10) {
      y = "SOGOU_WAP_SETJSONADSLOT";
      x = window[y];
      break
    }
    w.randomArray.push(Math.random() * 1000000);
    y = "_sg" + f.md5(w.randomArray.join(""));
    x = window[y];
    e++
  }
  var s = window.sogou_ad_id;
  var u = window.sogou_ad_width;
  var a = window.sogou_ad_height;
  var j = window.sogou_ad_content_width;
  var q = window.sogou_ad_content_height;
  var n = (function() {
    var z = typeof(u) == "undefined" || typeof(a) == "undefined";
    var A = typeof(q) == "undefined";
    if (z && A) {
      return 0
    }
    if (!z) {
      return 1
    }
    if (!A) {
      return 2
    }
  })();
  var l = function() {
    var B = f.getClientWidth();
    var z = f.getClientHeight();
    var A = B < z ? B : z;
    if (n === 2) {
      u = 1;
      a = 1;
      j = Number(j || A);
      q = Number(q)
    } else {
      if (n === 1) {
        u = Number(u);
        a = Number(a);
        j = Number(j || A);
        q = j / u * a
      }
    }
    if (j > 1200) {
      j = 1200
    }
    if (u <= 0 || a <= 0 || j <= 0 || q <= 0) {
      return false
    }
    return true
  };
  var t = function() {
    window.sogou_ad_id = undefined;
    window.sogou_ad_height = undefined;
    window.sogou_ad_width = undefined;
    window.sogou_ad_content_width = undefined;
    window.sogou_ad_content_height = undefined
  };
  var h = function() {
    if (top == window) {
      return 0
    } else {
      if (top == window.parent) {
        return 1
      } else {
        return 2
      }
    }
  };
  var c = function(C, D) {
    if (!(C instanceof Array)) {
      return
    }
    document.write('<div id = "' + D + '">');
    for (var B = 0, z = C.length; B < z; B++) {
      var A = decodeURIComponent(C[B]);
      document.writeln(A)
    }
    document.write("</div>")
  };
  var r = function(E, F, B) {
    var I = window.sogou_ad_width;
    var D = window.sogou_ad_height;
    var C = f.getClientWidth();
    var K = f.getClientHeight();
    var H = h();
    var G = {};
    if (!H) {
      var A = C > K ? K : C
    } else {
      var A = C > K ? C : K
    }
    if (!E.fxw && window.sogou_ad_content_width) {
      E.fxw = window.sogou_ad_content_width
    }
    if (E.fxw && E.fxw >= 240) {
      A = E.fxw;
      E.zoom = 0;
      E.fw = 0
    }
    if (E.zoom && E.zoom >= 50) {
      A = A * E.zoom / 100
    } else {
      E.zoom = 0
    }
    if (A > 1200) {
      A = 1200
    }
    G.real_w = A;
    var z = A;
    if (!E.fxh && window.sogou_ad_content_height) {
      E.fxh = window.sogou_ad_content_height
    }
    if (!E.fxh) {
      var J = A / I * D;
      G.real_h = A / I * D
    } else {
      if (E.fxh < 15) {
        E.fxh = 15
      }
      var J = E.fxh;
      G.real_h = E.fxh
    }
    if (E.fp && E.fp > 0 && E.fp < 5) {
      if (E.fp == 2 || E.fp == 4) {
        B += "position:fixed;top:0;z-index:2147483646;"
      } else {
        B += "position:fixed;bottom:0;z-index:2147483646;"
      }
    } else {
      B += "position:relative;"
    }
    B += "width:100%;";
    B += "height:" + J + "px;";
    if (E.al) {
      F += "position:absolute;left:0;"
    } else {
      F += "position:absolute;left:0;right:0;margin:auto;"
    }
    if (E.fw == 1) {
      if (E.zoom >= 50) {
        F += "width:" + E.zoom + "%;"
      } else {
        F += "width:100%;"
      }
    } else {
      F += "width:" + z + "px;"
    }
    F += "height:" + J + "px;";
    return {
      iframe_style: F,
      div_style: B,
      real_w: z,
      real_h: J
    }
  };
  var v = function(B, E, z) {
    var D = document.createElement("div");
    var C = document.createElement("div");
    var A = function() {
      D.parentNode.parentNode.setAttribute("style", "display:none")
    };
    f.bind(D, "click", A);
    f.bind(D, "touchend", function(I) {
      var G = I.changedTouches[0];
      var F = G.pageX;
      var J = G.pageY;
      var H = D.getBoundingClientRect();
      if (F > H.left && F < H.right && J > H.top && J < H.bottom) {
        A()
      }
    });
    if (E == 2) {
      D.setAttribute("style", " width:" + j / 18 + "px; height:" + j / 18 + "px; background-color:#ccc; background-image:url(" + z + "); background-size:80%, 80%; z-index:9999; background-position:center; background-repeat:no-repeat; cursor:pointer; display:block; overflow:hidden; position:absolute; bottom:-" + j / 18 + "px; left:0;");
      C.setAttribute("style", " width:" + j / 9 + "px; height:" + j / 36 + "px;z-index:9999;position:absolute;left:0;bottom:-1px;")
    } else {
      if (E == 1) {
        D.setAttribute("style", " width:" + j / 18 + "px; height:" + j / 18 + "px; background-color:#ccc; background-image:url(" + z + "); background-size:80%, 80%; z-index:9999; background-position:center; background-repeat:no-repeat; cursor:pointer; display:block; overflow:hidden; position:absolute; top:-" + j / 18 + "px; right:0;");
        C.setAttribute("style", " width:" + j / 9 + "px; height:" + j / 36 + "px;z-index:9999;position:absolute;right:0;top:-1px;")
      }
    }
    document.getElementById(B).appendChild(D);
    document.getElementById(B).appendChild(C)
  };
  var m = function(V, ab, A, M, Y) {
    var ah = {};
    w.randomArray.push(Math.random() * 1000000);
    unionSlotParams = w.parseSlotDataFromStar(V);
    if (V == null) {
      document.write('<div style="display:none">code id is not valid</div>');
      return
    }
    ah = p.create(w.Param, {
      displayType: o,
      currentWindow: window,
      timeStamp: (new Date()).getTime()
    });
    ah.set("js", b);
    if (w.checkAdsCounter(o, window)) {
      return
    }
    var aa = unionSlotParams.st;
    var P = "//img02.sogoucdn.com/app/a/100200019/1423040208.png";
    var J = "";
    var U = ah.get("ssi0");
    var ad = ["w-0"];
    var ag = w.getAntiBlockServiceUrl();
    var T = 100;
    if (aa == 0) {
      if (document.location.protocol.indexOf("https") > -1) {
        J = "https://wuliao.epro.sogou.com/wapxml";
        T = 99
      } else {
        J = "http://" + ag.domain + "/wapxml";
        T = ag.index + 1
      }
    } else {
      if (aa == 1) {
        J = "http://sw.mobile.sogou.com/query"
      } else {
        if (aa == 2) {
          if (window.sg_gdt) {
            return
          }
          window.sg_gdt = true;
          c(unionSlotParams.ssp_arr, w.getAdsWrapperDomId(ah.get("z")));
          return
        } else {
          return
        }
      }
    }
    ad.push("dx-" + T);
    var G = "";
    var z = "border:none;";
    var S = Number(ab);
    var ac = Number(A);
    var X = unionSlotParams.is_float;
    var F = unionSlotParams.is_close;
    var ae = unionSlotParams.ex || "";
    var Z = unionSlotParams.m || "";
    var E = ah.get("bi");
    if (unionSlotParams.np) {
      var I = r(unionSlotParams, z, G);
      var M = I.real_w;
      var Y = I.real_h
    } else {
      if (unionSlotParams.is_ifeng == 1) {
        unionSlotParams.fw = 1
      }
      if (unionSlotParams.is_float && unionSlotParams.is_float == 1) {
        if (ac == 2) {
          unionSlotParams.fp = 2
        } else {
          unionSlotParams.fp = 1
        }
      }
      var I = r(unionSlotParams, z, G);
      var M = I.real_w;
      var Y = I.real_h
    }
    z = I.iframe_style;
    G = I.div_style;
    ah.set("w", ab);
    ah.set("h", A);
    ah.set("id", sogou_ad_id);
    ah.set("pid", null);
    var R = M;
    var L = Y;
    var D = '<div style="display:none">-</div> <div style="{divStyle}"><div id="{wrapperId}" style="{iframeStyle}"><iframe id="{iframeId}" onload="document.sogou_ads{bi}_loaded=true;" src="{starServiceUrl}?{paramString}" style="{iframeStyle}" align="center,center" marginwidth="0"  marginheight="0" scrolling="no" frameborder="0" allowtransparency="true" ></iframe></div></div>';
    var W = w.getAdsDomId(ah.get("z"));
    var C = w.getAdsWrapperDomId(ah.get("z"));
    var O = w.Param.serialize(ah);
    O += "&ua=" + encodeURIComponent(navigator.userAgent);
    O += "&is_float=" + X;
    O += "&is_close=" + F;
    O += "&wd=" + R;
    O += "&hd=" + L;
    O += "&ex=" + ae;
    O += "&wsg=" + ad.join("_");
    O += "&_v=e1803e24";
    if ((U & 15) == 3) {
      O += "&uc_param_str=dnnt"
    }
    O += "&m=" + Z;
    var af = unionSlotParams.ztd;
    if (af == 1) {
      if (window.sogou && window.sogou.PersonalReader && window.sogou.PersonalReader.getObj) {
        var H = window.sogou.PersonalReader.getObj();
        var Q = "query=" + H.query + "&url=" + H.url + "&from=" + H.from + "&uid=" + H.uid + "&type=" + H.type + "&stype=" + H.stype + "&click_id=" + H.click_id;
        O += "&ztds=" + encodeURIComponent(Q)
      }
    }
    var K = {
      iframeId: W,
      wrapperId: C,
      bi: E,
      paramString: O,
      divStyle: G,
      iframeStyle: z,
      starServiceUrl: J
    };
    var B = f.g("star_" + ah.get("id"));
    if (B) {
      B.innerHTML = f.template(D, K)
    } else {
      document.write(f.template(D, K))
    }
    if (unionSlotParams.fp == 1 || unionSlotParams.fp) {
      v(C, unionSlotParams.fp, P)
    }
    ah.set("bi");
    var N = w.Param.snap(ah);
    w.adsArray.push({
      domId: W,
      uiParamSnap: N,
      win: window,
      js: b
    });
    w.addAdsCounterLu(o, window);
    if (document.location.protocol.indexOf("https") == -1) {
      if (typeof(document.wb_pb) == "undefined") {
        document.wb_pb = new Array()
      }
      window.setTimeout("(function(){if(!document.sogou_ads" + E + '_loaded){var a=new Image();a.src = "http://eff.lu.sogou.com/answer?asid=' + sogou_ad_id + "&r=" + ah.get("rnd") + '";document.wb_pb.push(a);}}())', 6000)
    }
    t()
  };
  var g = window[y] = function(z) {
    w.User_Capture.init();
    m(z, u, a, j, q)
  };
  if (b === "wp") {
    if (typeof(window.sogou_ad_id) == "undefined") {
      return
    }
    if (!n) {
      return
    }
    if (!l()) {
      return
    }
    var d = document.getElementsByTagName("script");
    var k = d[d.length - 1].src;
    var i = f.getPara(k);
    w.isAsyn = i.asyn;
    w.getSlotDataFromWapUnion(sogou_ad_id, y)
  }
})(window[___sogouNamespaceName]);