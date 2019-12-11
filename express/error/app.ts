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
}).catch((err: AxiosError) => {
  console.error(err)
  console.error("【/error/timeout】", {
    message: err.message,
    config: err.config,
    code: err.code,
    request: err.request,
    isAxiosError: err.isAxiosError,
  })
})
