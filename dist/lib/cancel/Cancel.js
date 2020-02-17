"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cancel = /** @class */ (function () {
    function Cancel(message) {
        this.message = message;
    }
    return Cancel;
}());
exports.default = Cancel;
function isCancel(value) {
    return value instanceof Cancel;
}
exports.isCancel = isCancel;
//# sourceMappingURL=Cancel.js.map