//var try2 = localStorage.getItem('try1');
//alert(try2);

$(function(){
	
	var dataNum = getrequest('dataNums');
	var notUse = getrequest('notUse');  // 区分进入这页面的途径
	
	var canNotUseCouponList,  // 存储用户不可使用代金券数组
		canUseCouponList;  // 存储用户可用代金券数组
	
	//  代表点击的是暂不可用的代金券
	if(notUse && notUse==='notUse'){
		
		canNotUseCouponList = window.localStorage.getItem('canNotUseCouponList');  // 获得用户不可使用代金券数组
		canNotUseCouponList = eval('['+canNotUseCouponList+']');  // 把数据转换成JSON格式 ,加大括号表示处理对象是个数组
		
		var couponInfor = canNotUseCouponList[dataNum];
		console.log(couponInfor);
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
	    var strRule = '<li>'+ detail.replace('\r\n','</li><li>') +'</li>';
	    $('.use-rule').find('ul').html(strRule);
	    
	}else{
		canUseCouponList = window.localStorage.getItem('canUseCouponList');  // 获得用户不可使用代金券数组
		canUseCouponList = eval('['+canUseCouponList+']');  // 把数据转换成JSON格式 ,加大括号表示处理对象是个数组
		
		var couponInfor = canUseCouponList[dataNum];
		console.log(couponInfor);
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
	    var strRule = '<li>'+ detail.replace('\r\n','</li><li>') +'</li>';
	    $('.use-rule').find('ul').html(strRule);
	}
	
//	var couponList = window.localStorage.getItem('couponList');
//	//var jsonp = eval(co);  // 字符串转换为josn数据
//	//alert(jsonp[0].num);
//	couponList = JSON.parse(couponList);// 字符串转换为josn数据
//	var nowTime = new Date.now().toString().substring(0,10);
//	for(var i=0; i<couponList.length; i++){
//		
//	}
	
//		// 转化时间戳
//	var d = new Date(parseInt(couponList[1].begin) * 1000);
//	var date1 = (d.getFullYear()) + "/" + 
//	           (d.getMonth() + 1) + "/" +
//	           (d.getDate()) + "/" + 
//	           (d.getHours()) + "/" + 
//	           (d.getMinutes());
//	console.log(date1);
});





