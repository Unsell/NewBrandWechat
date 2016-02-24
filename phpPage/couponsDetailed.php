<?php
require "/data/api/config/config.core.php";
require_once "/data/api/class/jssdk.php";

$shopid = isset($_REQUEST['sid']) ? filter($_REQUEST['sid']) : '';
if(!strpos($_SERVER["HTTP_USER_AGENT"],"MicroMessenger")) {
	header('Location: http://new.29mins.com/weixin/share/default.php?sid='.$shopid);
}
$jssdk = new JSSDK(appID, appsecret);
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="title" content="觅技 - 选择谁服务您，这本来就是您的权利" /> 
 	    <meta name="keywords" content="挑选技师，水疗SPA" /> 
  		<meta name="description" content="选择谁服务您，这本来就是您的权利" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">	
		<meta name="viewport" content="target-densitydpi=device-dpi, width=640,user-scalable=no" />
		<meta name="format-detection" content="telephone=no" />
		<link rel="stylesheet" type="text/css" href="../css/mui.min.css"/>
		<link rel="stylesheet" type="text/css" href="../css/common.css"/>
		<link rel="stylesheet" type="text/css" href="../css/couponsDetailed.css"/>
		<title>我的卡劵</title>
	</head>
	<body>
		<div class="mui-content">
			<div class="coupons-header">
				<div class="coupons-number"><span></span></div>
			</div>
			<div class="coupons-detailed">
				<div class="coupons-price"></div>
				<div class="box-time-infor">
					<div class="time-infor-title">开始时间</div>
					<div class="time-infor begin-time"></div>
				</div>
				<div class="box-time-infor">
					<div class="time-infor-title">开始时间</div>
					<div class="time-infor end-time"></div>
				</div>
				<div class="box-button">
					<button class="btn-use" type="button">立即使用</button>
					<button class="btn-share" type="button">送给朋友</button>
				</div>
			</div>
			<div class="applicable-store">
				<span>适用门店</span>
				<span class="mui-icon mui-icon-arrowright"></span>
			</div>
			<div class="use-rule">
				<span>使用规则</span>
				<ul>
					
				</ul>
			</div>
		</div>
		<!--弹窗-验证-->
		<div class="mui-backdrop popup-validate">
			<div class="box-validate">
				<div class="popup-header">
					<div class="popup-header-sign"></div>
					<div class="popup-header-title">验证</div>
					<div class="popup-close"><span class="mui-icon mui-icon-closeempty"></span></div>
				</div>
				<div class="popup-content">
					<form action="" method="">
						<input class="phone" type="tel" name="" id="" value="" placeholder="请输入您的手机号码" />
						<input class="verification-code" type="number" name="" id="" value="" placeholder="请输入您的验证码" />
						<button class="obtain-code" type="button">获取验证码</button>
						<input class="submit" type="button" value="完成验证并领取代金券"/>
					</form>
				</div>
			</div>
		</div>
		<div class="vice-nav clearfix">
			<a class="nav-back" >返回</a>
			<a class="nav-coupons">我的卡劵</a>
			<a class="nav-techlist" >技师列表</a>
		</div>
		<!--遮罩层-->
		<div class="mui-backdrop popup-share">
			<div class="tip-share">点击右上角的发送给朋友即可把优惠劵发送给朋友</div>
		</div>
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/mui.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script type="text/javascript">
			wx.config({
			    debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: '<?php echo $signPackage["appId"];?>',
			    timestamp: <?php echo $signPackage["timestamp"];?>,
			    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			    signature: '<?php echo $signPackage["signature"];?>',
			    jsApiList: [
			      // 所有要调用的 API 都要加到这个列表中
			      'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone','scanQRCode'
			    ]
			});
			wx.ready(function () {
			    // 在这里调用 API
			    // 分享到朋友圈
			    wx.onMenuShareTimeline({
				    title: '分享到朋友圈', // 分享标题
				    link: 'www.baidu.com', // 分享链接
				    imgUrl: '', // 分享图标
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				        window.localStorage.setItem('relay', '0');
				        window.location.reload();
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
//				        alert('取消分享');
				    }
				});
				// 分享给朋友
				wx.onMenuShareAppMessage({
				    title: '分享给朋友', // 分享标题
				    desc: '爱是看见的好看教案到合肥拉伸的减肥了开始就对啦开始的离开寄售点卡涉及到了快速的发大水发地方', // 分享描述
				    link: 'www.baidu.com', // 分享链接
				    imgUrl: '', // 分享图标
				    type: 'link', // 分享类型,music、video或link，不填默认为link
				    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				    success: function () { 
				        // 用户确认分享后执行的回调函数
				       window.localStorage.setItem('relay', '0');
				       window.location.reload();
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
//				        alert('quxiaofenxiang');
				    }
				});
				// 分享到QQ
				wx.onMenuShareQQ({
				    title: '', // 分享标题
				    desc: '', // 分享描述
				    link: '', // 分享链接
				    imgUrl: '', // 分享图标
				    success: function () { 
				       // 用户确认分享后执行的回调函数
				       window.localStorage.setItem('relay', '0');
				       window.location.reload();
				    },
				    cancel: function () { 
				       // 用户取消分享后执行的回调函数
				    }
				});
				// 分享到腾讯微博
				wx.onMenuShareWeibo({
				    title: '', // 分享标题
				    desc: '', // 分享描述
				    link: '', // 分享链接
				    imgUrl: '', // 分享图标
				    success: function () { 
				       // 用户确认分享后执行的回调函数
				       window.localStorage.setItem('relay', '0');
				       window.location.reload();
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
				// 分享到QQ空间
				wx.onMenuShareQZone({
				    title: '', // 分享标题
				    desc: '', // 分享描述
				    link: '', // 分享链接
				    imgUrl: '', // 分享图标
				    success: function () { 
				       // 用户确认分享后执行的回调函数
				       window.localStorage.setItem('relay', '0');
				       window.location.reload();
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
			});
		</script>
		<script src="../js/couponsDatailed.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
