import { buildURL, isAbsoluteURL, combineURL, isURLSameOrigin } from '../../src/helpers/url'

describe('helpers:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })

    test('should support params', () => {
      expect(buildURL('/foo', { foo: 'bar' })).toBe('/foo?foo=bar')
    })

    test('should ignore if some param value is null', () => {
      expect(buildURL('/foo', { foo: 'bar', baz: null })).toBe('/foo?foo=bar')
    })

    test('should ignore if the only param is null', () => {
      expect(buildURL('/foo', { foo: null })).toBe('/foo')
    })

    test('should support object params', () => {
      expect(buildURL('/foo', { foo: { bar: 'baz' } })).toBe(
        '/foo?foo=' + encodeURI('{"bar":"baz"}')
      )
    })

    test('should support Date params', () => {
      const date = new Date()
      expect(buildURL('/foo', { date })).toBe('/foo?date=' + date.toISOString())
    })

    test('should support array params', () => {
      expect(buildURL('/foo', { foo: ['bar', 'baz'] })).toBe('/foo?foo[]=bar&foo[]=baz')
    })

    test('should support special params', () => {
      expect(buildURL('/foo', { foo: '@:$, ' })).toBe('/foo?foo=@:$,+')
    })

    test('should support existing params', () => {
      expect(buildURL('/foo?foo=bar', { bar: 'baz' })).toBe('/foo?foo=bar&bar=baz')
    })

    // params 中的参数覆盖 url 中已存在的参数 ** 此条废弃 **
    // test('should replace existing params', () => {
    //   expect(
    //     buildURL('/foo?foo=bar', { foo: 'baz' })
    //   ).toBe('/foo?foo=baz')
    // })

    // 舍弃 url 哈希值
    test('should correct discard url hash mark', () => {
      expect(buildURL('/foo?foo=bar#hash', { bar: 'baz' })).toBe('/foo?foo=bar&bar=baz')
    })

    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })

    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })

  describe('isAbsoluteURL', () => {
    test('should return true if URL begins with valid scheme name', () => {
      expect(isAbsoluteURL('https://www.baidu.com/q')).toBeTruthy()
      expect(isAbsoluteURL('custom-scheme-v1.0://baidu.com')).toBeTruthy()
      expect(isAbsoluteURL('HTTP://baidu.com')).toBeTruthy()
    })

    test('should return false if URL begins with invalid scheme name', () => {
      expect(isAbsoluteURL('123://baidu.com')).toBeFalsy()
      expect(isAbsoluteURL('!valid://baidu.com')).toBeFalsy()
    })

    test('should return true if URL is protocal-relative', () => {
      expect(isAbsoluteURL('//exmaple.com/')).toBeTruthy()
    })

    test('should return false is URL is relative', () => {
      expect(isAbsoluteURL('/foo')).toBeFalsy()
      expect(isAbsoluteURL('foo')).toBeFalsy()
    })
  })

  describe('combineURL', () => {
    test('should combine URL', () => {
      expect(combineURL('https://api.baidu.com', '/user')).toBe('https://api.baidu.com/user')
    })

    test('should remove duplicate slashes', () => {
      expect(combineURL('https://api.baidu.com/', '/user')).toBe('https://api.baidu.com/user')
    })

    test('should insert missing slash', () => {
      expect(combineURL('https://api.baidu.com', 'user')).toBe('https://api.baidu.com/user')
    })

    test('should not insert slash when relative url missing/empty', () => {
      expect(combineURL('https://api.baidu.com/user', '')).toBe('https://api.baidu.com/user')
    })

    test('should allow a single slash for relative url', () => {
      expect(combineURL('https://api.baidu.com/user', '/')).toBe('https://api.baidu.com/user/')
    })
  })

  describe('isURLSameOrigin', () => {
    // 函数体内部会自动获取 window.location.href 与传入值进行比较
    test('should detect same origin', () => {
      expect(isURLSameOrigin(window.location.href)).toBeTruthy()
    })

    test('should detect different origin', () => {
      expect(isURLSameOrigin('https://api.baidu.com/axios/axios')).toBeFalsy()
    })
  })
})
