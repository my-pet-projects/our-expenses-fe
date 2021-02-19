import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { IHttpRequestOptions, IHttpResponse } from './http.types';
import { HttpError } from './httpError';

const cancelToken = axios.CancelToken;
let source = cancelToken.source();

export const sendRequest = async <T>(options: IHttpRequestOptions): Promise<IHttpResponse<T>> => {
    const baseUrl = 'http://localhost:5000/dsf';

    const config = {
        url: `${baseUrl}/${options.path}`,
        method: options.method,
        cancelToken: source.token,
        data: options.payload
    } as AxiosRequestConfig;

    try {
        const result = await axios.request<T>(config);
        return {
            data: result.data
        };
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('request was canceled');
            return {
                isCanceled: true
            };
        }

        const err = error as AxiosError;
        let customMessage;
        if (err.response) {
            customMessage = 'Unsuccessful response from the service.';
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