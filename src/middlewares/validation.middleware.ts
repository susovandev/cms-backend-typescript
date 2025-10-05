/* eslint-disable @typescript-eslint/no-explicit-any */
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors: Record<string, string>[] = [];
    errors.array().map((err: any) =>
        extractedErrors.push({
            [err.path]: err.msg,
        }),
    );
    res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Received data is not valid',
        errors: extractedErrors,
    });
};
