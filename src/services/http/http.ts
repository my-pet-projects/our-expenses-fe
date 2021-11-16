import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { IHttpRequestOptions, IHttpResponse, RequestHeaders } from './http.types';
import { HttpError } from './httpError';

const cancelToken = axios.CancelToken;
let source = cancelToken.source();

export const sendRequest = async <T>(options: IHttpRequestOptions): Promise<IHttpResponse<T>> => {
    const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api`;

    const config = {
        url: `${baseUrl}/${options.path}`,
        method: options.method,
        cancelToken: source.token,
        data: options.payload,
        headers: getHeaders()
    } as AxiosRequestConfig;

    try {
        const result = await axios.request<T>(config);
        if (result.status === 200 && !result.data) {
            throw new Error('Unexpected response from the server.');
        }
        return {
            data: result.data
        };
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('request was canceled');
        }
        const err = error as AxiosError;
        let customMessage;
        if (err.response) {
            customMessage = 'Unsuccessful response from the service.';
            if (err.response.data.error) {
                customMessage = err.response.data.error;
            }
        } else if (err.request) {
            customMessage = 'No response from the service.';
        } else {
            customMessage = 'Malformed request.';
        }
        throw new HttpError(customMessage, err);
    }
};

export const cancelRequest = (): void => {
    source.cancel('Request canceled by the user.');
    // regenerate cancellation token
    source = cancelToken.source();
};

export const getHeaders = (): RequestHeaders => {
    const headers: RequestHeaders = {};
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';

    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : {};
    if (user && user.token) {
        headers['Authorization'] = 'Bearer ' + user.token;
    }

    return headers;
};
