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
						<input class="verification-code" type="text" name="" id="" value="" placeholder="请输入您的验证码" />
						<button class="obtain-code" type="button">获取验证码</button>
						<input class="submit" type="button" value="完成验证并领取代金券"/>
					</form>
				</div>
			</div>
		</div>
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/mui.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/couponsDatailed.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
