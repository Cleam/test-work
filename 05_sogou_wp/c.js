(function(a) {
  var b = {
    fullName: "$baseName.Business",
    version: "1.0.0",
    register: function() {
      this.G = a.using("$baseName", this.win);
      this.U = a.using("$baseName.Utility", this.win)
    },
    randomArray: [],
    clientTree: {},
    displayCounter: 1,
    displayTypeCounter: {},
    adsArray: [],
    adsWrapStore: {},
    winFocused: true,
    iframeIdPrefix: "starIframe",
    iframeWrapperIdPrefix: "starIframe_wrapper_",
    isAsyn: false,
    getSlotDataFromWapUnion: function(e, j) {
      if (typeof(e) == "undefined" || !j || !window[j]) {
        return null
      }
      var i = "";
      var d = ["w-0"];
      var c = this.getAntiBlockServiceUrl();
      var h = 100;
      if (document.location.protocol.indexOf("https") > -1) {
        i = "https://wuliao.epro.sogou.com/ask?id={slotId}&cb={callbackName}&ssi0={ssi0}";
        h = 99
      } else {
        i = "http://" + c.domain + "/ask?id={slotId}&cb={callbackName}&ssi0={ssi0}";
        h = c.index + 1
      }
      d.push("dx-" + h);
      if (window.sg_gdt) {
        i = i + "&gdt=1"
      }
      i += "&wsg=" + d.join("_");
      i += "&_v=e1803e24";
      var f = this.Param.ssi0.get();
      var g = this.U.template(i, {
        slotId: e,
        callbackName: j,
        ssi0: f
      });
      if (/\d+/.test(e)) {
        document.write('<script type="text/javascript" charset="utf-8" src="' + g + '"><\/script>')
      } else {
        window[j](null)
      }
    },
    parseSlotDataFromStar: function(d) {
      var c = {};
      for (var e in d) {
        if (e && d.hasOwnProperty(e)) {
          return d[e]
        }
      }
      return null
    },
    getAdsDomId: function(c) {
      return c.slice(-8)
    },
    getAdsWrapperDomId: function(c) {
      return c.slice(0, 8)
    },
    checkAdsCounter: function(e, g, d) {
      var c = false;
      var f;
      switch (e.toLowerCase()) {
        case "inlay":
          f = 5;
          break;
        case "float":
          f = 1;
          break;
        case "ui":
          f = 3;
          if (d == "sogouDEFINE") {
            f = 4
          }
          break;
        default:
          f = 3;
          break
      }
      g.__star__displayTypeCounter = g.__star__displayTypeCounter || {};
      g.__star__displayTypeCounter[e] = g.__star__displayTypeCounter[e] || 0;
      if (g.__star__displayTypeCounter[e] >= f) {
        c = true
      }
      return c
    },
    addAdsCounter: function(c, d) {
      d.__star__displayTypeCounter = d.__star__displayTypeCounter || {};
      d.__star__displayTypeCounter[c] = d.__star__displayTypeCounter[c] || 0;
      d.__star__displayTypeCounter[c]++;
      return true
    },
    checkAdsCounterLu: function(e, g, d) {
      var c = false;
      var f;
      switch (e.toLowerCase()) {
        case "inlay":
          f = 5;
          break;
        case "photo":
          f = 100;
          break;
        default:
          f = 3;
          break
      }
      g.__linkunit__displayTypeCounter = g.__linkunit__displayTypeCounter || {};
      g.__linkunit__displayTypeCounter[e] = g.__linkunit__displayTypeCounter[e] || 0;
      if (g.__linkunit__displayTypeCounter[e] >= f) {
        c = true
      }
      return c
    },
    addAdsCounterLu: function(c, d) {
      d.__linkunit__displayTypeCounter = d.__linkunit__displayTypeCounter || {};
      d.__linkunit__displayTypeCounter[c] = d.__linkunit__displayTypeCounter[c] || 0;
      d.__linkunit__displayTypeCounter[c]++;
      return true
    },
    getAntiBlockServiceUrl: function() {
      var c = ["kcru.ujhxd0tofmr*`ml", "emwn.ujhxd0tofmr*`ml", "^clhq/vkiwc/snelq+anm", "ngev.ujhxd0tofmr*`ml", "erq-mftfyu{/snelq+anm", "uqvi.ngugxtz.rmdkr,bon", "jucr.ngugxtz.rmdkr,bon", "njmdu/ohvfwsy-qlcls-cpo", "bvag.vtdrxu/snelq+anm", "gqgun/wueqwt.rmdkr,bon", "tqpth/wueqwt.rmdkr,bon", "kpa-uscqyv0tofmr*`ml", "rtfh.hqx2vqhot,`kj", "lpdp.hqx2vqhot,`kj", "]jdh.hqx2vqhot,`kj", "muk-pmwws1upgns+_lk", "udjn.qnxxr0tofmr*`ml", "l`vyo/roywq/snelq+anm", "cuc-hvun}1upgns+_lk", "fqg-hvun}1upgns+_lk", "^pgdt/jxwn{/snelq+anm", "tind.iwvo|0tofmr*`ml", "mej-bfcokh0tofmr*`ml", "j^rps/dheoif.rmdkr,bon", "_ccn.cgdpjg/snelq+anm", "_gpnq/dheoif.rmdkr,bon", "qcmir/irpggo1-qlcls-cpo", "fplo.hqohhp2.rmdkr,bon", "lgwt.hqohhp2.rmdkr,bon", "agxq.hqohhp2.rmdkr,bon"];
      var d = Math.floor(Math.random() * c.length + 1) - 1;
      var e = c[d];
      return {
        domain: this.U.encodeByMove(e, -1),
        index: d
      }
    }
  };
  a.registerNamespace(b)
})(window[___sogouNamespaceName]);