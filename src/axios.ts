import { AxiosRequestConfig, AxiosPromise, AxiosPesponse } from './type'
import XHR from './xhr'
import { bulidURL } from './helpers/url'
import { transfromJSONstringify } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { transform } from './transform'

export default function axios(url: string, options: AxiosRequestConfig): AxiosPromise {
  const fullURL = processConfig(url, options) //对url?后参数的处理拼接
  transformHeaders(url, options) //对headers处理
  return new XHR(fullURL, options).init().then(res => {
    transformResponseData(res) //对返回数据的处理
    return res
  })
}

function processConfig(url: string, options: AxiosRequestConfig): string {
  let processConfigurl = transformURL(url, options)

  options.body = transfromJSONstringify(options) //对post传参的处理
  return processConfigurl
}

function transformURL(url: string, options: AxiosRequestConfig) {
  return bulidURL(url, options)
}

function transformHeaders(url: string, options: AxiosRequestConfig) {
  const { headers = {} } = options
  options.headers = processHeaders(headers, options)
}

function transformResponseData(res: AxiosPesponse) {
  res.data = transform(res.data)
  return res
}
