import { AppError } from './AppError.js';
import { StatusCodes } from 'http-status-codes';

export class ConflictError extends AppError {
    constructor(message = 'Conflict: Resource already exists') {
        super(message, StatusCodes.CONFLICT);
    }
}
