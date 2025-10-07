import { IUserShape } from '@/types/users/user.types.ts';

declare global {
    namespace Express {
        interface Request {
            user?: IUserShape | null;
        }
    }
}
