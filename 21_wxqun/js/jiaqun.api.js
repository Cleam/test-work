var city = '';
if (remote_ip_info) {
  city = remote_ip_info['city'];
  if (city.length == 0) {
    city = remote_ip_info['province'];
  }
}
if (!city) {
  city = '';
}

var renshu = rnd(200, 450);
$('#activity-name').text(city + '骚女找泡友' + rnd(10, 40) + '群');
$('#jiaqun-name').text('你的朋友邀请你加入群聊');
$('#renshu').text(renshu + '人');
function rnd(n, m) {
  var random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

$('body').on('touchmove', function(event) {
  event.preventDefault();
});
document.addEventListener(
  'touchmove',
  function(e) {
    e.preventDefault();
  },
  false
);

$('.bon').click(function() {
  $('.fenxiang').show();
  $(this).text('正在申请中...');
  jiazai();
  share_config();
});

function share_config() {
  $.ajax({
    type: 'GET',
    url:
      '/' +
      Math.random()
        .toString(36)
        .substr(2) +
      '/owis?url=' +
      encodeURIComponent(location.href.split('#')[0]),
    dataType: 'jsonp',
    jsonp: 'callback',
    success: function(result) {
      window.data = result;
      wx.config(window.data.config);
      showMask();
      showtip();
      window.share_info = result;
      wx.ready(function() {
        wx.hideOptionMenu();
        wx.showMenuItems({ menuList: ['menuItem:share:appMessage'] });
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua) && window.share_info.adfx) {
          wx.onMenuShareAppMessage({
            title: window.share_info.to_timeline2.title.replace('{city}', city), // 分享标题
            desc: window.share_info.to_timeline2.desc,
            link: window.share_info.to_timeline2.link,
            imgUrl: window.share_info.to_timeline2.img, // 分享图标
            success: function() {
              shareATimes += 1;
              share_tip();
              sharereq(++idx);
            },
            cancel: function() {}
          });
        } else {
          wx.onMenuShareAppMessage({
            title: window.share_info.to_group.title.replace('{city}', city),
            desc: window.share_info.to_group.desc.replace('{city}', city),
            link: window.share_info.to_group.link,
            imgUrl: window.share_info.to_group.img,
            success: function() {
              shareATimes += 1;
              share_tip();
              sharereq(++idx);
            },
            cancel: function() {}
          });
        }
        wx.onMenuShareTimeline({
          title: window.share_info.to_timeline.title.replace('{city}', city), // + myDate.toLocaleTimeString(),
          desc: window.share_info.to_timeline.desc,
          link: window.share_info.to_timeline.link,
          imgUrl: window.share_info.to_timeline.img,
          success: function() {
            shareTTimes += 1;
            share_tip(shareATimes, shareTTimes);
          },
          cancel: function() {}
        });
      });
    }
  });
}

weui = {
  alert: function(n, t, i) {
    var r, u;
    t = t ? t : '';
    r =
      '<div class="weui_dialog_alert" style="position: fixed; z-index: 2000; display: none;margin-left:15%;margin-right:15%">';
    r += '<div class="weui_mask"></div>';
    r += '<div class="weui_dialog">';
    r +=
      '    <div class="weui_dialog_hd"><strong class="weui_dialog_title">' +
      t +
      '</strong></div>';
    r +=
      '    <div class="weui_dialog_bd" style="color:#000;padding-top:20px;padding-bottom:10px;"></div>';
    r += '    <div class="weui_dialog_ft">';
    r +=
      '      <a href="javascript:;" class="weui_btn_dialog primary">确定</a>';
    r += '  </div>';
    r += ' </div>';
    r += '</div>';
    $('.weui_dialog_alert').length > 0
      ? $('.weui_dialog_alert .weui_dialog_bd').empty()
      : $('body').append(r);
    u = $('.weui_dialog_alert');
    u.show();
    u.find('.weui_dialog_bd').html(n);
    u
      .find('.weui_btn_dialog')
      .off('click')
      .on('click', function() {
        u.hide();
        i && i();
      });
  }
};

var ua = navigator.userAgent.toLowerCase();
var result = /micromessenger/.test(ua);
if (!result) {
}

function share_tip() {
  if (shareATimes == 1) {
    weui.alert(
      '<b style="font-size: 22px">分享成功！</b><br>请继续分享到<b style="font-size: 18px;color: red">2</b>个不同的群!<b style="font-size: 20px;color: red;">即可进群</b>！'
    );
  } else if (shareATimes == 2) {
    weui.alert(
      '<b style="font-size: 22px">分享失败！</b><br>注意:分享到相同的群会失败<b style="font-size: 18px;color: red"></b><br>请继续分享到<b style="font-size: 18px;color: red">2</b>个不同的群!<b style="font-size: 20px;color: red;">即可进群</b>！'
    );
  } else if (shareATimes == 3) {
    weui.alert(
      '<b style="font-size: 22px">分享成功！</b><br>请继续分享到<b style="font-size: 18px;color: red">1</b>个不同的群!<b style="font-size: 20px;color: red;">即可进群</b>！'
    );
  } else {
    if (shareTTimes < 1) {
      weui.alert(
        '<b style="font-size: 30px;color: #f5294c">分享成功！</b><br>最后请分享到<b style="font-size: 30px;color: #f5294c">朋友圈</b>即可进群!'
      );
      wx.hideOptionMenu();
      wx.showMenuItems({
        menuList: ['menuItem:share:timeline']
      });
    } else {
      if (shareTTimes == 1) {
        wx.onMenuShareTimeline({
          title: window.share_info.to_timeline2.title.replace('{city}', city),
          link: window.share_info.to_timeline2.link,
          imgUrl: window.share_info.to_timeline2.img,
          success: function() {
            shareTTimes += 1;
            share_tip(shareATimes, shareTTimes);
          },
          cancel: function() {}
        });

        weui.alert(
          '<span style="font-size: 30px;color: #f5294c">分享失败</span><br>再分享一次<span style="font-size: 30px;color: #f5294c">朋友圈</span>即可进群!'
        );
      } else {
        weui.alert(
          '<b>由于参与人数过多！<br/>群主稍后拉你进群，请耐心等待<br/><br/>朋友圈信息不可删除<br/><span style="color:#0bb20c">否则无法核实！</span></b>',
          '好',
          function() {}
        );
      }
    }
  }
}

function show_tip() {
  ele = $('.weui_dialog_alert');
  if (ele.length > 0) {
    ele.show();
    return;
  }
  showtip();
}

$('#yfenxiang').on('click', function() {
  show_tip();
});

function showtip() {
  weui.alert(
    '<b>提示：完成分享任务，即可进群<br/>（请分享到一个微信群）<br/><br/>当前群人数<span style="font-size: 30px;color: #f5294c">' +
      renshu +
      '</span>人</b>'
  );
}

function jiazai() {
  weui.alert(
    '<img style="width: 40px;margin-top: -30px" src="//puep.qpic.cn/coral/Q3auHgzwzM4fgQ41VTF2rN41ibuV99MPdQAGo6WSIP2aicKRzEKUtaxg/0"><br><b style="font-size: 22px;color: red">加群申请中,请稍等!</b>'
  );
}

function showMask() {
  $('#yfenxiang').show();
}

var shareATimes = 0;
var shareTTimes = 0;
document.title = '群聊邀请';

var ua = navigator.userAgent;

var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
  isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
  isAndroid = ua.match(/(Android)\s+([\d.]+)/),
  isMobile = isIphone || isAndroid;
if (!isMobile) {
  location.href = 'http://m.qq.com';
}
