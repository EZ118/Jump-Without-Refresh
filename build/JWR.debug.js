class JWR {
	constructor() {		
		this.LastURL = "";			//最后一次加载后的页面链接
		this.UrlList = [{"subUrl":"error","realUrl":"./JWR.js"}];	//默认错误页
		this.SubPageEle = null;		//装载子页面的元素
		this.LoaderEle = document.createElement("div");
		this.LoaderStyle = {
			"static":"position:fixed;top:0;left:0;background:#0066FF;height:3px;z-index:10;",
			"active":"width"		//此处可以填width或者height
		};
		this.LoaderDelayTime = "0.25";	//加载动画持续时间
	}
	
	
	SetPage(ele){
		//设置装载子页面的元素
		this.SubPageEle = ele;
	}
	
	SetUrlList(json){
		//设置用来对应真假Url的Json
		this.UrlList = json;
	}
	
	SetLoaderStyle(ls){
		//设置加载条样式
		try{
			if(ls["static"]!=undefined && ls["active"]!=undefined){
				this.LoaderStyle = ls;
			} else {
				alert("Failed To Config!\n(JWR.js, SetLoaderStyle)");
			}
		} catch(e){alert("[JWR DEBUG]\n" + e + "\n(Set Loader Style)")}
	}

	
	GetFakeUrl(url){
		//获取假链接
		try{
			url += "#default";
			url = url.split("#")[1];
			url = this.GetTrueUrl(url, 0);
			return url;
		} catch(e){alert("[JWR DEBUG]\n" + e + "\n(Get Fake Url)")}
	}
	
	GetTrueUrl(subUrl, errorCode){
		//从Json中通过假Url获取真实Url
		try{
			if(errorCode == null) {errorCode = 0;}
			
			subUrl = subUrl.split("/");
			for(let i = 0; i < this.UrlList.length; i ++) {
				let cnt = 0;
				let slen = subUrl.length;
				
				if(subUrl[slen - 1] == "") {
					slen -= 1;
				}
				
				for(let j = 0; j < subUrl.length; j ++) {
					if(this.UrlList[i]["subUrl"].split("/")[j] == subUrl[j]) {
						cnt ++;
					}
				}
				
				if (cnt == subUrl.length) {
					return this.UrlList[i]["realUrl"];
				}
			}
			if(errorCode == 0) {
				return this.GetTrueUrl("error", 1);
			} else { return "error"; }
		} catch(e){alert("[JWR DEBUG]\n" + e + "\n(Get True Url)")}
	}
	
	ShowPage(url) {
		//通过真链接获取网页内容并展示
		try{
			var xhttp = null;
			if (window.XMLHttpRequest) {xhttp = new XMLHttpRequest();}
			else {xhttp = new ActiveXObject("Microsoft.XMLHTTP");}
			
			this.LoaderEle.setAttribute("style", this.LoaderStyle["static"] + ";" + this.LoaderStyle["active"] + ":15%;");
			
			var key = this;
			xhttp.onreadystatechange = function() {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					key.SubPageEle.innerHTML = xhttp.responseText;
					
					key.LoaderEle.setAttribute("style", key.LoaderStyle["static"] + ";animation:jwr_anim " + key.LoaderDelayTime + "s linear; animation-fill-mode:forwards;");
					setTimeout(function() {
						key.LoaderEle.setAttribute("style", "display:none;");
					}, 400);
				} else if (xhttp.readyState == 4 && (xhttp.status == 404 || xhttp.status == 403 || xhttp.status == 400)) {
					key.ShowPage(key.GetTrueUrl("error", 1));
				}
			};
			xhttp.open("GET", url, true);
			xhttp.send();
		} catch(e){alert("[JWR DEBUG]\n" + e + "\n(Show Page)")}
	}
	
	
	init() {
		try{
			document.body.appendChild(this.LoaderEle);
			this.LoaderEle.setAttribute("style", "");
			
			this.GuoDuStyle = "@keyframes jwr_anim{\
				0%{" + this.LoaderStyle["static"] + ";" + this.LoaderStyle["active"] + ":15%;opacity:1;}\
				80%{" + this.LoaderStyle["static"] + ";" + this.LoaderStyle["active"] + ":80%;opacity:0.8;}\
				100%{" + this.LoaderStyle["static"] + ";" + this.LoaderStyle["active"] + ":100%;opacity:0.1;}}";
			this.GuoDuStyleEle = document.createElement("style");
			document.head.appendChild(this.GuoDuStyleEle);
			this.GuoDuStyleEle.innerHTML = this.GuoDuStyle;
			
			var key = this;
			window.onhashchange = function(){
				if(key.LastURL != window.location.href) {
					let rurl = key.GetFakeUrl(window.location.href);
					key.ShowPage(rurl);
					key.LastURL = window.location.href;
				}
			};
		} catch(e){alert("[JWR DEBUG]\n" + e + "\n(init)")}
	}
	
}