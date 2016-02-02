
$(function(){
	document.getElementById("validate").addEventListener("tap",function(){
		//倒计时
		var count = 60;
	    var countdown = setInterval(CountDown, 1000)   
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
	});
})





