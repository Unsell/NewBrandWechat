


$(function(){
//	var asd = 1222;
//	
//	localStorage.setItem('try1',asd);

	$('#pullrefresh').css('height',window.innerHeight-$('.mui-content').height());
	
	var relay, // 存储全局配置参数
		userInfor,  // 存储用户信息
		couponList;  // 存储用户代金券数组
	
	
	var isRelay = window.localStorage.getItem('relay');
	var relayTime = window.localStorage.getItem('relayTime');
	var sid = getrequest('sid'),
		openid = getrequest('openid'),
		requestTime = getrequest('tm'),
		requestTkey = getrequest('tkey');
	
	// 获取全局配置
	if (isRelay != null && (isRelay == '1' || isRelay == '0') && relayTime != '' && relayTime.length == 10) {
		//判断relayTime与现在时间差是否超过24小时
		var nowTime = Date.now().toString().substring(0,10);
		var min = nowTime-relayTime;//时间差
		if (min >= 86400) {
			window.localStorage.setItem('relay', '1');
			window.localStorage.setItem('relayTime', '');
		}
	} else {
		$.post('../api/apps/config.php',{sid: sid}, function(e) {
			if(e.errcode==='1001'){
				var now = Date.now().toString().substring(0,10);
				window.localStorage.setItem('relay',e.relay);
				window.localStorage.setItem('relayTime', now);
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	}
	
	// 定时退出
	$.post('../api/apps/exit.php',{tm: requestTime,tkey: requestTkey}, function(e) {
		if(e.errCode !== '1001'){
			// 跳转页面
			
		}
	}, "json");
	
	// 获取用户信息
	$.post('../api/apps/getinfo.php',{openid: openid}, function(e) {
		if(e.errCode==='1001'){
			window.localStorage.setItem('userInfor', e);
			$('.user-image').find('img').attr('src',e.headimgurl);
		}else{
			mui.toast(e.msg);
		}
	}, "json");
	
	// 获取代金券列表
	$.post('../api/apps/coupon.php',{openid: openid}, function(e) {
		if(e.errCode==='1001'){
			window.localStorage.setItem('couponList', e.couponList);
			$('.coupons-nums').html(e.couponList.length);
		}else{
			mui.toast(e.msg);
		}
	}, "json");
	
	
	// 点赞动画
	$(document).on('tap','i',function(){
		if($(this).hasClass('fa-thumbs-o-up')){
			$(this).removeClass('fa-thumbs-o-up animation-delete');
			$(this).addClass('fa-thumbs-up animation-zan');
			var praise_num = $(this).parent().parent().find('.praise-nums').find('span');
			praise_num.html(parseInt(praise_num.html())+1);
			// 点赞数目加一
			$.post('../api/apps/wifi.php',{action: 'set',sid: sid,mid: $(this).attr('mid')}, function(e) {
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
		mui('#boxWifiInfor').popover('toggle');
		// 获取店铺WIFI列表 
		$.post('../api/apps/wifi.php',{sid: sid}, function(e) {
			if(e.errCode==='1001'){
				var strWifiList='';
				for(var i=0; i<e.wifiList.length; i++){
					strWifiList += '<li>'+
										'<div class="wifi-name">'+e.wifiList[i].wifiname+'</div>'+
										'<div class="wifi-password">'+e.wifiList[i].wifipass+'</div>'+
									'</li>';
				};
				$('.wifi-list').append(strWifiList);
			}else{
				mui.toast(e.msg);
			}
		}, "json");
	});
	$('body').on('tap','.popup-collect',function(){
		mui('#boxWifiInfor').popover('toggle');
		$('.wifi-list').children().remove();
	});
	
	
	
	
	
	
	
	
	
	
	
})


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
	
	setTimeout(function() {
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.box-technician-infor');
		for (var i = cells.length, len = i + 3; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'box-technician-infor';
//			li.innerHTML = '<a class="mui-navigate-right">Item ' + (i + 1) + '</a>';
			li.innerHTML = '<div class="technician-number">2401号</div>'+
							'<div class="technician-name">牙糕</div>'+
							'<div class="technician-image">'+
								'<img src="../image/4.jpg" width="100%" height="100%"/>'+
							'</div>'+
							'<div class="praise-nums">最近<span>623</span>次</div>'+
							'<div class="technician-optimum">中医推拿、精油开背</div>'+
							'<div class="praise">'+
								'<i class="fa fa-thumbs-o-up"></i>'+
							'</div>';
			//下拉刷新，新纪录插到最前面；
			table.insertBefore(li, table.firstChild);
		}
		mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
	}, 1500);
}
var count = 0;
/**
 * 上拉加载具体业务实现
 */
function pullupRefresh() {
	setTimeout(function() {
		mui('#pullrefresh').pullRefresh().endPullupToRefresh(); //参数为true代表没有更多数据了。
		var table = document.body.querySelector('.mui-table-view');
		var cells = document.body.querySelectorAll('.box-technician-infor');
		for (var i = cells.length, len = i + 10; i < len; i++) {
			var li = document.createElement('li');
			li.className = 'box-technician-infor';
			li.innerHTML = '<div class="technician-number">2401号</div>'+
							'<div class="technician-name">牙糕</div>'+
							'<div class="technician-image">'+
								'<img src="../image/4.jpg" width="100%" height="100%"/>'+
							'</div>'+
							'<div class="praise-nums">最近<span>623</span>次</div>'+
							'<div class="technician-optimum">中医推拿、精油开背</div>'+
							'<div class="praise">'+
								'<i class="fa fa-thumbs-o-up"></i>'+
							'</div>';
			table.appendChild(li);
		}
	}, 1500);
}
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














