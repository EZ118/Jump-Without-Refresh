var LastURL = "";
var UrlList = ULJson = [
	{
		"subUrl":"default",
		"realUrl":"./mainPage.htm"
	},
	{
		"subUrl":"error",
		"realUrl":"./error.htm"
	},
	{
		"subUrl":"/home/",
		"realUrl":"./mainPage.htm"
	},
	{
		"subUrl":"/test1/",
		"realUrl":"./subPage1.htm"
	},
	{
		"subUrl":"/test2/",
		"realUrl":"./subPage2.htm"
	},
];
var Ele;			//装载子页面的元素
var LoaderEle = document.createElement("div");
var LoaderStyle = {
	"static":"position:fixed;top:0;left:0;background:#0066FF;height:3px;z-index:10;",
	"active":"width"//此处可以填width或者height
};
var LoaderDelayTime = "0.25";

window.onload = function(){
	document.body.appendChild(LoaderEle);
	LoaderEle.setAttribute("style", "");
	
	let GuoDuStyle = "@keyframes jwr_anim{\
		0%{" + LoaderStyle["static"] + ";" + LoaderStyle["active"] + ":15%;opacity:1;}\
		80%{" + LoaderStyle["static"] + ";" + LoaderStyle["active"] + ":80%;opacity:0.8;}\
		100%{" + LoaderStyle["static"] + ";" + LoaderStyle["active"] + ":100%;opacity:0.1;}}";
	let GuoDuStyleEle = document.createElement("style");
	document.head.appendChild(GuoDuStyleEle);
	GuoDuStyleEle.innerHTML=GuoDuStyle;
};

function SetUrlList(json){
	//设置用来对应真假Url的Json
	UrlList = json;
}

function SetPage(ele){
	//设置装载子页面的元素
	Ele = ele;
}

function SetLoaderStyle(ls){
	//设置加载条样式
	if(LoaderStyle["static"]!=undefined && LoaderStyle["active"]!=undefined){
		LoaderStyle = ls;
	} else {
		alert("Failed To Config!\n(JWR.js, SetLoaderStyle)");
	}
}

function GetPageUrl(subUrl, errorCode){
	//从Json中通过假Url获取真实Url
	if(errorCode == null) {errorCode = 0;}
	
	subUrl = subUrl.split("/");
	for(let i = 0; i < UrlList.length; i ++) {
		let cnt = 0;
		let slen = subUrl.length;
		
		if(subUrl[slen - 1] == "") {slen -= 1;}
		
		for(let j = 0; j < subUrl.length; j ++) {
			if(UrlList[i]["subUrl"].split("/")[j] == subUrl[j]) {cnt ++;}
		}
		if (cnt == subUrl.length) {return UrlList[i]["realUrl"];}
	}
	if(errorCode == 0) {
		return GetPageUrl("error", 1);
	} else { return "error"; }
}

function ShowPage(url) {
	if (window.XMLHttpRequest) {xhttp = new XMLHttpRequest();}
	else {xhttp = new ActiveXObject("Microsoft.XMLHTTP");}
	
	LoaderEle.setAttribute("style", LoaderStyle["static"] + ";" + LoaderStyle["active"] + ":15%;");
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			Ele.innerHTML = this.responseText;
			
			LoaderEle.setAttribute("style", LoaderStyle["static"] + ";animation:jwr_anim " + LoaderDelayTime + "s linear; animation-fill-mode:forwards;");
			setTimeout(function() {
				LoaderEle.setAttribute("style", "display:none;");
			}, 400);
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send(); 
}

function GetData(url){
	url += "#default";
	url = url.split("#")[1];
	url = GetPageUrl(url, 0);
	return url;
}

try {
	window.onhashchange = function () {
		if(LastURL != window.location.href) {
			rurl = GetData(window.location.href);
			ShowPage(rurl);
			LastURL = window.location.href;
		}
	};
} catch(err) {
	alert("Your Browser Doesn't Support 'onhashchange' Case");
	document.onmousedown = function(){
		setTimeout(function(){
			if(LastURL != window.location.href) {
				rurl = GetData(window.location.href);
				ShowPage(rurl);
				LastURL = window.location.href;
			}
		}, 300);
	}
}