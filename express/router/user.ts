const express = require('express')
const Router = express.Router()
const url = require('url');


function user() {
  Router.get('/page/get', function (req, res) {
    const pathname = url.parse(req.url, true).pathname;
    console.log(req, req)
    // res.writeHead(200, {'Content-Type': 'text/plain'}); //下载的
    // res.setHeader("Content-Type", "text/html");
    // res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Cache-Control", "no-store");//304
    // next();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`你的请求路径是${pathname}`);
    res.end();
    res.json({ code: 0, success: true, relust: [{ pathname: pathname }], msg: `你请求的参数成功` })
  })
}




export default Router
