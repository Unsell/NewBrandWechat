<?php
require "/data/api/config/config.core.php";
require_once "/data/api/class/jssdk.php";
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
		<link rel="stylesheet" type="text/css" href="../css/common.css"/>
		<link href="https://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="../css/applicableStore.css"/>
		<title>适合门店</title>
	</head>
	<body>
		<ul class="store-list">
			
		</ul>
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/applicableStore.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			wx.config({
			    debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: '<?php echo $signPackage["appId"];?>',
			    timestamp: <?php echo $signPackage["timestamp"];?>,
			    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			    signature: '<?php echo $signPackage["signature"];?>',
			    jsApiList: [
			      // 所有要调用的 API 都要加到这个列表中
			      'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'
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
				    },
				    cancel: function () { 
				        // 用户取消分享后执行的回调函数
				    }
				});
			});
		</script>
	</body>
</html>
