//From http://www.mb5u.com/demo/jquery/35_165
(function($){
	$.fn.extend({
		MarqueeScroll:function(opt){
			opt = opt || {};
			var _this=this.eq(0).find("ul:first");

            var noAnimate=opt.noAnimate?opt.noAnimate:'false',
                lineH=_this.find("li:first").height(), //获取行高
                line=opt.line?parseInt(opt.line,10):parseInt(this.height()/lineH,10), //每次滚动的行数，默认为一屏，即父容器高度
                speed=opt.speed?parseInt(opt.speed,10):500, //卷动速度，数值越大，速度越慢（毫秒）
                timer=opt.timer?parseInt(opt.timer,10):5000; //滚动的时间间隔（毫秒）

                line = line || 1;
            var timerID = 0;
            var upHeight=0-line*lineH;
                //滚动函数
                var scrollUp=function(){
                if('true' === noAnimate){
                    _this.animate({
                        // marginTop:upHeight
                    },speed,function(){
                        for(var i=1;i<=line;i++){
                            _this.find("li:first").appendTo(_this);
                        }
                        _this.css({marginTop:0});
                    });
                }else{
                    _this.animate({
                        marginTop:upHeight
                    },speed,function(){
                        for(var i=1;i<=line;i++){
                            _this.find("li:first").appendTo(_this);
                        }
                        _this.css({marginTop:0});
                    });
                }

			};

			//鼠标事件绑定
			_this.hover(function(){
				clearInterval(timerID);
			},function(){
				clearInterval(timerID);
				timerID=setInterval(scrollUp,timer);
			}).mouseout();
		}
	});
})(jQuery);