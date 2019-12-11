import { AxiosRequestConfig, AxiosStatic } from './type'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
// import defaults from './defaults'
// import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance()

// axios.create = function create(config) {
//   return createInstance(mergeConfig(defaults, config))
// }

export default axios
