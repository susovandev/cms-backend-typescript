import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '@/app.js';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User as userModel } from '@/modules/user/user.model.js';
import jwt from 'jsonwebtoken';
import { config } from '@/config/env.config.js';

let mongoServer: MongoMemoryServer;
let accessToken: string;

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
        const user = await userModel.create({
            username: 'suso',
            email: 'susovandas@gmail.com',
            password: 'Password123!',
        });

        await request(app).post('/api/v1/auth/login').send({
            email: user.email,
            password: 'password123!',
        });

        accessToken = jwt.sign(
            { sub: user._id },
            config.JWT.ACCESS_SECRET as string,
            {
                expiresIn: config.JWT
                    .ACCESS_SECRET_EXPIRE as jwt.SignOptions['expiresIn'],
            },
        );
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should logout successfully with a valid token', async () => {
        const res = await request(app)
            .post('/api/v1/auth/logout')
            .set('Cookie', [`accessToken=${accessToken}`]);

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('Logout successful');
    });

    it('should return 401 if token is missing', async () => {
        const res = await request(app).post('/api/v1/auth/logout').send();

        expect(res.status).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('You are not logged in!');
    });
});
