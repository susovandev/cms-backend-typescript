import { type Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '../utils/apiResponse.js';
import { config } from '../config/env-config.js';
export const notFoundHandler = (req: Request, res: Response) => {
    res.status(StatusCodes.NOT_FOUND).json(
        new ApiResponse(
            StatusCodes.NOT_FOUND,
            config.SERVER.NODE_ENV === 'production'
                ? 'No route found. Please contact the administrator.'
                : `Cant find this ${req.originalUrl} route. Please check the route again.`,
        ),
    );
};
