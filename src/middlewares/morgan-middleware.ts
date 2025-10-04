import morgan, { StreamOptions } from 'morgan';
import Logger from '../lib/logger.js';
import { config } from '../config/env-config.js';

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};

const skip = () => {
    const env = config.SERVER.NODE_ENV || 'development';
    return env !== 'development';
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip },
);

export default morganMiddleware;
