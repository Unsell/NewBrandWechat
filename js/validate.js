
$(function(){
	
	var userInfor = window.localStorage.getItem('userInfor');
	var userPhone;
	var sid = getrequest('sid'),
		openid = getrequest('openid'),
		requestTime = getrequest('t'),
		requestTkey = getrequest('tkey');
	
	// 获取验证码
	$(document).on("tap", '#validate',function(){
		//验证按钮倒计时 
		
		var phone = $('.phone').val();
		if(phone==''){
			mui.toast('请输入正确手机号码！');
			return false;
		}
		var count = 60;
	    var countdown;   
	    function CountDown() {
	    	
	    		if(count>0){
		 			$('#validate').attr('disabled','disabled');
			 	}else{
			 		$('#validate').removeAttr('disabled');
			 	}
			 	
	        $("#validate").html( count + " 秒");
	        if (count == 0) {
	        	$("#validate").html('获取验证码');
	            clearInterval(countdown);
	        }
	        count--;
	    }
		// 发送验证码 
		$.post('../../api/apps/active.php',{phone: phone, action: 'sendcode', sid: sid}, function(e) {
			if(e.errCode==='1001'){
				countdown = setInterval(CountDown, 1000);
				mui.toast(e.msg);
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	});
	
	// 用户激活
	$(document).on("tap", '#submit', function(){
		// 用户激活
		var code = $('.verification-code').val();
		var phone = $('.phone').val();
		if(phone==''){
			mui.toast('请输入正确手机号码！');
			return false;
		}
		if(code==''){
			mui.toast('请输入验证码');
			return false;
		}
		$.post('../../api/apps/active.php',{phone: phone, openid: openid, code: code,sid: sid}, function(e) {
			if(e.errCode==='1001'){
				mui.toast('验证成功');
				// 跳转到卡劵页面
				window.location.href = "http://new.29mins.com/weixin/page/myCoupons.php?sid="+sid+'&openid='+openid+'&t='+requestTime+'&tkey='+requestTkey;
				
				userInfor.phone = phone;
				window.localStorage.setItem('userInfor', userInfor); //? 当验证完成后，要更新前面缓存的数据，是否可以这样直接更新
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	});

	
	


})





