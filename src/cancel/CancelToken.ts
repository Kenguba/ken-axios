import { CancleToken, CancelExecutor } from '../types'

interface ResolvePromise {
  (reason: string): void
}

export default class CancelTonken {
  promise: Promise<string>
  reason?: string
  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    this.promise = new Promise<string>(resolve => {
      resolvePromise = resolve
    })
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = message
      resolvePromise(this.reason)
    })
  }
}
