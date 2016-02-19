
$(function(){
	
	var userInfor = window.localStorage.getItem('userInfor');
	var userPhone;
	var sid = getrequest('sid'),
		openid = getrequest('openid'),
		requestTime = getrequest('tm'),
		requestTkey = getrequest('tkey');
	
	$('.vice-nav').show();
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
				
				//console.log(e);

				window.localStorage.setItem('userInfor', null); //? 当验证完成后，要更新前面缓存的数据，是否可以这样直接更新
				setTimeout(function(){
					window.location.href = "http://new.29mins.com/weixin/page/myCoupons.php?sid="+sid+'&openid='+openid+'&tm='+requestTime+'&tkey='+requestTkey;;
				}, 500)
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	});

	// 底部副导航栏的页面跳转
	// 返回
	$('.vice-nav').on('tap', '.nav-back',function(){
		//window.location.reload();
		window.location.replace(document.referrer); //返回并刷新页面;document.referrer :前一个页面的URL
	});
	// 我的卡劵
	$('.vice-nav').on('tap', '.nav-coupons',function(){
		window.location.href = "http://new.29mins.com/weixin/page/myCoupons.php?sid="+sid+'&openid='+openid+'&tm='+requestTime+'&tkey='+requestTkey;
	});
	// 技师列表
	$('.vice-nav').on('tap', '.nav-techlist',function(){
		//window.location.reload();
		window.location.href = "http://new.29mins.com/weixin/page/technicianList.php?sid="+sid+'&openid='+openid+'&tm='+requestTime+'&tkey='+requestTkey;
	});
	
	$('input').focus(function(){
		$('.vice-nav').hide();
	})
	$('input').blur(function(){
		$('.vice-nav').show();
	})

})





