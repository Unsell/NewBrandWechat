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
				<div class="coupons-number"><span>1468 4523 6545</span></div>
			</div>
			<div class="coupons-detailed">
				<div class="coupons-price">￥100</div>
				<div class="box-time-infor">
					<div class="time-infor-title">开始时间</div>
					<div class="time-infor">2016/01/15/18:30</div>
				</div>
				<div class="box-time-infor">
					<div class="time-infor-title">开始时间</div>
					<div class="time-infor">2016/01/15/18:30</div>
				</div>
				<div class="box-button">
					<button class="btn-use" type="button">立即使用</button>
					<button class="btn-share" type="button">送给朋友</button>
				</div>
			</div>
			<a class="applicable-store" href="applicableStore.html">
				<span>适用门店</span>
				<span class="mui-icon mui-icon-arrowright"></span>
			</a>
			<div class="use-rule">
				<span>使用规则</span>
				<ol>
					<li>....水电费水电费水电费是........</li>
					<li>...斯蒂芬斯蒂芬.............................................................</li>
					<li>..水电费为儿童和人吧.......................................asdasdasd asddffd ddf a .</li>
				</ol>
			</div>
		</div>
	</body>
</html>
