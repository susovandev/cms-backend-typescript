import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '@/app.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User as userModel } from '@/modules/user/user.model.js';

let mongoServer: MongoMemoryServer;

describe('POST /api/v1/auth/login', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        await mongoose.connect(uri);
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
        await userModel.create({
            username: 'suso',
            email: 'susovandas@gmail.com',
            password: 'Password123!',
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should login successfully with valid credentials', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'susovandas@gmail.com',
            password: 'Password123!',
        });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.statusCode).toBe(200);
        expect(res.body.message).toBe(
            `Welcome back ${res.body.data.user.username}!`,
        );
        expect(res.body.data.token).toHaveProperty('accessToken');
        expect(res.body.data.token).toHaveProperty('refreshToken');
        expect(res.body.data.user).toMatchObject({
            _id: res.body.data.user._id,
            username: res.body.data.user.username,
            email: res.body.data.user.email,
            role: res.body.data.user.role,
        });

        const userInDB = await userModel.findOne({
            email: 'susovandas@gmail.com',
        });
        expect(userInDB).not.toBeNull();
    });

    it('should fail when fields are missing', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'susovandas@gmail.com',
        });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.statusCode).toBe(400);
        expect(res.body.message).toBe('Received data is not valid');
        expect(res.body.errors).toBeInstanceOf(Array);
    });
});
