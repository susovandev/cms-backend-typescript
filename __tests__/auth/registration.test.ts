import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { Application } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { App } from '@/app.js';
import { User as userModel } from '@/modules/user/user-model.js';

const appInstance = new App();
let app: Application;
let mongoServer: MongoMemoryServer;

describe('POST /api/v1/auth/register', () => {
    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        await appInstance.start();
        const uri = mongoServer.getUri();
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
        await mongoose.connect(uri);
        app = appInstance.app;
    });

    beforeEach(async () => {
        await userModel.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoServer.stop();
    });

    it('should register a new user successfully', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            username: 'john_doe',
            email: 'john@example.com',
            password: 'Password123!',
        });

        expect(res.status).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.statusCode).toBe(201);
        expect(res.body.message).toBe('Account created successfully');

        const userInDB = await userModel.findOne({ email: 'john@example.com' });
        expect(userInDB).not.toBeNull();
    });

    it('should fail when fields are missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            email: 'no_username@example.com',
        });

        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Received data is not valid');
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors.length).toBeGreaterThan(0);
        expect(Object.keys(res.body.errors[0])[0]).toMatch(/username|password/);
    });

    it('should not allow duplicate email registration', async () => {
        await request(app).post('/api/v1/auth/register').send({
            username: 'john',
            email: 'dup@example.com',
            password: 'Password123!',
        });

        const res = await request(app).post('/api/v1/auth/register').send({
            username: 'john2',
            email: 'dup@example.com',
            password: 'Password123!',
        });

        expect(res.status).toBe(409);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('User already exists');
    });
});
