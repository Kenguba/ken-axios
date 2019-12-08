import { AxiosRequestConfig } from './type'
import xhr from './xhr'

export default function axios(url: string, options: AxiosRequestConfig): void {
  xhr(url, options)
}
