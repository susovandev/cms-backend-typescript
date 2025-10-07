import { Schema, model } from 'mongoose';
import { IUserShape, UserRole } from '../../types/users/user.types.js';
import bcrypt from 'bcryptjs';
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
            enum: Object.values(UserRole),
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
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true },
);

userSchema.index({ username: 1, email: 1 });

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (
    enteredPassword: string,
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};
export const User = model<IUserShape>('User', userSchema);
