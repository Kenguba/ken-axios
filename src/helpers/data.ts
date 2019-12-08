import { isPlainObject } from './utils'

export function transfromJSONstringify({ body }: any) {
  if (isPlainObject(body)) {
    return JSON.stringify(body)
  }
  return body
}
