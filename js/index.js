var current=0;
var timer=null;
function indexImg(){
    var banner=document.getElementById("banner");
    var imgSrc=banner.getElementsByClassName("bannerImg")[0].getElementsByTagName("img")[0];
    var imgs=["image/index/banner1.jpg","image/index/banner2.jpg","image/index/banner3.jpg"];
    var spans=document.getElementById("circle").getElementsByTagName("span");
    current=current<imgs.length-1?current+1:0;
    imgSrc.src=imgs[current];
    for(var j=0;j<spans.length;j++){
         if(spans[j].className=='current') spans[j].className="";
    }
    spans[current].className="current";
     for(var i=0;i<spans.length;i++){
         spans[i].index=i;
         spans[i].onclick=function(){
             clearInterval(timer);
             current=this.index;
             for(var j=0;j<spans.length;j++){
                 if(spans[j].className=='current') spans[j].className="";
            }
            this.className="current";
            imgSrc.src=imgs[current];
            timer=setInterval(indexImg,2000);
         }
    }
}
	// 回到顶部
function toTop(){
	var btn =document.getElementsByClassName('totop')[0];
//    浮动导航区域
	var time = null;
	var isTop = true;
	//获取页面可视区高度
	var clientHeight = document.documentElement.clientHeight;
	//滚动条滚动时触发
	window.onscroll = function() {
		//显示回到顶部按钮
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if (osTop >= clientHeight+100) {
				btn.style.display = "block";
			} else {
				btn.style.display = "none";
		};
//        浮动导航
//        滚轮滚动的时候，检测选项卡的商品信息和商品评价哪个处于激活状态，调整固定导航的li和浮动导航的li，使其处于同步改变
		//回到顶部过程中用户滚动滚动条，停止定时器
		if (!isTop) {
			  clearInterval(timer);
			};
			isTop = false;
	};
	btn.onclick = function(){
	//设置定时器
		time= setInterval(function(){
		// 获取滚动条的距离顶部高度
		var osTop=document.documentElement.scrollTop || document.body.scrollTop;
		var ispeed=Math.floor(-osTop/5);
		document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
			isTop = true;
			if(osTop==0){
			clearInterval(time);
			}
		},20);
	}
}
window.onload=function(){
    timer=setInterval(indexImg,3000);
    toTop();
}