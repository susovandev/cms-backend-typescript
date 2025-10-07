import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class ForbiddenError extends AppError {
    constructor(message: string = 'Access to this resource is forbidden') {
        super(message, StatusCodes.FORBIDDEN);
    }
}
