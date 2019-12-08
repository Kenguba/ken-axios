import { AxiosRequestConfig } from './type'

export default class XHR {
  url: string
  config: AxiosRequestConfig
  constructor(url: string, config: AxiosRequestConfig) {
    this.url = url
    this.config = config
  }

  init() {
    const { method = 'get', data, params = {} } = this.config
    const request = new XMLHttpRequest()

    // let fullUrl = this.url;
    // if (Object.keys(params).length > 0) {
    //   let data_arr = [];
    //   for (let key in params) {
    //     data_arr.push(key + '=' + params[key]);
    //   }
    //   fullUrl += '?' + data_arr.join('&');
    // }

    request.open(method.toUpperCase(), this.url, true)
    request.send(data)
  }
}
