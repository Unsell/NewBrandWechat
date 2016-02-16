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
		<title>觅技</title>
	</head>
	<body>
		<div class="content">
			<div class="user-infor">
					<div class="user-image">
						<img src="" width="100%" height="100%"/>
						<div class="box-arrow-bottom"></div>
					</div>
				<div class="user-name"></div>
				<div class="diamond"><div></div></div>
			</div>
			<div class="coupons-number">您有 <span></span> 张优惠劵</div>
			<ul class="box-coupons">
				
			</ul>
		</div>
		
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/mui.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/myCoupons.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
