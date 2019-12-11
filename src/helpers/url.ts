import { isDate, isPlainObject } from './utils'

function encodeToURL(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function bulidURL(url: string, config?: any) {
  const { params } = config
  if (!params) {
    return url
  }

  const listParts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    if (val === null || typeof val === 'undefined') return

    let transformToList: string[]
    //TODO kim-stamp foo: ['bar', 'baz']  ==>  ?foo[]=bar&foo[]=baz  对于这种数据需要额为处理，就把所有的都提升转换成 【key:[]】 这样的格式进行处理
    if (Array.isArray(val)) {
      transformToList = val
      key += '[]'
    } else {
      transformToList = [val]
    }

    transformToList.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      listParts.push(`${encodeToURL(key)}=${encodeToURL(val)}`)
      console.log(listParts)
    })
  })

  let serializedParams = listParts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
