import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import {
    loginValidationSchema,
    registerValidationSchema,
} from './auth.validation.js';
import { validate } from '@/middlewares/validation.middleware.js';

const authController = new AuthController();

const authRouter = Router();
/**
 * @route POST - /api/v1/auth/register
 * @description Register a new user
 */
authRouter
    .route('/register')
    .post(registerValidationSchema(), validate, authController.register);

/**
 * @route POST - /api/v1/auth/login
 * @description Login a user
 */
authRouter
    .route('/login')
    .post(loginValidationSchema(), validate, authController.login);
export default authRouter;
