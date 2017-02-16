//尺寸选择
function size(){
    var s=getElementsByClassName('size',document)[0];
    var lis=toArray(s.getElementsByTagName("li"));
    for(var i=0;i<lis.length;i++){
		lis[i].onclick=function(){
			for(var j=0;j<lis.length;j++){
				if(lis[j].className="checked")lis[j].className="";
			}
			this.className="checked";
		}
	}
}
//选择颜色和大图小图选择
function colors(color){
    var scale=document.getElementById('scale');
	var lis=toArray(color.getElementsByTagName('li'));
    for(var i=0;i<lis.length;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            for(var j=0;j<lis.length;j++){
                lis[j].className="";
            }
            this.className="checked";
            proItemShow.src=proItemShow.src.replace(/(\w{7})(\.jpg)/,this.title+'$2');
            var a=this.title.replace('litter','big');
            scale.style.backgroundImage="url(image/shopping/"+a+".jpg)";
        }
    }
}
//放大镜
function scale(){
    var scale=document.getElementById('scale');
	var proItemShow=document.getElementById('proItemShow');
	var move=document.getElementById('move');
    proItemShow.onmouseover=function(e){
        scale.style.display="block";
        move.style.display="block";
        e=e||window.event;
        var l=e.clientX-proItemShow.offsetLeft-move.offsetWidth/2;
        var t=e.clientY-proItemShow.offsetTop-move.offsetHeight/2;
        if(l<0){
            l=0;
        }else if(l>proItemShow.offsetWidth-move.offsetWidth){
            l=proItemShow.offsetWidth-move.offsetWidth;
        }
        if(t<0){
            t=0;
        }else if(t>proItemShow.offsetHeight-move.offsetHeight){
            t=proItemShow.offsetHeight-move.offsetHeight;
        }
        move.style.left=l+"px";
        move.style.top=t+"px";
        var a=100*(l-80)/100;
		var b=100*(t-195)/100;
		scale.style.backgroundPosition=(-1)*a+'px '+(-1*b)+'px';
    }
    proItemShow.onmouseout=function(){
        scale.style.display="none";
        move.style.display="none";
    }
}
//scale
function scale(){
	var scale=document.getElementById('scale');
	var proItemShow=document.getElementById('proItemShow');
	var move=document.getElementById('move')
	proItemShow.onmousemove=function(e){
		e=e||window.event; 
	    var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	    var x = e.clientX;
	    var y = e.pageY || e.clientY + scrollY;
        if(x-180<0){
            x=0;
        }else if(x-180>proItemShow.offsetWidth-move.offsetWidth){
            x=proItemShow.offsetWidth-move.offsetWidth;
        }
        if(y-197<0){
           y=0;
        }else if(y-197>proItemShow.offsetHeight-move.offsetHeight){
            y=proItemShow.offsetHeight-move.offsetHeight;
        }
		scale.style.display='block';
		move.style.opacity='0.4';
		move.style.left=(x-180)+'px';
		move.style.top=(y-197)+'px';
		var a=100*(x-180)/100;
		var b=100*(y-195)/100;
		scale.style.backgroundPosition=(-1)*a+'px '+(-1*b)+'px';
	};
	proItemShow.onmouseout=function(){
		scale.style.display='none';
		move.style.opacity='0';
	}
}
//数量的增加和减少
function numOperater(){
    var addnum=document.getElementById('addnum');
	var subnum=document.getElementById('subnum');
	var num=document.getElementById('num');
    addnum.onclick=function(){
        num.value=parseInt(num.value)+1;
    };
    subnum.onclick=function(){
        if(parseInt(num.value)==0){
            num.value=0;
        }else{
            num.value=parseInt(num.value)-1;
        }
    }
    
}
//立即购买
function buys(){
    var buyNow=document.getElementById('buyNow');
    buyNow.onclick=function(e){
        e.preventDefault();
        var buy=document.getElementById('buy');
		buy.style.zIndex=1000;
		buy.style.opacity=1;
		var size=document.getElementById('buySize');
		var num=document.getElementById('buyNum');
		var color=document.getElementById('buyColor');
		var address=document.getElementById('buyAddress');	
		var checked=document.getElementsByClassName('checked');
        size.innerHTML=checked[1].innerHTML;
        color.innerHTML=checked[2].getElementsByTagName('img')[0].alt;
        num.innerHTML=document.getElementById('num').value;
		var yes=document.getElementById('yes');
		var no=document.getElementById('no');
        yes.onclick=no.onclick=function(e){
            e.preventDefault();
            buy.style.zIndex=-1;
            buy.style.opacity=0;
        }
    }
}
//右侧轮播图片
var current=0;
var timer=null;
function indexImg(){
    var cts=getElementsByClassName("proItem_close",document)[0];
    var container=getElementsByClassName('closeShow',document)[0];
    var content=getElementsByClassName('scrollA',container)[0];
    var up=cts.getElementsByTagName("span")[0];
    var down=cts.getElementsByTagName("span")[1];
    current=current+1>3?0:current+1;
    if(current==3){
        content.style.transition="none";
        content.style.top=0+"px";
        setTimeout(function(){
            current=1;
            content.style.top=-480+"px";
            content.style.transition=0.6+'s';
        },30)
    }else{
        content.style.top=-480*current+"px";
    }
    var flag=
    up.onclick=function(){
        clearInterval(timer);
        current=current-1<0?2:current-1;
        content.style.top=-480*current+"px";
        timer=setInterval(indexImg,3000);
    }
    down.onclick=function(){
        clearInterval(timer);
        current=current+1>2?0:current+1;
        content.style.top=-480*current+"px";
        timer=setInterval(indexImg,3000);
    }
    
}
//用户评价选项卡
function userTab(lis){
    var tabs=getElementsByClassName("tabControl",document)[0];
    var tabC=getElementsByClassName("tabContent",tabs)[0];
    var comC=getElementsByClassName("commentContent",tabs)[0];
    lis[0].onclick=function(){
        this.className="Tactive";
        lis[1].className="";
        if(comC.className.search("tabActive")!=-1){
            comC.className=comC.className.substring(0,comC.className.search("tabActive"));
        }
        tabC.className+=" tabActive";
    }
    lis[1].onclick=function(){
        this.className="Tactive";
        lis[0].className="";
        if(tabC.className.search("tabActive")!=-1){
            tabC.className=tabC.className.substring(0,tabC.className.search("tabActive"));
        }
        comC.className+=" tabActive";
    }
}
//浮动导航
function floatShow(){
    var tabsc=document.getElementsByClassName("tabControl")[0];
    var tabC=getElementsByClassName("tabContent",tabsc)[0];
    var comC=getElementsByClassName("commentContent",tabsc)[0];
    var lis=document.getElementsByClassName("tabControl")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");
    //浮动区域选项卡
    var float=document.getElementsByClassName("floatNav")[0];
    var flis=float.getElementsByTagName("ul")[0].getElementsByTagName("li");
//    如果这个商品信息是有tabActive，那么浮动的导航第一个是Tactive
    if(tabC.className.search("tabActive")!=-1){
        lis[0].className=flis[0].className="Tactive";
        lis[1].className=flis[1].className="";
    }else{
        lis[0].className=flis[0].className="";
        lis[1].className=flis[1].className="Tactive";
    }
    userTab(lis);
    userTab(flis);
}
	// 回到顶部
function toTop(){
	var btn =document.getElementsByClassName('totop')[0];
//    浮动导航区域
    var float=document.getElementsByClassName("floatNav")[0];
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
                float.style.display="block";
			} else {
				btn.style.display = "none";
                float.style.display="none";
		};
//        浮动导航
//        滚轮滚动的时候，检测选项卡的商品信息和商品评价哪个处于激活状态，调整固定导航的li和浮动导航的li，使其处于同步改变状态
        floatShow();
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
