import axios from '../../src/index'

axios('/base/get', {
  method: 'get',
  params: {
    foo: ['bar', 'baz']
  }
})

axios('/base/get', {
  method: 'get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

axios('/base/get', {
  method: 'get',
  params: {
    date: new Date()
  }
})

axios('/base/get',{
  method: 'get',
  params: {
    foo: '@:$, '
  }
})

axios('/base/get',{
  method: 'get',
  params: {
    foo: 'bar',
    baz: null
  }
})

axios('/base/get',{
  method: 'get',
  params: {
    foo: 'bar'
  }
})

axios('/base/get',{
  method: 'get',
  params: {
    bar: 'baz'
  }
})

// axios('/base/get',{
//   method: 'post',
//   data: {
//     a: 1,
//     b: 2
//   }
// })

// axios('/base/get',{
//   method: 'post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })


//
// const arr = new Int32Array([21, 31])
//
// axios({
//   method: 'post',
//   url: '/base/buffer',
//   data: arr
// })
//
//
// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)
//
// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then((res) => {
//   console.log(res)
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then((res) => {
//   console.log(res)
// })
