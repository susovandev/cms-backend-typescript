import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '@/app.js';

describe('GET /', () => {
    it('should return 200 with a success message', async () => {
        const res = await request(app).get('/');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.statusCode).toBe(200);
        expect(res.body.message).toBe('Server is running');
    });
});
