export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    AUTHOR = 'author',
    VIEWER = 'viewer',
}
export interface IUserShape {
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: UserRole;
    avatar: string;
    bio: string;
    isVerified: boolean;
    isActive: boolean;
    resetPasswordToken: string;
    resetPasswordExpires: Date;
    createdAt: Date;
    updatedAt: Date;
}
