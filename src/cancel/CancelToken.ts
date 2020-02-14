import { CancelExecutor, CancelTokenSource, Canceler } from "../types";
import Cancel from './Cancel'


interface ResolvePromise {
  (reason?: Cancel): void
}

/**
 * 外部实例化 CancelToken 得到 cancelToken
 * 此时 cancelToken.promise 处于 pending 状态
 * 一旦调用 cancelToken.promise.then 
 */
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested() {
    if (this.reason) { throw this.reason }
  }

  //实例话对象new CancelToken，给传入一个函数，这个函数其实就是实例化对象参数executor的，再让回调，给cancel赋值一个函数
  // message => {
  //   if (this.reason) return
  //   this.reason = new Cancel(message)
  //   resolvePromise(this.reason)
  // })
  // 只要调用了这个函数，就可以把把 cancelToken.promise.then  进行下去，否则就是在等待。
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => { cancel = c })
    return { cancel, token }
  }
  
}


