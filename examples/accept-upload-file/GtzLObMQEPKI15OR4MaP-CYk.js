 const config = {
  base_api_url: 'http://api.apiopen.top/',
  appkey: ' '
}

export default config;


// behavior  行为   behavior.js中
// attached: function()
//datached:function(){} 页面注销时候
//todo slot 插槽 [见bookdetail.wxml  tag.html tag.js ]   配置插槽启用多slot支持 options: {multipleSlots: true}, multipleSlots: true
//todo kim-stamp 使用外来样式   externalClasses: ["tag-class"],          [在components/tag/tag.js]
Component({
  options: {
    multipleSlots: true,            // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'apply-shared',      //指定特殊的样式隔离选项 ----isolated|apply-shared|shared apply-shared 表示页面 wxss 样式将影响到自定义组件，但自定义组件 wxss 中指定的样式不会影响页面；solated 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）；shared 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件。（这个选项在插件中不可用。）
  },
  externalClasses:["tag-class"],
  properties: { /* ... */ },
  methods: { /* ... */ }
})

// background - color: #fffbdd !important;  //样式强制覆盖
// wx: for-item= "i" 自定义遍历每一项的名字
//想要使用&nbsp等html转义，要在标签类设置encode='true'  


//   scroll-view |Page onReachBottom
// text-indent:2em 首行缩进
// wx.showLoading()  加载小圆圈      wx.hideLoading() 隐藏
// multipleSlots: true
// wx.navigateTo  跳转

// index: {       监听事件改变
// type: String,
//  value:'100',
//     observer: function(newVal, oldVal, changePath) {}
// }

//todo 起别名 wx:for-item="i"
//<view wx:for="{{books}}" wx:key="{{item.artist_id}}" wx:for-item="i">
//<block>
//  <v-book books="{{i}}" />
//</block>
//</view>

 //todo startsWith 头的截取          endsWith 尾巴的截取



//todo 引用  WXML 提供两种文件引用方式import和include。
// import
// import可以在该文件中使用目标文件定义的template，如：
// 在 item.wxml 中定义了一个叫item的template：
// <!-- item.wxml -->
// <template name="item">
//   <text>{{text}}</text>
// </template>

// 在 index.wxml 中引用了 item.wxml，就可以使用item模板：
// <import src="item.wxml"/>
// <template is="item" data="{{text: 'forbar'}}"/>
// import 的作用域
// import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件 import 的 template。
// 如：C import B，B import A，在C中可以使用B定义的template，在B中可以使用A定义的template，但是C不能使用A定义的template。
//-------------------------
// include
// include 可以将目标文件除了 <template/> <wxs/> 外的整个代码引入，相当于是拷贝到 include 位置，如：
// <!-- index.wxml -->
// <include src="header.wxml"/>
// <view> body </view>
// <include src="footer.wxml"/>

// <!-- header.wxml -->
// <view> header </view>
// <!-- footer.wxml -->
// <view> footer </view>


//todo --------------------------- 页面配置  ----------------------------------
// navigationBarBackgroundColor	       HexColor	#000000	导航栏背景颜色，如 #000000	
// navigationBarTextStyle	             string	white	导航栏标题颜色，仅支持 black / white	
// navigationBarTitleText	             string		导航栏标题文字内容	
// navigationStyle	                   string	default	导航栏样式，仅支持以下值： default 默认样式 custom 自定义导航栏，只保留右上角胶囊按钮	微信客户端 7.0.0
// backgroundColor	                   HexColor	#ffffff	窗口的背景色	
// backgroundTextStyle	               string	dark	下拉 loading 的样式，仅支持 dark / light	
// backgroundColorTop	                 string	#ffffff	顶部窗口的背景色，仅 iOS 支持	微信客户端 6.5.16
// backgroundColorBottom	             string	#ffffff	底部窗口的背景色，仅 iOS 支持	微信客户端 6.5.16
// enablePullDownRefresh	             boolean	false	是否开启当前页面下拉刷新。 详见 Page.onPullDownRefresh	
// onReachBottomDistance	             number	50	页面上拉触底事件触发时距页面底部距离，单位为px。 详见 Page.onReachBottom	
// pageOrientation	                   string	portrait	屏幕旋转设置，支持 auto / portrait / landscape 详见 响应显示区域变化	2.4.0 (auto) / 2.5.0 (landscape)
// disableScroll	                     boolean	false	设置为 true 则页面整体不能上下滚动。 只在页面配置中有效，无法在 app.json 中设置	
// usingComponents	                   Object	否	页面自定义组件配置	1.6.3

  
//todo ---------------------------  路由跳转  ----------------------------------
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
// <!-- app.wxss -->
// Bug & Tip
// tip：navigator-hover 默认为 {background-color: rgba(0, 0, 0, 0.1); opacity: 0.7;}, navigator 的子节点背景色应为透明色
// 示例代码
// .navigator-hover {
//   color:blue;
// }
// .other-navigator-hover {
//   color:red;
// }
// <!-- xxxxxx.wxml -->
// <view class="btn-area">
//   <navigator url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover">跳转到新页面</navigator>
//   <navigator url="../../redirect/redirect/redirect?title=redirect" open-type="redirect" hover-class="other-navigator-hover">在当前页打开</navigator>
//   <navigator url="/page/index/index" open-type="switchTab" hover-class="other-navigator-hover">切换 Tab</navigator>
//   <navigator target="miniProgram" open-type="navigate" app-id="" path="" extra-data="" version="release">打开绑定的小程序</navigator>
// </view>
// navigator 基础库 1.0.0 开始支持，低版本需做兼容处理。
// 页面链接。
// 属性	                    类型	默认值	必填	说明	最低版本
// target	                 string	self	否	在哪个目标上发生跳转，默认当前小程序	2.0.7
// url	                   string		否	当前小程序内的跳转链接	1.0.0
// open-type	             string	navigate	否	跳转方式	1.0.0
// delta	                 number	1	否	当 open-type 为 'navigateBack' 时有效，表示回退的层数	1.0.0
// app-id	                 string		否	当target="miniProgram"时有效，要打开的小程序 appId	2.0.7
// path	                   string		否	当target="miniProgram"时有效，打开的页面路径，如果为空则打开首页	2.0.7
// extra-data	             object		否	当target="miniProgram"时有效，需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。详情	2.0.7
// version	               string	release	否	当target="miniProgram"时有效，要打开的小程序版本	2.0.7
// hover-class	           string	navigator-hover	否	指定点击时的样式类，当hover-class="none"时，没有点击态效果	1.0.0
// hover-stop-propagation	 boolean	false	否	指定是否阻止本节点的祖先节点出现点击态	1.5.0
// hover-start-time	       number	50	否	按住后多久出现点击态，单位毫秒	1.0.0
// hover-stay-time	       number	600	否	手指松开后点击态保留时间，单位毫秒	1.0.0
// bindsuccess	           string		 否	当target="miniProgram"时有效，跳转小程序成功	2.0.7
// bindfail	               string		 否	当target="miniProgram"时有效，跳转小程序失败	2.0.7
// bindcomplete	           string		否	当target="miniProgram"时有效，跳转小程序完成	2.0.7

// target 的合法值
// 值	                    说明	最低版本
// self	                  当前小程序	
// miniProgram	          其它小程序

// open-type的合法值
// 值	                   说明	最低版本
// navigate	             对应 wx.navigateTo 或 wx.navigateToMiniProgram 的功能	
// redirect	             对应 wx.redirectTo 的功能	
// switchTab	           对应 wx.switchTab 的功能	
// reLaunch	             对应 wx.reLaunch 的功能	1.1.0
// navigateBack	         对应 wx.navigateBack 的功能	1.1.0
// exit	                 退出小程序，target="miniProgram"时生效	2.1.0

// version 的合法值
// 值	                   说明	最低版本
// develop	             开发版	
// trial	               体验版	
// release	             正式版，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是正式版，则打开的小程序必定是正式版

//todo ---------------------------  swiper轮播  ----------------------------------
// 基础库 1.0.0 开始支持，低版本需做兼容处理。
// 滑块视图容器。其中只可放置swiper-item组件，否则会导致未定义的行为。

// 属性	                             类型	默认值	必填	说明	最低版本
// indicator-dots	                   boolean	false	否	是否显示面板指示点	1.0.0
// indicator-color	                 color	rgba(0, 0, 0, .3)	否	指示点颜色	1.1.0
// indicator-active-color	           color	#000000	否	当前选中的指示点颜色	1.1.0
// autoplay	                         boolean	false	否	是否自动切换	1.0.0
// current	                         number	0	否	当前所在滑块的 index	1.0.0
// interval	                         number	5000	否	自动切换时间间隔	1.0.0
// duration	                         number	500	否	滑动动画时长	1.0.0
// circular	                         boolean	false	否	是否采用衔接滑动	1.0.0
// vertical	                         boolean	false	否	滑动方向是否为纵向	1.0.0
// previous-margin	                 string	"0px"	否	前边距，可用于露出前一项的一小部分，接受 px 和 rpx 值	1.9.0
// next-margin	                     string	"0px"	否	后边距，可用于露出后一项的一小部分，接受 px 和 rpx 值	1.9.0
// display-multiple-items	           number	1	否	同时显示的滑块数量	1.9.0
// skip-hidden-item-layout	         boolean	false	否	是否跳过未显示的滑块布局，设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息	1.9.0
// easing-function	string	         "default"	否	指定 swiper 切换缓动动画类型	2.6.5
// bindchange	eventhandle		         否	current 改变时会触发 change 事件，event.detail = {current, source}	1.0.0
// bindtransition	eventhandle		     否	swiper-item 的位置发生改变时会触发 transition 事件，event.detail = {dx: dx, dy: dy}	2.4.3
// bindanimationfinish	             eventhandle		否	动画结束时会触发 animationfinish 事件，event.detail 同上	1.9.0
// easing-function 的合法值

// 值	                               说明	最低版本
// default	                         默认缓动函数	
// linear	                           线性动画	
// easeInCubic	                     缓入动画	
// easeOutCubic	                     缓出动画	
// easeInOutCubic	                   缓入缓出动画	
// change事件                        source 返回值