import axios from '../../src/index'

// axios('/base/get', {
//   method: 'get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios('/base/get', {
//   method: 'get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// axios('/base/get', {
//   method: 'get',
//   params: {
//     date: new Date()
//   }
// })

// axios('/base/get', {
//   method: 'get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios('/base/get', {
//   method: 'get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios('/base/get', {
//   method: 'get',
//   params: {
//     foo: 'bar'
//   }
// })

// axios('/base/get', {
//   method: 'get',
//   params: {
//     bar: 'baz'
//   }
// })

// axios('/base/get', {
//   method: 'post',
//   body: {
//     a: 1,
//     b: 2
//   }
// })




axios('/base/get', {
  method: 'post',
  headers: {
    'content-type': 'application/json;charset=utf-8'
  },
  data: {
    a: 1,
    b: 2
  }
})


axios('/base/kim/buffer', {
  method: 'post',
  body: new Int32Array([21, 31])
})
//


// axios('/base/post', {
//   method: 'post',
//   body: new URLSearchParams('q=URLUtils.searchParams&topic=api')
// })

axios('/base/post', {
  method: 'post',
  body: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

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
