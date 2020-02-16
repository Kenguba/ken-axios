const puppeteer = require('puppeteer'); // 载入puppeteer
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const UserAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36";

// 打开浏览器，launch方法返回一个Promise对象
puppeteer.launch({
  headless: false,
  executablePath: '/Applications/Google Chrome 2.app/Contents/MacOS/Google Chrome',
  // args: [
  //   '--disable-web-security', // 允许跨域
  //   '--proxy-server=127.0.0.1:1080', // 代理
  //   '--auto-open-devtools-for-tabs',// 自动打开调试工具
  // ]
}).then(async browser => {
  await page.emulate(iPhone); // 让页面模拟成iphone6
  await page.setViewport({ width: 375, height: 600, isMobile: true, hasTouch: true })
  const page = await browser.newPage();       // 新建标签页，打开一个页面

  await page.goto('https://www.baidu.com');   // 打开百度
  await page.type('#index-kw', 'puppeteer') // 键盘输入关键字
  await page.screenshot({ path: '/Users/kim/Music/1.png' })
  await page.waitFor(1000);  // 暂停一会
  await page.click('#index-bn') // 模拟用户点击搜索提交表单
  await Promise.all([
    page.setUserAgent(UserAgent),
    page.setJavaScriptEnabled(true),  // 允许运行js
    // page.setViewport({width: 1100, height: 1080}),  // 设置页面视口的大小

  ]);
  console.log(await browser.userAgent()); //获取浏览器默认的user-agent
  let content = await page.$eval('body', el => el.innerText);
  console.log(content);

  await page.waitFor(2000);  // 暂停一会
  // await context.close();  //关闭无痕模式
  await page.goto('https://www.bilibili.com/');
  let list = await page.evaluate(() => {  // 爬取内容
    const title = document.querySelectorAll('.ri-title')
    const elements = Array.from(title);
    let titles = elements.map(element => {
      return element.innerHTML
    })
    return titles
  });
  await page.waitFor(1000) // 等待时长
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  console.log(list)
  await page.waitFor(200000000);  // 暂停一会
  await browser.close(); // 关闭浏览器
});
