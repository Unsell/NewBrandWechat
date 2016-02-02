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
		<div class="store-list">
			<div class="list">
				<div class="sign-dian"></div>
				<div class="store-name">ONLY-SPA</div>
				<div class="stroe-addr">深圳市罗湖区1111号A座</div>
				<i class="fa fa-phone-square store-phone"></i>
			</div>
			<div class="list">
				<div class="sign-dian"></div>
				<div class="store-name">ONLY-SPA</div>
				<div class="stroe-addr">深圳市罗湖区1111号A座</div>
				<i class="fa fa-phone-square store-phone"></i>
			</div>
			<div class="list">
				<div class="sign-dian"></div>
				<div class="store-name">ONLY-SPA</div>
				<div class="stroe-addr">深圳市罗湖区1111号A座</div>
				<i class="fa fa-phone-square store-phone"></i>
			</div>
			<div class="list">
				<div class="sign-dian"></div>
				<div class="store-name">ONLY-SPA</div>
				<div class="stroe-addr">深圳市罗湖区1111号A座</div>
				<i class="fa fa-phone-square store-phone"></i>
			</div>
		</div>
	</body>
</html>
