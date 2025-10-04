import { connect } from 'mongoose';
import { config } from '../config/env-config.js';

const connectDB = async () => {
    try {
        const connectionInstance = await connect(config.DATABASE.URI);
        console.log(
            `Database connected successfully...`,
            connectionInstance.connection.host,
        );
    } catch (err) {
        console.log(`'Error during database disconnection:`, err);
        process.exit(1);
    }
};

export { connectDB };
