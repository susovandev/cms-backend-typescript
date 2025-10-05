import { Schema, model } from 'mongoose';
import { IUserShape, UserRole } from './types/user-types.js';
export const userSchema: Schema<IUserShape> = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username already exists'],
            trim: true,
            minlength: [3, 'Username must be at least 3 characters long'],
            maxlength: [30, 'Username must be at most 30 characters long'],
        },
        fullname: {
            type: String,
            required: [true, 'Fullname is required'],
            trim: true,
            minlength: [3, 'Fullname must be at least 3 characters long'],
            maxlength: [50, 'Fullname must be at most 50 characters long'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email already exists'],
            trim: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email',
            ],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
            minlength: [8, 'Password must be at least 8 characters long'],
        },
        role: {
            type: String,
            enum: Object.keys(UserRole),
            default: UserRole.VIEWER,
        },
        avatar: {
            type: String,
            trim: true,
            default: '',
        },
        bio: {
            type: String,
            trim: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        resetPasswordToken: {
            type: String,
            trim: true,
        },
        resetPasswordExpires: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true },
);

userSchema.index({ username: 1, email: 1 });

export const User = model<IUserShape>('User', userSchema);
