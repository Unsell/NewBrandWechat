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
		<link rel="stylesheet" type="text/css" href="../css/mui.min.css"/>
		<link rel="stylesheet" type="text/css" href="../css/common.css"/>
		<link rel="stylesheet" type="text/css" href="../css/signOut.css"/>
		<title>退出</title>
	</head>
	<body>
		<div class="mui-content">
		    <div class="header">
		    	<div class="header-title">—&nbsp;&nbsp;您已退出店内模式&nbsp;&nbsp;—</div>
		    	<div class="header-clubName"></div>
		    </div>
		    <div class="content">
		    	<p>在店内找到二维码扫描</p>
		    	<p>便可进入场内模式</p>
		    	<button class="scanning" type="button">立即扫码</button>
		    	<div class="technician-num">您在此店还有<span></span>张优惠劵</div>
		    	<div>可使用</div>
		    	<div class="mycuopons">查看</div>
		    	<img src="../image/chakan.png" width="30px" height="30px" />
		    </div>
		    <div class="footer-explain">
		    	<img src="../image/4.jpg" width="240px" height="300px"  />
		    	<p>进场可查看所有技师详情</p>
		    </div>
		</div>
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/signOut.js" type="text/javascript" charset="utf-8"></script>
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
			      'scanQRCode'
			    ]
			});
			
		</script>
	</body>
</html>
