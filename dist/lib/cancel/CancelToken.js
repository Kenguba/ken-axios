"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cancel_1 = require("./Cancel");
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
            _this.reason = new Cancel_1.default(message);
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
exports.default = CancelToken;
//# sourceMappingURL=CancelToken.js.map