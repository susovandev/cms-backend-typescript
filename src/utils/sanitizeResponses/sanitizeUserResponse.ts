import { IUserShape } from '@/modules/user/types/user.types.js';

export const sanitizeUserResponse = (user: IUserShape) => {
    if (!user) return null;
    return {
        _id: user?._id.toString(),
        username: user?.username,
        email: user?.email,
        role: user?.role,
    };
};
