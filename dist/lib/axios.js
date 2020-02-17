"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Axios_1 = require("./core/Axios");
var util_1 = require("./helpers/util");
var defaults_1 = require("./defaults");
var mergeConfig_1 = require("./core/mergeConfig");
var CancelToken_1 = require("./cancel/CancelToken");
var Cancel_1 = require("./cancel/Cancel");
function createInstance(config) {
    var context = new Axios_1.default(config);
    var instance = Axios_1.default.prototype.request.bind(context);
    util_1.extend(instance, context);
    return instance;
}
var axios = createInstance(defaults_1.default);
axios.create = function create(config) {
    return createInstance(mergeConfig_1.default(defaults_1.default, config));
};
axios.CancelToken = CancelToken_1.default;
axios.Cancel = Cancel_1.default;
axios.isCancel = Cancel_1.isCancel;
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
axios.Axios = Axios_1.default;
exports.default = axios;
//# sourceMappingURL=axios.js.map