"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
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
    if (util_1.isPlainObject(data)) {
        if (headers && !headers['Content-Type']) {
            headers['Content-Type'] = 'application/json;charset=utf-8';
        }
    }
    return headers;
}
exports.processHeaders = processHeaders;
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
exports.parseHeaders = parseHeaders;
function flattenHeaders(headers, method) {
    if (!headers)
        return headers;
    headers = util_1.deepMerge(headers.common, headers[method], headers);
    var methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common'];
    methodsToDelete.forEach(function (method) {
        delete headers[method];
    });
    return headers;
}
exports.flattenHeaders = flattenHeaders;
//# sourceMappingURL=headers.js.map