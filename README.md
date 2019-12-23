# ts-axios

使用 TypeScript 从零实现一个 axios

## Features

- 在浏览器端使用 XMLHttpRequest 对象通讯
- 支持 Promise API
- 支持请求和响应的拦截器
- 支持请求数据和响应数据的转换
- 支持请求的取消
- JSON 数据的自动转换
- 客户端防止 XSS

## Usage

```javascript
const axios = require('axios')

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Yee',
    lastName: 'Huang'
  }
})
```


# 第三章：JS中console的强大

<a name="16gNS"></a>
## 一、chrome的控制台
> 谷歌控制台Elements面板

- 打开方式: `ctrl+shit+i`   `f12`  
- 清除方式: `console.clear`  或者点击清除按钮
<a name="8bks2"></a>
#### ![屏幕快照 2019-12-18 下午3.38.57的副本.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576655158271-615ca319-325a-4b6f-bc80-d091811bdb6e.png#align=left&display=inline&height=457&name=%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-18%20%E4%B8%8B%E5%8D%883.38.57%E7%9A%84%E5%89%AF%E6%9C%AC.png&originHeight=457&originWidth=811&size=44280&status=done&style=none&width=811)


<a name="pzQAD"></a>
### 控制台的一些快捷键
| 快捷键 |  |
| --- | --- |
| 方向键盘的上下键 | 上键就相当于使用上次在控制台的输入符号 |
| $_ | 命令返回最近一次表达式执行的结果，功能跟按向上的方向键再回车是一样的 |
| $0~$4 | 最近5个你选择过的DOM节点 |

- `**$**`**           **// 简单理解就是 document.querySelector 而已
- `$$`        // 简单理解就是 document.querySelectorAll 而已
- `$_`        // 是上一个表达式的值
- `$0-$4`  // 是最近5个Elements面板选中的DOM元素，待会会讲
- `dir`      // 其实就是 console.dir
- `keys`    // 取对象的键名, 返回键名组成的数组
- `values` // 去对象的值, 返回值组成的数组
<a name="TpGzW"></a>
#### 
<a name="xouTW"></a>
#### chrome 控制台中原生支持类jQuery的选择器
`用$加上熟悉的css选择器来选择DOM节点`
<a name="3Qz4s"></a>
## ![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1577065561377-5326b781-936a-4b32-a88e-0d8250d3bf3e.png#align=left&display=inline&height=134&name=image.png&originHeight=134&originWidth=616&size=25438&status=done&style=none&width=616)
<a name="rBjzX"></a>
#### copy
`通过此命令可以将在控制台获取到的内容复制到剪贴板(如果在elements面板中选中某个节点，也可以直接按ctrl+c执行复制操作)`<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1577066988130-42b980a6-47e3-4c44-9a7c-4f186d6fe3bf.png#align=left&display=inline&height=356&name=image.png&originHeight=356&originWidth=566&size=139736&status=done&style=none&width=566)<br />
<a name="cOdg7"></a>
## 
<a name="N7gxq"></a>
#### console.table
`输出表格形式<br />`<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1577067246114-2f17984f-00d6-4efb-b12c-2fd93f6b3928.png#align=left&display=inline&height=258&name=image.png&originHeight=258&originWidth=788&size=42785&status=done&style=none&width=788)
<a name="9Uso9"></a>
#### <br />monitor & unmonitor

- `monitor(Fn)，它接收一个函数作为参数，每次Fn被执行了，都会在控制台输出一条信息，里面包含了函数的名称a及执行时所传入的参数`
- `unmonitor(Fn)便是用来停止这一监听`

`![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1577067424816-29146c83-1f8e-4710-bd02-800de7216f26.png#align=left&display=inline&height=192&name=image.png&originHeight=192&originWidth=544&size=80715&status=done&style=none&width=544)`

<a name="5PG5W"></a>
## 二、console的使用方法



| 调用console的函数 | 描述 |  |
| --- | --- | --- |
| [console.log](#4xABI) | 用于输出普通信息 |  |
| [console.info](https://www.cnblogs.com/liyunhua/p/4529079.html#_label6) | 用于输出提示性信息 |  |
| [console.error](https://www.cnblogs.com/liyunhua/p/4529079.html#_label7) | 用于输出错误信息 |  |
| console.warn | 用于输出警示信息 |  |
| [console.debug](https://www.cnblogs.com/liyunhua/p/4529079.html#_label9) | 用于输出调试信息 |  |
| [console.dirxml](#8eFyH) | 用来显示网页的某个节点（node）所包含的html/xml代码 |  |
| [console.group](#OeSQM)<br />[console.groupEnd](#OeSQM) | 输出一组信息的开头和输出结束一组输出信息 |  |
| [console.assert](#OeSQM) | 对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台 |  |
| console.dir | 将该DOM结点以DOM树的结构进行输出，可以详细查对象的方法发展等等 |  |
| [console.count](https://www.cnblogs.com/liyunhua/p/4529079.html#_label13) | 统计代码被执行的次数 |  |
| console.time<br />console.timeEnd | 计时开始和计时结束（看了下面的图你瞬间就感受到它的厉害了） |  |
| console.profile<br />console.profileEnd | 配合一起使用来查看CPU使用相关信息<br /> |  |
| [console.timeLine](https://www.cnblogs.com/liyunhua/p/4529079.html#_label17)<br />[console.timeLineEnd](https://www.cnblogs.com/liyunhua/p/4529079.html#_label17) | 配合一起记录一段时间轴 | [官方描述](https://developer.chrome.com/devtools/docs/console-api)<br /> |
| console.trace | 堆栈（stack）跟踪相关的调试 | [官方描述](https://developer.chrome.com/devtools/docs/console-api) |



> console  `log` `info` `error` `warn` `debug` 
> 都可以使用printf风格的占位符,不过，占位符的种类比较少，只支持

| 格式化符号 | 实现的功能 |
| :---: | :---: |
| %s | 格式化成字符串输出 |
| %d or %i | 格式化成数值输出 |
| %f | 格式化成浮点数输出 |
| %o | 转化成展开的DOM元素输出 |
| %O | 转化成JavaScript对象输出 |
| %c | 把字符串按照你提供的样式格式化后输入 |
| console.log("%d年%d月%d日",2011,3,26)           // 2011年3月26日<br />console.log("圆周率是%f",3.1415926)                 // 圆周率是3.1415926<br />console.log("%o", {name:"张三",age:18})           // {name: "张三", age: 18}<br />console.log("%o", {name:'旺财',color:'yellow'})  //{name:'旺财',color:'yellow'} |  |
| 
| 
|  |  |


<a name="Q9ZBU"></a>
### console.log
`用于输出普通信息` 

<a name="xbPsI"></a>
#### 1、重写console.log 改变输出文字的样式

```css
console.log("%c3D Text"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em")
console.log("%cColorful CSS","background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em")
console.log('%cRainbow Text ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;')
```
![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576658308418-1b1f760d-cd8e-4f81-83e8-13a319bfa3f6.png#align=left&display=inline&height=204&name=image.png&originHeight=204&originWidth=447&size=48007&status=done&style=none&width=447)

<a name="jDaCJ"></a>
#### 2、利用控制台输出图片

```css
console.log("%c\n     ","font-size:81px;background:url('http://www.baidu.com/img/bdlogo.gif') no-repeat 0 0");
console.log("%c\n     ","font-size:81px;background:url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576668147667&di=5d40dc9bd941e00cc7e696de06f6b657&imgtype=0&src=http%3A%2F%2Fcimg.163.com%2Fcatchpic%2F4%2F43%2F435EBD74A2EC39D401E0E16CAF448477.gif') no-repeat");
```
![132234240277278.gif](https://cdn.nlark.com/yuque/0/2019/gif/604921/1576658689727-87d2892d-3663-4182-9a01-f63f031236b5.gif#align=left&display=inline&height=267&name=132234240277278.gif&originHeight=288&originWidth=804&size=45298&status=done&style=none&width=746)
<a name="UlYox"></a>
#### 3、指定输出文字的样式

```css
console.log('%cHacPai%c\n  平等、自由、奔放\n  Give the codes a soul.\n\n  b3log.org\n  Copyright © 2012-present', "font-size:96px;color:#3b3e43", "font-size:12px;color:#4285f4")
```
![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576658984362-cc848923-2464-4f84-93cb-6f0ac8ce533f.png#align=left&display=inline&height=187&name=image.png&originHeight=187&originWidth=382&size=15949&status=done&style=none&width=382)

```css
if (window.console) {
  console.log("%c\n       ", "font-size:41px;background:url('http://cdn.iknow.bdimg.com/static/common/pkg/module_zed9cd9fd.png') no-repeat -135px -1px");
  console.log('想和我们共同打造世界最大中文互动问答平台吗？\n想让自己的成就在亿万用户面前展现吗？想让世界看得你的光芒吗？\n加入我们，在这里不仅是工作，投入你的时间和热情，滴滴汗水终会汇聚成不平凡的成果。\n期待你的加盟。（投简历地址被我砍了）');
  console.log("请在邮件中注明%c来自:console", "color:red;font-weight:bold;");
}
```
![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576659147089-f506d277-542f-4c87-bb79-be5be9c23f75.png#align=left&display=inline&height=160&name=image.png&originHeight=160&originWidth=498&size=34844&status=done&style=none&width=498)

---


<a name="qN7nf"></a>
#### console.dirxml
`用来显示网页的某个节点（node）所包含的html/xml代码` 

```javascript
<body>
    <table id="mytable">
        <tr>
            <td>A</td>
            <td>A</td>
            <td>A</td>
        </tr>
        <tr>
            <td>bbb</td>
            <td>aaa</td>
            <td>ccc</td>
        </tr>
        <tr>
            <td>111</td>
            <td>333</td>
            <td>222</td>
        </tr>
    </table>
</body>
<script type="text/javascript">
    window.onload = function () {
        var mytable = document.getElementById('mytable');
        console.dirxml(mytable);
    }
</script>
```
![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576660427039-cc2426b3-ef37-4fac-b3e2-a6e661caa37c.png#align=left&display=inline&height=272&name=image.png&originHeight=272&originWidth=332&size=17046&status=done&style=none&width=332)


<a name="h25i4"></a>
#### console.group和console.groupEnd
`输出一组信息的开头和输出结束一组输出信息<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576660488405-2f8063e5-27ca-4c61-b3c4-63425a0dfa1a.png#align=left&display=inline&height=162&name=image.png&originHeight=162&originWidth=516&size=41506&status=done&style=none&width=516)`

<a name="3lJbv"></a>
#### console.assert
`对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台`<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576660729426-32829f10-5af0-48a2-8b93-84d1d1e2218a.png#align=left&display=inline&height=43&name=image.png&originHeight=43&originWidth=317&size=11026&status=done&style=none&width=317)


<a name="OOT82"></a>
#### console.count
`当你想统计代码被执行的次数`<br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576661176467-6cd77247-308c-4216-b9cb-1cd76ee33383.png#align=left&display=inline&height=170&name=image.png&originHeight=170&originWidth=390&size=21708&status=done&style=none&width=390)


<a name="VPSuW"></a>
#### console.dir
`直接将该DOM结点以DOM树的结构进行输出，可以详细查对象的方法发展等等` <br />![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1576661120168-60ef5b77-cfea-45e0-877e-26bb802b9ec3.png#align=left&display=inline&height=316&name=image.png&originHeight=316&originWidth=499&size=66140&status=done&style=none&width=499)


<a name="suqsO"></a>
#### console.time和console.timeEnd
`计时开始和计时结束`

```javascript
console.time("time")
var arr =new Array(100000)
for(var i=1;i<arr.length-1;i++){
arr[i] = new Object()
}
console.timeEnd("time")
```

```javascript
function test(count,original=1){
var arr = new Array(count)
for(var i=original;i<arr.length-1;i++){
arr[i] = new Object()
}}
   
function reckonTime(fn){
  return function dealwithFn(...params){
	var start = new Date().getTime()
	fn(...params)
  return Date.now()-start
}
}

reckonTime(test)(100000000,10000000)  //3306
```

<a name="oVdtA"></a>
#### console.profile和console.profileEnd
`配合一起使用来查看CPU使用相关信息`

```javascript
function test(count,original=1){
var arr = new Array(count)
for(var i=original;i<arr.length-1;i++){
arr[i] = new Object()
}}
   
function reckonProfile(fn){
  return function dealwithFn(...params){
	console.profile('initialize')
	fn(...params)
  console.profileEnd('initialize')  
}
}

reckonProfile(test)(10000000,1000000)
```
![屏幕快照 2019-12-23 上午9.04.40的副本.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1577063141788-5006084c-7089-4712-8fc3-d96e5a561076.png#align=left&display=inline&height=275&name=%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-12-23%20%E4%B8%8A%E5%8D%889.04.40%E7%9A%84%E5%89%AF%E6%9C%AC.png&originHeight=275&originWidth=317&size=36190&status=done&style=none&width=317)![image.png](https://cdn.nlark.com/yuque/0/2019/png/604921/1577064226611-b5b3871a-6eeb-4343-b60f-c6c5b42c3d65.png#align=left&display=inline&height=334&name=image.png&originHeight=334&originWidth=769&size=62952&status=done&style=none&width=769)



