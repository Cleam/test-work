(function () {
  /* DOM */
  var $article = $('#J_article');
  var $title = $('#title');
  var $content = $('#content');
  var $interestNews = $('#J_interest_news');
  var $topList = $('<div id="J_top_list" class="top-list"></div>');
  var $inList = $('<div id="J_in_list" class="in-list" style="position:relative;padding:0;"></div>');
  var $hotNews = $('#J_hot_news');
  var $hnList = $('<div id="J_hn_list" class="hn-list"></div>');
  var $loading = $('<div id="J_loading" class="loading">' +
    '<div class="spinner">' +
    '<div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>' +
    '</div>' +
    '<p class="txt">数据加载中</p>' +
    '</div>');

  /* 广告 */
  var bdGgIds = GLOBAL.Et.bdGgIds;
  var bdGgIndex = 0;

  /* 状态 */
  var isHttps = (window.location.protocol.indexOf('https') >= 0) || false;
  var hasListNews = false;
  var hasArticledownGg = false;
  var pullUpFinished = false;

  /* 变量 */
  var wsCache = new WebStorageCache();
  var curCityname = null;
  var curProvname = null;
  var curProid = null;
  var topNewsArr = [];
  var newsNum = 10;
  var dspIndex = '';
  var dspSite = '';
  var appIconUrl = '';
  var appBgColor = '';
  var appDownloadBtnTxt = '';
  var appDownloadBtnUpId = '';
  var appDownloadBtnDownId = '';

  /* 参数 */
  var pageNum = 10;
  var ttaccid = GLOBAL.Util.getQueryString('ttaccid') || '';
  var appqid = GLOBAL.Util.getQueryString('appqid') || '';
  var ver = GLOBAL.Util.getQueryString('ver') || '';
  var appver = GLOBAL.Util.getQueryString('appver') || '';
  var deviceid = GLOBAL.Util.getQueryString('deviceid') || 'null';
  var ime = GLOBAL.Util.getQueryString('ime') || '';

  function EastDetails() {
    this.userpic = wsCache.get('userpic_for_comment');
    this.position = wsCache.get('location_for_comment');
    // this.hotNewsUrl = 'http://106.75.3.64/newsmore_h5detail/newspool';
    this.hotNewsUrl = 'https://toutiao.eastday.com/newsmore_h5detail/newspool';
    this.dspUrl = 'http://106.75.98.65/partner/detail';
    // this.dspUrl = 'https://softwordsdetail.dftoutiao.com/partner/detail';
    this.startKey = '';
    this.pageNum = 1;
  }

  EastDetails.prototype = {
    constructor: EastDetails,
    init: function () {
      var scope = this;
      scope.partner = new Partner();

      try {
        scope.loadHotNewsData();
      } catch (e) {
        console.error(e);
      }

      $(window).on('scroll', function () {
        if (scope.pageNum > 2) {
          $loading.html('');
          $(window).off('scroll');
          return;
        }
        var scrollTop = GLOBAL.Util.getScrollTop();
        var loadingOT = $loading.offset().top - 100;
        var cHeight = GLOBAL.Util.getClientHeight();
        if (loadingOT >= cHeight && scrollTop + cHeight >= loadingOT && pullUpFinished) {
          pullUpFinished = false;
          scope.loadHotNewsData();
        }
      });

      $hotNews.on('click', 'a', function (e) {
        e.preventDefault();
      });
    },

    loadTxtGg: function ($ggDom, ggId) {
      var $txtGgWrap = $('<div class="txt-gg" style="padding: 0.12rem 0;"></div>');
      $ggDom.append($txtGgWrap);
      $txtGgWrap.append('<div class="gg-txt" id="' + ggId + '"></div>');
      GLOBAL.Util.getScript('//tt123.eastday.com/' + ggId + '.js', function () { }, $('#' + ggId)[0]);
    },

    loadHotNewsData: function () {
      var scope = this;
      $.ajax({
        url: scope.hotNewsUrl,
        data: {
          htps: isHttps ? '1' : '0',
          type: GLOBAL.Et.newsType,
          qid: GLOBAL.Et.qid,
          uid: ime || GLOBAL.Et.uid,
          newsnum: newsNum,
          ishot: GLOBAL.Util.getQueryString('ishot') || 'null',
          recommendtype: GLOBAL.Util.getQueryString('recommendtype') || 'null',
          url: GLOBAL.Util.getUrlNoParams(),
          os: GLOBAL.Util.getOsType(),
          pgnum: scope.pageNum
        },
        dataType: 'jsonp',
        timeout: 8000,
        jsonp: 'jsonpcallback',
        beforeSend: function () {
          pullUpFinished = false;
        },
        success: function (rst) {
          var data = rst ? rst.data : '';
          var kws = rst ? rst.kwds : '';
          scope.startKey = rst.endkey || '';
          if (GLOBAL.Et.voteQids.contains(GLOBAL.Et.qid)) {
            if (scope.pageNum === 1) {
              scope.generateVoteDom(rst);
            }
          }
          if (data) {
            scope.getDsp(function (dspData) {
              scope.loadHotNews(data, scope.pageNum++, dspData);
              pullUpFinished = true;
            });
          } else {
            console.warn('未获取到数据!');
          }
        },
        error: function () {
          pullUpFinished = true;
        }
      });
    },

    loadHotNews: function (data, pgnum, dspData) {
      var scope = this;
      if (!data || !data.length) {
        return false;
      }
      if (pgnum === 1) {
        $hotNews.append('<div class="section-title hn-title"><h2><span></span>热点新闻<span class="line" ' + (appBgColor ? 'style="background-color:' + appBgColor + ';"' : '') + ' ></span></h2></div>');
        $hotNews.append($hnList);
        $hotNews.append($loading);
      }
      var len = data.length;
      var ttaccid = GLOBAL.Util.getQueryString('ttaccid');
      var softtype = GLOBAL.Util.getQueryString('softtype');
      var softname = GLOBAL.Util.getQueryString('softname');
      var ver = GLOBAL.Util.getQueryString('ver');
      var appqid = GLOBAL.Util.getQueryString('appqid');
      var ttloginid = GLOBAL.Util.getQueryString('ttloginid');
      var appver = GLOBAL.Util.getQueryString('appver');
      for (var i = 0; i < len; i++) {
        var item = data[i];
        var url = item.url;
        var dateStr = item.date;
        var topic = item.topic;
        var source = item.source;
        var imgArr = item.miniimg;
        var recommendtype = item.recommendtype ? item.recommendtype : '-1';
        var ispicnews = item.ispicnews;
        var ispartner = Number(item.ispartner) || '';
        var partnerId = item.partner_id || '';
        var titledisplay = item.titledisplay || '';
        var type = item.type;
        var subtype = item.subtype;
        var imgLen = imgArr.length;
        var hot = Number(item.hotnews);
        var idx = i + 1;
        var fr = GLOBAL.Util.getUrlNoParams();
        var advStr = '';
        var tagStr = '';
        idx = idx + (pgnum - 1) * 10;
        if (ispartner !== 1) {
          url += '?qid=' + GLOBAL.Et.qid + '&idx=' + idx + '&fr=' + fr + '&recommendtype=' + recommendtype + '&deviceid=' + deviceid + '&pgnum=' + pgnum;
          if (ttaccid) {
            url += ('&ttaccid=' + ttaccid);
          }
          if (ime) {
            url += ('&ime=' + ime);
          }
          if (hot) {
            url += '&ishot=1';
          }
          if (softtype) {
            url += ('&softtype=' + softtype);
          }
          if (softname) {
            url += ('&softname=' + softname);
          }
          if (ver) {
            url += ('&ver=' + ver);
          }
          if (appqid) {
            url += ('&appqid=' + appqid);
          }
          if (ttloginid) {
            url += ('&ttloginid=' + ttloginid);
          }
          if (appver) {
            url += ('&appver=' + appver);
          }
        }

        if (titledisplay) {
          titledisplay = titledisplay.toString();
          var isZd = Number(titledisplay.charAt(titledisplay.length - 1)); // 是否是置顶
          var isHot = Number(titledisplay.charAt(titledisplay.length - 2)); // 是否是热门
          var isRec = Number(titledisplay.charAt(titledisplay.length - 3)); // 是否是推荐
          var isZt = Number(titledisplay.charAt(titledisplay.length - 4)); // 是否是专题
          var isVideo = Number(titledisplay.charAt(titledisplay.length - 5)); // 是否是视频
          var isYc = Number(titledisplay.charAt(titledisplay.length - 6)); // 是否是原创
          var isPartner = Number(titledisplay.charAt(titledisplay.length - 7)); // 是否是广告
          var isNuanwen = Number(titledisplay.charAt(titledisplay.length - 8)); // 是否是暖文

          if (isZd === 1) {
            tagStr += '<i class="tag-zd">顶</i>';
          }
          if (isHot === 1) {
            tagStr += '<i class="tag-hot">热门</i>';
          }
          if (isRec === 1) {
            tagStr += '<i class="tag-rec">推荐</i>';
          }
          if (isZt === 1) {
            tagStr += '<i class="tag-zt">专题</i>';
          }
          if (isVideo === 1) {
            tagStr += '<i class="tag-video">视频</i>';
          }
          if (isYc === 1) {
            tagStr += '<i class="tag-yc">原创</i>';
          }
          if (isPartner === 1) {
            tagStr += '<i class="tag-gg">广告</i>';
            advStr = 'class="J-promote-news" data-advid="' + partnerId + '"';
          }
          if (isNuanwen === 1) {
            tagStr += '<i class="tag-nuanwen">暖文</i>';
          }
        }

        if (Number(ispicnews) === 1) {
          imgArr = item.lbimg;
          $hnList.append([
            '<section class="news-item news-img-lg">',
            '<a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '" class="news-link">',
            '<h3 class="title dotdot line3">' + topic + '</h3>',
            '<p class="img img-bg">',
            '<img class="img" src="' + imgArr[0].src + '"></image>',
            '</p>',
            '<p class="tags">',
            '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
            '<em class="tag tag-src">' + source + '</em>',
            '</p>',
            '</a>',
            '</section>'
          ].join(''));
        } else if (Number(ispicnews) === 0) {
          if (imgLen >= 3) {
            $hnList.append([
              '<section class="news-item news-img3">',
              '<a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '" class="news-link">',
              '<div class="info">',
              '<h3 class="title dotdot line3">' + topic + '</h3>',
              '</div>',
              '<div class="img">',
              '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[0].src + '"></div>',
              '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[1].src + '"></div>',
              '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[2].src + '"></div>',
              '</div>',
              '<p class="tags">',
              '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
              '<em class="tag tag-src">' + source + '</em>',
              '</p>',
              '</a>',
              '</section>'
            ].join(''));
          } else if (imgLen >= 1) {
            $hnList.append([
              '<section class="news-item news-img1">',
              '<a ' + advStr + ' data-type="' + type + '" data-subtype="' + subtype + '" href="' + url + '" class="news-link">',
              '<div class="info">',
              '<h3 class="title dotdot line3">' + topic + '</h3>',
              '<p class="tags">',
              '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
              '<em class="tag tag-src">' + source + '</em>',
              '</p>',
              '</div>',
              '<div class="img img-bg"><img data-lbimg="' + (item.lbimg[0] ? item.lbimg[0].src : '') + '" class="image" src="' + imgArr[0].src + '"></div>',
              '</a>',
              '</section>'
            ].join(''));
          }
        }

        try {
          scope.loadGg(i, len, dspData);
        } catch (e) {
          console.error(e);
        }
      }
      hasListNews = true;
    },

    getSpecialTime: function (dateStr) {
      var tTime = Date.parse(dateStr.replace(/-/g, '/'));
      var cTime = new Date().getTime();
      var eightTime = 8 * 60 * 60 * 1000;
      var disTime = Number(cTime - tTime);
      var timeFlag = eightTime - disTime;
      var timeTagStr = timeFlag > 0 ? GLOBAL.Util.getSpecialTimeStr(dateStr) : '';
      return timeTagStr;
    },

    loadGg: function (i, len, dspData) {
      var scope = this;
      var data = (dspData && dspData.data) || null;
      var dsp1 = null;
      var dsp2 = null;
      var dsp3 = null;
      var dspT = null;
      var dlen = (data instanceof Array) ? data.length : 0;
      var di = 0;
      if (dlen) {
        if (i === 1) {
          for (di = 0; di < dlen; di++) {
            if (Number(data[di].idx) === 1) {
              dsp1 = data[di];
            }
          }
          if (dsp1) {
            scope.loadDsp(dsp1, $hnList);
          } else {
            scope.insertGgForPullUp(i);
          }
        }
        if (i === 3) {
          for (di = 0; di < dlen; di++) {
            if (Number(data[di].idx) === 2) {
              dsp2 = data[di];
            }
          }
          if (dsp2) {
            scope.loadDsp(dsp2, $hnList);
          } else {
            scope.insertGgForPullUp(i);
          }
        }
        if (i === 6) {
          for (di = 0; di < dlen; di++) {
            if (Number(data[di].idx) === 3) {
              dsp3 = data[di];
            }
          }
          if (dsp3) {
            scope.loadDsp(dsp3, $hnList);
          } else {
            scope.insertGgForPullUp(i);
          }
        }
      } else {
        if (
          (i === 1) ||
          (i === 6) ||
          (i === 7 && scope.pageNum === 2)
        ) {
          scope.insertGgForPullUp(i);
        }
      }
    },

    insertGgForPullUp: function (pos) {
      var scope = this;
      var $ggWrapDom = null;
      var ggId = GLOBAL.Et.onlySogouGgId;
      if (scope.pageNum === 2) {
        if (pos === 0) {
        } else if (pos === 1) {
          scope.loadThree(GLOBAL.Et.gg.my.threeup);
        } else if (pos === 2) {
          scope.loadThree({
            id: 'bwofyvcfs',
            type: 'baidu',
            isempty: false
          });
        } else if (pos === 3) {
          scope.loadThree({
            id: GLOBAL.Et.gg.my.threemiddle.id || 'kkdaczkh8w',
            type: GLOBAL.Et.gg.my.threemiddle.type,
            isempty: GLOBAL.Et.gg.my.threemiddle.isempty
          });
        } else if (pos === 6) {
          scope.loadThree(GLOBAL.Et.gg.my.threedown);
        } else if (pos === 7) {
          scope.loadThree({
            id: '860450',
            type: 'sougou',
            isempty: false
          });
        }
      } else {
        if (ggId) {
          $ggWrapDom = $('<div class="gg-item news-gg-img1" style="border-bottom: 1px solid #f5f5f5;" data-ggid="' + ggId + '"></div>');
          $hnList.append($ggWrapDom);
          this.loadSogouGg($ggWrapDom, ggId);
        } else {
          if (bdGgIndex >= bdGgIds.length) {
            return;
          }
          ggId = bdGgIds[bdGgIndex++];
          $ggWrapDom = $('<div class="bdgg-wrap" data-ggid="' + ggId + '"></div>');
          $hnList.append($ggWrapDom);
          this.loadBaiduGg($ggWrapDom, ggId, true);
        }
      }
    },

    loadBaiduGg: function ($bdDom, ggId, hasLine) {
      if (hasLine) {
        $bdDom.append('<section class="gg-item news-gg-img3"><div id="' + ggId + '"></div><div class="line"></div></section>');
      } else {
        $bdDom.append('<section class="gg-item news-gg-img3"><div id="' + ggId + '"></div></section>');
      }
      GLOBAL.Util.getScript('//tt123.eastday.com/' + ggId + '.js', function () { }, $('#' + ggId)[0]);
    },

    loadThree: function (gg, pos) {
      if (!gg) {
        return;
      }
      var alliance = gg.type || 'baidu';
      var len = $hnList.children().length;
      var ggId = gg.id;
      if (ggId) {
        alliance = alliance.toLowerCase();
        if (pos) {
          if (pos >= len) {
            pos = len - 1;
          }
          $hnList.children().eq(pos).after('<section class="gg-item news-gg-img3"><div id="' + ggId + '"></div><div class="line"></div></section>');
        } else {
          $hnList.append('<section class="gg-item news-gg-img3"><div id="' + ggId + '"></div><div class="line"></div></section>');
        }
        GLOBAL.Util.getScript('//tt123.eastday.com/' + ggId + '.js', function () { }, $('#' + ggId)[0]);
      }
    },

    getDsp: function (callback) {
      var scope = this;
      $.ajax({
        url: scope.dspUrl,
        data: {
          type: GLOBAL.Et.newsType,
          qid: GLOBAL.Et.qid,
          uid: GLOBAL.Et.uid, // 用户ID
          os: GLOBAL.Util.getOsType(),
          thisurl: GLOBAL.Util.getUrlNoParams(),
          reqcount: Cookies.get('DFTT_DSP_INDEX'),
          adnum: 3,
          pgnum: scope.pageNum,
          adtype: 1236,
          dspver: '1.0.1',
          softtype: GLOBAL.Util.getQueryString('softtype') || 'news',
          softname: GLOBAL.Util.getQueryString('softname') || 'eastday_wapnews',
          newstype: 'ad',
          site: dspSite,
          imei: GLOBAL.Util.getQueryString('ime') || 'null',
          browser_type: GLOBAL.Util.getBrowserType() || 'null',
          pixel: window.screen.width + '*' + window.screen.height,
          fr_url: GLOBAL.Util.getUrlNoParams() || 'null', // 内页是当前url
          apptypeid: GLOBAL.Util.getQueryString('apptypeid') || 'null',
          appver: GLOBAL.Util.getQueryString('appver') || 'null',
          ver: GLOBAL.Util.getQueryString('ver') || 'null',
          appqid: GLOBAL.Util.getQueryString('appqid') || 'null',
          ttaccid: GLOBAL.Util.getQueryString('ttaccid') || 'null',
          deviceid: GLOBAL.Util.getQueryString('deviceid') || 'null'
        },
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        timeout: 3000,
        beforeSend: function () { },
        success: function (data) {
          callback && callback(data); // jshint ignore:line
        },
        error: function (jqXHR, textStatus) {
          console.error(textStatus);
          callback && callback(0); // eslint-disable-line
        },
        complete: function () {
          dspIndex++;
          Cookies.set('DFTT_DSP_INDEX', dspIndex, {
            expires: 7,
            path: '/',
            domain: 'eastday.com'
          });
        }
      });
    },

    loadDsp: function (d, $ggDom) {
      var scope = this;
      var adposition = d.idx;
      var url = d.url;
      var dateStr = d.date;
      var topic = d.topic;
      var source = d.source;
      var accurateurl = d.accurateurl;
      var isshowbackurl = d.isshowbackurl;
      var showbackurl = d.showbackurl;
      var isclickbackurl = d.isclickbackurl;
      var clickbackurl = d.clickbackurl;
      var inviewbackurl = d.inviewbackurl;
      var adStyle = d.adStyle;
      var platform = d.platform || 'null';
      var imgArr = d.miniimg;
      var tagStr = '<i class="promote">广告</i>';
      var advStr = 'class="J-dsp-news news-link" style="position:relative;" data-advurl="' + url + '" data-accurateurl="' + accurateurl + '" data-adpgnum="' + (scope.pageNum - 1) + '" data-adposition="' + adposition + '" data-clickbackurl="' + clickbackurl + '" data-showbackurl="' + showbackurl + '" data-inviewbackurl="' + inviewbackurl + '" data-isshowbackurl="' + isshowbackurl + '" data-isclickbackurl="' + isclickbackurl + '" data-platform="' + platform + '"';
      if (adStyle === 'big') {
        imgArr = d.lbimg;
        $ggDom.append([
          '<section class="news-item news-img-lg">',
          '<a ' + advStr + ' href="javascript:;">',
          '<h3 class="title dotdot line3">' + topic + '</h3>',
          '<p class="img img-bg">',
          '<img class="image" src="' + imgArr[0].src + '"></image>',
          '</p>',
          '<p class="tags">',
          '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
          '<em class="tag tag-src">' + source + '</em>',
          '</p>',
          '</a>',
          '</section>'
        ].join(''));
      } else if (adStyle === 'full') {
        imgArr = d.lbimg;
        $ggDom.append([
          '<section class="news-item news-img-full">',
          '<a ' + advStr + ' href="javascript:;">',
          '<p class="img img-bg">',
          '<img class="image" src="' + imgArr[0].src + '"></image>',
          '</p>',
          '<p class="tags">',
          '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
          '<em class="tag tag-src">' + source + '</em>',
          '</p>',
          '</a>',
          '</section>'
        ].join(''));
      } else if (adStyle === 'group') {
        $ggDom.append([
          '<section class="news-item news-img3">',
          '<a ' + advStr + ' href="javascript:;">',
          '<div class="info">',
          '<h3 class="title dotdot line3">' + topic + '</h3>',
          '</div>',
          '<div class="img">',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[0].src + '"></div>',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[1].src + '"></div>',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[2].src + '"></div>',
          '</div>',
          '<p class="tags">',
          '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
          '<em class="tag tag-src">' + source + '</em>',
          '</p>',
          '</a>',
          '</section>'
        ].join(''));
      } else if (adStyle === 'one') {
        $ggDom.append([
          '<section class="news-item news-img1">',
          '<a ' + advStr + ' href="javascript:;">',
          '<div class="info">',
          '<h3 class="title dotdot line3">' + topic + '</h3>',
          '<p class="tags">',
          '<em class="tag tag-time">' + (tagStr || GLOBAL.Util.getSpecialTimeStr(dateStr)) + '</em>',
          '<em class="tag tag-src">' + source + '</em>',
          '</p>',
          '</div>',
          '<div class="img img-bg"><img class="image" src="' + imgArr[0].src + '"></div>',
          '</a>',
          '</section>'
        ].join(''));
      }
    }
  };

  function Partner() {
    this.mygg = GLOBAL.Et.gg.my;
    this.dspUrl = 'http://106.75.98.65/partner/detail';
  }
  Partner.prototype = {
    constructor: Partner,
    init: function () {
      var scope = this;
      scope.loadTopGg(scope.mygg.top);
      scope.getDspForArtThree();
      scope.loadTujia(scope.mygg.tujia);
      scope.loadSix(scope.mygg.six);
    },

    getDspForTop: function (callback) {
      var scope = this;
      $.ajax({
        url: scope.dspUrl,
        data: {
          type: GLOBAL.Et.newsType,
          qid: GLOBAL.Et.qid,
          uid: GLOBAL.Et.uid,
          os: GLOBAL.Util.getOsType(),
          thisurl: GLOBAL.Util.getUrlNoParams(),
          adnum: 1,
          pgnum: -3,
          adtype: 236,
          dspver: '1.0.1',
          softtype: 'news',
          softname: 'eastday_wapnews',
          newstype: 'ad',
          site: dspSite,
          imei: GLOBAL.Util.getQueryString('ime') || 'null',
          browser_type: GLOBAL.Util.getBrowserType() || 'null',
          pixel: window.screen.width + '*' + window.screen.height,
          fr_url: GLOBAL.Util.getUrlNoParams() || 'null',
          apptypeid: GLOBAL.Util.getQueryString('apptypeid') || 'null',
          appver: GLOBAL.Util.getQueryString('appver') || 'null',
          ver: GLOBAL.Util.getQueryString('ver') || 'null',
          appqid: GLOBAL.Util.getQueryString('appqid') || 'null',
          ttaccid: GLOBAL.Util.getQueryString('ttaccid') || 'null',
          deviceid: GLOBAL.Util.getQueryString('deviceid') || 'null'
        },
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        timeout: 3000,
        beforeSend: function () { },
        success: function (res) {
          var data = res.data[0];
          if (data) {
            scope.generateDsp(data, 'top');
          } else {
            callback && callback();
          }
        },
        error: function (jqXHR, textStatus) {
          callback && callback();
        }
      });
    },

    getDspForSix: function (callback) {
      var scope = this;
      $.ajax({
        url: scope.dspUrl,
        data: {
          type: GLOBAL.Et.newsType,
          qid: GLOBAL.Et.qid,
          uid: GLOBAL.Et.uid,
          os: GLOBAL.Util.getOsType(),
          thisurl: GLOBAL.Util.getUrlNoParams(),
          adnum: 2,
          pgnum: -6,
          adtype: 3,
          dspver: '1.0.1',
          softtype: 'news',
          softname: 'eastday_wapnews',
          newstype: 'ad',
          site: dspSite,
          imei: GLOBAL.Util.getQueryString('ime') || 'null',
          browser_type: GLOBAL.Util.getBrowserType() || 'null',
          pixel: window.screen.width + '*' + window.screen.height,
          fr_url: GLOBAL.Util.getUrlNoParams() || 'null', // 内页是当前url
          apptypeid: GLOBAL.Util.getQueryString('apptypeid') || 'null',
          appver: GLOBAL.Util.getQueryString('appver') || 'null',
          ver: GLOBAL.Util.getQueryString('ver') || 'null',
          appqid: GLOBAL.Util.getQueryString('appqid') || 'null',
          ttaccid: GLOBAL.Util.getQueryString('ttaccid') || 'null',
          deviceid: GLOBAL.Util.getQueryString('deviceid') || 'null'
        },
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        timeout: 3000,
        beforeSend: function () { },
        success: function (res) {
          var data = res.data;
          var dlen = data.length || 0;
          if (dlen > 1) {
            scope.generateDspForSix(data);
          } else {
            callback && callback();
          }
        },
        error: function (jqXHR, textStatus) {
          callback && callback();
        }
      });
    },

    generateDspForSix: function (data) {
      if (!data || !data.length) {
        return false;
      }
      for (var k = 0; k < data.length; k++) {
        var item = data[k];
        var clickbackurl = item.clickbackurl || 'null';
        var isclickbackurl = item.isclickbackurl;
        var showbackurl = item.showbackurl;
        var isshowbackurl = item.isshowbackurl;
        var inviewbackurl = item.inviewbackurl;
        var source = item.source;
        var topic = item.topic;
        var url = item.url;
        var imgArr = item.miniimg;
        var advStr = 'class="news-link J-dsp-news" style="margin:0;padding:0;text-decoration:none;display:block;position:relative;" data-advurl="' + url + '" data-inviewbackurl="' + inviewbackurl + '" data-clickbackurl="' + clickbackurl + '" data-isclickbackurl="' + isclickbackurl + '"';
        $inList.append(['<section class="news-item news-img3">',
          '<a ' + advStr + ' href="javascript:;">',
          '<div class="dsp-title-wrap" style="width:100%;position:absolute;bottom:0;color:#fff;background:rgba(0,0,0,0.6);padding:0 5px;">',
          '<h3 class="article_title" style="color:#fff;font-size:12px;line-height:16px;width:80%;overflow: hidden;white-space: nowrap;text-overflow:ellipsis;">' + topic + '</h3>',
          '<span class="article_src" style="color:#fff;font-size:12px;line-height:16px;position:absolute;right:5px;bottom:0;">' + source + '</span>' +
          '</div>',
          '</div>',
          '<div class="img">',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[0].src + '"></div>',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[1].src + '"></div>',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[2].src + '"></div>',
          '</div>',
          '</a>',
          '</section>'].join(''));
      }
      $inList.append('<span style="color:#fff;padding:2px 4px;font-size:12px;position:absolute;right:2px;top:6px;background:rgba(0,0,0,0.3);display:block;">广告</span>');
    },

    generateDsp: function (d, position) {
      var url = d.url;
      var topic = d.topic;
      var source = d.source;
      var isshowbackurl = d.isshowbackurl;
      var showbackurl = d.showbackurl;
      var isclickbackurl = d.isclickbackurl;
      var clickbackurl = d.clickbackurl;
      var inviewbackurl = d.inviewbackurl;
      var adStyle = d.adStyle;
      var imgArr = d.miniimg;
      var tagStr = '<i class="promote">广告</i>';
      var advStr = 'class="J-dsp-news news-link" style="border-bottom:0;position:relative;padding:0;margin:15px;" data-advurl="' + url + '" data-clickbackurl="' + clickbackurl + '" data-inviewbackurl="' + inviewbackurl + '" data-showbackurl="' + showbackurl + '" data-isshowbackurl="' + isshowbackurl + '" data-isclickbackurl="' + isclickbackurl + '"';
      var dataStr = '';
      var titleStr = position === 'top' ? '<h3 class="title dotdot line3" style="height:22px;font-size:13px;color:#333;">' + topic + '</h3>' : '<h3 class="title dotdot line3">' + topic + '</h3>';

      if (adStyle === 'full') {
        imgArr = d.lbimg;
        dataStr = [
          '<section class="news-item news-img-full">',
          '<a ' + advStr + ' href="javascript:;">',
          '<p class="img img-bg">',
          '<img class="image" src="' + imgArr[0].src + '"></image>',
          '</p>',
          '<p class="tags">',
          '<em class="tag tag-time">' + tagStr + '</em>',
          '<em class="tag tag-src">' + source + '</em>',
          '</p>',
          '</a>',
          '</section>'
        ].join('');
      } else if (adStyle === 'group') {
        dataStr = [
          '<section class="news-item news-img3">',
          '<a ' + advStr + ' href="javascript:;">',
          '<div class="info">',
          titleStr,
          '</div>',
          '<div class="img">',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[0].src + '"></div>',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[1].src + '"></div>',
          '<div class="img-wrap img-bg"><img class="image" src="' + imgArr[2].src + '"></div>',
          '</div>',
          '<p class="tags">',
          '<em class="tag tag-time">' + tagStr + '</em>',
          '<em class="tag tag-src">' + source + '</em>',
          '</p>',
          '</a>',
          '</section>'
        ].join('');
      } else if (adStyle === 'one') {
        dataStr = [
          '<section class="news-item news-img1">',
          '<a ' + advStr + ' href="javascript:;">',
          '<div class="info">',
          '<h3 class="title dotdot line3">' + topic + '</h3>',
          '<p class="tags">',
          '<em class="tag tag-time">' + tagStr + '</em>',
          '<em class="tag tag-src">' + source + '</em>',
          '</p>',
          '</div>',
          '<div class="img img-bg"><img class="image" src="' + imgArr[0].src + '"></div>',
          '</a>',
          '</section>'
        ].join('');
      }
      switch (position) {
        case 'top':
          $article.before(dataStr);
          break;
        case 'article':
          $('#news_check').before(dataStr);
          break;
        case 'three':
          $hotNews.append(dataStr);
          break;
        default:
          $('body').prepend(dataStr);
      }
    },

    getDspForArtThree: function () {
      var scope = this;
      try {
        if (!Cookies.get('DFTT_DSP_INDEX')) {
          Cookies.set('DFTT_DSP_INDEX', dspIndex, {
            expires: 7,
            path: '/',
            domain: 'eastday.com'
          });
          dspIndex = Cookies.get('DFTT_DSP_INDEX');
        } else {
          dspIndex = Cookies.get('DFTT_DSP_INDEX');
        }
      } catch (e) {
        console.error(e);
      }
      $.ajax({
        url: scope.dspUrl,
        data: {
          type: GLOBAL.Et.newsType,
          qid: GLOBAL.Et.qid,
          uid: GLOBAL.Et.uid, // 用户ID
          os: GLOBAL.Util.getOsType(),
          thisurl: GLOBAL.Util.getUrlNoParams(),
          reqcount: Cookies.get('DFTT_DSP_INDEX'),
          adnum: 2,
          pgnum: -1,
          adtype: 23, // 1：大图 2：单图 3：三图
          dspver: '1.0.1',
          softtype: 'news',
          softname: 'eastday_wapnews',
          newstype: 'ad',
          site: dspSite,
          imei: GLOBAL.Util.getQueryString('ime') || 'null',
          browser_type: GLOBAL.Util.getBrowserType() || 'null',
          pixel: window.screen.width + '*' + window.screen.height,
          fr_url: GLOBAL.Util.getUrlNoParams() || 'null', // 内页是当前url
          apptypeid: GLOBAL.Util.getQueryString('apptypeid') || 'null',
          appver: GLOBAL.Util.getQueryString('appver') || 'null',
          ver: GLOBAL.Util.getQueryString('ver') || 'null',
          appqid: GLOBAL.Util.getQueryString('appqid') || 'null',
          ttaccid: GLOBAL.Util.getQueryString('ttaccid') || 'null',
          deviceid: GLOBAL.Util.getQueryString('deviceid') || 'null'
        },
        dataType: 'jsonp',
        jsonp: 'jsonpcallback',
        timeout: 3000,
        beforeSend: function () { },
        success: function (res) {
          scope.loadDspForArtThree(res);
        },
        error: function (jqXHR, textStatus) {
          hasArticledownGg = true;
          scope.loadDspForArtThree([]);
        }
      });
    },

    loadDspForArtThree: function (dspData) {
      var scope = this;
      var data = (dspData && dspData.data) || null;
      var dlen = (data instanceof Array) ? data.length : 0;
      var dsp1 = null;
      var dsp2 = null;
      var di = 0;
      for (di = 0; di < dlen; di++) {
        if (Number(data[di].idx) === 1) {
          dsp1 = data[di];
        }
        if (Number(data[di].idx) === 2) {
          dsp2 = data[di];
        }
      }
      if (dsp1) {
        scope.generateDsp(dsp1, 'article');
        hasArticledownGg = true;
      } else {
        scope.loadArticleDown(scope.mygg.articledown);
        hasArticledownGg = true;
      }
      if (dsp2) {
        scope.generateDsp(dsp2, 'three');
      } else {
        scope.loadThreeAfterSix(GLOBAL.Et.gg.my.three);
      }
    },

    loadThreeAfterSix: function (gg) {
      var ggId = (gg && gg.id) || 'jr3a1ece97f0c2f13fdb14798aafed22e01be7dc172fe630fb51322bda'; // 广告ID
      $hotNews.append('<section class="gg-item news-gg-img3"><div id="' + ggId + '"></div></section>');
      GLOBAL.Util.getScript('//tt123.eastday.com/' + ggId + '.js', function () { }, $('#' + ggId)[0]);
    },

    loadArticleDown: function (gg) {
      if (!gg) {
        return;
      }
      var alliance = gg.type;
      var ggId = gg.id;
      var isEmpty = gg.isempty;
      if (isEmpty) {
        return;
      }
      if (ggId) {
        alliance = alliance.toLowerCase();
        $('#news_check').before('<section class="gg-item" style="margin-top: 30px;"><div id="' + ggId + '"></div><div class="line"></div></section>');
        GLOBAL.Util.getScript('//tt123.eastday.com/' + ggId + '.js', function () { }, $('#' + ggId)[0]);
      }
    },

    loadTopGg: function (gg) {
      var scope = this;
      if (!gg) {
        return;
      }
      var alliance = gg.type;
      var ggId = gg.id;
      var isEmpty = gg.isempty;
      var mark = ''; // 备注
      if (isEmpty) {
        return;
      }
      if (ggId) {
        scope.getDspForTop(function () {
          alliance = alliance.toLowerCase();
          $article.before('<section class="gg-item news-gg-img3"><div id="' + ggId + '"></div><div class="line"></div></section>');
          GLOBAL.Util.getScript('//tt123.eastday.com/' + ggId + '.js', function () { }, $('#' + ggId)[0]);
        });
      }
    },

    loadSix: function (gg) {
      if (!gg) {
        return;
      }
      var alliance = gg.type;
      var ggId = gg.id;
      var isEmpty = gg.isempty;
      if (isEmpty) {
        return;
      }
      var scope = this;
      $interestNews.append('<div class="section-title in-title"><h2><span></span>猜你喜欢<span class="line"></span></h2></div>').append($inList);
      if (ggId) {
        scope.getDspForSix(function () {
          alliance = alliance.toLowerCase();
          $inList.append('<div class="baidu-wrap"><div id="' + ggId + '"></div></div>');
          GLOBAL.Util.getScript('//tt123.eastday.com/' + ggId + '.js', function () { }, $('#' + ggId)[0]);
        });
      }
    },

    loadTujia: function (gg) {
      if (!gg) {
        return;
      }
      var ggId = gg.id;
      var alliance = gg.type;
      var isEmpty = gg.isempty;
      if (isEmpty) {
        return;
      }
      if (ggId) {
        alliance = alliance.toLowerCase();
        document.write('<scr' + 'ipt>var baiduImagePlus = {imgContainerId:"J_article",maxAdCount: 999, unionId:"' + ggId + '"};</scr' + 'ipt>');
        document.write('<scr' + 'ipt src="//tt123.eastday.com/cpro/ui/mi.js" async></scr' + 'ipt>');
      }
    }
  };

  function PhotoView() { }
  PhotoView.prototype = {
    constructor: PhotoView,
    init: function (gallerySelector) {
      this.initPhotoSwipeFromDOM(gallerySelector);
    },
    initPhotoSwipeFromDOM: function (gallerySelector) {
      var getFigureNodes = function (nodes) {
        var figureNodes = [];
        if (nodes && nodes.length > 0) {
          for (var i = 0; i < nodes.length; i++) {
            var tn = nodes[i].tagName;
            if (tn && tn.toUpperCase() === 'FIGURE') {
              figureNodes.push(nodes[i]);
            }
          }
        }
        return figureNodes;
      };
      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes;
        var figureNodes = getFigureNodes(thumbElements);
        var figureLen = figureNodes.length;
        var items = [];
        var linkEl;
        var imgEl;
        // var size;
        var item;
        var figureEl;
        var cnode;
        for (var i = 0; i < figureLen; i++) {
          figureEl = figureNodes[i]; // <figure> element
          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue;
          }
          linkEl = figureEl.children[0]; // <a> element
          imgEl = linkEl.children[0]; // <img> element
          // size = linkEl.getAttribute('data-size').split('x');

          // create slide object
          item = {
            src: linkEl.getAttribute('href') || imgEl.getAttribute('src'),
            w: parseInt(imgEl.getAttribute('data-width')) || parseInt(imgEl.getAttribute('data-weight')),
            h: parseInt(imgEl.getAttribute('data-height'))
            // w: parseInt(size[0], 10),
            // h: parseInt(size[1], 10)
          };
          if (figureEl.children.length > 1) {
            // <figcaption> content
            cnode = figureEl.children[1];
            while (cnode && cnode.nodeName !== 'FIGCAPTION') {
              cnode = cnode.nextSibling;
            }
            if (cnode) {
              item.title = cnode.innerHTML;
            }
          }
          if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src');
          }
          item.el = figureEl; // save link to element for getThumbBoundsFn
          items.push(item);
        }
        return items;
      };

      // find nearest parent element
      var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
      };

      // triggers when user clicks on thumbnail
      var onThumbnailsClick = function (e) {
        e = e || window.event;
        var eTarget = e.target || e.srcElement;
        if (eTarget.tagName.toUpperCase() !== 'IMG') {
          return;
        }
        e.preventDefault ? e.preventDefault() : e.returnValue = false; // jshint ignore:line
        // find root element of slide
        var clickedListItem = closest(eTarget, function (el) {
          return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if (!clickedListItem) {
          return;
        }
        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode;
        var childNodes = clickedListItem.parentNode.childNodes;
        var figureNodes = getFigureNodes(childNodes);
        // var figureLen = figureNodes.length;
        var nodeIndex = 0;
        var index;
        for (var i = 0; i < figureNodes.length; i++) {
          if (figureNodes[i].nodeType !== 1) {
            continue;
          }
          if (figureNodes[i] === clickedListItem) {
            index = nodeIndex;
            break;
          }
          nodeIndex++;
        }
        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery);
        }
        return false;
      };

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1);
        var params = {};
        if (hash.length < 5) {
          return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue;
          }
          var pair = vars[i].split('=');
          if (pair.length < 2) {
            continue;
          }
          params[pair[0]] = pair[1];
        }
        if (params.gid) {
          params.gid = parseInt(params.gid, 10);
        }
        return params;
      };

      var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0];
        var gallery;
        var options;
        var items;
        items = parseThumbnailElements(galleryElement);
        // define options (if needed)
        options = {
          // define gallery index (for URL)
          index: index,
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),
          tapToClose: true,
          closeOnVerticalDrag: false,
          loop: true,
          closeOnScroll: false,
          history: false,
          getThumbBoundsFn: function (index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            var thumbnail = items[index].el.getElementsByTagName('img')[0]; // find thumbnail
            var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
            var rect = thumbnail.getBoundingClientRect();
            return {
              x: rect.left,
              y: rect.top + pageYScroll,
              w: rect.width
            };
          }
        };
        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (var j = 0; j < items.length; j++) {
              if (items[j].pid == index) {
                options.index = j;
                break;
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1;
          }
        } else {
          options.index = parseInt(index, 10);
        }
        // exit if index not found
        if (isNaN(options.index)) {
          return;
        }
        if (disableAnimation) {
          options.showAnimationDuration = 0;
        }
        // Pass data to PhotoSwipe and initialize it
        /* global PhotoSwipe:true */
        /* global PhotoSwipeUI_Default:true */
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
      };
      // loop through all gallery elements and bind events
      var galleryElements = document.querySelectorAll(gallerySelector);
      for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
      }
      // Parse URL and open gallery if it contains #&pid=3&gid=1
      var hashData = photoswipeParseHash();
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
      }
    }
  };

  (function () {
    var partner = new Partner();
    partner.init();
  }());

  $(function () {
    FastClick.attach(document.body);
    var eastDetails = new EastDetails();
    var photoView = new PhotoView();
    try {
      eastDetails.init();
    } catch (e) {
      console.error(e);
    }
    try {
      photoView.init('.J-article-content');
    } catch (e) {
      console.error(e);
    }
  });
}());