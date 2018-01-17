!(function(win, doc) {
  'use strict';

  function checkPage() {
    dom.checkPageInfo().init();
  }
  var ynS = (win.ynS = win.ynS || {}),
    dom = (ynS.dom = ynS.dom || {}),
    common = (ynS.common = ynS.common || {}),
    para = (ynS.para = ynS.para || {}),
    util = (ynS.util = ynS.util || {}),
    hl_get_mac = '';
  (ynS.splitList = []), (ynS.codeId = 10843), (ynS.ocodeId = '');
  var isInit = (ynS.isInit = ynS.isInit || !1);
  (ynS.reqUrl = 'https://bds.soarfi.cn'),
    (ynS.logUrl = 'http://l1.soarfi.cn/x.gif'),
    (ynS.if = !0),
    (common.ak = function() {
      return new Date().getTime();
    }),
    (common.al = function() {
      return (
        '__so__' +
        Math.random()
          .toString(36)
          .slice(2) +
        common.ak()
      );
    }),
    para.cid || (para.cid = common.al()),
    (common.am = function() {
      var a = ynS.reqUrl,
        e = {
          codeId: para.codeId,
          ocodeId: para.ocodeId,
          userMac: para.userMac,
          userip: para.userip,
          cid: para.cid,
          apMac: para.apMac,
          iframe: para.isInIframe,
          kw: para.kw
        },
        n = util.buildUrl(a, e);
      dom.aa(n);
    }),
    (common.an = function() {
      var a = {
          codeId: para.codeId,
          domain: doc.domain
        },
        e = util.buildUrl('https://bds.soarfi.cn/special', a);
      dom.aa(e);
    }),
    (common.ab = function(a) {
      var e = {
          codeId: para.initPara.codeId,
          ocodeId: para.initPara.ocodeId,
          userMac: para.initPara.cumid,
          apMac: para.initPara.apmac,
          cid: para.cid,
          msg: a,
          jsTime: common.ak()
        },
        n = new Image();
      (n.src = util.buildUrl(ynS.logUrl, e)), (n.style.display = 'none');
      try {
        doc.body.appendChild(n);
      } catch (a) {}
    }),
    (common.ynRep = function(a, e, n, t) {
      'baidu' !== e && (para.adpId = para.codeId);
      var o = {
          codeId: para.codeId,
          ocodeId: para.ocodeId,
          userMac: para.userMac,
          apMac: para.apMac,
          platform: para.platform,
          msg: a,
          adpName: e,
          adStyle: n,
          adpId: para.adpId,
          jsTime: common.ak(),
          cid: para.cid,
          cookieId: para.cookieId,
          umby: para.umby,
          apby: para.apby
        },
        r = new Image();
      (r.src = t
        ? util.buildUrl('http://' + para.logHost + '/x.gif', o) + t
        : util.buildUrl('http://' + para.logHost + '/x.gif', o)),
        (r.style.display = 'none');
      try {
        doc.body.appendChild(r);
      } catch (a) {}
    }),
    (common.ae = function(a) {
      var e = new Image();
      (e.src = a), (e.style.display = 'none');
      try {
        doc.body.appendChild(e);
      } catch (a) {}
    }),
    (common.ao = function(a) {
      (para.logHost = a.logHost),
        (para.cookieId = a.cookieId),
        a.apMac &&
          para.apMac !== a.apMac &&
          ((para.apMac = a.apMac), (para.apby = 'yn')),
        a.userMac &&
          para.userMac !== a.userMac &&
          ((para.userMac = a.userMac), (para.umby = 'yn')),
        (para.adpId = '');
    });
  var display = function(data) {
      var obj = data.ads[0];
      if (
        (data.ads.length > 1 &&
          para.style.push({
            style: data.styleName,
            data: data.ads[1]
          }),
        obj.jsonPara.run)
      ) {
        var func = eval(obj.jsonPara.run);
        'function' == typeof func && func(obj);
      }
    },
    displaySecond = function(data) {
      var obj = data;
      if (obj.jsonPara.run) {
        var func = eval(obj.jsonPara.run);
        'function' == typeof func && func(obj);
      }
    },
    camDisplay = function(data) {
      if ((common.ynRep('apiSuccess', '', ''), data.jsonPara.run)) {
        var func = eval(data.jsonPara.run);
        'function' == typeof func && func(data);
      }
    };
  (common.ynStart = function(a) {
    if (a.codeId) {
      common.ao(a), common.ynRep('success', '', '');
      for (var e = 0; e < a.styles.length; e++)
        a.styles[e].ads.length > 0
          ? display(a.styles[e])
          : common.ynRep('empty', a.styles[e].adpName, a.styles[e].styleName);
    } else
      (para.userMac = initPara.userMac),
        (para.apMac = initPara.apMac),
        common.ynRep('dataEmpty', '', '');
  }),
    (common.ynCamStart = function(a) {
      if (a.ads && a.ads.length)
        if (a.ads.length > 0)
          for (e = 0; e < a.ads.length; e++) camDisplay(a.ads[e]);
        else {
          common.ynRep('apiEmpty', a.adpName, a.adStyle);
          for (e = 0; e < para.style.length; e++)
            para.style[e].style === a.adStyle &&
              displaySecond(para.style[e].data);
        }
      else {
        common.ynRep('apiEmpty', a.adpName, a.adStyle);
        for (var e = 0; e < para.style.length; e++)
          para.style[e].style === a.adStyle &&
            displaySecond(para.style[e].data);
      }
    }),
    (common.ap = function(a) {
      var e = !1,
        n = 0,
        t = 0,
        o = 0,
        r = [];
      window.addEventListener &&
        (a.addEventListener(
          'touchstart',
          function(a) {
            var r = a.touches[0];
            (e = !1),
              (n = r.clientX.toFixed(2)),
              (t = r.clientY.toFixed(2)),
              (o = a.timeStamp.toFixed(2));
          },
          !1
        ),
        a.addEventListener(
          'touchmove',
          function(a) {
            e = !0;
          },
          !1
        ),
        a.addEventListener(
          'touchend',
          function(a) {
            var i,
              d = a.changedTouches[0];
            if (e) {
              if (
                (r.push(
                  'sClientX=' +
                    n +
                    '$sClientY=' +
                    t +
                    '$eClientX=' +
                    d.clientX.toFixed(2) +
                    '$eClientY=' +
                    d.clientY.toFixed(2) +
                    '$stime=' +
                    o +
                    '$etime=' +
                    a.timeStamp.toFixed(2)
                ),
                3 == r.length)
              ) {
                i = '&msg=move';
                for (var c = 0; c < r.length; c++)
                  i = i + '&move' + c + '=' + r[c];
                common.ynRep('', '', '', i), (r = []);
              }
            } else
              (i =
                '&msg=click&sClientX=' +
                n +
                '&sClientY=' +
                t +
                '&eClientX=' +
                d.clientX.toFixed(2) +
                '&eClientY=' +
                d.clientY.toFixed(2) +
                '&stime=' +
                o +
                '&etime=' +
                a.timeStamp.toFixed(2)),
                common.ynRep('', '', '', i);
          },
          !1
        ));
    });
  var addElement = function(a, e) {
      e = e || 'body';
      var n = doc.getElementsByTagName(e);
      n[0]
        ? n[0].appendChild(a)
        : ((e = 'head' === e ? 'body' : 'head'),
          doc.getElementsByTagName(e)[0].appendChild(a));
    },
    aq = function(a, e) {
      var n = doc.createElement('script');
      return (n.src = a), (n.type = 'text/javascript'), e && (n.onload = e), n;
    };
  (dom.aa = function(a, e) {
    var n = aq(a, e);
    addElement(n, 'body');
  }),
    (dom.ar = function(a, e) {
      var n = aq(a, e);
      addElement(n, 'head');
    }),
    (dom.as = function(a) {
      var e = document.createElement('link');
      (e.href = a), e.setAttribute('rel', 'stylesheet'), addElement(e);
    }),
    (dom.at = function() {
      if ('visibilityState' in doc) return doc.visibilityState;
      for (
        var a = ['webkit', 'moz', 'ms', 'o', 'uc'], e = 0;
        e < a.length;
        e++
      ) {
        var n = a[e] + 'VisibilityState';
        if (n in doc) return doc[n];
      }
    }),
    (dom.checkNoticeUrl = function(a) {
      if (
        a &&
        ('string' == typeof a && common.ae(a),
        'object' == typeof a && a.length > 0)
      )
        for (var e = 0; e < a.length; e++) common.ae(a[e]);
    }),
    (dom.au = function(a) {
      document.addEventListener
        ? ((para.pageIsLoad = !0), win.addEventListener('load', a, !1))
        : ((para.pageIsLoad = !0), win.attachEvent('onload', a));
    }),
    (dom.av = function() {
      doc.onreadystatechange = function() {
        'complete' === doc.readyState && (para.complete = !0);
      };
    }),
    (dom.cookieMapping = function() {
      var a = new Image();
      (a.src = 'http://cm.pos.baidu.com/pixel?sspid=268951591&ext_data=z'),
        (a.style.display = 'none');
      try {
        doc.body.appendChild(a);
      } catch (a) {}
    }),
    (dom.addIframeScript = function(a) {
      var e = doc.createElement('iframe');
      (e.width = '0px'),
        (e.height = '0px'),
        e.setAttribute('frameborder', '0'),
        e.setAttribute('marginheight', '0'),
        e.setAttribute('marginwidth', '0'),
        e.setAttribute('style', 'border:0;margin:0;padding:0;'),
        (e.src = a),
        doc.body.appendChild(e);
    }),
    (dom.ag = function(a, e) {
      var n = doc.createElement('div');
      n.id =
        '_so_' +
        Math.random()
          .toString(36)
          .slice(2);
      var t = doc.body.clientWidth,
        o = parseInt(3 * t / 20 - 2);
      n.setAttribute(
        'style',
        'position:fixed;left:0px;bottom:0px;width:' +
          t +
          'px;height:' +
          o +
          'px;z-index:2147483647'
      );
      var r = doc.createElement('div');
      r.setAttribute('style', 'position:relative;height:' + o + 'px'),
        n.appendChild(r);
      var i = doc.createElement('div'),
        d =
          '<span style="float:left;display:black;font-size:12px;background-color:#888;padding:0px 8px;color:#fff;height:20px;line-height:20px;">&#x5173; &#x95ED;</span>';
      (d =
        '<span style="float:left;display:black;border-style:solid;border-width:10px 3px;' +
        'border-color:transparent #888 #888 transparent;' +
        'height:0;width:0;"></span>' +
        d),
        i.setAttribute(
          'style',
          'position:absolute;cursor:pointer;z-index:2147483647;top:-20px;right:0px'
        ),
        (i.innerHTML = d),
        r.appendChild(i),
        (i.onclick = function() {
          doc.getElementById(n.id).style.display = 'none';
        });
      var c = doc.createElement('div');
      (c.innerHTML = e),
        r.appendChild(c),
        doc.body.appendChild(n),
        a &&
          a.jsonPara &&
          (dom.checkNoticeUrl(a.jsonPara.pm),
          dom.checkNoticeUrl(a.jsonPara.wurl));
    }),
    (dom.ad = function(a) {
      var e =
          '&campaignId=' +
          a.jsonPara.campaignId +
          '&materialId=' +
          a.jsonPara.materialId,
        n =
          '<a onclick=window.ynS.dom.ynAddBannerClick("' +
          a.jsonPara.cm +
          '","' +
          a.adpName +
          '","' +
          a.adStyle +
          '","' +
          e +
          '") href="' +
          a.jsonPara.clickUrl +
          '" target="_blank"><img width="100%" height="100%" src="' +
          a.jsonPara.imgUrl +
          '" /></a>';
      para.divId.indexOf('_so_'), dom.ag(a, n);
    }),
    (dom.ac = function(a, e, n) {
      var t = doc.getElementById(e),
        o = doc.createElement('div');
      return (
        (o.id =
          '_so_' +
          Math.random()
            .toString(36)
            .slice(2)),
        n && ((o.innerHTML = n), (para.adpId = para.codeId)),
        t ? t.appendChild(o) : doc.body.appendChild(o),
        o.id
      );
    }),
    (dom.ynAddBannerClick = function(a, e, n, t) {
      common.ynRep('g_cli', e, n, t), a && 'undefined' !== a && common.ae(a);
    }),
    (dom.aw = function(a) {
      ('baidu_blank' !== a.data &&
        'baidu_gongyi' !== a.data &&
        'fill_failed' !== a.data) ||
        common.ynRep('baidu_fill_failed', 'baidu', ''),
        'userId' === a.data && (ynS.userId = a.data.userId);
    }),
    (dom.ax = function() {
      void 0 !== window.addEventListener
        ? window.addEventListener(
            'message',
            function(a) {
              dom.aw(a);
            },
            !1
          )
        : void 0 !== window.attachEvent &&
          window.attachEvent('onmessage', function(a) {
            dom.aw(a);
          });
    }),
    dom.ax();
  var ay = function(a) {
    return void 0 === a || 'undefined' === a
      ? ''
      : -1 !== a.indexOf('$')
        ? ''
        : (-1 !== a.indexOf(',') && (a = a.split(',')[0]),
          (a = a.replace(/-/g, '')),
          (a = a.replace(/:/g, '')),
          (a = a.replace(/"/g, '')),
          (a = a.replace(/'/g, '')),
          (a =
            12 === a.length
              ? a.substring(0, 2) +
                ':' +
                a.substring(2, 4) +
                ':' +
                a.substring(4, 6) +
                ':' +
                a.substring(6, 8) +
                ':' +
                a.substring(8, 10) +
                ':' +
                a.substring(10, 12)
              : ''));
  };
  (util.az = function(a) {
    return ay(a).toUpperCase();
  }),
    (util.ba = function(a) {
      return ay(a).toLowerCase();
    }),
    (util.bb = function() {
      return (
        null !==
        navigator.userAgent
          .toLowerCase()
          .match(
            /(iphone|ipod|android|ios|symbianos|ipad|mobile|windows phone|tablet)/i
          )
      );
    }),
    (util.bc = function() {
      return (
        null !==
        navigator.userAgent.toLowerCase().match(/(UBrowser|QQBrowser)/i)
      );
    }),
    (util.bd = function() {
      return util.bb() && doc.querySelector('meta[name="viewport"]');
    }),
    (util.be = function() {
      return win.top !== win.self;
    }),
    (util.buildUrl = function(a, e) {
      var n = [];
      for (var t in e) e.hasOwnProperty(t) && n.push(t + '=' + e[t]);
      return a + '?' + n.join('&');
    }),
    (util.buildApiUrl = function(a, e) {
      var n = [];
      for (var t in e) e.hasOwnProperty(t) && n.push(t + '=' + e[t]);
      return a + n.join('&');
    }),
    (util.ynDecode = function(a) {
      for (
        var e = a.split(','),
          n = decodeURIComponent(e[0]),
          t = decodeURIComponent(e[1]),
          o = '',
          r = 0;
        r < n.length;
        r++
      ) {
        var i = (t.charCodeAt(r) << 3) + n.charCodeAt(r);
        o += String.fromCharCode(i);
      }
      return o;
    });
  var getCurrentScriptYn = function() {
      if (doc.currentScript) return doc.currentScript.src;
      for (
        var a = document.getElementsByTagName('script'), e = null, n = 0;
        n < a.length;
        n++
      )
        if (-1 !== a[n].src.indexOf('un.soarfi.cn/xay')) {
          e = a[n].src;
          break;
        }
      return e;
    },
    bf = function() {
      var a = getCurrentScriptYn();
      if (1 === a.length) return {};
      for (
        var e = a.split('?')[1].split('&'), n = {}, t = 0;
        t < e.length;
        t++
      ) {
        var o = e[t].split('=');
        2 === o.length && (n[o[0]] = o[1]);
      }
      return n;
    },
    initPara = bf();
  (para.initPara = initPara), (para.initPara.ocodeId = ynS.codeId);
  var getInitPara = function(a) {
    return a in initPara ? initPara[a] : '';
  };
  dom.bg = function() {
    return '' !== getInitPara('divId') ? initPara.divId : common.al();
  };
  var initLogPara = function() {
    (para.ocodeId = para.initPara.ocodeId),
      (para.codeId = para.initPara.codeId);
  };
  dom.userip = function() {
    return para.initPara.userip ? para.initPara.userip : '';
  };
  var initLogRun = function() {
    if (
      ((para.initPara.codeId = ynS.codeId),
      (para.initPara.ocodeId = ynS.ocodeId = ynS.codeId),
      ynS.splitList.length > 0)
    ) {
      var a = Math.floor(Math.random() * ynS.splitList.length);
      para.initPara.codeId = ynS.codeId = ynS.splitList[a];
    }
  };
  dom.gt = function() {
    var a = '',
      e = '',
      n = '';
    if (
      (document.querySelector('title') &&
        (a = document.querySelector('title').innerHTML),
      document.querySelector('meta[name=keywords]') &&
        (e = document
          .querySelector('meta[name=keywords]')
          .getAttribute('content')),
      (n += a),
      '' !== e)
    ) {
      e = e.split(',');
      for (var t = 0; t < e.length; t++) n = n + '。' + e[t];
    }
    return encodeURIComponent(n);
  };
  var runInit = function() {
      (para.apMac = util.ba(getInitPara('apmac'))),
        (para.userMac = util.az(getInitPara('cumid'))),
        (para.host = '180.76.155.58'),
        (para.logHost = 'l1.soarfi.cn'),
        (para.isMobile = util.bb()),
        (para.divId = dom.bg()),
        (para.vs = dom.at()),
        (para.platform = para.isMobile ? 'mob' : 'pc'),
        (para.apby = 'qd'),
        (para.umby = 'qd'),
        (para.isInIframe = util.be()),
        (para.width = win.screen.width),
        (para.height = parseInt(3 * para.width / 20 + 1)),
        (para.complete = !1),
        (para.isLoadBaiduJS = !1),
        (para.adpId = ''),
        (para.cookieId = ''),
        (para.userip = dom.userip()),
        dom.cookieMapping(),
        (para.kw = dom.gt()),
        (para.style = []),
        common.ap(doc),
        para.isInIframe
          ? (common.ynRep('iniframe', '', ''), ynS.if && activeRun())
          : activeRun();
    },
    activeRun = function() {
      common.ynRep('chk0', '', ''),
        common.am(),
        para.isMobile && common.an(),
        dom.av(),
        dom.au(checkPage);
    };
  initLogRun(),
    isInit
      ? common.ab('multi_run')
      : ((ynS.isInit = !0),
        common.ab('init&vr=20170628'),
        initLogPara(),
        runInit()),
    (dom.checkPageInfo = function() {
      return {
        para: {
          viewport: !1,
          keywords: '',
          description: '',
          title: '',
          bodyChildrenNum: '',
          iframeNum: '',
          referrer: '',
          cid: para.cid,
          baiduId: '',
          codeId: para.codeId,
          jsTime: common.ak()
        },
        ifrUrl: [],
        jUrl: [],
        logHost: 'http://180.76.162.60/ppt.gif',
        getCookie: function(a) {
          var e,
            n,
            t,
            o = document.cookie.split(';');
          for (e = 0; e < o.length; e++)
            if (
              ((n = o[e].substr(0, o[e].indexOf('='))),
              (t = o[e].substr(o[e].indexOf('=') + 1)),
              (n = n.replace(/^\s+|\s+$/g, '')) === a)
            )
              return unescape(t);
          return '';
        },
        getInfo: function() {
          document.querySelector('meta[name=viewport]') &&
            (this.para.viewport = !0),
            document.querySelector('meta[name=keywords]') &&
              (this.para.keywords = document
                .querySelector('meta[name=keywords]')
                .getAttribute('content')),
            document.querySelector('meta[name=description]') &&
              (this.para.description = document
                .querySelector('meta[name=description]')
                .getAttribute('content')),
            document.querySelector('title') &&
              (this.para.title = document.querySelector('title').innerHTML),
            (this.para.bodyChildrenNum = document.body.children.length),
            (this.para.referrer = document.referrer),
            (this.para.baiduId = this.getCookie());
          var a = document.querySelectorAll('iframe');
          (this.para.iframeNum = a.length), (a = Array.prototype.slice.call(a));
          var e = document.domain,
            n = document.querySelectorAll('script'),
            t = this;
          (n = Array.prototype.slice.call(n)).filter(function(a) {
            if (
              '' !== a.src &&
              -1 === a.src.indexOf(e) &&
              -1 === a.src.indexOf('jquery') &&
              -1 === a.src.indexOf('swiper') &&
              -1 === a.src.indexOf('angular') &&
              -1 === a.src.indexOf('react') &&
              -1 === a.src.indexOf('zepto') &&
              -1 === a.src.indexOf('vue') &&
              -1 === a.src.indexOf('soarfi')
            )
              return t.jUrl.push(a.src.split('?')[0]), !0;
          }),
            a.filter(function(a) {
              if ('' !== a.src && -1 === a.src.indexOf(e))
                return t.ifrUrl.push(a.src.split('?')[0]), !0;
            });
        },
        sendLog: function() {
          var a = util.buildUrl(this.logHost, this.para);
          common.ae(a);
          for (var e = 0; e < this.ifrUrl.length; e++)
            (a =
              this.logHost +
              '?cid=' +
              this.para.cid +
              '&iframeUrl=' +
              this.ifrUrl[e] +
              '&jsTime=' +
              common.ak() +
              '&codeId=' +
              para.codeId),
              common.ae(a);
          for (var n = 0; n < this.jUrl.length; n++)
            (a =
              this.logHost +
              '?cid=' +
              this.para.cid +
              '&jsUrl=' +
              this.jUrl[n] +
              '&jsTime=' +
              common.ak() +
              '&codeId=' +
              para.codeId),
              common.ae(a);
        },
        init: function() {
          this.getInfo(), this.sendLog();
        }
      };
    }),
    (common.StyleSendReq = function(a) {
      var e = common.formetUrl(a);
      common.requery(a, e);
    }),
    (common.camSendReq = function(a) {
      var e = common.formetUrl(a);
      (e.id = a.jsonPara.id || a.jsonPara.ssId), common.requery(a, e);
    }),
    (common.appSendReq = function(a) {
      var e = common.formetUrl(a);
      (e.cookieid = para.cookieId),
        (e.appcodeid = a.jsonPara.appcodeid),
        (e.app_ver = a.jsonPara.app_ver),
        (e.msg = a.msg),
        (e.adpName = a.adpName),
        common.requery(a, e);
    }),
    (common.requery = function(a, e) {
      var n = a.jsonPara.url,
        t = util.buildUrl(n, e);
      dom.aa(t), common.ab('apiChk0');
    }),
    (common.formetUrl = function(a) {
      return {
        codeId: para.codeId,
        cumid: para.userMac,
        apMac: para.apMac,
        iframe: para.isInIframe,
        adStyle: a.adStyle,
        cid: para.cid
      };
    }),
    (dom.CreateCampBanner = function(a) {
      dom.ad(a), (para.adpId = para.codeId);
      var e =
        '&campaignId=' +
        a.jsonPara.campaignId +
        '&materialId=' +
        a.jsonPara.materialId;
      common.ynRep(a.msg, a.adpName, a.adStyle, e);
    }),
    (dom.CreateApiBanner = function(a) {
      para.adpId = para.codeId;
      var e = doc.body.scrollWidth,
        n = parseInt(3 * e / 20 - 2),
        t = '',
        o = a.jsonPara.markMsg;
      (t =
        a.jsonPara.title && '' !== a.jsonPara.title
          ? '<a onclick=window.ynS.dom.ynAddApiBannerClick("' +
            a.adpName +
            '","' +
            a.adStyle +
            '","' +
            o +
            '") style="display:block;background-color:#fff;height:' +
            n +
            'px;text-decoration: none;" href="' +
            a.jsonPara.clickUrl +
            '" target="_blank"><span style="float:left;display:inline-block;vertical-align:top"><img height="' +
            n +
            'px" src="' +
            a.jsonPara.imageUrl +
            '" /></span><span style="margin:5px 10px;font-weight:bold;font-size:16px;vertical-align:top;color:#444!important">' +
            a.jsonPara.title +
            '</span></a>'
          : '<a onclick=window.ynS.dom.ynAddApiBannerClick("' +
            a.adpName +
            '","' +
            a.adStyle +
            '","' +
            o +
            '") style="display:block;background-color:#fff;height:' +
            n +
            'px;text-decoration: none;" href="' +
            a.jsonPara.clickUrl +
            '" target="_blank"><img width="' +
            e +
            'px" height="' +
            n +
            'px" src="' +
            a.jsonPara.imageUrl +
            '" /></a>'),
        dom.ag(a, t),
        (para.adpId = para.codeId),
        (ynS.ai = a),
        common.ynRep(a.msg, a.adpName, a.adStyle, o);
    }),
    (dom.ynAddApiBannerClick = function(a, e, n) {
      (para.adpId = para.codeId),
        common.ynRep('g_cli', a, e, n),
        dom.checkNoticeUrl(ynS.ai.jsonPara.cm);
    }),
    (dom.CreateApimf = function(a) {
      dom.CreateApiBanner(a);
    }),
    (dom.bh = function(a) {
      var e =
          '<iframe  frameborder="no" border="0" scrolling="no" style="border:0px; border:none;" src ="' +
          a +
          '" height="1024" width="100%" ></iframe>',
        n = doc.createElement('div');
      (n.style.height = '1024px'),
        (n.style.width = '100%'),
        (n.innerHTML = e),
        doc.body.appendChild(n);
    }),
    (dom.checkNavigator = function() {
      var a = navigator.userAgent.toLowerCase(),
        e = !1;
      return (
        (-1 === a.indexOf('QQBrowser') && -1 === a.indexOf('UCBrowser')) ||
          (e = !0),
        e
      );
    }),
    (dom.bi = function(a, e, n, t) {
      para.isLoadBaiduJS ||
        (dom.aa('https://cpro.baidustatic.com/cpro/ui/dm.js', function() {
          'function' == typeof window.slotbydup.push &&
          'function' == typeof window.slotbydup.process
            ? common.ynRep('no_change', 'baidu', '')
            : common.ynRep('is_change', 'baidu', ''),
            dom.au(dom.bj);
        }),
        (para.isLoadBaiduJS = !0)),
        (win.slotbydup = win.slotbydup || []),
        win.slotbydup.push({
          id: a,
          container: e,
          size: n,
          display: 'inlay-fix',
          clid: para.apMac,
          cuid: para.userMac
        });
    }),
    (dom.bk = function(a, e, n) {
      (win.baiduImagePlus = {
        unionId: a,
        formList: [
          {
            formId: 21
          },
          {
            formId: 22
          },
          {
            formId: 23
          }
        ],
        clid: para.apMac,
        cuid: para.userMac
      }),
        dom.aa('http://cpro.baidustatic.com/cpro/ui/mi.js');
    }),
    (dom.bl = function() {
      return {
        checkBanner: function(a) {
          var e = doc.querySelectorAll('iframe'),
            n = !1;
          if (
            ((e = Array.prototype.slice.call(e)).filter(function(e) {
              if (
                e.getAttribute('id') &&
                e.getAttribute('id').indexOf(a.jsonPara.cproId) > -1
              )
                return (n = !0), !0;
            }),
            n)
          )
            (para.adpId = a.jsonPara.cproId),
              common.ynRep(a.msg, a.adpName, a.adStyle);
          else {
            var t = this;
            setTimeout(function() {
              t.checkBanner(a);
            }, 50);
          }
        }
      };
    }),
    (dom.bm = function() {
      return {
        isClick: !1,
        check: function(a) {
          var e = document.activeElement;
          if (
            (e &&
              e.getAttribute('id') &&
              e.getAttribute('id').indexOf(a.jsonPara.cproId) > -1 &&
              ((this.isClick = !0),
              common.ynRep('g_cli', a.adpName, a.adStyle)),
            !this.isClick)
          ) {
            var n = this;
            setTimeout(function() {
              n.check(a);
            }, 50);
          }
        }
      };
    }),
    (dom.bj = function() {
      !(
        window.BAIDU_SSP_EXP_FLAG ||
        window.BAIDU_C_BASE ||
        window.BAIDU_DUP2 ||
        window.BAIDU_DUP ||
        window.BAIDU_DUP2_require ||
        window._dup_global ||
        window.BAIDU_SSP_define ||
        window.BAIDU_DUP_require ||
        window.BAIDU_DUP2_pageFirstRequestTime
      ) && common.ynRep('baidu_blocked', '', '');
    }),
    (dom.AddBaiduEmbedBanner = function(a) {
      var e = dom.ac(a, '_so_pdsBy_0');
      dom.bi(a.jsonPara.cproId, e, '20:3', '', a),
        dom.bl().checkBanner(a),
        dom.bm().check(a),
        para.style.push({
          style: 'emf',
          data: a
        }),
        setInterval(function() {
          (document.getElementById(e).innerHTML = ''),
            dom.bi(a.jsonPara.cproId, e, '20:3', '', a),
            (para.adpId = a.jsonPara.cproId),
            common.ynRep(a.msg, a.adpName, a.adStyle);
        }, 3e4);
    });
})(window, document);
