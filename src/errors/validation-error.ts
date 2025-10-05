import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class ValidationError extends AppError {
    constructor(message = 'Validation failed for input data') {
        super(message, StatusCodes.BAD_REQUEST);
    }
}
