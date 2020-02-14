import axios, { Canceler } from '../../src'
import { setTimeout } from 'timers';

const CancelToken = axios.CancelToken
const source = axios.CancelToken.source()
const source2 = axios.CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log('/cancel/get:', e.message)
  }
})
setTimeout(() => {
  // source.cancel('用户手动取消')
}, 100)



axios.post('/cancel/post', {
  a: 1
}, {
  cancelToken: source2.token
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log("/cancel/post",e.message)
  }
})
setTimeout(() => {
  source2.cancel("用户手动取消")
}, 200);





let cancel: Canceler
axios.get('/cancel/get1', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(e => {
  if (axios.isCancel(e)) {
    console.log("/cancel/get1:",e.message)
  }
})

setTimeout(() => {
  cancel("用户手动取消")
}, 500);