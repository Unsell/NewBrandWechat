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
		<link rel="stylesheet" type="text/css" href="../css/myCoupons.css"/>
		<title>我的卡劵</title>
	</head>
	<body>
		<div class="content">
			<div class="user-infor">
					<div class="user-image">
						<img src="../image/4.jpg" width="100%" height="100%"/>
						<div class="box-arrow-bottom"></div>
					</div>
				<div class="user-name">未验证</div>
				<div class="diamond"><div></div></div>
			</div>
			<div class="coupons-number">您有<span>15</span>张优惠劵</div>
			<div class="box-coupons">
				<div class="box-coupons-can-use">
					<div class="sign-dian"></div>
					<div class="coupons-can-use">
						<div class="coupons-tips1">未使用</div>
						<div class="coupons-tips2">未使用</div>
						<div class="culb-name">ONLY-SPA</div>
						<div class="coupons-nums">￥100</div>
						<div class="coupons-use-time">
							<span>24小时后使用</span>
							<span class="mui-icon mui-icon-arrowright"></span>
						</div>
					</div>
					<div class="coupons-status">
						<img src="../image/canUse.png" width="44px" height="40px"/>
					</div>
				</div>
				<div class="box-coupons-can-use">
					<div class="sign-dian"></div>
					<div class="coupons-can-use">
						<div class="coupons-tips1">未使用</div>
						<div class="coupons-tips2">未使用</div>
						<div class="culb-name">ONLY-SPA</div>
						<div class="coupons-nums">￥100</div>
						<div class="coupons-use-time">
							<span>24小时后使用</span>
							<span class="mui-icon mui-icon-arrowright"></span>
						</div>
					</div>
					<div class="coupons-status">
						<img src="../image/canUse.png" width="44px" height="40px"/>
					</div>
				</div>
				
				<div class="box-coupons-cannot-use">
					<div class="sign-dian"></div>
					<div class="coupons-can-use">
						<div class="coupons-tips1">未使用</div>
						<div class="coupons-tips2">未使用</div>
						<div class="culb-name">ONLY-SPA</div>
						<div class="coupons-nums">￥100</div>
						<div class="coupons-use-time">
							<span>24小时后使用</span>
							<span class="mui-icon mui-icon-arrowright"></span>
						</div>
					</div>
					<div class="coupons-status">
						<img src="../image/cannotUse.png" width="33px" height="40px"/>
					</div>
				</div>
			</div>
		</div>
		
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/mui.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/myCoupons.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			var d = Date.now().toString();
//			alert(Date.now().toString().substring(0,10));
			var a;
			a=[1,2,3];
//			alert(typeof a)
		</script>
	</body>
</html>
