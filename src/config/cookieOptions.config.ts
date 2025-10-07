import { CookieOptions } from 'express';
import { config } from './env.config.js';

export const cookieOptionsFn = (
    maxAge?: number,
    path?: string,
): CookieOptions => {
    return {
        httpOnly: true,
        secure: config.SERVER.NODE_ENV === 'production',
        sameSite: config.SERVER.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: maxAge || 1000 * 60 * 60 * 24,
        path: path || '/api/v1/auth/login',
    };
};
