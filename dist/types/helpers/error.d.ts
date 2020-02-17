import { AxiosRequestConfig, AxiosResponse } from "../types";
export declare class AxiosError extends Error {
    isAxiosError: boolean;
    config: AxiosRequestConfig;
    code?: string | null | number;
    request?: any;
    response?: AxiosResponse;
    constructor(message: string, config: AxiosRequestConfig, code: string | null | number, request?: any, response?: AxiosResponse);
}
export declare function createError(message: string, config: AxiosRequestConfig, code: string | null | number, request?: any, response?: AxiosResponse): AxiosError;
