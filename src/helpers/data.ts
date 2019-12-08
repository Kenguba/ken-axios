import { isPlainObject } from './utils'

export function transfromJSONstringify({ body }: any) {
  if (isPlainObject(body)) {
    return JSON.stringify(body)
  }
  return body
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
