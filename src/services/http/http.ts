import axios, { AxiosRequestConfig } from 'axios';
import log from 'loglevel';

import { IHttpRequestOptions, IHttpResponse } from './http.types';

const cancelToken = axios.CancelToken;
let source = cancelToken.source();

export const sendRequest = async <T>(options: IHttpRequestOptions): Promise<IHttpResponse<T>> => {
    const baseUrl = 'http://localhost:5000';

    const config = {
        url: `${baseUrl}/${options.path}`,
        method: options.method,
        cancelToken: source.token,
        data: options.payload
    } as AxiosRequestConfig;

    try {
        const result = await axios.request<T>(config);
        // logger.info('Successful HTTP response', result.data);
        return {
            data: result.data
        };
    } catch (error) {
        if (axios.isCancel(error)) {
            // logger.debug(`Request cancelled: ${error}`);
            console.log('request was canceled');
            return {
                isCanceled: true
            };
        }
        // logger.error(`Failed HTTP response: ${error.message}`, error);

        throw error;
    }
};

export const cancelRequest = (): void => {
    source.cancel('Request canceled by the user.');
    // regenerate cancellation token
    source = cancelToken.source();
};
