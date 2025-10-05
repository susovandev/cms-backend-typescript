import { type Application } from 'express';
import authRouter from '../modules/auth/auth-routes.js';

const appRouter = (app: Application) => {
    app.use('/api/v1/auth', authRouter);
};

export { appRouter };
