


$(function(){
//	var asd = 1222;
//	
//	localStorage.setItem('try1',asd);
	
	$('#pullrefresh').css('height',window.innerHeight-$('.mui-content').height());
	// 点赞动画
	$(document).on('tap','i',function(){
		if($(this).hasClass('fa-thumbs-o-up')){
			$(this).removeClass('fa-thumbs-o-up animation-delete');
			$(this).addClass('fa-thumbs-up animation-zan');
			var praise_num = $(this).parent().parent().find('.praise-nums').find('span');
			praise_num.html(parseInt(praise_num.html())+1);
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
	});
	$('body').on('tap','.popup-collect',function(){
		mui('#boxWifiInfor').popover('toggle');
		
	})
	
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














