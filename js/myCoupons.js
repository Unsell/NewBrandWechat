//var try2 = localStorage.getItem('try1');
//alert(try2);
var userImage = document.querySelector('.user-image'),
	popupClose = document.querySelector('.popup-close'),
	btnSubmit = document.querySelector('.submit');



// 弹窗--绑定手机
userImage.addEventListener('tap',function(){
	$('.popup-validate').show();
});

// 关闭弹窗-绑定手机
popupClose.addEventListener('tap',function(){
	$('.popup-validate').hide();
});


// 提交绑定手机信息
btnSubmit.addEventListener('tap',function(){
	$('.popup-validate').hide();
});

// 跳转页面

$('.box-coupons').on('tap','.box-coupons-can-use',function(){
	mui.openWindow({
	    url:'couponsDetailed.html'
	});
});
