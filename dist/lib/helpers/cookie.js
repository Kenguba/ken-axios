"use strict";
// export const getCookie = (name: any): any => {
//   //var res = document.cookie.match(/\bcsrf_token=([^;]*)\b/)
//   var res = document.cookie.match('\\b' + name + '=([^;]*)\\b');
//   return res ? res[1] : undefined;
// }
Object.defineProperty(exports, "__esModule", { value: true });
var cookie = {
    read: function (name) {
        var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
    }
};
exports.default = cookie;
//# sourceMappingURL=cookie.js.map