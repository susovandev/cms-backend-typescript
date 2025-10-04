import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import { App } from '../src/app.js';
import { Application } from 'express';

const appInstance = new App();
let app: Application;

beforeAll(async () => {
    await appInstance.start();
    app = appInstance.app;
});

describe('GET /', () => {
    it('should return 200 with a success message', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            success: true,
            statusCode: 200,
            message: 'Server is running',
        });
    });
});
