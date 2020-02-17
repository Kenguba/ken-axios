import { ResolvedFn, RejectedFn } from "../types";
interface Interceptor<T> {
    resolved: ResolvedFn<T>;
    rejected?: RejectedFn;
}
export default class InterceptorManager<T> {
    private interceptors;
    constructor();
    use(resolved: ResolvedFn<T>, rejected: RejectedFn): number;
    forEach(fn: (interceptor: Interceptor<T>) => void): void;
    eject(id: number): void;
}
export {};
