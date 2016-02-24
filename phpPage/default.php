<?php
require "/data/api/config/config.core.php";
require_once "/data/api/class/jssdk.php";
$shopid = isset($_REQUEST['sid']) ? trim(decodeAuth($_REQUEST['sid'])) : '';
$qrpath = '';
if(strpos($_SERVER["HTTP_USER_AGENT"],"MicroMessenger") && is_numeric($shopid)) {
	$qrpath = 'http://new.29mins.com/upload/'.$shopid.'/qrcode_'.$shopid.'_258.jpg';
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
		<link rel="stylesheet" type="text/css" href="../css/signOut.css"/>
		<title>退出</title>
	</head>
	<body>
		<div class="mui-content">
		    <div class="header">
		    	<div class="header-title">—&nbsp;&nbsp;请用微信浏览器打开&nbsp;&nbsp;—</div>
		    	<div class="header-clubName">XXXXX会所</div>
		    </div>
		    <?php
		    	if ($qrpath != '') {
		    ?>
		    	<div class="footer-explain">
		    		<img src="<?php echo $qrpath; ?>" width="300px" height="300px"  />
		    		<p>长按识别二维码可获得更多服务</p>
		    	</div>
		    <?php
				}
		    ?>
		</div>
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/signOut.js" type="text/javascript" charset="utf-8"></script>
	</body>
</html>
