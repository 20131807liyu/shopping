function toArray(list){
	if(typeof list!='object'||typeof list.length!='number'){
		throw new Error('参数不是类数组');
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
function checkNode(node){
	if(node==null||typeof node!=='object'){
		throw new Error('参数类型有误');
	}
	if(node.nodeType!=1&&node.nodeType!=9){
		throw new Error('给定参数不是元素或文档节点');
	}
}
function childElementNodes(node){
	checkNode(node);
	var childs=[],child=node.firstChild;
	while(child!=null){
		if(child.nodeType==1) childs.push(child);
		child=child.nextSibling;
	}
	return childs;
}
function firstElementChild(node){
	checkNode(node);
	if(node.firstElementChild) 
		return node.firstElementChild;
	else{
		var child=node.firstChild;
		while(child!=null){
			if(child.nodeType==1) return child;
			child=child.nextSibling;
		}
		return null;
	}
}
function lastElementChild(node){
	checkNode(node);
	if(node.lastElementChild)//能力检测
		return node.lastElementChild;
	else{
		var child=node.lastChild;
		while(child!=null){
			if(child.nodeType==1) return child;
			child=child.previousSibling;
		}
		return null;
	}
}
function nextElementSibling(node){
	checkNode(node);
	if(node.nextElementSibling)//能力检测
		return node.nextElementSibling;
	else{
		var child=node.nextSibling;
		while(child!=null){
			if(child.nodeType==1) return child;
			child=child.nextSibling;
		}
		return null;
	}
}
function previousElementSibling(node){
	checkNode(node);
	if(node.previousElementSibling)//能力检测
		return node.previousElementSibling;
	else{
		var child=node.previousSibling;
		while(child!=null){
			if(child.nodeType==1) return child;
			child=child.previousSibling;
		}
		return null;
	}
}
function siblings(node){
	checkNode(node);
	var parent=node.parentNode;
	var others=[],child=parent.firstChild;
	while(child!=null){
		if(child.nodeType==1&&child!==node){
			others.push(child);
		}
		child=child.nextSibling;
	}
	return others.length==0?null:others;
}
function getElementsByClassName(name,context){
	if(context.getElementsByClassName)
		return context.getElementsByClassName(name);
	context=context || document;
	var childs=context.getElementsByTagName('*');
	childs.toArray(childs);
	var result=[];
	var r=new RegExp('\\b'+name+'\\b');
	for(var i=0;i<childs.length;i++){		
		if(r.test(childs[i].className)){
			result.push(childs[i]);
		}
	}
	return result;
}

