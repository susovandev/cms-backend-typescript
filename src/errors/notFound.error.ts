import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends AppError {
    constructor(resource: string = 'Resource') {
        super(`${resource} not found`, StatusCodes.NOT_FOUND);
    }
}
