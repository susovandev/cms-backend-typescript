import { Document, Types } from 'mongoose';
export enum UserRole {
    ADMIN = 'admin',
    EDITOR = 'editor',
    AUTHOR = 'author',
    VIEWER = 'viewer',
}
export interface IUserShape extends Document {
    _id: Types.ObjectId;
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
    refreshToken: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
}
