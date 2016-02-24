
$(function(){
	
	var openid = getrequest('openid');
	var sid = getrequest('sid');
	
	var nowTime;
	
	// 获取后台服务器的现在时间，用来判断代金券的过去时间
	$.ajax({  
         type : "get",  
          url : "../../api/apps/gettime.php",  
          data : null,  
          async : false, 
          dataType: 'json',
          success : function(e){
			nowTime = e.timestamp;
          }  
     });
	
	// 获取代金券列表
	$.post('../../api/apps/coupon.php',{openid: openid}, function(e) {
		if(e.errCode==='1001'){
			var couponList = e.couponList;
			
			var i,couponListNum=couponList.length;
			for(i=0;i<couponList.length;i++){
				//console.log(couponList[i]);
				if(couponList[i].begin && couponList[i].end && couponList[i].end<nowTime){
					couponListNum--;
					continue;
				}
			}
			$('.technician-num').find('span').html(couponListNum);
		} else {
			$('.coupons-nums').find('span').html('0');
		}
	}, "json");
	
	// 获取会所信息
	$.post('../../api/apps/getinfo.php',{sid: sid}, function(e) {

		if(e.errCode == '1001'){
			//console.log(e.phone);
			$('.header-clubName').html(e.shopname);
			$('.footer-explain').find('img').attr('src', e.picurl);
		}else{
			mui.toast(e.msg);
		}
	}, 'json');
	
	// 点击扫码
	$('.content').on('click','.scanning',function(){
		wx.scanQRCode({
		    needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
		    scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
		    success: function (res) {
		    	
			}
		});
	});
	
	
	// 点击查看跳转到我的卡劵页
	$('.content').on('click','.mycuopons',function(){
		window.location.href = "http://new.29mins.com/weixin/page/myCoupons.php?sid="+sid+'&openid='+openid+'&from=weixin';
	});
	
})













