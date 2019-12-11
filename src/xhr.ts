import { AxiosRequestConfig, AxiosPromise, AxiosPesponse } from './type'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default class XHR {
  url: string
  config: AxiosRequestConfig
  constructor(url: string, config: AxiosRequestConfig) {
    this.url = url
    this.config = config
  }

  init(): AxiosPromise {
    return new Promise((resolve, reject) => {
      const config = this.config
      const {
        method = 'get',
        body: data = null,
        params = {},
        headers,
        responseType,
        timeout
      } = config

      //创造XMLHttpRequest实例,超时、响应类型,发送处理后的URL、请求方法
      const xhr = new XMLHttpRequest()
      // if (Object.keys(params).length > 0) {
      //   let data_arr = [];
      //   for (let key in params) {
      //     data_arr.push(key + '=' + params[key]);
      //   }
      //   this.url += '?' + data_arr.join('&');
      // }
      if (timeout) {
        xhr.timeout = timeout
      }
      if (responseType) {
        xhr.responseType = responseType
      }
      xhr.open(method.toUpperCase(), this.url!, true) //this.url后面的!是(非空断言操作符)

      //调用实例对象的读取状态改变方法
      xhr.onreadystatechange = function handleLoad() {
        if (xhr.readyState !== 4 || xhr.status === 0) return
        const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? xhr.response : xhr.responseText
        const response: AxiosPesponse = {
          data: responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: responseHeaders,
          config,
          request: xhr
        }
        handleResponse(response)
      }

      xhr.onerror = function handleError() {
        reject(createError('Network Error', config, null, xhr))
      }

      xhr.ontimeout = function handleTimeout() {
        reject(createError(`超时:已超过 ${timeout}ms`, config, 'aborted', xhr))
      }

      //请求头处理
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLocaleLowerCase() === 'content-type') {
          delete headers[name]
          return
        }
        xhr.setRequestHeader(name, headers[name])
      })

      xhr.send(data)

      function handleResponse(response: AxiosPesponse): void {
        if (response.status >= 200 && response.status < 300) {
          resolve(response)
        } else {
          reject(
            createError(`请求失败，状态代码为 ${response.status}`, config, null, xhr, response)
          )
        }
      }
    })
  }
}
