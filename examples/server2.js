const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const cookieParser = require('cookie-parser')
const WebpackConfig = require('./webpack.config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
const router = express.Router()
const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8080',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

registerMoreRouter()
app.use(router)
const port = 8888
module.exports = app.listen(port, () => { console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`) })
function registerMoreRouter() {
  router.post('/server2/more/post', function (req, res) {
    res.set(cors)
    res.json(req.cookies)
  })

  router.options('/server2/more/post', function (req, res) {
    res.set(cors)
    res.end()
  })
}