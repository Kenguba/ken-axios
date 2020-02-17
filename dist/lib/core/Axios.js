"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dispatchRequest_1 = require("./dispatchRequest");
var InterceptorManager_1 = require("./InterceptorManager");
var mergeConfig_1 = require("./mergeConfig");
var Axios = /** @class */ (function () {
    function Axios(initConfig) {
        this.defaults = initConfig;
        this.interceptors = {
            request: new InterceptorManager_1.default(),
            response: new InterceptorManager_1.default()
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
        config = mergeConfig_1.default(this.defaults, config);
        config.method = config.method.toLocaleLowerCase();
        var chain = [
            {
                resolved: dispatchRequest_1.default,
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
        config = mergeConfig_1.default(this.defaults, config);
        return dispatchRequest_1.transformURL(config);
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
exports.default = Axios;
//# sourceMappingURL=Axios.js.map