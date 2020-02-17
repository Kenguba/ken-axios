"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.transform = transform;
//# sourceMappingURL=transform.js.map