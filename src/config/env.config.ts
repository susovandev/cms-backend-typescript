import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
    SERVER: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: Number(process.env.PORT),
    },
    DATABASE: {
        URI: process.env.DATABASE_URI as string,
    },
    JWT: {
        ACCESS_SECRET: process.env.JWT_ACCESS_SECRET! as string,
        REFRESH_SECRET: process.env.JWT_REFRESH_SECRET! as string,
        ACCESS_SECRET_EXPIRE: process.env.JWT_ACCESS_SECRET_EXPIRE! as string,
        REFRESH_SECRET_EXPIRE: process.env.JWT_REFRESH_SECRET_EXPIRE! as string,
    },
};

export const config = Object.freeze(_config);
