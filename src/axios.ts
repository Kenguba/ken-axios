import { AxiosRequestConfig, AxiosStatic } from './type'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
// import defaults from './defaults'
// import mergeConfig from './core/mergeConfig'

function createInstance(url: string, config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(url, config)
  const instance = Axios.prototype.request.bind(new Axios(url, config))
  extend(instance, context)
  return instance as AxiosStatic
}

// axios.create = function create(config) {
//   return createInstance(mergeConfig(defaults, config))
// }

export default createInstance()
