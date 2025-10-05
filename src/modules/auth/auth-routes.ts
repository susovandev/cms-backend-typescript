import { Router } from 'express';
import { AuthController } from './auth-controller.js';
import { registerValidation } from './auth-validation.js';
import { validate } from '@/middlewares/validation.middleware.js';

const authController = new AuthController();

const authRouter = Router();
/**
 * @route POST - /api/v1/auth/register
 * @description Register a new user
 */
authRouter
    .route('/register')
    .post(registerValidation(), validate, authController.register);
export default authRouter;
