# DevDoc   
   
   
**你的HTML页面需包含以下代码**   
```html
<div id="mainPage"></div>
<!--
	两个脚本必须放置在body标签的结尾
	JWR.min.js必须置于setup.js之后
-->
<script src="./setup.js"></script>				<!--setup.js的文件名和内容可以自定义-->
<script src="./JWR.min.js"></script>				<!--引入库-->

<script>
	var jwr = new JWR();					//调用类
	jwr.SetPage(document.getElementById("mainPage"));	//这里按照情况，获取的元素即为页面显示部分
	jwr.SetLoaderStyle({
		"static":"position:fixed;top:0;left:0;background:red;height:3px;z-index:10;",	//此处表示静态样式
		"active":"width"				//此处表示加载时动态的样式，可以填width、height等
	});							//这个函数用于定义加载进度条的样式（可选）
	jwr.SetUrlList(ULJson);					//这里的ULJson需要在setup.js中定义
	jwr.ShowPage(jwr.GetFakeUrl(window.location.href));	//在页面加载完成后载入子页面
	jwr.init();						//完成初始化
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
		"subUrl":"error",                  			 //当页面的假URL路径错误，用error表示
		"realUrl":"./error.htm"
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
