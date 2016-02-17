//var try2 = localStorage.getItem('try1');
//alert(try2);

$(function(){
	
	var dataNums = getrequest('dataNums');
	var notUse = getrequest('notUse');  // 区分进入这页面的途径
	
	var canNotUseCouponList,  // 存储用户不可使用代金券数组
		canUseCouponList;  // 存储用户可用代金券数组
	
	//  代表点击的是暂不可用的代金券
	if(notUse==='notUse'){
		
		canNotUseCouponList = window.localStorage.getItem('canNotUseCouponList');  // 获得用户不可使用代金券数组
		canNotUseCouponList = eval('['+canNotUseCouponList+']');  // 把数据转换成JSON格式 ,加大括号表示处理对象是个数组
		
		var shopList = canNotUseCouponList[dataNums].shoplist;
		console.log(shopList);
		var ulContent = document.body.querySelector('.store-list');
		// 显示适用门店列表
		for(var i=0;i<shopList.length;i++){
		
			var li = document.createElement('li');
			li.className = 'list';
			var str = '<div class="sign-dian"></div>'+
					'<div class="store-name">'+ shopList[i].shopname +'</div>'+
					'<div class="stroe-addr">'+ shopList[i].address +'</div>'+
					'<a href="tel:'+ shopList[i].tel +'"><i class="fa fa-phone-square store-phone"></i></a>';
			li.innerHTML = str;
			ulContent.appendChild(li);
		}
	}else{  // 代表点击的是可用的代金券
		canUseCouponList = window.localStorage.getItem('canUseCouponList');  // 获得用户不可使用代金券数组
		canUseCouponList = eval('['+canUseCouponList+']');  // 把数据转换成JSON格式 ,加大括号表示处理对象是个数组
		
		var shopList = canUseCouponList[dataNums].shoplist;
		console.log(shopList);
		var ulContent = document.body.querySelector('.store-list');
		// 显示适用门店列表
		for(var i=0;i<shopList.length;i++){
		
			var li = document.createElement('li');
			li.className = 'list';
			var str = '<div class="sign-dian"></div>'+
					'<div class="store-name">'+ shopList[i].shopname +'</div>'+
					'<div class="stroe-addr">'+ shopList[i].address +'</div>'+
					'<a href="tel:'+ shopList[i].tel +'"><i class="fa fa-phone-square store-phone"></i></a>';
			li.innerHTML = str;
			ulContent.appendChild(li);
		}
	}
	
});





