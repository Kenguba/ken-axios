import { AxiosRequestConfig, AxiosPromise, AxiosPesponse } from './type'
import XHR from './xhr'
import { bulidURL } from './helpers/url'
import { transfromJSONstringify } from './helpers/data'
import { processHeaders } from './helpers/headers'
import { transform } from './transform'

export default function axios(url: string, config: AxiosRequestConfig): AxiosPromise {
  const fullURL = processConfig(url, config) //对url?后参数的处理拼接,和对传参除GET请求体的处理
  transformHeaders(fullURL, config) //对headers处理
  return new XHR(fullURL, config).init().then(res => {
    return transformResponseData(res) //对返回数据的处理
  })
  // .catch(err => err)
}

function processConfig(url: string, config: AxiosRequestConfig): string {
  let processConfigurl = transformURL(url, config)

  config.body = transfromJSONstringify(config) //对post传参的处理
  return processConfigurl
}

function transformURL(url: string, config: AxiosRequestConfig) {
  return bulidURL(url, config)
}

function transformHeaders(url: string, config: AxiosRequestConfig) {
  const { headers = {} } = config
  config.headers = processHeaders(headers, config)
}

function transformResponseData(res: AxiosPesponse) {
  res.data = transform(res.data)
  return res
}
