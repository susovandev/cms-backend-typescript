import { IRegisterDTO } from '../auth/dto/auth.dto.js';
import { IUserShape } from './types/user.types.js';
import { User as userModel } from './user.model.js';
export class UserRepository {
    async create(createUserDTO: IRegisterDTO) {
        return await userModel.create(createUserDTO);
    }
    async getById(id: string): Promise<IUserShape | null> {
        return (await userModel.findById(id)) as IUserShape | null;
    }

    async getByUsernameOrEmail(
        username?: string,
        email?: string,
    ): Promise<IUserShape | null> {
        return (await userModel.findOne({
            $or: [{ email: email?.toLowerCase() }, { username }],
        })) as IUserShape | null;
    }

    async getByEmail(email: string): Promise<IUserShape | null> {
        return (await userModel.findOne({
            email: email?.toLowerCase(),
        })) as IUserShape | null;
    }
}
