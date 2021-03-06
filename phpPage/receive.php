<?php
require "/data/api/config/config.core.php";
require_once "/data/api/class/jssdk.php";
$shopid = isset($_REQUEST['sid']) ? trim(decodeAuth($_REQUEST['sid'])) : '';
$qrpath = '';
if(strpos($_SERVER["HTTP_USER_AGENT"],"MicroMessenger") && is_numeric($shopid)) {
	$qrpath = 'http://new.29mins.com/upload/'.$shopid.'/qrcode_'.$shopid.'_258.jpg';
} else {
	$qrpath = '../image/4.jpg';
}
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
		<link rel="stylesheet" type="text/css" href="../css/receive.css"/>
		<title>卡劵</title>
	</head>
	<body>
		<div class="mui-content">
		    <div class="header">
		    	<div class="header-title">—&nbsp;&nbsp;领取成功&nbsp;&nbsp;—</div>
		    	<p class="cash-number">￥<span></span>代金券</p>
		    	<p>已经放入</p>
		    	<p class="user-account"><span></span>账户</p>
		    </div>
		    <div class="QR-code">
		    	<div class="box-img">
		    		<img src="<?php echo $qrpath; ?>" width="280px" height="280px"/>
		    	</div>
		    	<p>长按关注店家公众号</p>
		    	<p>看技师资料吧！</p>
		    </div>
		</div>
		<script src="../js/jquery-2.1.0.js" type="text/javascript" charset="utf-8"></script>
		<script src="../js/common.js" type="text/javascript" charset="utf-8"></script>
		<script type="text/javascript">
			$(function(){
				$('.QR-code').css('height',window.innerHeight-$('.header').height());
				
				var money = getrequest('money');
				var phone = getrequest('phone');
				
				$('.cash-number').find('span').html(money);
				$('.user-account').find('span').html(phone);
			})
		</script>
	</body>
</html>
