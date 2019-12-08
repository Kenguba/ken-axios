import { AxiosRequestConfig, AxiosPromise, AxiosPesponse } from './type'
import { parseHeaders } from './helpers/headers'

export default class XHR {
  url: string
  config: AxiosRequestConfig
  constructor(url: string, config: AxiosRequestConfig) {
    this.url = url
    this.config = config
  }

  init(): AxiosPromise {
    return new Promise((resolve, reject) => {
      const { method = 'get', body = null, params = {}, headers, responseType } = this.config
      const xhr = new XMLHttpRequest()
      let data = body
      let fullUrl = this.url
      // if (Object.keys(params).length > 0) {
      //   let data_arr = [];
      //   for (let key in params) {
      //     data_arr.push(key + '=' + params[key]);
      //   }
      //   fullUrl += '?' + data_arr.join('&');
      // }
      xhr.open(method.toUpperCase(), fullUrl!, true)
      debugger
      xhr.onreadystatechange = function handleLoad() {
        if (xhr.readyState !== 4) {
          return
        }

        if (xhr.status === 0) {
          return
        }

        const responseHeaders = parseHeaders(xhr.getAllResponseHeaders())
        const responseData =
          responseType && responseType !== 'text' ? xhr.response : xhr.responseText
        const response: AxiosPesponse = {
          data: responseData,
          status: xhr.status,
          statusText: xhr.statusText,
          headers: responseHeaders,
          config: this.config,
          request: xhr
        }
        handleResponse(response)
      }

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
        }
      }
    })
  }
}
