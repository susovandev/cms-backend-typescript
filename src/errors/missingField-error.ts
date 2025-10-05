import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class MissingFieldError extends AppError {
    constructor(message = 'Required field is missing') {
        super(message, StatusCodes.BAD_REQUEST);
    }
}
