(function(doc, win) {
  var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
          var clientWidth = docEl.clientWidth,
              MAX_WIDTH = 750;
          if (!clientWidth) {
              return;
          }
          if (clientWidth >= MAX_WIDTH) {
              docEl.style.fontSize = '100px';
          } else {
              docEl.style.fontSize = 100 * (clientWidth / MAX_WIDTH) + 'px';
          }
      };
  recalc();
  if (!doc.addEventListener) {
      return;
  }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 后台生成的渠道（测试）  内容为var TTH5_QIDS = ['null','ceshi1'];
// document.write('<scr' + 'ipt type="text/javascript" src="http://testing.eastday.com/toutiao_h5_test/channeljs/h5toutiao/h5toutiaocookie.js"></scr' + 'ipt>')

// 后台生成的渠道（正式）  内容为var TTH5_QIDS = ['null','ceshi1'];
// document.write('<scr' + 'ipt type="text/javascript" src="//mini.eastday.com/toutiaoh5/channeljs/h5toutiao/h5toutiaocookie.js"></scr' + 'ipt>')