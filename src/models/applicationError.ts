import { HttpError } from 'src/services/http/httpError';

export class ApplicationError {
    public message: string;
    public description?: string;
    public error?: Error;

    constructor(message: string, error: Error | unknown) {
        this.message = message;
        if (error instanceof Error) {
            this.description = error.message;
            this.error = error;
        }
        if (error instanceof HttpError) {
            this.description = error.getFullMessage();
        }
    }
}
