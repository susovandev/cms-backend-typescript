import { ICreateUserDTO } from './dto/user-dto.js';
import { IUserShape } from './types/user-types.js';
import { User as userModel } from './user-model.js';
export class UserRepository {
    async create(createUserDTO: ICreateUserDTO) {
        return await userModel.create(createUserDTO);
    }
    async getById(id: string): Promise<IUserShape | null> {
        return (await userModel.findById(id)) as IUserShape;
    }

    async getByUsernameOrEmail(
        username?: string,
        email?: string,
    ): Promise<IUserShape | null> {
        return (await userModel.findOne({
            $or: [{ email: email?.toLowerCase() }, { username }],
        })) as IUserShape;
    }
}
