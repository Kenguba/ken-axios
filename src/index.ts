import { AxiosRequestConfig } from './type'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): void {
  xhr(config)
}

