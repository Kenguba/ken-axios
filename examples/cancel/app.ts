import axios, { Canceler } from '../../src/index'
import CancelToken from '../../src/cancel/CancelToken';

const CancleToken = axios.CancelToken
const source = CancleToken.source()

axios.get('/cancel/get1', {
  CancelToken: source.token
}).catch((e) => {
  if (axios.isCancel(e)) {
    console.log('/cancel/get1：', e.message);
  }
})

setTimeout(() => {
  source.cancel("取消操作")
  setTimeout(() => {
    axios.post('/cancel/post', { data: 1 }, {
      CancelToken: source.token
    }).catch((e) => {
      if (axios.isCancel(e)) {
        console.log('/cancel/post', e.message);
      }
    })
  }, 100);
}, 100);



let cancel: Canceler
axios.get('/cancel/get2', {
  CancelToken: new CancelToken(c => { cancel = c })
}).catch((e) => {
  if (axios.isCancel(e)) {
    console.log('/cancel/get2:', e.message);
  }
})

setTimeout(() => {
  cancel("取消操作")
}, 500);