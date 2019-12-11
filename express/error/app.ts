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
  console.error("【/error/timeout】", e.message)
  console.error("【/error/timeout】", e.config)
  console.error("【/error/timeout】", e.code)
  console.error("【/error/timeout】", e.request)
  console.error("【/error/timeout】", e.isAxiosError)
})
