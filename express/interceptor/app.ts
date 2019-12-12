import axios from '../../src/index'

// axios.interceptors.request.use(config => {
//   config.headers.test += '1'
//   debugger
//   return config
// })
// axios.interceptors.request.use(config => {
//   config.headers.test += '2'
//   return config
// })
// axios.interceptors.request.use(config => {
//   config.headers.test += '3'
//   return config
// })

// axios.interceptors.response.use(res => {
//   res.data += '1'
//   return res
// })

// axios.interceptors.response.use(res => {
//   res.data += '2'
//   return res
// })
// axios.interceptors.response.use(res => {
//   res.data += '3'
//   return res
// })

// axios.interceptors.response.eject(interceptor)

axios.request('/interceptor/post', {
  method: 'post',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
