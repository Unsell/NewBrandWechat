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
		<link rel="stylesheet" type="text/css" href="../css/validate.css"/>
		<title>验证手机</title>
	</head>
	<body>
		<div class="mui-content">
			<div class="content ">
				<div class="title">
					<span>验证</span>
					<div class="diamond"><div></div></div>
				</div>
				<form action="" method="">
					<input class="phone" type="number" name="" id="" value="" placeholder="请输入您的手机号码" />
					<input class="verification-code" type="number" name="" id="" value="" placeholder="请输入您的验证码" />
					<button id="validate" class="obtain-code" type="button">获取验证码</button>
					<input id="submit" class="submit" type="button" value="确认"/>
				</form>
			</div>
		</div>
		
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/mui.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/validate.js" type="text/javascript" charset="utf-8"></script>

	</body>
</html>
