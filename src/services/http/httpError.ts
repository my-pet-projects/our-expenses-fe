import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpError<T> extends Error {
    private requestConfig: AxiosRequestConfig;
    private request?: XMLHttpRequest;
    private response?: AxiosResponse<T>;
    private customMessage: string;

    constructor(customMessage: string, axiosError: AxiosError) {
        super(axiosError.message);
        this.name = this.constructor.name;
        this.requestConfig = axiosError.config;
        this.request = axiosError.request;
        this.response = axiosError.response;
        this.customMessage = customMessage;
        Error.captureStackTrace(this, HttpError);
    }

    public getFullMessage(): string {
        if (this.response && this.response?.status === 404) {
            return `${this.customMessage} Resource not found.`;
        }
        return `${this.customMessage}`;
    }

    public getRequestConfig(): AxiosRequestConfig {
        return this.requestConfig;
    }
}
