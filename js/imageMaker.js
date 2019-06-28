
//图片操作获取具体数据的函数
function imageMaker(eleID,otherID){
	var oldX=0,
		oldY=0,
		ratio=1;
		
	$(""+eleID+"").on("touchstart",imgTouchStart);
	$(""+eleID+"").on("touchmove",imgTouchMove);
	$(""+eleID+"").on("touchend",imgTouchEnd);
	
	//手指按下时，捕捉事件，取坐标值，设置参数
	function imgTouchStart(e){
		//阻止事件冒泡的
		e.stopImmediatePropagation();
		e.preventDefault(); 
		$(""+eleID+"").attr("draggable",true);

		oldX = e.originalEvent.touches[0].clientX;
		oldY = e.originalEvent.touches[0].clientY;
	}
		
	function imgTouchMove(e){
		e.stopImmediatePropagation();
		//阻止事件冒泡，避免，移动照片时，整个页面也会随滚动条移动
		e.preventDefault();
		if($(""+eleID+"").attr("draggable")) {
			var x = e.originalEvent.touches[0].clientX - oldX;
			var y = e.originalEvent.touches[0].clientY - oldY;
			var oldTop = $(""+eleID+"")[0].offsetTop;
			var oldLeft = $(""+eleID+"")[0].offsetLeft;
			var NewTop = y + parseInt(oldTop);
			var newLeft = x + parseInt(oldLeft);
			$(""+eleID+"").css({"top":NewTop+"px","left":newLeft+"px"});
			oldX = e.originalEvent.touches[0].clientX;
			oldY = e.originalEvent.touches[0].clientY;
		}
	}
	
	//手指拿开时，设置参数
	function imgTouchEnd(e) {
		e.stopImmediatePropagation();
		e.preventDefault();
		$(""+eleID+"").attr("draggable",false);
	}
	
	
	$(".shape1").on("touchstart",function(e){
		setImgSmall();
	});
	
	$(".shape3").on("touchstart",function(e){
		setImgBig();
	});
	
	$(".shape2").on("touchstart",function(e){
		setImgAngle();
	});
	
	//放大、缩小的
	function setImgBig() {
		var width = parseInt($(""+otherID+"").width()) * 1.03;
		var height = parseInt($(""+otherID+"").height()) * 1.03;

		$(""+otherID+"").css({
			'width': width+"px",
			'height': height+"px",
		});
		console.log("打印我"+width);
	}
	
	function setImgSmall() {
		var width = parseInt($(""+otherID+"").width()) * 0.97;
		var height = parseInt($(""+otherID+"").height()) * 0.97;

		$(""+otherID+"").css({
			'width': width+"px",
			'height': height+"px",
		});
	}
	
	function setImgAngle(){
		//这里只取图片的角度，值旋转图片。外框不做操作了
		var theAngle = getEletAngle();
		var angleNow = theAngle+10;
		$(".f-sucai").css({'transform': "rotate("+angleNow+"deg)"});
	}
}


//获取元素旋转角度
	function getEletAngle(eletClass){
		var el = document.getElementsByClassName("f-sucai")[0];
		console.log(el);
		var st = window.getComputedStyle(el, null);
		var tr = st.getPropertyValue("-webkit-transform") ||
			st.getPropertyValue("-moz-transform") ||
			st.getPropertyValue("-ms-transform") ||
			st.getPropertyValue("-o-transform") ||
			st.getPropertyValue("transform") ||
			"FAIL";
		//console.log('Matrix: ' + tr);
		var values = tr.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
		//console.log('Rotate: ' + angle + 'deg');
		return angle;
	}