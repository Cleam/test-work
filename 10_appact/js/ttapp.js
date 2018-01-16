var App_Js_Agreement = 'js-m-action://';
/* 被APP调用的全局外部方法 */
// 分享
var GLOBAL_APP_PAR_shareUrl;
var GLOBAL_APP_PAR_shareTitle;
var GLOBAL_APP_PAR_shareDes;
var GLOBAL_APP_PAR_shareImg;
function shareWithWebdata(){
	return GLOBAL_APP_PAR_shareImg+'@#$'+GLOBAL_APP_PAR_shareTitle+'@#$'+GLOBAL_APP_PAR_shareDes+'@#$'+GLOBAL_APP_PAR_shareUrl;
}
var GLOBAL_APP_PAR_pushimg;
function pushimgToClient(){
	return GLOBAL_APP_PAR_pushimg;
}
function shareWithWebdataToWXHY(){
	return shareWithWebdata();
}
function shareWithWebdataToWXPYQ(){
	return shareWithWebdata();
}
function shareWithWebdataToQQ(){
	return shareWithWebdata();
}
function shareWithWebdataToQQKJ(){
	return shareWithWebdata();
}
function shareWithWebdataToSINAWB(){
	return shareWithWebdata();
}

// 获得用户信息
var GLOBAL_APP_PAR_userAccid;
var GLOBAL_APP_PAR_userMobile;
var GLOBAL_APP_PAR_userNick;
var GLOBAL_APP_PAR_userImage;
var GLOBAL_APP_PAR_userBonus;
var GLOBAL_APP_PAR_userMoney;
function setUserInfo(accid, mobile, nick, image, bonus, money){
	GLOBAL_APP_PAR_userAccid = accid;
	GLOBAL_APP_PAR_userMobile = mobile;
	GLOBAL_APP_PAR_userNick = nick;
	GLOBAL_APP_PAR_userImage = image;
	GLOBAL_APP_PAR_userBonus = bonus;
	GLOBAL_APP_PAR_userMoney = money;
}

// 获得客户端信息
var GLOBAL_APP_PAR_clientVersion = null;
var GLOBAL_APP_PAR_clientOEM = null;
var GLOBAL_APP_PAR_clientQid = null;
var GLOBAL_APP_PAR_clientIMEI = null;
var GLOBAL_APP_PAR_clientMachine = null;
var GLOBAL_APP_PAR_clientPlantform = null;
var GLOBAL_APP_PAR_clientQidWithtime = null;
function setClientInfo(version, oem, qid, imei, machine, plantform, qidwithtime){
	GLOBAL_APP_PAR_clientVersion = version;
	GLOBAL_APP_PAR_clientOEM = oem;
	GLOBAL_APP_PAR_clientQid = qid;
	GLOBAL_APP_PAR_clientIMEI = imei;
	GLOBAL_APP_PAR_clientMachine = machine;
	GLOBAL_APP_PAR_clientPlantform = plantform;
	GLOBAL_APP_PAR_clientQidWithtime = qidwithtime;
}

// 获得用户微信信息
var GLOBAL_APP_PAR_userNick;
var GLOBAL_APP_PAR_userImage;
var GLOBAL_APP_PAR_userOpenid;
function setUserWxInfo(nick, image, openid){
	GLOBAL_APP_PAR_userNick = nick;
	GLOBAL_APP_PAR_userImage = image;
	GLOBAL_APP_PAR_userOpenid = openid;
}

/* JS APP交互插件 */
(function ($) {
	function callapp(fun_name){
		location.href = App_Js_Agreement+fun_name;
	}
	function init_shar_info(opt){
		GLOBAL_APP_PAR_shareUrl = opt.shareUrl;
		GLOBAL_APP_PAR_shareTitle = opt.shareTitle;
		GLOBAL_APP_PAR_shareDes = opt.shareDes;
		GLOBAL_APP_PAR_shareImg = opt.shareImg;
	}
	function init_pushimg_info(opt){
		GLOBAL_APP_PAR_pushimg = opt.imgUrl;
	}
	jQuery.ttapp = {
		share: function(opt){
			init_shar_info(opt);
			callapp('shareWithWebdata');
		},
		pushimg: function(opt){
			init_pushimg_info(opt);
			callapp('pushimgToClient');
		},
		login: function(){
			callapp('goToViewLogin');
		},
		home: function(){
			callapp('goToViewHome');
		},
		my: function(){
			callapp('goToViewMy');
		},
		wallet: function(){
			callapp('goToViewWallet');
		},
		mall: function(){
			callapp('goToViewmall');
		},
		mission: function(){
			callapp('goToViewmission');
		},
		invitation: function(){
			callapp('goToViewInvitation');
		},
		wakeapprentice: function(){
			callapp('goToViewWakeupApprentice');
		},
		bindmobile: function(){
			callapp('goToViewBindMobile');
		},
		bindwx: function(){
			callapp('goToViewBindWx');
		},
		openwx: function(){
			callapp('openWxClient');
		},
		userinfo: function(_callback){
			GLOBAL_APP_PAR_userAccid = null;
			callapp('setUserInfo');
			var get_userinfo_timer = setInterval(function(){
				if(GLOBAL_APP_PAR_userAccid != null){
					clearInterval(get_userinfo_timer);
					_callback({
						Accid: GLOBAL_APP_PAR_userAccid,
						Mobile: GLOBAL_APP_PAR_userMobile,
						Nick: GLOBAL_APP_PAR_userNick,
						Image: GLOBAL_APP_PAR_userImage,
						Bonus: GLOBAL_APP_PAR_userBonus,
						Money: GLOBAL_APP_PAR_userMoney
					});
				}
			}, 500);
		},
		share_wxhy: function(opt){
			init_shar_info(opt);
			callapp('shareWithWebdataToWXHY');
		},
		share_wxpyq: function(opt){
			init_shar_info(opt);
			callapp('shareWithWebdataToWXPYQ');
		},
		share_qq: function(opt){
			init_shar_info(opt);
			callapp('shareWithWebdataToQQ');
		},
		share_qqkj: function(opt){
			init_shar_info(opt);
			callapp('shareWithWebdataToQQKJ');
		},
		share_sinawb: function(opt){
			init_shar_info(opt);
			callapp('shareWithWebdataToSINAWB');
		},
		clientinfo: function(_callback){
			callapp('setClientInfo');
			var get_clientinfo_timer = setInterval(function(){
				if(GLOBAL_APP_PAR_clientPlantform != null){
					clearInterval(get_clientinfo_timer);
					_callback({
						Version: GLOBAL_APP_PAR_clientVersion,
						OEM: GLOBAL_APP_PAR_clientOEM,
						Qid: GLOBAL_APP_PAR_clientQid,
						IMEI: GLOBAL_APP_PAR_clientIMEI,
						Machine: GLOBAL_APP_PAR_clientMachine,
						Plantform: GLOBAL_APP_PAR_clientPlantform,
						QidWithTime: GLOBAL_APP_PAR_clientQidWithtime
					});
				}
			}, 500);
		},
		userwxinfo: function(_callback){
			callapp('setUserWxInfo');
			var get_userwxinfo_timer = setInterval(function(){
				if(GLOBAL_APP_PAR_userNick != null){
					clearInterval(get_userwxinfo_timer);
					_callback({
						Nick: GLOBAL_APP_PAR_userNick,
						Image: GLOBAL_APP_PAR_userImage,
						Openid: GLOBAL_APP_PAR_userOpenid
					});
				}
			}, 1000);
		}
	};
})(jQuery);