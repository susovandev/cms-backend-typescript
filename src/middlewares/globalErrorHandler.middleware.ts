/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '@/errors/index.js';
import { config } from '@/config/env.config.js';
import Logger from '@/lib/logger.js';

export const globalErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong on the server.';
    let isOperational = false;

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        isOperational = err.isOperational;
    }

    Logger.error('Error occurred:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });

    // Production errors
    if (config.SERVER.NODE_ENV === 'production' && !isOperational) {
        res.status(statusCode).json({
            success: false,
            statusCode,
            message: 'Internal Server Error. Please contact support.',
        });
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        ...(config.SERVER.NODE_ENV !== 'production' && {
            stack: err.stack,
            name: err.name,
        }),
    });
};
