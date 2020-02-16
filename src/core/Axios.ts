import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest, { transformURL } from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors

  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    // 实现函数重载，兼容传与不传 config
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    config = mergeConfig(this.defaults, config)
    config.method = config.method.toLocaleLowerCase()

    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      // request 拦截器先添加的后执行
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      // response 拦截器先添加的先执行
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      // chain.shift() 可能是 undefined 这里需要断言
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    // return dispatchRequest(config)
    return promise
  }

  get(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhithoutData('get', url, config)
  }

  delete(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhithoutData('delete', url, config)
  }

  head(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhithoutData('head', url, config)
  }

  options(url: string, config: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhithData('patch', url, data, config)
  }

  getUri(config?: AxiosRequestConfig): string {
    config = mergeConfig(this.defaults, config)
    return transformURL(config)
  }

  _requestMethodWhithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWhithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
