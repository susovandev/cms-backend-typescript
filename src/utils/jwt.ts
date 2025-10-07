import { config } from '@/config/env.config.js';
import jwt, { type SignOptions } from 'jsonwebtoken';

const signAccessToken = (payload: object) =>
    jwt.sign(payload, config.JWT.ACCESS_SECRET, {
        expiresIn: config.JWT.ACCESS_SECRET_EXPIRE as SignOptions['expiresIn'],
    });

const signRefreshToken = (payload: object) =>
    jwt.sign(payload, config.JWT.REFRESH_SECRET, {
        expiresIn: config.JWT.REFRESH_SECRET_EXPIRE as SignOptions['expiresIn'],
    });
export { signAccessToken, signRefreshToken };
