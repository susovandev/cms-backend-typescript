import { InternalServerError } from '@/errors/internalServer.error.js';
import { ILoginDTO, IRegisterDTO } from '../auth/dto/auth.dto.js';
import { UserRepository } from './user.repository.js';
import { ConflictError } from '@/errors/conflict.error.js';
import { UnauthorizedError } from '@/errors/unAuthorized.error.js';
export class UserService {
    private userRepo: UserRepository;
    constructor() {
        this.userRepo = new UserRepository();
    }
    async createUserAccount(createUserDTO: IRegisterDTO) {
        const existingUser = await this.userRepo.getByUsernameOrEmail(
            createUserDTO.username,
            createUserDTO.email,
        );
        if (existingUser) {
            throw new ConflictError('User already exists');
        }

        const user = await this.userRepo.create(createUserDTO);

        if (!user) {
            throw new InternalServerError('Failed to create user');
        }
        return user;
    }

    async loginUserAccount(loginDTO: ILoginDTO) {
        const user = await this.userRepo.getByEmail(loginDTO.email);
        if (!user || !(await user.comparePassword(loginDTO.password))) {
            throw new UnauthorizedError('Invalid credentials');
        }
        return user;
    }
}
