import { app } from './app.js';
import { config } from './config/env.config.js';
import Logger from './lib/logger.js';
import { connectDB } from './db/db.js';

connectDB()
    .then(() => {
        app.listen(config.SERVER.PORT, () => {
            Logger.debug(
                `Server is running on http://localhost:${config.SERVER.PORT}`,
            );
        });
    })
    .catch((err) => {
        Logger.error(`Error during server disconnection:`, err);
    });
