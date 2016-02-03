//var try2 = localStorage.getItem('try1');
//alert(try2);

$(function(){
	
	var couponList = window.localStorage.getItem('couponList');
	//var jsonp = eval(co);  // 字符串转换为josn数据
	//alert(jsonp[0].num);
	couponList = JSON.parse(couponList);// 字符串转换为josn数据
	var nowTime = new Date.now().toString().substring(0,10);
	for(var i=0; i<couponList.length; i++){
		
	}
	
});





