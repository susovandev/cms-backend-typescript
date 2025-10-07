import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request') {
        super(message, StatusCodes.BAD_REQUEST);
    }
}
