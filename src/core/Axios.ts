import {
  AxiosRequestConfig,
  AxiosPromise,
  AxiosResponse,
  Method,
  ResolvedFn,
  RejectedFn,
  Axios as interfactAxios
} from '../type'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './InterceptorManager'
import mergeConfig from './mergeConfig'
import { isDictionary } from '../helpers/utils'

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios implements interfactAxios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: InterceptorManager<AxiosRequestConfig>
    response: InterceptorManager<AxiosResponse>
  }

  constructor(url: string, initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(overUrl: any, overConfig?: any): AxiosPromise {
    if (typeof overUrl === 'string') {
    } else {
      const { url, ...config } = overUrl
      overUrl = url
      overConfig = config
      console.log({ overUrl, ...overConfig }, '{ overUrl, ...overConfig }')
    }

    // config = mergeConfig(this.defaults, config)
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve({ overUrl, ...overConfig })

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    // console.log(promise, "promise")
    // return dispatchRequest(overUrl, overConfig)
    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(url, { ...config, method: 'get' })
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(url, { ...config, method: 'delete' })
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(url, { ...config, method: 'head' })
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(url, { ...config, method: 'options' })
  }

  post(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(url, { body, ...config, method: 'post' })
  }

  put(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(url, { body, ...config, method: 'put' })
  }

  patch(url: string, body?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(url, { body, ...config, method: 'patch' })
  }
}

// _requestMethodWithData(
//   url: string,
//   method: Method,
//   body?: any,
//   config?: AxiosRequestConfig
// ): AxiosPromise {
//   return this.request(url, Object.assign(config || {}, { method, body })
//   )
// }
