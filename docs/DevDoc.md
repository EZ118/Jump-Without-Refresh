#DevDoc   
   
   
**你的HTML页面必须包含以下代码**   
```html
<div id="mainPage"></div>
<!--
	两个脚本必须放置在body标签的结尾
	JWR.min.js必须置于setup.js之后
-->
<script src="./setup.js"></script>					<!--setup.js的文件名和内容可以自定义-->
<script src="./JWR.min.js"></script>				<!--引入库-->

<script>
	SetPage(document.getElementById("mainPage"));	//这里按照情况，获取的元素即为页面显示部分
	SetUrlList(ULJson);								//这里的ULJson需要在setup.js中定义
	ShowPage(GetPageUrl(GetData()));				//在页面加载完成后载入子页面
</script> 
```   
   
在你的HTML父页面和子页面都可以通过使用`<a href="#/subUrl/"></a>`标签跳转子页面
   
   
**在setup.js中的内容：**   
```js
ULJson = [
	{
		"subUrl":"default",							//当页面URL后没有路径信息，用default表示
		"realUrl":"./mainPage.htm"
	},
	{
		"subUrl":"/home/",							//真实页面路径对应的假URL路径
		"realUrl":"./mainPage.htm"					//假URL路径所表示页面的真实路径
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