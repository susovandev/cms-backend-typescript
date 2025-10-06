import express, { type Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import morganMiddleware from './middlewares/morgan-middleware.js';
import { ApiResponse } from './utils/apiResponse.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler-middleware.js';
import { notFoundHandler } from './middlewares/notFoundHandler-middleware.js';
import authRouter from './modules/auth/auth-routes.js';

const app: Application = express();

// JSON Middleware
app.use(express.json({ limit: '10kb', strict: true }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Morgan Middleware
app.use(morganMiddleware);

app.get('/', (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json(
        new ApiResponse(StatusCodes.OK, 'Server is running'),
    );
});

// Global Router
app.use('/api/v1/auth', authRouter);

// NotFoundHandler
app.use(notFoundHandler);

// GlobalErrorHandler
app.use(globalErrorHandler);

export { app };
