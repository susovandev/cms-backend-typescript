import { connect } from 'mongoose';
import { config } from '@/config/env.config.js';
import Logger from '@/lib/logger.js';

const connectDB = async () => {
    try {
        const connectionInstance = await connect(config.DATABASE.URI);
        Logger.info(
            `Database connected successfully...`,
            connectionInstance.connection.host,
        );
    } catch (err) {
        Logger.error(`Error during database disconnection:`, err);
        process.exit(1);
    }
};

export { connectDB };
