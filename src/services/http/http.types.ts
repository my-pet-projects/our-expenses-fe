// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHttpRequestOptions<T = any> {
    path: string;
    method: 'GET' | 'POST' | 'PUT';
    payload?: T;
}

export interface IHttpResponse<T> {
    data?: T;
    error?: Error;
    isCanceled?: boolean;
}
