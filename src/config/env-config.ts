import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
    SERVER: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: Number(process.env.PORT),
    },
};

export const config = Object.freeze(_config);
