const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mutipart = require('connect-multiparty')
const atob = require('atob')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const path = require('path')

require('./server2')

const app = express()
const complier = webpack(WebpackConfig)

app.use(webpackDevMiddleware(complier, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(webpackHotMiddleware(complier))
app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN', Math.random().toString(16).slice(2))
  }
}))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// 用于将文件上传到指定文件
app.use(mutipart({
  uploadDir: path.resolve(__dirname, 'accept-upload-file')
}))

const router = express.Router()

registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()
registerInterceptorRrouter()
registerConfigRouter()
registerCancelRouter()
registerMoreRouter()
registerUploadRouter()
app.use(router)

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function registerSimpleRouter() {
  router.get('/simple/get', function (req, res) {
    res.json({
      msg: 'hello world'
    })
  })
}

function registerBaseRouter() {

  router.get('/base/get', function (req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function (req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function (req, res) {
    let msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerErrorRouter() {
  router.get('/error/get', function (req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: 'hello world'
      })
    } else {
      res.status(500)
      res.end()
    }
  })
  router.get('/error/timeout', function (req, res) {
    setTimeout(() => {
      res.json({
        msg: 'hello world'
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

  router.head('/extend/head', function (req, res) {
    res.end()
  })

  router.delete('/extend/delete', function (req, res) {
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

  // 响应数据支持泛型接口
  router.get('/extend/user', function (req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'Alice',
        age: 18
      }
    })
  })
}

function registerInterceptorRrouter() {
  router.get('/interceptor/get', function (req, res) {
    res.end('hello ')
  })
}

function registerConfigRouter() {
  router.post('/config/post', function (req, res) {
    res.json(req.body)
  })
}

function registerCancelRouter() {
  router.get('/cancel/get', function (req, res) {
    setTimeout(() => {
      res.json('/cancel/get')
    }, 1000)
  })

  router.get('/cancel/get1', function (req, res) {
    setTimeout(() => {
      res.json('/cancel/get1')
    }, 1000)
  })

  router.post('/cancel/post', function (req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })
}

function registerMoreRouter() {
  router.get('/more/get', (req, res) => {
    res.json(req.cookies)
  })

  router.post('/more/post', function (req, res) {
    const auth = req.headers.authorization
    const [type, credentials] = auth.split(' ')
    console.log('atob on server:', atob(credentials))
    const [username, password] = atob(credentials).split(':').map(item => item.trim())
    if (type === 'Basic' && username === 'kim' && password === '123456') {
      res.json(req.body)
    } else {
      res.status(401)
      res.end('UnAuthorization')
    }
  })

  router.get('/more/304', function (req, res) {
    res.status(304)
    res.end()
  })

  router.get('/more/A', function (req, res) {
    res.end('A')
  })

  router.get('/more/B', function (req, res) {
    res.end('B')
  })
}

function registerUploadRouter() {
  router.post('/upload-download/upload', function (req, res) {
    console.log(req.body, req.files)
    res.end('upload success!')
  })
}