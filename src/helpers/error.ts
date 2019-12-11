import { AxiosRequestConfig, AxiosResponse, CreateError } from '../type'

export function createError(createError: CreateError) {
  // return new AxiosError(createError)
  // throw new AxiosError(createError)
  console.error(new AxiosError(createError))
}

export class AxiosError extends Error {
  isAxiosError: boolean
  originalConfig: AxiosRequestConfig
  code?: string | null
  xhr?: any
  response?: AxiosResponse

  constructor(createError: CreateError) {
    const { status, message, originalConfig, code, xhr, response } = createError
    super(message)
    this.originalConfig = originalConfig
    this.code = code
    this.xhr = xhr
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype) //【一些继承了Error类不这样做的或创造的实例调不了实例方法】将一个指定的对象的原型设置为另一个对象或者null(既对象的[[Prototype]]内部属性).
  }
}
