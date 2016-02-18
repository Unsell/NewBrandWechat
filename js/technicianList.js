


$(function(){
//	var asd = 1222;
//	
//	localStorage.setItem('try1',asd);

	$('#pullrefresh').css('height',window.innerHeight-$('.mui-content').height()-5);
	
	var relay, // 存储全局配置参数
		userInfor,  // 存储用户信息
		likeList,  // 存储技师点赞数
		canNotUseCouponList,  // 存储用户不可使用代金券数组
		canUseCouponList;  // 存储用户可用代金券数组
		//technicianList;  //存储技师列表
	var nowTime;  // 存储后台服务器的现在的时间
	
	
	var isRelay = window.localStorage.getItem('relay'); // 全局配置参数，代表权限，1为转发后能看，0为不限制
	var relayTime = window.localStorage.getItem('relayTime');  // 这个是用在判断24小时自动退出的
	var sid = getrequest('sid'),
		openid = getrequest('openid'),
		requestTime = getrequest('tm'),
		requestTkey = getrequest('tkey');
	
		
	// 获取全局配置
	if (isRelay != null && (isRelay == '1' || isRelay == '0') && relayTime != '' && relayTime.length == 10) {
		//判断relayTime与现在时间差是否超过24小时
		var nowTime = Date.now().toString().substring(0,10);
		console.log(nowTime);
		var min = parseInt(nowTime)-parseInt(relayTime);//时间差
		if (min >= 86400) {
			window.localStorage.setItem('relay', '1');
			window.localStorage.setItem('relayTime', '');
		}
	} else {
		$.post('../../api/apps/config.php',{sid: sid}, function(e) {
			if(e.errCode==='1001'){
				var now = Date.now().toString().substring(0,10);
				console.log(now);
				console.log(e.relay);
				window.localStorage.setItem('relay',e.relay);
				window.localStorage.setItem('relayTime', now);
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	}
	
	// 定时退出
	$.post('../../api/apps/exit.php',{tm: requestTime,tkey: requestTkey}, function(e) {
		if(e.errCode !== '1001'){
			// 跳转页面
			console.log('你已退出！');
		}
	}, "json");
	
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
	
	// 获取用户信息
	$.post('../../api/apps/getinfo.php',{openid: openid}, function(e) {
		if(e.errCode==='1001'){
			//console.log(e.phone);
			var jsonList = JSON.stringify(e);  // 强制转换成json格式
			window.localStorage.setItem('userInfor', jsonList); // 这里这样直接存储可能会出现问题。。。在卡劵页要用到用户的头像，到时验证
			$('.user-image').find('img').attr('src',e.headimgurl);
		}else{
			mui.toast(e.msg);
		}
	}, "json");
	
	// 获取代金券列表
	$.post('../../api/apps/coupon.php',{openid: openid}, function(e) {
		if(e.errCode==='1001'){
			var couponList = e.couponList;
			
			// 加个判断，排除掉已过期的卡劵，以及区分开可用和暂不可用的卡劵，并分别存储
			//if 判断。。。判断的依据？？对比现在的时间:nowTime
			//var now = Date.now().toString().substring(0,10);
			//console.log(couponList[1].begin);
			//console.log(nowTime);
			var i,j=0,k=0,couponListNum=couponList.length;
			var canUseCouponList=new Array();
			var canNotUseCouponList=new Array();
			for(i=0;i<couponList.length;i++){
				//console.log(couponList[i]);
				if(couponList[i].begin && couponList[i].end && couponList[i].end<nowTime){
					couponListNum--;
					continue;
				}
				else if(couponList[i].begin<nowTime && couponList[i].end>nowTime){
					canUseCouponList[j] = JSON.stringify(couponList[i]); // 强制转换成json格式
					j++;
				}else if(couponList[i].begin>nowTime){
					canNotUseCouponList[k] = JSON.stringify(couponList[i]); // 强制转换成json格式
					k++;
				}
			};
			//console.log(couponList.length);
			//console.log(couponListNum);
			//console.log(canUseCouponList);
			//console.log(canNotUseCouponList);
			//console.log(canNotUseCouponList[1]);
			$('.coupons-nums').html(couponListNum);
			window.localStorage.setItem('canUseCouponList', canUseCouponList);  //??重写
			window.localStorage.setItem('canNotUseCouponList', canNotUseCouponList);  //??重写
		}else{
			mui.toast(e.msg);
		}
	}, "json");
	
	
	
	// 获取技师点赞列表 ///这里用post有时做不到同步请求，有时数据还没来，下面对技师列表的渲染就已经开始了，以至于技师的点赞数据是没有的。。
//	$.post('../../api/apps/like.php',{sid: sid}, function(e) {
//		if(e.errCode==='1001'){
//			var likeList = e.like;
//			for (var i = 0; i < likeList.length; i++) {
//				window.localStorage.setItem('like_'+likeList[i].mid, likeList[i].like);
//			}
//				
//		}else{
//			mui.toast(e.msg);
//		}
//	}, "json");
	$.ajax({  
         type : "post",  
          url : "../../api/apps/like.php",  
          data : {sid: sid},  
          async : false, 
          dataType: 'json',
          success : function(e){
			if(e.errCode==='1001'){
				var likeList = e.like;
				for (var i = 0; i < likeList.length; i++) {
					window.localStorage.setItem('like_'+likeList[i].mid, likeList[i].like);
				}
					
			}else{
				mui.toast(e.msg);
			}
          }  
     });
	
	
	// 获取技师列表
	var pn=10,p=1,pageCount = 0;
	$.post('../../api/apps/service.php',{sid: sid, pn: pn}, function(e) {
		if(e.errCode==='1001'){
			p = e.currentPage; // 数据当前页
			pageCount = e.pageCount; // 会所的技师的页数
			//console.log(p);
			//console.log(pageCount);
			var serviceList = e.servicelist;
			var table = document.body.querySelector('.mui-table-view');
			for(var i = 0; i<serviceList.length; i++){
				var li = document.createElement('li');
					li.className = 'box-technician-infor';
					var str = '<div class="technician-number">'+ serviceList[i].mid +'号</div>'+
									'<div class="technician-name">'+ serviceList[i].nickname +'</div>'+
									'<div class="technician-image">'+
										'<img src="'+ serviceList[i].picurl +'" width="100%" height="100%"/>'+
									'</div>'+
									'<div class="praise-nums">最近<span data-mid="'+ serviceList[i].mid +'">';
					var like = window.localStorage.getItem('like_'+serviceList[i].mid);
					if (like != null && !isNaN(like)) {
						str+=like+'</span>次</div>'+
								'<div class="technician-optimum">'+ serviceList[i].desc +'</div>';
					}
					str+='<div class="praise">'+
						'<i class="fa fa-thumbs-o-up"></i>'+
					'</div>';
					li.innerHTML = str;
				table.appendChild(li);
			}
		}else{
			mui.toast(e.msg);
		}
	}, "json");
	
	// 跳转到绑定页或卡劵页
	$('.user-infor-header').on('tap', '.user-image',function(){
		var userInfor = window.localStorage.getItem('userInfor');
		userInfor = JSON.parse(userInfor);// 字符串转换为josn数据
		if(userInfor.phone==0){
			window.location.href = "http://new.29mins.com/weixin/page/validate.php?sid="+sid+'&openid='+openid+'&tm='+requestTime+'&tkey='+requestTkey;
		}else{
			window.location.href = "http://new.29mins.com/weixin/page/myCoupons.php?sid="+sid+'&openid='+openid+'&tm='+requestTime+'&tkey='+requestTkey;
		}
	});
	
	// 点赞动画
	$(document).on('tap','i',function(){
		// 定时退出
		$.post('../../api/apps/exit.php',{tm: requestTime,tkey: requestTkey}, function(e) {
			if(e.errCode !== '1001'){
				// 跳转页面
				
			}
		}, "json");
		if($(this).hasClass('fa-thumbs-o-up')){
			$(this).removeClass('fa-thumbs-o-up animation-delete');
			$(this).addClass('fa-thumbs-up animation-zan');
			var praise_num = $(this).parent().parent().find('.praise-nums').find('span');
			praise_num.html(parseInt(praise_num.html())+1);
			var mid = $(this).parent().parent().find('.praise-nums').find('span').attr('data-mid')
			// 点赞数目加一
			$.post('../../api/apps/like.php',{action: 'set',sid: sid,mid: mid}, function(e) {
				if(e.errCode==='1001'){
					return ;
				}else{
					mui.toast(e.msg);
				}
			}, "json");
		}else{
			$(this).removeClass('fa-thumbs-up animation-zan');
			$(this).addClass('fa-thumbs-o-up animation-delete');
			var praise_num = $(this).parent().parent().find('.praise-nums').find('span');
			praise_num.html(parseInt(praise_num.html())-1);
		}
	});
	
	// 头部打开wifi信息
	var boxInfor = $('.popup-wifi-infor'),
		wifiInfor = $('.box-wifi-infor');
	
	$('body').on('tap','.user-WIFI',function(){
		// 定时退出
		$.post('../../api/apps/exit.php',{tm: requestTime,tkey: requestTkey}, function(e) {
			if(e.errCode !== '1001'){
				// 跳转页面
				
			}
		}, "json");
		mui('#boxWifiInfor').popover('toggle');
		// 获取店铺WIFI列表 
		$.post('../../api/apps/wifi.php',{sid: sid}, function(e) {
			if(e.errCode==='1001'){
				var strWifiList='';
				var wifiList = e.wifilist;
				for(var i=0; i<wifiList.length; i++){
					strWifiList += '<li>'+
										'<div class="wifi-name">'+wifiList[i].wifiname+'</div>'+
										'<div class="wifi-password">'+wifiList[i].wifipass+'</div>'+
									'</li>';
				};
				$('.wifi-list').append(strWifiList);
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	});
	$('body').on('tap','.popup-collect',function(){
		// 定时退出
		$.post('../../api/apps/exit.php',{tm: requestTime,tkey: requestTkey}, function(e) {
			if(e.errCode !== '1001'){
				// 跳转页面
				
			}
		}, "json");
		mui('#boxWifiInfor').popover('toggle');
		$('.wifi-list').children().remove();
	});
	
	
	
	
	
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down: {
				callback: pulldownRefresh
			},
			up: {
				contentrefresh: '正在加载...',
				callback: pullupRefresh
			}
		}
	});
	/**
	 * 下拉刷新具体业务实现
	 */
	
	
	function pulldownRefresh() {
		// 定时退出
		$.post('../../api/apps/exit.php',{tm: requestTime,tkey: requestTkey}, function(e) {
			if(e.errCode !== '1001'){
				// 跳转页面
				
			}
		}, "json");
		// 获取技师点赞列表
//		$.post('../../api/apps/like.php',{sid: sid}, function(e) {
//			if(e.errCode==='1001'){
//				var likeList = e.like;
//				for (var i = 0; i < likeList.length; i++) {
//					window.localStorage.setItem('like_'+likeList[i].mid, likeList[i].like);
//				}
//				
//				
//			}else{
//				mui.toast(e.msg);
//			}
//		}, "json");
		$.ajax({  
	         type : "post",  
	          url : "../../api/apps/like.php",  
	          data : {sid: sid},  
	          async : false, 
	          dataType: 'json',
	          success : function(e){
				if(e.errCode==='1001'){
					var likeList = e.like;
					for (var i = 0; i < likeList.length; i++) {
						window.localStorage.setItem('like_'+likeList[i].mid, likeList[i].like);
					}
						
				}else{
					mui.toast(e.msg);
				}
	          }  
	     });
		setTimeout(function() {
			$.post('../../api/apps/service.php',{sid: sid,p: 1, pn: pn}, function(e) {
				if(e.errCode==='1001'){
					p = e.currentPage; // 数据当前页
					pageCount = e.pageCount; // 会所的技师总数
					var serviceList = e.servicelist;

					var table = $('.mui-table-view');
					table.children().remove();
					for(var i = 0; i<serviceList.length; i++){
						var li = document.createElement('li');
						li.className = 'box-technician-infor';
						var str = '<div class="technician-number">'+ serviceList[i].mid +'号</div>'+
										'<div class="technician-name">'+ serviceList[i].nickname +'</div>'+
										'<div class="technician-image">'+
											'<img src="'+ serviceList[i].picurl +'" width="100%" height="100%"/>'+
										'</div>'+
										'<div class="praise-nums">最近<span data-mid="'+ serviceList[i].mid +'">';
						var like = window.localStorage.getItem('like_'+serviceList[i].mid);
						if (like != null && !isNaN(like)) {
							str+=like+'</span>次</div>'+
									'<div class="technician-optimum">'+ serviceList[i].desc +'</div>';
						}
						str+='<div class="praise">'+
								'<i class="fa fa-thumbs-o-up"></i>'+
							'</div>';
						li.innerHTML = str;
						table.append(li);
					}
				}else{
					mui.toast(e.msg);
				}
			}, "json");
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1500);
	}
	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		if(isRelay==0){
			// 定时退出
			$.post('../../api/apps/exit.php',{tm: requestTime,tkey: requestTkey}, function(e) {
				if(e.errCode !== '1001'){
					// 跳转页面
					
				}
			}, "json");
			setTimeout(function() {
				mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
				if(p==pageCount){
					//console.log(p);
					//console.log(pageCount);
					mui.toast('没有更多数据了');
				}else{
					p++;
					$.post('../../api/apps/service.php',{sid: sid,p: p, pn: pn}, function(e) {
						if(e.errCode==='1001'){
							p = e.currentPage; // 数据当前页
							pageCount = e.pageCount; // 会所的技师总数
							var serviceList = e.servicelist;
							var table = document.querySelector('.mui-table-view');
							for(var i = 0; i<serviceList.length; i++){
								var li = document.createElement('li');
								li.className = 'box-technician-infor';
								var str = '<div class="technician-number">'+ serviceList[i].mid +'号</div>'+
											'<div class="technician-name">'+ serviceList[i].nickname +'</div>'+
											'<div class="technician-image">'+
												'<img src="'+ serviceList[i].picurl +'" width="100%" height="100%"/>'+
											'</div>'+
											'<div class="praise-nums">最近<span data-mid="'+ serviceList[i].mid +'">';
								var like = window.localStorage.getItem('like_'+serviceList[i].mid);
								if (like != null && !isNaN(like)) {
									str+=like+'</span>次</div>'+
											'<div class="technician-optimum">'+ serviceList[i].desc +'</div>';
								}
								str+='<div class="praise">'+
										'<i class="fa fa-thumbs-o-up"></i>'+
									'</div>';
								li.innerHTML = str;
								table.appendChild(li);
							}
						}else{
							mui.toast(e.msg);
							
						}
					}, "json");
				}
			}, 1500);
		}else{
			mui.toast('分享后可查看更多技师！');
			mui('#pullrefresh').pullRefresh().endPullupToRefresh();
		}
	}
	
});



//if (mui.os.plus) {
//	mui.plusReady(function() {
//		setTimeout(function() {
//			mui('#pullrefresh').pullRefresh().pullupLoading();
//		}, 1000);
//
//	});
//} else {
//	mui.ready(function() {
//		mui('#pullrefresh').pullRefresh().pullupLoading();
//	});
//}














