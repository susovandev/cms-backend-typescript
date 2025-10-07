import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '@/utils/apiResponse.js';
import { ILoginDTO, IRegisterDTO } from './dto/auth.dto.js';
import { AuthService } from './auth.service.js';
import { sanitizeUserResponse } from '@/utils/sanitizeResponses/sanitizeUserResponse.js';
import { cookieOptionsFn } from '@/config/cookieOptions.config.js';

const authService = new AuthService();
export class AuthController {
    /**
     * Register Controller
     * @param Request req
     * @param Response res
     * @returns Promise<Response>
     */
    public async register(
        req: Request<unknown, unknown, IRegisterDTO>,
        res: Response,
    ) {
        await authService.registerUserAccount(req.body);

        res.status(StatusCodes.CREATED).json(
            new ApiResponse(
                StatusCodes.CREATED,
                'Account created successfully',
            ),
        );
    }

    /**
     * Login Controller
     * @param Request req
     * @param Response res
     * @returns Promise<Response>
     */
    public async login(
        req: Request<unknown, unknown, ILoginDTO>,
        res: Response,
    ) {
        const { accessToken, refreshToken, user } =
            await authService.loginUserAccount(req.body);

        res.cookie('accessToken', accessToken, cookieOptionsFn());
        res.cookie(
            'refreshToken',
            refreshToken,
            cookieOptionsFn(1000 * 60 * 60 * 24 * 7),
        );
        res.status(StatusCodes.OK).json(
            new ApiResponse(StatusCodes.OK, `Welcome back ${user?.username}!`, {
                token: { accessToken, refreshToken },
                user: sanitizeUserResponse(user),
            }),
        );
    }
}
