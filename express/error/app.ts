import axios, { AxiosError } from '../../src/index'

axios('/error/get1', {
  method: 'get',
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

axios('/error/get', {
  method: 'get',
}).then((res) => {
  console.log(res)
}).catch((e) => {
  console.log(e)
})

setTimeout(() => {
  axios('/error/get', {
    method: 'get',
  }).then((res) => {
    console.log(res)
  }).catch((e) => {
    console.log(e)
  })
}, 5000)

axios('/error/timeout', {
  method: 'get',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((e: AxiosError) => {
  debugger
  console.log("【/error/timeout】", e.message)
  console.log("【/error/timeout】", e.config)
  console.log("【/error/timeout】", e.code)
  console.log("【/error/timeout】", e.request)
  console.log("【/error/timeout】", e.isAxiosError)
})
