import express, {
    type Application,
    Request,
    Response,
    NextFunction,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { config } from './config/env-config.js';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    public start() {
        this.setUpRoutes();
        this.setupGlobalErrors();
        this.serverListen();
    }

    private setupGlobalErrors() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.status(StatusCodes.NOT_FOUND).json({
                status: false,
                statusCode: StatusCodes.NOT_FOUND,
                message:
                    config.SERVER.NODE_ENV === 'production'
                        ? 'No route found. Please contact the administrator.'
                        : `Cant find this ${req.originalUrl} route. Please check the route again.`,
            });
            next();
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
