import { AxiosRequestConfig } from './type'

export default function xhr(url: string, config: AxiosRequestConfig): void {
  const { method = 'get', data, params } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
