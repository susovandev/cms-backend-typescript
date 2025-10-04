import express, { Application } from 'express';
import { config } from './config/env-config.js';

export class App {
    app: Application;
    constructor() {
        this.app = express();
    }

    public start() {
        this.serverListen();
    }
    private serverListen() {
        this.app.listen(config.SERVER.PORT, () => {
            console.log(
                `Server is running on http://localhost:${config.SERVER.PORT}`,
            );
        });
    }
}
