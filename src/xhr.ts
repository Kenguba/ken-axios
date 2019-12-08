import { AxiosRequestConfig } from './type'


export default function xhr(config: AxiosRequestConfig): void {
  const { url, options: { method = 'get', data, params } } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}