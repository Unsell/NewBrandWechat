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
		<link href="https://cdn.bootcss.com/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="../css/common.css"/>
		<link rel="stylesheet" type="text/css" href="../css/technicianList.css"/>
		<title>觅技</title>
	</head>
	<body>
		<div class="mui-content">
			<div class="user-infor-header">
				<a class="user-image">
					<img src="" width="100%" height="100%"/>
				</a>
				<div class="user-coupons">
					<div class="coupons-nums">15</div>
					<span>优惠劵</span>
				</div>
				<div class="user-WIFI">
					<span>WI-FI</span>
					<span class="mui-icon mui-icon-arrowright"></span>
				</div>
			</div>
			<div class="content-title">
				<span>推荐</span>
				<div class="diamond"><div></div></div>
			</div>
			<!--下拉刷新容器-->
			<div id="pullrefresh" class="mui-content mui-scroll-wrapper">
				<div class="mui-scroll">
					<!--数据列表-->
					<ul class="mui-table-view mui-table-view-chevron clearfix">
						
					</ul>
				</div>
			</div>
			<!--弹窗-WI-FI-->
			<div id="boxWifiInfor" class="mui-popover mui-popover-action">
				<div class="box-wifi-infor">
					<div class="user-infor">
						<div class="user-image">
							<img src="../image/4.jpg" width="100%" height="100%"/>
							<div class="box-arrow-bottom"></div>
						</div>
						<div class="user-name">未验证</div>
						<div class="diamond"><div></div></div>
					</div>
					<ol class="wifi-list">
						
					</ol>
					<div class="wifi-annotation">注：长按可复制密码！</div>
					<div class="popup-collect">
						<span class="mui-icon mui-icon-arrowup"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="vice-nav clearfix">
				<a class="nav-back" href="">返回</a>
				<a class="nav-coupons" href="">我的卡劵</a>
				<a class="nav-techlist" href="">技师列表</a>
		</div>
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/mui.min.js"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/technicianList.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
