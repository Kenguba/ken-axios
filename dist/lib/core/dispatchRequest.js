"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = require("./xhr");
var url_1 = require("../helpers/url");
var headers_1 = require("../helpers/headers");
var transform_1 = require("./transform");
function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    precessConfig(config);
    return xhr_1.default(config).then(function (res) {
        return transformResponseData(res);
    }, function (e) {
        if (e && e.response) {
            e.response = transformResponseData(e.response);
        }
        return Promise.reject(e);
    });
}
exports.default = dispatchRequest;
function precessConfig(config) {
    config.url = transformURL(config);
    config.data = transform_1.transform(config.data, config.headers, config.transformRequest);
    // 这里 config.method 类型断言，可以保证运行时有值
    config.headers = headers_1.flattenHeaders(config.headers, config.method);
}
function transformURL(config) {
    var params = config.params, paramsSerializer = config.paramsSerializer, baseURL = config.baseURL;
    var url = config.url;
    if (baseURL && !url_1.isAbsoluteURL(url)) {
        url = url_1.combineURL(baseURL, url);
    }
    // 这里可以保证运行时 url 是有值的
    return url_1.buildURL(url, params, paramsSerializer);
}
exports.transformURL = transformURL;
function transformResponseData(res) {
    res.data = transform_1.transform(res.data, res.headers, res.config.transformResponse);
    return res;
}
// 请求判断此请求是否已经被取消了，如果被取消了，再发送此请求是没有意义的
function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}
//# sourceMappingURL=dispatchRequest.js.map