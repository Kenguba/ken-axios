(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.axios = factory());
}(this, (function () { 'use strict';

  var toString = Object.prototype.toString;
  function isDate(val) {
      return Object.prototype.toString.call(val) === '[object Date]';
  }
  function isPlainObject(val) {
      return toString.call(val) === '[object Object]';
  }
  function isFormData(val) {
      return typeof val !== 'undefined' && val instanceof FormData;
  }
  function extend(to, from) {
      for (var key in from) {
          to[key] = from[key];
      }
      return to;
  }
  function deepMerge() {
      var objs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          objs[_i] = arguments[_i];
      }
      var result = Object.create(null);
      objs.forEach(function (obj) {
          if (obj) {
              Object.keys(obj).forEach(function (key) {
                  var val = obj[key];
                  if (isPlainObject(val)) {
                      if (isPlainObject(result[key])) {
                          result[key] = deepMerge(result[key], val);
                      }
                      else {
                          result[key] = deepMerge(val);
                      }
                  }
                  else {
                      result[key] = val;
                  }
              });
          }
      });
      return result;
  }
  function isURLSearchParams(val) {
      return typeof val !== 'undefined' && val instanceof URLSearchParams;
  }

  function normalizeHeaderName(headers, normalizeName) {
      if (!headers)
          return;
      Object.keys(headers).forEach(function (name) {
          if (name !== normalizeName && name.toLocaleUpperCase() === normalizeName.toLocaleUpperCase()) {
              headers[normalizeName] = headers[name];
              delete headers[name];
          }
      });
  }
  function processHeaders(headers, data) {
      normalizeHeaderName(headers, 'Content-Type');
      if (isPlainObject(data)) {
          if (headers && !headers['Content-Type']) {
              headers['Content-Type'] = 'application/json;charset=utf-8';
          }
      }
      return headers;
  }
  function parseHeaders(headers) {
      var parsed = Object.create(null);
      if (!headers) {
          return parsed;
      }
      headers.split('\r\n').forEach(function (line) {
          // 字符串可能存在多个 ":" 的情况
          var _a = line.split(':'), key = _a[0], vals = _a.slice(1);
          key = key.trim().toLocaleLowerCase();
          if (!key)
              return;
          var val = vals.join(':').trim();
          parsed[key] = val;
      });
      return parsed;
  }
  function flattenHeaders(headers, method) {
      if (!headers)
          return headers;
      headers = deepMerge(headers.common, headers[method], headers);
      var methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];
      methodsToDelete.forEach(function (method) {
          delete headers[method];
      });
      return headers;
  }

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
  this file except in compliance with the License. You may obtain a copy of the
  License at http://www.apache.org/licenses/LICENSE-2.0

  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
  MERCHANTABLITY OR NON-INFRINGEMENT.

  See the Apache Version 2.0 License for specific language governing permissions
  and limitations under the License.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var AxiosError = /** @class */ (function (_super) {
      __extends(AxiosError, _super);
      function AxiosError(message, config, code, request, response) {
          var _this = _super.call(this, message) || this;
          _this.config = config;
          _this.code = code;
          _this.request = request;
          _this.response = response;
          _this.isAxiosError = true;
          Object.setPrototypeOf(_this, AxiosError.prototype);
          return _this;
      }
      return AxiosError;
  }(Error));
  function createError(message, config, code, request, response) {
      var error = new AxiosError(message, config, code, request, response);
      return error;
  }

  function encode(val) {
      return encodeURIComponent(val)
          .replace(/%40/g, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+') // 约定将 空格 号转为 +
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']');
  }
  function buildURL(url, params, paramsSerializer) {
      if (!params) {
          return url;
      }
      var serializedParams;
      if (paramsSerializer) {
          serializedParams = paramsSerializer(params);
      }
      else if (isURLSearchParams(params)) {
          serializedParams = params.toString();
      }
      else {
          var parts_1 = [];
          Object.keys(params).forEach(function (key) {
              var val = params[key];
              if (val === null || typeof val === 'undefined') {
                  return;
              }
              var values = [];
              if (Array.isArray(val)) {
                  values = val;
                  key += '[]';
              }
              else {
                  values = [val];
              }
              values.forEach(function (val) {
                  if (isDate(val)) {
                      val = val.toISOString();
                  }
                  else if (isPlainObject(val)) {
                      val = JSON.stringify(val);
                  }
                  parts_1.push(encode(key) + "=" + encode(val));
              });
          });
          serializedParams = parts_1.join('&');
      }
      if (serializedParams) {
          var markIndex = url.indexOf('#');
          if (markIndex !== -1) {
              url = url.slice(0, markIndex);
          }
          url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
      }
      return url;
  }
  function isAbsoluteURL(url) {
      return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  }
  function combineURL(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
  }
  function isURLSameOrigin(requestURL) {
      var parsedOrigin = resolveURL(requestURL);
      return (parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host);
  }
  var urlParsingNode = document.createElement('a');
  var currentOrigin = resolveURL(window.location.href);
  function resolveURL(url) {
      // 通过创建一个 <a> 标签并设置 href 属性可以快捷的拿到 protocol 和 host
      urlParsingNode.setAttribute('href', url);
      var protocol = urlParsingNode.protocol, host = urlParsingNode.host;
      return {
          protocol: protocol,
          host: host
      };
  }

  // export const getCookie = (name: any): any => {
  //   //var res = document.cookie.match(/\bcsrf_token=([^;]*)\b/)
  //   var res = document.cookie.match('\\b' + name + '=([^;]*)\\b');
  //   return res ? res[1] : undefined;
  // }
  var cookie = {
      read: function (name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
      }
  };

  function xhr(config) {
      return new Promise(function (resolve, reject) {
          var _a = config.data, data = _a === void 0 ? null : _a, url = config.url, method = config.method, _b = config.headers, headers = _b === void 0 ? {} : _b, responseType = config.responseType, timeout = config.timeout, cancelToken = config.cancelToken, withCredentials = config.withCredentials, xsrfCookieName = config.xsrfCookieName, xsrfHeaderName = config.xsrfHeaderName, onDownloadProgress = config.onDownloadProgress, onUploadProgress = config.onUploadProgress, auth = config.auth, validateStatus = config.validateStatus;
          var request = new XMLHttpRequest();
          // 第三个参数为 async 是否是异步请求
          // 这里可以保证运行时 url 是有值的
          request.open(method.toUpperCase(), url, true);
          configureRequest();
          addEvents();
          processHeaders$$1();
          processCancel();
          request.send(data);
          function configureRequest() {
              if (responseType) {
                  request.responseType = responseType;
              }
              if (timeout) {
                  request.timeout = timeout;
              }
              if (withCredentials) {
                  request.withCredentials = withCredentials;
              }
          }
          function addEvents() {
              request.onreadystatechange = function () {
                  if (request.readyState !== 4) {
                      return;
                  }
                  if (request.status === 0) {
                      return;
                  }
                  var responseHeaders = parseHeaders(request.getAllResponseHeaders());
                  // 根据传入的 responseType 来决定返回的数据
                  var responseData = responseType && responseType !== 'text' ? request.response : request.responseText;
                  var response = {
                      data: responseData,
                      status: request.status,
                      statusText: request.statusText,
                      headers: responseHeaders,
                      config: config,
                      request: request
                  };
                  handleResponse(response);
              };
              request.onerror = function () {
                  reject(createError("Network Error", config, null, request));
              };
              request.ontimeout = function () {
                  reject(createError("Timeout of " + timeout + " ms exceeded", config, 'ECONNABORTED', request));
              };
              if (onDownloadProgress) {
                  request.onprogress = onDownloadProgress;
              }
              if (onUploadProgress) {
                  request.upload.onprogress = onUploadProgress;
              }
          }
          function processHeaders$$1() {
              /**
               * 如果请求是个 FormData 类型，则删除 headers['Content-Type']
               * 让浏览器自动为请求带上合适的 Content-Type
               */
              if (isFormData(data)) {
                  delete headers['Content-Type'];
              }
              /**
               * 跨站请求伪造 xsrf 防御
               * 当请求开启了 withCredentials 或者是同源请求时
               * 如果存在 xsrfCookieName 则为请求 headers 带上它的值
               */
              if ((withCredentials || isURLSameOrigin(url)) && xsrfCookieName) {
                  var xsrfValue = cookie.read(xsrfCookieName);
                  if (xsrfValue && xsrfHeaderName) {
                      headers[xsrfHeaderName] = xsrfValue;
                  }
              }
              /**
               * kim-stamp
               * btoa() 方法用于创建一个 base-64 编码的字符串。
               * 该方法使用 "A-Z", "a-z", "0-9", "+", "/" 和 "=" 字符来编码字符串。
               */
              if (auth) {
                  headers['Authorization'] = "Basic " + btoa(auth.username + " : " + auth.password);
              }
              Object.keys(headers).forEach(function (name) {
                  // 如果 data 为 null headers 的 content-type 属性没有意义
                  if (data === null && name.toLowerCase() === 'content-type') {
                      delete headers[name];
                  }
                  else {
                      request.setRequestHeader(name, headers[name]);
                  }
              });
          }
          function processCancel() {
              if (cancelToken) {
                  cancelToken.promise
                      .then(function (reason) {
                      request.abort();
                      reject(reason);
                  })
                      .catch(
                  /* istanbul ignore next */
                  function () {
                      // do nothing
                  });
              }
          }
          function handleResponse(response) {
              var status = response.status;
              if (!validateStatus || validateStatus(status)) {
                  resolve(response);
              }
              else {
                  reject(createError("Request failed with status code " + status, config, null, request, response));
              }
          }
      });
  }

  function transform(data, headers, fns) {
      if (!fns)
          return data;
      if (!Array.isArray(fns)) {
          fns = [fns];
      }
      fns.forEach(function (fn) {
          data = fn(data, headers);
      });
      return data;
  }

  function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      precessConfig(config);
      return xhr(config).then(function (res) {
          return transformResponseData(res);
      }, function (e) {
          if (e && e.response) {
              e.response = transformResponseData(e.response);
          }
          return Promise.reject(e);
      });
  }
  function precessConfig(config) {
      config.url = transformURL(config);
      config.data = transform(config.data, config.headers, config.transformRequest);
      // 这里 config.method 类型断言，可以保证运行时有值
      config.headers = flattenHeaders(config.headers, config.method);
  }
  function transformURL(config) {
      var params = config.params, paramsSerializer = config.paramsSerializer, baseURL = config.baseURL;
      var url = config.url;
      if (baseURL && !isAbsoluteURL(url)) {
          url = combineURL(baseURL, url);
      }
      // 这里可以保证运行时 url 是有值的
      return buildURL(url, params, paramsSerializer);
  }
  function transformResponseData(res) {
      res.data = transform(res.data, res.headers, res.config.transformResponse);
      return res;
  }
  // 请求判断此请求是否已经被取消了，如果被取消了，再发送此请求是没有意义的
  function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
          config.cancelToken.throwIfRequested();
      }
  }

  var InterceptorManager = /** @class */ (function () {
      function InterceptorManager() {
          this.interceptors = [];
      }
      InterceptorManager.prototype.use = function (resolved, rejected) {
          this.interceptors.push({
              resolved: resolved,
              rejected: rejected
          });
          return this.interceptors.length - 1;
      };
      InterceptorManager.prototype.forEach = function (fn) {
          this.interceptors.forEach(function (interceptor) {
              if (interceptor !== null) {
                  fn(interceptor);
              }
          });
      };
      InterceptorManager.prototype.eject = function (id) {
          if (this.interceptors[id]) {
              this.interceptors[id] = null;
          }
      };
      return InterceptorManager;
  }());

  function mergeConfig(config1, config2) {
      if (!config2) {
          config2 = {};
      }
      var config = Object.create(null);
      for (var key in config2) {
          mergeField(key);
      }
      for (var key in config1) {
          if (!config2[key]) {
              mergeField(key);
          }
      }
      function mergeField(key) {
          var stratFn = bufferdict[key] || defaultStrat;
          config[key] = stratFn(config1[key], config2[key]);
      }
      return config;
  }
  function defaultStrat(val1, val2) {
      return typeof val2 !== 'undefined' ? val2 : val1;
  }
  var bufferdict = Object.create(null);
  var stratKeysFromVal2 = ['url', 'params', 'data'];
  stratKeysFromVal2.forEach(function (key) {
      bufferdict[key] = function stratKeysFromVal2Fn(val1, val2) {
          if (typeof val2 !== 'undefined')
              return val2;
      };
  });
  var stratKeysDeepMerge = ['headers', 'auth'];
  stratKeysDeepMerge.forEach(function (key) {
      bufferdict[key] = function stratKeysDeepMergeFn(val1, val2) {
          if (isPlainObject(val2)) {
              return deepMerge(val1, val2);
          }
          else if (typeof val2 !== 'undefined') {
              return val2;
          }
          else if (isPlainObject(val1)) {
              return deepMerge(val1);
          }
          else {
              return val1;
          }
      };
  });

  var Axios = /** @class */ (function () {
      function Axios(initConfig) {
          this.defaults = initConfig;
          this.interceptors = {
              request: new InterceptorManager(),
              response: new InterceptorManager()
          };
      }
      Axios.prototype.request = function (url, config) {
          // 实现函数重载，兼容传与不传 config
          if (typeof url === 'string') {
              if (!config) {
                  config = {};
              }
              config.url = url;
          }
          else {
              config = url;
          }
          config = mergeConfig(this.defaults, config);
          config.method = config.method.toLocaleLowerCase();
          var chain = [
              {
                  resolved: dispatchRequest,
                  rejected: undefined
              }
          ];
          this.interceptors.request.forEach(function (interceptor) {
              // request 拦截器先添加的后执行
              chain.unshift(interceptor);
          });
          this.interceptors.response.forEach(function (interceptor) {
              // response 拦截器先添加的先执行
              chain.push(interceptor);
          });
          var promise = Promise.resolve(config);
          while (chain.length) {
              // chain.shift() 可能是 undefined 这里需要断言
              var _a = chain.shift(), resolved = _a.resolved, rejected = _a.rejected;
              promise = promise.then(resolved, rejected);
          }
          // return dispatchRequest(config)
          return promise;
      };
      Axios.prototype.get = function (url, config) {
          return this._requestMethodWhithoutData('get', url, config);
      };
      Axios.prototype.delete = function (url, config) {
          return this._requestMethodWhithoutData('delete', url, config);
      };
      Axios.prototype.head = function (url, config) {
          return this._requestMethodWhithoutData('head', url, config);
      };
      Axios.prototype.options = function (url, config) {
          return this._requestMethodWhithoutData('options', url, config);
      };
      Axios.prototype.post = function (url, data, config) {
          return this._requestMethodWhithData('post', url, data, config);
      };
      Axios.prototype.put = function (url, data, config) {
          return this._requestMethodWhithData('put', url, data, config);
      };
      Axios.prototype.patch = function (url, data, config) {
          return this._requestMethodWhithData('patch', url, data, config);
      };
      Axios.prototype.getUri = function (config) {
          config = mergeConfig(this.defaults, config);
          return transformURL(config);
      };
      Axios.prototype._requestMethodWhithoutData = function (method, url, config) {
          return this.request(Object.assign(config || {}, {
              method: method,
              url: url
          }));
      };
      Axios.prototype._requestMethodWhithData = function (method, url, data, config) {
          return this.request(Object.assign(config || {}, {
              method: method,
              url: url,
              data: data
          }));
      };
      return Axios;
  }());

  function transformRequest(data) {
      if (isPlainObject(data)) {
          return JSON.stringify(data);
      }
      return data;
  }
  function transformResponse(data) {
      if (typeof data === 'string') {
          try {
              data = JSON.parse(data);
          }
          catch (err) {
              // do nothing
          }
      }
      return data;
  }

  var defaults = {
      method: 'get',
      timeout: 0,
      headers: {
          common: {
              Accept: 'application/json, text/plain, */*'
          }
      },
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'XSRF-HEADER-NAME',
      transformRequest: [
          function (data, headers) {
              processHeaders(headers, data);
              return transformRequest(data);
          }
      ],
      transformResponse: [
          function (data) {
              return transformResponse(data);
          }
      ],
      validateStatus: function (status) {
          return status >= 200 && status < 300;
      }
  };
  var methodsNoData = ['delete', 'get', 'head', 'options'];
  methodsNoData.forEach(function (method) {
      defaults.headers[method] = {};
  });
  var methodWithData = ['post', 'put', 'patch'];
  methodWithData.forEach(function (method) {
      defaults.headers[method] = {
          'Content-Type': 'application/x-www-form-urlencoded'
      };
  });

  var Cancel = /** @class */ (function () {
      function Cancel(message) {
          this.message = message;
      }
      return Cancel;
  }());
  function isCancel(value) {
      return value instanceof Cancel;
  }

  /**
   * 外部实例化 CancelToken 得到 cancelToken
   * 此时 cancelToken.promise 处于 pending 状态
   * 一旦调用 cancelToken.promise.then
   */
  var CancelToken = /** @class */ (function () {
      function CancelToken(executor) {
          var _this = this;
          var resolvePromise;
          this.promise = new Promise(function (resolve) {
              resolvePromise = resolve;
          });
          executor(function (message) {
              if (_this.reason)
                  return;
              _this.reason = new Cancel(message);
              resolvePromise(_this.reason);
          });
      }
      CancelToken.prototype.throwIfRequested = function () {
          if (this.reason) {
              throw this.reason;
          }
      };
      // 实例话对象new CancelToken，给传入一个函数，这个函数其实就是实例化对象参数executor的，再让回调，给cancel赋值一个函数
      // message => {
      //   if (this.reason) return
      //   this.reason = new Cancel(message)
      //   resolvePromise(this.reason)
      // })
      // 只要调用了这个函数，就可以把把 cancelToken.promise.then  进行下去，否则就是在等待。
      CancelToken.source = function () {
          var cancel;
          var token = new CancelToken(function (c) {
              cancel = c;
          });
          return { cancel: cancel, token: token };
      };
      return CancelToken;
  }());

  function createInstance(config) {
      var context = new Axios(config);
      var instance = Axios.prototype.request.bind(context);
      extend(instance, context);
      return instance;
  }
  var axios = createInstance(defaults);
  axios.create = function create(config) {
      return createInstance(mergeConfig(defaults, config));
  };
  axios.CancelToken = CancelToken;
  axios.Cancel = Cancel;
  axios.isCancel = isCancel;
  axios.all = function (promises) { return Promise.all(promises); };
  axios.spread = function (callback) { return function (arr) { return callback.apply(null, arr); }; };
  // axios.all = function all(promises) {
  //   return Promise.all(promises)
  // }
  // axios.spread = function spread(callback) {
  //   return function wrap(arr) {
  //     return callback.apply(null, arr)
  //   }
  // }
  axios.Axios = Axios;

  return axios;

})));
//# sourceMappingURL=axios.umd.js.map
