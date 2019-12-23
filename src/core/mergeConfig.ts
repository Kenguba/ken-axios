import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const stratFn = bufferdict[key] || defaultStrat
    config[key] = stratFn(config1[key], config2![key])
  }

  return config
}

const bufferdict = Object.create(null)

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

const stratKeysFromVal2 = ['url', 'params', 'data']
stratKeysFromVal2.forEach(key => {
  bufferdict[key] = stratKeysFromVal2Fn
})
function stratKeysFromVal2Fn(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') return val2
}

const stratKeysDeepMerge = ['headers']
stratKeysDeepMerge.forEach(key => {
  bufferdict[key] = stratKeysDeepMergeFn
})

function stratKeysDeepMergeFn(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
