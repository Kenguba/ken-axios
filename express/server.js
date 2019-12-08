const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const url = require('url');


const compiler = webpack(WebpackConfig)

const app = express()
const router = express.Router()
app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


router.get('/simple/get', function (req, res) {
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

app.use(router)
const port = process.env.PORT || 8080
module.exports = app.listen(port, (err) => {
  console.log(`服务器监听请求URL on http://localhost:${port}, Ctrl+C to stop`)
  if (err) {
    console.log(err); throw err;
  }
})