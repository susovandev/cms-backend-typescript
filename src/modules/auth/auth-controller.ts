import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiResponse } from '@/utils/apiResponse.js';
import { ICreateUserDTO } from '../user/dto/user-dto.js';
import { UserService } from '../user/user-service.js';

const userService = new UserService();
export class AuthController {
    /**
     * Register Controller
     * @param Request req
     * @param Response res
     * @returns Promise<Response>
     */
    public async register(
        req: Request<unknown, unknown, ICreateUserDTO>,
        res: Response,
    ) {
        await userService.createUserAccount(req.body);

        res.status(StatusCodes.CREATED).json(
            new ApiResponse(
                StatusCodes.CREATED,
                'Account created successfully',
            ),
        );
    }
}
