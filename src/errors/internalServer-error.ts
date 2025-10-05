import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error') {
        super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
