import { ILoginDTO, IRegisterDTO } from './dto/auth.dto.js';
import { UserService } from '../user/user.service.js';
import { signAccessToken, signRefreshToken } from '@/utils/jwt.js';

export class AuthService {
    userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    public async registerUserAccount(registerDTO: IRegisterDTO) {
        return await this.userService.createUserAccount(registerDTO);
    }

    public async loginUserAccount(loginDTO: ILoginDTO) {
        const user = await this.userService.loginUserAccount(loginDTO);

        const accessToken = signAccessToken({
            sub: user?._id.toString(),
            role: user?.role,
        });
        const refreshToken = signRefreshToken({
            sub: user?._id.toString(),
            role: user?.role,
        });

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken, user };
    }
}
