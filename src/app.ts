import express, { type Application, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from './config/env-config.js';
import { connectDB } from './db/db.js';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    public async start() {
        await connectDB();
        this.setupRoutes();
        this.setupGlobalErrors();
        this.serverListen();
    }

    private setupRoutes() {
        this.app.get('/', (_req: Request, res: Response) => {
            res.status(StatusCodes.OK).json({
                success: true,
                statusCode: StatusCodes.OK,
                message: 'Server is running',
            });
        });
    }
    private setupGlobalErrors() {
        this.app.use((req: Request, res: Response) => {
            res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                statusCode: StatusCodes.NOT_FOUND,
                message:
                    config.SERVER.NODE_ENV === 'production'
                        ? 'No route found. Please contact the administrator.'
                        : `Cant find this ${req.originalUrl} route. Please check the route again.`,
            });
        });
    }
    private serverListen() {
        this.app.listen(config.SERVER.PORT, () => {
            console.log(
                `Server is running on http://localhost:${config.SERVER.PORT}`,
            );
        });
    }
}
