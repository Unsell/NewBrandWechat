//var try2 = localStorage.getItem('try1');
//alert(try2);

$(function(){
	
	var dataNums = getrequest('dataNums');
	var notUse = getrequest('notUse');  // 区分点击的是哪种代金券，等于notUse的代表暂不可用代金券
	var openid = getrequest('openid'),
		sid;
	
	
	var canNotUseCouponList,  // 存储用户不可使用代金券数组
		canUseCouponList;  // 存储用户可用代金券数组
	
	//  代表点击的是暂不可用的代金券
	if(notUse==='notUse'){
		
		canNotUseCouponList = window.localStorage.getItem('canNotUseCouponList');  // 获得用户不可使用代金券数组
		canNotUseCouponList = eval('['+canNotUseCouponList+']');  // 把数据转换成JSON格式 ,加大括号表示处理对象是个数组
		
		var couponInfor = canNotUseCouponList[dataNums];
		console.log(couponInfor);
		var couponNumber = couponInfor.num;
		var strNumber = ''+couponNumber.substring(0,4)+' '+couponNumber.substring(4,8)+' '+couponNumber.substring(8,12);// 代金券号码
		$('.coupons-number').find('span').html(strNumber);
		$('.coupons-price').html('￥'+couponInfor.money);
		sid = couponInfor.sid;
		// 开始时间
		var beginTime = new Date(parseInt(couponInfor.begin) * 1000);
		var strBeginTime = (beginTime.getFullYear()) + "/" + 
	           				(beginTime.getMonth() + 1) + "/" +
	           				(beginTime.getDate()) + "/" + 
	           				(beginTime.getHours()) + ":" + 
	           				(beginTime.getMinutes());
	    $('.begin-time').html(strBeginTime);
	    // 结束时间
	    var endTime = new Date(parseInt(couponInfor.end) * 1000);
		var strEndTime = (endTime.getFullYear()) + "/" + 
	           				(endTime.getMonth() + 1) + "/" +
	           				(endTime.getDate()) + "/" + 
	           				(endTime.getHours()) + ":" + 
	           				(endTime.getMinutes());
	    $('.end-time').html(strEndTime);
	    // 使用规则
	    var detail = couponInfor.detail
	    var strRule = '<li>'+ detail.replace(/\r\n/g,'</li><li>') +'</li>';
	    $('.use-rule').find('ul').html(strRule);
	    $('.btn-use').attr('disabled','disabled');
	    
	}else{
		//  代表点击的是可用的代金券
		canUseCouponList = window.localStorage.getItem('canUseCouponList');  // 获得用户不可使用代金券数组
		canUseCouponList = eval('['+canUseCouponList+']');  // 把数据转换成JSON格式 ,加大括号表示处理对象是个数组
		
		var couponInfor = canUseCouponList[dataNums];
		console.log(couponInfor);
		sid = couponInfor.sid;
		var couponNumber = couponInfor.num;
		var strNumber = ''+couponNumber.substring(0,4)+' '+couponNumber.substring(4,8)+' '+couponNumber.substring(8,12);// 代金券号码
		$('.coupons-number').find('span').html(strNumber);
		$('.coupons-price').html('￥'+couponInfor.money);
		// 开始时间
		var beginTime = new Date(parseInt(couponInfor.begin) * 1000);
		var strBeginTime = (beginTime.getFullYear()) + "/" + 
	           				(beginTime.getMonth() + 1) + "/" +
	           				(beginTime.getDate()) + "/" + 
	           				(beginTime.getHours()) + ":" + 
	           				(beginTime.getMinutes());
	    $('.begin-time').html(strBeginTime);
	    // 结束时间
	    var endTime = new Date(parseInt(couponInfor.end) * 1000);
		var strEndTime = (endTime.getFullYear()) + "/" + 
	           				(endTime.getMonth() + 1) + "/" +
	           				(endTime.getDate()) + "/" + 
	           				(endTime.getHours()) + ":" + 
	           				(endTime.getMinutes());
	    $('.end-time').html(strEndTime);
	    // 使用规则
	    var detail = couponInfor.detail
	    var strRule = '<li>'+ detail.replace(/\r\n/g,'</li><li>') +'</li>';
	    $('.use-rule').find('ul').html(strRule);
	}
	
	//  点击立即使用按钮事件
	var userInfor = window.localStorage.getItem('userInfor');
	userInfor = JSON.parse(userInfor);
	$('.box-button').on('tap', '.btn-use', function(){
		console.log(userInfor.phone);
		if(userInfor.phone==0){
			$('.popup-validate').show();
		}
	});
	
	//点X关闭弹窗
	$('.popup-validate').on('tap', '.mui-icon-closeempty', function(){
		$('.popup-validate').hide();
	});
	
	// 获取验证码
	$('.popup-validate').on("tap", '.obtain-code',function(){
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
		 			$('.obtain-code').attr('disabled','disabled');
			 	}else{
			 		$('.obtain-code').removeAttr('disabled');
			 	}
			 	
	        $(".obtain-code").html( count + " 秒");
	        if (count == 0) {
	        	$(".obtain-code").html('获取验证码');
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
	$('.popup-validate').on("tap", '.submit', function(){
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
				
				console.log(e);
				userInfor.phone = phone;
				console.log(userInfor);
				window.localStorage.setItem('userInfor', userInfor); //? 当验证完成后，要更新前面缓存的数据，是否可以这样直接更新
				window.location.href = "http://new.29mins.com/weixin/page/myCoupons.php?openid="+openid;
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	});
	
	// 点击查看代金券的适用门店
	$('.mui-content').on('tap', '.applicable-store', function(){
		window.location.href = "http://new.29mins.com/weixin/page/applicableStore.php?dataNums="+dataNums+'&notUse='+notUse;
	});
	

});





