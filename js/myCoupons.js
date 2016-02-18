//var try2 = localStorage.getItem('try1');
//alert(try2);

$(function(){
	
	var userInfor = window.localStorage.getItem('userInfor');
	var openid = getrequest('openid');
	var from = getrequest('from');  // 区分进入这页面的途径
	var canNotUseCouponList,  // 存储用户不可使用代金券数组
		canUseCouponList;  // 存储用户可用代金券数组
	
	var nowTime = 0;  // 存储后台服务器的现在的时间	
	// 获取后台服务器的现在时间，用来判断代金券的过去时间,这里使用ajax是通过async : false，让ajax转变成同步执行
//	$.get('../../api/apps/gettime.php', null, function(e) {
//		console.log('time ====== ' + e.timestamp);
//		nowTime = e.timestamp;
//	}, "json");
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
	/*
	 *  先判断用户是从哪个入口进入页面的，如果在url地址上有from这个参数，就代表是直接进来的，
	 *  这是要重新请求一次couponList的数据，如果没有就可以直接读取前面缓存的couponList的数据显示
	*/
	if(!userInfor){  // 第一次进入，还没缓存信息时
		// 获取用户信息
		$.post('../../api/apps/getinfo.php',{openid: openid}, function(e) {
			if(e.errCode==='1001'){
				//console.log(e.phone);
				$('.user-image').find('img').attr('src',e.headimgurl);
				if(e.phone!=0){
					$('.user-name').html(e.phone);
				}
				var jsonList = JSON.stringify(e);  // 强制转换成json格式
				window.localStorage.setItem('userInfor', jsonList); // 这里这样直接存储可能会出现问题。。。在卡劵页要用到用户的头像，到时验证
				
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	}else{
		userInfor = JSON.parse(userInfor);
		$('.user-image').find('img').attr('src',userInfor.headimgurl);
		if(userInfor.phone!=0){
			$('.user-name').html(userInfor.phone);
		}
	}
	
	
	// 如果是直接进入这页面且已验证过，就要重新请求一次技师卡劵页；
	if(from === 'weixin'){
		// 获取代金券列表
		$.post('../../api/apps/coupon.php',{openid: openid}, function(e) {
			if(e.errCode==='1001'){
				var couponList = e.couponList;
				
				// 加个判断，排除掉已过期的卡劵，以及区分开可用和暂不可用的卡劵，并分别存储
				//if 判断。。。判断的依据？？对比现在的时间nowTime
				//var now = Date.now().toString().substring(0,10);

				console.log(nowTime);
				var i,j=0,k=0,couponListNum=couponList.length;
				var canUseCouponList=new Array();
				var canNotUseCouponList=new Array();
				for(i=0;i<couponList.length;i++){
					console.log(couponList[i]);
					if(couponList[i].begin && couponList[i].end && couponList[i].end<nowTime){
						couponListNum--;
						continue;
					}
					else if(couponList[i].begin<=nowTime && couponList[i].end>=nowTime){
						canUseCouponList[j] = JSON.stringify(couponList[i]); // 强制转换成json格式
						j++;
					}else if(couponList[i].begin>nowTime){
						canNotUseCouponList[k] = JSON.stringify(couponList[i]); // 强制转换成json格式
						k++;
					}
				}
				console.log(couponList.length);
				console.log(couponListNum);
				$('.coupons-number').find('span').html(couponListNum);
				window.localStorage.setItem('canUseCouponList', canUseCouponList);  //??重写
				window.localStorage.setItem('canNotUseCouponList', canNotUseCouponList);  //??重写
				showCoupon();
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	}else{
		showCoupon();
	}
	// 这里，上面post请求需要时间才能返回数据，所以，如果就执行下面的代码会出现暂无数据的错误
	
	function showCoupon(){
		canNotUseCouponList = window.localStorage.getItem('canNotUseCouponList');  // 获得用户不可使用代金券数组
		canUseCouponList = window.localStorage.getItem('canUseCouponList');  // 获得用户可用代金券数组
		
		canNotUseCouponList = eval('['+canNotUseCouponList+']');  // 把数据转换成JSON格式 ,加大括号表示处理对象是个数组
		canUseCouponList = eval('['+canUseCouponList+']');   // 把数据转换成JSON格式
	//	alert(canUseCouponList);
	//	alert(canNotUseCouponList);
		$('.coupons-number').find('span').html(canUseCouponList.length+canNotUseCouponList.length);
		var ulContent = document.body.querySelector('.box-coupons');
	//	var now = Date.now().toString().substring(0,10); // 现在的时间戳。。
		
		// 显示用户可用的代金券
		for(var i=0;i<canUseCouponList.length;i++){
			// 处理时间
			var interval = parseInt(canUseCouponList[i].end - nowTime);
			var surplusTime;
			if(interval<86400){
				if(interval<3600){
					surplusTime = '1小时';
				}else{
					surplusTime = parseInt(interval/3600)+'小时';
				}
			}else{
				surplusTime = parseInt(interval/86400)+'天'
			}
			
			var li = document.createElement('li');
			li.className = 'box-coupons-can-use';
			li.setAttribute("data-nums",i);  // 作用： 是用来点击可使用代金券打开代金券详细页时区分点击的是哪个代金券
			var str = '<div class="sign-dian"></div>'+
						'<div class="coupons-can-use">'+
							'<div class="coupons-tips1">可使用</div>'+
							'<div class="coupons-tips2">可使用</div>'+
							'<div class="culb-name">觅技代金券</div>'+
							'<div class="coupons-nums">￥'+ canUseCouponList[i].money +'</div>'+
							'<div class="coupons-use-time">'+
								'<span>'+ surplusTime +'后失效</span>'+
								'<span class="mui-icon mui-icon-arrowright"></span>'+
							'</div>'+
						'</div>'+
						'<div class="coupons-status">'+
							'<img src="../image/canUse.png" width="44px" height="40px"/>'+
						'</div>';
			li.innerHTML = str;
			ulContent.appendChild(li);
		}
		// 显示用户暂不可用的代金券
		for(var i=0;i<canNotUseCouponList.length;i++){
			// 处理时间
			var interval = parseInt(canNotUseCouponList[i].begin - nowTime);
			var surplusTime;
			if(interval<3600){
				surplusTime = '1小时';
			}else{
				surplusTime = parseInt(interval/3600)+'小时';
			}
			
			var li = document.createElement('li');
			li.className = 'box-coupons-cannot-use';
			li.setAttribute("data-nums",i);  // 作用： 是用来点击可使用代金券打开代金券详细页时区分点击的是哪个代金券
			var str = '<div class="sign-dian"></div>'+
						'<div class="coupons-can-use">'+
							'<div class="coupons-tips1">不可用</div>'+
							'<div class="coupons-tips2">不可用</div>'+
							'<div class="culb-name">觅技代金券</div>'+
							'<div class="coupons-nums">￥'+ canNotUseCouponList[i].money +'</div>'+
							'<div class="coupons-use-time">'+
								'<span>'+ surplusTime +'后可用</span>'+
								'<span class="mui-icon mui-icon-arrowright"></span>'+
							'</div>'+
						'</div>'+
						'<div class="coupons-status">'+
							'<img src="../image/cannotUse.png" width="33px" height="40px"/>'+
						'</div>';
			li.innerHTML = str;
			ulContent.appendChild(li);
		}
	}
	
	
	
	// 绑定点击可用代金券事件
	$('.box-coupons').on('tap','.box-coupons-can-use',function(){
		
		var dataNums = $(this).attr('data-nums');
		window.location.href = "http://new.29mins.com/weixin/page/couponsDetailed.php?dataNums="+dataNums+"&openid="+openid;
		
	});
	
	// 绑定点击暂不可用代金券事件
	$('.box-coupons').on('tap','.box-coupons-cannot-use',function(){
		
		var dataNums = $(this).attr('data-nums');
		var notUse = 'notUse'
		window.location.href = "http://new.29mins.com/weixin/page/couponsDetailed.php?dataNums="+dataNums+'&notUse='+notUse+"&openid="+openid;
		
	});
	// 取数据
//	var canUseCouponList = window.localStorage.getItem('canUseCouponList');
//	var a = JSON.parse(canUseCouponList);
//	a[0].num = 
//	console.log(canUseCouponList[0].num); 这样是不行的！！
	
//	var couponList = window.localStorage.getItem('couponList');
//	//var jsonp = eval(co);  // 字符串转换为josn数据
//	//alert(jsonp[0].num);
//	couponList = JSON.parse(couponList);// 字符串转换为josn数据
//	var nowTime = new Date.now().toString().substring(0,10);
//	for(var i=0; i<couponList.length)
	
});





