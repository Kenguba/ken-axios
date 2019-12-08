const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

//-----------------------------------------  创建express实例   -----------------------------------------
const app = express()
const url = require('url');
//-----------------------------------------------------------------------------------------------------
const compiler = webpack(WebpackConfig)
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
//--------------------------------       引进服务端路由     ------------------------------------------------
const router = express.Router()
registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRouter()
registerConfigRouter()
app.use(router)
//---------------------------------------------------------------------------------------------------------
const port = process.env.PORT || 8080
module.exports = app.listen(port, (err) => {
  console.log(`服务器监听请求URL on http://localhost:${port}, Ctrl+C to stop`)
  if (err) {
    console.log(err); throw err;
  }
})


//--------------------------------------------------------------------------------------------------
function registerSimpleRouter() {
  router.get('/page/get', function (req, res) {
    const pathname = url.parse(req.url, true).pathname;
    // res.writeHead(200, {'Content-Type': 'text/plain'}); //下载的
    // res.setHeader("Content-Type", "text/html");
    // res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    // res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Cache-Control", "no-store");//304
    // next();
    res.json({ code: 0, success: true, relust: [{ pathname: pathname }], msg: `你请求的参数成功` })
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`你的请求路径是${pathname}`);
    res.end();
  })

}

function registerBaseRouter() {
  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })

  router.post('/base/kim/buffer', function (req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (!chunk) return;
      msg.push(chunk)
    })
    req.on('end', () => {
      res.json(Buffer.concat(msg).toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
    res.end()
  })

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.post('/extend/post', function (req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function (req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function (req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}