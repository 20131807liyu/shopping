function imgChange(container){
    var content=container.getElementsByClassName("adShow")[0];
    var current=0;
    setInterval(function(){
          if(current==2){
            content.style.transition="none";
            content.style.top=0+"px";
            setTimeout(function(){
                current=1;
                content.style.top=-180+"px";
                content.style.transition=0.6+'s';
            },30)
        }else{
            current++;
            content.style.top=-180*current+"px";
        }
    },2000);
}
//        获取样式的兼容性函数
function getStyle(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }else{
            return getComputedStyle(obj,false)[attr];
        }
    }
//品牌故事，图片轮播
 function toChange(){
    var aLi=document.getElementById("stage").getElementsByTagName("ul")[0].getElementsByTagName("li");
    var arr=[];
    for(var i=0;i<aLi.length;i++){
        var oImg=aLi[i].getElementsByTagName("img")[0];                     arr.push([parseInt(getStyle(aLi[i],'left')),parseInt(getStyle(aLi[i],'top')),getStyle(aLi[i],'zIndex'),oImg.width,oImg.height]);
    }
    var btn=document.getElementById("btn");
    var left=document.getElementById("sleft");
    var right=document.getElementById("sright");
    left.onclick=function(){
         arr.unshift(arr.pop());
         cha();
     }
     right.onclick=function(){
        arr.push(arr.shift());
        cha();
     }
    function cha(){
        for(var i=0;i<aLi.length;i++){
            var oImg=aLi[i].getElementsByTagName('img')[0];
            aLi[i].style.zIndex=arr[i][2];
            startMove(aLi[i],{left : arr[i][0] , top : arr[i][1] });
			startMove( oImg,{ width : arr[i][3],height:arr[i][4]});
        }
    }
}