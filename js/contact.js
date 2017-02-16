window.onload=function(){
    TabSwitch();
    imgChange();
    maps();
}
//图片无缝轮播
function imgChange(){
    var container=getClass("document","graduShow")[0];
    var content=getClass(container,"graduContentShow")[0];
    var current=0;
    setInterval(function(){
      if(current==3){
            content.style.transition="none";
            content.style.left=0+"px";
            setTimeout(function(){
                current=1;
                content.style.left=-540+"px";
                content.style.transition=1.2+'s';
            },30)
        }else{
            current++;
            content.style.left=-540*current+"px";
        }
    },2000);
}
//选项卡
function TabSwitch(){
    var oul=document.getElementById("check");
    var lis=oul.getElementsByTagName("li");
    var len=lis.length;
    var Bcontent=document.getElementById("content");
    var contents=getClass(Bcontent,"right");
    var contents=document.getElementById("content").getElementsByClassName("right");
    contents[0].parentNode.style.height=contents[0].offsetHeight+"px";
    for(var i=2;i<len;i++){
        lis[i].index=i;
        lis[i].onclick=function(){
            var LiclassName=contents[this.index-2].className;
            if(LiclassName.search("Cactive")!=-1){
                return;
            }else{
                 for(var i=2;i<len;i++){
                    (function(i){
                        lis[i].className="";
                        var LiclassName=contents[i-2].className;
                        if(LiclassName.search("Cactive")!=-1){
                            contents[i-2].className=LiclassName.substring(0,LiclassName.search("Cactive"));
                            
                        }
                    })(i);
                };
                this.className="active";
                 contents[this.index-2].className+=" Cactive";
                if(this.index==4||this.index==6){
                       contents[this.index-2].parentNode.style.height=435+"px";
                }else{
                    contents[this.index-2].parentNode.style.height=contents[this.index-2].offsetHeight+"px";
                }
            }
        }
    }
}
//地图
function maps(){
    var map = new AMap.Map('container',{
            resizeEnable: true,
            zoom: 10,
            center: [116.480983, 40.0958]
    });
    // 添加点标记
    var marker = new AMap.Marker({
            position: [50, 39.989628]
    });
    marker.setMap(map);
    marker.on('click',function(e){
      infowindow.open(map,e.target.getPosition());
    })
    // 添加信息窗体
    AMap.plugin('AMap.AdvancedInfoWindow',function(){
       infowindow = new AMap.AdvancedInfoWindow({
        content: '<div class="info-title">高德地图</div><div class="info-content">'+
                '<img src="http://webapi.amap.com/images/amap.jpg">'+
                '<span>高德是中国领先的数字地图内容、导航和位置服务解决方案提供商。<span><br/>'+
                '<a target="_blank" href = "http://mobile.amap.com/">点击下载高德地图</a></div>',
        offset: new AMap.Pixel(0, -10)
      });
      infowindow.open(map,[116.480983, 39.989628]);
    })
    // 添加滚动条及放大功能
    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
        var toolBar = new AMap.ToolBar();
        var scale = new AMap.Scale();
        map.addControl(toolBar);
        map.addControl(scale);
    })
}
//获取类名，解决兼容性问题
function getClass(parent,cls){
    var all=(document||parent).getElementsByTagName("*");
    var result=[];
    for(var i=0;i<all.length;i++){
        if(all[i].nodeType==1&&all[i].className.search(cls)!=-1){
            result.push(all[i]);
        }
    }
    return result;
}
//将类数组转换成真正的数组
function toArray(list){
    if(typeof list!='object'||typeof list.length!='number'){
        throw new Error("参数不是类数组");
    }
    if(Object.prototype.toString.call(list)==='[object Array]'){
        return list;
    }
    try{
        return Array.prototype.slice.call(list,0);
    }catch(ex){
        var result=[];
        for(var i=0,len=list.length;i<len;i++){
            result.push(list[i]);
        }
        return result;
    }
}