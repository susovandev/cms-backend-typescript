import { InternalServerError } from '@/errors/internalServer-error.js';
import { ICreateUserDTO } from './dto/user-dto.js';
import { UserRepository } from './user-repository.js';
import { ConflictError } from '@/errors/conflict-error.js';
export class UserService {
    private userRepo;
    constructor() {
        this.userRepo = new UserRepository();
    }
    async createUserAccount(createUserDTO: ICreateUserDTO) {
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
    }
}
