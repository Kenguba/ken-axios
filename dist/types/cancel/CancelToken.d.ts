import { CancelExecutor, CancelTokenSource } from '../types';
import Cancel from './Cancel';
/**
 * 外部实例化 CancelToken 得到 cancelToken
 * 此时 cancelToken.promise 处于 pending 状态
 * 一旦调用 cancelToken.promise.then
 */
export default class CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    constructor(executor: CancelExecutor);
    throwIfRequested(): void;
    static source(): CancelTokenSource;
}
