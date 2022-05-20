# DevDoc   
   
   
**你的HTML页面必须包含以下代码**   
```html
<div id="mainPage"></div>
<!--
	两个脚本必须放置在body标签的结尾
	JWR.min.js必须置于setup.js之后
-->
<script src="./setup.js"></script>						<!--setup.js的文件名和内容可以自定义-->
<script src="./JWR.min.js"></script>					<!--引入库-->

<script>
	SetPage(document.getElementById("mainPage"));		//这里按照情况，获取的元素即为页面显示部分
	SetUrlList(ULJson);									//这里的ULJson需要在setup.js中定义
	SetLoaderStyle({									//这个函数用于定义加载进度条的样式（可选）
		"static":"position:fixed;top:0;left:0;background:red;height:3px;z-index:10;",//此处表示静态样式
		"active":"width"								//此处表示加载时动态的样式，可以填width、height等
	});
	ShowPage(GetData(window.location.href));			//在页面加载完成后载入子页面，此处在最新的版本更新中略有改动，此举是为了兼容IE
</script> 
```   
   
在你的HTML父页面和子页面都可以通过使用`<a href="#/subUrl/"></a>`标签跳转子页面
   
   
**在setup.js中的内容：**   
```js
ULJson = [
	{
		"subUrl":"default",					//当页面URL后没有路径信息，用default表示
		"realUrl":"./mainPage.htm"
	},
	{
		"subUrl":"/home/",					//真实页面路径对应的假URL路径
		"realUrl":"./mainPage.htm"				//假URL路径所表示页面的真实路径
	},
	{
		"subUrl":"/test1/",
		"realUrl":"./subPage1.htm"
	},
	{
		"subUrl":"/test2/",
		"realUrl":"./subPage2.htm"
	}
];
```
