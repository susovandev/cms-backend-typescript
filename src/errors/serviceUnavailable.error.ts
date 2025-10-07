import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class ServiceUnavailableError extends AppError {
    constructor(message = 'Service is temporarily unavailable') {
        super(message, StatusCodes.SERVICE_UNAVAILABLE);
    }
}
