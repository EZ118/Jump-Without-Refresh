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
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			Ele.innerHTML = this.responseText;
		}
	};
	xhttp.open("GET", url, true);
	xhttp.send(); 
}

function GetData(url=window.location.href){
	url += "#default";
	url = url.split("#")[1];
	return url;
}

document.onmousedown = function(){
	setTimeout(function(){
		if(LastURL != window.location.href) {
			rurl = GetPageUrl(GetData());
			ShowPage(rurl);
			//alert(GetPageUrl(GetData()));
			LastURL = window.location.href;
		}
	}, 300);
}