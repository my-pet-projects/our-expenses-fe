import { HttpError } from 'src/services/http/httpError';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ApplicationError<T extends Error = any> {
    public message: string;
    public description: string;
    public error: Error;

    constructor(message: string, error: T) {
        this.message = message;
        this.description = error.message;
        this.error = error;
        if (error instanceof HttpError) {
            this.description = error.getFullMessage();
        }
    }
}
