import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class UnauthorizedError extends AppError {
    constructor(
        message: string = 'You are not authorized to access this resource',
    ) {
        super(message, StatusCodes.UNAUTHORIZED);
    }
}
