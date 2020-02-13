const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const router = express.Router()
const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

app.use(router)

registerMoreRouter()

function registerMoreRouter() {
  router.get('/server2/more/get', function (req, res) {
    res.set(cors)
    res.json(req.cookies)
  })
}

const port = 8888
module.exports = app.listen(port, () => { console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`) })
