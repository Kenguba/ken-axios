export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return Object.prototype.toString.call(val) === '[object Dobjectate]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(<T & U>to)[key] = <any>from[key]
  }
  return to as T & U
}
