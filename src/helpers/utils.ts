export function isDate(val: any): val is Date {
  return Object.prototype.toString.call(val) === '[object Date]'
}

export function isDictionary(val: any): boolean {
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

//数组形式的深拷贝
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}
