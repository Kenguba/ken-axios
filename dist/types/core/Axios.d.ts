import { AxiosRequestConfig, AxiosPromise, Method, AxiosResponse } from '../types';
import InterceptorManager from './InterceptorManager';
interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}
export default class Axios {
    defaults: AxiosRequestConfig;
    interceptors: Interceptors;
    constructor(initConfig: AxiosRequestConfig);
    request(url: any, config?: any): AxiosPromise;
    get(url: string, config: AxiosRequestConfig): AxiosPromise;
    delete(url: string, config: AxiosRequestConfig): AxiosPromise;
    head(url: string, config: AxiosRequestConfig): AxiosPromise;
    options(url: string, config: AxiosRequestConfig): AxiosPromise;
    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
    getUri(config?: AxiosRequestConfig): string;
    _requestMethodWhithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise<any>;
    _requestMethodWhithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<any>;
}
export {};
