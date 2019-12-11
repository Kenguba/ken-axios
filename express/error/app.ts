import axios, { AxiosError } from '../../src/axios'

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
  console.log(e.message)
  console.log(e.config)
  console.log(e.code)
  console.log(e.request)
  console.log(e.isAxiosError)
})
