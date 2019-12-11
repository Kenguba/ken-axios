import { AxiosRequestConfig, AxiosResponse } from '../type'

export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype) //【一些继承了Error类不这样做的或创造的实例调不了实例方法】将一个指定的对象的原型设置为另一个对象或者null(既对象的[[Prototype]]内部属性).
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  throw new AxiosError(message, config, code, request, response)
}
