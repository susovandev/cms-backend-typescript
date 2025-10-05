import express, { type Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from './config/env-config.js';
import { connectDB } from './db/db.js';
import Logger from './lib/logger.js';
import morganMiddleware from './middlewares/morgan-middleware.js';
import { ApiResponse } from './utils/apiResponse.js';
import { globalErrorHandler } from './middlewares/globalErrorHandler-middleware.js';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    public async start() {
        await connectDB();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupGlobalErrors();
        this.serverListen();
    }

    private setupMiddlewares() {
        this.app.use(morganMiddleware);
    }
    private setupRoutes() {
        this.app.get('/', (_req: Request, res: Response) => {
            res.status(StatusCodes.OK).json(
                new ApiResponse(StatusCodes.OK, 'Server is running'),
            );
        });
    }
    private setupGlobalErrors() {
        this.app.use((req: Request, res: Response) => {
            res.status(StatusCodes.NOT_FOUND).json(
                new ApiResponse(
                    StatusCodes.NOT_FOUND,
                    config.SERVER.NODE_ENV === 'production'
                        ? 'No route found. Please contact the administrator.'
                        : `Cant find this ${req.originalUrl} route. Please check the route again.`,
                ),
            );
        });
        this.app.use(globalErrorHandler);
    }
    private serverListen() {
        this.app.listen(config.SERVER.PORT, () => {
            Logger.debug(
                `Server is running on http://localhost:${config.SERVER.PORT}`,
            );
        });
    }
}
