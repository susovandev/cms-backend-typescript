import { config } from '@/config/env.config.js';
import { UnauthorizedError } from '@/errors/unAuthorized.error.js';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User as userModel } from '@/modules/user/user.model.js';
import { NotFoundError } from '@/errors/notFound.error.js';
import { IUserShape } from '@/types/users/user.types.js';

export const authMiddleware = async (
    req: Request,
    _res: Response,
    next: NextFunction,
) => {
    const token = req.cookies.accessToken as string;
    if (!token) {
        throw new UnauthorizedError('You are not logged in!');
    }
    const decodeToken = jwt.verify(token, config.JWT.ACCESS_SECRET as string);
    if (!decodeToken) {
        throw new UnauthorizedError('You are not verified user!');
    }
    const user = (await userModel
        .findById(decodeToken?.sub)
        .select('-password')) as IUserShape | null;
    if (!user) {
        throw new NotFoundError('User not found');
    }
    req.user = user;
    next();
};
