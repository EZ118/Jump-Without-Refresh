var LastURL = "";
var UrlList = [{"subUrl":"default","realUrl":"./JWR.js"}];
var Ele;

function SetUrlList(json){UrlList = json;}

function SetPage(ele){Ele = ele;}

function GetPageUrl(subUrl){
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
}

function ShowPage(url) {
	if (window.XMLHttpRequest) {xhttp = new XMLHttpRequest();}
	else {xhttp = new ActiveXObject("Microsoft.XMLHTTP");}
	
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			Ele.innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send(); 
}

function GetData(url){
	url += "#default";
	url = url.split("#")[1];
	url = GetPageUrl(url);
	return url;
}

document.onmousedown = function(){
	setTimeout(function(){
		if(LastURL != window.location.href) {
			rurl = GetData(window.location.href);
			ShowPage(rurl);
			LastURL = window.location.href;
		}
	}, 300);
}