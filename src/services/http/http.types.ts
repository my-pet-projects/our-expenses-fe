export interface IHttpRequestOptions<T = unknown> {
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    payload?: T;
}

export interface IHttpResponse<T> {
    data: T;
    error?: Error;
    isCanceled?: boolean;
}

export interface IHttpError {
    code: string;
}

export type RequestHeaders = { [name: string]: string };
